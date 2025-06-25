import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User";

@Entity('posts')
export class postEntity{
    @PrimaryGeneratedColumn()   
    id:number;

    @Column()
    title:string;

    @Column()
    content:string;

 
    @ManyToOne(()=>User,user=>user.posts)
    user:User
}


