import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  quizzes$: Observable<Quiz[]>;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}
}
