from django.db import models

class Cliente(models.Model):
    cliente_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=True, null=True)
    correo = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cliente'