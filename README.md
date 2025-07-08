# Projeto T5 - Guia de Instalação Completo

Este documento fornece as instruções detalhadas para configurar e executar o ambiente de desenvolvimento completo, que consiste em um **Frontend (React)** e um **Backend (Node.js/Express)**.

## 📋 Pré-requisitos Essenciais

Antes de começar, é fundamental preparar seu ambiente com as ferramentas corretas.

### Múltiplas Versões do Node.js (Obratório)

O projeto exige duas versões diferentes do Node.js para funcionar corretamente:
* **Frontend:** Requer a versão **v16.x**
* **Backend:** Requer a versão **v20.x**

🔴 **Aviso:** Utilizar a versão errada em qualquer uma das partes pode causar erros de incompatibilidade.

A maneira recomendada para gerenciar múltiplas versões é utilizando o **nvm (Node Version Manager)**. Caso ainda não o tenha, siga as instruções de instalação no [repositório oficial do nvm](https://github.com/nvm-sh/nvm).

---

## 🚀 Guia de Instalação e Execução

Siga os passos abaixo na ordem correta. Você precisará de **dois terminais abertos** simultaneamente.

### Passo 1: Preparação do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/tiagow2/T5.git](https://github.com/tiagow2/T5.git)
    cd T5
    ```

2.  **Instale as versões do Node.js (caso não as tenha):**
    ```bash
    nvm install 16
    nvm install 20
    ```

3.  **(Opcional, mas recomendado) Crie os arquivos `.nvmrc`:**
    Isso fará com que o `nvm` selecione a versão correta do Node automaticamente para cada parte do projeto. Execute os dois comandos abaixo na raiz do projeto (`T5/`):
    ```bash
    echo "16" > .nvmrc
    echo "20" > backend/.nvmrc
    ```

### Passo 2: Configure e Rode o Backend (Terminal 1)

1.  **Acesse a pasta do backend:**
    ```bash
    cd backend 
    ```

2.  **Ative a versão correta do Node.js:**
    * Se você criou o arquivo `.nvmrc` no passo anterior, basta rodar:
        ```bash
        nvm use
        ```
    * Caso contrário, execute manualmente:
        ```bash
        nvm use 20
        ```

3.  **Instale as dependências do backend:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor em modo de desenvolvimento:**
    * Este comando usa o `nodemon` para reiniciar o servidor automaticamente a cada alteração no código.
        ```bash
        npm run dev
        ```

✅ **Sucesso!** O servidor backend agora está rodando. Deixe este terminal aberto.

### Passo 3: Configure e Rode o Frontend (Terminal 2)

1.  **Acesse a pasta raiz do projeto (em um novo terminal):**
    ```bash
    cd caminho/para/o/projeto/T5
    ```

2.  **Ative a versão correta do Node.js:**
    * Com o `.nvmrc` criado, basta rodar:
        ```bash
        nvm use
        ```
    * Caso contrário, execute manualmente:
        ```bash
        nvm use 16
        ```

3.  **Instale as dependências do frontend:**
    ```bash
    npm install
    ```

4.  **Inicie a aplicação frontend:**
    ```bash
    npm start
    ```

✅ **Sucesso!** Sua aplicação React será aberta no navegador e já estará pronta para se conectar ao backend.

---

### Para Rodar em Modo de Produção

Se um dia você precisar fazer o deploy da aplicação, os comandos são diferentes. O modo de desenvolvimento (`npm run dev`) não é usado em produção.

* **Para o backend:**
    1.  Gere os arquivos JavaScript otimizados:
        ```bash
        npm run build
        ```
    2.  Inicie o servidor a partir dos arquivos gerados:
        ```bash
        npm start
        ```
