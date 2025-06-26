import { IsBoolean, IsInt } from "class-validator";

export class CreateLikeDto {

    @IsBoolean()
    isLiked: boolean;
    @IsInt()
    userId: number;
    @IsInt()
    postId: number;
}
