from django.db import models
from Cliente.models import Cliente
from Producto.models import Producto

class ProductoPermitido(models.Model):
    producto_permitido_id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, models.DO_NOTHING, blank=True, null=True)
    producto = models.ForeignKey(Producto, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'producto_permitido'