$(function () {

    

});

function GetSituazioneVendutoInDistributore(IdDistributore, idProd, obj) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetSituazioneVendutoInDistributore,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: IdDistributore, idProdotto: idProd }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText);
            //$("#tuttiDistributori").html(data.responseText);
            alert(data.responseText);
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
            //venduto = response.d;
           // alert(risultati);
            //obj.next('div').html(risultati.quantita);
            obj.closest('td').html(risultati.quantita);

            //return risultati;

            //$("#tuttiDistributori").html(distributori);

        }

    });
}

function GetSituazioneDistributore(IdDistributore, descDistributore) {
    location.hash = "formDettaglioDistributore";
    //ElencoMezziPerDistributori();
    $(".caricaDaCamion").attr("data-IdDistributore", IdDistributore);
    $(".caricaDaCamion").attr("data-descDistributore", descDistributore);
    $(".h1DettDistributore").html('Dettaglio Distributore: ' + descDistributore);    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneDistributore",        
        url: urlGetSituazioneDistributore,
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
            //console.log(risultati);
            //$(".menuPrincipale").hide();                        

            var dettaglio = '<table id="tabellaDettaglioDistributore" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +                                                
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +
                                                '<th>Rimasti</th>' +
                                                '<th>Resi</th>' +
                                                '<th>Venduti</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +                                              
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +
                                                '<th>Rimasti</th>' +
                                                '<th>Venduti</th>' +
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
                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                quantita = risultati[i].quantita;
                var oggi = stringToDate('15-02-2015','dd-MM-yyyy','-');
                        
                
                //function displayData(x) {
                //    x.success(function (realData) {
                //        //$('#test').text(realData).css({color: 'green'});
                //        $(".qVenduto").html(realData);
                //    });
                //}

                //var promise = foo(IdDistributore, idProd);
                //displayData(promise);

                //var venduto = foo(IdDistributore, idProd, oggi);
                

                //console.log(venduto);
                //var h = venduto;
                //console.log(h.d);

                if (idProd != idProdOld) {
                    
                    quantitaTot = quantita;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].quantita + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';                    
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="qVenduto"><input type="button" text="Aggiorna" value="Aggiorna" class="aggiornaVenduto" data-idProdotto="' + idProd + '"><div>a</div></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].quantita + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="qVenduto"><input type="button" text="Aggiorna" value="Aggiorna" class="aggiornaVenduto" data-idProdotto="' + idProd + '"><div>a</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Rimasti <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>Resi <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="qVenduto"><input type="button" text="Aggiorna" value="Aggiorna" class="aggiornaVenduto" data-idProdotto="' + idProd + '"><div>a</div></td>';
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

            $('.DettaglioDistributore').html(dettaglio);           
                                    
            $(".aggiornaVenduto").on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var vend = $(this);
                GetSituazioneVendutoInDistributore(IdDistributore, idProdotto, vend);
                //var v = $(this);
                //var venduto = foo(IdDistributore, idProdotto).done(function (r) {
                //    if (r) {
                //        // Tell the user they're logged in
                //        //console.log(r.responseText);
                //        //$(".qVenduto").html(r.quantita);
                //        //venduto = r;
                //    } else {
                //        // Tell the user their password was bad
                //        console.log('Non ha finito');
                //        alert('r=' + r);
                //        v.next('div').html(r);
                //    }

                //})
                //.fail(function (x) {
                //    // Tell the user something bad happened
                //    console.log(x);
                //    alert('x=' + x.d);
                //    v.next('div').html(x);
                //});
                
                //foo(IdDistributore, idProdotto).success(function (data) {
                //    //alert(data);
                //    console.log(data.d.quantita);
                //    //var zzz = venduto.responseText;
                //    //console.log(zzz);
                //    //$(".qVenduto").html(data.d.quantita);
                //    //v.closest('td').html(data.d.quantita);
                //    alert('q=' + data.d.quantita);
                //    v.next('div').html(data.d.quantita);
                //});

            });
            
            $(".aggiornaVenduto").each(function () {
                $(this).click();
            });

            var table = $('#tabellaDettaglioDistributore').DataTable(
                { "paging": false }
            );

            $(".rimasti").on('click', function () {

                var IdSituazioneDistributore = $(this).attr('data-IdSituazioneDistributore');
                var idDistributore = $(this).attr('data-IdDistributore');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaAttuale = $(this).closest('td').prev('td').text();
                var quantitaRimasti = $(this).prev().val();
                var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                

                if (quantitaRimasti == "" || isUint8(parseInt(quantitaRimasti)) == false) {
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

                //alert('IdSituazioneDistributore=' + IdSituazioneDistributore + ' idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantitaVenduti=' + quantitaVenduti + ' quantitaRimasti=' + quantitaRimasti + 'prezzoTotaleVenduti=' + prezzoTotaleVenduti + ' prezzoTotaleRimasti=' + prezzoTotaleRimasti + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                //return;

                SalvaRimasti(IdSituazioneDistributore, idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore, numeroLotto);

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

                var IdSituazioneDistributore = $(this).attr('data-IdSituazioneDistributore');
                var idDistributore = $(this).attr('data-IdDistributore');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaResi = $(this).prev().val();
                var quantitaDist = $(this).closest('td').prev('td').prev('td').text();
                var prezzoTotale = (prezzo * quantitaResi);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));               
                var quantitaRimasta = (quantitaDist - quantitaResi);

                if (quantitaResi == "" || isUint8(parseInt(quantitaResi)) == false) {
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
                //alert('IdSituazioneDistributore=' + IdSituazioneDistributore + ' idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta + 'prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                //return;
                SalvaResi(IdSituazioneDistributore, idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto);

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

//function GetSituazioneVendutoInDistributore(idDistributore, idProdotto, DataA) {
//    $.ajax({
//        type: "POST",
//        crossDomain: true,
//        contentType: "application/json; charset=utf-8",               
//        url: urlGetSituazioneVendutoInDistributore,
//        cache: false,
//        //jsonpCallback: 'risposta',
//        // jsonp: 'callback',
//        // dataType: "jsonp",            
//        async: false,
//        //            data: "idDisciplina=" + idDisciplina,
//        data: JSON.stringify({ idDistributore: idDistributore, idProdotto: idProdotto, DataA: DataA }),
//        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
//        error: function (data) {
//            console.log(data.responseText);
//            //$("#tuttiDistributori").html(data.responseText);
//        },
//        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
//        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
//        success: function (response) {
//            //risultati = response.d;
//            //corsiGlobal = response.d;
//            //console.log('Caricati!');
//            // console.log(Ordinanze);
//            //console.log(risultati);
//            //$(".menuPrincipale").hide();
//            return response.d;

//            //$("#tuttiDistributori").html(distributori);

//        }

//    });
//}

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
    var idCliente = 0;
    var VenditaDiretta = false;
    var dataDDT = new Date();
    AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, 0, dataDDT);
}

function SalvaResi(idSituazioneDistributore, idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto) {    

    StoricizzoStatoProdottoInDistributore(idSituazioneDistributore);
    
    //alert(' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta);
    var idCliente = 0;
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
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore: idDistributore, IdCliente: idCliente, quantita: quantitaResi, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto }),
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
    console.log('quantitaRimasta=' + quantitaRimasta);
    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto);

}

//Storicizzo la quantita di prodotto nel Distributore
function StoricizzoStatoProdottoInDistributore(idSituazioneDistributore) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore",        
        url: urlStoricizzoStatoProdottiInDistributore,
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
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributore",        
        url: urlAggiornoQuantitaProdottiInDistributore,
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


        