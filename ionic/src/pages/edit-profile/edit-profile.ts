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
  userDetails={username:'',firstname:'',lastname:'',email:''};
  passwordDetails={currentPassword:'',newPassword:'',confirmPassword:''};

  constructor(public nav: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    this.username=this.auth.getUser();
    this.auth.getUserDetails(this.username).subscribe(user => {
      this.userDetails.username=user.username;
      this.userDetails.firstname=user.firstname;
      this.userDetails.lastname=user.lastname;
      this.userDetails.email=user.email;
     },
     error => {
       console.log(error);
     });
  }

  //user logout
  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
}
 
