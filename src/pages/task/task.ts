import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login'
import { NewtaskPage } from '../newtask/newtask'
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http'
import { resolveDefinition } from '@angular/core/src/view/util';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  task=[]
  n=0;
  mail:any
  oldtask:any
  constructor(public http:HttpClient, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public alertCtrl: AlertController, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
    this.storage.get('userdetails').then((user)=>{
        
        console.log("I am "+user.email)
        //this.mail=user
        //console.log(this.mail)
        this.http.post('http://localhost:3000/alltask',user).subscribe(response=>{
        console.log(JSON.parse(JSON.stringify(response)).results)
        this.task.splice(0,this.task.length)
        for(var i of JSON.parse(JSON.stringify(response)).results) {
          this.task.push(i)
        }
        //console.log(response)
        //console.log(this.email)
    })
    })
    
    // let id = {
    //   email: this.mail
    // }

    
  }

  goToPage()  {

    this.navCtrl.push(NewtaskPage);

  }

  delete(index){
    this.storage.get("key").then((val)=>{
      //let i
      //for(i=0;i<val.length;i++)
      //{
      //  if(val[i].title==title) {
      //    val.splice(i,1);
      //    console.log(val[i]); }
      //}
      this.storage.get('userdetails').then((mailid)=>{
        
        let del = {
          task: this.task[index].task,
          email: mailid.email
        }
        this.http.post('http://localhost:3000/deletetask',del).subscribe(response=>{

        })
        this.task.splice(index,1)
        this.storage.set("key",val)
        this.storage.set('task',this.task)
      })
      // this.task.splice(index,1)
      // let del = {
      //   task: this.task[index].task,
      //   email: 
      // }
      // this.http.delete('http://localhost:3000/deletetask',val).subscribe(response=>{

      // })
      // this.storage.set("key",val)
      // this.storage.set('task',this.task)
    })

    //if(this.task[0]==null)
    //{
    //  this.n=0
    //}
    this.n=this.task.length;
    
  }

  update(index){
    this.oldtask=this.task[index].task
    let alert=this.alertCtrl.create({
      title:'Update Task?',
      message: 'Type in your new task to update...',
      inputs: [{ name: 'editTitle', placeholder: 'Title',value:this.task[index].task},{ name: 'editDescription', placeholder: 'Description',value:this.task[index].description}],
      buttons: [{ text: 'Cancel', role: 'cancel'},
                { text: 'Update', handler: data => {
                  this.task[index].task=data.editTitle;
                  this.task[index].description=data.editDescription;
                  this.storage.set('task',this.task);
                  this.storage.get('userdetails').then((mailid)=>{
                    let newdata={
                      email:mailid.email,
                      editTitle:data.editTitle,
                      editDescription:data.editDescription,
                      oldtask:this.oldtask
                    }
                    this.http.post('http://localhost:3000/updatetask',newdata).subscribe(response=>{

                    })
                  })
                }}]
    });
    alert.present();
  }

  ionViewWillEnter() {

    //this.storage.get('key').then((val)=>{
    //  console.log("Data is: ",val);

      //this.title = val['title'];
      //this.description = val['description'];
    //  this.task.push(val)
     // this.n=this.task.length;
      //this.storage.set('task',this.task);
    //})
    //this.storage.get('n').then((x)=>{
    //  this.n=x;
    //})

  }

  signout(){
    //this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
    let loginstatus=false
    this.storage.set('key1',loginstatus)
  }

}
