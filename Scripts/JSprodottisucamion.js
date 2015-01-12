$(function () {        

});


function ElencoProdottiSuCamionPerDistributore(idMezzo, idDistributore) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInCamion",        
        url: urlGetProdottiSuCamion,
        cache: false,                   
        async: true,        
        data: JSON.stringify({ idMezzo: idMezzo }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            
            console.log(risultati);
            //$(".menuPrincipale").hide();
            
            var dettaglio = '<table id="tabellaProdottiSuMezzo" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +                                                
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Caricare</th>' +
                                                //'<th>N° DDL</th>' +
                                                //'<th>Data DDL</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                               '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Caricare</th>' +
                                                //'<th>N° DDL</th>' +
                                                //'<th>Data DDL</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var data = new Date();
            var oggi =  data.getDate() ;
            //var oggi = '\'' + data.getDate() + '\'';
            for (var i = 0; i < risultati.length; i++) {
                
                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                //dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].numeroLotto) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';                
                dettaglio = dettaglio + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                //dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                //dettaglio = dettaglio + '<td><input type="text" data-role="date" class="dataDDl accentraInput"></td>';
                dettaglio = dettaglio + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInDistributore">Carica</a></td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            $('#ElencoProdottiSuCamionPerDistributore').html(dettaglio);

            //$(".dataDDl").datepicker({
            //    dateFormat: "dd-mm-yy"
            //});


            var table = $('#tabellaProdottiSuMezzo').DataTable(
                { "paging": false }
            );

            $(".caricaProdInDistributore").on('click', function () {

                var IdTrasporto = $(this).attr('data-IdTrasporto');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');

                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                var quantitaCaricati = $(this).closest('td').prev('td')[0].children[0].value;
                //var quantiC = quantitaCaricati[0].children[0].value;
                var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                //var numeroDDL = $(this).closest('td').prev('td').prev('td')[0].children[0].value;
                //var dataDDL = $(this).closest('td').prev('td')[0].children[0].value;
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));

                var IdMagazzino = $(this).attr('data-IdMagazzino');
                //console.log(quantitaCaricati);
                //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaCaricati= ' + quantitaCaricati);
                //return;

                //alert('quantitaCaricati=' + quantitaCaricati + ' quantitaAttuale=' + quantitaAttuale + ' IdTrasporto=' + IdTrasporto);
                //return;

                //alert('quantitaCaricati=' + quantitaCaricati + ' isUint8(parseInt(quantitaCaricati))=' + isUint8(parseInt(quantitaCaricati)));
                var inputQuantitaCaricati = $(this).closest('td').prev('td')[0].children[0];
                //console.log(inputQuantitaCaricati.id);
                var quantic = '#' + inputQuantitaCaricati.id;
                if (quantitaCaricati == "" || isUint8(parseInt(quantitaCaricati)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");                    
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaCaricati) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");                    
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                CaricaProdottiInDistributore(IdTrasporto, idDistributore, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, idMezzo);

                var labelQuantita = $(this).closest('td').prev('td').prev('td');
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

function ElencoProdottiSuCamionPerCliente(idMezzo, idCliente) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/GetProdottiInCamion",        
        url: urlGetProdottiSuCamion,
        cache: false,
        async: true,
        data: JSON.stringify({ idMezzo: idMezzo }),
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            console.log(risultati);
            //$(".menuPrincipale").hide();

            var dettaglio = '<table id="tabellaProdottiSuMezzoPerCliente" class="display" cellspacing="0" width="100%">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Caricare</th>' +
                                                //'<th>N° DDL</th>' +
                                                //'<th>Data DDL</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tfoot>' +
                                            '<tr>' +
                                               '<th>Foto</th>' +
                                                '<th>Descrizione</th>' +
                                                '<th>Quant. su Camion</th>' +
                                                '<th>Quant. da Caricare</th>' +
                                                //'<th>N° DDL</th>' +
                                                //'<th>Data DDL</th>' +
                                                '<th></th>' +
                                            '</tr>' +
                                        '</tfoot>' +
                                        '<tbody>';
            var data = new Date();
            var oggi = data.getDate();
            //var oggi = '\'' + data.getDate() + '\'';
            for (var i = 0; i < risultati.length; i++) {

                dettaglio = dettaglio + '<tr>';
                dettaglio = dettaglio + '<td><img src="http://www.giacomorabaglia.com/AppDistributoriDondi/Immagini/' + risultati[i].foto + '"></td>';
                dettaglio = dettaglio + '<td>' + risultati[i].descrizione + ' (' + parseJsonDate(risultati[i].numeroLotto) + ')</td>';
                //dettaglio = dettaglio + '<td>' + parseJsonDate(risultati[i].numeroLotto) + '</td>';
                dettaglio = dettaglio + '<td>' + risultati[i].quantita + '</td>';
                dettaglio = dettaglio + '<td><input id="quantitaDaCaricare' + risultati[i].IdTrasporto + '" type="number" data-clear-btn="true" class="miniInput accentraInput"> </td>';
                //dettaglio = dettaglio + '<td><input type="number" data-clear-btn="true" class="miniInput accentraInput"></td>';
                //dettaglio = dettaglio + '<td><input type="text" data-role="date" class="dataDDl accentraInput"></td>';
                dettaglio = dettaglio + '<td><a href="#" data-IdTrasporto="' + risultati[i].IdTrasporto + '" data-IdCliente="' + idCliente + '" data-idProdotto="' + risultati[i].idProdotto + '" data-prezzo="' + risultati[i].prezzo + '" data-idOperatore="' + risultati[i].IdOperatore + '" data-numeroLotto="' + risultati[i].numeroLotto + '" class="ui-btn ui-corner-all ui-shadow ui-btn-active caricaProdInCliente">Carica</a></td>';
                dettaglio = dettaglio + '</tr>';

            }
            dettaglio = dettaglio + '</tbody> </table>';

            $('#ElencoProdottiSuCamionPerCliente').html(dettaglio);

            //$(".dataDDl").datepicker({
            //    dateFormat: "dd-mm-yy"
            //});


            var table = $('#tabellaProdottiSuMezzoPerCliente').DataTable(
                { "paging": false }
            );

            $(".caricaProdInCliente").on('click', function () {

                var IdTrasporto = $(this).attr('data-IdTrasporto');
                var idProdotto = $(this).attr('data-idProdotto');
                var prezzo = $(this).attr('data-prezzo');

                var quantitaAttuale = $(this).closest('td').prev('td').prev('td').text();
                var quantitaCaricati = $(this).closest('td').prev('td')[0].children[0].value;
                //var quantiC = quantitaCaricati[0].children[0].value;
                var quantitaRimasti = (quantitaAttuale - quantitaCaricati);
                //var numeroDDL = $(this).closest('td').prev('td').prev('td')[0].children[0].value;
                //var dataDDL = $(this).closest('td').prev('td')[0].children[0].value;
                var prezzoTotaleRimasti = (prezzo * quantitaRimasti);
                var prezzoTotaleCaricati = (prezzo * quantitaCaricati);
                var idOperatore = $(this).attr('data-idOperatore');
                var numeroLotto = new Date(parseJsonDateToJsDate($(this).attr('data-numeroLotto')));

                var IdMagazzino = $(this).attr('data-IdMagazzino');
                //console.log(quantitaCaricati);
                //alert('quantitaAttuale=' + quantitaAttuale + ' quantitaCaricati= ' + quantitaCaricati);
                //return;

                //alert('quantitaCaricati=' + quantitaCaricati + ' quantitaAttuale=' + quantitaAttuale + ' IdTrasporto=' + IdTrasporto);
                //return;

                //alert('quantitaCaricati=' + quantitaCaricati + ' isUint8(parseInt(quantitaCaricati))=' + isUint8(parseInt(quantitaCaricati)));
                var inputQuantitaCaricati = $(this).closest('td').prev('td')[0].children[0];
                //console.log(inputQuantitaCaricati.id);
                var quantic = '#' + inputQuantitaCaricati.id;
                if (quantitaCaricati == "" || isUint8(parseInt(quantitaCaricati)) == false) {
                    alert("Scegli un valore Numerico prima di caricare");
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                if (parseInt(quantitaCaricati) > parseInt(quantitaAttuale)) {
                    alert("E' impossibile che ci siano da caricare più prodotti di quelli presenti!");
                    $(inputQuantitaCaricati.id).addClass("evidenziaErrore", 1000, "easeOutBounce");
                    return;
                } else {
                    $(inputQuantitaCaricati.id).removeClass("evidenziaErrore");
                }

                //alert('idCliente=' + idCliente);
                //return;

                CaricaProdottiInCliente(IdTrasporto, idCliente, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, idMezzo);

                var labelQuantita = $(this).closest('td').prev('td').prev('td');
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

function CaricaProdottiInCliente(IdTrasporto, idCliente, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, IdMezzo) {

    // Storicizzo Prodotti in camion ************************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInTrasporto",        
        url: urlStoricizzoProdTrasporto,
        cache: false,

        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdTrasporto: IdTrasporto, IdOperatore: idOperatore }),

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
    // *********************************************************************************

    // Aggiorno quantita Prodotti rimasti in Camion ************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto",
        url: urlAggiornaQuantInTrasporto,
        cache: false,
        async: true,
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: IdMezzo }),
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
    // *********************************************************************************
    
    InsertProdottiInCliente(idCliente, idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto);
}

function CaricaProdottiInDistributore(IdTrasporto, idDistributore, idProdotto, quantitaCaricati, quantitaRimasti, prezzoTotaleRimasti, prezzoTotaleCaricati, idOperatore, numeroLotto, IdMezzo) {

    // Storicizzo Prodotti in camion ************************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/StoricizzoProdottoInTrasporto",        
        url: urlStoricizzoProdTrasporto,
        cache: false,
                   
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ IdTrasporto: IdTrasporto, IdOperatore: idOperatore }),
       
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
    // *********************************************************************************

    // Aggiorno quantita Prodotti rimasti in Camion ************************************
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "http://www.giacomorabaglia.com/appdistributoridondi/WebServiceAppDondi.asmx/AggiornaQuantitaProdottiInTrasporto",
        url: urlAggiornaQuantInTrasporto,
        cache: false,
        async: true,        
        data: JSON.stringify({ idProdotto: idProdotto, quantita: quantitaRimasti, prezzoTotale: prezzoTotaleRimasti, idOperatore: idOperatore, numeroLotto: numeroLotto, IdMezzo: IdMezzo }),
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
    // *********************************************************************************

    InsertProdottiInDistributore(idDistributore, idProdotto, quantitaCaricati, prezzoTotaleCaricati, idOperatore, numeroLotto);
}




        