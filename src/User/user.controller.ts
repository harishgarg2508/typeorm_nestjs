import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./dto/user.dto";

@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Post()
    async createUser(@Body() userDTO:UserDTO){
        return await this.userService.createUser(userDTO)
    }
    @Get()
    async findAll(){
        return await this.userService.findAll()
    }

    @Patch(':id')
    async update(@Body() UserDTO:UserDTO, @Param('id') id:number){
        return await this.userService.update(UserDTO,+id)
    }
    @Delete(':id')
    async delete(@Param('id') id:number){
        return await this.userService.delete(+id)
    }
    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.userService.findOne(+id)
    }
}