import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LikeEntity } from "src/likes/entities/likes.entity";
import { CreateLikeDto } from "src/likes/dto/create-like.dto";
import { DataSource } from "typeorm";

import { Repository } from "typeorm";
import { PostRepository } from "./post.repository";
import { UserRepository } from "./user.repository";
import { User } from "src/User/entities/User.entity";
import { postEntity } from "src/post/entities/post.entity";

@Injectable()
export class LikesRepository extends Repository<LikeEntity> {


    constructor(private datasource: DataSource, private readonly userRepository: UserRepository, private readonly postRepository: PostRepository) {
        super(LikeEntity, datasource.createEntityManager());
    }


    async createLike(createLikeDto: CreateLikeDto) {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { postId, userId, isLiked } = createLikeDto;

            const user = await queryRunner.manager.findOneBy(User, { id: userId });
            if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);

            const post = await queryRunner.manager.findOneBy(postEntity, { id: postId });
            if (!post) throw new NotFoundException(`Post with ID ${postId} not found.`);

            let like = await queryRunner.manager.findOne(LikeEntity, {
                where: { user: { id: userId }, post: { id: postId } },
            });

            if (like) {
                like.isLiked = isLiked;
            } else {
                like = queryRunner.manager.create(LikeEntity, {
                    isLiked,
                    user,
                    post,
                });
            }
            const savedLike = await queryRunner.manager.save(like);
            await queryRunner.commitTransaction();
            return savedLike;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error);
        } finally {
            await queryRunner.release();
        }
    }

    async getLikes(): Promise<LikeEntity[]> {
        const likes = await this.find(
            {
                relations: {
                    user: true,
                    post: true,
                }
            }
        );
        return likes;
    }

    async updateLike(id: number): Promise<LikeEntity> {
      
        const like = await this.findOne({
            where: { id },
            relations: { user: true, post: true },
        });

        if (!like) {
            throw new NotFoundException(`Like with ID ${id} not found`);
        }

       
        if (!like.user || like.user.deletedAt) {
            throw new NotFoundException(`Cannot update like as user is deleted or does not exist`);
        }
        if(!like.post || like.post.deletedAt) {
            throw new NotFoundException(`Cannot update like as post is deleted or does not exist`);
        }

        like.isLiked = !like.isLiked;
        return this.save(like);
    }

}