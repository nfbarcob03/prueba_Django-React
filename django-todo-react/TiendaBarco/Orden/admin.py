from django.contrib import admin
from .models import Orden

class OrdenAdmin(admin.ModelAdmin):
    list_display = ('orden_id', 'cliente', 'direccion_entrega', 'fecha')

# Register your models here.

admin.site.register(Orden, OrdenAdmin)