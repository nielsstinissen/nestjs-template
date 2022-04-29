import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  async login(@Body() body: LoginDto) {
    try {
      return await this.authService.validateUser(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('logout')
  @HttpCode(203)
  async logout(@Headers() headers) {
    try {
      await this.authService.logout(headers);
    } catch (error) {
      throw error;
    }
  }
}
