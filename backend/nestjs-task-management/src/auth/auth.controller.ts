import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    // create auth service instance
    constructor (private authService: AuthService){}

    // Sign Up for creating new users if user not exists
    @Post('/signup')
    signup(@Body() authcredentialsDto:AuthCredentialsDto): Promise<void>{
        return this.authService.signup(authcredentialsDto);
    }

    // Sign In
    @Get('/signin')
    signin(@Body() authcredentialsDto:AuthCredentialsDto): Promise<string>{
        return this.authService.signin(authcredentialsDto);
    }
}
