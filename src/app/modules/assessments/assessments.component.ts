import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../auth/services/auth.service'
import { QuizAssessment } from './models/quiz-assessment'
import { AssessmentDataService } from './services/assessment-data.service'

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss'],
})
export class AssessmentsComponent implements OnInit {
  assessments$: Observable<QuizAssessment[]>

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly ads: AssessmentDataService
  ) {}

  ngOnInit(): void {
    // TODO: Render assesments to the UI
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.assessments$ = this.ads.getAll(user?.uid!)
      } else {
        this.router.navigate(['/login'])
      }
    })
  }
}
