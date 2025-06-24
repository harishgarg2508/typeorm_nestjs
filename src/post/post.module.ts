import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postEntity } from "src/entities/post/post";
import { PostRepository } from "src/repository/post.repository"; 

@Module({
    imports:[TypeOrmModule.forFeature([postEntity])],
    controllers:[PostController],
    providers:[PostService, PostRepository],
    exports:[PostService]
})
export class PostModule{}