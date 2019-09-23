import { MiddlewareFn } from "type-graphql";
import { RequestContext } from "../types/RequestContext";
import jwt from "jsonwebtoken";
import { IJwt } from "../../interfaces/IJwt";

export const checkJwt: MiddlewareFn<RequestContext> = async (
    { context },
    next
) => {
    if (!context.req.headers["authorization"]) {
        throw new Error("No Token Found");
    }

    const token = <string>context.req.headers["authorization"];

    try {
        const jwtPayload = <IJwt>(
            jwt.verify(token, <string>process.env.JWT_TOKEN)
        );
        context.req.cookies = jwtPayload;
    } catch (error) {
        throw new Error("Invalidated Token");
    }

    return next();
};
