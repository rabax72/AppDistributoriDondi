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
            obj.closest('td').html(risultati.quantitaVenduto);

            //return risultati;

            //$("#tuttiDistributori").html(distributori);

        }

    });
}

function GetStoricoVendutoInDistributore(IdDistributore, idProd, numeroLotto, numeroRecord, descDistributore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetSituazioneVendutoInDistributore2,
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
            
            var storicoQuantitaVendute = '<table class="storicoVendite"><tr><td><b>Data Vendita</b></td><td><b>Quantità Venduta</b></td><td>Cancella</td></tr>';
            
            var righe = '';
            for (var i = 0; i < risultati.length; i++) {
                righe = righe + '<tr>';
                righe = righe + '<td>' + parseJsonDateLettura(risultati[i].dataInserimento) + '</td>';
                righe = righe + '<td>' + risultati[i].quantitaVenduto + '</td>';
                righe = righe + '<td><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCancella btnCancella" data-idVendita="' + risultati[i].IdVendita + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzoProdotto="' + risultati[i].prezzo + '" data-quantProdInDist="' + risultati[i].quantitaDistributore + '" data-quantExVenduto="' + risultati[i].quantitaVenduto + '">Cancella</a></td>';
                righe = righe + '</tr>';
            }
                        
            storicoQuantitaVendute = storicoQuantitaVendute + righe + '</table>';

            var datiPopUpStorico = '<div style="padding:10px 20px;">';
            datiPopUpStorico = datiPopUpStorico + '<h2>Storico Venduto</h2>';
            datiPopUpStorico = datiPopUpStorico + storicoQuantitaVendute;
            datiPopUpStorico = datiPopUpStorico + '</div>';
            //console.log(datiPopUpStorico);
            $("#popUpStoricoVendutoDaDist").html(datiPopUpStorico);

            $(".btnCancella").on('click', function () {
                var idVendita = $(this).attr('data-idVendita');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzoProdotto = $(this).attr('data-prezzoProdotto');
                var quantProdInDist = $(this).attr('data-quantProdInDist');
                var quantExVenduto = $(this).attr('data-quantExVenduto');
                var idOperatore = localStorage.idOperatore;
                var quantitaRimasti = (parseInt(quantProdInDist) + parseInt(quantExVenduto));
                var prezzoTotaleRimasti = (quantitaRimasti * prezzoProdotto);
                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
                CorrezioneVendita(idVendita);

                StoricizzoStatoProdottoInDistributore(IdDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore);

                //setTimeout(GetSituazioneDistributore(IdDistributore, descDistributore), 3000);                                                 

                $("#popUpStoricoVendutoDaDist").popup("close");

                $("#popUpStoricoVendutoDaDist").bind({
                    popupafterclose: function (event, ui) {
                        //alert('chiuso');
                        //console.log(idProdotto);
                        $(".quantProdInDist-" + idProdotto).html(quantitaRimasti);
                    }
                });
                                
               // GetStoricoVendutoInDistributore(IdDistributore, idProdotto, '', 10);
            });
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
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneDistributoreV2",        
        url: urlGetSituazioneDistributoreV2,
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
                                                '<th width="10%">Foto</th>' +
                                                '<th width="15%">Mag.</th>' +
                                                '<th width="15%">Quant. Dist.</th>' +
                                                '<th width="15%">Rimasti</th>' +
                                                '<th width="15%">Resi</th>' +
                                                '<th width="15%">Carica</th>' +
                                                '<th width="15%">Sposta</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +                                              
                                                '<th>Foto</th>' +
                                                '<th>Mag.</th>' +
                                                '<th>Quant. Dist.</th>' +
                                                '<th>Rimasti</th>' +
                                                '<th>Resi</th>' +
                                                '<th>Carica</th>' +
                                                '<th>Sposta</th>' +
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
            var coloreEvidenziato = '';
            var prodotti = new Array();
            for (var i = 0; i < risultati.length; i++) {
                //var quantitaRimasta = $("#rimastoLotto" + risultati[i].IdSituazioneDistributore).val();
                //var prezzoTotale = (quantitaRimasta * risultati[i].prezzo);

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                quantita = risultati[i].quantitaDistributore;                
                coloreEvidenziato = risultati[i].colore;
                 
                var evidenziato = "";
                if (risultati[i].caricato) {
                    evidenziato = "verde";
                }

                prodotti[i] = idProd;
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td align="center"><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"><a href="#popUpStoricoVendutoDaDist" data-rel="popup" data-position-to="window" class="storicoVendutoDaDistributore" data-idProdotto="' + risultati[i].idProdotto + '" data-IdDistributore="' + risultati[i].IdDistributore + '" data-numeroLotto="' + parseJsonDateLettura(risultati[i].numeroLotto) + '"><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/info_40x40.png" border="0" alt="Storico Vendite" title="Storico Vendite"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '<br><br><div id="quantMagazzino' + risultati[i].idProdotto + '" class="quantitaMag">' + risultati[i].quantitaMagazzino + '</div></td>';
                dettaglio = dettaglio + '<td class="quantita ' + coloreEvidenziato + ' quantProdInDist-' + risultati[i].idProdotto + '">' + risultati[i].quantitaDistributore + '</td>';
                dettaglio = dettaglio + '<td><div class="nomeDistributore">Rimasti</div> <input type="number" id="rimastoDist' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active rimasti ui-btnCarica">Salva</a> </td>';
                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Resi</div> <input type="number" id="resoDist' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active resi ui-btnScarica">Salva</a> </td>';
                dettaglio = dettaglio + '<td><div class="medioFont" style="margin-bottom:9px;">Carica</div> <input type="number" id="caricaDist' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-quantMagazzino="' + risultati[i].quantitaMagazzino + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaDist ui-btnCaricaDaMagazzino">Salva</a></td>';
                dettaglio = dettaglio + '<td><input type="checkbox" data-role="flipswitch" name="flip-checkbox-' + risultati[i].idProdotto + '" id="flip-checkbox-' + risultati[i].idProdotto + '" data-on-text="Camion" data-off-text="Distributore" data-wrapper-class="custom-size-flipswitch" checked=""><span id="quantInCamion-' + risultati[i].idProdotto + '" class="quantSuCamion">0</span> <input type="number" id="spostaDist' + risultati[i].idProdotto + '" data-clear-btn="true" class="miniInput" min="0"> <a href="#" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active spostaDist ui-btnSposta">Salva</a></td>';
                dettaglio = dettaglio + '</tr>';

            }           

            dettaglio = dettaglio + '</tbody> </table>';
            var desc = descDistributore;
            desc = desc.replace("'", "\\'");
            desc = '\'' + desc + '\'';
            dettaglio = dettaglio + '<br><p align="center"><input type="button" value="FINE" class="ui-btn ui-corner-all ui-shadow ui-btn-active ui-btnCarica fineCarico" onclick="togliEvidenziatoDistributore(' + IdDistributore + ', ' + desc + ')" /></p>';

            $('.DettaglioDistributore').html(dettaglio);

            $(".storicoVendutoDaDistributore").on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var idDistributore = IdDistributore;
                var numeroLotto = $(this).attr('data-numeroLotto');
                //console.log("numeroLotto=" + numeroLotto + "---");
                numeroLotto = stringToDate(numeroLotto, 'dd/mm/yyyy', '/');
                //console.log("idDistributore=" + idDistributore + ", idProdotto=" + idProdotto + ", numeroLotto=" + numeroLotto);
                //GetStoricoVendutoInDistributore(idDistributore, idProdotto, numeroLotto, 10);
                GetStoricoVendutoInDistributore(idDistributore, idProdotto, '', 10, desc);
                                               
            });

            
                  
            var table = $('#tabellaDettaglioDistributore').DataTable(
                {
                    "paging": false, responsive: true, "fnDrawCallback": function () {
                        $(this).trigger('create');                       
                    }
                }
            );

            for (var i = 0; i < prodotti.length; i++) {
                GetProdottiInCamionByIdProdotto(1, prodotti[i]);
            }

            $(".rimasti").on('click', function () {
                
                var idDistributore = IdDistributore;
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaAttuale = $(this).closest('td').prev('td').text();
                var quantitaRimasti = $('#rimastoDist' + idProdotto).val();
                var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                var idOperatore = localStorage.idOperatore;
               

                if (quantitaRimasti == "") {
                    alert("Scegli un valore Numerico per indicare i Rimasti!");
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

                //alert('idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantitaVenduti=' + quantitaVenduti + ' quantitaRimasti=' + quantitaRimasti + 'prezzoTotaleVenduti=' + prezzoTotaleVenduti + ' prezzoTotaleRimasti=' + prezzoTotaleRimasti + ' idOperatore=' + idOperatore);
                //return;

                if (!confirm("Sicuro che sul distributore sono rimasti " + quantitaRimasti + " pezzi di questo prodotto?")) return;

                SalvaRimasti(idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore);

                var labelQuantita = $(this).closest('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                labelQuantita.animate({
                    backgroundColor: "#38c",
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
                
                var idDistributore = IdDistributore;
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaResi = $('#resoDist' + idProdotto).val();
                var quantitaDist = $(this).closest('td').prev('td').prev('td').text();
                var prezzoTotale = (prezzo * quantitaResi);
                var idOperatore = localStorage.idOperatore;
                var quantitaRimasta = (quantitaDist - quantitaResi);

                if (quantitaResi == "" || isInteroPositivo(parseInt(quantitaResi)) == false) {
                    alert("Scegli un valore Numerico per indicare i Resi!");
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

                //if (!confirm("Sicuro che sono da rendere " + quantitaResi + " pezzi di questo prodotto?")) return;

                SalvaResi(idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore);

                var labelQuantita = $(this).closest('td').prev('td').prev('td');
                //console.log(labelQuantita);
                //labelQuantita.switchClass("oldVal", "valoreCambiato", 1000);
                //labelQuantita.css("background-color", "green");
                
                labelQuantita.animate({
                    backgroundColor: "red",
                    color: "#000"
                }, 1000);
                
                labelQuantita.html(quantitaRimasta);
            });

            $('.caricaDist').on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var quantitaDaCaricare = $('#caricaDist' + idProdotto).val();
                var quantMagazzino = $(this).attr('data-quantMagazzino');
                var quantRestante = (quantMagazzino - quantitaDaCaricare);
                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td');
                var quantitaAggiornata = (parseInt(quantitaDaCaricare) + parseInt(labelQuantita.text()));
                var prezzo = $(this).attr('data-prezzo');
                var prezzoTotale = (prezzo * quantRestante);
                var idOperatore = localStorage.idOperatore;
                var giacenza = $('#quantMagazzino' + idProdotto);

                if (quantitaDaCaricare == "" || isInteroPositivo(parseInt(quantitaDaCaricare)) == false) {
                    alert("Scegli un valore Numerico per indicare quanto caricare!");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (!confirm("Sicuro che vuoi caricare " + quantitaDaCaricare + " pezzi di questo prodotto?")) return;

                SmaltiscoProdottiDaMagazzinoV2(idProdotto, quantRestante, prezzoTotale, idOperatore, false, 'verde');

                InsertProdottiInDistributore(IdDistributore, idProdotto, quantitaDaCaricare, prezzoTotale, idOperatore, 'verde');

                labelQuantita.html(quantitaAggiornata);
                giacenza.html(quantRestante);

                labelQuantita.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);

                giacenza.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);

            });
            
            $('.spostaDist').on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var quantitaDaSpostare = $('#spostaDist' + idProdotto).val();
                var quantCamion = $('#quantInCamion-' + idProdotto);
                
                var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
                
                var prezzo = $(this).attr('data-prezzo');
                
                var idOperatore = localStorage.idOperatore;
                
                var direzione = $('#flip-checkbox-' + idProdotto).is(':checked');

                if (quantitaDaSpostare == "" || isInteroPositivo(parseInt(quantitaDaSpostare)) == false) {
                    alert("Scegli un valore Numerico per indicare quanto spostare!");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (!confirm("Sicuro che vuoi spostare " + quantitaDaSpostare + " pezzi di questo prodotto?")) return;

                if (direzione) {
                    var quantRestanteDistributore = (parseInt(labelQuantita.text()) - parseInt(quantitaDaSpostare));
                    var quantRestanteCamion = (parseInt(quantCamion.text()) + parseInt(quantitaDaSpostare));
                    
                } else {
                    var quantRestanteDistributore = (parseInt(labelQuantita.text()) + parseInt(quantitaDaSpostare));
                    var quantRestanteCamion = (parseInt(quantCamion.text()) - parseInt(quantitaDaSpostare));
                    //InsertProdottiInCamionV2(idProdotto, quantitaDaSpostare, prezzoTotaleRimastiCamion, idOperatore, 1);
                }
                var prezzoTotaleRimastiDistributore = (prezzo * quantRestanteDistributore);
                var prezzoTotaleRimastiCamion = (prezzo * quantRestanteCamion);

                StoricizzoStatoProdottoInDistributore(IdDistributore, idProdotto, quantRestanteDistributore, prezzoTotaleRimastiDistributore, idOperatore);

                StoricizzoProdInTrasportoV2(idProdotto, idOperatore, quantRestanteCamion, prezzoTotaleRimastiCamion, IdDistributore, 0);
                                
                labelQuantita.html(quantRestanteDistributore);
                quantCamion.html(quantRestanteCamion);               

                labelQuantita.animate({
                    backgroundColor: "#FFA500",
                    color: "#000"
                }, 1000);

                quantCamion.animate({
                    backgroundColor: "#FFA500",
                    color: "#000"
                }, 1000);

            });

        }

    });

}

function StoricizzoProdInTrasportoV2(IdProdotto, IdOperatore, quantitaDaSpostare, prezzoTotaleRimasti, idDidtributore, idCliente) {
    $.ajax({
                    type: "POST",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",                    
                    url: urlStoricizzoProdTrasportoV2,
                    cache: false,
                    async: true,
                    data: JSON.stringify({ IdProdotto: IdProdotto, IdOperatore: IdOperatore }),
                    error: function (data) {
                        console.log(data.responseText)
                    },
                    beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
                    complete: function () { $.mobile.loading('hide'); }, //Hide spinner
                    success: function (response) {
                        risultati = response.d;

                        //console.log(risultati);
                       
                        InsertProdottiInCamionV2(IdProdotto, quantitaDaSpostare, prezzoTotaleRimasti, IdOperatore, 1, idDidtributore, idCliente);
                    }

                });
}

function GetProdottiInCamionByIdProdotto(idMezzo, idProdotto) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiSuCamionByIdProdotto",        
        url: urlGetProdottiSuCamionByIdProdotto,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idMezzo: idMezzo, idProdotto: idProdotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        //beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        //complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //$(".menuPrincipale").hide();
            var quantita = 0;
            for (var i = 0; i < risultati.length; i++) {
                quantita = (quantita + parseInt(risultati[i].quantitaTrasporto));
            }

            $('#quantInCamion-' + idProdotto).html(quantita);
            //$('.DettaglioDistributore').html(dettaglio);
            //AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, 'rosso');

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

function SalvaRimasti(idDistributore, idProdotto, quantitaVenduti, quantitaRimasti, prezzoTotaleVenduti, prezzoTotaleRimasti, idOperatore) {

    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore);
    
    //Inserisco la quantita aggiornata di prodotto nel Distributore
    //console.log('idDistributore=' + idDistributore + ' idProdotto=' + idProdotto + ' quantita=' + quantita + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto);
    //if (quantitaRimasti > 0) {
    //    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto, numeroDDT, dataDDT);
    //}
    
    var idCliente = 0;
    var VenditaDiretta = false;
    
    if (parseInt(quantitaVenduti) > 0) {
        AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, VenditaDiretta);
    }
    
    //GetSituazioneDistributore(idDistributore);
}

function SalvaResi(idDistributore, idProdotto, quantitaResi, quantitaRimasta, prezzoTotale, idOperatore) {    
    
    StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaRimasta, prezzoTotale, idOperatore);

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
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInMagazzinoResiV2",        
        url: urlAggiornaQuantitaProdottiInMagazzinoResiV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idProdotto: idProdotto, idDistributore: idDistributore, IdCliente: idCliente, quantita: quantitaResi, prezzoTotale: prezzoTotale, idOperatore: idOperatore}),
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
            AggiornaColoreProdottoInDistributore(idDistributore, idProdotto, 'rosso');
           
        }

    });
    //******************************************************************   
    //console.log('quantitaRimasta=' + quantitaRimasta);    

    //GetSituazioneDistributore(idDistributore);
    
}

//Storicizzo la quantita di prodotto nel Distributore
function StoricizzoStatoProdottoInDistributore(idDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoStatoProdottoInDistributore",        
        url: urlStoricizzoStatoProdottiInDistributore,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: idDistributore, idProdotto: idProdotto}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            if (parseInt(quantitaRimasti) > 0) {
                InsertProdottiInDistributore(idDistributore, idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, 'azzurro');
            }

        }

    });
    //******************************************************************
}

//inserisco in un determinato Distributore una determinata quantita di Prodotto
function InsertProdottiInDistributore(idDistributore, idProdotto, quantita, prezzoTotale, idOperatore, colore) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottoInDistributoreV2",        
        url: urlAggiornoQuantitaProdottiInDistributoreV2,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idDistributore: idDistributore, idProdotto: idProdotto, quantita: quantita, prezzoTotale: prezzoTotale, idOperatore: idOperatore, colore:colore }),
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


        