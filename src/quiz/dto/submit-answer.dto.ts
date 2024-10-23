import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitAnswerDto {
  @ApiProperty({
    description: 'Question id',
    type: Number,
    format: 'number',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  question_id: number;

  @ApiProperty({
    description: 'Selected option number',
    type: Number,
    format: 'number',
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  selected_option: number;

  @ApiProperty({
    description: 'User id',
    type: Number,
    format: 'number',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
