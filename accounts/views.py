from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm


# Create your views here.
def index(request):
    """
    docstring
    """
    return render(request, 'base.html', {})
    # return HttpResponse('welcomr yo the jungle')

def signup_view(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        login(request, user)
        return redirect('index')
    return render(request, 'registration/signup.html', {'form': form})
