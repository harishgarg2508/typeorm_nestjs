import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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


    @OneToMany(() => postEntity, post => post.user)// {eager:true} if using eager : true i dont have to specify relation : true in find method in userrepository
    posts: postEntity[];
}