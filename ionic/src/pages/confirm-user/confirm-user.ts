import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import {AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-confirm-user',
  templateUrl: 'confirm-user.html',
})
export class ConfirmUserPage {
  username:string;
  users: user[] = [];
  loading:Loading;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController,private auth:AuthServiceProvider) {
    this.username=this.auth.getUser();
    this.getUnacceptedUsers();
  }

  //get unaccepted users
  public getUnacceptedUsers() {
    this.auth.getUnacceptedUsers(this.username).subscribe(user => {
      for (let i in user) {
        this.users.push(user[i]);
      }
    },
      error => {
        console.log(error);
      });
  }

  //accept user
  public acceptUser(username){
    this.showLoading();
    this.auth.acceptUser(username).subscribe(user => {
      this.showMessage("Success","User accepted to the Organization");
      this.users=[];
      this.getUnacceptedUsers();
    },
      error => {
        this.showMessage("Error","There is an error in Connection");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showMessage(title,text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }


}
interface user {
  username: string,
  firstname: string,
  lastname: string,
  organizationID: number,
  accepted:number
}
