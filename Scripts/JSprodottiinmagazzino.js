$(function () {
    $(".caricaDaMagazzino").on('click', function () {
        var idDistributore = $(this).attr('data-IdDistributore');
        var descDistributore = $(this).attr('data-descDistributore');
        $(".descDistributore").html('Carica per:' + descDistributore);
        var desc = '\'' + descDistributore + '\'';
        var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
        $("#backDistributore").attr("href", linkBack);

        ElencoProdottiInMagazzino(idDistributore);
    });
});

function ElencoProdottiInMagazzino(idDistributore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInMagazzino",
        //url: "WS_OrdinanzeApp.asmx/Hello",
        //url: "WebServiceAppDondi.asmx/GetProdottiInMagazzino",
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
            
            var dettaglio = '<table id="tabellaProdottiInMagazzino" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Lotto</th>' +
                                                '<th>Quantita</th>' +
                                                '<th>Carica</th>' +                                                
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Lotto</th>' +
                                                '<th>Quantita</th>' +
                                                '<th>Carica</th>' +                                                
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            
            for (var i = 0; i < risultati.length; i++) {
                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].numeroLotto) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';                
                dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput"> <a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInDistributore">Carica</a> </td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            $('#elencoProdottiInMagazzino').html(dettaglio);

            var table = $('#tabellaProdottiInMagazzino').DataTable(
                { "paging": false }
            );

            $(".caricaProdInDistributore").on('click', function () {

                var IdMagazzino = $(this).attr('data-IdMagazzino');                
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaAttuale = $(this).closest('td').prev('td').text();
                var quantitaCaricati = $(this).prev().val();
                var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));

                //javascript: SalvaRimasti(' + risultati[i].IdSituazioneDistributore + ', ' + risultati[i].IdDistributore + ', ' + risultati[i].idProdotto + ', ' + $(".rimasto").prev().val() + ', ' + prezzoTotale + ', ' + risultati[i].IdOperatore + ', ' + risultati[i].numeroLotto + ');
                //alert('IdMagazzino=' + IdMagazzino + ' idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' prezzo=' + prezzo + ' quantitaCaricati=' + quantitaCaricati + ' quantitaRimasti=' + quantitaRimasti + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                //console.log(' quantita=' + quantita);

                CaricaProdottiInDistributore(IdMagazzino, idDistributore, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto);

                var labelQuantita = $(this).closest('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                labelQuantita.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);
                labelQuantita.html(quantitaRimasti);
            });

        }

    });

}

function CaricaProdottiInDistributore(IdMagazzino, idDistributore, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto) {

    // Storicizzo Prodotti in magazzino ************************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInMagazzino",        
        //url: "WebServiceAppDondi.asmx/StoricizzoProdottoInMagazzino",
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
    // *********************************************************************************

    // Aggiorno quantita Prodotti rimasti in magazzino *********************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzino",
        //url: "WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzino",
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
    // *********************************************************************************

    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto);
}




        