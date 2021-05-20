export class QuestionOption {
  id: string;
  text: string;
  isAnswer: boolean;
  isChecked = false;

  constructor(fields?: {
    id?: number;
    text?: string;
    isAnswer?: boolean;
    isChecked?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
