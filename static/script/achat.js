$(document).ready(function () {

    table = $('#tachat').DataTable({
        ajax: {
            url: "../API/achats/",
            dataSrc: ''
        },
        columns: [
            {
                data: "id"
            },
            {
                data: "date_Achat"
            },
            {
                data: "quantite"
            },
            {
                data: "client"
            }, {
                data: "produit"
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
            }]

    });


    $("#btn").click(function () {
        var date = $("#datea");
        var qte = $("#quantite");
        var produit = $("#sproduit");
        var client = $("#client");

        if ($('#btn').text() == 'Ajouter') {

            var s = {
                date_Achat: date.val(),
                quantite: qte.val(),
                client :client.val(),
                produit :produit.val(),
            };

            $.ajax({
                url: '../API/achats/',
                contentType: "application/json",
                data: JSON.stringify(s),
                type: 'POST',
                success: function (data) {
                    table.ajax.reload();
                },
                error: function (textStatus) {
                    console.log(textStatus);
                }

            });
        }
    });

    $('#table-content').on('click', '.supprimer', function () {

        var id = $(this).closest('tr').find('td').eq(0).text();

        var oldLing = $(this).closest('tr').clone();

        var newLigne = '<tr style="position: relative;" class="bg-light" ><th scope="row">'
            + id
            + '</th><td colspan="4" style="height: 100%;">';
        newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer cette salle ? </h4>';
        newLigne += '<button type="button" class="btn btn-outline-primary btn-sm confirmer" style="margin-left: 25px;">Oui</button>';
        newLigne += '<button type="button" class="btn btn-outline-danger btn-sm annuler" style="margin-left: 25px;">Non</button></td></tr>';

        $(this).closest('tr').replaceWith(newLigne);

        $('.annuler').click(
            function () {
                $(this).closest('tr')
                    .replaceWith(
                        oldLing);
            });
        $('.confirmer').click(function (e) {
            e.preventDefault();
            $.ajax({
                url: '../API/fournisseurs/' + id,
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
                    $("#error")
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

            var id = $(this).closest('tr').find('td').eq(0).text();
            var libelle = $(this).closest('tr').find('td').eq(1).text();
            var email = $(this).closest('tr').find('td').eq(2).text();
            var tel = $(this).closest('tr').find('td').eq(3).text();
            var adresse = $(this).closest('tr').find('td').eq(4).text();
            btn.text('Modifier');
            $("#libelle").val(libelle);
            $("#id").val(id);
            $("#email").val(email);
            $("#tel").val(tel);
            $("#addresse").val(adresse);

            btn.click(function (e) {
                e.preventDefault();
                var s = {
                    libelle: $("#libelle").val(),
                    telephone: $("#tel").val(),
                    email: $("#email").val(),
                    adresse: $("#addresse").val(),

                };
                if ($('#btn').text() == 'Modifier') {
                    $.ajax({
                        url: '../API/fournisseurs/' + id + '/',
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(s),
                        type: 'PUT',
                        async: false,
                        success: function (data,
                                           textStatus, jqXHR) {
                            table.ajax.reload();

                            btn.text('Ajouter');
                        },
                        error: function (jqXHR, textStatus,
                                         errorThrown) {
                            console.log(textStatus);
                        }
                    });
                    $("#main-content").load(
                        "achats");
                }
            });
        });
    $.ajax({
        url: '../API/clients/?format=json',
        type: 'GET',
        dataType: 'json',
        success: function (response) {

            //alert(response);
            var len = response.length;

            $("#client").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['id'];
                var prenom = response[i]['prenom'];
                var nom = response[i]['nom'];
                //alert(id + "" + libelle);
                $("#client").append("<option value='" + id + "'>" + nom+ " "+prenom+"</option>");

            }
        }
    });$.ajax({
        url: '../API/produits/?format=json',
        type: 'GET',
        dataType: 'json',
        success: function (response) {

            //alert(response);
            var len = response.length;

            $("#sproduit").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['id'];
                var ref = response[i]['reference'];
                var des = response[i]['designation'];
                //alert(id + "" + libelle);
                $("#sproduit").append("<option value='" + id + "'>" + ref + ":" + des + "</option>");

            }
        }
    });



});
/*

                            nom: $("#nom").val(),
                    prenom: $("#prenom").val(),
                    email: $("#email").val(),
                    adresse: $("#addresse").val(),
							telephone	: $("#tel").val(),
 */