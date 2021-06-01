import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AuthGuard } from './modules/auth/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'assessments',
    loadChildren: () =>
      import('./modules/assessments/assessments.module').then(
        (m) => m.AssessmentsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./modules/quizzes/quizzes.module').then((m) => m.QuizzesModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
