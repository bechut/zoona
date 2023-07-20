import { IsNotEmpty } from 'class-validator';

export class TestValidator {
  @IsNotEmpty()
  test: string;
}
