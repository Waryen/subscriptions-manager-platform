import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail({}, { message: 'Invalid email format for property email' })
  @Field(() => String)
  email: string;

  @IsStrongPassword(
    {
      minLength: 10,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'Invalid password format',
    }
  )
  @Field(() => String)
  password: string;

  @MinLength(2, { message: 'firstname property is too short' })
  @MaxLength(50, { message: 'firstname property is too long' })
  @IsString({
    message: 'Invalid data type for firstname property, expecting string type',
  })
  @Field(() => String)
  firstname: string;

  @MinLength(2, { message: 'lastname property is too short' })
  @MaxLength(50, { message: 'lastname property is too long' })
  @IsString({
    message: 'Invalid data type for lastname property, expecting string type',
  })
  @Field(() => String)
  lastname: string;
}
