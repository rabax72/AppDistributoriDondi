$(function () {
    
});

function ElencoProdottiInMagazzinoPerVenditaDiretta() {
    location.hash = "VenditaDiretta";
    
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInMagazzino",        
        url: urlGetProdottiInMagazzino,
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


            var dettaglio = '<table id="tabellaProdottiInMagazzinoPerVenditaDiretta" class="display" cellspacing="0" width="100%">' +
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
                dettaglio = dettaglio + '<td><a href="#" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active venditaDiretta">Vendi</a> </td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);

            $('.MercePerVenditaDiretta').html(dettaglio);

            $(".dataDDT").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaProdottiInMagazzinoPerVenditaDiretta').DataTable(
                { "paging": false }
            );

            $(".venditaDiretta").on('click', function () {

                var IdMagazzino = $(this).attr('data-IdMagazzino');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');
                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();
                var quantitaVenduti = $(this).closest('td').prev('td')[0].children[0].value;
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

                var quantitaRimasti = (quantitaAttuale - quantitaVenduti);
                //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleVenduti = (prezzo * quantitaVenduti);
                var idOperatore = $(this).attr('data-idOperatore');
                //var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));
                var numeroLotto = parseJsonDateToJsDate($(this).attr('data-numeroLotto'));
                //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaVenduti=' + quantitaVenduti + ' isUint8(parseInt(quantitaVenduti))=' + isUint8(parseInt(quantitaVenduti)) + ' numeroDDT=' + numeroDDT + ' dataDDT=' + dataDDT);
                //return;

                if (quantitaVenduti == "" || isUint8(parseInt(quantitaVenduti)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaVenduti) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");
                    $(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(this).prev().removeClass("evidenziaErrore");
                }

                storicizzaProdottoInMagazzino(IdMagazzino, idOperatore);
                
                AggiornaQuantitaProdottiInMagazzino(idProdotto, quantitaRimasti, prezzoTotaleRimasti, idOperatore, numeroLotto);

                var idDistributore = 0;
                var idCliente = 0;
                
                //console.log(idProdotto + ', '+idProdotto + ', '+idDistributore + ', '+idCliente + ', '+quantitaVenduti + ', '+prezzoTotaleVenduti + ', '+idOperatore + ', '+numeroDDT + ', '+dataDDT );
                //return;
                AggiornaQuantitaProdottiVenduti(idProdotto, idDistributore, idCliente, quantitaVenduti, prezzoTotaleVenduti, idOperatore, true, numeroDDT, dataDDT, numeroLotto);

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

