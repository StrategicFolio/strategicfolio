import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserResponse {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
