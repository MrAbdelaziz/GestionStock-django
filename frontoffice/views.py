from django.shortcuts import render, redirect
from  frontoffice import  *
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import *
from django.views.generic import TemplateView
from django.conf import settings
from django.contrib import messages
from .forms import *
from backoffice.models import  *

def login(requset):
    return render(requset, "login.html",)
class LoginView(TemplateView):

  template_name = 'login.html'

  def post(self, request, **kwargs):

    username = request.POST.get('username', False)
    password = request.POST.get('password', False)
    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        login(request)
        return HttpResponseRedirect(settings.LOGIN_REDIRECT_URL )
    messages.success(request, 'mot de passe ou nom d''utilisateur incorrect')
    return render(request, self.template_name)


class LogoutView(TemplateView):

  template_name = 'login.html'

  def get(self, request, **kwargs):

    logout(request)

    return render(request, self.template_name)

def post_new(request):
    if request.method == "POST":
        form = ProduitForm(request.POST)
        if form.is_valid():
            produit = form.save()
            produit.save()
            return redirect('produit_detail', pk=produit.pk)
    else : 
        form = ProduitForm()
    return render(request, 'frontoffice/produit_form.html', {'form': form})
