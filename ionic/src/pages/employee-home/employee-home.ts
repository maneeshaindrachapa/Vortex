import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-employee-home',
  templateUrl: 'employee-home.html',
})
export class EmployeeHomePage {

  constructor(public nav: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
  }

  //user logout
  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

}
