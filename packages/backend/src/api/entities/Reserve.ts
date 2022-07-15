import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Pair } from "./Pair";

@Entity()
export class Reserve {
  @PrimaryColumn()
  tx: string;

  @Column()
  block: number;

  @Column()
  timestamp: number;

  @Column()
  reserve0: string;

  @Column()
  reserve1: string;

  @ManyToOne(() => Pair, (pair) => pair.reserves)
  @JoinColumn({ name: "pair" })
  pair: Pair;
}
