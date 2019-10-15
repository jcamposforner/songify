import { MiddlewareFn } from "type-graphql";
import { RequestContext } from "../types/RequestContext";
import jwt from "jsonwebtoken";
import { IJwt } from "../../interfaces/IJwt";

export const isAuth: MiddlewareFn<RequestContext> = async (
  { context },
  next
) => {
  if (context.req.session!.userId) {
    return next();
  }

  if (context.req.headers["authorization"]) {
    const token = <string>context.req.headers["authorization"];

    try {
      const jwtPayload = <IJwt>jwt.verify(token, <string>process.env.JWT_TOKEN);
      context.req.session!.userId = jwtPayload.userId;
    } catch (error) {
      throw new Error("Invalidated Token");
    }

    return next();
  }

  throw new Error("Not authenticated");
};
