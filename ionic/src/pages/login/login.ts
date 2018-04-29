import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //declaring variables
  loading: Loading;
  registerCredentials = { username: "", password: "" };
  viewShow: boolean = false;

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private storage: Storage) {
    this.getStorage();
  }

  //navigate to the sign up page
  public createAccount() {
    this.nav.push('SignUpPage');
  }

  //navigate to forget password
  public forgetpassword() {
    this.nav.push("ForgetpasswordPage");
  }

  //navigate to contactus 
  public contactUs() {
    this.nav.push("ContactUsPage");
  }

  //storage access
  public getStorage() {
    if (this.storage.ready) {
      this.storage.get("userDetails").then(val => {
        if (val) {
          this.registerCredentials = val;
        }
        if ((this.registerCredentials.username.length > 0) && (this.registerCredentials.password.length > 0)) {
          this.viewShow = false;
          this.login();
        } else {
          this.registerCredentials.username = "";
          this.registerCredentials.password = "";
          this.setStorage();
          this.viewShow = true;
        };
      });
    }
    this.check();
  }

  public check() {
    if (this.registerCredentials.username.length == 0 && this.registerCredentials.password.length == 0) {
      this.viewShow = true;
    }
  }
  public setStorage() {
    //save variables to storage as keys
    if (this.storage.ready) {
      console.log(this.storage.ready);
      this.storage.set("userDetails", this.registerCredentials);
    };

  }

  //when click the login button
  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed != "-1") {
        this.setStorage();
        this.auth.setUser(allowed.username); //setting username
        if (allowed.type == "1") {
          this.nav.setRoot('EmployeeHomePage');
        } else if (allowed.type == "2") {
          this.nav.setRoot('MenubarPage');//manager will have a menubar
        } else if (allowed.type == "3") {
          this.nav.setRoot('AdminPage');//goes to admin page
        }
      } else {
        this.showError("Access Denied");
        this.viewShow = true;
      }
    },
      error => {
        this.showError("Invaild Credentials");
        this.viewShow = true;
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