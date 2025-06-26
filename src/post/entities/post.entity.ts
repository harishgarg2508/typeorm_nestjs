import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../User/entities/User.entity";
import { MediaEntity } from "../../media/entities/media.entity";
import { LikeEntity } from "../../likes/entities/likes.entity";
import { CommentEntity } from "../../comments/entities/comments.entity";

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


