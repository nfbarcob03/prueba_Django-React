from django.shortcuts import render
from rest_framework import viewsets,generics
from .serializers import ProductoPermitidoSerializer
from .models import ProductoPermitido
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class ProductoPermitidoView(generics.ListAPIView):
    queryset = ProductoPermitido.objects.all()
    serializer_class = ProductoPermitidoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cliente', 'producto']