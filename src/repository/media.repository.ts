import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { MediaEntity } from "src/media/entities/media.entity";
import { CreateMediaDto } from "src/media/dto/create-media.dto";
import { DataSource, Repository } from "typeorm";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";
import { postEntity } from "src/post/entities/post.entity";
import { User } from "src/User/entities/User.entity";

@Injectable()
export class MediaRepository extends Repository<MediaEntity> {
    constructor(private datasource: DataSource,private readonly userRepository: UserRepository,private readonly postRepository: PostRepository) {
        super(MediaEntity, datasource.createEntityManager());
    }


    async createMedia(createMediaDto: CreateMediaDto) {
     
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { postId, userId, ...rest } = createMediaDto;
            const post = await queryRunner.manager.findOneBy(postEntity, { id: postId });
            if (!post) {
                throw new NotFoundException(`Post with ID ${postId} not found.`);
            }

            const user = await queryRunner.manager.findOneBy(User, { id: userId });
            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found.`);
            }

            const media = queryRunner.manager.create(MediaEntity, {
                ...rest,
                post: post,
                user: user
            });
            const savedMedia = await queryRunner.manager.save(media);

            await queryRunner.commitTransaction();
            return savedMedia;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error);
        } finally {
            await queryRunner.release();
        }
    }

    async getMedia(): Promise<MediaEntity[]> {
        const media = await this.find({
            relations: { user: true, post: true }
        });
        return media;
    }
}
      
