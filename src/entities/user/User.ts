import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    phone:number;

    @Column()
    age:number

     @Column()
    test:number;
     @Column()
    test3:number;

    @Column()
    email:string

}