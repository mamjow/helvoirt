"""Helvoirt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
# from homepage.Api.view import BlogListAPI
from accounts.views import login_user
from accounts.views import signup_user
from homepage.views import TemplateView

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('ckeditor/', include('ckeditor_uploader.urls')),
                  url(r'^login/$', login_user, name='login'),
                  url(r'^signup/$', signup_user, name='signupuser'),
                  url('', include('homepage.urls')),
                  # url('home/', include('homepage.urls'), name='home-blog'),
                  path('accounts/', include('accounts.urls')),
                  # path('homepage/', include('homepage.urls')),
                  path('accounts/', include('django.contrib.auth.urls')),

                  # REST
                  url('api/blog/', include('homepage.Api.urls', 'blog_api')),
                  url('api/account/', include('accounts.Api.urls', 'account_api')),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

