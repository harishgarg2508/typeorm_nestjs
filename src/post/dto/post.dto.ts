import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostDTO{
   

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsNumber()
    @IsNotEmpty()
    userId:number

    
}