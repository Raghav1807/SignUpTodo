import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login'
import { TaskPage } from '../task/task'
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http'

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

  task:any;
  description:any;
  image:any;
  blob:any;

  constructor(public http:HttpClient, public navCtrl: NavController, public navParams: NavParams, public storage:Storage, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtaskPage');
  }

  saveTask() {

    this.storage.get('userdetails').then((user)=>{
      let data = {
        task:this.task,
        description:this.description,
        //image:this.blob,
        email:user.email
      }
      console.log(data)
      this.http.post('http://localhost:3000/addtask',data).subscribe(response=>{
        this.navCtrl.setRoot(TaskPage);
        this.navCtrl.popToRoot();
      })
    })

    

    //this.storage.set('key',data);
    //this.storage.set('n',1);

    //this.navCtrl.pop();

  }

  // takephoto()
  // {
  //   const options: CameraOptions = {
  //     quality: 350,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
    
    
  //   this.camera.getPicture(options).then((imageData) => {
  //    // imageData is either a base64 encoded string or a file URI
  //    // If it's base64 (DATA_URL):
  //    this.image = 'data:image/jpeg;base64,${imageData}';
  //    const base64 = fetch(this.image)
  //    this.blob = base64.blob()
  //   }, (err) => {
  //    // Handle error
  //   });
  // }

}
