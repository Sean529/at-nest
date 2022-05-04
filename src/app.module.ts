import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeployModule } from './deploy/deploy.module';

@Module({
  imports: [HttpModule, DeployModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
