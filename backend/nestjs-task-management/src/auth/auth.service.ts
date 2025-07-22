import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

// Business use cases
@Injectable()
export class AuthService {
    // Create instance to use the repo 
    constructor(
        @InjectRepository(UsersRepository)
        private UsersRepository:UsersRepository,
    ) { }
    
    // SignUp service
    async signup(authcredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.UsersRepository.createUser(authcredentialsDto);
    }

    // SignIn service
    async signin(authcredentialsDto: AuthCredentialsDto): Promise<string>{
        const { username, password } = authcredentialsDto;

        const user = await this.UsersRepository.findOne({ where: { username } });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success';
        } else {
            throw new UnauthorizedException('Please check your login credentials');  
        }
    }
}
