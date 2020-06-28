"""frontoffice URL Configuration

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
from django.contrib import admin
from django.urls import path

from frontoffice import views
from django.conf.urls import url

from frontoffice.views import LoginView

urlpatterns = [
    url(r'^$', LoginView.as_view()),
    #path('admindash/produit/add/', views.post_new, name='addProduit'),
    # path('post/<int:pk>/edit/', views.produit_edit, name='produit_edit'),
     #path('produits/', views.produit_all, name='produits'),
    #path('admindash/',views.counts_all)
]
