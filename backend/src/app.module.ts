import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OracleModule } from './oracle/oracle.module';
import { ValidationModule } from './validation/validation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OracleModule,
    ValidationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
