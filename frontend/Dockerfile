# Etapa 1: Construcción (Build)
FROM node:18-alpine as build

WORKDIR /app

# Copiamos package.json Y package-lock.json (el asterisco cubre ambos casos)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]