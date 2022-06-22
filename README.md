# Next.js WorkBook App

Aplicación destinada a crear una lista de tareas al estilo de Open-jira.
La app se creo con NextJs con typescript y se creo un CRUD con la api de NextJs
y para la base de datos se utilizó MongoDB y Docker para generar la imagen.

Para correr localmente la aplicacion se necesita la base de datos:

```
docker-compose up -d
```

- El -d significa **detached**

- MongoDB URL

```
mongodb://localhost:27017/entriesdb

```

## Configurar las variables de entorno .

- Renombrar el archivo **.env.template** a **.env**

## Llenar la base de datos con informacion de prueba

llamar a:

```
    http://localhost:3000/api/seed
```
