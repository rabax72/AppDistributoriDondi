function GetMarkReport() {
    location.hash = "MarkReport";

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlGetMarkReport,
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
            var dettaglio = '<h1>Riepilogo Mark per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="MarkReportDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="MarkReportDataA"  class="calendario" data-theme="a" /> <button id="filtraMarkReport" value="Filtra" class="filtraMarkReport">Filtra</button>' +
                            '</div><table id="tabellaMarkReport" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Distr.</th>' +
                                            '<th>Cod. Gett.</th>' +
                                            '<th>Venduto</th>' +
                                            '<th>Inviato in cassa </th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Data Ril. prec.</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleVenduto = 0;
            var totaleInviatoCassa = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td>' + risultati[i].nomeDistributore + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].codiceGettoniera + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].venduto2 + ' </td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].inviatoInCassa2 + ' </td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataRilevazione2) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataRilevazionePrecedente2) + '</td>';
                dettaglio = dettaglio + '</tr>';
                var totInv = risultati[i].inviatoInCassa;
                //totInv = totInv.replace("$ ", "");
                //totInv = totInv.replace(".", ",");
                totaleInviatoCassa = (totaleInviatoCassa + parseFloat(totInv / 100));
                totaleVenduto = (totaleVenduto + parseFloat((risultati[i].venduto)/100));
                //console.log(totaleInviatoCassa)
            }

            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Distr.</th>' +
                                            '<th>Cod. Gett.</th>' +                                            
                                            '<th>Totale Venduto: ' + totaleVenduto.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '</th>' +
                                            '<th>Totale Inviato in cassa: ' + totaleInviatoCassa.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Data Ril. prec.</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettMarkReport').html(dettaglio);
            
            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaMarkReport').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );

            $('.filtraMarkReport').click(function () {
                //var DataDa = stringToDate($('#MarkReportDataDa').val(), "dd-MM-yyyy", "-");
                //var DataA = stringToDate($('#MarkReportDataA').val(), "dd-MM-yyyy", "-");
                var DataDa = $('#MarkReportDataDa').val();
                var DataA = $('#MarkReportDataA').val();
                //alert("filtraVendutiByIdProdotto" + DataDa + " " + DataA);
                filterMarkReport(DataDa, DataA);
            });

        }
    });

}

function filterMarkReport(DataDa, DataA) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlFilterMarkReport,
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

            var dettaglio = '<h1>Riepilogo Mark per Tutti i Distributori</h1>' +
                            '<div>' +
                                'Data Da <input type="text" id="MarkReportDataDa"  class="calendario" data-theme="a" /> Data A <input type="text" id="MarkReportDataA"  class="calendario" data-theme="a" /> <button id="filtraMarkReport" value="Filtra" class="filtraMarkReport">Filtra</button>' +
                            '</div><table id="tabellaMarkReport" class="display" cellspacing="0" width="100%">' +
                                    '<thead>' +
                                        '<tr>' +
                                            '<th>Distr.</th>' +
                                            '<th>Cod. Gett.</th>' +
                                            '<th>Venduto</th>' +
                                            '<th>Inviato in cassa </th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Data Ril. prec.</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
            var prezzoTot = 0;
            var totaleVenduto = 0;
            var totaleInviatoCassa = 0;
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td>' + risultati[i].nomeDistributore + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].codiceGettoniera + '</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].venduto2 + ' </td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].inviatoInCassa2 + ' </td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataRilevazione2) + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataRilevazionePrecedente2) + '</td>';
                dettaglio = dettaglio + '</tr>';
                var totInv = risultati[i].inviatoInCassa;
                //totInv = totInv.replace("$ ", "");
                //totInv = totInv.replace(".", ",");
                totaleInviatoCassa = (totaleInviatoCassa + parseFloat(totInv / 100));
                totaleVenduto = (totaleVenduto + parseFloat((risultati[i].venduto) / 100));
                //console.log(totaleInviatoCassa)
            }

            dettaglio = dettaglio + '</tbody>' + '<tfoot>' +
                                        '<tr>' +
                                            '<th>Distr.</th>' +
                                            '<th>Cod. Gett.</th>' +
                                            '<th>Totale Venduto: ' + totaleVenduto.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '</th>' +
                                            '<th>Totale Inviato in cassa: ' + totaleInviatoCassa.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '</th>' +
                                            '<th>Data Ril.</th>' +
                                            '<th>Data Ril. prec.</th>' +
                                        '</tr>' +
                                    '</tfoot>' + ' </table>';

            //console.log(dettaglio);

            $('.DettMarkReport').html(dettaglio);

            $(".calendario").datepicker({
                dateFormat: "dd-mm-yy"
            });

            var table = $('#tabellaMarkReport').DataTable(
                {
                    "paging": false, responsive: true, dom: 'T<"clear">lfrtip'
                }
            );
        }
    });
}