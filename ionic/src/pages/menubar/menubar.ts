import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ManagerHomePage } from "./../manager-home/manager-home";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
  username:string;
  requests='0';
  constructor(public nav: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    this.username=this.auth.getUser();
    this.getRequests();
  }
  
  //requests
  getRequests(){
    this.auth.getRequestNo(this.username).subscribe(requests => {
     this.requests=requests;
    },
      error => {
       console.log("error");
    });
  }

  //open pages
  openPage(pagename) {
    this.nav.push(pagename);
  }
  menuOpened(){
    this.username=this.auth.getUser();
    this.getRequests();
  }
  menuClosed(){
    this.username=this.auth.getUser();
    this.getRequests();
  }


}
