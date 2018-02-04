import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-create-voting-ballot',
  templateUrl: 'create-voting-ballot.html',
})
export class CreateVotingBallotPage {
  createSuccess = false;
  ballotDetails = { ballotName: '',ballotDescription:'', startDate:'',startTime:'', endDate:'',endTime:'', url: '' };

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVotingBallotPage');
  }

}
