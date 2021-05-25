import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AssessmentsRoutingModule } from './assessments-routing.module'
import { AssessmentsComponent } from './assessments.component'
import { AssessmentComponent } from './components/assessment/assessment.component'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { AssessmentQuestionComponent } from './components/assessment-question/assessment-question.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentSummaryComponent } from './components/assessment-summary/assessment-summary.component';
import { AssessmentQuestionResultsComponent } from './components/assessment-question-results/assessment-question-results.component'

@NgModule({
  declarations: [
    AssessmentsComponent,
    AssessmentComponent,
    AssessmentQuestionComponent,
    AssessmentSummaryComponent,
    AssessmentQuestionResultsComponent,
  ],
  imports: [
    CommonModule,
    AssessmentsRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
  ],
})
export class AssessmentsModule {}
