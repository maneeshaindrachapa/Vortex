import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

@IonicPage()
@Component({
  selector: 'page-voting',
  templateUrl: 'voting.html',
})
export class VotingPage {
  vote: Number = -1;
  votingBallotID: Number;
  votingOptions: votingOption[] = [];
  loading: Loading;
  constructor(public nav: NavController, private ballotSer: BallotServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.votingBallotID = this.ballotSer.getvotingballotid();
    this.getVotingOptions();
  }

  //get all voting options for a perticular voting ballot
  getVotingOptions() {
    this.ballotSer.getvotingOptions(this.votingBallotID).subscribe(options => {
      for (let i in options) {
        this.votingOptions.push(options[i]);
        console.log(this.votingOptions);
      }
    },
      error => {
        console.log(error);
      });
  }

  //vote record
  makeVote() {
    this.showLoading();
    if (this.vote == -1) {
      this.showError("Please Select a Option to Vote");
    } else {
      console.log(this.vote);
      this.ballotSer.employeeAddVote(this.vote).subscribe(success => {
        this.showSuccess("Your Vote Added, Thank You !");
      },
        error => {
          this.showError("Error");
        });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  //show toast
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
      title: 'Successful',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}

interface votingOption {
  votingballotID: Number,
  votingoptionID: Number,
  votingoptionName: string
}