import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql'
import { RequestContext } from '../types/RequestContext'
import { User } from '../../entity/User'
import { IJwt } from 'server/src/interfaces/IJwt'
import { checkJwt } from '../middleware/checkJwt'

@Resolver(User)
export class MeResolver {
  @UseMiddleware(checkJwt)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: RequestContext): Promise<User | undefined> {
    if (!ctx.req.cookies) {
      return undefined
    }

    const userJwt: IJwt = ctx.req.cookies

    return User.findOne(userJwt.userId)
  }
}
