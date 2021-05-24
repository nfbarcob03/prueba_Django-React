from django.db import models
from Orden.models import Orden
from Producto.models import Producto


class OrdenDetalle(models.Model):
    orden_detalle_id = models.AutoField(primary_key=True)
    orden = models.ForeignKey(Orden, models.DO_NOTHING, blank=True, null=True)
    producto = models.ForeignKey(Producto, models.DO_NOTHING, blank=True, null=True)
    observacion = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orden_detalle'