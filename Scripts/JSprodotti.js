$(function () {

    $("#inserisciProdotto").click(function () {
        var descrizione = $("#fDescrizione").val();
        var prezzo = $("#fPrezzo").val();
        var aliquota = $("#fAliquota").val();
        var dataProd = $("#dataProd").val();
        var dataScad = $("#dataScad").val();
        var dataInserimento = $("#dataInserimento").val();
        var dataModifica = $("#dataModifica").val();
        
        //console.log(descrizione);           

        $('#risultatiProdotti').html('Inserimento in corso...');

        var col = $('.formInserimentoProdotto');
        col.collapsible("collapse");

        insertProdotto(descrizione, prezzo, aliquota, dataProd, dataScad, dataInserimento, dataModifica);

    });

    Dropzone.options.myDropzone = {
        // $("#myDropzone").dropzone({
        autoProcessQueue: false,
        maxFilesize: 1,
        uploadMultiple: false

    }
});

function GestioneProdotti() {
    location.hash = "formInserimentoProdotto";

}
    
function insertProdotto(descrizione, prezzo, aliquota, dataProd, dataScad, dataInserimento, dataModifica) {
    //$("#footerRisultati").loader({ html: "<span class='ui-icon ui-icon-loading'><img src='jquery-logo.png' /><h2>is loading for you ...</h2></span>" });
    var risultati;

    //console.log('parametro descrizione=' + descrizione);

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/InsertProdotto",        
        url: urlInsertProdotto,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ descrizione: descrizione, prezzo: prezzo, aliquota: aliquota, dataProduzione: dataProd, dataScadenza: dataScad, dataInserimento: dataInserimento, dataUltimaMod: dataModifica }),
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

            //var dettaglio = 'Prodotto Correttamente Inserito!';
                                    
            $('.risultatiProdotti').html(risultati);
            //$('#headerRicercaOrdinanze').html('Risultati: ' + (risultati.length + 1));
            $('#totRisultatiProdotti').html('Risultati Inseriti: ' + risultati);
            //$('#footerRisultatiOrdinanze').html('Risultati Trovati: ' + (risultati.length));

        }

    });
    
}

        