import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizService],
    }).compile();

    service = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createQuiz', () => {
    it('should create a new quiz and return it', () => {
      const quizData: CreateQuizDto = {
        id: 1,
        title: 'Sample Quiz',
        questions: [
          {
            id: 1,
            text: 'Question 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
            correct_option: 0,
          },
        ],
      };

      const createdQuiz = service.createQuiz(quizData);

      expect(createdQuiz).toEqual(quizData);
      expect(service.getQuiz(1)).toEqual(quizData);
    });
  });

  describe('getQuiz', () => {
    it('should return a quiz by ID', () => {
      const quizData: CreateQuizDto = {
        id: 1,
        title: 'Sample Quiz',
        questions: [
          {
            id: 1,
            text: 'Question 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
            correct_option: 0,
          },
        ],
      };

      service.createQuiz(quizData);
      const fetchedQuiz = service.getQuiz(1);

      expect(fetchedQuiz).toEqual(quizData);
    });

    it('should return undefined for a non-existent quiz ID', () => {
      const fetchedQuiz = service.getQuiz(999);

      expect(fetchedQuiz).toBeUndefined();
    });
  });

  describe('submitAnswer', () => {
    it('should submit an answer and return the result', () => {
      const quizData: CreateQuizDto = {
        id: 1,
        title: 'Sample Quiz',
        questions: [
          {
            id: 1,
            text: 'Question 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
            correct_option: 0,
          },
        ],
      };

      service.createQuiz(quizData);

      const answerData: SubmitAnswerDto = {
        question_id: 1,
        selected_option: 0,
        user_id: 123,
      };

      const result = service.submitAnswer(1, answerData);

      expect(result).toEqual({ is_correct: true, correct_option: 0 });
    });

    it('should throw an error for a non-existent quiz ID', () => {
      const answerData: SubmitAnswerDto = {
        question_id: 1,
        selected_option: 0,
        user_id: 123,
      };

      expect(() => service.submitAnswer(999, answerData)).toThrowError('Quiz not found');
    });

    it('should throw an error for a non-existent question ID', () => {
      const quizData: CreateQuizDto = {
        id: 1,
        title: 'Sample Quiz',
        questions: [
          {
            id: 1,
            text: 'Question 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
            correct_option: 0,
          },
        ],
      };

      service.createQuiz(quizData);

      const answerData: SubmitAnswerDto = {
        question_id: 999,
        selected_option: 0,
        user_id: 123,
      };

      expect(() => service.submitAnswer(1, answerData)).toThrowError('Question not found');
    });
  });

  describe('getResults', () => {
    it('should return the results for a quiz', () => {
      const quizData: CreateQuizDto = {
        id: 1,
        title: 'Sample Quiz',
        questions: [
          {
            id: 1,
            text: 'Question 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
            correct_option: 0,
          },
        ],
      };

      service.createQuiz(quizData);

      const answerData: SubmitAnswerDto = {
        question_id: 1,
        selected_option: 0,
        user_id: 123,
      };

      service.submitAnswer(1, answerData);

      const results = service.getResults(1);

      expect(results).toEqual({
        quiz_id: 1,
        user_id: 123,
        score: 1,
        answers: [
          {
            question_id: 1,
            selected_option: 0,
            is_correct: true,
          },
        ],
      });
    });

    it('should return undefined for a non-existent quiz ID', () => {
      const results = service.getResults(999);

      expect(results).toBeUndefined();
    });
  });
});

