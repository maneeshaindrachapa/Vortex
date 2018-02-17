import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenubarPage } from './menubar';

@NgModule({
  declarations: [
    MenubarPage,
  ],
  imports: [
    IonicPageModule.forChild(MenubarPage),
  ],
})
export class MenubarPageModule {}
