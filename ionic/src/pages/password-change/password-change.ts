import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { ForgetPasswordProvider } from '../../providers/forget-password/forget-password';


@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {
  loading: Loading;
  code: number;
  email: string;
  correct = false;
  password = "";
  constructor(public nav: NavController, public navParams: NavParams, private fp: ForgetPasswordProvider, private alert: AlertController, private loadingCtrl: LoadingController) {
    this.email = this.fp.getEmail();
  }

  checkCode() {
    this.showLoading("Code Checking...");
    if (this.code != null) {
      this.fp.checkCode(this.email, this.code).subscribe(code => {
        if (code == "0") {
          this.loading.dismiss();
          this.correct = true;
          this.code = null;
        }
        else if (code == "1") {
          this.showError('Time Expired');
          this.correct = false;
        } else if (code == "2") {
          this.showError("6 Digit Code Entered is Incorrect");
          this.correct = false;
        }
      },
        error => {
          this.showError('There is an Error');
          console.log(error);
        });
    } else {
      this.showError("Please Enter 6 Digit Code");
    }
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alert.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading(text) {
    this.loading = this.loadingCtrl.create({
      content: text,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  changePassword() {
    this.showLoading("Waiting.....");
    if (this.password.length > 8) {
      this.fp.changePassword(this.email, this.password).subscribe(password => {
        this.showSuccess("Password Changed Succesfully");
        this.nav.push("LoginPage");
      },
        error => {
          this.showError('There is an Error');
        });
    } else {
      this.showError("Your Password Should have atleast 8 Characters");
    }
  }

  showSuccess(text) {
    this.loading.dismiss();
    let alert = this.alert.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
