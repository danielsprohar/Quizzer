import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  private isDarkTheme$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  setIsDarkTheme(value: boolean): void {
    this.isDarkTheme$.next(value);
  }

  getIsDarkTheme(): boolean {
    return this.isDarkTheme$.value;
  }

  isDarkTheme(): Observable<boolean> {
    return this.isDarkTheme$.asObservable();
  }
}
