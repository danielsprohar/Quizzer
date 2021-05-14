import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuizzesComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule
  ]
})
export class QuizzesModule { }
