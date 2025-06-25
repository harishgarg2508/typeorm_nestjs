import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from 'src/repository/media.repository';
import { MediaEntity } from 'src/entities/media/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { PostRepository } from 'src/repository/post.repository';
import { User } from 'src/entities/user/User';
import { postEntity } from 'src/entities/post/post';

@Module({
      imports:[TypeOrmModule.forFeature([MediaEntity,User,postEntity])], 
  
  controllers: [MediaController],
  providers: [MediaService,MediaRepository,UserRepository,PostRepository],
})
export class MediaModule {}
