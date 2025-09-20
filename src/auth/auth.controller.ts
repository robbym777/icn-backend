import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../auth/dtos/register.dto";
import { LoginDto } from "../auth/dtos/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    try {
      const user = await this.authService.register(body);
      return {
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Ada kesalahan, coba lagi nanti");
    }
  }

  @Post("login")
  async login(@Body() body: LoginDto) {
    try {
      const user = await this.authService.login(body);
      return {
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Ada kesalahan, coba lagi nanti");
    }
  }
}
