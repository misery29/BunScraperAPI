# BunScraperAPI
Um mini scraper que permite buscar produtos na Amazon e exibir os resultados em cards bonitinhos.



## Tecnologias

- Backend: Bun, Express, Axios, JSDOM
- Frontend: HTML, CSS, JS puro
- CORS: Habilitado para facilitar comunicação local
- ScraperAPI: Usado para contornar bloqueios da Amazon
- Docker: Facilita o ambiente de desenvolvimento


---

### Pré-requisitos

- [Node.js](https://nodejs.org/) ou [Bun](https://bun.sh/)
- [Docker + Docker Compose](https://docs.docker.com/compose/) (opcional)
- Uma chave da [ScraperAPI](https://www.scraperapi.com/) (adicione no `.env`)

### Rodando o projeto

```bash
# 1. Clone o repositório
git clone https://github.com/misery29/BunScraperAPI.git
cd BunScraperAPI

# 2. Crie o arquivo .env dentro da pasta /backend e adicione a chave do ScraperAPI:
echo "SCRAPER_API_KEY=7e419a434fe90bfbb0c081178f43fd5e" > backend/.env
# Não se preocupe, essa chave é gerada apenas para testes na plataforma.

# 3. Suba os containers
docker-compose up --build

# 3.2 Caso prefira rodar localmente
cd backend
bun install
bun bun.js

# 4. Inicie o Front
cd frontend
npm install
npm run dev

# 5. Pronto! O projeto deve estar rodando com o back na porta 3000 e o front na 5173!
