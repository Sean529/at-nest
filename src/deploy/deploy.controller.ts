import { Controller, Get, Query } from '@nestjs/common';
import { DeployService } from './deploy.service';

@Controller()
export class DeployController {
  constructor(private readonly deployService: DeployService) {}

  @Get('deploy')
  deploy(@Query() query) {
    return this.deployService.deploy(query);
  }
}
