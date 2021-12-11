import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { MessagesModule } from './messages/messages.module';
import { MediaModule } from './media/media.module';
import { SearchModule } from './search/search.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { CommentsModule } from './comments/comments.module';
import { ChatModule } from './chat/chat.module';
import { BoardsModule } from './boards/boards.module';

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
    NotificationModule,
    MessagesModule,
    MediaModule,
    SearchModule,
    UserSettingsModule,
    CommentsModule,
    ChatModule,
    BoardsModule,
  ],
})
export class AppModule {}
