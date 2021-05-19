import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuestionsModule } from '../questions/questions.module';


@NgModule({
  declarations: [
    QuizzesComponent,
    CreateQuizComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    QuestionsModule
  ]
})
export class QuizzesModule { }
