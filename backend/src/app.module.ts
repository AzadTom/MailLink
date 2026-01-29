import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionService } from './notion/notion.service';
import { NotionModule } from './notion/notion.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [NotionModule,ConfigModule.forRoot({
    isGlobal:true,
  }), MailModule],
  controllers: [AppController],
  providers: [AppService, NotionService,MailService],
})
export class AppModule {}
