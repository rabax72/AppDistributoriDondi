$(function () {
    
    $("#ResiDataDa").datepicker({
        dateFormat: "dd-mm-yy"
    });
    $("#ResiDataA").datepicker({
        dateFormat: "dd-mm-yy"
    });

    $(".filtraResi").on('click', function () {
        var dataDa = $("#ResiDataDa").val();
        if (dataDa != '') {
            dataDa = stringToDate(dataDa, "dd-MM-yyyy", "-");
        } else {
            dataDa = stringToDate("01-01-2000", "dd-MM-yyyy", "-");
        }

        var dataA = $("#ResiDataA").val();
        if (dataA != '') {
            dataA = stringToDate(dataA, "dd-MM-yyyy", "-");
        } else {
            dataA = stringToDate("01-01-2100", "dd-MM-yyyy", "-");
        }
        GetProdottiInMagazzinoResiFiltrato(dataDa, dataA);
    });

});

function RiepilogoVenduto() {

    $('.DettRiepilogoVenduto').html('');
    location.hash = "RiepilogoVenduto";
}

function VenditaDiretta(DataDa, DataA) {
   // location.hash = "VenditaDiretta";
    
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

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiVendutiDirettamente').DataTable(
                { "paging": false }
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
        url: urlGetElencoProdotti,
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
                dettaglio = dettaglio + '<td><a href="javascript:GetVendutoByIdProdotto(' + risultati[i].idProdotto + ', null, null);"><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></a></td>';
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

function GetVendutoByIdProdotto(idProdotto, DataDa, DataA) {
    // location.hash = "VenditaDiretta";
    //DataDa = stringToDate(DataDa, "dd-MM-yyyy", "-");
    //DataA = stringToDate(DataA, "dd-MM-yyyy", "-");

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetVendutoByIdProdotto,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, DataDa: DataDa, DataA: DataA }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var dettaglio = '<div>' +
                                'Data Da <input type="text" id="VendutiByIdProdottoDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutiByIdProdottoDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutiByIdProdotto" value="Filtra" class="filtraVendutiByIdProdotto">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdProdotto" class="display" cellspacing="0" width="100%">' +
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

            console.log(dettaglio);

            $('.DettRiepilogoVenduto').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdProdotto').DataTable(
                { "paging": false }
            );
            
            $('.filtraVendutiByIdProdotto').click(function () {
                var DataDa = stringToDate($('#VendutiByIdProdottoDataDa').val(), "dd-MM-yyyy", "-");
                var DataA = stringToDate($('#VendutiByIdProdottoDataA').val(), "dd-MM-yyyy", "-");
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                GetVendutoByIdProdotto(idProdotto, DataDa, DataA);
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

            for (var i = 0; i < risultati.length; i++) {
                var indirizzo = risultati[i].indirizzo;
                var desc = '\'' + risultati[i].descrizione + '\'';
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdDistributore(' + risultati[i].idDistributore + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
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
    // location.hash = "VenditaDiretta";

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

            var dettaglio = '<h1>Filtro per Distributore: ' + descrizione + '</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="VendutoDitributoreDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="VendutoDitributoreDataA"  class="calendario" data-theme="a" /> <button id="filtraVendutoDitributore" value="Filtra" class="filtraVendutoDitributore">Filtra</button>' +
                            '</div><table id="tabellaVendutiByIdDistributore" class="display" cellspacing="0" width="100%">' +
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

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdDistributore').DataTable(
                { "paging": false }
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
                dettaglio = dettaglio + '<li><a href="javascript:GetVendutoByIdCliente(' + risultati[i].idCliente + ', ' + desc + ', null, null);" class="ui-btn ui-btn-icon-right ui-icon-carat-r" >' + risultati[i].descrizione + '<br><span class="miniText">' + indirizzo + '</span></a></li>';
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
    // location.hash = "VenditaDiretta";

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

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaVendutiByIdCliente').DataTable(
                { "paging": false }
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
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Data Reso</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Data Reso</th>' +
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
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneDistributore + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneCliente + '</td>';
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].dataInserimento) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoResi').html(dettaglio);            

            var table = $('#tabellaProdottiMagazzinoResi').DataTable(
                { "paging": false }
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
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Data Reso</th>' +
                                            '<th>Operatore</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tfoot>' +
                                        '<tr>' +
                                            '<th>Foto</th>' +
                                            '<th>Descrizione</th>' +
                                            '<th>Quantità</th>' +
                                            '<th>Prezzo Tot.</th>' +
                                            '<th>Distributore</th>' +
                                            '<th>Cliente</th>' +
                                            '<th>Data Reso</th>' +
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
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneDistributore + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizioneCliente + '</td>';
                dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].dataInserimento) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].operatoreNome + ' ' + risultati[i].operatoreCognome + '</td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.DettRiepilogoResi').html(dettaglio);

            var table = $('#tabellaProdottiMagazzinoResi').DataTable(
                { "paging": false }
            );


        }
    });

}