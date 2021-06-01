import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-game-timer',
  template: `
    <div class="timer-container">
      <span class="timer">{{ time }}</span>
    </div>
  `,
  styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent implements OnInit {
  private startTime = Date.now()
  private timeInterval: any = null
  private readonly defaultTime = '00:00:00'
  time = this.defaultTime

  constructor() {}

  ngOnInit(): void {}

  private updateTimer(): void {
    const now = Date.now()
    const secondsInOneHour = 3600
    const timeDeltaInSeconds = Math.floor((now - this.startTime) / 1000)

    let hours = Math.floor(timeDeltaInSeconds / secondsInOneHour).toString()
    let minutes = Math.floor(
      (timeDeltaInSeconds % secondsInOneHour) / 60
    ).toString()
    let seconds = (timeDeltaInSeconds % 60).toString()

    if (hours.length == 0) {
      hours = '00'
    } else if (hours.length == 1) {
      hours = '0' + hours
    }

    if (minutes.length == 0) {
      minutes = '00'
    } else if (minutes.length == 1) {
      minutes = '0' + minutes
    }

    if (seconds.length == 1) {
      seconds = '0' + seconds
    }

    this.time = hours + ':' + minutes + ':' + seconds
  }

  start(): void {
    if (!this.timeInterval) {
      this.startTime = Date.now()
      this.timeInterval = setInterval(this.updateTimer.bind(this), 1000)
    }
  }

  stop(): void {
    clearInterval(this.timeInterval)
  }

  reset(): void {
    this.stop()
    this.time = this.defaultTime
    this.timeInterval = null
  }
}
