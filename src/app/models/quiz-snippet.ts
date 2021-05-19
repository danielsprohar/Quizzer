import firebase from 'firebase/app';

/**
 * Models the `quiz_snippets` subcollection of a `user` document.
 */
export class QuizSnippet {
  id: string;
  quizId: string;
  name: string;
  subject: string;

  // https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
  createdOn: firebase.firestore.Timestamp;
  modifiedOn: firebase.firestore.Timestamp;

  constructor(fields?: {
    id?: string;
    quizId?: string;
    name?: string;
    subject?: string;
    createdOn?: firebase.firestore.Timestamp;
    modifiedOn?: firebase.firestore.Timestamp;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
