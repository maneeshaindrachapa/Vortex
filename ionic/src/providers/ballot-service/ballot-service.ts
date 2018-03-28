import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class BallotServiceProvider {
  username: string;
  votingBallotID: Number;
  constructor(public http: Http) {
  }
  //get user
  getUser() {
    return this.username;
  }
  //set user
  setUser(username) {
    this.username = username;
  }
  //set voting ballot id
  setvotingballotid(votingballotid) {
    this.votingBallotID = votingballotid;
  }
  //get voting ballot id
  getvotingballotid() {
    return this.votingBallotID;
  }

  //get voting options
  public getvotingOptions(votingBallotID) {
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/EmployeeVotings/getVotingOptions.php", JSON.stringify({ "votingballotID": votingBallotID })).map(res => res.json());
  }
  //get results
  public getResults(votingBallotID,votingOptionIDs){
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/EmployeeVotings/getResults.php", JSON.stringify({ "votingballotID": votingBallotID,"votingoptionIDs":votingOptionIDs })).map(res => res.json());
  }

  //add voting
  public employeeAddVote(vote) {
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/EmployeeVotings/AddEmployeeVote.php", JSON.stringify({ "votingballotID": this.votingBallotID, "username": this.username, "votingoptionID": vote })).map(res => res.json());
  }
  //make a voting ballot
  public createVotingBallot(ballotDetails, noOfOptions, ballotOptionsContainer) {
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/createBallot.php", JSON.stringify({
      "username": this.username,
      "ballotName": ballotDetails.ballotName,
      "ballotDescription": ballotDetails.ballotDescription,
      "startDate": ballotDetails.startDate,
      "startTime": ballotDetails.startTime,
      "holdingHours": ballotDetails.holdingHours,
      "url": ballotDetails.url,
      "noOfOptions": noOfOptions,
      "ballotOptionsContainer": ballotOptionsContainer
    })).map(res => res.json());
  }
  public checkSecurity(votingballotid,publicsecuritykey,privatesecuritykey,username){
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/checkSec.php",JSON.stringify({"votingballotID":votingballotid,"publicSecurityKey":publicsecuritykey,"privateSecurityKey":privatesecuritykey,"username":username})).map(res=>res.json());
  }
  public sendMail(votingballotid,username){
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/sendMail.php",JSON.stringify({"votingballotID":votingballotid,"username":username})).map(res=>res.json());
  }
  public removeBallot(votingballotid){
    return this.http.post("http://maneeshaindrachapamora.000webhostapp.com/vortex/api/removeBallot.php",JSON.stringify({"votingballotID":votingballotid})).map(res=>res.json());
  }
}
