import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonFab, IonFabButton, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton, IonIcon, IonFab, IonButton, ExploreContainerComponent],
  providers: [ApiService]
})
export class Tab2Page implements OnInit {
  public imageSrc: any = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {

    this.takePicture();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.imageSrc = 'data:image/jpeg;base64,' + image.base64String;

    this.uploadImage();

  }

  async uploadImage() {
    if (this.imageSrc) {
      const isImageOrVideo = await this.isImageOrVideo(this.imageSrc);
      if (isImageOrVideo) {
        await this.apiService.uploadImage(this.b64toFile(this.imageSrc, "example.jpg"));
      } else {
        alert('Invalid file type')
        console.error('Invalid file type. Please select an image or a video.');
      }
    } else {
      alert('No image to upload')

      console.error('No image to upload');
    }
  }

  async isImageOrVideo(imageUrl: string): Promise<boolean> {
    return imageUrl.startsWith('data:image') || imageUrl.startsWith('data:video');
  }

  b64toFile(dataURI: any, fileName: string) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var mimeType = dataURI.split(',')[0].split(':')[1].split(';')[0];
    return new File([new Blob([ab], { type: mimeType })], fileName, { type: mimeType });
  }
}