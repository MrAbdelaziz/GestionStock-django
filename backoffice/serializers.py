from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')
class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ('id','nom', 'prenom','email','telephone','adresse','produits')
class FournisseurSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fournisseur
        fields = ('libelle', 'telephone','email','adresse')
class ProduitSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Produit
        fields = ('reference', 'designation', 'prixU', 'quantite', 'fournisseur')
class AchatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Achat
        fields = ('date_Achat', 'quantite', 'client', 'produit')


