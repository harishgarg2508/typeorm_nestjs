import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { postEntity } from "../../post/entities/post.entity";
import { LikeEntity } from "../../likes/entities/likes.entity";
import { CommentEntity } from "../../comments/entities/comments.entity";
import { MediaEntity } from "../../media/entities/media.entity";
import { Delete } from "@nestjs/common";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({unique:true})
    email: string;

    @Column({default:'male'})
    gender:string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => postEntity, post => post.user)// {eager:true} if using eager : true i dont have to specify relation : true in find method in userrepository
    posts: postEntity[];

    @OneToMany(()=>LikeEntity,like=>like.user)
    likes:LikeEntity[]

    @OneToMany(()=>CommentEntity,comment=>comment.user)
    comments:CommentEntity[]

    @OneToMany(()=>MediaEntity,media=>media.user)
    media:MediaEntity[]
   

}