import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessDTO } from './dto/auth-access.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  access(@Body() accessDTO: AccessDTO) {
    const access = this.authService.access(accessDTO);

    return access;
  }
}
