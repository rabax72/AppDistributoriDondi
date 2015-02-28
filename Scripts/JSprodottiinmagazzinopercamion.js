﻿$(function () {
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

function ElencoProdottiInMagazzinoPerMezzo(idMezzo, azione) {

    if (azione == 'carica') {
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
            
                //console.log(risultati);
            
            
                var dettaglio = '<table id="tabellaProdottiInMagazzinoPerCamion" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>N° DDT</th>' +
                                                '<th>Data DDT</th>' +
                                                '<th>Quantità</th>' +
                                                '<th> </th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>N° DDT</th>' +
                                                '<th>Data DDT</th>' +
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
                    dettaglio = dettaglio + '<td><input type="text" data-role="date" class="dataDDT accentraInput"></td>';
                    dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                    dettaglio = dettaglio + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCamion">Carica</a> </td>';
                    dettaglio = dettaglio + '</tr>';

                }
                dettaglio = dettaglio + '</tbody> </table>';

                //console.log(dettaglio);

                $('.MerceDaCaricareSuCamion').html(dettaglio);

                $(".dataDDT").datepicker({
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
                    var numeroDDT = $(this).closest('td').prev('td').prev('td').prev('td')[0].children[0].value;
                    if (numeroDDT == '') {
                        numeroDDT = 0;
                    }
                    var dataDDT = $(this).closest('td').prev('td').prev('td')[0].children[0].value;
                    if (dataDDT != '') {
                        dataDDT = stringToDate(dataDDT, "dd-MM-yyyy", "-");
                    } else {
                        dataDDT = new Date();
                    }

                    var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                    //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                    var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                    var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                    var idOperatore = $(this).attr('data-idOperatore');
                    //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                    var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                    //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaCaricati=' + quantitaCaricati + ' isUint8(parseInt(quantitaCaricati))=' + isUint8(parseInt(quantitaCaricati)) + ' numeroDDT=' + numeroDDT + ' dataDDT=' + dataDDT);
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

                    CaricaProdottisuCamion(IdMagazzino, idMezzo, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT);

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
    }//Fine Carica ************************************************

    if (azione == 'scarica') {

        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInCamion",        
            url: urlGetProdottiSuCamion,
            cache: false,                   
            async: true,        
            data: JSON.stringify({ idMezzo: idMezzo }),
            error: function (data) {
                console.log(data.responseText)
            },
            beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
            complete: function () { $.mobile.loading('hide'); }, //Hide spinner
            success: function (response) {
                risultati = response.d;
                var dettaglio = '<table id="tabellaProdottiInMagazzinoPerCamionDaScaricare" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Giacenza</th>' +                                                
                                                '<th>Quantità</th>' +
                                                '<th> </th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Giacenza</th>' +
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
                    dettaglio = dettaglio + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdDaCamion">Scarica</a> </td>';
                    dettaglio = dettaglio + '</tr>';

                }
                dettaglio = dettaglio + '</tbody> </table>';

                //console.log(dettaglio);

                $('.MerceDaScaricareDaCamion').html(dettaglio);                

                var table = $('#tabellaProdottiInMagazzinoPerCamionDaScaricare').DataTable(
                    { "paging": false }
                );

                $(".scaricaProdDaCamion").on('click', function () {

                    var IdTrasporto = $(this).attr('data-IdTrasporto');
                    var idProdotto = $(this).attr('data-idProdotto');
                    var prezzo = $(this).attr('data-prezzo');
                    var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                    var quantitaDaRimettereInMagazzino = $(this).closest('td').prev('td')[0].children[0].value;
                    //var numeroDDT = $(this).closest('td').prev('td').prev('td').prev('td')[0].children[0].value;
                    //var dataDDT = $(this).closest('td').prev('td').prev('td')[0].children[0].value;

                    var numeroDDT = $(this).attr('data-numeroDDT');
                    //var dataDDT = new Date(parseJsonDateToJsDate($(this).attr('data-dataDDT')));
                    var dataDDT = parseJsonDateToJsDate($(this).attr('data-dataDDT'));

                    var quantitaRimasti = (quantitaAttuale - quantitaDaRimettereInMagazzino);
                    //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                    var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                    var prezzoTotaleDaRimettereInMagazzino = (prezzo * quantitaDaRimettereInMagazzino);
                    var idOperatore = $(this).attr('data-idOperatore');
                    //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                    var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                    //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaDaRimettereInMagazzino=' + quantitaDaRimettereInMagazzino + ' isUint8(parseInt(quantitaDaRimettereInMagazzino))=' + isUint8(parseInt(quantitaDaRimettereInMagazzino)) + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
                    //return;

                    if (quantitaDaRimettereInMagazzino == "" || isUint8(parseInt(quantitaDaRimettereInMagazzino)) == false) {
                        alert("Scegli un valore Numerico prima di caricare");
                        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                        return;
                    } else {
                        $(this).prev().removeClass("evidenziaErrore");
                    }

                    if (parseInt(quantitaDaRimettereInMagazzino) > parseInt(quantitaAttuale)) {
                        alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");
                        $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                        return;
                    } else {
                        $(this).prev().removeClass("evidenziaErrore");
                    }

                    ScaricaProdottiDaCamion(IdTrasporto, idMezzo, idProdotto, quantitaDaRimettereInMagazzino, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, numeroDDT, dataDDT);
                    
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
            }//end success
        });//end ajaax
    }//Fine Scarica  
                  
}


function CaricaProdottisuCamion(IdMagazzino, idMezzo, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT) {
    console.log(" idProdotto=" + idProdotto + " quantitaCaricati=" + quantitaCaricati + " prezzoTotaleCaricati=" + prezzoTotaleCaricati + " idOperatore=" + idOperatore + " numeroLotto=" + numeroLotto + " idMezzo=" + idMezzo + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
    //return;
    storicizzaProdottoInMagazzino(IdMagazzino, idOperatore);

    AggiornaQuantitaProdottiInMagazzino(idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto);    

    InsertProdottiInCamion(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, idMezzo, numeroDDT, dataDDT);
}

function ScaricaProdottiDaCamion(IdTrasporto, idMezzo, idProdotto, quantitaDaRimettereInMagazzino, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, numeroDDT, dataDDT) {

    console.log(" IdTrasporto=" + IdTrasporto + " idMezzo=" + idMezzo + " idProdotto=" + idProdotto + " quantitaDaRimettereInMagazzino=" + quantitaDaRimettereInMagazzino + " quantitaRimasti=" + quantitaRimasti + " prezzoTotaleRimasti=" + prezzoTotaleRimasti + " prezzoTotaleDaRimettereInMagazzino=" + prezzoTotaleDaRimettereInMagazzino + " idOperatore=" + idOperatore + " numeroLotto=" + numeroLotto + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
    //return;

    // Storicizzo Prodotti su Camion ************************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInTrasporto",        
        url: urlStoricizzoProdTrasporto,
        cache: false,

        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdTrasporto: IdTrasporto, IdOperatore: idOperatore }),

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

    console.log(" idProdotto=" + idProdotto + " quantitaRimasti=" + quantitaRimasti + " prezzoTotaleRimasti=" + prezzoTotaleRimasti + " idOperatore=" + idOperatore + " numeroLotto=" + numeroLotto + " idMezzo=" + idMezzo + " numeroDDT=" + numeroDDT + " dataDDT=" + dataDDT);
    //return;

    // Aggiorno quantita Prodotti rimasti in Camion ************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto",
        url: urlAggiornaQuantInTrasporto,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: idMezzo, numeroDDT: numeroDDT, dataDDT:dataDDT }),
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

    //InsertProdottiInCamion(idProdotto, quantitaDaRimettereInMagazzino, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, idMezzo);

    //TODO
    // gestire il passaggio numeroDDT e dataDDT
    CaricaProdottoInMagazzino(idProdotto, quantitaDaRimettereInMagazzino, prezzoTotaleDaRimettereInMagazzino, idOperatore, numeroLotto, numeroDDT, dataDDT, 'Rimessi da camion a Magazzino');
}

//inserisco in un determinato Cliente una determinata quantita di Prodotto
function InsertProdottiInCamion(idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, idMezzo, numeroDDT, dataDDT) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto",        
        url: urlAggiornaQuantInTrasporto,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: idMezzo, numeroDDT: numeroDDT, dataDDT: dataDDT }),
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



        