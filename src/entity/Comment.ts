import {
    Entity,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
    Column
} from "typeorm";
import { User } from "./User";
import { ObjectType, Field } from "type-graphql";
import { PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @CreateDateColumn({ type: "timestamp" })
    @Field()
    created_at: number;

    @UpdateDateColumn({ type: "timestamp" })
    @Field()
    updatedAt: number;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;
}
