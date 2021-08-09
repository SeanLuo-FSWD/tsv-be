import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
  } from 'class-validator';
  
  export class UserDto {
    @MaxLength(20)
    @IsNotEmpty()
    username: string;
  }
  