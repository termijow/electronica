# Etapa 1: Construcción de la aplicación
# Usar una imagen oficial de Node.js como base.
# Elegir una versión LTS (Long Term Support) es generalmente una buena práctica.
FROM node:18-alpine AS builder
RUN apk update && apk upgrade

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de manifiesto de paquetes (package.json y package-lock.json o yarn.lock)
# Se copian primero para aprovechar el cache de Docker si no cambian las dependencias
COPY package*.json ./
# Si usas yarn, también copia yarn.lock
# COPY yarn.lock ./

# Instalar dependencias del proyecto
# Si usas npm:
RUN npm install
# Si usas yarn:
# RUN yarn install --frozen-lockfile

# Copiar el resto del código fuente de la aplicación al directorio de trabajo
COPY . .

# Construir la aplicación Next.js para producción
# (Este comando podría variar si tienes scripts personalizados)
RUN npm run build
# Si usas yarn:
# RUN yarn build

# Etapa 2: Servir la aplicación construida
# Usar una imagen más ligera de Node.js para producción ya que no necesitamos las herramientas de build
FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar solo los artefactos de construcción de la etapa anterior
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json
# Si Next.js genera un archivo standalone, cópialo también.
# Por ejemplo, si tienes output: 'standalone' en next.config.js,
# necesitarás copiar la carpeta .next/standalone y .next/static.
# COPY --from=builder /usr/src/app/.next/standalone ./
# COPY --from=builder /usr/src/app/.next/static ./.next/static

# Instalar solo las dependencias de producción (si `next start` las necesita,
# a menudo `next start` funciona sin reinstalar si el build fue completo)
# RUN npm install --omit=dev
# Si usas yarn:
# RUN yarn install --production

# Exponer el puerto en el que Next.js se ejecuta (generalmente 3000)
EXPOSE 3000

# Comando para iniciar la aplicación Next.js en modo producción
# El usuario 'node' es menos privilegiado, bueno para seguridad.
USER node
CMD ["npm", "run", "start"]
# Si usas yarn:
# CMD ["yarn", "start"]

# --- PARA DESARROLLO ---
# La configuración de docker-compose.yml para desarrollo con volúmenes
# y el comando `npm run dev` sobreescribirán parte de esto.
# Este Dockerfile está más orientado a producción, pero sirve de base.
# En desarrollo, `docker-compose` usará `npm run dev` (o `yarn dev`)
# que se define en tu `package.json`.