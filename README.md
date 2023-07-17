# Simple Service Mail

O objetivo do serviço é proporcionar um ambiente de estudo onde eu aplico algumas habilidades adquiridas em cursos.

## 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste. Consulte a seção **[Implantação](#-implantação)** para saber como implantar o projeto.

### 📋 Pré-requisitos

Certifique-se de ter as seguintes versões mínimas instaladas:

- ![badge](https://img.shields.io/badge/NODEJS-≥v18.14.0-339933?style=for-the-badge&logo=nodedotjs)
- ![badge](https://img.shields.io/badge/rabbitmq-%E2%89%A5v3.11-FF6600?style=for-the-badge&logo=rabbitmq)
- ![badge](https://img.shields.io/badge/NPM-≥v9.3.1-CB3837?style=for-the-badge&logo=npm)

### 🔧 Instalação

Siga as etapas abaixo para configurar o projeto:

1. Clone este repositório para sua máquina local.

```
git clone https://github.com/seu-usuario/simple-service-mail.git
```

2. Acesse a pasta do projeto.

```
cd simple-service-mail
```

3. Instale as dependências do projeto.

```
npm install
```

4. Renomeie o arquivo **.env.exemplo** para **.env** e preencha as informações necessárias de configuração:

```properties
# Server AMQP
MESSAGE_AMQP_HOSTNAME=#hotname configurado no rabbitmq
MESSAGE_AMQP_PORT=#port do rabbitmq
MESSAGE_AMQP_USERNAME=
MESSAGE_AMQP_PASSWORD=
MESSAGE_AMQP_EXCHANGE=
MESSAGE_AMQP_REPLYTO=
```

5. Após configurar o arquivo **.env**, execute o seguinte comando para iniciar o servidor de desenvolvimento:

```
npm run dev
```

## ⚙️ Executando os testes

Os testes são organizados da seguinte forma:

```
├── src
|   └── modules
│       └── mail/
│           └── domail/**/*.ts
|           └── infra/**/*.ts
|           └── services/**/*.ts
|   └── shared
|       └── errors/*.ts
|       └── infra/messages/**/*.ts
|       └── providers
|           └── mail/**/*.ts
```

Execute os **testes** com o seguinte comando:

```
npm run test
```

Após a execução, será gerada uma pasta chamada **coverage** na raiz do projeto. A cobertura dos testes da aplicação pode ser visualizada abrindo o arquivo **index.html** dentro da pasta **coverage**:

Dentro da pasta `test/**` existe um serviço mock para envio de email para o simple-service-mail para fins de teste.

## 📦 Implantação

Para implantar o serviço em um ambiente de produção, você deve gerar o build da mesma. Execute o seguinte comando:

```
npm run build
```

Uma pasta chamada **dist** será criada na raiz do projeto. Essa é a versão para produção.

**Observação:** O arquivo **.env** deve ser movido manualmente para o ambiente de produção.

## 🖇️ Colaborando

Este projeto está aberto para colaboração de qualquer pessoa.

## ✒️ Autores

* **Felipe Sauer** - *Autor* - [felipesauer](https://github.com/felipesauer)

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](https://github.com/felipesauer/simple-service-mail/blob/main/LICENSE).

## 🛠️ Construído com

- [RabbitMq](https://www.rabbitmq.com/) - Usado para mensageiria com comunicação assíncrona
- [Node.js](https://nodejs.org/en/) - Usado para interpretar o JavaScript/TypeScript
- [TypeScript](https://www.typescriptlang.org/) - Sim ❤️
- [Jest](https://jestjs.io/pt-BR/) - Usado para realizar testes na aplicação
- [Babel](https://babeljs.io/) - Usado para converter o código TypeScript em JavaScript
- Joi & Celebrate - Ambos usados para controle nos parâmetros

Existem outras ferramentas/bibliotecas utilizadas no projeto, mas as mencionadas acima são as principais.

---
⌨️ com ❤️ por [Felipe Sauer](https://github.com/felipesauer) 😊
