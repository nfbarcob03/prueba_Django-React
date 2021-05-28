# TiendaBarco
Este proyecto permite tener una base de datos de clientes, productos y productos especificados para cada cliente y realizar ordenes de compra para los clientes a los productos que tiene permitidos.
Este propyecto esta desarrollado con python (framwork Django - Django rest framework) para el backend y javascript (React.js) para el fronted siendo una aplicación desacoplada donde el fronted y el backend se comunican por servicios API-REST. La base de datos se gestiona con Postgresql

## Requerimientos

- instalar postgresql como gestor de bases de datos (https://www.postgresql.org/download/)
- instalar python superior a 3.7
- instalar Git para clonar el repositorio
- instalar Nodejs
- Si va a visualizar el aplicativo desde google chrome debe instalar la extension Allow CORS: Access-Control-Allow-Origin (https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related)
Configuración CORS:
	Access-Control-Allow-Methods: value GET, PUT, POST, DELETE, HEAD, OPTIONS
	Access-Control-Allow-Headers: marcar 
	Access-Control-Allow-Credentials: marcar
	Access-Control-Allow-Origin: marcar *
tutorial de uso: https://youtu.be/KruSUqLdxQA

## Como montar la aplicación

Tener encuenta que http://127.0.0.1:puerto/ y http://localhost:puerto/ son direcciones que se refieren al mismo servidor local.

### 0. Clonar el reposiotrio

Esto lo puede hacer haciendo 

```
git clone https://github.com/nfbarcob03/prueba_Django-React.git
```

### 1. Montar la base de datos:

La aplicación esta diseñada para interactuar con una base de datos en postgresql. El archivo "SCRIPT_CREACION_BD.sql" tiene las sentencias
para la creacion de la base de datos junto con las tablas necesarias que conforman el modelo de datos y registros mock para las tablas Cliente,
Producto y Producto_Permitido.

**El diagrama E-R de la base de datos se puede encontrar en el archivo "diagrama E-R Base de datos.png"**

### 2. Montar el backend con django rest framework
El backend de la aplicación esta desarrollado con python, mas especificamente con django y django rest framework para manejar la logica de negocio de 
la aplicación, comunicarse con la base de datos y exponer funcionalidades como servicios API-REST consumibles por un fronted.

Para la implementación del backend basta con: 
- ingresar a la carpeta django-todo-react (windows abrir el cmd en la carpeta que se clono el repositorio y ejecutar ```cd django-todo-react```)
- inicializar el entorno virtual, esto lo puede hacer utilizando el entorno que trae el repositorio (abrir el cmd parado en la carpeta django-todo-react y correr ```.\env\Scripts\activate```) o creando uno nuevo (eliminando la carpeta env y corriendo en el cmd el comando ```py -m venv ./env``` parado en la carpeta django-todo-react y luego correr ```.\env\Scripts\activate``` para activar el entorno virtual)
- Una vez iniciado el entorno virtual entrar a la carpeta TiendaBarco y correr el comando ```pip install -r requirements.txt``` para instalar las librerias necesarias del proyecto
- Abrir el archivo **\django-todo-react\TiendaBarco\TiendaBarco\settings.py** para configurar la base de datos. Buscar el parametro **DATABASES** y configurar con los parametros de conexión 
de la base de datos creada en el paso **"1. Montar la base de datos"**. El script  **"SCRIPT_CREACION_BD.sql"** esta configurado para ser congruente con la configuración de la base de datos que trae el proyecto, si se cambia algo afectara la configuración del backend de django y debe ser modificado tambien en el archivo **setting.py**

```
DATABASES = {
'default': {
	'ENGINE': 'django.db.backends.postgresql_psycopg2', ---->Libreria utilizada para conectar django con una BD postgres, no cambiar en lo posible.
	'NAME': 'NEGOCIO', -----> Nombre de la BD, si se corrio tal cual "SCRIPT_CREACION_BD.sql" dejar este mismo.
	'USER': 'postgres', -----> Este es el usuario root, si creo un usuario eespecifico para el proyecto y que tenga permisos sobre la base de datos del proyecto, especificarlo aca.
	'PASSWORD': '950303', ----> contraseña del usuario que se utiliza para acceder a la BD.
	'HOST': 'localhost', ------> host donde se alberga la base de datos. Por defecto es local. 
	'PORT': '5432', ---------> puerto en el que escucha la BD, por defecto es el 5432.
	}
}
```	

- Una vez configurada la BD podra correr el backend corriendo desde el cmd el comando ```python manage.py runserver``` parado en la carpeta TiendaBarco
- ir a http://127.0.0.1:8000


### 3. Montar el frontend con react.js
- ingresar a la carpeta fronted de la aplicación y abrir una ventana de comandos cmd, correr ```npm install``` para instalar las dependencias que se encuentran en el packet.json
- correr npm start para correr el servidor del frotend
- ir a http://localhost:3000/ 


### 4. Servicios API-REST expuestos por el backend:
Actualmente el backend cuenta con los siguietes servicios API-REST

- **CreateOrden**: Este metodo es el empleado para generar una orden para un cliente y sus respectivas orden_detalle. Se le envian parametros como id del cliente y lista de id de productos para generar la orden. El metodo verifica que los productos pedidos esten relacionados en el modelo ProductoPermitido (tabla producto_permitido) con el cliente al que se le hace la orden, tambien verifica que la cantidad de articulos a pedir no sea mayor a 5. Es un meotod POST que lleva un cuerpo (body) en formato json como el que se muestra a continuación:
Tipo:
	POST	
URL: 
	```http://127.0.0.1:8000/orden/crearOrden/```
BODY
	```
	{
	"cliente":"1", 
	"direccion_entrega":"calle 51 # 26 -19",
	"productos":"[5,2]",
	"observaciones":"[sin cebolla, sin queso]"
	}
	```
	
Parametros:
	- cliente: el id del cliente al que se le desea realizar la orden
	- dirección: dirección de entrga de la orden
	- productos: lista de los id de los productos para la orden. El metodo valida que no sea superior a 5 productos y que el cliente si tenga permitido ordenar esos productos.
	- observaciones: son las observaciones que se hacen en el detalle de cada producto.

	
- **OrdenFilterByDate**: Este metodo permite consultar todas las ordenes disponibles en la tabla y modelo Orden, consultarlas filtradas por Cliente y/o apartir de una fecha, o hasta una fecha o en un rango de fechas. Es un metodo GET, por tanto los parametros se pasan por la URL de la siguiente forma:
Tipo:
	GET	
URL:
	```http://127.0.0.1:8000/orden/filtrarOrdenesByClienteAndFecha/ ```-----> Para consultar todas las ordenes del sistema
	```http://127.0.0.1:8000/orden/filtrarOrdenesByClienteAndFecha/?cliente=1 ```-----> Para consultar las ordenes del cliente con id 1
	```http://127.0.0.1:8000/orden/filtrarOrdenesByClienteAndFecha/?cliente=1&start_date=2021-05-23 16:07:08 ```---> Para consultar todas las ordenes del clinete con id 1 a partir de la fecha start_date
	```http://127.0.0.1:8000/orden/filtrarOrdenesByClienteAndFecha/?cliente=1&end_date=2021-05-23 21:07:55 ```----> Para consultar todas las ordenes del cliente con id 1 hasta la fecha end_date
	```http://127.0.0.1:8000/orden/filtrarOrdenesByClienteAndFecha/?cliente=1&start_date=2021-05-23 16:07:08&end_date=2021-05-23 21:07:55 ```--->Para consultar todas las ordenes del cliente con id 1 desde la fecha start_date hasta la fecha end_date


- **CrearListarClientes**: Este metodo puede ser GET (para listar todos los clientes) o POST (para crear un cliente)
Tipo: 
	GET.
URL:
	```http://127.0.0.1:8000/cliente/crearListarClientes/ ``` ------>Para listar todos los clientes
Tipo: 
	POST
URL:
	```http://127.0.0.1:8000/cliente/crearListarClientes/ ``` ------>Para crear nuevo cliente
BODY
	```
	{
	"nombre" : "Juan Carlos Velz",
	"correo" : "jvelñez@gmail.com.co"
	}
	```
Parametros: 
	- nombre: nombre del cliente
	-correo: coreo del cliente
 
- **ClienteDetalle**: Este metodo puede ser GET(obtener el detalle de un cliente por su clave primaria), PUT ( modificar un cliente) o DELETE (eliminar un cliente por su clave primaria)
Tipo: 
	GET.
URL:
	```http://127.0.0.1:8000/cliente/clienteDetalle/${cliente_id} ``` ------>Para obtener detalles de un cliente
Tipo: 
	DELETE.
URL:
	```http://127.0.0.1:8000/cliente/clienteDetalle/${cliente_id} ``` ------>Para para eliminar cliente
Tipo: 
	PUT.
URL:
	```http://127.0.0.1:8000/cliente/clienteDetalle/${cliente_id} ``` ------>Para actualizar un cliente
BODY
	```
	{
	"cliente_id": 1,
	"nombre": "Henry Villamizar",
	"correo": "example1@gmmail.co"
	}
	 ```
Parametros: 
	- cliente_id: id del cliente
	- nombre: nombre del cliente
	- correo: coreo del cliente


- **CrearListarProductos**: Este metodo puede ser GET (para listar todos los productos) o POST (para crear un producto)
Tipo: 
	GET.
URL:
	```http://127.0.0.1:8000/cliente/crearListarProductos/ ``` ------>Para listar todos los clientes
Tipo: 
	POST
URL:
	```http://127.0.0.1:8000/cliente/crearListarProductos/ ``` ------>Para crear nuevo cliente
BODY
	```
	{
	"nombre": "Postre de milo",
	"precio": 1700,
	"descripcion": "Postre de tres leches"
	}
	```
Parametros: 
	- nombre: nombre del producto
	- precio: precio del producto
	- descripcion: descripcion del producto

 
- **ProductoDetalle**: Este metodo puede ser GET(obtener el detalle de un producto por su clave primaria), PUT ( modificar un producto) o DELETE (eliminar un producto por su clave primaria)
Tipo: 
	GET.
URL:
	```http://127.0.0.1:8000/cliente/prodcutoDetalle/${producto_id} ``` ------>Para obtener detalles de un producto
Tipo: 
	DELETE.
URL:
	```http://127.0.0.1:8000/cliente/prodcutoDetalle/${producto_id} ``` ------>Para para eliminar producto
Tipo: 
	PUT.
URL:
	```http://127.0.0.1:8000/cliente/prodcutoDetalle/${producto_id} ``` ------>Para actualizar un producto
BODY
	```
	{
	"producto_id":"1"
	"nombre": "Postre de milo",
	"precio": 1700,
	"descripcion": "Postre de tres leches"
	}
	 ```
Parametros: 
	- producto_id: id del producto
	- nombre: nombre del producto
	- precio: precio del producto
	- descripcion: descripcion del producto

- **ListarProductoPermitido**: Este metodo permite consultar todas las relaciones cliente - producto del sistema, consultarlas filtradas por Cliente y/o producto. Es un metodo GET, por tanto los parametros se pasan por la URL de la siguiente forma:
Tipo:
	GET	
URL:
	 ```http://127.0.0.1:8000/producto-permitido/listarProductoPermitido/ ```-----> Para consultar todas las relaciones cliente - producto del sistema
	 ```http://127.0.0.1:8000/producto-permitido/listarProductoPermitido/?cliente=1 ```-----> Para consultar las relaciones cliente - producto del cliente con id 1
	 ```http://127.0.0.1:8000/producto-permitido/listarProductoPermitido/?producto=1 ```---> Para consultar las relaciones cliente - producto del prodcuto con id 1

- **AsociarClienteProducto**: metodo POST que permite crear una nueva relacion cliente - producto en la BD
Tipo: 
	POST
URL:
	```http://127.0.0.1:8000/producto-permitido/asociarClienteProducto/ ```
BODY
	```
	{
	"cliente":"1"
	"producto":"1"
	}
	 ```
Parametros: 
	- cliente: id del cliente
	- producto: id del producto


Mas información sobre la aplicacion puede enocntrar ingresando al administrador:
```http://127.0.0.1:8000/admin/```
```http://127.0.0.1:8000/admin/doc/```