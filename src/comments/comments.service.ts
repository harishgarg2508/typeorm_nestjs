import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from 'src/repository/comment.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.createComment(createCommentDto)
  }

  findAll() {
    return this.commentRepository.getComments()
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: Partial<CreateCommentDto>) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
