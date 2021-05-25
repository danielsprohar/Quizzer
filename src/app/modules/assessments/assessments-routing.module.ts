import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { QuizResolver } from '../quizzes/resolvers/quiz.resolver'
import { AssessmentsComponent } from './assessments.component'
import { AssessmentSummaryComponent } from './components/assessment-summary/assessment-summary.component'
import { QuizComponent } from './components/quiz/quiz.component'
import { AssessmentResolver } from './resolvers/assessment.resolver'

const routes: Routes = [
  {
    path: '',
    component: AssessmentsComponent,
  },
  {
    path: ':id',
    component: QuizComponent,
    resolve: {
      quiz: QuizResolver,
      questions: QuestionsResolver,
    },
  },
  {
    path: ':id/summary',
    component: AssessmentSummaryComponent,
    resolve: {
      assessment: AssessmentResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentsRoutingModule {}
