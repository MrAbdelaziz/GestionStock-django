from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')
class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = ('id','libelle', 'telephone','email','adresse')
class ProduitSerializer(serializers.ModelSerializer):
    # fournisseur = FournisseurSerializer(many=False)
    # fournisseur = serializers.SlugRelatedField(slug_field='email',read_only=True)
    class Meta:
        model = Produit
        fields = ('id' ,'reference', 'designation', 'prixU', 'quantite', 'fournisseur')

class ClientSerializer(serializers.ModelSerializer):
    produits = ProduitSerializer(many=True)
    class Meta:
        model = Client
        fields = ('id','nom', 'prenom','email','telephone','adresse','produits')

class AchatSerializer(serializers.ModelSerializer):
    produit = ProduitSerializer(many=False)
    client = ClientSerializer(many=False)
    class Meta:
        model = Achat
        fields = ('date_Achat', 'quantite', 'client', 'produit')
