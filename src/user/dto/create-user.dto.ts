import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @MaxLength(10)
  @IsNotEmpty()
  username: string;
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
