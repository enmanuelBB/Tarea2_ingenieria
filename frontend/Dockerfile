# Etapa 1: Construcción (Build)
FROM node:18-alpine as build

WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar la caché de Docker
COPY package.json package-lock.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación para producción (crea la carpeta /dist o /build)
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine

# Copiamos los archivos construidos desde la etapa anterior a la carpeta de Nginx
# Nota: Si usas Vite, la carpeta es /dist. Si usas Create-React-App, es /build.
# Ajusta la línea de abajo según corresponda:
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (el estándar web)
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]