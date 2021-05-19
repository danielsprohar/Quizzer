import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs'
import { QuizSnippet } from 'src/app/models/quiz-snippet'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  quizSnippets$: Observable<QuizSnippet[]>

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.afAuth.currentUser
    this.quizSnippets$ = this.userService.getQuizSnippets(user?.uid!)
  }
}
