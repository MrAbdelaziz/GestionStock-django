"""Gestion_stock URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('API/', include('API.urls')),
    path('', include('frontoffice.urls')),

    url(r'^admindash/$', TemplateView.as_view(template_name='frontoffice/master_page.html')),
    url(r'^admindash/statistiques$', TemplateView.as_view(template_name='frontoffice/page/statistiques.html')),
    url(r'^admindash/produits$', TemplateView.as_view(template_name='frontoffice/page/produit.html')),
    url(r'^admindash/clients$', TemplateView.as_view(template_name='frontoffice/page/client.html')),
    url(r'^admindash/fournisseurs$', TemplateView.as_view(template_name='frontoffice/page/fournisseur.html')),
    url(r'^admindash/achats$', TemplateView.as_view(template_name='frontoffice/page/achat.html')),

]
