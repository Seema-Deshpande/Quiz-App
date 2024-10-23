export interface Result {
  quiz_id: number;
  user_id: number;
  score: number;
  answers: {
    question_id: number;
    selected_option: number;
    is_correct: boolean;
  }[];
}

export interface Answer {
  question_id: number;
  selected_option: number;
  user_id?: number;
}
