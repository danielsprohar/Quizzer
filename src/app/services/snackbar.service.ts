import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackbar: MatSnackBar) {}

  info(message: string, action?: string) {
    return this.snackbar.open(message, action)
  }

  success(message: string, action?: string) {
    return this.snackbar.open(message, action, {
      panelClass: 'success',
    })
  }

  warn(message: string, action?: string) {
    return this.snackbar.open(message, action, {
      panelClass: 'warn',
    })
  }
}
