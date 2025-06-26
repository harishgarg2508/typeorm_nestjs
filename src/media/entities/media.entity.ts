import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from "typeorm";
import { postEntity } from "../../post/entities/post.entity";
import { User } from "../../User/entities/User.entity";

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

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => postEntity, post => post.media,{ onDelete: 'CASCADE' })
    post: postEntity;


    @ManyToOne(() => User, user => user.media,{ onDelete: 'CASCADE' })
    user: User;
    
}
