import {
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export abstract class Content extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    slug: string;

    @Column({ default: false })
    active: boolean;

    @CreateDateColumn({ type: "timestamp" })
    @Field()
    created_at: number;

    @UpdateDateColumn({ type: "timestamp" })
    @Field()
    updatedAt: number;
}
