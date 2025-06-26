import { PostDTO } from 'src/post/dto/post.dto';
import { DataSource, FindOptionsWhere, Repository, Like } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { postEntity } from 'src/post/entities/post.entity';
import { PaginationDTO } from 'src/post/dto/pagination.dto';
import { DEFAULT_PAGE_LIMIT } from 'src/utils/constants';
import { UserRepository } from './user.repository';
import { User } from 'src/User/entities/User.entity';
import { FilterDTO } from 'src/post/dto/filters.dto';

@Injectable()
export class PostRepository extends Repository<postEntity> {
    constructor(private dataSource: DataSource, private readonly userRepository: UserRepository,) {
        super(postEntity, dataSource.createEntityManager());
    }

    async createPost(postData: PostDTO): Promise<postEntity> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const { userId, ...restOfPostData } = postData;
            const user = await queryRunner.manager.findOneBy(User, { id: userId });
            if (!user) {
                throw new NotFoundException(`User  not found`);
            }
            const post = queryRunner.manager.create(postEntity, { ...restOfPostData, user });
            const SavedPost = await queryRunner.manager.save(post);
            await queryRunner.commitTransaction();
            return SavedPost
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;

        } finally {
            await queryRunner.release();
        }
    }

    async findAll(paginationDTO: PaginationDTO): Promise<postEntity[]> {
        return this.find(
            {
                skip: paginationDTO.skip,
                take: paginationDTO.limit ?? DEFAULT_PAGE_LIMIT,
                relations: {
                    user: true,
                    comments: true,
                    media: true,
                    likes: true

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
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction()
        try {
            const post = await queryRunner.manager.findOne(postEntity, {
                where: { id },
                relations: ["comments", "media", "likes"]
            });

            if(!post){
                throw new NotFoundException(`Post with ID ${id} not found`);
            }
            await queryRunner.manager.remove([
                ...post.comments,
                ...post.media,
                ...post.likes
            ]);
            await queryRunner.commitTransaction();
            return post;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new NotFoundException(`Post with ID ${id} not found`);

        } finally{
            await queryRunner.release();
        }

    }

    async findOnePost(id: number): Promise<postEntity> {
  
        const post = await this.createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("post.comments", "comments")
            .leftJoinAndSelect("post.media", "media")
            .leftJoinAndSelect("post.likes", "likes")
            .where("post.id = :id", { id })
            .getOne();

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    async filters(filterDTO: FilterDTO): Promise<postEntity[]> {
        const { title, content } = filterDTO;
     
        const query = this.createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("post.comments", "comments")
            .leftJoinAndSelect("post.media", "media")
            .leftJoinAndSelect("post.likes", "likes");

        if (title) {
            query.andWhere("post.title LIKE :title", { title: `%${title}%` });
        }

        if (content) {
            query.andWhere("post.content LIKE :content", { content: `%${content}%` });
        }

        return query.getMany();
    }
}