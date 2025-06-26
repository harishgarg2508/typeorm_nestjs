import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesRepository } from 'src/repository/likes.repository';

@Injectable()
export class LikesService {
  constructor(private readonly likeRepository: LikesRepository) {}

  create(createLikeDto: CreateLikeDto) {
    return this.likeRepository.createLike(createLikeDto);
  }

  findAll() {
    return this.likeRepository.getLikes();
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number) {
    return this.likeRepository.updateLike(id);
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
