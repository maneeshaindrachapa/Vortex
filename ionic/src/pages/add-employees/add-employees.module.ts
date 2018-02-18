import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEmployeesPage } from './add-employees';

@NgModule({
  declarations: [
    AddEmployeesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEmployeesPage),
  ],
})
export class AddEmployeesPageModule {}
