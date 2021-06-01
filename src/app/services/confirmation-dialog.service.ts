import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component'

export interface ConfirmationDialogData {
  title?: string
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private readonly dialog: MatDialog) {}

  public confirm(props: ConfirmationDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: props,
    })

    return dialogRef.afterClosed()
  }
}
