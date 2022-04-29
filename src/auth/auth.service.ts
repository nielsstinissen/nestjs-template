import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AccessTokenPayload } from './dto/access-token-payload.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entity/user.entity';
import { SignedJwtPayload } from './dto/signed_jwt_payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findUserByEmail(loginDto.email);
      if (!user) throw new BadRequestException('Invalid credentials');
      const samePass = await bcrypt.compare(loginDto.password, user.password);
      if (!samePass) throw new BadRequestException('Invalid credentials');
      const payload: AccessTokenPayload = {
        sub: user.id,
        email: user.email,
      };

      const access_token = await this.getAccessToken(payload);

      const singedJwtPayload: SignedJwtPayload = {
        access_token: access_token,
        exp: 6000,
        token_type: 'JWT',
      };

      return singedJwtPayload;
    } catch (error) {
      throw error;
    }
  }

  async logout(headers: any) {
    const payload: AccessTokenPayload = await this.verifyAccessToken(headers);
    const user: User = await this.usersService.findUserById(payload.sub);
    return await this.usersService.saveRememberToken(user.id, null);
  }

  async getAccessToken(payload: AccessTokenPayload) {
    const access_token = await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '1h',
    });
    return access_token;
  }

  public async verifyAccessToken(headers) {
    if (!headers.authorization)
      throw new BadRequestException('No authorization header found');
    const jwt_token: string = headers.authorization.replace('Bearer ', '');
    const payload: AccessTokenPayload = this.jwtService.verify(jwt_token, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
    return payload;
  }
}
