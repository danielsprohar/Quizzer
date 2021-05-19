import { Injectable } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private readonly afStorage: AngularFireStorage) {}

  addImage() {

  }

  deleteImage(url: string) {
    
  }
}
