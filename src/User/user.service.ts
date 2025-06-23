import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user/User";
import { userType } from "./types/user.types";
import { UserRepository } from "src/repository/user.repository";

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
        return this.userRepository.deleteUser(id);
    }

    async findOne(id:number):Promise<User>{
        return this.userRepository.findOneUser(id);
    }
}