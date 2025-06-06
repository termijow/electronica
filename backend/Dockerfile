FROM node:18-alpine

# Opcional: Actualizar paquetes del OS para mitigar vulnerabilidades
RUN apk update && apk upgrade

WORKDIR /usr/src/app

# Copia package.json y package-lock.json (o yarn.lock)
COPY package*.json ./
# Si usas yarn:
# COPY yarn.lock ./

# Instala todas las dependencias (incluyendo devDependencies para la compilación en watch mode)
RUN npm install
# Si usas yarn:
# RUN yarn install --frozen-lockfile

# Copia el resto del código (sobrescrito por volumen en docker-compose)
COPY . .

# El puerto que la aplicación expondrá (NestJS dev server)
EXPOSE 8000

# El comando por defecto (será sobrescrito por docker-compose.yml en desarrollo)
CMD ["npm", "run", "start:dev"]