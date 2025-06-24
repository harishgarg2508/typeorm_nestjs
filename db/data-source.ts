import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user/User';

const configService = new ConfigService();

const rawDataSourceOptions = {
    type: (configService.get<string>('DATABASE_TYPE') as DataSourceOptions['type']),
    host: configService.get<string>('DATABASE_HOST'),
    port: Number(configService.get<string>('DATABASE_PORT')),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    synchronize: false,
    // autoLoadEntities: true, // if using this then no need to pass entities seperately
    logging: true,
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
    entities: [User],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;


const dataSource = new DataSource(dataSourceOptions);


export default dataSource;

//npm run migration:generate -- db/migrations/test3