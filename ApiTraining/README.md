# API para organizar internamente los entrenamientos en un gimnasio.

Esta API permite publicar ejercicios para la gestión de los mismos en un
gimnasio.
Esta pensada para la gestión interna de un gimnasio dónde sólo los usuarios Admin podrán crear y eliminar rutinas de entrenamiento, y dónde cualquier usuario sea Admin o Normal podrá dar Like o añadir a sus favoritos las rutinas existentes.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- Node.js: [Descargar e instalar Node.js](https://nodejs.org/)
- Base de datos (por ejemplo, MySQL, PostgreSQL).

## Instalación

1. Clona este repositorio en tu máquina local.

2. Navega hasta el directorio del proyecto.

3. Instala las dependencias.

4. Configura las variables de entorno en un archivo `.env`. Puedes encontrar un ejemplo en `.env.example`.

5. Inicia la aplicación.

## Uso API

El proyecto se lanza ejecutando el comando npm install en tu terminal
Dispones de un script Start para inicializar el proyecto, en caso de ser la primera ocasión que se ejecuta el proyecto el terminal le pedirá ejecutar el scrip InitDb.
Dispones de un script ResetDb para eliminar si fuera necesario y a posterior crear la Base de Datos .
Dispones de un script PopulateDb por si fuera útil poblar la Base de Datos para las pruebas de la aplicación.
Dispones de un archivo para pruebas en POSTMAN, para el uso del mismo es necesario ejecutar antes el script populateDb.

## Entidades

- Users:

  - id
  - name
  - email
  - password
  - rol : Adimn / Normal
  - created_at
  - modify_at

- Training:

  - id
  - name
  - descripción
  - photo (Opcional)
  - typology
  - muscle_group
  - created_at
  - modify_at
  - id_user

- Favorites:

  - id
  - id_user
  - id_training
  - created_at

- Likes:
  - id
  - id_user
  - id_training
  - created_at

## Endpoints

- USERS
- **POST /register** Registro de usuario
- **POST /login** Logeo del usuario previamente registrado
- **POST /loginForgot** Solicitud de generar nueva contraseña
- **POST /loginReset/:token** Reseteo de la contraseña a través de link de recuperación
- **DELETE /removeUser/:id** Borrar a un usuario

- TRAINING
- **POST /training** Crear entrenamiento, sólo lo podrán hacer usuarios con Rol Admin
- **DELETE / training** Borrar entrenamiento , sólo lo podrán hacer usuarios con Rol Admin
- **DELETE / training/:idtraining** Borrar entrenamiento por Id seleccionado, sólo lo podrán hacer usuarios con Rol Admin
- **PUT / training/:idtraining** Modificar entrenamiento por Id seleccionado, sólo lo podrán hacer usuarios con Rol Admin
- **GET / training** Listar todos los entrenamientos, podemos además filtrar por tipologia, grupo muscular y ordenar por fecha, nombre o numero de likes con query strings
- **GET / training/:idtraining** Obtener entrenamiento por Id

- FAVORITOS
- **POST /fav/:idtraining** Dar favorito a un entrenamiento a través de su Id
- **DELETE /fav/:idtraining** Eliminar de favorito a un entrenamiento a través de su Id
- **GET /fav** Listar entrenamientos favoritos de un usuario

- LIKE
- **POST /like/:idtraining** Dar Like a un entrenamiento a través de su Id
- **DELETE /like/:idtraining** Eliminar Like a un entrenamiento a través de su Id
- **GET /sortLikes** Ordenar entrenamientos por numero de likes.

## Autores

- Angel Ares https://www.linkedin.com/in/ángel-a-b05205286/
- David Barreira https://www.linkedin.com/in/david-barreira-suarez/
- Luis Diaz https://www.linkedin.com/in/luisdiazvazquez/
- Patricia Lojo www.linkedin.com/in/patricia-lojo-zubeldia

## Enlace directo al repositorio

- https://github.com/AngelAresL/ApiTraining
