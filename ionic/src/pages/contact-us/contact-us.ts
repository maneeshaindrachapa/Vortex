import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  createSuccess = false;
  registerCompanyCredentials = { firstname: '', lastname: '', email: '', username: '', password: '',companyRegNo:'',companyName:'',address:'' };

  constructor(public nav: NavController,private alertCtrl: AlertController, private auth: AuthServiceProvider) {
  }
  //when user sign up
  public register() {
    this.auth.registerCompany(this.registerCompanyCredentials).subscribe(success => {
      if (success=="7") {
        this.createSuccess = true;
        this.showPopup("Success", "Details are Sent.");
      }else if (success=="1") {
        this.showPopup("Error", "Invalid Firstname.");
      }else if (success=="2") {
        this.showPopup("Error", "Invalid Lastname.");
      }else if (success=="3") {
        this.showPopup("Error", "Invalid Email.");
      } else if (success=="4") {
        this.showPopup("Error", "Username is Already in Use.");
      }else if (success=="5") {
        this.showPopup("Error", "Email is Already in use.");
      }else if (success=="6") {
        this.showPopup("Error", "The Organization is Already Registered");
      }else {
        this.showPopup("Error", "Problem While Sending Details.");
      }
    },
      error => {
        this.showPopup("Error", "Invaild Details");
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

  help(){
    let alert=this.alertCtrl.create({
      title:"About Vortex",
      subTitle:'A vote is a formal expression of an individual&#39;s choice, either “for” or “against” some motion.When it comes to decision making in organizations, small voting ballots are held so that the workers in the organization could vote.Those voting ballots in organizations are done manually and are held only for a limited period of time (usually up to 2-5 hours). Vortex is a solution to held those ballots in an efficinet way',
      buttons:[{
        text:"OK",
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }]
    });
    alert.present();
  }
}
