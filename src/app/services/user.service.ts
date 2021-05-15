import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Collections } from '../constants/collections';
import { Quiz } from '../models/quiz';

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
}
