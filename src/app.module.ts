import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/User';
import { UserModule } from './User/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: Number(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        logging:true,
        migrationsTableName:'typeorm_migrations',
        migrationsRun:false,
        entities: [User],
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


//Using forroot

// @Module({
//   imports: [UserModule,
//     TypeOrmModule.forRoot({
//       type:'postgres',
//       host:'localhost',
//       port:5432,
//       username:"harish",
//       password:'harish',
//       database:'nestjs',
//       autoLoadEntities:true,
//       synchronize:true,
//       entities:[User],

//     }),
//     TypeOrmModule.forFeature([User])
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })