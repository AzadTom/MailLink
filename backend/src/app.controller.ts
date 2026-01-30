import { Body, Controller, Get, Post, Query, Render, Res, } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  emailCLientEngine() {
    return {
      message: "api is working",
    }
  }

  @Get("/email_list")
  async getEmailList(@Query("cursor") cursor: string, @Query("limit") limit: string, @Query("start") start: string, @Query("end") end: string) {
    const response = await this.appService.getDBEmailList("2e94c8a2-1d01-8101-926c-000bf61deb52", cursor, Number(limit), Number(start), Number(end));
    return response;
  }

  @Get("/email_message_list")
  async getEmailMessageList() {
    const response = await this.appService.getDBEmailMessageList('2f14c8a2-1d01-8096-817b-000b8a060253');
    return response;
  }

  @Post("/send-email")
  async sendEmail(@Body("email") email: string, @Body("subject") subject: string, @Body("content") content: string, @Body("name") name: string,@Body("company") company:string) {
    const response = await this.appService.sendEmail(email, subject, content, name,company);
    return response;
  }
}
