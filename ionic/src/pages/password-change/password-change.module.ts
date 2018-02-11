import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordChangePage } from './password-change';

@NgModule({
  declarations: [
    PasswordChangePage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordChangePage),
  ],
})
export class PasswordChangePageModule {}
