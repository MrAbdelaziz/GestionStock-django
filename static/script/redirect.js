function show(page) {
	if (page == 'produit') {
		$('a').removeClass('active');
		$('a:contains(Produit)').addClass('active');
		$("#main-content").load("produits");
		event.preventDefault();
	}
	if (page == 'client') {
		console.log('active')
		$('a').removeClass('active');
		$('a:contains(Clients)').addClass('active');
		$("#main-content").load("clients");
		event.preventDefault();
	}
	if (page == 'fournisseur') {
		$('a').removeClass('active');
		$('a:contains(Fournisseurs)').addClass('active');
		$("#main-content").load("fournisseurs");
		event.preventDefault();
	}
		if (page == 'achat') {
		$('a').removeClass('active');
		$('a:contains(Achats)').addClass('active');
		$("#main-content").load("achats");
		event.preventDefault();
	}
	if (page == "statistiques") {
		$('a').removeClass('active');
		$('a:contains(Statistiques)').addClass('active');
		$("#main-content").load("statistiques");
		event.preventDefault();
	}
}
$('a').removeClass('active');
$('a:contains(Statistiques)').addClass('active');
$("#main-content").load("statistiques");
