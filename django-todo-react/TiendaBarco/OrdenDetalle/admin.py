from django.contrib import admin
from .models import OrdenDetalle

class OrdenDetalleAdmin(admin.ModelAdmin):
    list_display = ('orden', 'producto', 'observacion')

# Register your models here.

admin.site.register(OrdenDetalle, OrdenDetalleAdmin)