$(document).ready(function(){
	
	table = $('#tsalle').DataTable({
        ajax: {
            url: "salles/all",
            dataSrc: ''
        },
        columns: [
            {
                data: "id"
            },
            {
                data: "num"
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
	
	
	$("#btn").click(function(){
		var num = $("#num");
		var libelle = $("#libelle");
		if ($('#btn').text() == 'Ajouter') {

		var s = {
			num : num.val(),
			libelle : libelle.val()
		};
		
		$.ajax({
			url:'salles/save',
			contentType: "application/json",
			data : JSON.stringify(s),
			type:  'POST',
			success: function(data) {
				table.ajax.reload();
			},
			error : function(textStatus){
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
							url: 'salles/delete/'+ id,
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
				
				var id = $(this).closest('tr').find('td').eq(0).text();
				var num = $(this).closest('tr').find('td').eq(1).text();
				var libelle = $(this).closest('tr').find('td').eq(2).text();
				btn.text('Modifier');
				$("#num").val(num);
				$("#libelle").val(libelle);
				$("#id").val(id);
				
				btn.click(function (e) {
					e.preventDefault();
					var  s = {
						id: $("#id").val(),
						num: $("#num").val(),
						libelle: $("#libelle").val()
						
					};
					if ($('#btn').text() == 'Modifier') {
						$.ajax({
							url: 'salles/save',
							contentType: "application/json",
							dataType: "json",
							data: JSON.stringify(s),
							type: 'POST',
							async: false,
							success: function (data,
								textStatus, jqXHR) {
								table.ajax.reload();
								$("#num").val('');
								$("#libelle").val('');
								btn.text('Ajouter');
							},
							error: function (jqXHR, textStatus,
								errorThrown) {
								console.log(textStatus);
							}
						});
						$("#main-content").load(
							"./page/salle.html");
					}
				});
			});

});