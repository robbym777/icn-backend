import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { OpenAiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    OpenAiModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
