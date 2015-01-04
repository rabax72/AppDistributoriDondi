$(function () {

    

});


function GetSituazioneDistributore(IdDistributore, descDistributore) {
    location.hash = "formDettaglioDistributore";

    $(".caricaDaMagazzino").attr("data-IdDistributore", IdDistributore);
    $(".caricaDaMagazzino").attr("data-descDistributore", descDistributore);
    $(".h1DettDistributore").html('Dettaglio Distributore: ' + descDistributore);
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
                dettaglio = dettaglio + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                dettaglio = dettaglio + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
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
                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                var quantitaRimasti = $(this).prev().val();
                var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));

                //javascript: SalvaRimasti(' + risultati[i].IdSituazioneDistributore + ', ' + risultati[i].IdDistributore + ', ' + risultati[i].idProdotto + ', ' + $(".rimasto").prev().val() + ', ' + prezzoTotale + ', ' + risultati[i].IdOperatore + ', ' + risultati[i].numeroLotto + ');
                //alert('IdSituazioneDistributore=' + IdSituazioneDistributore + ' idProdotto=' + idProdotto + ' prezzo=' + prezzo + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                //console.log(' quantita=' + quantita);
                //alert('quantitaRimasti=' + quantitaRimasti + 'quantitaAttuale=' + quantitaAttuale);
                //return;
                if (parseInt(quantitaRimasti) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che siano rimasti più prodotti di quelli presenti!");
                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                SalvaRimasti(IdSituazioneDistributore, idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore, numeroLotto);

                var labelQuantita = $(this).closest('td').prev('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                labelQuantita.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);
                labelQuantita.html(quantitaRimasti);
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

                if (parseInt(quantitaResi) > parseInt(quantitaDist)) {
                    alert("E' impossibile che siano più prodotti Resi di quelli presenti!");
                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                var confermaResi = ConfermaResi(quantitaResi);
                if (confermaResi == 0) {
                    return;
                } 

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

function ConfermaResi(quantita) {
    var answer = confirm('Confermi che per questo articolo ci sono '+quantita + ' Resi?')
    if (!answer) {

        return 0;
    }
    else {
        return 1;
    }

    //var result = 0;

    //jConfirm('Confermi che per questo articolo ci sono dei Resi??', 'Conferma Resi', function (r) {
    //    //jAlert('Confirmed: ' + r, 'Confirmation Results');
    //    return r;
    //})

    //$("#dialogConfirmResi").dialog({
    //    resizable: false,
    //    height: 140,
    //    modal: true,
    //    buttons: {
    //        "OK": function () {
    //            $(this).dialog("close");
    //            result = 1;
    //            return result;
    //        },
    //        Cancel: function () {
    //            $(this).dialog("close");
    //            return result;
    //        }
    //    }
    //});
}

function SalvaRimasti(IdSituazioneDistributore, idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore, numeroLotto) {

    StoricizzoStatoProdottoInDistributore(IdSituazioneDistributore);

    //Inserisco la quantita aggiornata di prodotto nel Distributore
    //console.log('idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto);
        
    //Inserisco la quantita di Prodotti Venduti
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti",
        //url: "WebServiceAppDondi.asmx/AggiornaQuantitaProdottiVenduti",
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore: idDistributore, quantita: quantitaVenduti, prezzoTotale: prezzoTotaleVenduti, idOperatore: idOperatore }),
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
    //****************************************************************** 
}

function SalvaResi(idSituazioneDistributore, idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto) {    

    StoricizzoStatoProdottoInDistributore(idSituazioneDistributore);
    
    //alert(' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta);

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


        