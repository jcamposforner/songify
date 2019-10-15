import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { RequestContext } from "../types/RequestContext";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";

@Resolver(User)
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: RequestContext): Promise<User | undefined> {
    if (!ctx.req.session) {
      return undefined;
    }

    const userJwt: number = ctx.req.session!.userId;

    return User.findOne(userJwt);
  }
}
