from tkinter import CASCADE

from django.db import models
from django.utils import timezone

import json

from django.utils.formats import localize
# Create your models here.

class Administrateur(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    login = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    image = models.CharField(max_length=50)
    def __str__(self):
        return '{} {} {}'.format(self.nom, self.prenom, self.login)




"""
class Fournisseur(models.Model):
    libelle = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    telephone = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)

    def __str__(self):
        return '{} by {}'.format(self.libele, self.email)
"""

#####################
#    Fournisseurs  #
#####################
class Fournisseur(models.Model):
    libelle = models.CharField(max_length=50)
    telephone = models.CharField("Téléphone", max_length=20)
    email = models.EmailField("E-Mail", blank=True)
    adresse = models.CharField(max_length=200)

    class Meta:
        ordering = ["libelle",]

    def __str__(self):
        # return json.dumps(self.__dict__)
         return '{} {} {} {}'.format(self.libelle, self.telephone, self.email, self.adresse)


#####################
#    Produits       #
#####################
class Produit(models.Model):
    reference = models.CharField(unique=True,max_length=50)
    designation = models.CharField(max_length=50)
    prixU = models.DecimalField(max_digits=8, decimal_places=2)
    quantite = models.IntegerField()
    fournisseur = models.ForeignKey(Fournisseur,on_delete=models.CASCADE)
    # fournisseur = models.OneToOneField(Fournisseur,on_delete=models.CASCADE)
    def __str__(self):
        return '{} {} {} {}'.format(self.reference, self.designation, self.quantite, self.fournisseur)


class Client(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    telephone = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)
    produits = models.ManyToManyField(Produit , through='Achat',blank=True)
    def __str__(self):
        return '{} by {}'.format(self.nom, self.prenom)

class Achat(models.Model):
    date_Achat = models.DateField(default=timezone.now)
    quantite = models.IntegerField()
    client = models.ForeignKey(Client,on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit,on_delete=models.CASCADE)

    def __str__(self):
        return '{} by {}'.format(self.date_Achat, self.quantite)

    class Meta:
        ordering = ['date_Achat',]