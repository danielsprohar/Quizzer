import { Injectable } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'
import { Storage } from '../constants/storage'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private readonly afStorage: AngularFireStorage) {}

  addImage(image: File, quizId: string) {
    if (!image || !quizId) {
      throw new Error('Need non-null parameters to upload an image')
    }
    // TODO: Add security rules to limit upload size and file type
    const timestamp = new Date().getTime()
    const path = `${Storage.QUESTION_IMAGES}/${quizId}__${timestamp}`
    const metadata = { quizId: quizId }
    return this.afStorage.upload(path, image, { customMetadata: metadata })
  }

  deleteImage(url: string) {
    if (!url) {
      throw new Error(`'url' is undefined`)
    }
    return this.afStorage.refFromURL(url).delete().toPromise()
  }
}
