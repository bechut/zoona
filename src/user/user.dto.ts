import { GENDERS } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsOptional()
  @IsEnum(GENDERS)
  gender: GENDERS;
  @IsOptional()
  bio: string;
}
