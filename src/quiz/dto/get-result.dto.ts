import { IsNotEmpty } from 'class-validator';

export class GetResultDto {
  @IsNotEmpty()
  quiz_id!: number;

  @IsNotEmpty()
  user_id!: number;
}
