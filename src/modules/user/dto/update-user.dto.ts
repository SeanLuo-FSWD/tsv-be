import { PartialType } from '@nestjs/mapped-types';
import { LocalUserDto } from './local-user.dto';

export class UpdateUserDto extends PartialType(LocalUserDto) {}
