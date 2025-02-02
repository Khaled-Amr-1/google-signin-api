import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, name: string, picture: string): Promise<any> {
    let user = await this.usersService.findOneByEmail(email);
    if (!user) {
      user = await this.usersService.create({ email, name, picture });
    }
    const payload = { email: user.email, sub: user.id };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}