import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Portfolio } from "./Portfolio";

@Entity()
@Unique(["email"])
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: "boolean", default: false })
  emailVerified: boolean;

  /**
   * Used for email verification
   */
  @Column({ nullable: true })
  @Exclude()
  token: string;

  /**
   * Hash valid timestamp
   */
  @Column({ type: "timestamptz", nullable: true })
  @Exclude()
  tokenExpiredAt: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }

  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }

  public static comparePassword(
    user: User,
    password: string
  ): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(password, user.password, (_err, res) => {
        resolve(res === true);
      });
    });
  }
}
