import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('test')
  test() {
    return this.appService.test()
  }
  @Get('clone')
  clone(): any {
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

  @Get('checkout')
  checkout(): any {
    return this.appService.checkout();
  }

  @Get('build')
  build(): any {
    return this.appService.build();
  }
}
