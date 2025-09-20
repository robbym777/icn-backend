import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OpenAI } from "openai";

@Injectable()
export class OpenAiService {
  constructor(private config: ConfigService) {}

  async getSuggestions(prompt: string): Promise<any> {
    try {
      const apiKey = this.config.get("OPENAI_API_KEY");
      const openai = new OpenAI({ apiKey });
      const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "user",
            content: `create 3 suggestions for task todo of titles and descriptions for the '${prompt}', and format it as json with id, title, and description`,
          },
        ],
        max_tokens: 300,
        temperature: 0.2,
      });

      const suggestions = response.choices[0].message.content || "";
      return JSON.parse(suggestions);
    } catch (error) {
      throw new InternalServerErrorException("Ada kesalahan, coba lagi nanti");
    }
  }
}
