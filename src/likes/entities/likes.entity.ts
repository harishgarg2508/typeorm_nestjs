import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "../../User/entities/User.entity";
import { postEntity } from "../../post/entities/post.entity";

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isLiked: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => postEntity, post => post.likes, { onDelete: 'CASCADE' })
    post: postEntity;

   
}
