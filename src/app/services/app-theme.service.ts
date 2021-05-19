import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  private isDarkTheme$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  isDarkTheme(value: boolean): void {
    this.isDarkTheme$.next(value);
  }

  getIsDarkTheme(): boolean {
    return this.isDarkTheme$.value;
  }

  isDarkThemeAsObservable(): Observable<boolean> {
    return this.isDarkTheme$.asObservable();
  }
}
