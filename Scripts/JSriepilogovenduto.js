$(function () {
    
    //$("#ResiDataDa").datepicker({
    //    dateFormat: "dd-mm-yy"
    //});
    //$("#ResiDataA").datepicker({
    //    dateFormat: "dd-mm-yy"
    //});

    //$(".filtraResi").on('click', function () {
    //    var dataDa = $("#ResiDataDa").val();
    //    if (dataDa != '') {
    //        dataDa = stringToDate(dataDa, "dd-MM-yyyy", "-");
    //    } else {
    //        dataDa = stringToDate("01-01-2000", "dd-MM-yyyy", "-");
    //    }

    //    var dataA = $("#ResiDataA").val();
    //    if (dataA != '') {
    //        dataA = stringToDate(dataA, "dd-MM-yyyy", "-");
    //    } else {
    //        dataA = stringToDate("01-01-2100", "dd-MM-yyyy", "-");
    //    }
    //    GetProdottiInMagazzinoResiFiltrato(dataDa, dataA);
    //});

});

function RiepilogoVenduto() {

    $('.DettRiepilogoVenduto').html('');
    location.hash = "RiepilogoVenduto";
}

function VenditaDiretta(DataDa, DataA) {
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",                
        url: urlGetVendutoDirettamente,
        cache: false,
        async: true,
        data: JSON.stringify({ DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);


            var dettaglio = '<div>' +
                                'Data Da <input type="text" id="ProdottiVendutiDirettamenteDataDa" class="calendario" data-theme="a" /> Data A <input type="text" id="ProdottiVendutiDirettamenteDataA" class="calendario" data-theme="a" /> <button id="filtraProdottiVendutiDirettamente" value="Filtra" class="filtraProdottiVendutiDirettamente">Filtra</button>' +
                            '</div><table id="tabellaProdottiVendutiDirettamente" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Operatore</th>' +                                            
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            var dataDdt = '';
            for (var i = 0; i < risultati.length; i++) {
                if (risultati[i].dataDDT != '/Date(-62135596800000)/') {
                    dataDdt = parseJsonDateLettura(risultati[i].dataDDT);
                }
                else {
                    dataDdt = '';
                }
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + dataDdt + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + ' €</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +                                            
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiVendutiDirettamente').DataTable(
                { "paging": false, responsive: true }
            );

            $('.filtraProdottiVendutiDirettamente').click(function () {
                var DataDa = stringToDate($('#ProdottiVendutiDirettamenteDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringToDate($('#ProdottiVendutiDirettamenteDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VenditaDiretta(DataDa, DataA);
            });
            
            
        }
    });
    
}

function VendutoPerProdotto() {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoProdottiVenduti,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);

            var dettaglio = '<h1>Filtra per prodotto</h1><table id="tabellaElencoProdotti" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +                                            
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Dettaglio</th>' +                                            
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Dettaglio</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {
                var desc = '\'' + risultati[i].descrizione + '\'';
                //var numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                //numLotto = '\'' + numLotto + '\'';
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdotto(' + risultati[i].idProdotto + ', null, ' + desc + ', null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].aliquota + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande"><a href="javascript:GetVendutoByIdProdotto(' + risultati[i].idProdotto + ', null, ' + desc + ', null, null);">Dettaglio</a></td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaElencoProdotti').DataTable(
                { "paging": false, responsive: true }
            );

        }
    });

}

function VendutoPerProdottoLotto() {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoProdottiVendutiPerLotto,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per prodotto</h1><table id="tabellaElencoProdottiPerLotto" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Data Scadenza</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Data Scadenza</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {
                var desc = '\'' + risultati[i].descrizione + '\'';
                var numLotto = parseJsonDateLettura(risultati[i].numeroLotto);
                numLotto = '\'' + numLotto + '\'';
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdotto(' + risultati[i].idProdotto + ', ' + numLotto + ', ' + desc + ', null, null);"><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].aliquota + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaElencoProdottiPerLotto').DataTable(
                { "paging": false, responsive: true }
            );

        }
    });

}

function GetVendutoByIdProdotto(idProdotto, numeroLotto, descrizione, DataDa, DataA) {
    // location.hash = "VenditaDiretta";
    
    if (numeroLotto != null) {
        numeroLotto = stringToDate(numeroLotto, "dd/MM/yyyy", "/");
    }
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdProdotto,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, numeroLotto:numeroLotto, DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText);
            $('.DettRiepilogoVenduto').html(data.responseText);
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtro per: ' + descrizione + '</h1>' + '<div>' +
                                'Data Da <input type="text" id="VendutiByIdProdottoDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdProdottoDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdProdotto" value="Filtra" class="filtraVendutiByIdProdotto">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdProdotto" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdProdotto').DataTable(
                { "paging": false, responsive: true }
            );
            
            $('.filtraVendutiByIdProdotto').click(function () {
                var DataDa = stringToDate($('#VendutiByIdProdottoDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringToDate($('#VendutiByIdProdottoDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdProdotto(idProdotto, numeroLotto, descrizione, DataDa, DataA);
            });

        }
    });

}

function VendutoPerTuttiDistributori(DataDa, DataA) {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoPerTuttiDistributori,
        cache: false,
        async: true,
        data: JSON.stringify({ DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoPerTuttiDitributoriDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoPerTuttiDitributoriDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributore" value="Filtra" class="filtraVendutoPerTuttiDitributori">Filtra</button>' +
                            '</div><table id="tabellaVendutoPerTuttiDitributori" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }

           
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>Venduto Mark: </th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutoPerTuttiDitributori').DataTable(
                {
                    "paging": false, responsive: true
                }
            );

            $('.filtraVendutoPerTuttiDitributori').click(function () {
                var DataDa = stringToDate($('#VendutoPerTuttiDitributoriDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringToDate($('#VendutoPerTuttiDitributoriDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributori(DataDa, DataA);
            });

        }
    });

}

function VendutoPerTuttiDistributoriStampa(DataDa, DataA) {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoPerTuttiDistributoriStampa,
        cache: false,
        async: true,
        data: JSON.stringify({ DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            var dettaglio = '<h1>Riepilogo Venduto per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoPerTuttiDitributoriStampaDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoPerTuttiDitributoriStampaDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributoreStampa" value="Filtra" class="filtraVendutoPerTuttiDitributoriStampa">Filtra</button>' +
                            '</div><table id="tabellaVendutoPerTuttiDitributoriStampa" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th width ="40%">Distributore</th>' +                                            
                                            '<th width ="40%">Venduto Tot.</th>' +
                                            '<th width ="20%">Data Ril.</th>' +                                           
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totalePerDist= 0;
            var descrizioneOld = "";
            var k = 0;
            var rigaDettaglio = new Array();
            var sommaTotali = 0;
            for (var i = 0; i < risultati.length; i++) {
                totalePerDist = risultati[i].prezzoTotale;
                sommaTotali = sommaTotali + risultati[i].prezzoTotale;
                //console.log(risultati[i]);
                if (descrizioneOld != risultati[i].descrizione) {
                    
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    prezzoTot = risultati[i].prezzoTotale;
                } else {
                    rigaDettaglio[i - 1] = '';
                    prezzoTot = (parseFloat(prezzoTot) + parseFloat(totalePerDist));
                    rigaDettaglio[i] = rigaDettaglio[i] + '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + prezzoTot + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    //totalePerDist = totalePerDist + risultati[i].prezzoTotale;
                }
                
                descrizioneOld = risultati[i].descrizione;
                           
            }

            //console.log(dettaglio);

            var righe = '';

            for (var z = 0; z < risultati.length; z++) {
                righe = righe + rigaDettaglio[z];
            }

            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                         '<tr>' +
                                             '<th>Distributore</th>' +
                                             '<th>Totale Venduto: ' + Number(sommaTotali).toFixed(2) + '€</th>' +
                                             //'<th>Venduto Mark: </th>' +                                            
                                             '<th>Data Ril.</th>' +
                                         '</tr>' +
                                     '</tfoot>' + ' </table>';

            $('.DettRiepilogoVenduto').html(dettaglio);            

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutoPerTuttiDitributoriStampa').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraVendutoPerTuttiDitributoriStampa').click(function () {
                var DataDa = stringToDate($('#VendutoPerTuttiDitributoriStampaDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringToDate($('#VendutoPerTuttiDitributoriStampaDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                VendutoPerTuttiDistributoriStampa(DataDa, DataA);
            });

        }
    });

}

function VendutoPerDistributore() {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoDistributori,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('.DettRiepilogoVenduto').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per Distributore:</h1><ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
            var Citta = '';
            var CittaOld = '';
            for (var i = 0; i < risultati.length; i++) {
                Citta = risultati[i].Citta;
                var indirizzo = risultati[i].indirizzo;
                var desc = '\'' + risultati[i].descrizione + '\'';

                if (Citta != CittaOld) {
                    dettaglio = dettaglio + '<li data-role="list-divider" class="ui-li-divider">' + Citta + '</li>';
                }

                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdDistributore(' + risultati[i].idDistributore + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
                CittaOld = risultati[i].Citta;
            }
            dettaglio = dettaglio + '</ul>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });           

        }
    });

}

function GetVendutoByIdDistributore(idDistributore, descrizione, DataDa, DataA) {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdDistributore,
        cache: false,
        async: true,
        data: JSON.stringify({ idDistributore: idDistributore, DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Riepilogo Venduto per Distributore: ' + descrizione + '</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoDitributoreDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoDitributoreDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributore" value="Filtra" class="filtraVendutoDitributore">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdDistributore" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +                                            
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            
            //dettaglio = dettaglio + '<tr>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>Totale Venduto: ' + prezzoTot + '€</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                            '<td>-</td>' +
            //                        '</tr>';
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdDistributore').DataTable(
                { "paging": false, responsive: true }
            );

            $('.filtraVendutoDitributore').click(function () {
                var DataDa = stringToDate($('#VendutoDitributoreDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringToDate($('#VendutoDitributoreDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdDistributore(idDistributore, descrizione, DataDa, DataA);
            });

        }
    });

}

function VendutoPerCliente() {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoCliente,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per Cliente:</h1><ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < risultati.length; i++) {
                var indirizzo = risultati[i].indirizzo;
                var desc = '\'' + risultati[i].descrizione + '\'';
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdCliente(' + risultati[i].idCliente + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r vociVenduto" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
            }
            dettaglio = dettaglio + '</ul>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });            

        }
    });

}

function GetVendutoByIdCliente(idCliente, descrizione, DataDa, DataA) {    

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdCliente,
        cache: false,
        async: true,
        data: JSON.stringify({ idCliente: idCliente, DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //var cliente = GetClienteById(idCliente);

            var dettaglio = '<h1>Filtro per Cliente: ' + descrizione + '</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutiByIdClienteDataDa" class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdClienteDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdCliente" value="Filtra" class="filtraVendutiByIdCliente">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdCliente" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Data Ril.</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +                                    
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataUltimaModifica) + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].numeroDDT + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>N° DDT</th>' +
                                            //'<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdCliente').DataTable(
                { "paging": false, responsive: true }
            );

            $('.filtraVendutiByIdCliente').click(function () {
                var DataDa = stringToDate($('#VendutiByIdClienteDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringToDate($('#VendutiByIdClienteDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdCliente(idCliente, descrizione, DataDa, DataA);
            });

        }
    });

}

function GetProdottiInMagazzinoResi() {

    location.hash = "RiepilogoResi";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetProdottiInMagazzinoResi,
        cache: false,
        async: true,
        data: JSON.stringify({}),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<table id="tabellaProdottiMagazzinoResi" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Totale perso</th>' +
                                            //'<th>Distributore</th>' +
                                            //'<th>Cliente</th>' +
                                            //'<th>Data Reso</th>' +
                                            //'<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>';
            var idProd = '';
            var idProdOld = '';
            var numLotto = '';
            var numLottoOld = '';
            var rigaDettaglio = new Array();
            var quantita = 0;
            var quantitaOld = 0;
            var quantitaTot = 0;
            var prezzoTot = 0;
            var prezzoTotProd = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                //dettaglio = dettaglio + '</tr>';

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                //console.log(numLotto);
                quantita = risultati[i].quantitaMagazzinoResi;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    prezzoTotProd = risultati[i].prezzoTotale;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaMagazzinoResi + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {
                   
                    rigaDettaglio[i - 1] = '';
                    quantitaTot = (quantitaTot + quantita);
                    prezzoTotProd = prezzoTotProd + risultati[i].prezzoTotale;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + Number(prezzoTotProd).toFixed(2) + ' €</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                   
                }
                idProdOld = risultati[i].idProdotto;
                //numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantitaMagazzinoResi;
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaMagazzinoResi;
            }
            //dettaglio = dettaglio + '</tbody> </table>';
            
            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            //dettaglio = dettaglio + righe + '</tbody> </table>';
            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Perso: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            //'<th>Distributore</th>' +
                                            //'<th>Cliente</th>' +
                                            //'<th>Data Reso</th>' +
                                            //'<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            $('.DettRiepilogoResi').html(dettaglio);            

            var table = $('#tabellaProdottiMagazzinoResi').DataTable(
                { "paging": false, responsive: true }
            );


        }
    });

}

function GetProdottiInMagazzinoResiFiltrato(dataDa, dataA){   

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetProdottiInMagazzinoResiFiltrato,
        cache: false,
        async: true,
        data: JSON.stringify({ dataDa: dataDa, dataA: dataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<table id="tabellaProdottiMagazzinoResi" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Data Reso</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>';

            var idProd = '';
            var idProdOld = '';
            var numLotto = '';
            var numLottoOld = '';
            var rigaDettaglio = new Array();
            var quantita = 0;
            var quantitaOld = 0;
            var quantitaTot = 0;
            var prezzoTot = 0;
            var totaleQuantita = 0;
            for (var i = 0; i < risultati.length; i++) {

                //dettaglio = dettaglio + '<tr>';
                //dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                //dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                //dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                //dettaglio = dettaglio + '<td class="medioGrande">' + risultati[i].prezzoTotale + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                //dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                //dettaglio = dettaglio + '</tr>';

                idProd = risultati[i].idProdotto;
                numLotto = risultati[i].numeroLotto;
                //console.log(numLotto);
                quantita = risultati[i].quantitaVenduto;
                if (idProd != idProdOld) {
                    quantitaTot = quantita;
                    rigaDettaglio[i] = '<tr>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';

                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + risultati[i].quantitaVenduto + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/public/appdistributoridoldi/fotoprodotti/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + ' (' + parseJsonDateLettura(risultati[i].numeroLotto) + ')</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + risultati[i].prezzoTotale + ' €</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneDistributore + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].descrizioneCliente + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateSenzaTime(risultati[i].dataInserimento) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    }
                }
                idProdOld = risultati[i].idProdotto;
                numLottoOld = risultati[i].numeroLotto;
                quantitaOld = risultati[i].quantitaVenduto;
                prezzoTot = prezzoTot + risultati[i].prezzoTotale;
                totaleQuantita = totaleQuantita + risultati[i].quantitaVenduto;
            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            var righe = '';

            for (var i = 0; i < risultati.length; i++) {
                righe = righe + rigaDettaglio[i];
            }

            //dettaglio = dettaglio + righe + '</tbody> </table>';
            dettaglio = dettaglio + righe + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Desc.</th>' +
                                            '<th>Totale Quantità: ' + totaleQuantita + '</th>' +
                                            '<th>Totale Venduto: ' + Number(prezzoTot).toFixed(2) + '€</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            $('.DettRiepilogoResi').html(dettaglio);

            var table = $('#tabellaProdottiMagazzinoResi').DataTable(
                { "paging": false, responsive: true }
            );


        }
    });

}