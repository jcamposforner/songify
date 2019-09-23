import { InputType, Field } from 'type-graphql'
import { Length } from 'class-validator'

@InputType()
export class PasswordInput {
  @Field()
  @Length(6, 30)
  password: string
}
