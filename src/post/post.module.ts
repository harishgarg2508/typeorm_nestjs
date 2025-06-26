import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postEntity } from "src/post/entities/post.entity";
import { PostRepository } from "src/repository/post.repository"; 
import { UserRepository } from "src/repository/user.repository";
import { User } from "src/User/entities/User.entity";

@Module({
    imports:[TypeOrmModule.forFeature([postEntity, User])],
    controllers:[PostController],
    providers:[PostService, PostRepository,UserRepository],
    exports:[PostService]
})
export class PostModule{}