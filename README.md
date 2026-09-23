# Landing Page Salomé Vistorias

Landing page estática criada com Vite e servida em produção com Nginx via Docker.

## Rodar com Docker

Pré-requisitos:

- Docker
- Docker Compose

Subir o sistema:

```bash
docker compose up -d
```

Acesse no navegador:

```text
http://localhost:8080
```

Verificar se o container está rodando:

```bash
docker compose ps
```

Parar o sistema:

```bash
docker compose down
```

Reconstruir a imagem após alterações:

```bash
docker compose up -d --build
```

## Rodar localmente sem Docker

Instalar dependências:

```bash
npm install
```

Rodar em modo desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```
