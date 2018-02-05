import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {BallotServiceProvider} from '../../providers/ballot-service/ballot-service';

@IonicPage()
@Component({
  selector: 'page-create-voting-ballot',
  templateUrl: 'create-voting-ballot.html',
})
export class CreateVotingBallotPage {
  username:string;
  createSuccess = false;
  ballotDetails = { ballotName: '',ballotDescription:'', startDate:'',startTime:'', endDate:'',endTime:'', url: '' };
  noOfOptions:number;
  ballotOptions=[];
  ballotOptionsContainer={};

  constructor(public nav: NavController, public navParams: NavParams, private auth:AuthServiceProvider,private ballot:BallotServiceProvider) {
    this.username=this.auth.getUser(); //getting username from auth service provider
    ballot.setUser(this.username); //set username in ballot service provider
  }

  //adding options according to the noofoptions
  onChange($event){
    this.ballotOptions=[]
    for(var index=0;index<this.noOfOptions;index++){
      this.ballotOptions.push(index);
    }
  }

  createBallot(){
    this.ballot.createVotingBallot(this.ballotDetails,this.noOfOptions,this.ballotOptionsContainer).subscribe(ballots => {
      
     },
     error => {
       console.log(error);
     });
  }
  

}
