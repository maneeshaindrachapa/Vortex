import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeAddBallotProvider {
  ballotID:number;
  organizationID:number;
  constructor(public http:Http) {
  }

  //set Ballot ID
  public setballotID(ballotID){
    this.ballotID=ballotID;
  }
  //get Ballot ID
  public getballotID(){
    return this.ballotID;
  }
  //set organizationID
  public setOrganizationID(organizationID){
    this.organizationID=organizationID;
    console.log(organizationID);
  }
  //getUsers
  getUsers(){
    return this.http.post("http://localhost/VortexApp/api/AddUsersToVotingBallot/getUsers.php",{"organizationID":this.organizationID,"ballotID":this.ballotID}).map(res=>res.json());
  }

  //add user to ballot
  public addUserToBallot(username,ballotID){
    return this.http.post("http://localhost/VortexApp/api/AddUsersToVotingBallot/addUsers.php",{"username":username,"ballotID":ballotID}).map(res=>res.json());
  }

  //remove user from ballot
  public removeUserFromBallot(username,ballotID){
    return this.http.post("http://localhost/VortexApp/api/AddUsersToVotingBallot/removeVoters.php",{"username":username,"organizationID":this.organizationID,"ballotID":ballotID}).map(res=>res.json());
  }
  //get voters that already added
  public getVoters(){
    return this.http.post("http://localhost/VortexApp/api/AddUsersToVotingBallot/getVoters.php",{"organizationID":this.organizationID,"ballotID":this.ballotID}).map(res=>res.json());
  }
}
