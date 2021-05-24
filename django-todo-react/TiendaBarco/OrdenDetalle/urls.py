from django.urls import path, include

from .views import CreateOrdenDetalle

urlpatterns = [
    path(r'crear_orden_detalle/', CreateOrdenDetalle.as_view(), 'crear_orden_detalle'),

]