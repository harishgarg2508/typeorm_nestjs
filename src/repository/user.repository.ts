import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entities/user/User';
import { Injectable, NotFoundException } from '@nestjs/common';
import { userType } from 'src/User/types/user.types';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private datasource: DataSource) {
        super(User, datasource.createEntityManager());
    }

    async createUser(userData: userType): Promise<User> {
        const user = this.create(userData);
        return this.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.find({
             relations:{
                    posts:true
                },
        });
    }

    async updateUser(userData: Partial<userType>, id: number): Promise<User> {
        await this.update(id, userData);
        const user = await this.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.delete(user);
        return user;
    }

    async findOneUser(id: number): Promise<User> {
        const user = await this.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}