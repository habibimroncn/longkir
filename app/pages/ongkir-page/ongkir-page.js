import {Component, Injectable} from '@angular/core';
import {ngForm, FormBuilder, Validators} from '@angular/common';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Alert, Modal, NavParams, ViewController, NavController} from 'ionic-angular';
import {ModalResults} from '../modal-results/modal-results';

@Component({
  templateUrl: 'build/pages/ongkir-page/ongkir-page.html'
})
// @Injectable()
export class OngkirPage {
  static get parameters() {
    return [[NavController],[Http],[FormBuilder],[NavParams]];
  }

  constructor(_navController, _http, _fb) {
    this._navController = _navController;
    this._http = _http;
    this._fb = _fb;
    this.api_key = "xxxxxxxxxxxxxxxxxxxxxx"; 
    this.hostname = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    this.dataOngkirku = this._fb.group({
      propinsi: ["", Validators.required],
      kota: ["", Validators.required],
      propinsiTujuan: ["", Validators.required],
      kotaTujuan: ["", Validators.required],
      beratKiriman: ["", Validators.required],
      kurir: ["", Validators.required]
    })
  }

onSubmit(event){
  event.preventDefault();
  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  let get_ongkir_url = this.hostname + "/cost/";
  let datas = $.param({
                key: this.api_key,
                origin: this.dataOngkirku.value.kota,
                destination: this.dataOngkirku.value.kotaTujuan,
                weight: parseInt(this.dataOngkirku.value.beratKiriman),
                courier: this.dataOngkirku.value.kurir
            });
  this._http.post(get_ongkir_url, datas, options).subscribe(res => {
    this.data_all = res.json();
    this.data_ongkir = this.data_all.rajaongkir;
    let modal = Modal.create(ModalResults, this.data_ongkir);
    this._navController.present(modal);
  })
    

}

onChange(GetValue){
   // Ambil semua data kota
  let get_kota = "/city?key=" + this.api_key +"&province=" + GetValue;
  let get_kota_url = this.hostname + get_kota;
  this._http.get(get_kota_url).subscribe(res => {
      this.data_kota = res.json();
      this._swk = [];
      this._swk = this.data_kota.rajaongkir.results;
      this._isSelectedPropinsiAsal = false;
  });
}

onChangeKota(GetValueKota){
    // Ambil semua data propinsi
  let get_propinsi = "/province?key=" + this.api_key;
  let get_propinsi_url = this.hostname + get_propinsi;

  this._http.get(get_propinsi_url).subscribe(res => {
      this.data = res.json();
      this._swt = this.data.rajaongkir.results;
      this._isSelectedKotaAsal = false;
  });
}

onChangeTujuan(GetValue){
   // Ambil semua data kota
  let get_kota = "/city?key=" + this.api_key +"&province=" + GetValue;
  let get_kota_url = this.hostname + get_kota;
  this._http.get(get_kota_url).subscribe(res => {
      this.data_kota = res.json();
      this._swkt = [];
      this._swkt = this.data_kota.rajaongkir.results;
      this._isSelectedPropinsiTujuan = false;

  });
}

onChangeKotaTujuan(GetValueKota){
  // Kurir jne, pos, tiki
  this.kurirList = [{
        text: "JNE",
        value: "jne",
        checked: false
    }, {
        text: "POS",
        value: "pos",
        checked: false
    }, {
        text: "TIKI",
        value: "tiki",
        checked: false
    }]
  this._isSelectedKotaTujuan = false;
}

onChangebK(getBerat){
this._isInputBerat = false;
}

onKurirChange(getKurir){
    this._selectedKurir = false;
}


ionViewLoaded(){
    // Ambil semua data propinsi
  let get_propinsi = "/province?key=" + this.api_key;
  let get_propinsi_url = this.hostname + get_propinsi;
  this._isDisable = true;
  this._isSelectedPropinsiAsal = true;
  this._isSelectedKotaAsal = true;
  this._isSelectedPropinsiTujuan = true;
  this._isSelectedKotaTujuan = true;
  this._selectedKurir = true;
  this._isInputBerat = true;
  this._http.get(get_propinsi_url).subscribe(res => {
      this.data = res.json();
      this._sw = this.data.rajaongkir.results;
      this._isDisable = false;
  });
}

}