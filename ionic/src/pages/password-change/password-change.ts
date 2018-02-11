import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
import {ForgetPasswordProvider} from '../../providers/forget-password/forget-password';


@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {
  loading:Loading;
  code:number;
  email:string;
  correct=false;
  password="";
  constructor(public nav: NavController, public navParams: NavParams, private fp:ForgetPasswordProvider,private alert:AlertController,private loadingCtrl: LoadingController) {
    this.email=this.fp.getEmail();
  }

  checkCode(){
    this.showLoading();
    if(this.code!=null){
      this.loading.dismiss();
      this.fp.checkCode(this.email,this.code).subscribe(code => {
        this.correct=true;
      },
      error => {
        this.showError('There is an Error');
        console.log(error);
      });
    }else{
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Code Checking...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
