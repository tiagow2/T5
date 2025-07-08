**Projeto T5 - Guia de Instalação Completo**

Este documento fornece todas as instruções para configurar e executar o Frontend (React) e o Backend (Node.js/Express) em seu ambiente local.

📋 **Pré-requisitos Essenciais**

Antes de começar, é fundamental preparar seu ambiente com as ferramentas corretas.

**Múltiplas Versões do Node.js (Obratório)**
   
O projeto exige duas versões diferentes do Node.js para funcionar corretamente:

* **Frontend: Requer a versão v16.x**

* **Backend: Requer a versão v20.x**

🔴 **Aviso: Utilizar a versão errada em qualquer uma das partes pode causar erros de incompatibilidade, mesmo que pareça funcionar inicialmente.**

A maneira recomendada para gerenciar múltiplas versões é utilizando o nvm (Node Version Manager).

* **Passo A: Instale o NVM**

  * Caso ainda não o tenha, siga as instruções de instalação no repositório oficial do nvm.

* **Passo B: Instale as versões do Node.js necessárias**

  * Abra seu terminal e execute os seguintes comandos para instalar ambas as versões:

        nvm install 16

        nvm install 20
<br></br>
🚀 **Guia de Instalação e Execução**

Siga os passos abaixo na ordem correta. Você precisará de dois terminais abertos simultaneamente.

**Passo 1: Clone o Repositório**

Abra um terminal, navegue até o local onde deseja salvar o projeto, e execute:

git clone https://github.com/tiagow2/T5.git

**Passo 2: Configure e Rode o Backend**

**No seu primeiro terminal:**

* **1. Acesse a pasta do backend:**

         cd T5/backend 

(Ajuste o caminho se sua estrutura de pastas for diferente)

* **2. Ative a versão correta do Node.js:**

         nvm use 20

* **3. Instale as dependências do backend:**

         npm install

* **4. Build o servidor backend:**

         npm run build

* **5. Inicie o servidor backend:**

         npm run dev

✅ **Sucesso! O servidor backend agora está rodando em modo de desenvolvimento. Deixe este terminal aberto**
<br></br>

**Passo 3: Configure e Rode o Frontend**

Abra um novo terminal (o segundo):

* **1. Acesse a pasta raiz do projeto:**

         cd T5

* **2. Ative a versão correta do Node.js:**

      nvm use 16

* **3. Instale as dependências do frontend:**

      npm install

* **4. Inicie a aplicação frontend:**

      npm start

✅**Sucesso! Sua aplicação React será aberta no navegador e já estará conectada ao backend.**
