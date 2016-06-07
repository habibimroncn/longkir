angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPlatform, $location, $ionicHistory, $ionicPopup) {
    $ionicPlatform.registerBackButtonAction(function() {
        // A confirm exit dialog
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Keluar Aplikasi',
                template: 'Apakah kamu ingin keluar :( ?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    ionic.Platform.exitApp();
                } else {
                    console.log('You are not sure');
                }
            });
        };

        if ($location.path() === "/tab/dash" || $location.path() === "#/tab/dash") {
            $scope.showConfirm();
        } else {
            $ionicHistory.goBack();
        }
    }, 501);
})

.controller('OngkirCtrl', function($scope, $ionicModal, $ionicPopup, $ionicGesture, $ionicLoading, Ongkir) {

    $scope.semua_propinsi = [];
    $scope.semua_kota = [];

    $scope.semua_propinsi1 = [];
    $scope.semua_kota1 = [];

    var propinsi = Ongkir.ambil_semua_propinsi();
    var kota = Ongkir.ambil_semua_kota();

    var propinsi1 = Ongkir.ambil_semua_propinsi();
    var kota1 = Ongkir.ambil_semua_kota();


    propinsi.then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.semua_propinsi.push({
                propinsi_id: data[i].province_id,
                nama_propinsi: data[i].province
            })
        }
    });

    propinsi1.then(function(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.semua_propinsi1.push({
                propinsi_id: data[i].province_id,
                nama_propinsi: data[i].province
            })
        }
    });
    // Display Propinsi dan Kota Asal
    $scope.showSelectValueProvince = function(idpropinsi) {

        jQuery('#displayKota').css('display', 'none');
        $scope.semua_kota = [];
        kota.then(function(data) {
            for (var j = 0; j < data.length; j++) {
                if (idpropinsi === data[j].province_id) {
                    $scope.semua_kota.push({
                        kota_id: data[j].city_id,
                        nama_kota: data[j].city_name,
                        propinsi_id_kota: data[j].province_id,
                        type_kota: data[j].type
                    })
                }
            }
            jQuery('#displayKota').css('display', 'block');
        });

        $scope.showSelectValueCity = function(idkota) {
            return idkota;
        };
    };
    // Display Propinsi dan Kota Tujuan
    $scope.showSelectValueProvince1 = function(idpropinsi1) {

        jQuery('#displayKota1').css('display', 'none');
        $scope.semua_kota1 = [];
        kota1.then(function(data) {
            for (var j = 0; j < data.length; j++) {
                if (idpropinsi1 === data[j].province_id) {
                    $scope.semua_kota1.push({
                        kota_id: data[j].city_id,
                        nama_kota: data[j].city_name,
                        propinsi_id_kota: data[j].province_id,
                        type_kota: data[j].type
                    })
                }
            }
            jQuery('#displayKota1').css('display', 'block');

        });

        $scope.showSelectValueCity1 = function(idkota1) {
            return idkota1;
        };
    };
    // Get Berat Kiriman
    $scope.showBerat = function(berat) {

    };
    // Kurir jne, pos, tiki
    $scope.kurirList = [{
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
    }];

    $scope.showChooseCourier = function(kurir) {

    };
    $scope.dataongkir = [];
    $scope.createModal = function() {
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
    };

    $scope.closedModal = function() {
        $scope.dataongkir = [];
        $scope.modal.hide();
        $scope.modal.remove();
    };

    $scope.addItem = function(params) {
        $scope.createModal();
        var day = '';
        $scope.ongkirbos = Ongkir.ambil_biaya_ongkir(params.idkota, params.idkota1, params.berat, params.kurir);
        $scope.ongkirbos.then(function(data) {
            for (var o = 0; o < data.length; o++) {
                for (var p = 0; p < data[o].costs.length; p++) {
                    for (var q = 0; q < data[o].costs[p].cost.length; q++) {
                        // jne 
                        if (data[o].code === "jne") {
                            if (data[o].costs[p].cost[q].etd !== "") {
                                day = data[o].costs[p].cost[q].etd + " hari";
                            } else {
                                day = "-";
                            }
                            $scope.dataongkir.push({
                                namaKurir: data[o].name,
                                codeKurir: data[o].code,
                                namaLayanan: data[o].costs[p].service,
                                deskripsiLayanan: data[o].costs[p].description,
                                estimasiPengiriman: day,
                                biayaOngkir: parseInt(data[o].costs[p].cost[q].value),
                                catatan: data[o].costs[p].cost[q].note,
                                logoKurir: "img/jne.jpg",
                                length: data[o].costs.length
                            });
                            $scope.modal.show();
                        } // end jne

                        // tiki
                        else if (data[o].code === "tiki") {
                            if (data[o].costs[p].cost[q].etd !== "") {
                                day = data[o].costs[p].cost[q].etd + " hari";
                            } else {
                                day = "-";
                            }
                            $scope.dataongkir.push({
                                namaKurir: data[o].name,
                                codeKurir: data[o].code,
                                namaLayanan: data[o].costs[p].service,
                                deskripsiLayanan: data[o].costs[p].description,
                                estimasiPengiriman: day,
                                biayaOngkir: parseInt(data[o].costs[p].cost[q].value),
                                catatan: data[o].costs[p].cost[q].note,
                                logoKurir: "img/tiki.png",
                                length: data[o].costs.length
                            });
                            $scope.modal.show();
                        } // end tiki

                        // pos
                        else if (data[o].code === "pos") {
                            if (data[o].costs[p].cost[q].etd !== "") {
                                day = data[o].costs[p].cost[q].etd + " hari";
                            } else {
                                day = "-";
                            }
                            $scope.dataongkir.push({
                                namaKurir: data[o].name,
                                codeKurir: data[o].code,
                                namaLayanan: data[o].costs[p].service,
                                deskripsiLayanan: data[o].costs[p].description,
                                estimasiPengiriman: day,
                                biayaOngkir: parseInt(data[o].costs[p].cost[q].value),
                                catatan: data[o].costs[p].cost[q].note,
                                logoKurir: "img/pos.png",
                                length: data[o].costs.length
                            });
                            $scope.modal.show();
                        } // end pos    
                    } // end for #3
                } // end for #2
            } // end for #1
        })
    }
})

.controller('AboutCtrl', function($scope) {});