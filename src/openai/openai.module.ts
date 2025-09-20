import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { OpenAiController } from './openai.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
//import { JwtGuard } from '../jwt.guard';

@Module({
  imports: [ConfigModule, AuthModule], // <- tambahin AuthModule
  providers: [OpenAiService],
  controllers: [OpenAiController],
})
export class OpenAiModule {}
