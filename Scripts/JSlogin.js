$(function () {

    $("#btn-submit").click(function () {

        var email = $("#txt-email").val();
        var password = $("#txt-password").val();

        Autenticazione(email, password);

    });

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
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetAuthentication",
        //url: "WS_OrdinanzeApp.asmx/Hello",
        //url: "WebServiceAppDondi.asmx/GetAuthentication",
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ user: user, password: password }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;
            //console.log('Caricati!');
            // console.log(Ordinanze);
            console.log(risultati);
            //$(".menuPrincipale").hide();
            //for (var i = 0; i < risultati.length; i++) {
            //    $("#" + risultati[i]).show();
            //}

            if (risultati == "autenticato") {
                ElencoDistributori();
                location.hash = "ElencoDistributori";
            } else {
                $("#authResult").html('User o Password Errati!!!');
            }


        }

    });

}


        