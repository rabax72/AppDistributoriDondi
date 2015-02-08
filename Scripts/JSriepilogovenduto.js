$(function () {
    
});

function VenditaDiretta() {
   // location.hash = "VenditaDiretta";
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",                
        url: urlGetVendutoDirettamente,
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


            var dettaglio = '<table id="tabellaProdottiVendutiDirettamente" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Operatore</th>' +                                            
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].prezzoTotale + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].numeroDDT + '</td>';
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiVendutiDirettamente').DataTable(
                { "paging": false }
            );

            
        }
    });
    

}

function VendutoPerProdotto() {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetElencoProdotti,
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

            var dettaglio = '<h1>Filtra per prodotto</h1><table id="tabellaElencoProdotti" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +                                            
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Data Scadenza</th>' +                                            
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Prezzo</th>' +
                                            '<th>Aliquota</th>' +
                                            '<th>Data Scadenza</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdotto(' + risultati[i].idProdotto + ');"><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></a></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].aliquota + '</td>';                
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].dataScadenza) + '</td>';                
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaElencoProdotti').DataTable(
                { "paging": false }
            );


        }
    });


}

function GetVendutoByIdProdotto(idProdotto) {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdProdotto,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);


            var dettaglio = '<table id="tabellaVendutiByIdProdotto" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].prezzoTotale + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].numeroDDT + '</td>';
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneDistributore + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneCliente + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdProdotto').DataTable(
                { "paging": false }
            );


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
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<h1>Filtra per Distrinutore:</h1><ul data-role="listview" data-filter="true" data-filter-placeholder="Cerca il distributore..." data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';

            for (var i = 0; i < risultati.length; i++) {
                var indirizzo = risultati[i].indirizzo;
                var desc = '\'' + risultati[i].descrizione + '\'';
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdDistributore(' + risultati[i].idDistributore + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
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

function GetVendutoByIdDistributore(idDistributore) {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdDistributore,
        cache: false,
        async: true,
        data: JSON.stringify({ idDistributore: idDistributore }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<table id="tabellaVendutiByIdDistributore" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +                                            
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Distributore</th>' +                                            
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].numeroDDT + '</td>';
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneDistributore + '</td>';                
                dettaglio = dettaglio + '<td>' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdDistributore').DataTable(
                { "paging": false }
            );

        }
    });

}

function VendutoPerCliente() {
    // location.hash = "VenditaDiretta";

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
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdCliente(' + risultati[i].idCliente + ');" class="ui-btn ui-btn-icon-right ui-icon-carat-r" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
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

function GetVendutoByIdCliente(idCliente) {
    // location.hash = "VenditaDiretta";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdCliente,
        cache: false,
        async: true,
        data: JSON.stringify({ idCliente: idCliente }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<table id="tabellaVendutiByIdCliente" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>N° DDT</th>' +
                                            '<th>Data DDT</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</tfoot>' +
                                    '<tbody>';

            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].prezzoTotale + ' €</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].numeroDDT + '</td>';
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].dataDDT) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneCliente + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdCliente').DataTable(
                { "paging": false }
            );

        }
    });

}