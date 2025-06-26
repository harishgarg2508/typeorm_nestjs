import { Injectable, NotFoundException } from "@nestjs/common";
import { PostType } from "./types/post.types";
import { PostRepository } from "src/repository/post.repository";
import { postEntity } from "src/post/entities/post.entity";
import { PostDTO } from "./dto/post.dto";
import { UserRepository } from "src/repository/user.repository";
import { PaginationDTO } from "./dto/pagination.dto";
import { FilterDTO } from "./dto/filters.dto";

@Injectable()
export class PostService{
    constructor(
        private readonly postRepository:PostRepository,
    ){}

    async createPost(postData: PostDTO): Promise<postEntity> {
        return this.postRepository.createPost(postData)
    }


    async findAll(paginationDTO:PaginationDTO):Promise<postEntity[]>{
        return this.postRepository.findAll(paginationDTO)
    }

    async update(postData:Partial<PostType>,id:number):Promise<postEntity>{
        return this.postRepository.updatePost(postData,id)

    }

    async delete(id:number):Promise<postEntity>{
        return this.postRepository.deletePost(id);
    }

    async findOne(id:number):Promise<postEntity>{
        return this.postRepository.findOnePost(id);
    }


    async filters(filterDTO: FilterDTO) {
        return this.postRepository.filters(filterDTO);
    }
}