import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { JwtGuard } from '../jwt.guard';

@UseGuards(JwtGuard)
@Controller('openai')
export class OpenAiController {
  constructor(private openai: OpenAiService) {}

  @Post('suggest')
  async suggest(@Req() req, @Body() body: { prompt: string }) {
    const suggestions = await this.openai.getSuggestions(body.prompt);
    return {
        statusCode: 201,
        data: suggestions,
      };
  }
}
