import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchGameRoutingModule } from './match-game-routing.module';
import { MatchGameComponent } from './match-game.component';


@NgModule({
  declarations: [
    MatchGameComponent
  ],
  imports: [
    CommonModule,
    MatchGameRoutingModule
  ]
})
export class MatchGameModule { }
