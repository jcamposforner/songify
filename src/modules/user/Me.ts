import {
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
  Arg
} from "type-graphql";
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

  @FieldResolver()
  email(
    @Root() parent: User,
    @Arg("email", { nullable: true }) email: string = parent.email
  ) {
    return email;
  }
}
