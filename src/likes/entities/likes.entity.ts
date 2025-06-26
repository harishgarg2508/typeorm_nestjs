import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { User } from "../../User/entities/User.entity";
import { postEntity } from "../../post/entities/post.entity";

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => postEntity, post => post.likes)
    post: postEntity;

   
}
