import { MediaMatcher } from '@angular/cdk/layout'
import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AppThemeService implements OnDestroy {
  private static isDarkTheme$: BehaviorSubject<boolean>
  private mql: MediaQueryList

  constructor(private readonly mediaMatcher: MediaMatcher) {
    this.mql = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)')
    AppThemeService.isDarkTheme$ = new BehaviorSubject<boolean>(
      this.mql.matches
    )
    this.mql.addEventListener('change', this.setDarkTheme)
  }

  ngOnDestroy(): void {
    this.mql.removeEventListener('change', this.setDarkTheme)
  }

  isDarkTheme(value: boolean): void {
    AppThemeService.isDarkTheme$.next(value)
  }

  setDarkTheme(event: MediaQueryListEvent) {
    AppThemeService.isDarkTheme$.next(event.matches)
  }

  getIsDarkTheme(): boolean {
    return AppThemeService.isDarkTheme$.value
  }

  isDarkThemeAsObservable(): Observable<boolean> {
    return AppThemeService.isDarkTheme$.asObservable()
  }
}
