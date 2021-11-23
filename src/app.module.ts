import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'assets'),
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('PG_HOST'),
          port: config.get('PG_PORT'),
          username: config.get('PG_USER'),
          database: config.get('PG_DB'),
          entities: ['./entities/**/*.entity.{ts, js}'],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),

    AuthModule,
    SearchModule,
  ],
})
export class AppModule {}
