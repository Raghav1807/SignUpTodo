import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formgroup:FormGroup;
  signupstatus:any=false;
  loginstatus:any=false;
  username:AbstractControl;
  email:AbstractControl;
  password:AbstractControl;
  number:AbstractControl;
  signin=[];
  //user:any;
  //mail:any;
  //pass:any;
  //num:any;

  constructor(public navCtrl: NavController, public formbuilder:FormBuilder, public storage:Storage) {
    this.formgroup=this.formbuilder.group({
      username:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
      email:['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]],
      number:['',[Validators.required,Validators.pattern(/^[0-9]{10,}$/)]]
    });

    this.username = this.formgroup.controls['username'];
    this.email = this.formgroup.controls['email'];
    this.password = this.formgroup.controls['password'];
    this.number = this.formgroup.controls['number'];
  }

  signup()
  {
    let details={
      username:this.username.value,
      email:this.email.value,
      password:this.password.value,
      number:this.number.value
    }
    console.log(this.formgroup.value);
    this.signupstatus=true;
    this.loginstatus=true;
    this.storage.set('key',this.signupstatus);
    this.storage.set('key1',this.loginstatus);
    //this.storage.set('username', this.username.value);
    //this.storage.set('email', this.email.value);
    //this.storage.set('password', this.password.value);
    //this.storage.set('number', this.number.value);
    this.storage.get('sign').then((val)=>{
      if(val==null)
      {
        let arr=[details];
        this.storage.set('sign',arr);
      }
      else {
        this.signin=val;
        this.signin.push(details);
        this.storage.set('sign',this.signin);
      }
    });
    //this.username=null;
    //this.email=null;
    //this.password=null;
    //this.number=null;
    //this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  //logout()
  //{
  //  this.signupstatus=false;
  //  //this.loginstatus=false;
  //  //this.formgroup.reset;
  //  this.storage.set('key',this.signupstatus);
  //  //this.storage.set('key1',this.loginstatus);
  //}

  move(){
    this.storage.set('key1',this.loginstatus);
    //this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  ionViewWillEnter()
  {
    this.signupstatus=false;
  }

}
