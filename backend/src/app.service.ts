import { Injectable } from '@nestjs/common';
import { NotionService } from './notion/notion.service';
import { MailService } from './mail/mail.service';
import { newRecordEmailDto } from './dto/record.dto';

@Injectable()
export class AppService {

    constructor(private notionSerive: NotionService,private mailService:MailService) { }
    getDBEmailList = async (number:string,cursor:string,limit:number,start:number,end:number,select:string) => {
        const response = await this.notionSerive.getDBEmailList(number,cursor,limit,start,end,select);
        return response;
    }

    updateEmailList = async(email:string)=>{
        const response = await this.notionSerive.updateEmail(email);
        return response;
    }

    addNewRecord = async(newEmailDto:newRecordEmailDto)=>{
        const response = await this.notionSerive.addNewRecord(newEmailDto);
        return response;
    }

    getDBEmailMessageList = async(number:string)=>{
        const response = await this.notionSerive.getDBEmailMessageList(number);
        return response;
    }

    sendEmail = async(email:string,subject:string,content:string,name:string,company:string)=>{
        const response = await this.mailService.sendEmail(email,subject,content,name,company);
        return response;
    }
}
