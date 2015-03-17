$(function () {
    
});



function GetSituazioneCliente(IdCliente, descCliente) {
    location.hash = "formDettaglioCliente";
    

    $(".caricaDaCamionPerCliente").attr("data-IdCliente", IdCliente);
    $(".caricaDaCamionPerCliente").attr("data-descCliente", descCliente);
    $(".h1DettCliente").html('Dettaglio Cliente: ' + descCliente);

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneCliente",        
        url: urlGetSituazioneClienti,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdCliente: IdCliente }),
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
            //console.log(Ordinanze);
            //console.log(risultati);
            //$(".menuPrincipale").hide();      
            if (risultati.length > 0) {
                $(".h1DettCliente").html('Dettaglio Cliente: ' + risultati[0].descrizioneCliente);
            }

            var dettaglio = '<table id="tabellaDettaglioCliente" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +                                                
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +
                                                '<th>Rimasti</th>' +
                                                '<th>Resi</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +                                              
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +
                                               '<th>Rimasti</th>' +
                                                '<th>Resi</th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var idProd = '';
            var idProdOld = '';
            var numLotto = '';
            var numLottoOld = '';
            var rigaDettaglio = new Array();
            var quantita = 0;
            var quantitaOld = 0;
            var quantitaTot = 0;
            for (var i = 0; i < risultati.length; i++) {
                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneCliente).val();
                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                quantita = risultati[i].quantita;
                if (idProd != idProdOld) {
                    //dettaglio = dettaglio + '<tr>';
                    //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                    //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                    //dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';
                    //dettaglio = dettaglio + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                    //dettaglio = dettaglio + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                    //dettaglio = dettaglio + '</tr>';
                    quantitaTot = quantita;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantita + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3" value="0"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantita + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3" value="0"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '"  class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3" value="0"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneCliente + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneCliente="' + risultati[i].IdSituazioneCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdCliente="' + risultati[i].IdCliente + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '"  class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    }
                }

                idProdOld = risultati[i].idProdotto;
                numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantita;
            }
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            dettaglio = dettaglio + righe + '</tbody> </table>';
            //console.log(dettaglio);
            $('.DettaglioCliente').html(dettaglio);
            
            var table = $('#tabellaDettaglioCliente').DataTable(
                { "paging": false }
            );

            $(".rimasti").on('click', function () {

                var IdSituazioneCliente = $(this).attr('data-IdSituazioneCliente');
                var IdCliente = $(this).attr('data-IdCliente');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaAttuale = $(this).closest('td').prev('td').text();
                var quantitaRimasti = $(this).prev().val();
                var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                var idOperatore = localStorage.idOperatore;
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));

                var numeroDDT = $(this).attr('data-numeroDDT');
                var dataDDT = $(this).attr('data-dataDDT');
                if (dataDDT != null) {
                    dataDDT = parseJsonDateToJsDate(dataDDT);
                }

                if (quantitaRimasti == "" || isInteroPositivo(parseInt(quantitaRimasti)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaRimasti) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che siano rimasti più prodotti di quelli presenti!");
                    //$(this).prev().animate({ backgroundcolor: "red" }, 1000);
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");

                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                //alert('IdSituazioneCliente=' + IdSituazioneCliente + ' IdCliente=' + IdCliente + ' idProdotto=' + idProdotto + ' quantitaVenduti=' + quantitaVenduti + ' quantitaRimasti=' + quantitaRimasti + 'prezzoTotaleRimasti=' + prezzoTotaleRimasti + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                //return;

                SalvaRimastiCliente(IdSituazioneCliente, IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);

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

            $(".resi").on('click', function () {

                var IdSituazioneCliente = $(this).attr('data-IdSituazioneCliente');
                var IdCliente = $(this).attr('data-IdCliente');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaResi = $(this).prev().val();
                var quantitaDist = $(this).closest('td').prev('td').prev('td').text();
                var prezzoTotale = (prezzo * quantitaResi);
                var idOperatore = localStorage.idOperatore;
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                var quantitaRimasta = (quantitaDist - quantitaResi);

                var numeroDDT = $(this).attr('data-numeroDDT');
                var dataDDT = $(this).attr('data-dataDDT');
                if (dataDDT != null) {
                    dataDDT = parseJsonDateToJsDate(dataDDT);
                }

                if (quantitaResi == "" || isInteroPositivo(parseInt(quantitaResi)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

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

                SalvaResiCliente(IdSituazioneCliente, IdCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT);

                var labelQuantita = $(this).closest('td').prev('td').prev('td');
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

function SalvaRimastiCliente(IdSituazioneCliente, IdCliente, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT) {

    StoricizzoStatoProdottoInCliente(IdSituazioneCliente);

    //Inserisco la quantita aggiornata di prodotto nel Distributore
    //console.log('IdCliente=' + IdCliente + ' idProdotto=' + idProdotto + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
    InsertProdottiInCliente(IdCliente, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);
    var idDistributore = 0;

    //Inserisco la quantita di Prodotti Venduti
    var VenditaDiretta = false;
    
    AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, IdCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, dataDDT, numeroLotto);
    //****************************************************************** 
}

function SalvaResiCliente(IdSituazioneCliente, IdCliente, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT) {    

    StoricizzoStatoProdottoInCliente(IdSituazioneCliente);
    
    //alert(' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta);
    var idDistributore = 0;
    //Inserisco la quantita di Resi nel Magazzino Resi
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResi",        
        url: urlAggiornaQuantitaProdottiInMagazzinoResi,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore:idDistributore, IdCliente: IdCliente, quantita: quantitaResi, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //$(".menuPrincipale").hide();

            //$('.DettaglioDistributore').html(dettaglio);

            //GetSituazioneDistributore(IdCliente);
        }

    });
    //******************************************************************   

    InsertProdottiInCliente(IdCliente, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT);

}

//Storicizzo la quantita di prodotto in possesso di un dato cliente
function StoricizzoStatoProdottoInCliente(IdSituazioneCliente) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInCliente",        
        url: urlStoricizzaStatoProdottoInCliente,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdSituazioneCliente: IdSituazioneCliente }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //$(".menuPrincipale").hide();

            //$('.DettaglioDistributore').html(dettaglio);

        }

    });
    //******************************************************************
}

//inserisco in un determinato Cliente una determinata quantita di Prodotto
function InsertProdottiInCliente(IdCliente, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInCliente",        
        url: urlAggiornaQuantitaProdottoInCliente,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdCliente: IdCliente, idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto, numeroDDT: numeroDDT, dataDDT: dataDDT }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            
        }

    });
}


        