from django.urls import path, include

from . import views
from rest_framework import routers


urlpatterns = [
    path('asociarClienteProducto/', views.AsociarClienteProducto.as_view()),
    path('listarProductoPermitido/', views.ProductoPermitidoView.as_view()),
]