from datetime import datetime
from .models import Orden
from Producto.models import Producto
import json
from ProductoPermitido.models import ProductoPermitido
from .serializers import OrdenSerializer
from OrdenDetalle.serializers import OrdenDetalleSerializer
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from .filters import OrdenFilter
from rest_framework import generics



class CreateOrden(APIView):
    model = Orden
    
    def validarProductosPedidosConProductosPermitidos(self,productos_pedidos,productos_permitidos):
        valido = True
        for producto in productos_pedidos:
            if int(producto) not in productos_permitidos:
                valido = False
                print(producto)
        return valido
    
    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))
        cliente = int(data.get('cliente'))
        direccion_entrega = str(data.get('direccion_entrega'))
        productos  = data.get('productos').strip('][').split(',')
        observaciones  = data.get('observaciones').strip('][').split(',')
        now = datetime.now()
        fecha = now.strftime("%Y-%m-%d %H:%M:%S")
        
        if len(productos) >5:
            return Response(f"La cantidad de pedidos en la orden excede la maxima permitida. Permitida (5), pedida: {len(productos)}", status=status.HTTP_400_BAD_REQUEST)
        
        productos_permitidos_cliente_lista_raw = ProductoPermitido.objects.filter(cliente=cliente)
        productos_permitidos_cliente_lista_filter = [producto.producto_id for producto in productos_permitidos_cliente_lista_raw]
        orden_data = {
            'cliente': cliente,
            'direccion_entrega': direccion_entrega,
            'fecha':fecha,
        }
        
        serializer = OrdenSerializer(data=orden_data)
        
        if serializer.is_valid():
            if self.validarProductosPedidosConProductosPermitidos(productos,productos_permitidos_cliente_lista_filter):
                orden = serializer.save()
                for producto,observacion in zip(productos,observaciones):
                    orden_detalle_data = {
                        'orden':orden.orden_id,
                        'producto':producto,
                        'observacion':observacion
                    }
                    serializer = OrdenDetalleSerializer(data=orden_detalle_data)
                    if serializer.is_valid():
                        orden_detalle = serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response("Uno o mas productos solicitados no estan permitidos para el cliente", status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrdenFilterByDate(generics.ListAPIView):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer
    filter_class = OrdenFilter
    
