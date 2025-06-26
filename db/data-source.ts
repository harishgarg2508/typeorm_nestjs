import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/User/entities/User.entity';
import { postEntity } from 'src/post/entities/post.entity';
import * as dotenv from 'dotenv';
import { MediaEntity } from 'src/media/entities/media.entity';
import { LikeEntity } from 'src/likes/entities/likes.entity';
import { CommentEntity } from 'src/comments/entities/comments.entity';
dotenv.config();

const rawDataSourceOptions = {
    type: process.env.DATABASE_TYPE as DataSourceOptions['type'],
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
    entities: [User, postEntity,MediaEntity,LikeEntity,CommentEntity],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;