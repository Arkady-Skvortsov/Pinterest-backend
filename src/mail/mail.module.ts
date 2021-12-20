import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService], //Todo: Fix it module later with old version of @nestjs-module/mail[er] package
  exports: [MailService],
})
export class MailModule {}
