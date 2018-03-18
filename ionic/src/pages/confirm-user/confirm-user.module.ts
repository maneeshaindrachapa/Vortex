import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmUserPage } from './confirm-user';

@NgModule({
  declarations: [
    ConfirmUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmUserPage),
  ],
})
export class ConfirmUserPageModule {}
