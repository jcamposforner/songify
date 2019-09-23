import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Login } from './types/Login'
import { RequestContext } from '../types/RequestContext'

@Resolver()
export class LoginResolver {
  @Mutation(() => Login, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: RequestContext
  ): Promise<Login | null> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return null
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return null
    }

    if (!user.confirmed) {
      return null
    }

    const token: string = jwt.sign(
      { userId: user.id as number },
      <string>process.env.JWT_TOKEN,
      { expiresIn: '1h' }
    )

    ctx.req.session!.userId = user.id

    return { user, token }
  }
}
