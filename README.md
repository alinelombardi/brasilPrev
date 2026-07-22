# BrasilPrev API

API para gerenciamento de produtos, aportes, clientes, planos e resgates da BrasilPrev.

## Stack

- **Node.js** + **Express**
- **PostgreSQL** (via `pg`, com queries SQL diretas)
- **Swagger** (`swagger-jsdoc` + `swagger-ui-express`) para documentação interativa
- **Jest** + **Supertest** para testes unitários e de integração

## Instalação

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/alinelombardi/brasilPrev.git
   ```
</br>

2. **Instalar as dependências:**

   ```bash
   cd brasilprev
   npm install
   ```
</br>

3. **Configurar as variáveis de ambiente:**  
   Copie o arquivo **.env.example** para **.env** e preencha os valores:

   ```
   PORT=3000

   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=brasilprev
   ```

</br>

4. **Banco de dados:**  
No arquivo [db.sql](src/database/db.sql) você encontra todas as queries para criação das tabelas no Postgres.

## Execução

Executar a aplicação:

```bash
npm start
```

Ou em modo desenvolvimento, com reload automático:

```bash
npm run dev
```

## Uso

A API está documentada utilizando o Swagger. Após iniciar a aplicação, acesse http://localhost:3000/api-docs para visualizar a documentação e interagir com os endpoints.

Também está disponível a [collection](brasilprev.postman_collection.json) para utilização no Postman.

## Dockerização

Para executar a aplicação utilizando Docker, certifique-se de ter o Docker e o Docker Compose instalados, defina `DB_USER`, `DB_PASSWORD` e `DB_NAME` (no seu `.env` ou diretamente no ambiente) e execute na raiz do projeto:

```bash
docker-compose up --build
```

Isso sobe dois serviços da aplicação (`app` na porta 3000 e `dev` na porta 3001) e um banco Postgres (exposto na porta 5433 do host).

## Testes

Executar os testes:

```bash
npm test
```

Suíte atual: 10 test suites / 17 testes, todos passando.

## Documentação

### Endpoints

- `POST /cliente`: cadastrar um novo cliente.
- `POST /produto`: cadastrar um novo produto.
- `POST /plano`: contratar um novo plano.
- `POST /aporte`: realizar um novo aporte.
- `POST /resgate`: realizar um novo resgate.
- `GET /api-docs`: documentação Swagger interativa.

### Regras de negócio

- Para o cliente contratar um plano, é necessário que esteja dentro do período de venda e acima do aporte mínimo do produto. Devem ser validados os prazos de carência para resgate. Deve ser validado o saldo do plano em relação ao valor resgatado.
- Para realizar o resgate, é necessário que o cliente atenda às regras de resgate definidas no produto (carência inicial desde a contratação e carência mínima entre resgates).
- Para realizar um aporte extra, é necessário que o cliente atenda às regras definidas no produto. Deve ser validado o valor mínimo de aporte do produto.
- Não será possível contratar um produto com prazo de venda expirado.
- As regras da contratação como valor de aporte, idade mínima de entrada e saída etc., devem ser levadas em consideração.

