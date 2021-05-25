import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
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

  get name(): AbstractControl {
    return this.form.get('name')!
  }

  cancel(): void {
    this.dialogRef.close()
  }

  async save(): Promise<void> {
    const subjectName = (this.name.value as string).trim()
    const querySnapshot = await this.firestore
      .collection(Collections.SUBJECTS, (ref) =>
        ref.where('name', '==', subjectName)
      )
      .get()
      .toPromise()

    const subjectExists = querySnapshot.size > 0 ? true : false
    if (subjectExists) {
      this.snackbar.info('Subject already exists')
      return
    }

    try {
      this.appState.isLoading(true)
      await this.firestore
        .collection(Collections.SUBJECTS)
        .add({ name: subjectName })
      this.snackbar.success('Saved!')
    } catch (error) {
      this.snackbar.warn(error.message)
    } finally {
      this.appState.isLoading(false)
      this.dialogRef.close(this.name.value)
    }
  }
}
