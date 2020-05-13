$(document).ready(function(){
	
	$.ajax({
		url:"salles/count",
		data: {},
		type: 'GET',
		success : function(data){
			$("#nbr-salle").html(data);
		},
		erreur(textStatus){
			console.log(textStatus);
		}
	});
});