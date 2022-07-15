import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { PortfolioType } from "../enums";
import { User } from "./User";

@Entity()
@Unique(["address", "user"])
@Unique(["name", "user"])
export class Portfolio {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: "enum", enum: PortfolioType })
  type: PortfolioType;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.portfolios)
  @JoinColumn()
  @Exclude()
  user: User;
}
