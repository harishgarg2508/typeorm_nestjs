import { DataSource, Repository, IsNull } from 'typeorm';
import { User } from 'src/User/entities/User.entity';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { userType } from 'src/User/types/user.types';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }


    async createUser(userData: userType): Promise<User> { 
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // const { email } = userData;

            // const existingUser = await queryRunner.manager.findOne(User, {
            //     where: { email },
            //     withDeleted: true,
            // });

            // if (existingUser) {
            //     if (!existingUser.deletedAt) {
            //         throw new ConflictException(`User with email ${email} already exists.`);
            //     }
            //     await queryRunner.manager.create(User, existingUser);
            //     return existingUser;
            // }

            const newUser = queryRunner.manager.create(User, userData);
            const savedUser = await queryRunner.manager.save(newUser);

            await queryRunner.commitTransaction();
            return savedUser;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof ConflictException) throw error;
            throw new InternalServerErrorException('An error occurred while creating the user.', error.message);
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(): Promise<User[]> {
        return this.find({
            relations: {
                posts: true,
                comments: true,
                likes: true,
                media: true
            },
        });
    }

    async updateUser(userData: Partial<userType>, id: number): Promise<User> {

        const userToUpdate = await this.findOne({ where: { id, deletedAt: IsNull() } });
        if (!userToUpdate) {
            throw new NotFoundException(`Active user with ID ${id} not found.`);
        }

        if (userData.email && userData.email !== userToUpdate.email) {
            const existingUser = await this.findOneBy({ email: userData.email });
            if (existingUser) {
                throw new ConflictException(`Email ${userData.email} is already in use.`);
            }
        }

        Object.assign(userToUpdate, userData);
        return this.save(userToUpdate);
    }

    async deleteUser(id: number): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await queryRunner.manager.findOne(User, {
                where: { id },
                relations: ["posts", "comments", "likes", "media"],
            });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            await queryRunner.manager.softRemove([
                   user,
                ...user.posts,
                ...user.comments,
                ...user.likes,
                ...user.media,
            ]);
            user.isActive = !user.isActive;
            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
            return user;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Could not soft-delete user and their data.', error.message);
        } finally {
            await queryRunner.release();
        }
    }

    async findOneUser(id: number): Promise<User> {
        const user = await this.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
