import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeHomePage } from './employee-home';

@NgModule({
  declarations: [
    EmployeeHomePage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeHomePage),
  ],
})
export class EmployeeHomePageModule {}
