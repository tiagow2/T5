Projeto T5 (PL5)
Este documento fornece todas as instruções necessárias para instalar e executar o projeto em seu ambiente de desenvolvimento local.

📋 Pré-requisitos Essenciais
Antes de iniciar a instalação, é crucial garantir que você tenha a versão correta do Node.js instalada.

Versão do Node.js
Este projeto foi desenvolvido e testado especificamente com a versão v16.x do Node.js. Ele depende de definições de tipo (@types/node@^16.18.126) que são compatíveis com essa versão.
<br></br>

🔴 Aviso: O uso de versões mais recentes do Node.js (como v18, v20 ou superiores) pode resultar em erros de incompatibilidade durante a instalação de dependências ou na execução do projeto.

Como verificar sua versão do Node.js
Execute o seguinte comando no seu terminal:

node -v

Como instalar e usar a versão correta (Recomendado)
Se a sua versão não for a v16.x, a maneira mais fácil de gerenciar múltiplas versões do Node.js é utilizando o nvm (Node Version Manager).

Instale o nvm (caso ainda não o tenha). Siga as instruções no repositório oficial do nvm.

Instale e utilize a versão 16 do Node.js com os seguintes comandos:

nvm install 16

nvm use 16
<br></br>

🚀 Guia de Instalação e Execução:
Siga os passos abaixo para configurar e rodar o projeto.

Clone o Repositório:

git clone https://github.com/tiagow2/T5.git
Acesse o Diretório do Projeto:

cd T5 
(Observação: Corrigido de PL5 para T5, que é o nome padrão da pasta ao clonar o repositório)

Instale as Dependências:
Dentro do diretório do projeto, execute o comando abaixo. Ele fará o download de todas as bibliotecas listadas no arquivo package.json.

npm install

Rode o Projeto:
Com as dependências instaladas, inicie a aplicação em modo de desenvolvimento:

npm start

Este comando irá:

Iniciar o servidor de desenvolvimento.

Abrir a aplicação automaticamente no seu navegador padrão (geralmente em http://localhost:3000).

Recarregar a página sempre que você salvar uma alteração no código.

Exibir erros e avisos diretamente no terminal.
