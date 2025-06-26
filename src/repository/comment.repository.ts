import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "src/comments/dto/create-comment.dto";
import { CommentEntity } from "src/comments/entities/comments.entity";
import { DataSource } from "typeorm";

import { Repository } from "typeorm";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";
import { User } from "src/User/entities/User.entity";
import { postEntity } from "src/post/entities/post.entity";

@Injectable()
export class CommentRepository extends Repository<CommentEntity> {

    constructor(private datasource: DataSource, private readonly userRepository: UserRepository, private readonly postRepository: PostRepository) {

        super(CommentEntity, datasource.createEntityManager());
    }



    async createComment(createCommentDto: CreateCommentDto) {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { postId, userId, ...rest } = createCommentDto;

            const user = await queryRunner.manager.findOneBy(User, { id: userId });
            if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);

            const post = await queryRunner.manager.findOneBy(postEntity, { id: postId });
            if (!post) throw new NotFoundException(`Post with ID ${postId} not found.`);

            const comment = queryRunner.manager.create(CommentEntity, {
                ...rest,
                user: user,
                post: post,
            });
            const savedComment = await queryRunner.manager.save(comment);
            await queryRunner.commitTransaction();
            return savedComment;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error);
        } finally {
            await queryRunner.release();
        }
    }

    async getComments(): Promise<CommentEntity[]> {
        const comments = await this.find({
            relations: { user: true, post: true },
        });
        return comments;
    }
}
      
