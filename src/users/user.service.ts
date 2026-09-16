import { 
    ConflictException,
    Injectable, 
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { RegisterUserDto } from '../dto/register-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(body: RegisterUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    }); 

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      email: user.email,
    };
  }
}