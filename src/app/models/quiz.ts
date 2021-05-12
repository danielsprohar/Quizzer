import { Question } from './question';
import firebase from 'firebase/app';

export enum QuizVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export class Quiz {
  id: string;
  subject: string;
  name: string;
  numberOfQuestions: number;
  grade: number;
  visibility: string;
  dateSubmitted: firebase.firestore.Timestamp;
  questions: Question[];
  createdOn: firebase.firestore.Timestamp;
  modifiedOn: firebase.firestore.Timestamp;

  constructor(fields?: {
    id?: string;
    subject?: string;
    name?: string;
    numberOfQuestions?: number;
    grade?: number;
    visibility?: string;
    dateSubmitted?: firebase.firestore.Timestamp;
    questions?: Question[];
    createdOn?: firebase.firestore.Timestamp;
    modifiedOn?: firebase.firestore.Timestamp;
  }) {
    Object.assign(this, fields);
  }
}
