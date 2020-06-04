import db, { insertDbRecord } from "../knex";

export interface User {
    id: string;
    username: string;
    email: string;
    display_name: string;
    locked_until: Date;
}

type PassportType = "local" | "github" | "facebook";

export interface UserPassport<T> {
    id: number;
    user_id: string;
    type: PassportType;
    data: T;
    updated_at: Date;
    last_login_at: Date;
}

export type NewUser = Omit<User, "id" | "locked_until">;
export const insertUser = async (record: NewUser): Promise<User> => {
    return insertDbRecord("user", record);
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    return await db.from("user").select("*").where({ email }).first();
};

export type NewPassport<T> = Omit<UserPassport<T>, "id" | "updated_at" | "last_login_at">;
export const insertUserPassport = async <T>(record: NewPassport<T>): Promise<UserPassport<T>> => {
    return insertDbRecord("user_passport", record);
};

export const updatePassportLoginTimestamp = async (id: number): Promise<void> => {
    return db.from("user_passport").where({ id }).update("last_login_at", db.fn.now());
};

export const findUserPassportByUserIdType = async <T>(
    user_id: string,
    type: PassportType,
): Promise<UserPassport<T> | undefined> => {
    return await db.from("user_passport").select("*").where({ user_id, type }).first();
};

export const listRolesForUserId = async (user_id: string): Promise<string[]> => {
    const rows = await db
        .from("role")
        .select("name")
        .join("user_role", "user_role.role_id", "role.id")
        .where("user_role.user_id", user_id);
    return rows.map((row) => row.name);
};
