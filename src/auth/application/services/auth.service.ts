import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/application/services/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findFullUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const validPassword: boolean = await bcrypt.compare(pass, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const payload = { sub: user.id, name: user.fullName, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
