import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module';
import { QuestionFormComponent } from './components/question-form/question-form.component';


@NgModule({
  declarations: [
    QuestionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ],
  exports: [
    QuestionFormComponent
  ]
})
export class QuestionsModule { }
