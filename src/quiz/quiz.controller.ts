// quiz.controller.ts
import { Controller, Post, Get, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, } from '../quiz/dto/create-quiz.dto';
import { Answer, Result } from '../models/result.model';
import {ValidationPipe, UsePipes} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('quizzes')
export class QuizController {
  private readonly logger = new Logger(QuizController.name);
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createQuiz(@Body() quiz: CreateQuizDto, @Res() res): void {
    try {
      const newQuiz = this.quizService.createQuiz(quiz);
      return res.status(HttpStatus.CREATED).json({message: "QUIZ CREATED SUCCESSFULLY", HttpStatus: HttpStatus.CREATED});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getQuiz(@Param('id') id: number, @Res() res): void {
    const quiz = this.quizService.getQuiz(id);
    if (quiz) {
      return res.json(quiz);
    }
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'Quiz not found', HttpStatus: HttpStatus.NOT_FOUND });
  }

  @Post(':id/submit')
  @UsePipes(new ValidationPipe({ transform: true }))
  submitAnswer(@Param('id') quizId: number, @Body() answer: SubmitAnswerDto, @Res() res): void {
      try {
          // Call the service method to submit the answer
          const result = this.quizService.submitAnswer(quizId, answer);
          // Respond with the result
          this.logger.log(result)
          return res.status(HttpStatus.OK).json({message: result, HttpStatus:HttpStatus.OK});
      } catch (error) {
          // Handle errors, such as quiz or question not found
          res.status(HttpStatus.BAD_REQUEST).json({ message: error.message, HttpStatus: HttpStatus.BAD_REQUEST });
      }
  }

  @Get(':id/results')
  @UsePipes(new ValidationPipe({ transform: true }))
  getResults(@Param('id') quizId: number, @Res() res): void {
      const results = this.quizService.getResults(quizId);
      if (!results) {
        return res.status(HttpStatus.NOT_FOUND).send({message: 'Result not found', HttpStatus: HttpStatus.NOT_FOUND});
      }
      this.logger.log(results)
      return res.status(HttpStatus.OK).json({message: results, HttpStatus:HttpStatus.OK});
  }
}
