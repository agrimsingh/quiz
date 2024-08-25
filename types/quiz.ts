export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  questions: Question[];
  answers: (number | null)[];
}
