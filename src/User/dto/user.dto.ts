import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDTO{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    age:number;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsString()
    @IsNotEmpty()
    gender:string;


}