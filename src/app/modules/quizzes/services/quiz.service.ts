import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collections } from 'src/app/constants/collections';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private readonly afs: AngularFirestore) {}

  /**
   * Adds a new quiz to the database.
   * @param quiz The quiz to add.
   * @returns A `DocumentReference` of the newly added `Quiz`.
   */
  add(quiz: Quiz): Promise<DocumentReference<Quiz>> {
    return this.afs.collection<Quiz>(Collections.QUIZZES).add({ ...quiz });
  }

  /**
   * Deletes a `Quiz` from the database.
   * @param quizId The quiz id in the database.
   * @returns A `Promise` after the database operation is complete.
   */
  delete(quizId: string): Promise<void> {
    return this.afs.collection(Collections.QUIZZES).doc<Quiz>(quizId).delete();
  }

  /**
   * Fetches a `Quiz` from the database
   * @param quizId The quiz id in the database.
   * @returns The quiz.
   */
  get(quizId: string): Observable<Quiz> {
    return this.afs
      .collection(Collections.QUIZZES)
      .doc<Quiz>(quizId)
      .get()
      .pipe(map((doc) => doc.data() as Quiz));
  }

  /**
   * Fetchs all the questions that are associated with the given quiz id.
   * @param quizId The quiz id in the database.
   * @returns The quiz's questions.
   */
  getQuestions(quizId: string): Observable<Question[]> {
    return this.afs
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection(Collections.QUIZ_QUESTIONS)
      .stateChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const question = action.payload.doc.data() as Question;
            question.id = action.payload.doc.id;
            return question;
          })
        )
      );
  }

  /**
   * Updates a `Quiz` in the database.
   * @param quiz The quiz.
   * @returns A `Promise` after the database operation completes.
   */
  update(quiz: Quiz): Promise<void> {
    return this.afs.collection(Collections.QUIZZES)
      .doc<Quiz>(quiz.id)
      .update({ ... quiz});
  }
}
