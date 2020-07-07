MyTools = {
    Validation: function () {
        var inputs = ["nom", "prenom", "email", "tel", "addresse"];
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

    table = $('#tclient').DataTable({
        ajax: {
            url: "../API/clients/",
            dataSrc: ''
        },
        columns: [
            {
                data: "id"
            },
            {
                data: "nom"
            },
            {
                data: "prenom"
            },
            {
                data: "email"
            },
            {
                data: "adresse"
            }, {
                data: "telephone"
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
        var nom = $("#nom");
        var prenom = $("#prenom");
        var email = $("#email");
        var tel = $("#tel");
        var adresse = $("#addresse");

        if ($('#btn').text() == 'Ajouter') {
            if (MyTools.Validation()){
                var s = {
                    nom: nom.val(),
                    prenom: prenom.val(),
                    email: email.val(),
                    telephone: tel.val(),
                    adresse: adresse.val(),
                    produits: [],

                };

            $.ajax({
                url: '../API/clients/',
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
                url: '../API/clients/' + id,
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
            var nom = $(this).closest('tr').find('td').eq(1).text();
            var prenom = $(this).closest('tr').find('td').eq(2).text();
            var email = $(this).closest('tr').find('td').eq(3).text();
            var tel = $(this).closest('tr').find('td').eq(4).text();
            var adresse = $(this).closest('tr').find('td').eq(5).text();
            btn.text('Modifier');
            $("#nom").val(nom);
            $("#prenom").val(prenom);
            $("#id").val(id);
            $("#email").val(email);
            $("#tel").val(tel);
            $("#addresse").val(adresse);

            btn.click(function (e) {
                e.preventDefault();
if (MyTools.Validation()){
                var s = {
                    nom: $("#nom").val(),
                    prenom: $("#prenom").val(),
                    email: $("#email").val(),
                    adresse: $("#addresse").val(),
                    telephone: $("#tel").val(),
                };
                if ($('#btn').text() == 'Modifier') {
                    $.ajax({
                        url: '../API/clients/' + id + '/',
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
                        "clients");
                }
            }
            });
        });

});
/*

                            nom: $("#nom").val(),
                    prenom: $("#prenom").val(),
                    email: $("#email").val(),
                    adresse: $("#addresse").val(),
							telephone	: $("#tel").val(),
 */