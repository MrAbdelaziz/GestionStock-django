from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

class AchatViewSet(viewsets.ModelViewSet):
    queryset = Achat.objects.all().order_by('date_Achat')
    serializer_class = AchatSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]