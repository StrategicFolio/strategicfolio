import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tx: string;

  @Column()
  address: string;

  @Column()
  amount0In: string;

  @Column()
  amount1In: string;

  @Column()
  amount0Out: string;

  @Column()
  amount1Out: string;

  @Column()
  pair: string;
}
