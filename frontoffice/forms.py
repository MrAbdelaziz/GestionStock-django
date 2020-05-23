from django import forms

from API.models import *


class ProduitForm(forms.ModelForm):
    class Meta:
        model = Produit
        fields = ('reference', 'designation', 'prixU', 'quantite', 'fournisseur')
        widgets = {
            'reference': forms.TextInput(
                attrs={
                    'class': 'form-control'
                }
            ), 'designation': forms.TextInput(
                attrs={
                    'class': 'form-control'
                }
            ), 'prixU': forms.NumberInput(
                attrs={
                    'class': 'form-control'
                }
            ), 'quantite': forms.NumberInput(
                attrs={
                    'class': 'form-control'
                }
            ), 'fournisseur': forms.Select(
                attrs={
                    'class': 'form-control'
                }
            )
        }
class FournisseurForm(forms.ModelForm):
    class Meta:
        model = Fournisseur
        fields = ('libelle', 'telephone', 'email', 'adresse')
