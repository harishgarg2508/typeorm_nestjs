import { PostDTO } from 'src/post/dto/post.dto';
import { DataSource, FindOptionsWhere, Repository, Like } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { postEntity } from 'src/post/entities/post.entity';
import { PaginationDTO } from 'src/post/dto/pagination.dto';
import { DEFAULT_PAGE_LIMIT } from 'src/utils/constants';
import { UserRepository } from './user.repository';
import { FilterDTO } from 'src/post/dto/filters.dto';

@Injectable()
export class PostRepository extends Repository<postEntity> {
    constructor(private datasource: DataSource,private readonly userRepository: UserRepository,) {
        super(postEntity, datasource.createEntityManager());
    }

    async createPost(postData: PostDTO): Promise<postEntity> {
        const { userId, ...restOfPostData } = postData;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(`User  not found`);
        }
        const post = this.create({ ...restOfPostData, user });
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
 
    async updatePost(postData: Partial<PostDTO>, id: number): Promise<postEntity> {
        const postToUpdate = await this.findOnePost(id);

        const { userId, ...rest } = postData;
        Object.assign(postToUpdate, rest);

        if (userId) {
            const user = await this.userRepository.findOneBy({ id: userId });
            if (!user) throw new NotFoundException(`User with ID not found`);
            postToUpdate.user = user;
        }
        return this.save(postToUpdate);
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
        const post = await this.findOne({ where: { id }, relations: { user: true } });
        if (!post) {
            throw new NotFoundException('post not found');
        }
        return post;
    }

    async filters(filterDTO: FilterDTO): Promise<postEntity[]> {
        const { title, content } = filterDTO;
        const conditions: FindOptionsWhere<postEntity> = {
            ...(title ? { title: Like(`%${title}%`) } : {}),
            ...(content ? { content: Like(`%${content}%`) } : {})
        };

        return this.find({ 
            where:conditions ,
            relations: { user: true },
            select: {
                content:true,
                user:{
                    name:true
                }
            }
        });
    }
}