import { Injectable, NotFoundException } from "@nestjs/common";
import { MediaEntity } from "src/entities/media/media.entity";
import { CreateMediaDto } from "src/media/dto/create-media.dto";
import { DataSource, Repository } from "typeorm";
import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";

@Injectable()
export class MediaRepository extends Repository<MediaEntity> {
    constructor(private datasource: DataSource,private readonly userRepository: UserRepository,private readonly postRepository: PostRepository) {
        super(MediaEntity, datasource.createEntityManager());
    }


    async createMedia(createMediaDto: CreateMediaDto) {
        console.log(createMediaDto);
        const { postId,userId, ...rest } = createMediaDto;
        const post = await this.postRepository.findOneBy({ id: postId });
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!post || !user) {
            throw new NotFoundException('Post not found');
        }
        const media = this.create({
            ...rest,
            post: post,
            user:user
        });
        console.log(media);
        return  this.save(media);
    }
}
      
