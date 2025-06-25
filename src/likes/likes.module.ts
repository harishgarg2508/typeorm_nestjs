import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository} from 'src/repository/likes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from 'src/entities/likes/likes.entity';
import { UserRepository } from 'src/repository/user.repository';
import { PostRepository } from 'src/repository/post.repository';

@Module({
  imports:[TypeOrmModule.forFeature([LikeEntity])],  
  controllers: [LikesController],
  providers: [LikesService,LikesRepository,UserRepository,PostRepository],
})
export class LikesModule {}
