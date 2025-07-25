import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User/entities/User.entity';
import { UserModule } from './User/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { postEntity } from './post/entities/post.entity';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { MediaModule } from './media/media.module';
import { MediaEntity } from './media/entities/media.entity';
import { CommentEntity } from './comments/entities/comments.entity';
import { LikeEntity } from './likes/entities/likes.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UserModule,
    PostModule,
    MediaModule,
    CommentsModule,
    LikesModule,
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
        synchronize: true,
        logging:true,
        migrationsTableName: 'typeorm_migrations',
        migrationsRun: false,
        entities: [User,postEntity,MediaEntity,CommentEntity,LikeEntity],
      }),
    }),
    CommentsModule,
    LikesModule,
    MediaModule,
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