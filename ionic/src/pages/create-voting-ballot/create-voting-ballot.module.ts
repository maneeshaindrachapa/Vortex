import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateVotingBallotPage } from './create-voting-ballot';

@NgModule({
  declarations: [
    CreateVotingBallotPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateVotingBallotPage),
  ],
})
export class CreateVotingBallotPageModule {}
