import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, DateTime } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

@IonicPage()
@Component({
  selector: 'page-create-voting-ballot',
  templateUrl: 'create-voting-ballot.html',
})
export class CreateVotingBallotPage {
  username: string;
  currentDate = new Date().toISOString();
  createSuccess = false;
  ballotDetails = { ballotName: '', ballotDescription: '', startDate: '', startTime: '', holdingHours: '', url: '' };
  noOfOptions: number;
  ballotOptions = [];
  ballotOptionsContainer = {};
  loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private ballot: BallotServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.username = this.auth.getUser(); //getting username from auth service provider
    ballot.setUser(this.username); //set username in ballot service provider
    //console.log(this.currentDate.);
  }

  //adding options according to the noofoptions
  onChange($event) {
    this.ballotOptions = []
    for (var index = 0; index < this.noOfOptions; index++) {
      this.ballotOptions.push(index);
    }
  }

  createBallot() {
    this.showLoading();
    this.ballot.createVotingBallot(this.ballotDetails, this.noOfOptions, this.ballotOptionsContainer).subscribe(ballots => {
      this.showSuccess("Voting Ballot Created Successfully");
      this.nav.pop();
    },
      error => {
        this.showError("There is an Error in Details Entered");
        console.log(error);
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

  showSuccess(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
