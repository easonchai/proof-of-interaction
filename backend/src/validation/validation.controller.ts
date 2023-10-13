import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ValidationRequestDto } from './validation.interface';
import { ValidationService } from './validation.service';

@Controller('validation')
@UseInterceptors(ClassSerializerInterceptor)
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post('/api')
  async validateRequestWithDataFromUser(@Body() body: ValidationRequestDto) {
    try {
      const data = await this.validationService.validateParams(body.e, body.c);
      if (data) {
        await this.validationService.saveHashedData(body, true);
        console.log('✅ Data saved successfully');
      }
    } catch (err) {
      await this.validationService.saveHashedData(body, false);
      console.log('❌ Data invalid');
    }
  }

  // This is the endpoint that the Oracle will call to save the data
  @Post('/oracle')
  async validateRequestWithDataFromOracle(@Body() body: ValidationRequestDto) {
    try {
      const data = await this.validationService.validateParams(body.e, body.c);
      if (data) {
        await this.validationService.saveHashedData(body, true);
        console.log('✅ Data saved successfully');
      }
    } catch (err) {
      await this.validationService.saveHashedData(body, false);
      console.log('❌ Data invalid');
    }
  }

  // This is the endpoint that the Oracle will call to validate
  @Get('/oracle')
  async oracleValidatesRequestWithAPI(@Param('data') data: string) {
    return await this.validationService.validateHashedData(data);
  }
}
