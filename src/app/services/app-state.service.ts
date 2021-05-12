import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  setIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

  getIsLoading(): boolean {
    return this.isLoadingSubject.value;
  }

  isLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }
}
