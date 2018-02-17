import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //declaring variables
  loading: Loading;
  registerCredentials = { username: '', password: '' };
 
  constructor(private nav:NavController, private auth:AuthServiceProvider, private alertCtrl:AlertController, private loadingCtrl: LoadingController) { }
 
  //navigate to the sign up page
  public createAccount() {
    this.nav.push('SignUpPage');
  }

  //navigate to forget password
  public forgetpassword(){
    this.nav.push("ForgetpasswordPage");
  }
  
  //when click the login button
  public login() {
   this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed){ 
        this.auth.setUser(allowed.username); //setting username
        console.log(allowed.type);
        if(allowed.type=="1"){      
          this.nav.setRoot('EmployeeHomePage');
        }else if(allowed.type=="2"){
          this.nav.setRoot('MenubarPage');//manager will have a menubar
        }
      }else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError("Invaild Credentials");
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
      title: 'Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}