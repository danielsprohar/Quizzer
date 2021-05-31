import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EditQuestionComponent } from '../questions/components/edit-question/edit-question.component'
import { QuestionDetailsResolver } from '../questions/resolvers/question-details.resolver'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component'
import { QuizFormComponent } from './components/quiz-form/quiz-form.component'
import { QuizGridViewComponent } from './components/quiz-grid-view/quiz-grid-view.component'
import { QuizShellComponent } from './components/quiz-shell/quiz-shell.component'
import { QuizResolver } from './resolvers/quiz.resolver'

const routes: Routes = [
  {
    path: '',
    component: QuizGridViewComponent,
  },
  {
    path: ':quizId',
    component: QuizShellComponent,
    children: [
      {
        path: 'details',
        component: QuizDetailsComponent,
        resolve: {
          quiz: QuizResolver,
          questions: QuestionsResolver,
        },
      },
      {
        path: 'edit',
        component: QuizFormComponent,
        resolve: {
          quiz: QuizResolver,
          questions: QuestionsResolver,
        },
      },
      {
        path: 'questions/:questionId/edit',
        component: EditQuestionComponent,
        resolve: {
          question: QuestionDetailsResolver,
        },
      },
      {
        path: 'match',
        loadChildren: () =>
          import('../match-game/match-game.module').then(
            (m) => m.MatchGameModule
          ),
      },
    ],
  },
  {
    path: 'create',
    component: QuizFormComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}
