$(function () {
    
});

function GestioneMagazzino() {
    location.hash = "gestioneMagazzino";
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/urlGetProdottiDaGestireInMagazzino",        
        url: urlGetProdottiDaGestireInMagazzino,
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
            //$(".menuPrincipale").hide();

            var dettaglio = '<table id="tabellaProdottiDaGestire" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Prezzo</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>Carica</th>' +
                                                '<th>Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Prezzo</th>' +
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
            //var numeriLotti = '';
            //var quantitaGiacente = '';
            //var numeriDDT = '';
            //var dateDDT = '';
            //var noteDDT = '';
            var q = 0;
            for (var i = 0; i < risultati.length; i++) {
                
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + '</td>';
                dettaglio = dettaglio + '<td class="storicoVenduto">' + risultati[i].prezzo + ' €</td>';
                dettaglio = dettaglio + '<td class="quantita">' + risultati[i].quantita + '</td>';
                dettaglio = dettaglio + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                if (parseInt(risultati[i].quantita) > 0) {
                    dettaglio = dettaglio + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';
                }
                else {
                    dettaglio = dettaglio + '<td></td>';
                }
                

                dettaglio = dettaglio + '</tr>';
                
                //idProd = risultati[i].idProdotto;
                //numLotto = risultati[i].numeroLotto;
                //quantita = risultati[i].quantita;
                
                //if (idProd != idProdOld) {
                //    quantitaTot = quantita;
                //    if (quantita > 0) {                        
                //        numeriLotti = '<option>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</option>';
                //        quantitaGiacente = '<option>' + risultati[i].quantita + '</option>';
                //        numeriDDT = '<option>' + risultati[i].numeroDDT + '</option>';
                //        dateDDT = '<option>' + parseJsonDateLettura(risultati[i].dataDDT) + '</option>';
                //        noteDDT = '<option>' + risultati[i].Note + '</option>';
                //    }                    
                //    rigaDettaglio[i] = '<tr>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + risultati[i].quantita + '</td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeriLotti="' + numeriLotti + '" data-quantitaGiacente="' + quantitaGiacente + '" data-numeriDDT="' + numeriDDT + '" data-dateDDT="' + dateDDT + '" data-noteDDT="' + noteDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                //} else {
                //    rigaDettaglio[i - 1] = '';
                //    quantitaTot = (quantitaTot + quantita);
                //    if (quantita > 0) {                        
                //        numeriLotti = numeriLotti + '<option>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</option>';
                //        quantitaGiacente = quantitaGiacente + '<option>' + risultati[i].quantita + '</option>';
                //        numeriDDT = numeriDDT + '<option>' + risultati[i].numeroDDT + '</option>';
                //        dateDDT = dateDDT + '<option>' + parseJsonDateLettura(risultati[i].dataDDT) + '</option>';
                //        noteDDT = noteDDT + '<option>' + risultati[i].Note + '</option>';
                //    }                    
                //    rigaDettaglio[i] = '<tr>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + quantitaTot + '</td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupCaricaMerceInMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '" data-idProdotto="' + risultati[i].idProdotto + '" data-foto="' + risultati[i].foto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaCaricareInMagazzino">Carica</a></td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeriLotti="' + numeriLotti + '" data-quantitaGiacente="' + quantitaGiacente + '" data-numeriDDT="' + numeriDDT + '" data-dateDDT="' + dateDDT + '" data-noteDDT="' + noteDDT + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';
                //    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';                   
                //}

                //idProdOld = risultati[i].idProdotto;
                //numLottoOld = risultati[i].numeroLotto;
                //quantitaOld = risultati[i].quantita;
            }
            //dettaglio = dettaglio + '</tbody> </table>';

            //console.log(dettaglio);
            //var righe = '';

            //for (var i = 0; i < risultati.length; i++) {
            //    righe = righe + rigaDettaglio[i];
            //}

            //dettaglio = dettaglio + righe + '</tbody> </table>';

            $('#elencoGestioneMagazzino').html(dettaglio);

            var table = $('#tabellaProdottiDaGestire').DataTable(
                { "paging": false }
            );

            $(".scegliProdDaCaricareInMagazzino").on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                //var IdMagazzino = $(this).attr('data-IdMagazzino');
                var prezzo = $(this).attr('data-prezzo');
                //var lblQ = '#quantitaInMagazzino' + IdMagazzino;
                //var quantitaAttuale = $(lblQ).text();
                var tdQuantita = $(this).closest('td').prev('td');
                var quantitaAttuale = $(this).closest('td').prev('td').text();
                var idOperatore = localStorage.idOperatore;
                var foto = $(this).attr('data-foto');

                var finestraDati = '<div style="padding:10px 20px;">';
                finestraDati = finestraDati + '<h3>Carica in Magazzino</h3>';
                finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + foto + '">';
                finestraDati = finestraDati + '<label for="quantitaProdDaCaricareInMagazzino">Quantita:</label>';
                finestraDati = finestraDati + '<input type="number" id="quantitaProdDaCaricareInMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="numeroLotttoCaricareinMagazzino">Numero Lotto</label>';
                finestraDati = finestraDati + '<input type="text" id="numeroLotttoCaricareinMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="numeroDDTCaricareinMagazzino">Numero DDT</label>';
                finestraDati = finestraDati + '<input type="number" id="numeroDDTCaricareinMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="dataDDTCaricareinMagazzino">Data DDT:</label>';
                finestraDati = finestraDati + '<input type="text" id="dataDDTCaricareinMagazzino" data-theme="a">';
                finestraDati = finestraDati + '<label for="noteCaricareinMagazzino">Note:</label>';
                finestraDati = finestraDati + '<textarea cols="40" rows="5" id="noteCaricareinMagazzino" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"></textarea>';
                finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdottoInMagazzino">Carica</a>';
                finestraDati = finestraDati + '</div>';

                $("#popupCaricaMerceInMagazzino").html(finestraDati);

                $("#numeroLotttoCaricareinMagazzino").datepicker({
                    dateFormat: "dd-mm-yy"
                });
                $("#dataDDTCaricareinMagazzino").datepicker({
                    dateFormat: "dd-mm-yy"
                });


                $(".caricaProdottoInMagazzino").on('click', function () {
                    var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();
                    var quantitaCaricati = $("#quantitaProdDaCaricareInMagazzino").val();
                    var numeroDDT = $("#numeroDDTCaricareinMagazzino").val();
                    var dataDDT = $("#dataDDTCaricareinMagazzino").val();
                    
                    if (numeroLotto == '') {
                        alert('Numero Lotto è un campo obbligatorio!');
                        return;
                    }
                    numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");

                    if (quantitaCaricati == '' || isUint8(parseInt(quantitaCaricati)) == false) {
                        alert("Scegli un valore Numerico prima di caricare");
                        return;
                    }

                    if (numeroDDT == '') {
                        numeroDDT = 0;
                    }

                    if (dataDDT == '') {
                        dataDDT = new Date().toDateString();                       
                        dataDDT = new Date(dataDDT);                        
                    } else {
                        dataDDT = stringToDate(dataDDT, "dd-MM-yyyy", "-");
                    }

                    var note = $("#noteCaricareinMagazzino").val();
                    var quantitaTotale = (parseInt(quantitaAttuale) + parseInt(quantitaCaricati));
                    //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
                    //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                    var prezzoTotaleCaricati = (prezzo * quantitaCaricati);

                    //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
                    //return;

                    CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, note);

                    //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
                    
                    //var labelQuantita = $(lblQ);
                    //console.log(labelQuantita);                   
                    tdQuantita.animate({
                        backgroundColor: "green",
                        color: "#000"
                    }, 1000);
                    tdQuantita.html(quantitaTotale);

                });


            });

            //$(".scegliProdDaScaricareDaMagazzino").on('click', function () {
            //    var riga = $(this).closest('td').next('tr');
            //    console.log(riga);
            //    riga.apppend('<tr><td colspace="5">Lotti presenti</td></tr>');
            //});

            $(".scegliProdDaScaricareDaMagazzino").on('click', function () {
                var idProdotto = $(this).attr('data-idProdotto');
                var quantitaAttuale = $(this).closest('td').prev('td').prev('td');

                //var IdMagazzino = $(this).attr('data-IdMagazzino');
                //var prezzo = $(this).attr('data-prezzo');
                //var lblQ = '#quantitaInMagazzino' + IdMagazzino;
                //var quantitaAttuale = $(lblQ).text();
                //var idOperatore = localStorage.idOperatore;
                //var foto2 = $(this).attr('data-foto');
                //var numeroLotto = $(this).attr('data-numeroLotto');
                //var numLotti = $(this).attr('data-numeriLotti');
                //var quantitaGiacente = $(this).attr('data-quantitaGiacente');
                //var numsDDT = $(this).attr('data-numeriDDT');
                //var datesDDT = $(this).attr('data-dateDDT');
                //var notesDDT = $(this).attr('data-noteDDT');
                ////console.log('idProdotto=' + idProdotto + ' IdMagazzino=' + IdMagazzino + ' prezzo=' + prezzo + ' quantitaAttuale=' + quantitaAttuale + ' idOperatore=' + idOperatore + ' foto2=' + foto2 + ' numeroLotto=' + numeroLotto);

                GetProdottiDaScaricareDaMagazzino(idProdotto, quantitaAttuale);
               
            });
        }

    });

}

function cambiaQuantitaGiacente(obj) {
    var lotto = obj.selectedIndex;
    //console.log(lotto);
    $('.quantitaGiacenteInMagazzino').prop("selectedIndex", lotto);
    $('#numeroDDTScaricareinMagazzino').prop("selectedIndex", lotto);
    $('#dataDDTScaricareinMagazzino').prop("selectedIndex", lotto);
    $('#noteScaricareinMagazzino').prop("selectedIndex", lotto);    
}

function GetProdottiDaScaricareDaMagazzino(idProdotto, quantitaAttuale) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiDaScaricareDaMagazzino",        
        url: urlGetProdottiDaScaricareDaMagazzino,
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

            var numeriLotti = '';
            var quantitaGiacente = '';
            var numeriDDT = '';
            var dateDDT = '';
            var noteDDT = '';
            var foto2 = '';
            for (var i = 0; i < risultati.length; i++) {
                if (risultati[i].quantita > 0) {
                    numeriLotti = numeriLotti + '<option>' + parseJsonDateLettura(risultati[i].numeroLotto) + '</option>';
                    quantitaGiacente = quantitaGiacente + '<option>' + risultati[i].quantita + '</option>';
                    numeriDDT = numeriDDT + '<option>' + risultati[i].numeroDDT + '</option>';
                    dateDDT += '<option>' + parseJsonDateLettura(risultati[i].dataDDT) + '</option>';
                    noteDDT = noteDDT + '<option>' + risultati[i].Note + '</option>';
                    foto2 = risultati[i].foto;
                    var prezzo = risultati[i].prezzo;
                }
                //else {
                //    var finestraDati = '<div style="padding:10px 20px;">';
                //    finestraDati = finestraDati + '<h3>Non è possibile scaricare un prodotto che risulta a 0 nel magazzino!</h3>';
                //    finestraDati = finestraDati + '</div>';

                //    $("#popupScaricaMerceDaMagazzino").html(finestraDati);
                //    return;
                //}
            }

            var finestraDati = '<div style="padding:10px 20px;">';
            finestraDati = finestraDati + '<h3>Scarica da Magazzino</h3>';
            finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + foto2 + '">';
            finestraDati = finestraDati + '<br><br>Scegli il Lotto da scaricare: <select onchange="cambiaQuantitaGiacente(this)" class="lottoSpecifico">' + numeriLotti + '</select>';
            finestraDati = finestraDati + '<label for="quantitaProdDaScaricareDaMagazzino">Quantita da scaricare:</label>';
            finestraDati = finestraDati + '<input type="number" id="quantitaProdDaScaricareDaMagazzino" data-theme="a">';
            finestraDati = finestraDati + '<br><br>Giacenza: <select disabled class="quantitaGiacenteInMagazzino">' + quantitaGiacente + '</select><br><br>';
            finestraDati = finestraDati + '<label for="numeroDDTScaricareinMagazzino">Numero DDT</label>';
            finestraDati = finestraDati + '<select disabled id="numeroDDTScaricareinMagazzino">' + numeriDDT + '</select>';
            finestraDati = finestraDati + '<label for="dataDDTScaricareinMagazzino">Data DDT:</label>';
            finestraDati = finestraDati + '<select disabled id="dataDDTScaricareinMagazzino">' + dateDDT + '</select>';
            finestraDati = finestraDati + '<label for="noteScaricareinMagazzino">Note:</label>';
            finestraDati = finestraDati + '<select disabled id="noteScaricareinMagazzino">' + noteDDT + '</select>';
            finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdottoDaMagazzino">Scarica</a>';
            finestraDati = finestraDati + '</div>';

            //console.log(finestraDati);

            $("#popupScaricaMerceDaMagazzino").html(finestraDati);

            //$("#numeroLotttoCaricareinMagazzino").datepicker({
            //    dateFormat: "dd-mm-yy"
            //});
            $("#dataDDTCaricareinMagazzino").datepicker({
                dateFormat: "dd-mm-yy"
            });

            $(".scaricaProdottoDaMagazzino").on('click', function () {
                //var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();
                var quantitaDaScaricare = $("#quantitaProdDaScaricareDaMagazzino").val();
                if (quantitaDaScaricare == "" || isUint8(parseInt(quantitaDaScaricare)) == false) {
                    alert("Scegli un valore Numerico prima di scaricare");
                    //$(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                }
                var giacenzaPerLotto = $(".quantitaGiacenteInMagazzino").val();
                if (parseInt(quantitaDaScaricare) > parseInt(giacenzaPerLotto)) {
                    alert("Non puoi scaricare più di quanto presente in magazzino!");
                    return;
                }
                var numeroDDT = $("#numeroDDTCaricareinMagazzino").val();
                var dataDDT = $("#dataDDTCaricareinMagazzino").val();
                

                dataDDT = stringToDate(dataDDT, "dd/MM/yyyy", "/");
                var note = $("#noteCaricareinMagazzino").val();
                var quantitaTotale = (parseInt(giacenzaPerLotto) - parseInt(quantitaDaScaricare));
                var totaleAggiornato = (parseInt(quantitaAttuale.text()) - parseInt(quantitaDaScaricare));
                //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotale = (prezzo * quantitaTotale);

                var lottoSpecifico = $('.lottoSpecifico').val();
                //console.log(quantitaDaScaricare);

                

                

                //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
                //return;

                //numeroLotto = parseJsonDateToJsDate(numeroLotto);
                numeroLotto = stringToDate(lottoSpecifico, 'dd/MM/yyyy', '/');
                var idOperatore = localStorage.idOperatore;

                SmaltiscoProdottiDaMagazzino(idProdotto, quantitaTotale, prezzoTotale, numeroLotto, idOperatore, numeroDDT, dataDDT, note, true);

                //dataDDT = null;
                //console.log(' idProdotto=' + idProdotto + ' quantitaDaScaricare=' + quantitaDaScaricare + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto + ' numeroDDT=' + numeroDDT + ' dataDDT=' + dataDDT + ' note=' + note);


                //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');

                //var labelQuantita = $(lblQ);
                //console.log(labelQuantita);                   
                quantitaAttuale.animate({
                    backgroundColor: "green",
                    color: "#000"
                }, 1000);
                quantitaAttuale.html(totaleAggiornato);

            });

            }
        });
}

function SituazioneMagazzino() {
    location.hash = "situazioneMagazzino";
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
                                                '<th>N° Lotto</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>Numero DDT</th>' +
                                                '<th>Data DDT</th>' +                                                
                                                '<th>Note</th>' +
                                                //'<th>Scarica</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>N° Lotto</th>' +
                                                '<th>Giacenza</th>' +
                                                '<th>Numero DDT</th>' +
                                                '<th>Data DDT</th>' +
                                                '<th>Note</th>' +
                                                //'<th>Scarica</th>' +
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
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + risultati[i].quantita + '</td>';

                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].numeroDDT + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                    rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].Note + '</td>';
                    //rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + parseJsonDateLettura(risultati[i].dataDDT) + '" data-note="' + risultati[i].Note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';

                    rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                } else {
                    if (numLotto != numLottoOld) {
                        quantitaTot = quantita;
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + risultati[i].quantita + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].numeroDDT + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].Note + '</td>';
                       // rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + parseJsonDateLettura(risultati[i].dataDDT) + '" data-note="' + risultati[i].Note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '</tr>';
                    } else {
                        rigaDettaglio[i - 1] = '';
                        quantitaTot = (quantitaTot + quantita);
                        rigaDettaglio[i] = '<tr>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td>' + risultati[i].descrizione + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="medioGrande">' + parseJsonDateLettura(risultati[i].numeroLotto) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="quantita" id="quantitaInMagazzino' + risultati[i].IdMagazzino + '">' + quantitaTot + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].numeroDDT + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + parseJsonDateLettura(risultati[i].dataDDT) + '</td>';
                        rigaDettaglio[i] = rigaDettaglio[i] + '<td class="storicoVenduto">' + risultati[i].Note + '</td>';
                        //rigaDettaglio[i] = rigaDettaglio[i] + '<td><a href="#popupScaricaMerceDaMagazzino" data-rel="popup" data-position-to="window" data-IdMagazzino="' + risultati[i].IdMagazzino + '"  data-idProdotto="' + risultati[i].idProdotto + '" data-quantita="' + risultati[i].quantita + '" data-prezzo="' + risultati[i].prezzo + '" data-foto="' + risultati[i].foto + '" data-numeroLotto="' + risultati[i].numeroLotto + '" data-numeroDDT="' + risultati[i].numeroDDT + '" data-dataDDT="' + parseJsonDateLettura(risultati[i].dataDDT) + '" data-note="' + risultati[i].Note + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active scegliProdDaScaricareDaMagazzino">Scarica</a> </td>';
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

            $('#elencoSituazioneMagazzino').html(dettaglio);

            var table = $('#tabellaProdottiInMagazzino').DataTable(
                { "paging": false }
            );           

            //$(".scegliProdDaCaricareInMagazzino").on('click', function () {
            //    var idProdotto = $(this).attr('data-idProdotto');
            //    var IdMagazzino = $(this).attr('data-IdMagazzino');
            //    var prezzo = $(this).attr('data-prezzo');
            //    var lblQ = '#quantitaInMagazzino' + IdMagazzino;
            //    var quantitaAttuale = $(lblQ).text();
            //    var idOperatore = $(this).attr('data-idOperatore');
            //    var foto = $(this).attr('data-foto');

            //    var finestraDati = '<div style="padding:10px 20px;">';
            //    finestraDati = finestraDati + '<h3>Carica in Magazzino</h3>';
            //    finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + foto + '">';
            //    finestraDati = finestraDati + '<label for="quantitaProdDaCaricareInMagazzino">Quantita:</label>';
            //    finestraDati = finestraDati + '<input type="number" id="quantitaProdDaCaricareInMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="numeroLotttoCaricareinMagazzino">Numero Lotto</label>';
            //    finestraDati = finestraDati + '<input type="text" id="numeroLotttoCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="numeroDDTCaricareinMagazzino">Numero DDT</label>';
            //    finestraDati = finestraDati + '<input type="number" id="numeroDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="dataDDTCaricareinMagazzino">Data DDT:</label>';
            //    finestraDati = finestraDati + '<input type="text" id="dataDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="noteCaricareinMagazzino">Note:</label>';
            //    finestraDati = finestraDati + '<textarea cols="40" rows="5" id="noteCaricareinMagazzino" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"></textarea>';
            //    finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdottoInMagazzino">Carica</a>';
            //    finestraDati = finestraDati + '</div>';

            //    $("#popupCaricaMerceInMagazzino").html(finestraDati);

            //    $("#numeroLotttoCaricareinMagazzino").datepicker({
            //        dateFormat: "dd-mm-yy"
            //    });
            //    $("#dataDDTCaricareinMagazzino").datepicker({
            //        dateFormat: "dd-mm-yy"
            //    });
                         

            //    $(".caricaProdottoInMagazzino").on('click', function () {
            //        var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();                    
            //        var quantitaCaricati = $("#quantitaProdDaCaricareInMagazzino").val();
            //        var numeroDDT = $("#numeroDDTCaricareinMagazzino").val();
            //        var dataDDT = $("#dataDDTCaricareinMagazzino").val();

            //        if (numeroLotto == '') {
            //            alert('Numero Lotto è un campo obbligatorio!');
            //            return;
            //        }
            //        numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");

            //        if (quantitaCaricati == '' || isUint8(parseInt(quantitaCaricati)) == false) {
            //            alert("Scegli un valore Numerico prima di caricare");
            //            return;
            //        }

            //        if (numeroDDT == '') {
            //            numeroDDT = null;
            //        } 
                    
            //        if (dataDDT == '') {
            //            dataDDT = null;
            //        } else {
            //            dataDDT = stringToDate(dataDDT, "dd-MM-yyyy", "-");
            //        }
                                        
            //        var note = $("#noteCaricareinMagazzino").val();
            //        var quantitaTotale = (parseInt(quantitaAttuale) + parseInt(quantitaCaricati));
            //        //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
            //        //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
            //        var prezzoTotaleCaricati = (prezzo * quantitaCaricati);                    
                                        
            //        //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
            //        //return;

            //        CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, note);                    

            //        //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');
                    
            //        var labelQuantita = $(lblQ);
            //        //console.log(labelQuantita);                   
            //        labelQuantita.animate({
            //            backgroundColor: "green",
            //            color: "#000"
            //        }, 1000);
            //        labelQuantita.html(quantitaTotale);

            //    });
                
               
            //});
            
            //$(".scegliProdDaScaricareDaMagazzino").on('click', function () {
            //    var idProdotto = $(this).attr('data-idProdotto');
            //    var IdMagazzino = $(this).attr('data-IdMagazzino');
            //    var prezzo = $(this).attr('data-prezzo');
            //    var lblQ = '#quantitaInMagazzino' + IdMagazzino;
            //    var quantitaAttuale = $(lblQ).text();
            //    var idOperatore = $(this).attr('data-idOperatore');
            //    var foto2 = $(this).attr('data-foto');
            //    var numeroLotto = $(this).attr('data-numeroLotto');

            //    console.log('idProdotto=' + idProdotto + ' IdMagazzino=' + IdMagazzino + ' prezzo=' + prezzo + ' quantitaAttuale=' + quantitaAttuale + ' idOperatore=' + idOperatore + ' foto2=' + foto2 + ' numeroLotto=' + numeroLotto);

            //    var finestraDati = '<div style="padding:10px 20px;">';
            //    finestraDati = finestraDati + '<h3>Scarica da Magazzino</h3>';
            //    finestraDati = finestraDati + '<img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + foto2 + '">';
            //    finestraDati = finestraDati + '<label for="quantitaProdDaScaricareDaMagazzino">Quantita:</label>';
            //    finestraDati = finestraDati + '<input type="number" id="quantitaProdDaScaricareDaMagazzino" data-theme="a">';
            //    //finestraDati = finestraDati + '<label for="numeroLotttoCaricareinMagazzino">Numero Lotto</label>';
            //    //finestraDati = finestraDati + '<input type="text" id="numeroLotttoCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<br><br>Numero Lotto: ' + parseJsonDate(numeroLotto) + '<br><br>';
            //    finestraDati = finestraDati + '<label for="numeroDDTCaricareinMagazzino">Numero DDT</label>';
            //    finestraDati = finestraDati + '<input type="number" id="numeroDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="dataDDTCaricareinMagazzino">Data DDT:</label>';
            //    finestraDati = finestraDati + '<input type="text" id="dataDDTCaricareinMagazzino" data-theme="a">';
            //    finestraDati = finestraDati + '<label for="noteCaricareinMagazzino">Note:</label>';
            //    finestraDati = finestraDati + '<textarea cols="40" rows="5" id="noteCaricareinMagazzino" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"></textarea>';
            //    finestraDati = finestraDati + '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-active scaricaProdottoDaMagazzino">Scarica</a>';
            //    finestraDati = finestraDati + '</div>';

            //    $("#popupScaricaMerceDaMagazzino").html(finestraDati);

            //    //$("#numeroLotttoCaricareinMagazzino").datepicker({
            //    //    dateFormat: "dd-mm-yy"
            //    //});
            //    $("#dataDDTCaricareinMagazzino").datepicker({
            //        dateFormat: "dd-mm-yy"
            //    });


            //    $(".scaricaProdottoDaMagazzino").on('click', function () {
            //        //var numeroLotto = $("#numeroLotttoCaricareinMagazzino").val();
            //        var quantitaDaScaricare = $("#quantitaProdDaScaricareDaMagazzino").val();
            //        var numeroDDT = $("#numeroDDTCaricareinMagazzino").val();
            //        var dataDDT = $("#dataDDTCaricareinMagazzino").val();

            //        //numeroLotto = stringToDate(numeroLotto, "dd-MM-yyyy", "-");
            //        dataDDT = stringToDate(dataDDT, "dd-MM-yyyy", "-");
            //        var note = $("#noteCaricareinMagazzino").val();
            //        var quantitaTotale = (parseInt(quantitaAttuale) - parseInt(quantitaDaScaricare));
            //        //var quantitaVenduti = (quantitaAttuale - quantitaRimasti);
            //        //var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
            //        var prezzoTotale = (prezzo * quantitaTotale);

            //        //console.log(quantitaDaScaricare);

            //        if (quantitaDaScaricare == "" || isUint8(parseInt(quantitaDaScaricare)) == false) {
            //            alert("Scegli un valore Numerico prima di caricare");
            //            //$(this).prev().addClass("evidenziaErrore", 1000, "easeOutBounce");
            //            return;
            //            //} else {
            //            //    $(this).prev().removeClass("evidenziaErrore");
            //        }

            //        //alert('idProdotto=' + idProdotto + ' quantitaCaricati=' + quantitaCaricati + ' prezzoTotaleCaricati=' + prezzoTotaleCaricati + ' numeroLotto=' + numeroLotto + ' dataDDT=' + dataDDT + ' numeroDDT=' + numeroDDT + ' idOperatore=' + idOperatore);
            //        //return;
            //        numeroLotto = parseJsonDateToJsDate(numeroLotto);
            //        if (numeroDDT == "" || isUint8(parseInt(numeroDDT)) == false) {
            //            numeroDDT = 0;
            //        }

            //        SmaltiscoProdottiDaMagazzino(idProdotto, quantitaTotale, prezzoTotale, numeroLotto, idOperatore, numeroDDT, dataDDT, note, true);
                                                                                
            //        //dataDDT = null;
            //        //console.log(' idProdotto=' + idProdotto + ' quantitaDaScaricare=' + quantitaDaScaricare + ' prezzoTotale=' + prezzoTotale + ' idOperatore=' + idOperatore + ' numeroLotto=' + numeroLotto + ' numeroDDT=' + numeroDDT + ' dataDDT=' + dataDDT + ' note=' + note);
                   

            //        //var labelQuantita = $(this).closest('td').prev('td').prev('td').prev('td').prev('td');

            //        var labelQuantita = $(lblQ);
            //        //console.log(labelQuantita);                   
            //        labelQuantita.animate({
            //            backgroundColor: "green",
            //            color: "#000"
            //        }, 1000);
            //        labelQuantita.html(quantitaTotale);

            //    });


            //});
        }

    });

}


function CaricaProdottoInMagazzino(idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto, numeroDDT, dataDDT, note) {    

    // Carico Prodotti in magazzino *********************************
    //note = '';
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/CaricaProdottiInMagazzino",
        url: urlCaricaProdottiInMagazzino,
        cache: false,
        async: true,        
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaCaricati, prezzoTotale: prezzoTotaleCaricati, idOperatore: idOperatore, numeroLotto: numeroLotto, numeroDDT: numeroDDT, dataDDT: dataDDT, note: note }),        
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            //Ricarico i valori
            GestioneMagazzino();
        }

    });
    // *********************************************************************************  
}

//smaltisco una determinata quantita di Prodotto
function SmaltiscoProdottiDaMagazzino(IdProdotto, quantitaTotale, prezzoTotale, numeroLotto, IdOperatore, numeroDDT, dataDDT, note, smaltito) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/SmaltiscoProdottoInMagazzino",        
        url: urlSmaltiscoProdottoInMagazzino,
        cache: false,
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdProdotto: IdProdotto, numeroLotto: numeroLotto, IdOperatore: IdOperatore, note: note, smaltito: smaltito }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);
            CaricaProdottoInMagazzino(IdProdotto, quantitaTotale, prezzoTotale, IdOperatore, numeroLotto, numeroDDT, dataDDT, note);
        }

    });
}



        