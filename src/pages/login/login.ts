import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { TaskPage } from '../task/task'
import { NewtaskPage } from '../newtask/newtask'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:any;
  password:any;
  loginstatus: any;
  x:any=true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('key1').then((val)=>{
      this.loginstatus=val;
    })
  }

  login()
  {
    let data = {
      email: this.email,
      password: this.password
    }
    this.storage.get('sign').then((val)=>{
      for (let index = 0; index < val.length; index++) 
      {
      if(val[index].email==data.email && val[index].password==data.password)
      {
        this.loginstatus=true;
        this.storage.set('key1',this.loginstatus);
        break;
      }
      else{
        this.x=false;
      }
    }
    });

    this.navCtrl.setRoot(TaskPage);
    this.navCtrl.popToRoot();
    
  }

  //signout(){
    //this.navCtrl.pop();
    //this.navCtrl.setRoot(HomePage);
    //this.navCtrl.popToRoot();
  //}

}
