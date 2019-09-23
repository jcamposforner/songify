import { InputType, Field } from 'type-graphql'
import { Length, IsEmail } from 'class-validator'
import { IsEmailAlreadyExist } from './isEmailAlreadyUsed'
import { PasswordInput } from '../../shared/PasswordInput'

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 30)
  firstName: string

  @Field()
  @Length(1, 30)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email has already taken' })
  email: string
}
