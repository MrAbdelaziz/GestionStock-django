MyTools = {
    Validation: function () {
        var inputs = ["datea", "quantite", "sproduit", "client"];
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

    table = $('#tachat').DataTable({
        ajax: {
            url: "../API/achats",
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
            if (MyTools.Validation()) {
                var s = {
                    date_Achat: date.val(),
                    quantite: qte.val(),
                    client: client.val(),
                    produit: produit.val(),
                };

                var p = {
                    reference: "ee",
                    designation: "ee",
                    prixU: 0,
                    quantite: 0,
                    fournisseur: 0
                };
                $.ajax({
                    url: '../API/produits/' + s.produit,
                    contentType: "application/json",
                    type: 'GET',
                    success: function (data) {
                        p = JSON.parse(JSON.stringify(data));
                        console.log("get data : " + p.reference);

                        if (p.quantite >= s.quantite) {
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
                            if (p.quantite !== 0) {
                                p.quantite = p.quantite - s.quantite;
                                console.log(p);

                                $.ajax({
                                    url: '../API/produits/' + s.produit + '/',
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(p),
                                    type: 'PUT',
                                    async: false,
                                    success: function (data,
                                                       textStatus, jqXHR) {
                                        console.log("mise a jour");
                                    },
                                    error: function (jqXHR, textStatus,
                                                     errorThrown) {
                                        console.log(textStatus);
                                    }
                                });

                            }
                        } else {
                            alert('la quantité demandée depasse la quantité de stock ('+p.quantite+')');
                        }

                    },
                    error: function (textStatus) {
                        console.log(textStatus);
                    }

                });


            }
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
                url: '../API/achats/' + id,
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
            var da = $(this).closest('tr').find('td').eq(1).text();
            var quan = $(this).closest('tr').find('td').eq(2).text();
            var client = $(this).closest('tr').find('td').eq(3).text();
            var prod = $(this).closest('tr').find('td').eq(4).text();

            btn.text('Modifier');
            $("#datea").val(da);
            $("#id").val(id);
            $("#quantite").val(quan);
            $("#client").val(client);
            $("#sproduit").val(prod);

            btn.click(function (e) {
                e.preventDefault();

                var date = $("#datea");
                var qte = $("#quantite");
                var produit = $("#sproduit");
                var client = $("#client");
                var s = {
                    date_Achat: date.val(),
                    quantite: qte.val(),
                    client: client.val(),
                    produit: produit.val(),
                };


                if ($('#btn').text() == 'Modifier') {
                    if (MyTools.Validation()) {
                        $.ajax({
                            url: '../API/achats/' + id + '/',
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
                $("#client").append("<option value='" + id + "'>" + nom + " " + prenom + "</option>");

            }
        }
    });

    $.ajax({
        url: '../API/produits/?format=json&quantite__gte=1',
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