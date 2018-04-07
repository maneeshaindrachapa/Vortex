import { ViewChild, Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Chart } from 'chart.js';
import { BallotServiceProvider } from '../../providers/ballot-service/ballot-service';

@IonicPage()
@Component({
    selector: 'page-results',
    templateUrl: 'results.html',
})
export class ResultsPage {
    votingBallotID: Number;

    //variables for charts
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('pieCanvas') pieCanvas;
    barChart: any;
    doughnutChart: any;
    pieChart: any;

    //results data set
    options: votingOption[] = [];
    results = [];
    backgroundColor = ['rgba(199, 0, 57, 0.4)', 'rgba(26, 82, 118, 0.4)', 'rgba(241, 196, 15 , 0.4)', 'rgba(29, 131, 72, 0.4)', 'rgba(81, 90, 90, 0.4)', 'rgba(125, 60, 152  , 0.4)'];
    borderColor = ['rgba(199, 0, 57,1)', 'rgba(26, 82, 118, 1)', 'rgba(241, 196, 15, 1)', 'rgba(29, 131, 72, 1)', 'rgba(81, 90, 90, 1)', 'rgba(125, 60, 152  , 1)'];
    hoverBackgroundColor = ["#C70039", "#1A5276", "#F1C40F", "#1D8348", "#515A5A  ", "#7D3C98"];
    constructor(public nav: NavController, private ballotSer: BallotServiceProvider) {
        this.votingBallotID = this.ballotSer.getvotingballotid();//get voting ballot ID
        this.getOptions(); //get the options of the ballot

    }

    getOptions() {
        this.ballotSer.getvotingOptions(this.votingBallotID).subscribe(Option => {
            for (let i in Option) {
                this.options.push(Option[i]);
            }
            this.getResults(this.options); //get the results of the ballot
        },
            error => {
                //error
            });
    }

    getResults(options) {
        this.ballotSer.getResults(this.votingBallotID, options).subscribe(results => {
            let label = []; //temp variables
            let backgroundColorArray = [];
            let borderColorArray = [];
            let hoverBackgroundColorArray = [];
            for (let i = 0; i < results.length; i++) {
                this.results.push(results[i]);
                label.push(options[i].votingoptionName);
                backgroundColorArray.push(this.backgroundColor[i]);
                borderColorArray.push(this.borderColor[i]);
                hoverBackgroundColorArray.push(this.hoverBackgroundColor[i]);
            }
            this.barChart = new Chart(this.barCanvas.nativeElement, { //bar chart
                type: 'bar',
                data: {
                    labels: label,
                    datasets: [{
                        label: '# of Votes',
                        data: this.results,
                        backgroundColor: backgroundColorArray,
                        borderColor: borderColorArray,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, { //doughnut chart
                type: 'doughnut',
                data: {
                    labels: label,
                    datasets: [{
                        label: '# of Votes',
                        data: this.results,
                        backgroundColor: backgroundColorArray,
                        hoverBackgroundColor: hoverBackgroundColorArray
                    }]
                }
            });
            this.pieChart=new Chart(this.pieCanvas.nativeElement,{ //pie chart
                type: 'pie',
                data: {
                labels: label,
                datasets: [{
                    label: "# of Votes",
                    backgroundColor: backgroundColorArray,
                    data: this.results
                }]
                }
            });
        },(error=>{
            console.log(error);
        }));
    }
}

interface votingOption {
    votingballotID: Number,
    votingoptionID: Number,
    votingoptionName: string
}