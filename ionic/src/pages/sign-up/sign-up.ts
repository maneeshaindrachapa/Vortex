import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  createSuccess = false;
  registerCredentials = { firstname: '', lastname: '', email: '', username: '', password: '',organizationID:'1' };
  organizations: Organization[] = [];

  constructor(public nav: NavController, private alertCtrl: AlertController, private auth: AuthServiceProvider) {
    this.loadOrganization();
  }

  //when user sign up
  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success=="4") {
        this.createSuccess = true;
        this.showPopup("Success", "Account Created.");
      } else if(success=="1") {
        this.showPopup("Error", "Invalid Firstname.");
      } else if(success=="2") {
        this.showPopup("Error", "Invalid Lastname.");
      } else if(success=="3") {
        this.showPopup("Error", "Invalid E-mail.");
      } else if(success=="5") {
        this.showPopup("Error", "This Username is Already Used");
      } else if(success=="6") {
        this.showPopup("Error", "This Email is Already Used");
      }else{
        this.showPopup("Error", "Problem While Creating Account.");
      }
    },
      error => {
        this.showPopup("Error", "Invaild User Details");
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  //load registered organization list
  public loadOrganization() {
    this.auth.loadOrganizations().subscribe(organization => {
      for (let i in organization) {
        this.organizations.push(organization[i]);

      }
      console.log(this.organizations);
    },
      error => {
        this.showPopup("Error", error);
      });
  }
}

interface Organization {
  organizationID: number,
  organizationRegNo: string,
  organizationName: string,
  organiztionAddress: string
}