import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { postEntity } from "../post/post";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @OneToMany(() => postEntity, post => post.user)
    posts: postEntity[];
}