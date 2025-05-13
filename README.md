
# API REST de Videojuegos

## Descripción

Este proyecto consiste en el desarrollo de una API RESTful para la gestión de videojuegos, consolas y empresas desarrolladoras. Se ha implementado en **Node.js** utilizando **Express** y se conecta a una base de datos **MongoDB**. Además, integra datos de una API externa (RAWG) y permite la carga de datos desde un archivo JSON.

El proyecto se ha realizado como parte de la asignatura **Sistemas Web II (SW2)**.

---

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

2. Instalar las dependencias:

```bash
npm install
npm i
```

3. Iniciar MongoDB en local:

```bash
mongod --dbpath C:\MongoDB\data\db
```
Está pendiente decir como se importar los datos

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
---

## 🛠️ Variables de entorno

Para el acceso a la API RAWG es necesario configurar la clave de API, es posible mediante esta url: https://rawg.io/apidocs

Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

```

RAWG_API_KEY=tu_clave_de_rawg

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

* Se utiliza la API de RAWG para buscar videojuegos mediante la ruta `/rawg/search` filtrando por la tienda en la que se encuentra ese videojuego disponible. Por ejemplo: /halo (buscarlo)
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







