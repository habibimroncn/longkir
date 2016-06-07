angular.module('starter.services', [])

.factory('Ongkir', function($http, $ionicLoading) {

    var api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // your api key
    // tipe akun yang saya gunakan ialah starter jadi ongkir yang saya gunakan hanya JNE,TIKI, dan POS.
    var hostname = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // bisa dirubah sesuai tipe akun ex. http://api.rajaongkir.com/starter

    // Ambil semua data propinsi
    var get_propinsi = "/province?key=" + api_key;
    var get_propinsi_url = hostname + get_propinsi;

    // Ambil semua data kota
    var get_kota = "/city?key=" + api_key;
    var get_kota_url = hostname + get_kota;

    // Ambil data ongkir
    var get_ongkir_url = hostname + "/cost/";

    $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Mengambil Data!',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var p = $http.get(get_propinsi_url).then(successGetPropinsi);

    function successGetPropinsi(res) {
        $ionicLoading.hide();
        return res.data.rajaongkir.results;
    }

    var c = $http.get(get_kota_url).then(successGetKota);

    function successGetKota(res) {
        return res.data.rajaongkir.results;
    }

    return {
        ambil_semua_propinsi: function() {
            return p;
        },
        ambil_semua_kota: function() {
            return c;
        },
        ambil_biaya_ongkir: function(idkota, idkota1, berat, kurir) {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Mengambil Data!',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var datas = $.param({
                key: api_key,
                origin: idkota,
                destination: idkota1,
                weight: parseInt(berat),
                courier: kurir
            });

            var d = $http({
                method: 'POST',
                url: get_ongkir_url,
                data: datas,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(result) {
                $ionicLoading.hide();
                return result.data.rajaongkir.results;
            }, function(error) {
                alert(error.statusText);
            });
            return d;
        }
    };

});