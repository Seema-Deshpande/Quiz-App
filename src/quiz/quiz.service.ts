import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { Quiz } from '../models/quiz.model';
import { Result } from '../models/result.model';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class QuizService {
  private readonly logger = new Logger(QuizService.name);
  private quizzes: Map<number, Quiz> = new Map();
  private results: Map<number, Result> = new Map();

  createQuiz(quiz: CreateQuizDto): Quiz {
    this.logger.log(`Creating quiz with ID: ${quiz.id}`);
    this.quizzes.set(quiz.id, quiz);
    this.logger.log(`Quiz created: ${JSON.stringify(quiz)}`);
    return quiz;
  }

  getQuiz(id: number): Quiz | undefined {
    this.logger.log(`Retrieving quiz with ID: ${id}`);
    const quiz = this.quizzes.get(id);
    if (!quiz) {
      this.logger.warn(`Quiz with ID: ${id} not found`);
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  submitAnswer(quizId: number, answer: SubmitAnswerDto): { is_correct: boolean; correct_option?: number } {
    this.logger.log(`Submitting answer for quiz ID: ${quizId}, question ID: ${answer.question_id}`);
    const quiz = this.quizzes.get(quizId);
    if (!quiz) {
      this.logger.warn(`Quiz with ID: ${quizId} not found`);
      throw new NotFoundException('Quiz not found');
    }

    const question = quiz.questions.find(q => q.id === answer.question_id);
    if (!question) {
      this.logger.warn(`Question with ID: ${answer.question_id} not found in quiz ID: ${quizId}`);
      throw new NotFoundException('Question not found');
    }

    const is_correct = question.correct_option === answer.selected_option;
    const result = { question_id: question.id, selected_option: answer.selected_option, is_correct };

    const userResults = this.results.get(quizId) || {
      quiz_id: quizId,
      user_id: answer.user_id,
      score: 0,
      answers: []
    };

    userResults.score += is_correct ? 1 : 0;
    userResults.answers.push(result);
    this.results.set(quizId, userResults);

    this.logger.log(`Answer submitted. User score: ${userResults.score}`);
    return { is_correct, correct_option: question.correct_option };
  }

  getResults(quizId: number): Result | undefined {
    this.logger.log(`Retrieving results for quiz ID: ${quizId}`);
    const results = this.results.get(quizId);
    if (!results) {
      this.logger.warn(`Results for quiz ID: ${quizId} not found`);
      throw new NotFoundException('Results not found');
    }
    return results;
  }
}
