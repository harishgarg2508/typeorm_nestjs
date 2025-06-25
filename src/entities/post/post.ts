import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User";
import { MediaEntity } from "../media/media.entity";
import { LikeEntity } from "../likes/likes.entity";
import { CommentEntity } from "../comments/comments.entity";

@Entity('posts')
export class postEntity{
    @PrimaryGeneratedColumn()   
    id:number;

    @Column()
    title:string;

    @Column()
    content:string;

    @Column({default:'public'})
    type:string;


    @ManyToOne(()=>User,user=>user.posts)
    user:User


    @CreateDateColumn()
    createdAt:Date


    @OneToMany(()=>LikeEntity,like=>like.post)
    likes:LikeEntity[]


    @OneToMany(()=>CommentEntity,comment=>comment.post)
    comments:LikeEntity[]

    @OneToMany(()=>MediaEntity,media=>media.post)
    media:MediaEntity[]







}


