import { IsAlphanumeric, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @MaxLength(10)
  username: string;
  @IsAlphanumeric()
  password: string;
  @IsEmail()
  email: string;
}
