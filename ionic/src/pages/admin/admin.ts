import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  organizations:organization[]=[];
  isOrganization:boolean=false;
  loading:Loading;
  constructor(public nav: NavController, private auth:AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.getUnacceptedORganization();
  }
  //get unaccepted organizations
  getUnacceptedORganization(){
    this.auth.getUnacceptedOrganizations().subscribe(org => {
      for (let i in org) {
        this.organizations.push(org[i]);
      }
      if(this.organizations.length!=0){
        this.isOrganization=true;
      }else{
        this.isOrganization=false;
      }
    },
      error => {
        console.log(error);
      });
  }
  //accept organization
  acceptOrganization(organizationID){
    this.showLoading();
    this.auth.acceptOrganizations(organizationID).subscribe(org => {
      this.showMessage("Sucess","Organization Accepted.");
      this.organizations=[];
      this.getUnacceptedORganization();
    },
      error => {
        console.log(error);
      });
  }

  //refresh Page
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.organizations = []; //making all the items null then runst the async operation to get new items
    this.getUnacceptedORganization();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  //user logout
  logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
  //edit profile 
  editProfile() {
    this.nav.push('EditProfilePage');
  }
  //loading
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  //show message
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
interface organization{
  organizationID:number,
  organizationRegNo:string,
  organizationName:string,
  organizationAddress:string,
  organizationAccepted:string
}
