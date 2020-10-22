import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewtaskPage } from './newtask';

@NgModule({
  declarations: [
    NewtaskPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtaskPage),
  ],
})
export class NewtaskPageModule {}
