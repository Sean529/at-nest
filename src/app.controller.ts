import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('clone')
  clone(): string {
    return this.appService.clone();
  }

  @Get('getGitInfo')
  getGitInfo(): any {
    return this.appService.getGitInfo();
  }

  @Get('getBranches')
  getBranches(): any {
    return this.appService.getBranches();
  }
}
