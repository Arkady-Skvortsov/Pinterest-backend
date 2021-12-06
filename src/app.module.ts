import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
    }),

    // GraphQLModule.forRoot({
    //   playground: true,
    //   debug: false,
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      database: process.env.PG_DB,
      entities: ['./entities/*.entity.{ts, js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),

    AuthModule,
  ],
})
export class AppModule {}
