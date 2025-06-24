import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostType } from 'src/post/types/post.types';
import { postEntity } from 'src/entities/post/post';
import { PaginationDTO } from 'src/post/dto/pagination.dto';
import { DEFAULT_PAGE_LIMIT } from 'src/utils/constants';

@Injectable()
export class PostRepository extends Repository<postEntity> {
    constructor(private datasource: DataSource) {
        super(postEntity, datasource.createEntityManager());
    }

    async createPost(postData: PostType): Promise<postEntity> {
        const post = this.create(postData);
        return this.save(post);
    }

    async findAll(paginationDTO:PaginationDTO): Promise<postEntity[]> {
        return this.find(
            {
                skip:paginationDTO.skip,
                take:paginationDTO.limit ?? DEFAULT_PAGE_LIMIT,
                relations:{
                    user:true
                },
            },
        );
    }
 
    async updatePost(postData: Partial<PostType>, id: number): Promise<postEntity> {
        const result = await this.update(id, postData);
        if (result.affected === 0) {
            throw new NotFoundException(`Post with ID ${id} not found.`);
        }
        return this.findOnePost(id);
    }

    async deletePost(id: number): Promise<postEntity> {
        const post = await this.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('post not found');
        }
        await this.delete(post);
        return post;
    }

    async findOnePost(id: number): Promise<postEntity> {
        const post = await this.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('post not found');
        }
        return post;
    }
}