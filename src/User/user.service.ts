import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/User/entities/User.entity";
import { userType } from "./types/user.types";
import { UserRepository } from "src/repository/user.repository";
import { DataSource } from "typeorm";

@Injectable()
export class UserService{
    constructor(private readonly userRepository:UserRepository){}

    async createUser( userData:userType):Promise<User>{
        return this.userRepository.createUser(userData);    
    }


    async findAll():Promise<User[]>{
        return this.userRepository.findAll()
    }

    async update(userData:Partial<userType>,id:number):Promise<User>{
        return this.userRepository.updateUser(userData,id)

    }

    async delete(id:number):Promise<User>{
        const user = await this.userRepository.deleteUser(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    async findOne(id:number):Promise<User>{
        return this.userRepository.findOneUser(id);
    }
}