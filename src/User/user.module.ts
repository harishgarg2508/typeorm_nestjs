import { Module } from "@nestjs/common";
import { User } from "src/entities/user/User";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/repository/user.repository";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UserController],
    providers:[UserService,UserRepository],
    exports:[UserService]
})
export class UserModule{}