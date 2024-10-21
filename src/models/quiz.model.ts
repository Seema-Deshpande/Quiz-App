export interface Question {
  id: number;
  text: string;
  options: string[];
  correct_option: number;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}