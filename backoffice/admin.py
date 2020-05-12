from django.contrib import admin
from .models import *
from django.contrib.auth.models import User
# Register your models here.
admin.site.register(Client)
admin.site.register(Fournisseur)
admin.site.register(Produit)
admin.site.register(Achat)