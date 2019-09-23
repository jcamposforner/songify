import { User } from '../../../entity/User'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Login {
  @Field()
  user: User

  @Field()
  token: string
}
