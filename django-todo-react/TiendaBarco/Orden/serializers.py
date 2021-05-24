from rest_framework import serializers
from .models import Orden

class OrdenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orden
        fields = ('orden_id', 'cliente', 'direccion_entrega', 'fecha')