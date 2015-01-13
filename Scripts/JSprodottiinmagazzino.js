$(function () {
    //$(".caricaDaMagazzinoSuCamion").on('click', function () {
    //    var idDistributore = $(this).attr('data-IdDistributore');
    //    var descDistributore = $(this).attr('data-descDistributore');
    //    $(".descDistributore").html('Carica per:' + descDistributore);
    //    var desc = '\'' + descDistributore + '\'';
    //    var linkBack = 'javascript:GetSituazioneDistributore(' + idDistributore + ', ' + desc + ');'
    //    $(".backDistributore").attr("href", linkBack);

    //    ElencoProdottiInMagazzino(idDistributore);
    //});
});

function ElencoProdottiInMagazzino(idMezzo) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInMagazzino",        
        url: urlGetProdottiInMagazzino,
        cache: false,                   
        async: true,        
        data: JSON.stringify({  }),        
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            
            console.log(risultati);
            //$(".menuPrincipale").hide();
            
            var dettaglio = '<table id="tabellaProdottiInMagazzinoPerCamion" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +                                                
                                                '<th>Giacenza</th>' +
                                                '<th>N° DDL</th>' +
                                                '<th>Data DDL</th>' +
                                                '<th>Quantità</th>' +
                                                '<th> </th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +                                                
                                                '<th>Giacenza</th>' +
                                                '<th>N° DDL</th>' +
                                                '<th>Data DDL</th>' +
                                                '<th>Quantità</th>' +
                                                '<th> </th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            
            for (var i = 0; i < risultati.length; i++) {
                
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';                
                dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                dettaglio = dettaglio + '<td><input type="text" data-role="date" class="dataDDl accentraInput"></td>';
                dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                dettaglio = dettaglio + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCamion">Carica</a> </td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            console.log(dettaglio);

            $('.MerceDaCaricareSuCamion').html(dettaglio);

            $(".dataDDl").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiInMagazzinoPerCamion').DataTable(
                { "paging": false }
            );

            $(".caricaProdInCamion").on('click', function () {

                var IdMagazzino = $(this).attr('data-IdMagazzino');                
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();
                var quantitaCaricati = $(this).closest('td').prev('td')[0].children[0].value;
                var numeroDDL = $(this).closest('td').prev('td').prev('td').prev('td')[0].children[0].value;
                var dataDDL = $(this).closest('td').prev('td').prev('td')[0].children[0].value;

                var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));

                //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaCaricati=' + quantitaCaricati + ' isUint8(parseInt(quantitaCaricati))=' + isUint8(parseInt(quantitaCaricati)) + ' numeroDDL=' + numeroDDL + ' dataDDL=' + dataDDL);
                //return;

                if (quantitaCaricati == "" || isUint8(parseInt(quantitaCaricati)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");                    
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaCaricati) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");                    
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                CaricaProdottisuCamion(IdMagazzino, idMezzo, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto);

                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
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


function CaricaProdottisuCamion(IdMagazzino, idMezzo, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto) {

    // Storicizzo Prodotti in magazzino ************************************************
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
    // *********************************************************************************

    // Aggiorno quantita Prodotti rimasti in magazzino *********************************
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
    // *********************************************************************************

    InsertProdottiInCamion(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, idMezzo);
}

//inserisco in un determinato Cliente una determinata quantita di Prodotto
function InsertProdottiInCamion(idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, idMezzo) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto",        
        url: urlAggiornaQuantInTrasporto,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: idMezzo }),
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



        