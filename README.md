# Frontend Angular - Task Management

## Visão Geral

Este projeto Angular é o frontend da aplicação de gestão de tarefas. Ele consome a API REST do backend para listar, criar e excluir tarefas.

---

## Tecnologias Utilizadas

- **Angular** (versão X)
- **Bootstrap 5** (via ng-bootstrap para componentes visuais)
- **HttpClientModule** (para comunicação HTTP com backend)

---

## Configuração do Ambiente

### 1. URL da API Backend

Configure a URL base da API no arquivo de ambiente para facilitar o desenvolvimento e produção.

Por exemplo, em `src/environments/environment.ts`:

    export const environment = {
      production: false,
      apiUrl: 'http://localhost:8080'
    };


## Como Rodar a Aplicação Angular

1. Instale as dependências
No terminal, dentro da pasta do projeto frontend, rode:
    ```bash
    npm install
2. Inicie o servidor de desenvolvimento
    ```bash
    ng serve
3. A aplicação ficará disponível em:
    ```bash
    http://localhost:4200
   
