from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Producto
from .serializers import ProductoSerializer


@api_view(['GET', 'POST'])
def CrearListarProductos(request):
    """
Listar los Producto o crear uno nuevo
input: request
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        prodcutos_sistema = Producto.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(prodcutos_sistema, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ProductoSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/prodcuto/crearListarProductos/?page=' + str(nextPage), 'prevlink': '/prodcuto/crearListarProductos/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def ProductoDetalle(request, pk):
    """
consultar, actualizar o eliminar un prodcuto segun su clave principal (pk) prodcuto_id
 """
    try:
        prodcuto = Producto.objects.get(pk=pk)
    except Prodcuto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductoSerializer(prodcuto,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductoSerializer(prodcuto, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        prodcuto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  