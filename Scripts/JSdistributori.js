$(function () {

   //ElencoDistributori();
    //$(".gotoDettDistributore").on('click', function () {

    //    var idDistributore = $(this).data('id');

        
        
    //});
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

function ElencoDistributori() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetElencoDistributori",
        //url: "WS_OrdinanzeApp.asmx/Hello",
        //url: "WebServiceAppDondi.asmx/GetElencoDistributori",
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({  }),
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
            

var distributori = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true">';

for (var i = 0; i < risultati.length; i++) {
    $(".h1DettDistributore").html('Dettaglio Distributore: ' + risultati[i].descrizione);
                distributori = distributori + '<li><a href="javascript:GetSituazioneDistributore(' + risultati[i].idDistributore + ');" >' + risultati[i].descrizione + ' - ' + risultati[i].indirizzo + '</a></li>';
                //$("#" + risultati[i]).show();
            }
            distributori = distributori + '</ul>';

            //if (risultati == "autenticato") {
            //    location.hash = "ElencoDistributori";
            //} else {
            //    $("#authResult").html('User o Password Errati!!!');
            //}

            $("#tuttiDistributori").html(distributori);

        }

    });

}




        