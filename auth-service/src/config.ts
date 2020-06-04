require("dotenv-safe").config({ example: "default.env" });

export const app = {
    name: "CodigoPraTodos.com - Auth Service",
    version: "0",
    host: process.env.APP_HOST || "",
    port: +(process.env.APP_PORT || "0"),
    environment: "development",
};

export const db = {
    client: process.env.DB_CONNECTION,
    connection: {
        charset: "utf8",
        timezone: "UTC",
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || "5432"),
        database: process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME : process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};

export const jwt = {
    privateKey: process.env.AUTH_JWT_PRIVATE_KEY || "",
    publicKey: process.env.AUTH_JWT_PUBLIC_KEY || "",
};
