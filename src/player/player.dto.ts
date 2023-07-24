import { GENDERS } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  user_id: string;
  @IsNotEmpty()
  @IsEnum(GENDERS)
  gender: GENDERS;
}
