import { IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    content: string;
    postId: number;
    userId: number;
}
