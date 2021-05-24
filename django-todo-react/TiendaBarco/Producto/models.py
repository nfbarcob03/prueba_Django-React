from django.db import models

class Producto(models.Model):
    producto_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=True, null=True)
    precio = models.BigIntegerField(blank=True, null=True)
    descripcion = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'producto'