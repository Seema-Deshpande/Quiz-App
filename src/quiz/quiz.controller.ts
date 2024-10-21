// quiz.controller.ts
import { Controller, Post, Get, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz, } from '../models/quiz.model';
import { Answer, Result } from '../models/result.model';
import {ValidationPipe, UsePipes} from '@nestjs/common';
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createQuiz(@Body() quiz: Quiz, @Res() res): void {
    try {
      const newQuiz = this.quizService.createQuiz(quiz);
      return res.status(HttpStatus.CREATED).json(newQuiz);
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
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'Quiz not found' });
  }

  @Post(':id/submit')
  @UsePipes(new ValidationPipe({ transform: true }))
  submitAnswer(@Param('id') quizId: number, @Body() answer: Answer, @Res() res): void {
    const result = this.quizService.submitAnswer(quizId, answer);
    res.json(result);
  }

  @Get(':id/results')
  @UsePipes(new ValidationPipe({ transform: true }))
  getResults(@Param('id') quizId: number, @Res() res): void {
    const results = this.quizService.getResults(quizId);
    if (!results) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    res.json(results);
  }
}
