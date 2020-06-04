import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

import { findUserByEmail, findUserPassportByUserIdType, updatePassportLoginTimestamp } from "../model";

const options = {
    usernameField: "email",
    passwordField: "password",
};

const verify = async (email: string, password: string, done: any) => {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error("user email not found");
        }

        const passport = await findUserPassportByUserIdType<string>(user.id, "local");
        if (!passport) {
            throw new Error("passport not found");
        }

        const isValid = await bcrypt.compare(password, passport.data);
        if (!isValid) {
            throw new Error("invalid password");
        }

        await updatePassportLoginTimestamp(passport.id);
        return done(null, user);
    } catch (error) {
        console.error(error);
        return done("Invalid Credentials");
    }
};

passport.use(new LocalStrategy(options, verify));

export default passport;
