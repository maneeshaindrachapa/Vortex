import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@IonicPage()
@Component({
  selector: 'page-manager-home',
  templateUrl: 'manager-home.html',
})
export class ManagerHomePage {
  username = '';

  ballots:VotingBallots[]=[];
  items:VotingBallots[]=[];

  constructor(public nav: NavController, public navParams: NavParams,private auth:AuthServiceProvider) {
    this.initializeItems();
  }

  //initialize items
  initializeItems(){
    this.auth.getVotingBallots().subscribe(ballots => {
      for(let i in ballots){
        this.items.push(ballots[i]);
        this.ballots.push(ballots[i]);
      }
     },
     error => {
       console.log(error);
     });
  }

  initializeSearch(){
    this.items=this.ballots;
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
        if(item.votingballotName.toLowerCase().indexOf(val.toLowerCase()) > -1){
          console.log(this.items);
          return item;
        };
      });
    }
    return false;
  }

  //user logout
  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

  //creating voting ballot
  public createBallot(){
    this.nav.push('CreateVotingBallotPage');
  }
}

interface VotingBallots{
  votingballotID:number,
  votingballotName:string,
  votingballotDescription:string,
  startDate:Date,
  startTime:DateTime,
  endDate:Date,
  endTime:DateTime,
  image:string
}