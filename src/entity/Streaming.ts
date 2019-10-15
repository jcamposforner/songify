import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  JoinColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import uuid from "uuid/v4";
import { User } from "./User";

@ObjectType()
@Entity()
export class Streaming extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column({ length: 30, default: "My very first title" })
  title: string;

  @Field()
  @Column({ length: 1000, default: "My very first description" })
  description: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Field()
  @Column({ unique: true })
  streamingToken: string;

  @Field()
  @Column("bool", { default: false })
  streamStatus: boolean;

  @BeforeInsert()
  async createToken() {
    this.streamingToken = await Buffer.from(uuid()).toString("base64");
  }
}
