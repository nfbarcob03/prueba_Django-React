from django.contrib import admin
from .models import Producto

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('producto_id', 'nombre', 'precio', 'descripcion')

# Register your models here.

admin.site.register(Producto, ProductoAdmin)