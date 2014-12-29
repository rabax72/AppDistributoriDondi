$(function () {

   //ElencoDistributori();

});


function GetSituazioneDistributore(IdDistributore) {
    location.hash = "formDettaglioDistributore";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetSituazioneDistributore",
        //url: "WS_OrdinanzeApp.asmx/Hello",
        //url: "WebServiceAppDondi.asmx/GetSituazioneDistributore",
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
            console.log(risultati);
            //$(".menuPrincipale").hide();
            

            var dettaglio = '<table id="tabellaDettaglioDistributore" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th></th>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +                                                
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th></th>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quantita</th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';

            for (var i = 0; i < risultati.length; i++) {
               
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td class="details-control" data-id="' + i + '"></td>';
                dettaglio = dettaglio + '<td><img src="/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';                               

                dettaglio = dettaglio + '</tr>';
            }
            dettaglio = dettaglio + '</tbody> </table>';

            $('.DettaglioDistributore').html(dettaglio);
            //$('#tabellaRisultatiResidenti').DataTable();

            var table = $('#tabellaDettaglioDistributore').DataTable(
                { "paging": false }
            );

            //$(".details-control").on('click', function () {
            //    //$(".details-control").click(function () {
            //    var tr = $(this).closest('tr');
            //    var row = table.row(tr);
            //    //console.log('entrato');
            //    if (row.child.isShown()) {
            //        // This row is already open - close it
            //        //console.log('chiudi');
            //        $('div.sliderPraticheEdilizia', row.child()).slideUp(function () {
            //            row.child.hide();
            //            tr.removeClass('shown');
            //        });
            //    }
            //    else {
            //        // Open this row
            //        //console.log('apri');
            //        var indice = $(this).data('id');
            //        //console.log($(this).data('id'));
            //        row.child(formatPraticheEdilizia(risultati[indice]), 'no-padding').show();
            //        tr.addClass('shown');

            //        $('div.sliderPraticheEdilizia', row.child()).slideDown();
            //    }
            //});

            //$("#tuttiDistributori").html(distributori);

        }

    });

}


        