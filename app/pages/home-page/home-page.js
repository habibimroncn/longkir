import {Component, Injectable} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})

export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(_navController, _http, _fb) {
    this._navController = _navController;
  }

}