import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { SnackbarService } from './snackbar.service'
import { HarnessLoader } from '@angular/cdk/testing'

describe('SnackbarService', () => {
  let service: SnackbarService
  let loader: HarnessLoader

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, NoopAnimationsModule],
    })
    service = TestBed.inject(SnackbarService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('#info should open snackbar with "Hello there" as message', () => {
    const message = 'Hello there'
    const snackBarRef = service.info(message)
    expect(snackBarRef.instance.data.message).toBe(message)
    snackBarRef.dismiss()
  })

  it('#success should open snackbar with "Hello there" as message', () => {
    const message = 'Hello there'
    const snackBarRef = service.success(message)
    expect(snackBarRef.instance.data.message).toBe(message)
    snackBarRef.dismiss()
  })

  it('#warn should open snackbar with "Hello there" as message', () => {
    const message = 'Hello there'
    const snackBarRef = service.warn(message)
    expect(snackBarRef.instance.data.message).toBe(message)
    snackBarRef.dismiss()
  })
})
