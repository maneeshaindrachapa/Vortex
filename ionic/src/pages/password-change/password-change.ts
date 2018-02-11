import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ForgetPasswordProvider} from '../../providers/forget-password/forget-password';


@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {
  code:number;
  constructor(public nav: NavController, public navParams: NavParams, private fp:ForgetPasswordProvider) {
  }


}
