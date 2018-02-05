import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class BallotServiceProvider {
  username:string
  constructor(public http: Http) {
  }
  //get user
  getUser(){
    return this.username;
  }
  //set user
  setUser(username){
    this.username=username;
  }

  //make a voting ballot
  public createVotingBallot(ballotDetails,noOfOptions,ballotOptionsContainer){
    return this.http.post("http://localhost/VortexApp/api/createBallot.php",{
      "username":this.username,
      "ballotName":ballotDetails.ballotName,
      "ballotDescription":ballotDetails.ballotDescription,
      "startDate":ballotDetails.startDate,
      "startTime":ballotDetails.startTime,
      "endDate":ballotDetails.endDate,
      "endTime":ballotDetails.endTime,
      "url":ballotDetails.url,
      "noOfOptions":noOfOptions,
      "ballotOptionsContainer":ballotOptionsContainer}).map(res=>res.json());
  }
}
