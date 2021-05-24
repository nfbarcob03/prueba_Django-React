import datetime
import pytz

local_tz = pytz.timezone('America/Bogota')
from django.utils import timezone
from django.shortcuts import render
from django.views.generic.edit import CreateView, DeleteView, UpdateView , FormView , View
from django.views.generic.list import ListView
from .models import OrdenDetalle
from Orden.models import Orden
from Producto.models import Producto
from .serializers import OrdenDetalleSerializer
from django.http import JsonResponse
import json
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

class CreateOrdenDetalle(CreateView):
    model = OrdenDetalle

    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        orden = data.get('orden')
        productos = data.get('producto')
        observacion = data.get('observacion')

        product_data = {
            'orden': orden,
            'producto': producto,
            'observacion':observacion,
        }

        data = {
            "message": f"Nuevo producto agregado a la orden: orden:{orden_detalle.id}, producto:{Producto.objects.get(producto_id=orden_detalle.producto)}"
        }
        return JsonResponse(data, status=201)