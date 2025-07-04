import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaRepository } from 'src/repository/media.repository';

@Injectable()
export class MediaService {

  constructor(private readonly mediaRepository: MediaRepository) {}

  async create(createMediaDto: CreateMediaDto) {
    return await this.mediaRepository.createMedia(createMediaDto);
  }

  findAll() {
    return this.mediaRepository.getMedia();
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: CreateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
