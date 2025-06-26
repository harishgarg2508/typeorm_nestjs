import { Module } from "@nestjs/common";
import { User } from "src/User/entities/User.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postEntity } from "src/post/entities/post.entity";
import { UserRepository } from "src/repository/user.repository";

@Module({
    imports:[TypeOrmModule.forFeature([User])], 
    controllers:[UserController],
    providers:[UserService, UserRepository], 
    exports:[UserService]
})
export class UserModule{}