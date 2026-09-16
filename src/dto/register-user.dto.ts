import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}
