$(function () {

    

});

function GetSituazioneVendutoInDistributore(IdDistributore, idProd, obj, numeroLotto) {
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
        data: JSON.stringify({ idDistributore: IdDistributore, idProdotto: idProd, numeroLotto: numeroLotto }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText);
            //$("#tuttiDistributori").html(data.responseText);
            //alert(data.responseText);
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
            //venduto = response.d;
           // alert(risultati);
            //obj.next('div').html(risultati.quantita);
            obj.closest('td').html(risultati.quantita);

            //return risultati;

            //$("#tuttiDistributori").html(distributori);

        }

    });
}

function GetStoricoVendutoInDistributore(IdDistributore, idProd, numeroLotto, numeroRecord) {
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
        data: JSON.stringify({ idDistributore: IdDistributore, idProdotto: idProd, numeroLotto: numeroLotto, numeroRecord: numeroRecord }),
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
            //console.log(Ordinanze);
            //console.log(risultati);
            //$(".menuPrincipale").hide();
            //venduto = response.d;
            // alert(risultati);
            //obj.next('div').html(risultati.quantita);

            //obj.closest('td').html(risultati.quantita);
            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data Vendita</b></td><td><b>Quantità Venduta</b></td></tr>';
            
            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + '<tr>';
                righe = righe + '<td>' + parseJsonDateLettura(risultati[i].dataInserimento) + '</td>';
                righe = righe + '<td>' + risultati[i].quantita + '</td>';
                righe = righe + '</tr>';
            }
                        
            storicoQuantitaVendute = storicoQuantitaVendute + righe + '</table>';

            var datiPopUpStorico = '<div style="padding:10px 20px;">';
            datiPopUpStorico = datiPopUpStorico + '<h2>Storico Venduto</h2>';
            datiPopUpStorico = datiPopUpStorico + storicoQuantitaVendute;
            datiPopUpStorico = datiPopUpStorico + '</div>';
            //console.log(datiPopUpStorico);
            $("#popUpStoricoVendutoDaDist").html(datiPopUpStorico);

        }

    });
}

function GetSituazioneDistributore(IdDistributore, descDistributore) {
    location.hash = "formDettaglioDistributore";
    //ElencoMezziPerDistributori();
    $(".caricaDaCamion").attr("data-IdDistributore", IdDistributore);
    $(".caricaDaCamion").attr("data-descDistributore", descDistributore);
    $(".h1DettDistributore").html(descDistributore);    

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
            //console.log(Ordinanze);
            //console.log(risultati);
            //$(".menuPrincipale").hide();                        

            var dettaglio = '<table id="tabellaDettaglioDistributore" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +                                                
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Quantita Precedente</th>' +
                                                '<th>Rimasti</th>' +
                                                '<th>Resi</th>' +
                                                //'<th>Venduti</th>' +
                                                '<th>Storico Venduto</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +                                              
                                                '<th>Foto</th>' +
                                                '<th>Desc.</th>' +
                                                '<th>Quantita Precedente</th>' +
                                                '<th>Rimasti</th>' +
                                                //'<th>Venduti</th>' +
                                                '<th>Storico Venduto</th>' +
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
                //var oggi = stringToDate('15-02-2015','dd-MM-yyyy','-');
                                        
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
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantita + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><div class="nomeDistributore">Rimasti</div> <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Salva</a> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><div class="medioFont">Resi</div> <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita"><input type="button" text="Aggiorna" value="Aggiorna" class="aggiornaVenduto" data-idProdotto="' + idProd + '" data-numeroLotto="' + stringToDate(parseJsonDateLettura(risultati[i].numeroLotto), "dd/MM/yyyy", "/") + '"><div>a</div></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td align="center"><a href="#popUpStoricoVendutoDaDist" data-rel="popup" data-position-to="window" class="storicoVendutoDaDistributore" data-idProdotto="' + risultati[i].idProdotto + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + parseJsonDateLettura(risultati[i].numeroLotto) + '"><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a> </td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantita + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><div class="nomeDistributore">Rimasti</div> <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><div class="medioFont">Resi</div> <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita"><input type="button" text="Aggiorna" value="Aggiorna" class="aggiornaVenduto" data-idProdotto="' + idProd + '" data-numeroLotto="' + stringToDate(parseJsonDateLettura(risultati[i].numeroLotto), "dd/MM/yyyy", "/") + '"><div>a</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td align="center"><a href="#popUpStoricoVendutoDaDist" data-rel="popup" data-position-to="window" class="storicoVendutoDaDistributore" data-idProdotto="' + risultati[i].idProdotto + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + parseJsonDateLettura(risultati[i].numeroLotto, "dd/MM/yyyy", "/") + '"><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '<br><div class="medioGrande">Lotto:<br>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><div class="nomeDistributore">Rimasti</div> <input type="number" id="rimastoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Salva</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><div class="medioFont">Resi</div> <input type="number" id="resoLotto' + risultati[i].IdSituazioneDistributore + '" data-clear-btn="true" class="miniInput" min="0" max="3"> <a href="#" data-IdSituazioneDistributore="' + risultati[i].IdSituazioneDistributore + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + risultati[i].dataDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita"><input type="button" text="Aggiorna" value="Aggiorna" class="aggiornaVenduto" data-idProdotto="' + idProd + '" data-numeroLotto="' + stringToDate(parseJsonDateLettura(risultati[i].numeroLotto), "dd/MM/yyyy", "/") + '"><div>a</div></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td align="center"><a href="#popUpStoricoVendutoDaDist" data-rel="popup" data-position-to="window" class="storicoVendutoDaDistributore" data-idProdotto="' + risultati[i].idProdotto + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + parseJsonDateLettura(risultati[i].numeroLotto, "dd/MM/yyyy", "/") + '"><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a> </td>';
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

            $(".storicoVendutoDaDistributore").on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var idDistributore = $(this).attr('data-IdDistributore');
                var numeroLotto = $(this).attr('data-numeroLotto');
                //console.log("numeroLotto=" + numeroLotto + "---");
                numeroLotto = stringToDate(numeroLotto, 'dd/mm/yyyy', '/');
                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
                                
            });          

            var table = $('#tabellaDettaglioDistributore').DataTable(
                { "paging": false, responsive: true }
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
                var idOperatore = localStorage.idOperatore;
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));

                var numeroDDT = $(this).attr('data-numeroDDT');
                if (numeroDDT == 'undefined') {
                    numeroDDT = 0;
                }
                var dataDDT = $(this).attr('data-dataDDT');
                if (dataDDT != 'undefined') {
                    //dataDDT = new Date(parseJsonDateToJsDate(dataDDT));
                    dataDDT = parseJsonDateToJsDate(dataDDT);
                } else {
                    dataDDT = new Date();
                }

                if (quantitaRimasti == "") {
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

                if (!confirm("Sicuro che sul distributore sono rimasti " + quantitaRimasti + " pezzi di questo prodotto?")) return;

                SalvaRimasti(IdSituazioneDistributore, idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);

                var labelQuantita = $(this).closest('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                labelQuantita.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);
                labelQuantita.html(quantitaRimasti);

                //var labelVenduto = $(this).closest('td').next('td').next('td');
                //labelVenduto.animate({
                //    backgroundColor: "green",
                //    color: "#000"
                //}, 1000);
                //labelVenduto.html(quantitaVenduti);
            });

            $(".resi").on('click', function () {

                var IdSituazioneDistributore = $(this).attr('data-IdSituazioneDistributore');
                var idDistributore = $(this).attr('data-IdDistributore');
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
                if (numeroDDT == 'undefined') {
                    numeroDDT = 0;
                }
                var dataDDT = $(this).attr('data-dataDDT');
                if (dataDDT != 'undefined') {
                    //dataDDT = new Date(parseJsonDateToJsDate(dataDDT));
                    dataDDT = parseJsonDateToJsDate(dataDDT);
                } else {
                    dataDDT = new Date();
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
                //alert('IdSituazioneDistributore=' + IdSituazioneDistributore + ' idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantitaResi=' + quantitaResi + ' quantitaRimasta=' + quantitaRimasta + 'prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
                //return;

                if (!confirm("Sicuro che sono da rendere " + quantitaResi + " pezzi di questo prodotto?")) return;

                SalvaResi(IdSituazioneDistributore, idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT);

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

function SalvaRimasti(IdSituazioneDistributore, idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT) {

    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, numeroLotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroDDT, dataDDT);
    
    //Inserisco la quantita aggiornata di prodotto nel Distributore
    //console.log('idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
    //if (quantitaRimasti > 0) {
    //    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);
    //}
    
    var idCliente = 0;
    var VenditaDiretta = false;
    
    if (parseInt(quantitaVenduti) > 0) {
        AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta, numeroDDT, dataDDT, numeroLotto);
    }
    
    //GetSituazioneDistributore(idDistributore);
}

function SalvaResi(idSituazioneDistributore, idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT) {    
    
    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, numeroLotto, quantitaRimasta, prezzoTotale, idOperatore, numeroDDT, dataDDT);

    //if (quantitaRimasta > 0) {
    //    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasta, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT);
    //}

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

            //console.log(risultati);
            //$(".menuPrincipale").hide();

            //$('.DettaglioDistributore').html(dettaglio);

           
        }

    });
    //******************************************************************   
    //console.log('quantitaRimasta=' + quantitaRimasta);    

    //GetSituazioneDistributore(idDistributore);
}

//Storicizzo la quantita di prodotto nel Distributore
function StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, numeroLotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroDDT, dataDDT) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore",        
        url: urlStoricizzoStatoProdottiInDistributore,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: idDistributore, idProdotto: idProdotto, numeroLotto: numeroLotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            if (parseInt(quantitaRimasti) > 0) {
                InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);
            }

        }

    });
    //******************************************************************
}

//inserisco in un determinato Distributore una determinata quantita di Prodotto
function InsertProdottiInDistributore(idDistributore, idProdotto, quantita, prezzoTotale, idOperatore, numeroLotto, numeroDDT, dataDDT) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributore",        
        url: urlAggiornoQuantitaProdottiInDistributore,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: idDistributore, idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, numeroLotto: numeroLotto, numeroDDT: numeroDDT, dataDDT: dataDDT }),
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


        