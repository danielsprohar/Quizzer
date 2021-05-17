import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collections } from '../constants/collections';
import { Quiz } from '../models/quiz';
import { QuizSnippet } from '../models/quiz-snippet';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly afs: AngularFirestore) {}

  getQuizzes(userId: string) {
    return this.afs
      .collection<Quiz>(Collections.QUIZZES, (ref) =>
        ref.where('userId', '==', userId)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const quiz = action.payload.doc.data() as Quiz;
            quiz.id = action.payload.doc.id;
            return quiz;
          })
        )
      );
  }

  getQuizSnippets(quizId: string): Observable<QuizSnippet[]> {
    return this.afs
      .collection(Collections.USERS)
      .doc(quizId)
      .collection(Collections.QUIZ_SNIPPETS)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => action.payload.doc.data() as QuizSnippet)
        )
      );
  }
}
