from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework import permissions
from .serializers import *
from .models import *

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by('nom')
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
class FournisseurViewSet(viewsets.ModelViewSet):
    queryset = Fournisseur.objects.all().order_by('libelle')
    serializer_class = FournisseurSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all().order_by('reference')
    serializer_class = ProduitSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
class AchatViewSet(viewsets.ModelViewSet):
    queryset = Achat.objects.all().order_by('date_Achat')
    serializer_class = AchatSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]