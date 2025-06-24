import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostDTO{
   

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsString()
    @IsNotEmpty()
    author:string;
    
}