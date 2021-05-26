import { MediaMatcher } from '@angular/cdk/layout'
import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AppThemeService implements OnDestroy {
  private isDarkTheme$: BehaviorSubject<boolean>
  private mql: MediaQueryList

  constructor(private readonly mediaMatcher: MediaMatcher) {
    this.mql = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)')
    this.isDarkTheme$ = new BehaviorSubject<boolean>(this.mql.matches)
    this.mql.addEventListener('change', this.setDarkTheme)
  }

  ngOnDestroy() {
    this.mql.removeEventListener('change', this.setDarkTheme)
  }

  isDarkTheme(value: boolean): void {
    this.isDarkTheme$.next(value)
  }

  private setDarkTheme(event: MediaQueryListEvent) {
    this.isDarkTheme(event.matches)
  }

  getIsDarkTheme(): boolean {
    return this.isDarkTheme$.value
  }

  isDarkThemeAsObservable(): Observable<boolean> {
    return this.isDarkTheme$.asObservable()
  }
}
