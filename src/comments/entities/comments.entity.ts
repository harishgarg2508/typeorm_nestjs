import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "../../User/entities/User.entity";
import { postEntity } from "../../post/entities/post.entity"; // Assuming postEntity is in ../post/post

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(() => User, user => user.comments,{ onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => postEntity, post => post.comments, { onDelete: 'CASCADE' })
    post: postEntity;

}
