from django.contrib import admin
from .models import Cliente

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('cliente_id', 'nombre', 'correo')

# Register your models here.

admin.site.register(Cliente, ClienteAdmin)