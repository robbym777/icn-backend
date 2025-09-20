import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { compare, hash } from "bcryptjs";
import { LoginDto } from "../auth/dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(body: RegisterDto) {
    const { email, password, name } = body;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException("Email telah terdaftar");
    }

    const hashed = await hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed, name },
    });

    return {
      email: user.email,
      name: user.name,
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Email tidak terdaftar");

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException("Password salah");

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      token: accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const passwordMatch = await compare(password, user.password);
    return passwordMatch ? user : null;
  }
}
