import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    
    @CreateDateColumn()
    createdAt:Date
    
    @DeleteDateColumn()
    deletedAt:Date
    
    @ManyToOne(()=>User,user=>user.posts, { onDelete: 'CASCADE' })
    user:User

    @OneToMany(()=>LikeEntity,like=>like.post,{ onDelete: 'CASCADE' })
    likes:LikeEntity[]


    @OneToMany(()=>CommentEntity,comment=>comment.post,{ onDelete: 'CASCADE' })
    comments:CommentEntity[]

    @OneToMany(()=>MediaEntity,media=>media.post,{ onDelete: 'CASCADE' })
    media:MediaEntity[]







}
