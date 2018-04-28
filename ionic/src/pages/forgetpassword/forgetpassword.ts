import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ForgetPasswordProvider } from '../../providers/forget-password/forget-password';

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  email = "";
  loading: Loading;
  constructor(public nav: NavController, private fp: ForgetPasswordProvider, private alert: AlertController, private loadingCtrl: LoadingController) {
  }

  sendEmail() {
    this.showLoading();
    if (this.email != "") {
      this.fp.sendEmail(this.email).subscribe(mail => {
        if(mail=="-1"){
          this.showError("This Email Used Account cannot Recognized");  
        }else{  
          this.fp.setEmail(this.email);
          this.nav.push("PasswordChangePage");
        }
      },
        error => {
          this.showError('There is an Error Sending Mail');
          console.log(error);
        });
    } else {
      this.showError("Please Enter Your E-mail");
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'E-mail Sending...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
