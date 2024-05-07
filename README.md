# BrasilPrev API

API para gerenciamento de produtos, aportes, clientes, planos e resgates da BrasilPrev.

## Instalação

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
</br>

2. **Instalar as dependências:**

   ```bash
   cd brasilprev
   npm install
   ```
</br>

3. **Configurar as variáveis de ambiente:**  
   Renomeie o arquivo **.env.example** para **.env** e configure as variáveis de ambiente conforme necessário.

</br>

4. **Banco de dados:**  
O banco de dados utilizado foi o Postgres, na pasta database no arquivo [db.sql](src/database/db.sql) você encontra todas as querys para criação das tabelas.
Não se esqueça de alterar no arquivo docker-compose.yml a porta utilizada no banco de dados.

## Execução

Executar a aplicação:

```bash
 npm start
```

## Uso

A API está documentada utilizando o Swagger. Após iniciar a aplicação, acesse http://localhost:3000/api-docs para visualizar a documentação e interagir com os endpoints.

Também está disponível a [collection](brasilprev.postman_collection.json) para utilização no postman.

## Dockerização

Para executar a aplicação utilizando Docker, certifique-se de ter o Docker e o Docker Compose instalados. Em seguida, execute o seguinte comando na raiz do projeto:

```bash
 docker-compose up --build
```

## Testes

Executar os testes:

```bash
 npm test
```

## Documentação

Endpoints

/produto: Endpoint para cadastrar um novo produto.  
/cliente: Endpoint para cadastrar um novo cliente.  
/aporte: Endpoint para realizar um novo aporte.  
/plano: Endpoint para cadastrar um novo plano.  
/resgate: Endpoint para realizar um novo resgate.

Regras:

- Para o cliente contratar um plano, é necessário que esteja dentro do período de venda e acima do aporte mínimo do produto. Devem ser validados os prazos de carência para resgate. Deve ser validado o saldo do plano em relação ao valor resgatado.
- Para realizar o resgate, é necessário que o cliente atenda às regras de resgate definidas no produto. 
- Um plano sem saldo estará automaticamente cancelado, não podendo mais haver nenhuma operação no mesmo. 
- Para realizar um aporte extra, é necessário que o cliente atenda às regras definidas no produto. Deve ser validado o valor mínimo de aporte do produto.
- Não será possível contratar um produto com prazo de venda expirado. 
- As regras da contratação como valor de aporte, idade mínima de entrada e saída etc., devem ser levadas em consideração.