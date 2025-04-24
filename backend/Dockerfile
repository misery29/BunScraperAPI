# Dockerfile
FROM oven/bun:latest

WORKDIR /app

# 1) Copia apenas o package.json
COPY package.json ./

# 2) Instala deps com bun (vai gerar bun.lockb automaticamente)
RUN bun install

# 3) Copia o restante do código e faz o build
COPY . .
RUN bun build bun.js --target node

EXPOSE 3000

# 4) Roda seu servidor com bun
CMD ["bun", "bun.js"]
