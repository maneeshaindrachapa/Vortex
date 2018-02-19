import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ManagerHomePage} from "./../manager-home/manager-home";

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menubar',
  templateUrl: 'menubar.html',
})
export class MenubarPage {
  rootPage = 'ManagerHomePage';
  
  constructor(public nav: NavController, public navParams: NavParams) {
  }
  
  //open pages
  openPage(pagename){
    this.nav.push(pagename);
  }

  

}
