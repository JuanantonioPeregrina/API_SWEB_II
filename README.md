
# API REST de Videojuegos

## Descripción

Este proyecto consiste en el desarrollo de una API RESTful para la gestión de videojuegos, consolas y empresas desarrolladoras. Se ha implementado en **Node.js** utilizando **Express** y se conecta a una base de datos **MongoDB**. Además, integra datos de una API externa (RAWG) y permite la carga de datos desde un archivo JSON.

El proyecto se ha realizado como parte de la asignatura **Sistemas Web II (SW2)**.

---

## 📚 Tabla de Contenido
- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Mapa de rutas de la API](#mapa-de-rutas-de-la-api)
- [Ejemplos de uso de la API](#ejemplos-de-uso-de-la-api)
- [Datos iniciales](#datos-iniciales)
- [Posibles mejoras](#posibles-mejoras)
- [Equipo de desarrollo](#equipo-de-desarrollo)
- [Licencia](#licencia)


## Tecnologías utilizadas

- Node.js (v18.x)
- Express
- MongoDB
- Axios (para llamadas a la API externa)
- xml2js (lectura de XML)
- EJS (vistas básicas)
- Swagger UI Express (documentación)
- YAML (OpenAPI 3.0.3)

---

## ⚙️ Requisitos previos

- **Node.js** versión >= 18.x
- **MongoDB** versión >= 6.x (ejecutándose en local)
- Conexión a Internet para consultas a la API RAWG (con fallback en caso de caída).

Se recomienda usar **Postman** o herramientas similares para probar la API de forma sencilla.
---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/JuanantonioPeregrina/API_SWEB_II.git
cd api-sweb
```

2. Instalaciones:

```bash
npm i
npm install axios
npm i swagger-ui-express
```

3. En otra terminal hay que acceder a mongosh poniendo:

```bash
mongosh
```

4. Comprobar que dentro de api_SWEB_II exiten las colecciones consolas, empresas y videojuegos:

```bash
use api_SWEB_II 
show collections
```

5. Los datos se cargan haciendo uso de este comando en otra terminal (situarse en api-sweb/scripts):

```bash
node seeds.js
```

6. Levantar el servidor:

```bash
npm start
```

7. Acceder en el navegador:

* Home: [http://localhost:3000](http://localhost:3000)
* Documentación Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---
---

## 🛠️ Variables de entorno

Para el acceso a la API RAWG es necesario configurar la clave de API, es posible mediante esta url: https://rawg.io/apidocs

Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

```

RAWG_API_KEY=tu_clave_de_rawg

Si no desea registrarse contacte con el alumno Juan Antonio o bien Jorge Ángel y le proporcionamos nuestra propia API_KEY.

```

## 📁 Estructura del proyecto

```
api-sweb/
├── bin/                  # Arranque del servidor
├── controllers/          # Lógica de negocio
├── data/                 # Datos XML y JSON iniciales
├── db/                   # Conexión a MongoDB
├── public/               # Archivos estáticos
├── routes/               # Definición de rutas
├── scripts/              # Scripts auxiliares (carga de datos)
├── views/                # Vistas EJS
├── app.js                # Punto de entrada de la aplicación
├── openapi.yml           # Documentación de la API (OpenAPI 3.0)
├── package.json          # Dependencias y scripts npm
├── vgchartz-2024.json    # Dataset inicial (1000+ videojuegos)
└── README.md             # Este documento
```



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

---

## Datos iniciales

De partida nos basamos en un dataset en formato JSON (`vgchartz-2024.json`) con más de 1000 videojuegos para inicializar la base de datos. 
No obstante, esto tan solo nos proporcionaba una colección por lo que simulamos mediante un script (X) datos fictios lo más realistas posibles concretados en los 3 ficheros JSON (...).

---

## Integración con API externa (RAWG)

* Se utiliza la API de RAWG para buscar videojuegos mediante la ruta `/rawg/search`. Por ejemplo: http://localhost:3000/rawg/search?query=halo
* Los resultados se guardan en MongoDB para disponer de fallback en caso de fallo de la API externa. 
* Se almacenan los datos de dos maneras: 1. Se incorpora/actualiza el campo de tiendas en la colección de videojuegos. 2.Almacenamos todas las variables que se consumen de la API externa por si no disponemos de ese videojuego en concreto. Se puede comprobar el funcionamiento ya que indica la fuente si proviene de rawg o local y explicar el fallback.

---

## 🗺️ Mapa de rutas de la API

### 🎮 Videojuegos
| Método   | Ruta                         | Descripción                           |
|----------|------------------------------|---------------------------------------|
| GET      | /videojuegos                 | Obtener lista de videojuegos          |
| POST     | /videojuegos                 | Crear un nuevo videojuego             |
| GET      | /videojuegos/{id}            | Obtener videojuego por ID             |
| PUT      | /videojuegos/{id}            | Actualizar videojuego por ID          |
| DELETE   | /videojuegos/{id}            | Eliminar videojuego por ID            |

---

### 🕹️ Consolas
| Método   | Ruta                         | Descripción                           |
|----------|------------------------------|---------------------------------------|
| GET      | /consolas                    | Obtener lista de consolas             |
| POST     | /consolas                    | Crear una nueva consola               |
| GET      | /consolas/{id}               | Obtener consola por ID                |
| PUT      | /consolas/{id}               | Actualizar consola por ID             |
| DELETE   | /consolas/{id}               | Eliminar consola por ID               |
| GET      | /consolas/{id}/videojuegos   | Listar videojuegos en una consola     |
| POST     | /consolas/{consolaId}/videojuegos/{videojuegoId} | Añadir videojuego a consola   |
| DELETE   | /consolas/{consolaId}/videojuegos/{videojuegoId} | Eliminar videojuego de consola |
| PUT      | /consolas/{consolaId}/videojuegos/{videojuegoOldId}/{videojuegoId} | Actualizar videojuego en consola |

---

### 🏢 Empresas
| Método   | Ruta                          | Descripción                          |
|----------|-------------------------------|--------------------------------------|
| GET      | /empresas                     | Obtener lista de empresas            |
| POST     | /empresas                     | Crear una nueva empresa              |
| GET      | /empresas/{id}                | Obtener empresa por ID               |
| PUT      | /empresas/{id}                | Actualizar empresa por ID            |
| DELETE   | /empresas/{id}                | Eliminar empresa por ID              |
| GET      | /empresas/{id}/videojuegos    | Listar videojuegos de una empresa    |
| POST     | /empresas/{empresaId}/consolas/{consolaId} | Añadir consola a empresa      |
| DELETE   | /empresas/{empresaId}/consolas/{consolaId} | Eliminar consola de empresa    |
| PUT      | /empresas/{empresaId}/consolas/{consolaOldId}/{consolaId} | Actualizar consola en empresa  |

---

### 🔍 API externa RAWG
| Método   | Ruta                          | Descripción                           |
|----------|-------------------------------|----------------------------------------|
| GET      | /rawg/search?query={nombre}   | Buscar videojuegos en RAWG (con fallback local) |

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

---
---

## 📄 Licencia

Este proyecto está licenciado bajo:

### [Creative Commons Reconocimiento-NoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/deed.es)

### Condiciones:

* **Reconocimiento**: Debe darse crédito de manera adecuada a los autores del proyecto.
* **NoComercial**: No se permite utilizar el material con fines comerciales.
* **Sin restricciones adicionales**: No se pueden aplicar restricciones legales o tecnológicas adicionales.

### Permite:

* Copiar y redistribuir el material en cualquier medio o formato.
* Adaptar, transformar y crear a partir del material.

> Proyecto realizado con fines académicos en el contexto de la asignatura **Sistemas Web II** del Grado en Ingeniería Informática.







