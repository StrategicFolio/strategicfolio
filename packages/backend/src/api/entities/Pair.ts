import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Reserve } from "./Reserve";

@Entity()
export class Pair {
  @PrimaryColumn()
  pair: string;

  @Column()
  token0: string;

  @Column()
  token1: string;

  @Column()
  exchange: string;

  @OneToMany(() => Reserve, (reserve) => reserve.pair)
  reserves: Reserve[];
}
