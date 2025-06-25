import { Injectable, NotFoundException } from "@nestjs/common";
import { LikeEntity } from "src/entities/likes/likes.entity";
import { CreateLikeDto } from "src/likes/dto/create-like.dto";
import { DataSource } from "typeorm";

import { Repository } from "typeorm";
import { PostRepository } from "./post.repository";
import { UserRepository } from "./user.repository";

@Injectable()
export class LikesRepository extends Repository<LikeEntity> {

    
     constructor(private datasource: DataSource,private readonly userRepository: UserRepository,private readonly postRepository: PostRepository) {
            super(LikeEntity, datasource.createEntityManager());
        }




    async createLike(createLikeDto: CreateLikeDto) {
        const { postId, userId, ...rest } = createLikeDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        const post = await this.postRepository.findOneBy({ id: postId });
        if (!user || !post) {
            throw new NotFoundException('User or post not found');
}
        const like = this.create({
            ...rest,
            user: user,
            post: post
        });
        return this.save(like);
    
}
}