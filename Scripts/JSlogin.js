//Connessioni ai WebServices
var tipoDiConn = "prod";
if (tipoDiConn == "prod") {
    var urlGetAuthentication = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetAuthentication';
    var urlGetElencoMezzi = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetElencoMezzi';
    var urlGetElencoClienti = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetElencoClienti';
    var urlGetElencoDistributori = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetElencoDistributori';
    var urlGetElencoProdotti = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetElencoProdotti';
    var urlInsertProdotto = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/InsertProdotto';
    var urlGetProdottiInMagazzino = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInMagazzino';
    var urlStoricizzoProdottiInMagazzino = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInMagazzino';
    var urlSmaltiscoProdottoInMagazzino = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzino';    
    var urlQuantitaProdottiInMagazzino = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzino';
    var urlGetProdottiSuCamion = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInCamion';
    var urlStoricizzoProdTrasporto = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInTrasporto';
    var urlAggiornaQuantInTrasporto = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto';
    var urlGetSituazioneClienti = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneCliente';
    var urlAggiornaQuantitaProdottiVenduti = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti';
    var urlAggiornaQuantitaProdottiInMagazzinoResi = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResi';
    var urlStoricizzoStatoProdottiInDistributore = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore';
    var urlAggiornaQuantitaProdottoInCliente = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInCliente';
    var urlGetSituazioneDistributore = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneDistributore';
    var urlAggiornoQuantitaProdottiInDistributore = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributore';
    var urlStoricizzaStatoProdottoInCliente = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInCliente';
    var urlCaricaProdottiInMagazzino = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/CaricaProdottiInMagazzino';
    var urlGetVendutoCliente = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetVendutoCliente';
    var urlGetVendutoDirettamente = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetVendutoDirettamente';
    var urlGetVendutoDistributori = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetVendutoDistributori';
    var urlGetVendutoByIdProdotto = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetVendutoByIdProdotto';
    var urlGetVendutoByIdDistributore = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetVendutoByIdDistributore';
    var urlGetVendutoByIdCliente = 'http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetVendutoByIdCliente';
} else {
    var urlGetAuthentication = 'WebServiceAppDondi.asmx/GetAuthentication';
    var urlGetElencoMezzi = 'WebServiceAppDondi.asmx/GetElencoMezzi';
    var urlGetElencoClienti = 'WebServiceAppDondi.asmx/GetElencoClienti';
    var urlGetElencoDistributori = 'WebServiceAppDondi.asmx/GetElencoDistributori';
    var urlGetElencoProdotti = 'WebServiceAppDondi.asmx/GetElencoProdotti';
    var urlInsertProdotto = 'WebServiceAppDondi.asmx/InsertProdotto';
    var urlGetProdottiInMagazzino = 'WebServiceAppDondi.asmx/GetProdottiInMagazzino';
    var urlStoricizzoProdottiInMagazzino = 'WebServiceAppDondi.asmx/StoricizzoProdottoInMagazzino';
    var urlSmaltiscoProdottoInMagazzino = 'WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzino';
    var urlQuantitaProdottiInMagazzino = 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzino';
    var urlGetProdottiSuCamion = 'WebServiceAppDondi.asmx/GetProdottiInCamion';
    var urlStoricizzoProdTrasporto = 'WebServiceAppDondi.asmx/StoricizzoProdottoInTrasporto';
    var urlAggiornaQuantInTrasporto = 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto';
    var urlGetSituazioneClienti = 'WebServiceAppDondi.asmx/GetSituazioneCliente';
    var urlAggiornaQuantitaProdottiVenduti = 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti';
    var urlAggiornaQuantitaProdottiInMagazzinoResi = 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResi';
    var urlStoricizzoStatoProdottiInDistributore = 'WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore';
    var urlAggiornaQuantitaProdottoInCliente = 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInCliente';
    var urlGetSituazioneDistributore = 'WebServiceAppDondi.asmx/GetSituazioneDistributore';
    var urlAggiornoQuantitaProdottiInDistributore = 'WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributore';
    var urlStoricizzaStatoProdottoInCliente = 'WebServiceAppDondi.asmx/StoricizzoStatoProdottoInCliente';
    var urlCaricaProdottiInMagazzino = 'WebServiceAppDondi.asmx/CaricaProdottiInMagazzino';
    var urlGetVendutoCliente = 'WebServiceAppDondi.asmx/GetVendutoCliente';
    var urlGetVendutoDirettamente = 'WebServiceAppDondi.asmx/GetVendutoDirettamente';
    var urlGetVendutoDistributori = 'WebServiceAppDondi.asmx/GetVendutoDistributori';
    var urlGetVendutoByIdProdotto = 'WebServiceAppDondi.asmx/GetVendutoByIdProdotto';
    var urlGetVendutoByIdDistributore = 'WebServiceAppDondi.asmx/GetVendutoByIdDistributore';
    var urlGetVendutoByIdCliente = 'WebServiceAppDondi.asmx/GetVendutoByIdCliente';
}

$(function () {
    
    $(".leftPanel").load("Include/LeftPanel.html");
    //$(".menuNavigazione").load("Include/NavBar.htm");
    ElencoMezziPerDistributori();
    ElencoMezziPerClienti();
    ElencoMezziPerCaricareMerce();
    ElencoDistributori();
    ElencoClienti();        

    $("#btn-submit").click(function () {

        var email = $("#txt-email").val();
        var password = $("#txt-password").val();

        Autenticazione(email, password);

    });

    //$("#gestMagazzino").click(function () {
    //    ElencoProdottiInMagazzino();
    //});

    if ($('#chck-rememberme').is(':checked')) {
        // save username and password
        localStorage.usrname = $('#txt-email').val();
        localStorage.pass = $('#txt-password').val();
        localStorage.chkbx = $('#chck-rememberme').val();
    } else {
        localStorage.usrname = '';
        localStorage.pass = '';
        localStorage.chkbx = '';
        $('#txt-email').val('');
        $('#txt-password').val('');
    }

    $("#LogOut").click(function () {
        if ($('#chck-rememberme').is(':checked')) {
            // save username and password
            localStorage.usrname = $('#txt-email').val();
            localStorage.pass = $('#txt-password').val();
            localStorage.chkbx = $('#chck-rememberme').val();
        } else {
            localStorage.usrname = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
            $('#txt-email').val('');
            $('#txt-password').val('');
        }
    });

});

function isInt32(n) {
    return +n === n && !(n % 1) && n < 0x80000000 && n >= -0x80000000;
}

function isUint8(n) {
    return +n === n && !(n % 1) && n < 0x100 && n >= 0;
}

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

function parseJsonDate(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
    date = d.getDate() + 1;
    date = date < 10 ? "0" + date : date;
    mon = d.getMonth() + 1;
    mon = mon < 10 ? "0" + mon : mon;
    year = d.getFullYear();
    return (date + "/" + mon + "/" + year);
};

function parseJsonDateToJsDate(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0;
    if (parts[3] == undefined) parts[3] = 0;
    d = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
    date = d.getDate() + 1;
    date = date < 10 ? "0" + date : date;
    mon = d.getMonth() + 1;
    mon = mon < 10 ? "0" + mon : mon;
    year = d.getFullYear();
    return (year + "-" + mon + "-" + date);
};

function Autenticazione(user, password) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",            
        url: urlGetAuthentication,
        cache: false,                   
        async: true,       
        data: JSON.stringify({ user: user, password: password }),        
        error: function (data) {
            console.log(data.responseText)
            $("#authResult").html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            
            //console.log(risultati);                       
            if (risultati.ruolo != null) {
                if (risultati.ruolo == 'admin') {
                    $(".onlyAdmin").switchClass("onlyAdmin", "", 1000);                    
                }
                location.hash = "ElencoDistributori";
            } else {
                $("#authResult").html('User o Password Errati!!!');
            }

        }

    });

}

function ElencoMezziPerCaricareMerce() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoMezzi,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log('elenco mezzi');
            //console.log(risultati);

            var mezzi = '<li data-role="list-divider">Scegli il mezzo su cui caricare la merce:</li>'
            for (var i = 0; i < risultati.length; i++) {
                //mezzi = mezzi + '<li><a href="#formPerCaricareMerceSuCamion" class="caricaDaMagazzinoPerCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '">' + risultati[i].descrizione + '</a></li>';

                
                mezzi = mezzi + '<li><a href="#CaricoScaricoMagazzino" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '">' + risultati[i].descrizione + '</a></li>';
            }

            var tabellaMezzi = '<table id="tabellaMezzi" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Mezzo</th>' +                                                
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Mezzo</th>' +
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + '<tr>' +
                    '<td>' + risultati[i].descrizione + '</td>' +
                    '<td><a href="#formPerCaricareMerceSuCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaDaMagazzinoPerCamion">Carica</a></td>' +
                    '<td><a href="#formPerScaricareMerceDaCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active ScaricaDaCamionInMagazzino">Scarica</a></td>' +
                    '</tr>';
            }

            tabellaMezzi = tabellaMezzi + righe + '</tbody> </table>';


            $("#tabellaMezziCaricoScarico").html(tabellaMezzi);

            var table = $('#tabellaMezzi').DataTable(
               { "paging": false }
           );


            $(".caricaDaMagazzinoPerCamion").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                //var IdCliente = $(this).attr('data-IdCliente');
                //var descCliente = $(this).attr('data-descCliente');
                //$("#titoloProdottiInCamionPerCliente").html('Elenco prodotti su:' + descMezzo);
                $(".h1DettCamion").html('Carica per:' + descMezzo);
               
                //alert(idMezzo);
                //return;
                ElencoProdottiInMagazzinoPerMezzo(idMezzo, 'carica');

                //ElencoProdottiSuCamionPerCliente(idMezzo, IdCliente);
            });

            $(".ScaricaDaCamionInMagazzino").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                //var IdCliente = $(this).attr('data-IdCliente');
                //var descCliente = $(this).attr('data-descCliente');
                //$("#titoloProdottiInCamionPerCliente").html('Elenco prodotti su:' + descMezzo);
                $(".h1DettCamionScarica").html('Scarica merce da:<br>' + descMezzo);

                //alert(idMezzo);
                //return;
                ElencoProdottiInMagazzinoPerMezzo(idMezzo, 'scarica');

                //ElencoProdottiSuCamionPerCliente(idMezzo, IdCliente);
            });

            //console.log(risultati);

        }

    });
}

function ElencoMezziPerClienti() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlGetElencoMezzi,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log('elenco mezzi');
            //console.log(risultati);
            $(".mezziDisponibiliPerCliente").html('');
            var mezzi = '<li data-role="list-divider">Scegli un mezzo da cui caricare la merce:</li>'
            for (var i = 0; i < risultati.length; i++) {
                mezzi = mezzi + '<li><a href="#formProdottiInCamionPerCliente" class="caricaDaCamionPerCliente" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '">Carica da: ' + risultati[i].descrizione + '</a></li>';
            }
            $(".mezziDisponibiliPerCliente").html(mezzi);

            $(".caricaDaCamionPerCliente").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                var IdCliente = $(this).attr('data-IdCliente');
                var descCliente = $(this).attr('data-descCliente');
                $("#titoloProdottiInCamionPerCliente").html('Elenco prodotti su:' + descMezzo);
                $(".descCliente").html('Carica per:' + descCliente);
                var desc = '\'' + descCliente + '\'';
                var linkBack = 'javascript:GetSituazioneCliente(' + IdCliente + ', ' + desc + ');'
                $(".backCliente").attr("href", linkBack);

                ElencoProdottiSuCamionPerCliente(idMezzo, IdCliente);
            });

            //console.log(risultati);

        }

    });
}

function ElencoMezziPerDistributori() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlGetElencoMezzi,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //console.log('elenco mezzi');
            //console.log(risultati);

            var mezzi = '<li data-role="list-divider">Scegli un mezzo da cui caricare la merce:</li>';
            for (var i = 0; i < risultati.length; i++) {
                mezzi = mezzi + '<li><a href="#formProdottiInCamionPerDistributore" class="caricaDaCamion" data-idMezzo="' + risultati[i].idMezzo + '" data-descMezzo="' + risultati[i].descrizione + '">Carica da: ' + risultati[i].descrizione + '</a></li>';
            }
            $(".mezziDisponibiliPerDistributore").html(mezzi);

            $(".caricaDaCamion").on('click', function () {

                var idMezzo = $(this).attr('data-idMezzo');
                var descMezzo = $(this).attr('data-descMezzo');
                var idDistributore = $(this).attr('data-IdDistributore');
                var descDistributore = $(this).attr('data-descDistributore');
                $("#titoloProdottiInCamionPerDistributore").html('Elenco prodotti su:' + descMezzo);
                $(".descDistributore").html('Carica per:' + descDistributore);
                var desc = '\'' + descDistributore + '\'';
                var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
                $(".backDistributore").attr("href", linkBack);

                ElencoProdottiSuCamionPerDistributore(idMezzo, idDistributore);
            });

            //console.log(risultati);

        }

    });
}

function ElencoClienti() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        url: urlGetElencoClienti,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            var clienti = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il Cliente..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < risultati.length; i++) {

                var desc = '\'' + risultati[i].descrizione + '\'';
                clienti = clienti + '<li><a href="javascript:GetSituazioneCliente(' + risultati[i].idCliente + ', ' + desc + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r" >' + risultati[i].descrizione + '</a></li>';
                //$("#" + risultati[i]).show();
            }
            clienti = clienti + '</ul>';

            $("#tuttiClienti").html(clienti);

            //console.log(clienti);

            //$(".caricaDaCamion").on('click', function () {

            //    var idCliente = $(this).attr('data-idCliente');
            //    var descCliente = $(this).attr('data-descCliente');
            //    var idDistributore = $(this).attr('data-IdDistributore');
            //    var descDistributore = $(this).attr('data-descDistributore');
            //    $("#titoloProdottiInCamion").html('Elenco prodotti su:' + descMezzo);
            //    $(".descDistributore").html('Carica per:' + descDistributore);
            //    var desc = '\'' + descDistributore + '\'';
            //    var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
            //    $(".backDistributore").attr("href", linkBack);

            //    ElencoProdottiSuCamion(idCliente, idDistributore);
            //});

            //console.log(risultati);

        }

    });
}

// Storicizzo Prodotti in magazzino ************************************************
function storicizzaProdottoInMagazzino(IdMagazzino, idOperatore) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInMagazzino",        
        url: urlStoricizzoProdottiInMagazzino,
        cache: false,

        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdMagazzino: IdMagazzino, IdOperatore: idOperatore }),

        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);

        }

    });
   
}
// *********************************************************************************

// Aggiorno quantita Prodotti rimasti in magazzino *********************************
function AggiornaQuantitaProdottiInMagazzino(idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzino",
        url: urlQuantitaProdottiInMagazzino,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);

        }

    });
}
// *********************************************************************************

//Inserisco la quantita di Prodotti Venduti
function AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, DataDDT) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti",
        url: urlAggiornaQuantitaProdottiVenduti,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore: idDistributore, idCliente: idCliente, quantita: quantitaVenduti, prezzoTotale: prezzoTotaleVenduti, idOperatore: idOperatore, VenditaDiretta: VenditaDiretta, numeroDDT: numeroDDT, DataDDT: DataDDT }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);

        }

    });
}
//****************************************************************** 
        