import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "src/comments/dto/create-comment.dto";
import { CommentEntity } from "src/entities/comments/comments.entity";
import { DataSource } from "typeorm";

import { Repository } from "typeorm";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";

@Injectable()
export class CommentRepository extends Repository<CommentEntity> {
    
     constructor(private datasource: DataSource,private readonly userRepository: UserRepository,private readonly postRepository: PostRepository) {
            
            super(CommentEntity, datasource.createEntityManager());
        }




    async createComment(createCommentDto: CreateCommentDto) {
        console.log(createCommentDto)
        const { postId, userId, ...rest } = createCommentDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        const post = await this.postRepository.findOneBy({ id: postId });
        if (!user || !post) {
            throw new NotFoundException('User or post not found');
        }
        const comment = this.create({
            ...rest,
            user: user,
            post: post
        });
        return this.save(comment);
    
}
}