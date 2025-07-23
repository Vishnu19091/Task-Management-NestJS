import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

// Business use cases
@Injectable()
export class AuthService {
  // Create instance to use the repo
  // Also we gonna use jwt so create an instance
  constructor(
    @InjectRepository(UsersRepository)
    private UsersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  // SignUp service
  async signup(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.UsersRepository.createUser(authcredentialsDto);
  }

  // SignIn service
  // Returning promise of object access token
  async signin(
    authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authcredentialsDto;

    const user = await this.UsersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };

      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
