import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  loading: Loading;
  username:string;
  userDetails={username:'',firstname:'',lastname:'',email:''};
  passwordDetails={currentPassword:'',newPassword:'',confirmPassword:''};

  constructor(public nav: NavController, public navParams: NavParams,private auth:AuthServiceProvider,private alertCtrl:AlertController, private loadingCtrl: LoadingController) {
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

  editProfile(){
    this.showLoading();
    this.auth.editProfile(this.username,this.userDetails).subscribe(user => {
      if(user=="1"){
        this.showError("Invalid First Name");
      }else if(user=="2"){
        this.showError("Invaild Last Name");
      }else if(user=="3"){
        this.showError("Invaild Email Address");
      }else if(user=="0"){
        this.showSuccess("Profile Updated");
      }
     },
     error => {
      this.showError("There is an Error Occured")
     });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  showSuccess(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  //user logout
  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
}
 
