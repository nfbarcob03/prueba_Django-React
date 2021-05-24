from django.contrib import admin
from .models import ProductoPermitido

class ProductoPermitidoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'producto')

# Register your models here.

admin.site.register(ProductoPermitido, ProductoPermitidoAdmin)