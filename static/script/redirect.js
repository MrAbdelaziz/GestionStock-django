function show(page) {
	if (page == 'produit') {
		$('a').removeClass('active');
		$('a:contains(Produit)').addClass('active');
		$("#main-content").load("page/produit.html");
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
		$("#main-content").load("page/statistiques.html");
		event.preventDefault();
	}
	if (page == "machine") {
		$('a').removeClass('active');
		$('a:contains(Machines)').addClass('active');
		$("#main-content").load("page/machine.html");
		event.preventDefault();
	}
	if (page == "marque") {
		$('a').removeClass('active');
		$('a:contains(Marques)').addClass('active');
		$("#main-content").load("page/marque.html");
		event.preventDefault();
	}
}
$('a').removeClass('active');
$('a:contains(Statistiques)').addClass('active');
$("#main-content").load("page/statistiques.html");
