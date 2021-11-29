import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from '@users/users.module';
import { BoardsModule } from '@boards/boards.module';
import { PinsModule } from '@pins/pins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd() + '/graphql.gql'),
    }),

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

    BoardsModule,
    PinsModule,
    UsersModule,
    AuthModule,
    SearchModule,
  ],
})
export class AppModule {}
