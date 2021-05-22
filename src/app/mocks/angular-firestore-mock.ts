import { of } from 'rxjs'

export const angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: {
    add: () => Promise.resolve({}),
    get: () => of([{}]),
    valueChanges: () => of([{}]),
  },
  createId: () => '',
  doc: () => Promise.resolve(),
})
