<div align="center">
    <h2>Simple Service Mail</h2>
    <p>Um serviço simples que consulta as filas do RabbitMQ em busca de dados para o envio de e-mails.</p>
</div>

<div align="center">
    <h3>Principais tecnologias usadas</h3>
</div>

<div align="center" style="display: flex; align-items: center; justify-content: center;">
    <img src="https://img.shields.io/badge/NODEJS-^v18.14.0-339933?style=for-the-badge&logo=nodedotjs">
    <img src="https://img.shields.io/badge/BABEL-^7.21.0-f5da55?style=for-the-badge&logo=babel">
    <img src="https://img.shields.io/badge/ESLINT-^8.34.0-4B32C3?style=for-the-badge&logo=eslint">
    <img src="https://img.shields.io/badge/JEST-^29.4.3-15c213?style=for-the-badge&logo=jest">
    <img src="https://img.shields.io/badge/TYPESCRIPT-^4.9.5-3178c6?style=for-the-badge&logo=typescript">
</div>

<br>

## Instalação

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

4. Renomeie o arquivo **.env.exemplo** para **.env** e preencha as informações necessárias da configuração.

5. Após configurar o arquivo **.env**, execute o seguinte comando para iniciar o servidor de desenvolvimento:

```
npm run dev
```

6. Na raiz do projeto dentro da pasta **service-mock-send**, está disponível **service-mock-send.ts** para envio de dados ao **simple-service-mail**, com o propósito de realizar testes.

<br>

## Implantação

Para implantar o serviço em um ambiente de produção, você deve gerar o build da mesma. Execute o seguinte comando:

```
npm run build
```

Uma pasta chamada **dist** será criada na raiz do projeto. Essa é a versão para produção.

**Observação:** O arquivo **.env** deve ser movido manualmente para o ambiente de produção.

## Licença

Este projeto está licenciado sob a licença [MIT](https://github.com/felipesauer/simple-service-mail/blob/main/LICENSE).

<br>

<div align="center">
  <p>
    <a href="https://www.linkedin.com/in/felipe-sauer/" target="_blank">Linkedin</a>&nbsp;&nbsp;
  </p>
</div>
