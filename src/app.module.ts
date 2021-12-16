import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { SearchModule } from './search/search.module';
import { FileModule } from './file/file.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      playground: true,
      debug: false,
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

    AuthModule,
    MediaModule,
    SearchModule,
    FileModule,
  ],
})
export class AppModule {}
