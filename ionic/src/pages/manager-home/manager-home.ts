import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { MenuController } from 'ionic-angular';
import { EmployeeAddBallotProvider } from '../../providers/employee-add-ballot/employee-add-ballot';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

@IonicPage()
@Component({
  selector: 'page-manager-home',
  templateUrl: 'manager-home.html',
})
export class ManagerHomePage {
  username = '';
  currentDate = new Date();
  ballots: VotingBallots[] = [];
  items: VotingBallots[] = [];

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public menuCtrl: MenuController, private EmpAddBallot: EmployeeAddBallotProvider,private ballotSer:BallotServiceProvider,private alertCtrl: AlertController) {
    this.initializeItems();
  }

  //initialize items
  initializeItems() {
    this.auth.getVotingBallots().subscribe(ballots => {
      for (let i in ballots) {
        let tempStartDate = new Date(ballots[i].startDate + 'T' + ballots[i].startTime);//assiginng temporary data to compare dates
        let tempEndDate = new Date(ballots[i].endDate + 'T' + ballots[i].endTime);
        if (tempStartDate < this.currentDate && this.currentDate < tempEndDate) {
          ballots[i].addEmployees = true;
          ballots[i].viewResults = false;
        } else {
          ballots[i].addEmployees = false;
          ballots[i].viewResults = true;
        }
        this.items.push(ballots[i]);
        this.ballots.push(ballots[i]);
      }
    },
      error => {
        console.log(error);
      });
  }

  initializeSearch() {
    this.items = this.ballots;
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
        if (item.votingballotName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          console.log(this.items);
          return item;
        };
      });
    }
    return false;
  }

  //refresh Page
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.items = [];
    this.ballots=[]; //making all the items null then runst the async operation to get new items
    this.initializeItems();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  //user logout
  logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
  //menu open
  openMenu() {
    this.menuCtrl.open();
  }
  //when add employee button click
  addEmployee(votingballotID, organizationID) {
    this.EmpAddBallot.setballotID(votingballotID);
    this.EmpAddBallot.setOrganizationID(organizationID);
    console.log(votingballotID);
    this.nav.push("AddEmployeesPage");
  }

  viewResults(votingballotid){
    this.ballotSer.setvotingballotid(votingballotid);
    this.nav.push("ResultsPage");
  }

  remove(votingballotid){
    let alert = this.alertCtrl.create({
      title: 'Delete Voting Ballot',
      message: 'Do you want to delete this ballot and all the votings related to this ballot?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.ballotSer.removeBallot(votingballotid).subscribe(requests => {
              this.items=[];
              this.ballots=[];
              this.initializeItems();
             },
               error => {
                console.log(error);
             });
          }
        }
      ]
    });
    alert.present();
  }
}

interface VotingBallots {
  votingballotID: number,
  votingballotName: string,
  votingballotDescription: string,
  organizationID: string;
  startDate: Date,
  startTime: DateTime,
  endDate: Date,
  endTime: DateTime,
  image: string,
  viewResults:boolean,
  addEmployees:boolean
}