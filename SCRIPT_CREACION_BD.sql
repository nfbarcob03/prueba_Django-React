Comandos en postgres para la creacion de la base de datos

--crea la base de datos NEGOCIO
-- DROP DATABASE "NEGOCIO";

CREATE DATABASE "NEGOCIO";

-- Conectarse a la base de datos
\c "NEGOCIO";

--Crear usuario para la BD
-- DROP ROLE nfbb;
create user nfbb with encrypted password 'barco';
grant all privileges on database "NEGOCIO" to nfbb;


--Crear tabla CLIENTE
CREATE TABLE Cliente (
	cliente_id SERIAL PRIMARY KEY,
	nombre VARCHAR(40),
	correo VARCHAR(40)
);

INSERT INTO Cliente (nombre, correo) VALUES ('Henry Villamizar', 'example1@gmmail.co'),
 ('Carolina Hernández', 'example2@gmmail.co'), 
 ('Juan Carlos Gómez', 'example3@gmmail.co');

--Crear tabla PRODUCTO
CREATE TABLE Producto (
	producto_id SERIAL PRIMARY KEY,
	nombre VARCHAR(40),
	precio BIGINT,
	descripcion VARCHAR(250)
);

INSERT INTO Producto (nombre, precio, descripcion) VALUES ('Lomitos de atun', 4500, 'Lomitos de atun en agua traidos de las profundidades de las costas de chile'),
 ('Dron aereo', 1500000, 'Dron aereo que alcanza 30 km/h y su bateria dura hasta 5h'),
 ('Conservas de vegetales', 2500, 'Mezcla de arbeja, zanahoria y maicito conserbada en salmuera'),
 ('Coputador portatil lenovo thinkpad', 3000000, 'Copmputador marca lenovo ultra delgado con 6GB de Ram y 1T de disco en estado solido'),
 ('Bianchi', 200, 'Caramelo pequeño relleno de chocolate'),
 ('Queso cuajada', 5600, 'Libr (500gr) de queso cuajada');

--Crear tabla ORDEN
CREATE TABLE Orden (
	orden_id SERIAL PRIMARY KEY,
	cliente_id INT,
	direccion_entrega VARCHAR(250),
	fecha TIMESTAMP,
	FOREIGN KEY (cliente_id) REFERENCES CLIENTE (cliente_id)
);

--Crear tabla ORDEN_DETALLE
CREATE TABLE Orden_Detalle (
	orden_detalle_id SERIAL PRIMARY KEY,
	orden_id INT,
	producto_id INT,
	observacion VARCHAR(250),
	FOREIGN KEY (orden_id) REFERENCES ORDEN (orden_id),
	FOREIGN KEY (producto_id) REFERENCES PRODUCTO (producto_id)
	
);

--Crear tabla PRODUCTO_PERMITIDO
CREATE TABLE Producto_Permitido (
	producto_permitido_id SERIAL PRIMARY KEY,
	cliente_id INT,
	producto_id INT,
	FOREIGN KEY (cliente_id) REFERENCES CLIENTE (cliente_id),
	FOREIGN KEY (producto_id) REFERENCES PRODUCTO (producto_id)
	
);

INSERT INTO Producto_Permitido(cliente_id,producto_id) VALUES (1,2),(1,4),(1,5),(1,3),(2,2),(2,3),(3,1);


