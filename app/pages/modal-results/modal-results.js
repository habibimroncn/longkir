import {Component} from '@angular/core';
import {Modal, NavController, ViewController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/modal-results/modal-results.html'
})
export class ModalResults {
  static get parameters() {
    return [[NavController],[ViewController],[NavParams]];
  }
  constructor(_navController, _viewController, _navParams) {
    this._navController = _navController;
    this._viewController = _viewController;
    this._navParams = _navParams;
  }

  close() {
    this._viewController.dismiss();
  }
  ionViewLoaded(){
    let dtl = this._navParams.get('results');
    let day = "-"
    this.ongkir = [];
    for (var i = 0; i < dtl.length; i++) {
      for (var j = 0; j < dtl[i].costs.length; j++) {
        for (var k = 0; k < dtl[i].costs[j].cost.length; k++) {
            if (dtl[i].code === "jne") {
              if (dtl[i].costs[j].cost[k].etd !== "") {
                  day = dtl[i].costs[j].cost[k].etd + " hari";
              }
              this.ongkir.push({
                  namaKurir: dtl[i].name,
                  codeKurir: dtl[i].code,
                  namaLayanan: dtl[i].costs[j].service,
                  deskripsiLayanan: dtl[i].costs[j].description,
                  estimasiPengiriman: day,
                  biayaOngkir: parseInt(dtl[i].costs[j].cost[k].value),
                  catatan: dtl[i].costs[j].cost[k].note,
                  logoKurir: "img/jne.jpg",
                  length: dtl[i].costs.length
              })
            }
            else if (dtl[i].code === "tiki"){
              if (dtl[i].costs[j].cost[k].etd !== "") {
                  day = dtl[i].costs[j].cost[k].etd + " hari";
              }
               this.ongkir.push({
                  namaKurir: dtl[i].name,
                  codeKurir: dtl[i].code,
                  namaLayanan: dtl[i].costs[j].service,
                  deskripsiLayanan: dtl[i].costs[j].description,
                  estimasiPengiriman: day,
                  biayaOngkir: parseInt(dtl[i].costs[j].cost[k].value),
                  catatan: dtl[i].costs[j].cost[k].note,
                  logoKurir: "img/tiki.png",
                  length: dtl[i].costs.length
              })
            }
            else if (dtl[i].code === "pos"){
              if (dtl[i].costs[j].cost[k].etd !== "") {
                  day = dtl[i].costs[j].cost[k].etd + " hari";
              }
               this.ongkir.push({
                  namaKurir: dtl[i].name,
                  codeKurir: dtl[i].code,
                  namaLayanan: dtl[i].costs[j].service,
                  deskripsiLayanan: dtl[i].costs[j].description,
                  estimasiPengiriman: day,
                  biayaOngkir: parseInt(dtl[i].costs[j].cost[k].value),
                  catatan: dtl[i].costs[j].cost[k].note,
                  logoKurir: "img/pos.png",
                  length: dtl[i].costs.length
              })
            }
        }
      }
    }
  }
}