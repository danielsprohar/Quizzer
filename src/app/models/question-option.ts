export class QuestionOption {
  id: string;
  htmlText: string;
  isAnswer: boolean;
  isChecked = false;

  constructor(fields?: {
    id?: number;
    htmlText?: string;
    isAnswer?: boolean;
    isChecked?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
