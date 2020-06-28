from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import *

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by('nom')
    serializer_class = ClientSerializer

class FournisseurViewSet(viewsets.ModelViewSet):
    queryset = Fournisseur.objects.all().order_by('libelle')
    serializer_class = FournisseurSerializer

class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all().order_by('reference')
    serializer_class = ProduitSerializer
    filter_fields = {
        'quantite': ['gte', 'lte']
    }
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly] ss
    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()

class AchatViewSet(viewsets.ModelViewSet):
    queryset = Achat.objects.all().order_by('date_Achat')
    serializer_class = AchatSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer

class CountViewSet(APIView):
    def get(self, request, format=None):
        Produit_count = Produit.objects.all().count()
        Client_count =  Client.objects.all().count()
        Fournisseur_count = Fournisseur.objects.all().count()
        Achat_count = Achat.objects.all().count()

        content = {
            'produits_count': Produit_count,
            'Client_count':Client_count,
            'Fournisseur_count':Fournisseur_count,
            'Achat_count':Achat_count
        }
        return Response(content)


class RiskViewSet(APIView):
    def get(self, request, format=None):
        countprod = request.GET.get('prodid', False)
        prods = Produit.objects.filter(quantite__gt=0)
        return Response(prods)

class LoginnViewSet(APIView):
    def get(self, request, format=None):
            username = request.GET.get('username', False)
            password = request.GET.get('password', False)
            user = authenticate(username=username, password=password)
            if user is not None and user.is_active:
                return Response(user)
            return Response(user)