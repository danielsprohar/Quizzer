import { TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialDesignModule } from '../theme/material-design/material-design.module';
import { ConfirmationDialogService } from './confirmation-dialog.service';

describe('ConfirmationDialogService', () => {
  let service: ConfirmationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialDesignModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    service = TestBed.inject(ConfirmationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
