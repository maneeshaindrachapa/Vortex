import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@IonicPage()
@Component({
  selector: 'page-employee-home',
  templateUrl: 'employee-home.html',
})
export class EmployeeHomePage {
  loading: Loading;
  username = '';
  currentDate = new Date();
  ballots: VotingBallots[] = [];
  items: VotingBallots[] = [];
  constructor(public nav: NavController,private alertCtrl:AlertController, private auth: AuthServiceProvider, private ballotSer: BallotServiceProvider,private loadingCtrl: LoadingController) {
    this.username = this.auth.getUser();
    this.ballotSer.setUser(this.username);
    this.initializeItems();
  }
  //initialize items
  initializeItems() {
    this.auth.getEmployeeVotingBallots(this.username).subscribe(ballots => {
      for (let i in ballots) {
        let tempStartDate = new Date(ballots[i].startDate + 'T' + ballots[i].startTime);//assiginng temporary data to compare dates
        let tempEndDate = new Date(ballots[i].endDate + 'T' + ballots[i].endTime);
        if (tempStartDate < this.currentDate && this.currentDate < tempEndDate) {
          ballots[i].vote = true;
          ballots[i].viewResults = false;
        } else {
          ballots[i].vote = false;
          ballots[i].viewResults = true;
        }
        this.items.push(ballots[i]);
        this.ballots.push(ballots[i]);
      }
    },
      error => {
        console.log(error);
      });
  }

  initializeSearch() {
    this.items = this.ballots;
  }

  //search bar function
  getVotingBallotDetails(ev: any) {
    // Reset items back to all of the items
    this.initializeSearch();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        if (item.votingballotName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          console.log(this.items);
          return item;
        };
      });
    }
    return false;
  }

  //user logout
  logout() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Do you want to Logout ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.auth.logout().subscribe(succ => {
              this.nav.setRoot('LoginPage');
            },
              error => {
                console.log(error);
              });
          }
        }
      ]
    });
    alert.present();
  }
  editProfile() {
    this.nav.push('EditProfilePage');
  }
  //vote in voting ballot
  vote(votingballotid) {
    this.ballotSer.setvotingballotid(votingballotid);
    this.nav.push("VotingPage");
  }
  //view Results
  viewResults(votingballotid){
    this.ballotSer.setvotingballotid(votingballotid);
    this.nav.push("ResultsPage");
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

  sendKeys(votingballotid){
    this.showLoading();
    this.ballotSer.sendMail(votingballotid,this.username).subscribe(confirmation => {
      this.loading.dismiss();
      this.presentPrompt(votingballotid);
    },
      error => {
        this.showMessage("Error","Cannot send email");
        console.log(error);
      });
  }
  presentPrompt(votingballotid) { //Key entering field
    let alert = this.alertCtrl.create({
      title: 'View Results',
      inputs: [
        {
          name: 'publicsecuritykey',
          placeholder: 'Public Security Key',
          type:'password'
        },
        {
          name: 'privatesecuritykey',
          placeholder: 'Private Security Key',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'See Results',
          handler: data => {
            this.showLoading();
            this.ballotSer.checkSecurity(votingballotid,data.publicsecuritykey,data.privatesecuritykey,this.username).subscribe(confirmation => {
              this.loading.dismiss();
              this.viewResults(votingballotid);
            },
              error => {
                this.showMessage("Error","Invalid Security Keys");
                console.log(error);
            });
          }
        }
      ]
    });
    alert.present();
  }
}

interface VotingBallots {
  votingballotID: number,
  votingballotName: string,
  votingballotDescription: string,
  startDate: Date,
  startTime: DateTime,
  endDate: Date,
  endTime: DateTime,
  image: string,
  vote: boolean,
  viewResults: boolean
}