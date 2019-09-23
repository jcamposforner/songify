import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { sendEmail } from '../utils/sendEmail'
import { createConfirmationUrl } from '../utils/createConfirmationUrl'
import { Streaming } from '../../entity/Streaming'

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data')
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const streaming = new Streaming()
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    }).save()

    streaming.user = user
    streaming.save()

    await sendEmail(email, await createConfirmationUrl(user.id))

    return user
  }
}
