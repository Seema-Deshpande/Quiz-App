import { Injectable } from '@nestjs/common';
import { Quiz, Question } from '../models/quiz.model';
import { Answer, Result } from '../models/result.model';

@Injectable()
export class QuizService {
  private quizzes: Map<number, Quiz> = new Map();
  private results: Map<number, Result> = new Map();

  // Method to create a new quiz
  createQuiz(quiz: Quiz): Quiz {
    // Validate quiz properties
    if (quiz.id === undefined || quiz.title === undefined || !quiz.questions || quiz.questions.length === 0) {
      throw new Error('Quiz must have a valid ID, title, and at least one question');
    }

    // Assign unique IDs to questions
    quiz.questions.forEach((question, index) => {
      question.id = index + 1; // Ensure question IDs are unique within the quiz
    });

    // Store the quiz in the map
    this.quizzes.set(quiz.id, quiz);
    return quiz;
  }

  // Get a quiz by ID
  getQuiz(id: number): Quiz | undefined {
    return this.quizzes.get(id);
  }

  // Submit an answer
  submitAnswer(quizId: number, answer: Answer): { is_correct: boolean; correct_option?: number } {
    const quiz = this.quizzes.get(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Use Map to find the question by ID
    const question = quiz.questions.find(q => q.id === answer.question_id);
    if (!question) {
      throw new Error('Question not found');
    }

    const is_correct = question.correct_option === answer.selected_option;
    const result = { ...answer, is_correct };

    // Store or update the user's results
    const userResults = this.results.get(quizId) || {
      quiz_id: quizId,
      user_id: answer.question_id, // Replace this with actual user ID if available
      score: 0,
      answers: []
    };

    userResults.score += is_correct ? 1 : 0;
    userResults.answers.push(result);
    this.results.set(quizId, userResults);

    return { is_correct, correct_option: question.correct_option };
  }

  // Get results for a specific quiz
  getResults(quizId: number): Result | undefined {
    return this.results.get(quizId);
  }
}
