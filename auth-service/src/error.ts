import { Response, Request } from "express";

export const defaultErrorHandler = (error: any, _req: Request, res: Response, _next: any) => {
    console.error(error);
    if (typeof error === "string") {
        return res.status(400).json({ message: error });
    }

    if ((error as any).name === "UnauthorizedError") {
        return res.status(401).json({ message: "Invalid Token" });
    }

    return res.status(500).json({ message: (error as any).message });
};
