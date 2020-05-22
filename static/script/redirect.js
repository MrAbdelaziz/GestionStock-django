function show(page) {
	if (page == 'produit') {
		$('a').removeClass('active');
		$('a:contains(Produit)').addClass('active');
		$("#main-content").load("produits");
		event.preventDefault();
	}
	if (page == 'salle') {
		$('a').removeClass('active');
		$('a:contains(Salle)').addClass('active');
		$("#main-content").load("page/salle.html");
		event.preventDefault();
	}
	if (page == 'categorie') {
		$('a').removeClass('active');
		$('a:contains(Categorie)').addClass('active');
		$("#main-content").load("page/categorie.html");
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
