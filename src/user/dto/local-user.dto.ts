import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class LocalUserDto {
  @MaxLength(20)
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
