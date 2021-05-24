from django.urls import path, include

from . import views
from rest_framework import routers


urlpatterns = [
    path('crearOrden/', views.CreateOrden.as_view()),
    path('filtrarOrdenesByClienteAndFecha/', views.OrdenFilterByDate.as_view()),
]