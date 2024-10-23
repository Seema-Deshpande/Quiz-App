import { Controller, Post, Get, Body, Param, HttpStatus, Res, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('quizzes')
export class QuizController {
  private readonly logger = new Logger(QuizController.name);

  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createQuiz(@Body() quiz: CreateQuizDto, @Res() res): void {
    try {
      this.logger.log(`Creating a new quiz with ID: ${quiz.id}`);
      const newQuiz = this.quizService.createQuiz(quiz);
      return res.status(HttpStatus.CREATED).json({ message: "QUIZ CREATED SUCCESSFULLY", HttpStatus: HttpStatus.CREATED });
    } catch (error) {
      this.logger.error(`Error creating quiz: ${error.message}`, error.stack);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getQuiz(@Param('id') id: number, @Res() res): void {
    this.logger.log(`Fetching quiz with ID: ${id}`);
    try {
      const quiz = this.quizService.getQuiz(id);
      return res.json(quiz);
    } catch (error) {
      this.logger.error(`Error fetching quiz: ${error.message}`, error.stack);
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Quiz not found', HttpStatus: HttpStatus.NOT_FOUND });
    }
  }

  @Post(':id/submit')
  @UsePipes(new ValidationPipe({ transform: true }))
  submitAnswer(@Param('id') quizId: number, @Body() answer: SubmitAnswerDto, @Res() res): void {
    try {
      this.logger.log(`Submitting answer for quiz ID: ${quizId}`);
      const result = this.quizService.submitAnswer(quizId, answer);
      this.logger.log(`Answer submitted successfully: ${JSON.stringify(result)}`);
      return res.status(HttpStatus.OK).json({ message: result, HttpStatus: HttpStatus.OK });
    } catch (error) {
      this.logger.error(`Error submitting answer: ${error.message}`, error.stack);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message, HttpStatus: HttpStatus.BAD_REQUEST });
    }
  }

  @Get(':id/results')
  @UsePipes(new ValidationPipe({ transform: true }))
  getResults(@Param('id') quizId: number, @Res() res): void {
    this.logger.log(`Fetching results for quiz ID: ${quizId}`);
    try {
      const results = this.quizService.getResults(quizId);
      return res.status(HttpStatus.OK).json({ message: results, HttpStatus: HttpStatus.OK });
    } catch (error) {
      this.logger.error(`Error fetching results: ${error.message}`, error.stack);
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Result not found', HttpStatus: HttpStatus.NOT_FOUND });
    }
  }
}
