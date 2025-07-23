import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  // create auth service instance
  constructor(private authService: AuthService) {}

  // Sign Up for creating new users if user not exists
  @Post('/signup')
  signup(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signup(authcredentialsDto);
  }

  // Sign In
  @Post('/signin')
  signin(
    @Body() authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authcredentialsDto);
  }

  //   @Post('/test')
  //   @UseGuards(AuthGuard())
  //   test(@GetUser() user: User) {
  //     console.log(user);
  //   }
}
