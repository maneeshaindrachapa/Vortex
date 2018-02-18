import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeAddBallotProvider } from '../../providers/employee-add-ballot/employee-add-ballot';

@IonicPage()
@Component({
  selector: 'page-add-employees',
  templateUrl: 'add-employees.html',
})
export class AddEmployeesPage {
  items:user[]
  users:user[]
  constructor(public navCtrl: NavController, public navParams: NavParams,private empAddBallot:EmployeeAddBallotProvider) {
  }

  //initialize items
  initializeItems(){
    this.empAddBallot.getUsers().subscribe(users => {
      for(let i in users){
        this.items.push(users[i]);
        this.users.push(users[i]);
      }
     },
     error => {
       console.log(error);
     });
  }

  initializeSearch(){
    this.items=this.users;
  }

  //search bar function
  getUserDetails(ev: any) {
    // Reset items back to all of the items
    this.initializeSearch();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        if(item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1){
          console.log(this.items);
          return item;
        };
      });
    }
    return false;
  }
}

interface user{
  username:string,
  firstname:string,
  lastname:string,
  organizationID:number
}