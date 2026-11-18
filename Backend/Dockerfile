# Usa una imagen ligera de Node
FROM node:20-alpine

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala solo las dependencias de producción
RUN npm ci --only=production

# Copia el resto del código
COPY . .

# Expone el puerto (el mismo que usa tu Express)
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "index.js"]