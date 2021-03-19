import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
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

  constructor(public http:HttpClient, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('key1').then((val)=>{
      this.loginstatus=val;
      if(this.loginstatus==true)
      {
        this.navCtrl.setRoot(TaskPage);
        this.navCtrl.popToRoot();
      }
    })
  }

  login()
  {
    let data = {
      email: this.email,
      password: this.password
    }
    //let l=[]
    this.http.post('http://localhost:3000/login',data).subscribe(response=>{
      // response.status(200).json({
      // });
      // if(response.json().status == 400)
      // {

      // }

      
      
      if(JSON.parse(JSON.stringify(response)).status==200){
        console.log(JSON.parse(JSON.stringify(response)).result);
        this.storage.set('userdetails',data)
        this.loginstatus=true
        this.storage.set('key1',this.loginstatus)
        this.navCtrl.setRoot(TaskPage);
        this.navCtrl.popToRoot();
     }
     else{
       alert("Failed to Login : Incorrect email or password")
       console.log("Login Failed(Incorrect details)");
     }


    //   if(response.json().status==200){
    //     console.log(response.json().result);
    //  }
    //  else{
    //    console.log("Data not found");
    //  }


      // l.push(response)
      // if(l!=null)
      // {
      //   this.storage.set('userdetails',data);
      //   console.log(l)
        
      //}
      // const responseValues = Object.values(response);

      // if(responseValues.length()!=null){}
      
    });

    // this.storage.get('sign').then((val)=>{
    //   for (let index = 0; index < val.length; index++) 
    //   {
    //   if(val[index].email==data.email && val[index].password==data.password)
    //   {
    //     this.loginstatus=true;
    //     this.storage.set('key1',this.loginstatus);
    //     break;
    //   }
    //   else{
    //     this.x=false;
    //   }
    // }
    // })
    
    
  }

  //signout(){
    //this.navCtrl.pop();
    //this.navCtrl.setRoot(HomePage);
    //this.navCtrl.popToRoot();
  //}

}
