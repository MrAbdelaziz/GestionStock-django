from django.shortcuts import render
from  frontoffice import  *

def login(requset):
    return render(requset, "login.html")