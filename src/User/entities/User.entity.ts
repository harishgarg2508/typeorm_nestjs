import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { postEntity } from "../../post/entities/post.entity";
import { LikeEntity } from "../../likes/entities/likes.entity";
import { CommentEntity } from "../../comments/entities/comments.entity";
import { MediaEntity } from "../../media/entities/media.entity";

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

    @Column({default:'male'})
    gender:string

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => postEntity, post => post.user)// {eager:true} if using eager : true i dont have to specify relation : true in find method in userrepository
    posts: postEntity[];

    @OneToMany(()=>LikeEntity,like=>like.post)
    likes:LikeEntity

    @OneToMany(()=>CommentEntity,comment=>comment.user)
    comments:LikeEntity

    @OneToMany(()=>MediaEntity,media=>media.post)
    media:MediaEntity[]
   

}