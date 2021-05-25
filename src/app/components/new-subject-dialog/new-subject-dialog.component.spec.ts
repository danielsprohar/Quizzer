import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { NewSubjectDialogComponent } from './new-subject-dialog.component'

describe('NewSubjectDialogComponent', () => {
  let component: NewSubjectDialogComponent
  let fixture: ComponentFixture<NewSubjectDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSubjectDialogComponent],
      imports: [MatDialogModule, MatSnackBarModule, MatDialogModule],
      providers: [
        SnackbarService,
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubjectDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('form should be invalid with no input', () => {
    expect(component).toBeDefined()
    component.name.setValue('')
    expect(component.form.invalid).toBe(true)
  })

  it('form should be valid with valid input', () => {
    expect(component).toBeDefined()
    component.name.setValue('Computer Science')
    expect(component.form.valid).toBe(true)
  })

  it('should create new subject', () => {
    component.name.setValue('Computer Science')
    component.save()
    expect(angularFirestoreSpy.collection).toHaveBeenCalled()
  })
})
