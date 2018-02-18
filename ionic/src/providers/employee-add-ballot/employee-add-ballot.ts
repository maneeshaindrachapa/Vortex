import { Injectable } from '@angular/core';

//adding http module and rxjs module
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeAddBallotProvider {
  ballotID:number;
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

  getUsers(){
    return this.http.post("http://localhost/VortexApp/api/getUserDetails.php",{"votingBallotID":this.ballotID}).map(res=>res.json());
  }
}
