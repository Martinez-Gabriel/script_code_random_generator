# Script Generador DNI PDF417

## Descripción

Este proyecto es una aplicación web que genera códigos de barras PDF417 para DNI (Documento Nacional de Identidad) utilizando datos aleatorios. La aplicación utiliza un servidor Express para servir archivos estáticos y un servidor WebSocket para enviar datos en tiempo real al cliente. Los datos del usuario se obtienen de la API `randomuser.me`.

## Características

- Generación de códigos de barras PDF417.
- Actualización en tiempo real de los códigos de barras utilizando WebSockets.
- Obtención de datos de usuario aleatorios desde la API `randomuser.me`.
- Visualización de los datos del usuario en la interfaz web.

## Instalación

1. Clona el repositorio:

    ```sh
    git clone 
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

## Uso

1. Inicia el servidor:

    ```sh
    npm start
    ```

2. Abre tu navegador y navega a `http://localhost:3001` para que la aplicacion genere 1 codigo.
3. Abre tu navegador y navega a `http://localhost:3001/ws` para que la aplicacion genere codigos ilimitados mediante web socket.

## Archivos

- [app.js](http://_vscodecontentref_/1): Configuración del servidor Express y WebSocket.
- [index.html](http://_vscodecontentref_/2): Archivo HTML que contiene la interfaz de usuario.
- [generateUserDni.js](http://_vscodecontentref_/3): Función para generar datos de usuario aleatorios.
