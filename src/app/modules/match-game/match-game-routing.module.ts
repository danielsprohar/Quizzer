import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchGameComponent } from './match-game.component';

const routes: Routes = [{ path: '', component: MatchGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchGameRoutingModule { }
