import validator from "validator";
import { genSalt, hash } from "bcrypt";

import { User, insertUser, insertUserPassport } from "../model";

export interface SignupRequest {
    email: string;
    password: string;
    username?: string;
    display_name?: string;
}

export const signupUser = async (signup: SignupRequest): Promise<User> => {
    validateFields(signup);
    const { username, display_name } = formatNames(signup);

    try {
        const user = await insertUser({
            username,
            display_name,
            email: signup.email,
        });

        await storePassword(user.id, signup.password);

        return user;
    } catch (error) {
        throw { message: `Fail to Create User ${signup.email}`, error };
    }
};

const validateFields = (signup: SignupRequest) => {
    if (!validator.isEmail(signup.email)) {
        throw new Error("Invalid Email");
    }

    if (!signup.password || signup.password.length < 4) {
        throw new Error("Invalid Password (min: 4)");
    }
};

const formatNames = (signup: SignupRequest) => {
    const username = signup.username || `user-${Math.floor(Math.random() * 999) + 1000}`;
    const display_name = signup.display_name || username;
    return { username, display_name };
};

const storePassword = async (id: string, password: string) => {
    const salt = await genSalt();
    const saltedPassword = await hash(password, salt);
    await insertUserPassport({
        user_id: id,
        type: "local",
        data: JSON.stringify(saltedPassword),
    });
};
