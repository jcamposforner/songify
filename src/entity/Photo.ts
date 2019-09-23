import { Content } from "./abstract/Content";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Photo extends Content {
    @Column()
    @Field()
    size: string;

    @ManyToOne(() => User, user => user.photos)
    @Field(() => User)
    user: User;
}
