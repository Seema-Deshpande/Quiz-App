import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class QuestionDto {
  @ApiProperty({
    description: 'Questions to be asked',
    type: String,
    format: 'string',
    example: 'What is captial of India?',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text!: string;

  @ApiProperty({
    description: 'options for the question',
    type: [String],
    format: 'string',
    example: ['string1', 'string2','string3', 'string4'],
    required: true,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  options!: string[];
  @ApiProperty({
    description: 'Correct option number',
    type: Number,
    format: 'number',
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  correct_option!: number;
}

export class CreateQuizDto {
  @ApiProperty({
    description: 'Type of the question',
    type: String,
    format: 'string',
    example: 'General Knowledge',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions!: QuestionDto[];
}
