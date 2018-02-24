import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BallotServiceProvider} from '../../providers/ballot-service/ballot-service';

@IonicPage()
@Component({
  selector: 'page-voting',
  templateUrl: 'voting.html',
})
export class VotingPage {
  vote:Number=-1;
  votingBallotID:Number;
  votingOptions:votingOption[]=[];
  constructor(public nav: NavController, public navParams: NavParams,private ballotSer:BallotServiceProvider) {
    this.votingBallotID=this.ballotSer.getvotingballotid();
    this.getVotingOptions();
  }

  //get all voting options for a perticular voting ballot
  getVotingOptions(){
    this.ballotSer.getvotingOptions(this.votingBallotID).subscribe(options => {
      for(let i in options){
        this.votingOptions.push(options[i]);
        console.log(this.votingOptions);
      }
     },
     error => {
       console.log(error);
     });
  }

  //vote record
  makeVote(){
    if(this.vote==-1){
      
    }else{
      console.log(this.vote);
    }
  }

}

interface votingOption{
  votingballotID:Number,
  votingoptionID:Number,
  votingoptionName:string
}