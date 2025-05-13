# API REST de Videojuegos

## Descripción

Este proyecto consiste en el desarrollo de una API RESTful para la gestión de videojuegos, consolas y empresas desarrolladoras. Se ha implementado en **Node.js** utilizando **Express** y se conecta a una base de datos **MongoDB**. Además, integra datos de una API externa (RAWG) y permite la carga de datos desde un archivo XML.

El proyecto se ha realizado como parte de la asignatura **Sistemas Web II (SW2)**.

---

## Tecnologías utilizadas

* Node.js (v18.x)
* Express
* MongoDB
* Axios (para llamadas a la API externa)
* xml2js (lectura de XML)
* EJS (vistas básicas)
* Swagger UI Express (documentación)
* YAML (OpenAPI 3.0.3)

---

## Estructura del proyecto

```
api-sweb/
├── bin/                    # Arranque del servidor
├── controllers/            # Lógica de negocio
├── data/                   # Datos XML y JSON iniciales
├── db/                     # Conexión a MongoDB
├── public/                 # Archivos estáticos
├── routes/                 # Definición de rutas
├── scripts/                # Scripts auxiliares (carga de datos)
├── views/                  # Vistas EJS
├── app.js                  # Punto de entrada de la aplicación
├── openapi.yml             # Documentación de la API (OpenAPI 3.0)
├── package.json            # Dependencias y scripts npm
├── vgchartz-2024.json      # Dataset inicial (1000+ videojuegos)
├── README.md               # Este documento
```

---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <URL-del-repo>
cd api-sweb
```

2. Instalar las dependencias:

```bash
npm install
```

3. Iniciar MongoDB en local:

```bash
mongod --dbpath <ruta-a-tu-carpeta-de-datos>
```

4. (Opcional) Cargar el dataset inicial en la base de datos:

```bash
npm run load-data
```

5. Levantar el servidor:

```bash
npm start
```

6. Acceder en el navegador:

* Home: [http://localhost:3000](http://localhost:3000)
* Documentación Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Funcionalidades implementadas

* CRUD de videojuegos, consolas y empresas.
* Relación entre videojuegos y consolas (compatibilidad).
* Relación entre videojuegos y empresas (desarrolladoras).
* Búsqueda de videojuegos a través de la API externa RAWG.
* Carga de datos desde archivo XML (consolas.xml).
* Fallback local en caso de caída de RAWG.
* Paginación en las rutas de listado.
* Documentación de la API en formato OpenAPI (Swagger UI).

---

## Documentación OpenAPI

* Archivo: `openapi.yml` (en la raíz del proyecto).
* Describe todos los endpoints de la API:

  * CRUD de videojuegos, consolas, empresas.
  * Búsqueda en RAWG.
  * Paginación y parámetros.
  * Esquemas de datos (Videojuego, Consola, Empresa).

Para visualizarla:

* Ir a: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Datos iniciales

Se proporciona un dataset en formato JSON (`vgchartz-2024.json`) con más de 1000 videojuegos para inicializar la base de datos.

---

## Integración con API externa (RAWG)

* Se utiliza la API de RAWG para buscar videojuegos mediante la ruta `/rawg/search`.
* Los resultados se guardan en MongoDB para disponer de fallback en caso de fallo de la API externa.

---

## Requisitos del proyecto (cumplidos)

* ✅ CRUD de al menos 3 recursos.
* ✅ Consumo de datos en JSON y XML.
* ✅ Integración con una API externa.
* ✅ Fallback si la API externa falla.
* ✅ Dataset de 1000+ documentos.
* ✅ Paginación y filtrado.
* ✅ Documentación OpenAPI.

---

## Equipo de desarrollo

* Juan Antonio Peregrina 
* Jorge Ángel Vázquez 
* Raquel Cerezo 
* Carlos Ramos
* Iván Martínez
* Antonio Carrasco



## Notas

Este proyecto se ha realizado con fines académicos como práctica de la asignatura SW2. Se ha intentado seguir buenas prácticas en la medida de lo posible y simular un entorno de trabajo real.

---

## Licencia

Proyecto educativo - No comercial.


