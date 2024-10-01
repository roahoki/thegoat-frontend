# The Goat Bet 🐐⚽💸🔥

## Requisitos Previos

 - Node.js: Versión 22.6.0
 - Yarn: Como gestor de paquetes

## ¿Cómo correr el frontend?

 1. Clonar el repositorio

        git clone https://github.com/tu_usuario/thegoat-frontend.git
		cd thegoat-frontend

 2. Agregar el archivo `.env` al directorio raíz
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

		VITE_AUTH0_DOMAIN=tu_dominio_oauth
		VITE_AUTH0_CLIENT_ID=tu_client_id_oauth
**Nota**: Reemplaza `tu_dominio_oauth` y `tu_client_id_oauth` con las credenciales de OAuth. Si no las tienes, pideselas a @roahoki.

 3. Instalar las dependencias
Ejecuta el siguiente comando para instalar todas las dependencias listadas en `package.json`:

		yarn

 4. Iniciar la aplicación
Inicia la aplicación en modo desarrollo con:

		yarn dev
La aplicación estará disponible en [http://localhost:5173/](http://localhost:5173/).

## Estructura del Proyecto

    thegoat-frontend/ 
    ├── dist/ 
    ├── public/ 
    ├── src/ 
    │ ├── assets/ 
    │ ├── components/ 
    │ ├── contexts/ 
    │ ├── pages/ 
    │ ├── routing/ 
    │ └── index.css
    │ └── main.jsx
    ├── .env 
    ├── .gitignore
    ├── .env-type.txt
    ├── eslint.config.js
    ├── index.html
    ├── package.json 
    ├── README.md 
    ├── vite.config.js 
    └── yarn.lock

**thegoat-frontend/**

-   **dist/**: Carpeta donde se genera la aplicación optimizada para producción después de ejecutar el comando de build. **ESTO SE SUBE A S3**

-   **public/**: Archivos públicos estáticos que se servirán sin procesamiento, como imágenes, fuentes, y favicon. Aquí puedes colocar los archivos que no necesitan ser empaquetados por Vite.

-   **src/**: Contiene todo el código fuente de la aplicación.
    -   **assets/**: Recursos estáticos como imágenes e íconos
    
    -   **components/**: Componentes reutilizables de React. Aquí se almacenan todos los elementos visuales reutilizables que pueden componerse para crear las vistas.
    -   **contexts/**: Contiene los archivos para crear y manejar contextos de React. Aquí podrías gestionar el estado global utilizando `React.Context`.
    -   **pages/**: Vistas principales de la aplicación. Aquí se encuentran los componentes que representan las distintas páginas de la app.
    -   **routing/**: Enrutamiento de la aplicación, se encuentra Routing.jsx que maneja las rutas utilizando React Router
    -   **index.css**: Estilos globales que se aplican a toda la aplicación.
    -   **main.jsx**: Punto de entrada de la aplicación React. Aquí es donde el DOM virtual de React se monta en el DOM real utilizando `ReactDOM.createRoot()`.
-   **.env**: Archivo que contiene las variables de entorno, como las API keys o configuraciones específicas para cada ambiente (desarrollo, producción).
-   **.gitignore**: Archivo que especifica qué archivos o carpetas deben ser ignorados por Git (como `node_modules`, archivos de entorno, etc.).
-   **.env-type.txt**: Archivo que define los tipos de las variables de entorno utilizadas en la aplicación (puede estar relacionado con la verificación de tipos en las variables de entorno).
-   **eslint.config.js**: Archivo de configuración para ESLint, utilizado para definir las reglas de linting que se deben seguir en el proyecto para mantener un código consistente y libre de errores.
-   **index.html**: Archivo HTML raíz de la aplicación. Aquí se incluye el punto de entrada de la app React (`main.jsx`), y es donde Vite inyecta automáticamente los scripts y enlaces de estilo generados.
-   **package.json**: Archivo de configuración del proyecto que contiene las dependencias del proyecto, scripts de ejecución (`build`, `dev`, `lint`), y metadatos como el nombre del proyecto y la versión.
-   **README.md**: Archivo de documentación del proyecto. Contiene instrucciones sobre cómo instalar, ejecutar y contribuir al proyecto.
-   **vite.config.js**: Archivo de configuración de Vite, donde se pueden personalizar aspectos del servidor de desarrollo, el build, los plugins, y otras opciones.
-   **yarn.lock**: Archivo que asegura que las dependencias se instalen consistentemente entre diferentes entornos, generando un hash de las versiones de los paquetes.

## Despliegue a S3 - CloudFront
Para construir la aplicación para producción:

    yarn build

