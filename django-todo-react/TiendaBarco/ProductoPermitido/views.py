from django.shortcuts import render
from rest_framework import viewsets,generics
from rest_framework.views import APIView
from .serializers import ProductoPermitidoSerializer
from .models import ProductoPermitido
from django_filters.rest_framework import DjangoFilterBackend
import json
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class ProductoPermitidoView(generics.ListAPIView):
    """
Ver los prodcutos permitidos por cliente o por preoducto:
tipo: GET
input:
 """
    queryset = ProductoPermitido.objects.all()
    serializer_class = ProductoPermitidoSerializer
    filterset_fields = ['cliente', 'producto']
    
    
class AsociarClienteProducto(APIView):
    """
Crear una nueva relacion producto permitido (cliente - producto):
tipo: POST
input: request body
 """
    model = ProductoPermitido
    
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        cliente = int(data.get('cliente'))
        producto = int(data.get('producto'))
        orden_data = {
            'cliente': cliente,
            'producto': producto
        }
        
        serializer = ProductoPermitidoSerializer(data=orden_data)
        if serializer.is_valid():
            producto_permitido = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)