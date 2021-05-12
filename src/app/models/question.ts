import { QuestionOption } from './question-option';

export class Question {
  id: string;
  htmlText: string;
  hint: string;
  explanation: string;
  isAttempted: boolean;
  isCorrect: any;
  /**
   * The `downloadUrl` returned by Firebase Storage.
   *
   * @usageNotes
   * Use with a `img` element or css `background-image` rule
   */
  imageURL: string;
  /**
   * The path where this image is located within Firebase Storage
   */
  imagePath: string;
  dateSubmitted: Date;
  options: QuestionOption[];

  constructor(fields?: {
    id?: number;
    htmlText?: string;
    hint?: string;
    explanation?: string;
    isAttempted?: boolean;
    isCorrect?: any;
    imageURL?: string;
    imagePath?: string;
    dateSubmitted?: Date;
    options?: QuestionOption[];
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
