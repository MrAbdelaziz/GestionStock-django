$(document).ready(function() {
	table = $('#tmarque').DataTable({
        ajax: {
            url: "marques/all",
            dataSrc: ''
        },
        columns: [
            {
                data: "id"
            },
            {
                data: "code"
            },
            {
                data: "libelle"
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

	$("#btn").click(function() {
		var code = $("#code");
		var libelle = $("#libelle");
		if ($('#btn').text() == 'Ajouter') {
		var c = {
			code: code.val(),
			libelle:libelle.val()
		};
		
		$.ajax({
			url: "/marques/save",
			contentType:"application/json",
			data : JSON.stringify(c),
			type: 'POST',
			success: function(data){
				table.ajax.reload();
			},
			error:function(textStatus){
				console.log(textStatus);
			}
		});
	}
	});
	$('#table-content').on('click','.supprimer', function () {
			var id = $(this).closest('tr').find('td').eq(0).text();
			var oldLing = $(this).closest('tr').clone();

			var newLigne = '<tr style="position: relative;" class="bg-light" ><th scope="row">'
				+ id
				+ '</th><td colspan="4" style="height: 100%;">';
			newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer cette marque ? </h4>';
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
								url: 'marques/delete/'+ id,
								data: {},
								type: 'DELETE',
								async: false,
								success: function (
									data,
									textStatus,
									jqXHR) {
									if (data.includes("error") == true) {
										$(
											"#error")
											.modal();
									} else {
										table.ajax
											.reload();
									}
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
				var id = $(this).closest('tr').find('td').eq(0)
					.text();
				;
				var code = $(this).closest('tr').find('td').eq(
					1).text();
				var libelle = $(this).closest('tr').find('td')
					.eq(2).text();
				
				btn.text('Modifier');
				$("#code").val(code);
				$("#libelle").val(libelle);
				$("#id").val(id);
				
				btn.click(function (e) {
					e.preventDefault();
					var p = {
						id: $("#id").val(),
						code: $("#code").val(),
						libelle: $("#libelle").val()
						
					};
					if ($('#btn').text() == 'Modifier') {
						$.ajax({
							url: 'marques/save',
							contentType: "application/json",
							dataType: "json",
							data: JSON.stringify(p),
							type: 'POST',
							async: false,
							success: function (data,
								textStatus, jqXHR) {
								table.ajax.reload();
								$("#code").val('');
								$("#libelle").val('');
								btn.text('Ajouter');
							},
							error: function (jqXHR, textStatus,
								errorThrown) {
								console.log(textStatus);
							}
						});
						$("#main-content").load(
							"./page/marque.html");
					}
				});
			});

});