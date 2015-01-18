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

function ElencoProdottiInMagazzino() {
    location.hash = "gestioneMagazzino";
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
            //$(".menuPrincipale").hide();
            
            var dettaglio = '<table id="tabellaProdottiInMagazzino" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +                                                
                                                '<th>Giacenza</th>' +                                                                                                
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +                                                
                                                '<th>Giacenza</th>' +                                                                                                
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
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
                
                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br> Lotto: ' + parseJsonDate(risultati[i].numeroLotto) + '</td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';                       
                //dettaglio = dettaglio + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                //dettaglio = dettaglio + '<td><a href="#"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdInMagazzino">Scarica</a> </td>';
                //dettaglio = dettaglio + '</tr>';

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                quantita = risultati[i].quantita;
                if (idProd != idProdOld) {

                    quantitaTot = quantita;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + risultati[i].quantita + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdInMagazzino">Scarica</a> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + risultati[i].quantita + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdInMagazzino">Scarica</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br>(' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdInMagazzino">Scarica</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    }
                }

                idProdOld = risultati[i].idProdotto;
                numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantita;
            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            dettaglio = dettaglio + righe + '</tbody> </table>';

            $('#elencoGestioneMagazzino').html(dettaglio);           

            var table = $('#tabellaProdottiInMagazzino').DataTable(
                { "paging": false }
            );

           

            $(".scegliProdDaCaricareInMagazzino").on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var IdMagazzino = $(this).attr('data-IdMagazzino');
                var prezzo = $(this).attr('data-prezzo');
                var lblQ = '#quantitaInMagazzino' + IdMagazzino;
                var quantitaAttuale = $(lblQ).text();
                var idOperatore = $(this).attr('data-idOperatore');
                var foto = $(this).attr('data-foto');

                var finestraDati = '<div style="padding:10px 20px;">';
                finestraDati = finestraDati + '<h3>Carica in Magazzino</h3>';
                finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + foto + '">';
                finestraDati = finestraDati + '<label for="quantitaProdDaCaricareInMagazzino">Quantita:</label>';
                finestraDati = finestraDati + '<input type="number" id="quantitaProdDaCaricareInMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="numeroLotttoCaricareinMagazzino">Numero Lotto</label>';
                finestraDati = finestraDati + '<input type="text" id="numeroLotttoCaricareinMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="numeroDDLCaricareinMagazzino">Numero DDL</label>';
                finestraDati = finestraDati + '<input type="number" id="numeroDDLCaricareinMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="dataDDLCaricareinMagazzino">Data DDL:</label>';
                finestraDati = finestraDati + '<input type="text" id="dataDDLCaricareinMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="noteCaricareinMagazzino">Note:</label>';
                finestraDati = finestraDati + '<textarea cols="40" rows="5" id="noteCaricareinMagazzino" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"></textarea>';
                finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdottoInMagazzino">Carica</a>';
                finestraDati = finestraDati + '</div>';

                $("#popupCaricaMerceInMagazzino").html(finestraDati);

                $("#numeroLotttoCaricareinMagazzino").datepicker({
                    dateFormat: "dd-mm-yy"
                });
                $("#dataDDLCaricareinMagazzino").datepicker({
                    dateFormat: "dd-mm-yy"
                });
                         

                $(".caricaProdottoInMagazzino").on('click', function () {
                    var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();                    
                    var quantitaCaricati = $("#quantitaProdDaCaricareInMagazzino").val();
                    var numeroDDL = $("#numeroDDLCaricareinMagazzino").val();
                    var dataDDL = $("#dataDDLCaricareinMagazzino").val();
                    
                    numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");
                    dataDDL = stringToDate(dataDDL, "dd-MM-yyyy", "-");
                    var note = $("#noteCaricareinMagazzino").val();
                    var quantitaTotale = (parseInt(quantitaAttuale) + parseInt(quantitaCaricati));
                    //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                    //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                    var prezzoTotaleCaricati = (prezzo * quantitaCaricati);                    

                    if (quantitaCaricati == "" || isUint8(parseInt(quantitaCaricati)) == false) {
                        alert("Scegli un valore Numerico prima di caricare");
                        //$(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                        return;
                    //} else {
                    //    $(this).prev().removeClass("evidenziaErrore");
                    }
                    
                    //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDL=' + dataDDL + ' numeroDDL=' + numeroDDL + ' idOperatore=' + idOperatore);
                    //return;

                    CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDL, dataDDL, note);
                    //setTimeout(function () {
                    //    location.hash = "gestioneMagazzino?1";
                    //    }, 2000);
                    
                    //ElencoProdottiInMagazzino();

                    //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
                    
                    var labelQuantita = $(lblQ);
                    //console.log(labelQuantita);                   
                    labelQuantita.animate({
                        backgroundColor: "green",
                        color: "#000"
                    }, 1000);
                    labelQuantita.html(quantitaTotale);

                });
                
               
            });

        }

    });

}


function CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDL, dataDDL, note) {
    

    // Carico Prodotti in magazzino *********************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/CaricaProdottiInMagazzino",
        url: urlCaricaProdottiInMagazzino,
        cache: false,
        async: true,        
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaCaricati, prezzoTotale: prezzoTotaleCaricati, idOperatore: idOperatore, numeroLotto: numeroLotto, numeroDDL: numeroDDL, dataDDL: dataDDL, note: note }),
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



        