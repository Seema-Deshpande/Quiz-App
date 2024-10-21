export interface Answer {
  question_id: number;
  selected_option: number;
  is_correct: boolean;
}

export class Result {
  quiz_id: number;
  user_id: number;
  score: number;
  answers: Answer[];
}