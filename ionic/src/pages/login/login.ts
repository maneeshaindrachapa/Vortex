import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
 
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
  
  //when click the login button
  public login() {
   this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed){ 
        console.log(allowed.type);
        if(allowed.type=="1"){      
          this.nav.setRoot('HomePage');
        }else if(allowed.type=="2"){
          this.nav.setRoot('OwnersPage');
        }else if(allowed.type=="3"){
          this.nav.setRoot('AdminPage');
        }
      }else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError("Credentials are not matching");
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
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}