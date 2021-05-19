import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { QuestionControlService } from 'src/app/modules/questions/services/question-control.service'

import { CreateQuizComponent } from './create-quiz.component'

describe('CreateQuizComponent', () => {
  let component: CreateQuizComponent
  let fixture: ComponentFixture<CreateQuizComponent>
  let mockAngularFirestore = jasmine.createSpyObj('AngularFirestore', [
    'createId',
  ])

  jasmine.createSpy()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateQuizComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        QuestionControlService,
        {
          provide: AngularFirestore,
          useValue: mockAngularFirestore,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuizComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
