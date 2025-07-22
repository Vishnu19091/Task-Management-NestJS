import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User>{
    // Creating repo's instance
    constructor(private datasource: DataSource) {
        // (super) calls the repository constructor
        // User the entity class the repo handles
        // using entitymanager to interact with the DB
            super(User, datasource.createEntityManager());
    }
    
    async createUser(authcredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authcredentialsDto;

        // hash
        // generate salt from bcrypt
        const salt = await bcrypt.genSalt();

        // generate hash of password with prefix to the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);
        }
        catch (error) {
            // duplicate username exception
            if (error.code === '23505') {
                throw new ConflictException(`Username already exists`)
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }
}