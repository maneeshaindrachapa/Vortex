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
    return this.http.post("http://localhost/VortexApp/api/AddUsersToVotingBallot/getUsers.php",{"organizationID":this.organizationID}).map(res=>res.json());
  }
}
