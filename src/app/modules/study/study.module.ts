import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StudyRoutingModule } from './study-routing.module'
import { StudyComponent } from './study.component'
import { MatchGameComponent } from './components/match-game/match-game.component'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { StopWatchComponent } from './components/stop-watch/stop-watch.component'

@NgModule({
  declarations: [StudyComponent, MatchGameComponent, StopWatchComponent],
  imports: [CommonModule, StudyRoutingModule, MaterialDesignModule],
})
export class StudyModule {}
