$(document).ready(function(){
	
	$.ajax({
		url:"/API/prod/count/?format=json",
		data: {},
		type: 'GET',
		success : function(data){
			$("#nbr-produits").html(data['produits_count']);
			$("#nbr-clients").html(data['Client_count']);
			$("#nbr-fournisseur").html(data['Fournisseur_count']);
			$("#nbr-achat").html(data['Achat_count']);

		},
		erreur(textStatus){
			console.log(textStatus);
		}
	});
});