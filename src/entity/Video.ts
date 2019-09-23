import { Content } from "./abstract/Content";
import { OneToOne, JoinColumn, Entity, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Photo } from "./Photo";
import { User } from "./User";

@ObjectType()
@Entity()
export class Video extends Content {
    @OneToOne(() => Photo)
    @JoinColumn()
    @Field(() => Photo)
    thumbmail: Photo;

    @ManyToOne(() => User, user => user.photos)
    @Field(() => User)
    user: User;
}
