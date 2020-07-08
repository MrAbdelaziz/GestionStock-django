MyTools = {
    Validation: function () {
        var inputs = ["reference", "designation", "prix", "quantite", "fournisseur"];
        var checked = true;

        inputs.forEach(function (input) {
            var element = $("#" + input);
            if (element.val() == null || element.val() == "") {
                alert(input + " is empty");
                checked = false;

            }

        });
        return checked;
    }
}
$(document).ready(function () {


    table = $('#tproduit').DataTable({
        ajax: {
            url: "../API/produits/?format=json",
            dataSrc: ''
        },
        columns: [
            {
                data: "id"
            },
            {
                data: "reference"
            },
            {
                data: "designation"
            },
            {
                data: "prixU"
            },
            {
                data: "quantite"
            },
            {
                //     url  -> four
                data: "fournisseur"
            },
            {
                "render": function () {
                    return '<button type="button" class="btn btn-outline-danger supprimer">Supprimer</button>';
                }
            },
            {
                "render": function () {
                    return '<button type="button" class="btn btn-outline-secondary modifier">Modifier</button>';
                }
            }],
        'rowCallback': function (row, data, index) {
            if ($(row).find('td:eq(4)').text() == 0) {
                $(row).find('td:eq(4)').css('color', 'red');
            } else {
                if ($(row).find('td:eq(4)').text() > 1 && $(row).find('td:eq(4)').text() < 10) {
                    $(row).find('td:eq(4)').css('color', 'orange');
                }else{
                    $(row).find('td:eq(4)').css('color', 'green');
                }

            }
        }
    });


    $('#btnref').click(function () {
        table.ajax.reload();
    });


    $('#btnrisk').click(function () {
        var risk = $("#risk");
        $('#tproduit').dataTable().fnDestroy();

        table2 = $('#tproduit').DataTable({
            ajax: {
                url: "../API/produits/?format=json&quantite__lte=" + risk.val(),
                dataSrc: ''
            },
            columns: [
                {
                    data: "id"
                },
                {
                    data: "reference"
                },
                {
                    data: "designation"
                },
                {
                    data: "prixU"
                },
                {
                    data: "quantite"
                },
                {
                    //     url  -> four
                    data: "fournisseur"
                },
                {
                    "render": function () {
                        return '<button type="button" class="btn btn-outline-danger supprimer">Supprimer</button>';
                    }
                },
                {
                    "render": function () {
                        return '<button type="button" class="btn btn-outline-secondary modifier">Modifier</button>';
                    }
                }],
            'rowCallback': function (row, data, index) {
            if ($(row).find('td:eq(4)').text() == 0) {
                $(row).find('td:eq(4)').css('color', 'red');
            } else {
                if ($(row).find('td:eq(4)').text() > 1 && $(row).find('td:eq(4)').text() < 10) {
                    $(row).find('td:eq(4)').css('color', 'orange');
                }else{
                    $(row).find('td:eq(4)').css('color', 'green');
                }

            }
        }

        });
        table2.ajax.reload();
    });

    $('#btn').click(
        function () {

            var reference = $("#reference"); // var code  = document.getElementById("code");
            var designation = $("#designation");
            var prix = $("#prix");
            var quantite = $("#quantite");
            var fournisseur = $("#fournisseur");

            if ($('#btn').text() == 'Ajouter') {
                if (MyTools.Validation()) {
                    var p = {
                        reference: reference.val(), //code.value
                        designation: designation.val(),
                        prixU: prix.val(),
                        quantite: quantite.val(),
                        fournisseur: fournisseur.val(),
                    };
                    console.log(JSON.stringify(p));

                    $.ajax({
                        url: '../API/produits/',
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(p),
                        type: 'POST',
                        async: false,
                        success: function (data, textStatus,
                                           jqXHR) {
                            table.ajax.reload();
                        },
                        error: function (jqXHR, textStatus,
                                         errorThrown) {
                            console.log("erorr ");
                        }
                    });

                    $("#main-content").load(
                        "../admindash/produits");
                }
            }

        });

    $('#table-content')
        .on(
            'click',
            '.supprimer',
            function () {

                var id = $(this).closest('tr').find(
                    'td').eq(0).text();
                var oldLing = $(this).closest('tr')
                    .clone();
                var newLigne = '<tr style="position: relative;" class="bg-light" ><th scope="row">'
                    + id
                    + '</th><td colspan="4" style="height: 100%;">';
                newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer ce produit ? </h4>';
                newLigne += '<button type="button" class="btn btn-outline-primary btn-sm confirmer" style="margin-left: 25px;">Oui</button>';
                newLigne += '<button type="button" class="btn btn-outline-danger btn-sm annuler" style="margin-left: 25px;">Non</button></td></tr>';

                $(this).closest('tr').replaceWith(
                    newLigne);
                $('.annuler').click(
                    function () {
                        $(this).closest('tr')
                            .replaceWith(
                                oldLing);
                    });
                $('.confirmer')
                    .click(
                        function (e) {
                            e.preventDefault();
                            $
                                .ajax({
                                    url: '../API/produits/'
                                        + id,
                                    data: {},
                                    type: 'DELETE',
                                    async: false,
                                    success: function (
                                        data,
                                        textStatus,
                                        jqXHR) {

                                        table.ajax
                                            .reload();

                                    },
                                    error: function (
                                        jqXHR,
                                        textStatus,
                                        errorThrown) {
                                        $(
                                            "#error")
                                            .modal();
                                    }
                                });

                        });

            });

    $('#table-content').on(
        'click',
        '.modifier',
        function () {
            var btn = $('#btn');
            var id = $(this).closest('tr').find('td').eq(0)
                .text();
            ;
            var reference = $(this).closest('tr').find('td').eq(
                1).text();
            var designation = $(this).closest('tr').find('td')
                .eq(2).text();
            var prix = parseInt($(this).closest('tr').find('td')
                .eq(3).text());
            var quantite = $(this).closest('tr').find('td')
                .eq(4).text();
            var fournisseur = $(this).closest('tr').find('td')
                .eq(5).text();

            btn.text('Modifier');
            $("#reference").val(reference);
            $("#designation").val(designation);
            $("#prix").val(prix);
            $("#quantite").val(quantite);
            $("#fournisseur").val(fournisseur);
            btn.click(function (e) {
                e.preventDefault();
                var p = {

                    reference: $("#reference").val(),
                    designation: $("#designation").val(),
                    prixU: $("#prix").val(),
                    quantite: $("#quantite").val(),
                    fournisseur: $("#fournisseur").val()
                };
                if ($('#btn').text() == 'Modifier') {
                    if (MyTools.Validation()) {
                        $.ajax({
                            url: '../API/produits/' + id + '/',
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify(p),
                            type: 'PUT',
                            async: false,
                            success: function (data,
                                               textStatus, jqXHR) {
                                table.ajax.reload();
                                $("#reference").val('');
                                $("#designation").val('');
                                $("#prix").val('');
                                $("#quantite").val('');
                                $("#fournisseur").val('');
                                btn.text('Ajouter');
                            },
                            error: function (jqXHR, textStatus,
                                             errorThrown) {
                                console.log(textStatus);
                            }
                        });
                        $("#main-content").load(
                            "../admindash/produits");
                    }
                }
            });
        });


    $.ajax({
        url: '../API/fournisseurs/?format=json',
        type: 'GET',
        dataType: 'json',
        success: function (response) {

            //alert(response);
            var len = response.length;

            $("#fournisseur").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['id'];
                var libelle = response[i]['libelle'];
                //alert(id + "" + libelle);
                $("#fournisseur").append("<option value='" + id + "'>" + libelle + "</option>");

            }
        }
    });
    // function remplir(data) {
    // var contenu = $('#table-content');
    // var ligne = "";
    // for (i = 0; i < data.length; i++) {
    // ligne += '<tr><th scope="row">' + data[i].id + '</th>';
    // ligne += '<td>' + data[i].code + '</td>';
    // ligne += '<td>' + data[i].nom + '</td>';
    // ligne += '<td>' + data[i].prix + '</td>';
    // ligne += '<td>' + data[i].dateAchat + '</td>';
    // ligne += '<td><button type="button" class="btn
    // btn-outline-danger
    // supprimer">Supprimer</button></td>';
    // ligne += '<td><button type="button" class="btn
    // btn-outline-secondary
    // modifier">Modifier</button></td></tr>';
    // }
    // contenu.html(ligne);
    // }

    // $.ajax({
    // url: 'produits/all',
    // data: {op: ''},
    // type: 'GET',
    // async: false,
    // success: function (data, textStatus, jqXHR) {
    // console.log(data);
    // remplir(data);
    // },
    // error: function (jqXHR, textStatus, errorThrown) {
    // console.log(textStatus);
    // }
    // });
});
