import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { EmployeeAddBallotProvider } from '../../providers/employee-add-ballot/employee-add-ballot';

@IonicPage()
@Component({
  selector: 'page-add-employees',
  templateUrl: 'add-employees.html',
})
export class AddEmployeesPage {
  ballotID: number;
  loading: Loading;
  items: user[] = [];
  users: user[] = [];
  addedVoters: user[] = [];
  constructor(public navCtrl: NavController, private empAddBallot: EmployeeAddBallotProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.initializeItems();
    this.ballotID = this.empAddBallot.getballotID();
  }
  //get the voters
  public voters() {
    this.empAddBallot.getVoters().subscribe(voters => {
      for (let i in voters) {
        this.addedVoters.push(voters[i]);
      }
    },
      error => {
        console.log(error);
      });
  }

  //initialize items
  initializeItems() {
    this.addedVoters = [];
    setTimeout(1);
    this.voters();
    this.empAddBallot.getUsers().subscribe(users => {
      for (let i in users) {
        var counter = 0;
        for (let j in this.addedVoters) {
          counter++;
          if (users[i].username == this.addedVoters[j].username) {
            break;
          } else if (counter == this.addedVoters.length) {
            this.items.push(users[i]);
            this.users.push(users[i]);
            counter = 0;
          }
        }
        if (this.addedVoters.length == 0) {
          this.items.push(users[i]);
          this.users.push(users[i]);
        }
      }
    },
      error => {
        console.log(error);
      });
  }

  initializeSearch() {
    this.items = this.users;
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
        if (item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return item;
        };
      });
    }
    return false;
  }

  //add user to the voting ballot
  public addUser(username) {
    this.showLoading();
    this.empAddBallot.addUserToBallot(username, this.ballotID).subscribe(user => {
      if (user == "0") {
        this.showText("User added to voting ballot successfully.");
      } else if (user == "1") {
        this.showText("User Already added to the Voting Ballot");
      }
      this.items = [];
      this.users = [];
      this.initializeItems();
    },
      error => {
        console.log(error);
      });
  }
  //remove user from voting ballot
  public removeUser(username) {
    this.showLoading();
    this.empAddBallot.removeUserFromBallot(username, this.ballotID).subscribe(user => {
      this.showText("User Removed successfully.");
      this.items = [];
      this.users = [];
      this.initializeItems();
    },
      error => {
        console.log(error);
      });
  }

  //loading 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  //alert
  showText(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}

interface user {
  votingballotID: any,
  username: string,
  firstname: string,
  lastname: string,
  organizationID: number
}