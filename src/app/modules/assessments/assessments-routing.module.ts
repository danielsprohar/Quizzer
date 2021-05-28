import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { QuizResolver } from '../quizzes/resolvers/quiz.resolver'
import { AssessmentsComponent } from './assessments.component'
import { AssessmentSummaryComponent } from './components/assessment-summary/assessment-summary.component'
import { AssessmentComponent } from './components/assessment/assessment.component'
import { QuizAssessmentResolver } from './resolvers/assessment.resolver'

const routes: Routes = [
  {
    path: '',
    component: AssessmentsComponent,
  },
  {
    path: ':id/summary',
    component: AssessmentSummaryComponent,
    resolve: {
      assessment: QuizAssessmentResolver,
    },
  },
  {
    path: ':id',
    component: AssessmentComponent,
    resolve: {
      quiz: QuizResolver,
      questions: QuestionsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentsRoutingModule {}
