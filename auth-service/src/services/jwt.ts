import jwt from "jsonwebtoken";

import { listRolesForUserId, User } from "../model";
import { jwt as jwtConfig } from "../config";

export const signAuthData = async (user: User) => {
    const userRoles = await listRolesForUserId(user.id);

    const signOptions: jwt.SignOptions = {
        subject: user.id,
        expiresIn: "30d", // 30 days validity
        algorithm: "RS256",
    };

    const roles = ["user", ...userRoles];

    const claim = {
        name: user.username,
        // iat: Math.floor(Date.now() / 1000),
        "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": roles,
            "x-hasura-default-role": roles[0],
            "x-hasura-user-id": user.id,
            // 'x-hasura-org-id': '123',
            // 'x-hasura-custom': 'custom-value'
        },
    };

    const token = jwt.sign(claim, jwtConfig.privateKey, signOptions);

    return {
        id: user.id,
        username: user.username,
        roles,
        token,
    };
};
