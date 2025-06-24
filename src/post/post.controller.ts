import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostDTO } from "./dto/post.dto";
import { PaginationDTO } from "./dto/pagination.dto";

@Controller('post')
export class PostController{
    constructor(private readonly postService:PostService){}

    @Post()
    async createPost(@Body() postDTO:PostDTO){
        return await this.postService.createPost(postDTO)
    }
    @Get()
    async findAll(@Query() paginationDTO:PaginationDTO){
        return await this.postService.findAll(paginationDTO)
    }

    @Patch(':id')
    async update(@Body() UserDTO:PostDTO, @Param('id') id:number){
        return await this.postService.update(UserDTO,+id)
    }
    @Delete(':id')
    async delete(@Param('id') id:number){
        return await this.postService.delete(+id)
    }
    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.postService.findOne(+id)
    }
}