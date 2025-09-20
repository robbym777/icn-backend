import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean  {
    const request = context.switchToHttp().getRequest();
    let token: string = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    token = token.slice(7);

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true; 
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
