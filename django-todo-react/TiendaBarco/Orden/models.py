from django.db import models
from Cliente.models import Cliente

class Orden(models.Model):
    orden_id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, models.DO_NOTHING, blank=True, null=True)
    direccion_entrega = models.CharField(max_length=250, blank=True, null=True)
    fecha = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orden'