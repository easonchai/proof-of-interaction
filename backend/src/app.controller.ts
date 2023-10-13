import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:tokenId')
  async getTokenMetadata(@Param('tokenId') tokenId: string): Promise<any> {
    return await this.appService.getTokenMetadata(tokenId);
  }
}
