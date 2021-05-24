from rest_framework import serializers
from .models import ProductoPermitido

class ProductoPermitidoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductoPermitido
        fields = ('producto_permitido_id', 'cliente', 'producto')