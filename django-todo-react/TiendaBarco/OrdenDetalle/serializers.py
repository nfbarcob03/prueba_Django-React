from rest_framework import serializers
from .models import OrdenDetalle

class OrdenDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenDetalle
        fields = ('orden_detalle_id', 'orden', 'producto', 'observacion')