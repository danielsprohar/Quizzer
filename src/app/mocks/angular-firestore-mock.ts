import { of } from 'rxjs'

export const angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: of([{}]),
  createId: '',
  doc: Promise.resolve(),
})
