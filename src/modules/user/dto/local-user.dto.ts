import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { UserDto } from './user.dto';

export class LocalUserDto extends UserDto {
  @IsNotEmpty()
  password: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
