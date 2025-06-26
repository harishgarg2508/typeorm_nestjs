import { IsInt, IsString } from "class-validator";

export class CreateMediaDto {
    @IsString()
    url?: string;
    @IsString()
    type?: string;
    // e.g., image, video, document
    @IsString()
    fileName?: string;
    @IsInt()
    postId: number;
    @IsInt()
    userId: number;


}

