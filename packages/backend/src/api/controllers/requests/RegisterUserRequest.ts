import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserRequest {
  @IsNotEmpty()
  @IsString({})
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
