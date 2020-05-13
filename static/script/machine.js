$(document).ready(function() {
	table = $('#tmachine').DataTable({
        ajax: {
            url: "machines/all",
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
                data: "da"
			},
			{
				data: "prix"
			},
			{	name : "libelle",
				data: "m.libelle"
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
		var ref = $("#reference");
		var libelle = $("#marque");
		var id =  parseInt($("#marque").val());
		var da = $("#da");
		var prix= $("#prix");
		var marque ={id};
		console.log(marque);
		if ($('#btn').text() == 'Ajouter') {
		var c = {
			reference: $("#reference").val(),
			m: marque,
			da: $("#da").val(),
			prix:$("#prix").val()
		};
		
		$.ajax({
			url: "/machines/save",
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
			newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer cette machine ? </h4>';
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
								url: 'machines/delete/'+ id,
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
				var reference = $(this).closest('tr').find('td').eq(
					1).text();
				var da = $(this).closest('tr').find('td')
					.eq(2).text();
					var prix = $(this).closest('tr').find('td')
					.eq(3).text();
					var libelle = $(this).closest('tr').find('td')
					.eq(4).text();
				
				btn.text('Modifier');
				$("#reference").val(reference);
				$("#marque").val(libelle);
				$("#da").val(da);
				$("#id").val(id);
				$("#prix").val(prix);
			
				btn.click(function (e) {
		var id =  parseInt($("#marque").val());
		var ref = $("#reference");
		var da = $("#da");
		var libelle = $("#marque");
		
		var prix= $("#prix");
		var marque ={id};
					e.preventDefault();
					
					
					var p = {
						id: parseInt(id),
						reference: $("#reference").val(),
						da: $("#da").val(),
						prix:$("#prix").val(),
						m: marque
					};
					console.log(p);
					if ($('#btn').text() == 'Modifier') {
						$.ajax({
							url: 'machines/save',
							contentType: "application/json",
							dataType: "json",
							data: JSON.stringify(p),
							type: 'POST',
							async: false,
							success: function (data,
								textStatus, jqXHR) {
								table.ajax.reload();
								$("#reference").val('');
								$("#libelle").val('');
								$("#da").val('');
								$("#id").val('');
								$("#prix").val('');
								btn.text('Ajouter');
							},
							error: function (jqXHR, textStatus,
								errorThrown) {
								console.log(textStatus);
							}
						});
						$("#main-content").load(
							"./page/machine.html");
					}
				});
			});



	    //$("#marque").click(function () {
		//var deptid = $(this).val();

		$.ajax({
			url: 'marques/all',
			type: 'GET',
			dataType: 'json',
			success: function (response) {

				//alert(response);
				var len = response.length;

				$("#marque").empty();
				for (var i = 0; i < len; i++) {
					var id = response[i]['id'];
					var libelle = response[i]['libelle'];
					//alert(id + "" + libelle);
					$("#marque").append("<option value='" + id + "'>" + libelle + "</option>");

				}
			}
		});
	//});


});