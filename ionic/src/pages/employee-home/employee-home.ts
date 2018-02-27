import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@IonicPage()
@Component({
  selector: 'page-employee-home',
  templateUrl: 'employee-home.html',
})
export class EmployeeHomePage {
  username = '';
  currentDate = new Date();
  ballots: VotingBallots[] = [];
  items: VotingBallots[] = [];
  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private ballotSer: BallotServiceProvider) {
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
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
  editProfile() {
    this.nav.push('EditProfilePage');
  }
  //vote in voting ballot
  vote(votingballotid) {
    this.ballotSer.setvotingballotid(votingballotid);
    this.nav.push("VotingPage");
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