import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import bcrypt from "bcryptjs";
import { ObjectType, Field, ID, Root } from "type-graphql";
import { Photo } from "./Photo";
import { Video } from "./Video";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("bool", { default: false })
  premium: boolean;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => Photo, { nullable: true })
  @OneToMany(() => Photo, photo => photo.user, { nullable: true, lazy: true })
  photos: Promise<Photo[]>;

  @Field(() => Video, { nullable: true })
  @OneToMany(() => Video, video => video.user, { nullable: true, lazy: true })
  videos: Promise<Video[]>;

  @OneToOne(() => Photo, { nullable: true })
  @JoinColumn()
  @Field(() => Photo, { nullable: true })
  avatar: Photo;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
