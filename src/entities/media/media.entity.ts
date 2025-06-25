import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { postEntity } from "../post/post";
import { User } from "../user/User";

@Entity('media')
export class MediaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url?: string;

    @Column()
    type?: string; 

    @Column()
    fileName?: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => postEntity, post => post.media)
    post: postEntity;


    @ManyToOne(() => User, user => user.media)
    user: User;
    
}
