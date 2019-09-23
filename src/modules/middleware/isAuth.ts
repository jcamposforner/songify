import { MiddlewareFn } from "type-graphql";
import { RequestContext } from "../types/RequestContext";

export const isAuth: MiddlewareFn<RequestContext> = async (
    { context },
    next
) => {
    if (!context.req.session!.userId) {
        throw new Error("Not Authenticated");
    }

    return next();
};
