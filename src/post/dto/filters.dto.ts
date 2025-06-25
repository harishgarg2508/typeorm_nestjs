import { IsOptional, IsString } from "class-validator"

export class FilterDTO{
    @IsOptional()
    @IsString()
    title?:string
    @IsOptional()
    @IsString()
    content?:string
}