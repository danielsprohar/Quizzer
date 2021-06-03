import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardDetailsDialogComponent } from './flashcard-details-dialog.component';

describe('FlashcardDetailsDialogComponent', () => {
  let component: FlashcardDetailsDialogComponent;
  let fixture: ComponentFixture<FlashcardDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
