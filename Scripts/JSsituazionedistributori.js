$(function () {

   //ElencoDistributori();

});


function GetSituazioneDistributore(IdDistributore) {
    location.hash = "formDettaglioDistributore";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneDistributore",
        //url: "WS_OrdinanzeApp.asmx/Hello",
        //url: "WebServiceAppDondi.asmx/GetSituazioneDistributore",
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: IdDistributore }),
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
            

            var dettaglio = '<table id="tabellaDettaglioDistributore" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +                                                
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +
                                                '<th>Resi</th>' +
                                                '<th>Rimasti</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +                                              
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +
                                                '<th>Resi</th>' +
                                                '<th>Rimasti</th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';

            for (var i = 0; i < risultati.length; i++) {
                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);
                dettaglio = dettaglio + '<tr>';                
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';
                dettaglio = dettaglio + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                dettaglio = dettaglio + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                dettaglio = dettaglio + '</tr>';
              
            }
            dettaglio = dettaglio + '</tbody> </table>';

            $('.DettaglioDistributore').html(dettaglio);           
            
            var table = $('#tabellaDettaglioDistributore').DataTable(
                { "paging": false }
            );

            $(".rimasti").on('click', function () {

                var IdSituazioneDistributore = $(this).attr('data-IdSituazioneDistributore');
                var idDistributore = $(this).attr('data-IdDistributore');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantita = $(this).prev().val();
                var prezzoTotale = (prezzo * quantita);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));

                //javascript: SalvaRimasti(' + risultati[i].IdSituazioneDistributore + ', ' + risultati[i].IdDistributore + ', ' + risultati[i].idProdotto + ', ' + $(".rimasto").prev().val() + ', ' + prezzoTotale + ', ' + risultati[i].IdOperatore + ', ' + risultati[i].numeroLotto + ');
                //alert('IdSituazioneDistributore=' + IdSituazioneDistributore + ' idProdotto=' + idProdotto + ' prezzo=' + prezzo + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                //console.log(' quantita=' + quantita);

                SalvaRimasti(IdSituazioneDistributore, idDistributore, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto);

                var labelQuantita = $(this).closest('td').prev('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                labelQuantita.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);
                labelQuantita.html(quantita);
            });

            $(".resi").on('click', function () {

                var IdSituazioneDistributore = $(this).attr('data-IdSituazioneDistributore');
                var idDistributore = $(this).attr('data-IdDistributore');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaResi = $(this).prev().val();
                var quantitaDist = $(this).closest('td').prev('td').text();
                var prezzoTotale = (prezzo * quantitaResi);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));               
                var quantitaRimasta = (quantitaDist - quantitaResi);

                SalvaResi(IdSituazioneDistributore, idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto);

                var labelQuantita = $(this).closest('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                labelQuantita.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);
                
                labelQuantita.html(quantitaRimasta);
            });
            

        }

    });

}

function SalvaRimasti(idSituazioneDistributore, idDistributore, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto) {

    StoricizzoStatoProdottoInDistributore(idSituazioneDistributore);

    //Inserisco la quantita aggiornata di prodotto nel Distributore
    //console.log('idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
    InsertProdottiInDistributore(idDistributore, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto);
        
}

function SalvaResi(idSituazioneDistributore, idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto) {

    StoricizzoStatoProdottoInDistributore(idSituazioneDistributore);
    
    alert(' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta);

    //Inserisco la quantita di Resi nel Magazzino Resi
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResi",        
        //url: "WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResi",
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore: idDistributore, quantita: quantitaResi, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);
            //$(".menuPrincipale").hide();

            //$('.DettaglioDistributore').html(dettaglio);

            //GetSituazioneDistributore(idDistributore);
        }

    });
    //******************************************************************   

    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto);

}

//Storicizzo la quantita di prodotto nel Distributore
function StoricizzoStatoProdottoInDistributore(idSituazioneDistributore) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore",        
        //url: "WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore",
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idSituazioneDistributore: idSituazioneDistributore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);
            //$(".menuPrincipale").hide();

            //$('.DettaglioDistributore').html(dettaglio);

        }

    });
    //******************************************************************
}

//inserisco in un determinato Distributore una determinata quantita di Prodotto
function InsertProdottiInDistributore(idDistributore, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributore",        
        //url: "WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributore",
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: idDistributore, idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto }),
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


        