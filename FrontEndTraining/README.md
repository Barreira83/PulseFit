# Pulse Fit App

_Descripción:_

Pulse Fit App es una aplicación web desarrollada con React y Vite (https://es.vitejs.dev) para la gestión interna de los distintos tipos de rutinas que pueden definir los entrenadores que forman parte de la plantilla para sus clientes.

_Instrucciones:_

Abrir proyecto Back End , a continuación dispones del enlace de este proyecto , imprescindible configurar .env -> ejecutar npm i -> npm ResetDb -> npm run start. Ya dispones de un usuario admin (admin@admin.com contraseña 123456), lo cual le servirá para hacer pruebas de las funciones de dicho rol, ya que cualquier usuario creado desde la app tendrá rol normal, será un admin quien a posteiror podrá agregarle un nuevo rol. Enlace al proyecto :

      https://github.com/AngelAresL/ApiTraining

Ejecutar proyecto Front End : cumplimentar .env -> npm i -> npm run start

_Dependencias._

"html2canvas": "^1.4.1",
"jspdf": "^2.5.1",
"prop-types": "^15.8.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-query": "^3.39.3",
"react-router-dom": "^6.0.2",
"sweetalert2-react-content": "^5.0.7"
"@types/react": "^18.2.43",
"@types/react-dom": "^18.2.17",
"@vitejs/plugin-react": "^4.2.1",
"bootstrap": "^5.3.2",
"eslint": "^8.55.0",
"eslint-plugin-react": "^7.33.2",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.5",
"react-bootstrap": "^2.10.0",
"sass": "^1.70.0",
"vite": "^5.0.8"

_Archivos principales:_

- _main.jsx_ Este es el archivo de entrada principal de la aplicación web React , el cual utiliza React Router y un contexto para proporcionar enrutamientos y gestión de estados . Utiliza ReactDOM para renderizar la aplicación en el elemento con el ID "root" en el documento HTML.

- _Layout.jsx_ En este archivo se declaran todas las rutas disponibles de la aplicación , diferenciando el acceso a contenido web en función del rol del usuario . Los usuarios "admin" tiene acceso a cualquier parte de la app , así como la posibilidad de añadir , modificar y/o eliminar entrenamientos, añadir a favoritos o darle like, cambio de rol de usuario, etc . Los usuarios de rol "normal" tan sólo podrán añadir entrenamientos a sus favoritos, o darle like a los mismos, también podría modificar sus datos de usuario como por ejemplo modificar su contraseña.

_Páginas_

- _HomePage.jsx_ Página principial de la app, a la cual tiene acceso cualquier usuario aunque no esté registrado. Lo que la app renderiza depende de dicho registro y login , teniendo acceso al contenido de app sólo los usuarios previamente identificados. Un usuario sin identificar solo disfruta de la página home dónde podrá darse de alta y acceder así al contenido.

- _RegisterPage.jsx_ Página con formulario para que los nuevos usuarios se registren en la página, por defecto todos los usuarios se registar con rol "normal", será un usuario "admin" el que a posterior le podría cambiar el rol.

          Aquí te muestro un ejemplo:

          Nombre: Ejemplo.
          Email: ejemplo@ejemplo.com
          contraseña: ******
          repite contraseña : ******

- _LoginPage_ Una vez registrado el usuario debe logearse , de ahí sacaremos su contexto y su rol, para que así la app renderice las páginas que el usuario puede ver según sus permisos. en esta página el usuario dispone de la opción "olvide mi contraseña" desde la cual recibirá un mail para el reseteo de la misma .

         Aquí te muestro un ejemplo:

          Email: ejemplo@ejemplo.com
          contraseña: ******

- _TrainingListPage_ Página que muestra todos los entrenamientos disponibles, cualquier usuario independientemente de su rol, podrá ver todos los entrenamientos, ordenador en función de una serie de filtros , darle like o añadir a su pagina de favoritos cualquier entrenamiento que desee. Cuando el rol del usuario es admin, ademas de lo anteriormente mencionado tendrá una opción para añadir un nuevo entrenamiento.

- _DetailPage_ Desde la pagina de listado de entrenamientos el cliente puede seleccionar un entrenamiento en concreto y pinchando encima esta acción lo lleva a la pagina de detalle de este entrenamiento. Si además tiene rol "admin" podrá, modificar algun dato de ese entrenamiento o incluso borrarlo si lo considera.

- _FavPage_ Aqui cualquier usuario verá un listado de los entrenamientos que ha añadido a favoritos previamente.

- _SettingPage_ En esta sección el usuario podra modificar sus datos , en el caso de tener rol "admin", también podrá eliminar usuarios y cambiar el rol de los mismos.

- _Training modify/Trainign create_ Cómo mencionamos anteriormente un usuario con rol "admin" puede añadir nuevos entrenamientos o modificar alguno de los ya existentes.

        Aquí te muestro un ejemplo:

          Nombre entrenamiento: ejemplo
          Tipologia: ejemplo
          Grupo muscular: ejemplo
          Descripción : ejemplo
          Subir imagen : seleccionar archivo

- _RoutinePage_ Funcionalidad añadida, para que un entrenador pueda crear rutinas para sus clientes, configurándolas, dándole una descripción y añadiendo sus correspondientes entrenos con las repeticiones y series asignadas. Una vez creada la rutina, el entrenador puede darle a generar mediante PDF bien para imprimirsela al cliente o enviársela por email desde su pc.

        Aquí te muestro un ejemplo:

          Nombre rutina: ejemplo
          Descripción : ejemplo

El header y el footer es común para cualquier página independientemente del rol , como ya comentamos se renderizarán unas paginas u otras en función de los permisos del usuario. Desde cualquier punto de la app, tiene acceso a la parte de ajustes y de cerrar sesión que se encuentran en un desplegable en la parte superior derecha del header.

_Documentación:_ A continucación dispone de la documentación relacionada con las dependencias utlizadas.

- https://www.npmjs.com/package/html2canvas
- https://www.npmjs.com/package/react-dom
- https://www.npmjs.com/package/react-query
- https://www.npmjs.com/package/react-router-dom
- https://sweetalert2.github.io/recipe-gallery/sweetalert2-react.html
- https://getbootstrap.com/
- https://www.npmjs.com/package/react-bootstrap

_Styles:_

- _SASS_ Todo el proyecto ha sido desarrollado utilizando sass. Cada componente o página lleva su propio archivo .scss dónde se definen los estilos específicos. Acceso a la documentación https://sass-lang.com/

- _main.scss_ Archivos principal donde se defien las reglas generales de estilo.

- _Paleta de colores_

  #f5f5f5
  #3d3d3d
  #d2691e

## Enlace directo al repositorio

- https://github.com/luisvzq/FrontEndTraining

## Video demo del proyecto

- https://youtu.be/bPKmvWJxrPY

## Poyecto desplegado

- https://pulsefitworkout.vercel.app/

## Autores

- Angel Ares https://www.linkedin.com/in/ángel-a-b05205286/
- David Barreira https://www.linkedin.com/in/david-barreira-suarez/
- Luis Diaz https://www.linkedin.com/in/luisdiazvazquez/
- Patricia Lojo https://www.linkedin.com/in/patricia-lojo-zubeldia

