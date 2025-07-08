Requisitos
Antes de instalar ou executar o projeto, é essencial verificar a versão do Node.js instalada na sua máquina.

Versão do Node.js
Este projeto foi desenvolvido e testado com a versão v16.x do Node.js. Ele utiliza definições de tipo (@types/node@^16.18.126) específicas para essa versão. Utilizar versões incompatíveis (como Node 18 ou 20) pode causar erros durante a instalação ou execução.

Para verificar a sua versão atual, execute o seguinte comando no terminal:

node -v:
<br></br>
Se a sua versão for diferente de v16.x, recomendamos fortemente o uso do nvm (Node Version Manager) para gerenciar suas versões do Node.js. Se você não o tem, instale-o primeiro.

Com o nvm instalado, você pode instalar e usar a versão recomendada assim:

nvm install 16
nvm use 16

Instalação:
Siga os passos abaixo para configurar e rodar o projeto na sua máquina local:

Clone o repositório:
git clone https://github.com/tiagow2/T5.git
cd PL5
Instale as dependências:

Dentro do diretório do projeto, execute o comando para instalar todas as dependências necessárias:

npm install
Este comando lerá o arquivo package.json e fará o download de todas as bibliotecas e pacotes que o projeto precisa.

Como Rodar o Projeto
Com as dependências instaladas, você pode iniciar a aplicação em modo de desenvolvimento:

npm start
Este comando:
Inicia o servidor de desenvolvimento.
Abre automaticamente a aplicação no seu navegador padrão (geralmente em http://localhost:3000).
Recarrega a página automaticamente sempre que você fizer alterações no código.
Exibe quaisquer erros de lint diretamente no console.
