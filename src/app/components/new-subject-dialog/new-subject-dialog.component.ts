import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { Collections } from 'src/app/constants/collections'
import { AppStateService } from 'src/app/services/app-state.service'
import { SnackbarService } from 'src/app/services/snackbar.service'

@Component({
  selector: 'app-new-subject-dialog',
  templateUrl: './new-subject-dialog.component.html',
  styleUrls: ['./new-subject-dialog.component.scss'],
})
export class NewSubjectDialogComponent implements OnInit {
  form: FormGroup

  constructor(
    private readonly appState: AppStateService,
    private readonly firestore: AngularFirestore,
    private readonly snackbar: SnackbarService,
    private readonly dialogRef: MatDialogRef<NewSubjectDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(512),
      ]),
    })
  }

  get name() {
    return this.form.get('name')!
  }

  cancel(): void {
    this.dialogRef.close()
  }

  save(): void {
    this.appState.isLoading(true)
    const subjectName = (this.name.value as string).trim()
    this.firestore
      .collection(Collections.SUBJECTS)
      .add({ name: subjectName })
      .then(() => this.snackbar.success('Saved!'))
      .catch((err) => this.snackbar.warn(err.message))
      .finally(() => this.appState.isLoading(false))
  }
}
