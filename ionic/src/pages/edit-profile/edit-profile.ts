import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  username:string;
  user:{username:'',firstname:'',lastname:'',email:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    this.username=this.auth.getUser();
    this.auth.getUserDetails(this.username).subscribe(user => {
      console.log(user);
      this.user=user;
      console.log(this.user);
     },
     error => {
       console.log(error);
     });
  }
}

