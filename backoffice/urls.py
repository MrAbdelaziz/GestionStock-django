# backoffice/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'clients', views.ClientViewSet)
router.register(r'fournisseurs', views.FournisseurViewSet)
router.register(r'produits', views.ProduitViewSet)
router.register(r'achats', views.AchatViewSet)
router.register(r'users', views.UserViewSet)
# Wire up our backoffice using automatic URL routing.
# Additionally, we include login URLs for the browsable backoffice.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    #path('clients/<int:pk>/', views.ClientDetail.as_view())

    ]
