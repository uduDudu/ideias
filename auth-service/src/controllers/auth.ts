import { Request, Response, NextFunction } from "express";
import rasha from "rasha";

import { jwt as jwtConfig } from "../config";
import { signAuthData } from "../services/jwt";
import { signupUser, SignupRequest } from "../services/signup";
import passport from "../services/passport";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (error, user, _info) => {
        if (error) {
            return next(error);
        }
        const authData = await signAuthData(user);
        res.send(authData);
    })(req, res, next);
};

export const postSignup = async (
    req: Request<{}, {}, SignupRequest>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const signup = req.body;
        await signupUser(signup);
        authenticate(req, res, next);
    } catch (error) {
        next(error);
    }
};

interface LoginRequest {
    email: string;
    password: string;
}
export const postLogin = async (
    req: Request<{}, {}, LoginRequest>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const login = req.body;
        if (!login.email || !login.password) {
            throw new Error("Invalid Credentials");
        }
        authenticate(req, res, next);
    } catch (error) {
        next(error);
    }
};

export const getJwks = async (_req: Request, res: Response): Promise<void> => {
    const rawJwk = await rasha.import({ pem: jwtConfig.publicKey, public: true });

    const jwk = {
        ...rawJwk,
        alg: "RS256",
        use: "sig",
        kid: jwtConfig.publicKey,
    };

    res.send({
        keys: [jwk],
    });
};
