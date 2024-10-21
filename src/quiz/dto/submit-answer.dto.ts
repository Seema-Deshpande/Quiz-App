import { IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  question_id!: number;

  @IsNotEmpty()
  @IsNumber()
  selected_option!: number;
}
