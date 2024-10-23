import { Injectable } from '@nestjs/common';
import { Quiz } from '../models/quiz.model';
import { Result } from '../models/result.model';
import { Logger } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
@Injectable()
export class QuizService {
  private readonly logger = new Logger(QuizService.name);
  // In-memory storage for quizzes and results
  private quizzes: Map<number, Quiz> = new Map();
  private results: Map<number, Result> = new Map();

  // Method to create a new quiz
  createQuiz(quiz: CreateQuizDto): Quiz {

    // Store the quiz in the map
    this.quizzes.set(quiz.id, quiz);
    this.logger.log(quiz.id, quiz);
    return quiz;
  }

  // Get a quiz by ID
  getQuiz(id: number): Quiz | undefined {
    return this.quizzes.get(id);
  }

  // Submit an answer
  submitAnswer(quizId: number, answer: SubmitAnswerDto): { is_correct: boolean; correct_option?: number } {
    const quiz = this.quizzes.get(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    const question = quiz.questions.find(q => q.id === answer.question_id);
    if (!question) {
      throw new Error('Question not found');
    }

    const is_correct = question.correct_option === answer.selected_option;
    const result = { question_id: question.id, selected_option: answer.selected_option, is_correct };

    // Store or update the user's results
    const userResults = this.results.get(quizId) || {
      quiz_id: quizId,
      user_id: answer.user_id,
      score: 0,
      answers: []
    };

    userResults.score += is_correct ? 1 : 0; // Increment score if correct
    userResults.answers.push(result); // Store the answer details
    this.results.set(quizId, userResults); // Update the results

    return { is_correct, correct_option: question.correct_option };
}

  // Get results for a specific quiz
  getResults(quizId: number): Result | undefined {
    return this.results.get(quizId);
}
}
