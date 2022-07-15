import crypto from "crypto";
import { DateTime } from "luxon";
import { Service } from "typedi";
import { LoginUserRequest } from "../controllers/requests/LoginUserRequest";
import { RegisterUserRequest } from "../controllers/requests/RegisterUserRequest";
import { LoginUserResponse } from "../controllers/responses/LoginUserResponse";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "./AuthService";
import { MailService } from "./MailService";

@Service()
export class UserService {
  constructor(
    private authService: AuthService,
    private mailService: MailService
  ) {}

  async register(request: RegisterUserRequest) {
    const { username, email } = request;
    const existingUsers = await this.findByUsernameOrEmail(username, email);
    if (existingUsers.length) {
      throw new Error("User already exists!");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const user = UserRepository.create({
      ...request,
      token,
      tokenExpiredAt: DateTime.utc().plus({ minutes: 15 }),
    });
    await UserRepository.save(user);

    await this.sendRegisterVerificationEmail(user);

    return user;
  }

  async sendRegisterVerificationEmail(user: User) {
    await this.mailService.send(
      "no-reply@strategicfolio.com",
      user.email,
      "Email Verification Required.",
      "Verify your email"
    );
  }

  async login(request: LoginUserRequest): Promise<LoginUserResponse> {
    const { email, password } = request;
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    const isCorrectPassword = await User.comparePassword(user, password);
    if (!isCorrectPassword) {
      throw new Error("Wrong password.");
    }

    const accessToken = this.authService.sign(user);

    return {
      accessToken,
    };
  }

  async findOneByEmail(email: string) {
    return await UserRepository.findOneBy({ email });
  }

  async findByUsernameOrEmail(username: string, email: string) {
    const result = await UserRepository.find({
      where: [{ username }, { email }],
    });
    return result;
  }
}
