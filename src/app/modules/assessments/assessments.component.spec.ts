import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AssessmentsComponent } from './assessments.component'

describe('AssessmentsComponent', () => {
  let component: AssessmentsComponent
  let fixture: ComponentFixture<AssessmentsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentsComponent],
      imports: [RouterTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
