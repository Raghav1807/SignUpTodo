import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login'
import { TaskPage } from '../task/task'
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the NewtaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newtask',
  templateUrl: 'newtask.html',
})
export class NewtaskPage {

  title:any;
  description:any;
  photo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtaskPage');
  }

  saveTask() {

    let data = {
      title:this.title,
      description:this.description,
      photo:this.photo
    }

    this.storage.set('key',data);
    //this.storage.set('n',1);

    this.navCtrl.pop();

  }

  takephoto()
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
