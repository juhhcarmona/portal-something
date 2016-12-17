from django.shortcuts import render
from .models import Post


def index(request):
    last_published_post = Post.objects.exclude(published_date__isnull=True).latest('published_date')
    item_of_the_day = Post.objects.all().exclude(published_date__isnull=True)[0]
    return render(request, 'portal/index.html', {"post": last_published_post, "item": item_of_the_day})

def list_all(request):
    return render(request, 'portal/list.html', {})

def list_item(request, pk):
    return render(request, 'portal/details.html', {"pk": pk})

def edit_item(request, pk):
    return render(request, 'portal/edit.html', {"pk": pk})

def new_item(request):
    return render(request, 'portal/new.html', {})


