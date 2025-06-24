import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/entities/user/User';
import { postEntity } from 'src/entities/post/post';
import * as dotenv from 'dotenv';
dotenv.config();

const rawDataSourceOptions = {
    type: process.env.DATABASE_TYPE as DataSourceOptions['type'],
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: true,
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
    entities: [User, postEntity],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;