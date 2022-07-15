import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { RegisterUserRequest } from "./requests/RegisterUserRequest";
import { UserService } from "../services/UserService";
import { LoginUserRequest } from "./requests/LoginUserRequest";
import { User } from "../entities/User";

@JsonController("/user")
@Service()
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/register")
  async register(@Body() input: RegisterUserRequest) {
    return await this.userService.register(input);
  }

  @Post("/login")
  async login(@Body() input: LoginUserRequest) {
    return await this.userService.login(input);
  }

  @Authorized()
  @Get("/profile")
  async profile(@CurrentUser() user: User) {
    return user;
  }
}
