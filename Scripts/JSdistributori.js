$(function () {
   
});

function ElencoDistributori() {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetElencoDistributori",        
        url: urlGetElencoDistributori,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({  }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText);
            $("#tuttiDistributori").html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;
            //console.log('Caricati!');
            // console.log(Ordinanze);
            //console.log(risultati);
            //$(".menuPrincipale").hide();
            

            var distributori = '<ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < risultati.length; i++) {
                var indirizzo = risultati[i].indirizzo;
                var desc = '\'' + risultati[i].descrizione + '\'';
                distributori = distributori + '<li><a href="javascript:GetSituazioneDistributore(' + risultati[i].idDistributore + ', ' + desc + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
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





        