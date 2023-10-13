import { Module } from '@nestjs/common';
import { OracleService } from './oracle.service';

@Module({
  providers: [OracleService]
})
export class OracleModule {}
