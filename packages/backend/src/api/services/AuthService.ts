import JWT from "jsonwebtoken";
import { Service } from "typedi";
import { User } from "../entities/User";
import config from "../../config";

@Service()
export class AuthService {
  constructor() {}

  sign(user: User) {
    const token = JWT.sign({ id: user.id }, config.jwt.secret);

    return token;
  }
}
