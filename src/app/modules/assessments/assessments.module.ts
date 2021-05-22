import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentsRoutingModule } from './assessments-routing.module';
import { AssessmentsComponent } from './assessments.component';
import { QuizComponent } from './components/quiz/quiz.component';


@NgModule({
  declarations: [
    AssessmentsComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    AssessmentsRoutingModule
  ]
})
export class AssessmentsModule { }
