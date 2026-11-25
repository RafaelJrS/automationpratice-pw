# 🎭 Automação E2E - Automation Practice (`automationpratice-pw`)

Projeto de automação de testes End-to-End (E2E) construído passo a passo para o e-commerce de treinos **[Automation Practice (QAZANDO Shop)](https://automationpratice.com.br/)**, utilizando **Playwright** e **TypeScript** com arquitetura profissional baseada em **Page Object Model (POM)** e **Custom Fixtures**.

---

## 📋 1. O que este projeto executa?

O objetivo deste repositório é evoluir gradualmente, do básico ao avançado, na automação do site `https://automationpratice.com.br/`.

### Etapa Atual (Passos 1, 2 e 3 — Base, Fluxos Positivos E2E, Remoções e Mensagens de Erro):
- **Passo 1 — Acesso Inicial (`tests/home.spec.ts`)**: Abre o navegador Chromium, acessa a página principal do Automation Practice e valida o carregamento da Home.
- **Passo 2 — Fluxos Positivos End-to-End (`tests/e2e-positive.spec.ts`)**:
  1. **Cadastro de Novo Usuário**: Navega até `/register`, preenche nome, e-mail e senha válidos e valida o modal `Cadastro realizado!` (`Bem-vindo <Nome>`) e redirecionamento para `/my-account`.
  2. **Login de Usuário**: Navega até `/login`, autentica com credenciais válidas e valida o modal `Login realizado` (`Olá, <E-mail>`) e redirecionamento para `/my-account`.
  3. **Adição de Produto ao Carrinho**: Acessa o produto (`Green Dress For Woman`), adiciona ao carrinho validando o modal `Success!` (`Successfully added to your Cart`) e confirma a presença do item na tabela do carrinho (`/cart`).
  4. **Jornada Completa E2E (Login → Produto → Carrinho → Checkout → Pedido Concluído)**: Executa o fluxo de compra completo, preenche todos os dados de cobrança (*Billings Information*), valida a mensagem `Billings Information registred with success!` e finaliza o pedido validando o modal `Order success!` (`Congrats! Your order was created with sucess!`).
  5. **Inscrição na Newsletter**: Preenche o e-mail no rodapé e valida o modal `Success` (`Thank you for your Subscribtion`).
- **Passo 3 — Fluxos de Remoção do Carrinho e Mensagens de Erro (`tests/e2e-removal-and-errors.spec.ts`)**:
  1. **Remoção Individual do Carrinho**: Remove um item específico (`Fit-Flare Dress`) da tabela do carrinho clicando no ícone de lixeira e confirma que os demais itens permanecem.
  2. **Limpeza Completa do Carrinho (`Clear cart`)**: Esvazia todos os itens do carrinho e valida a mensagem `YOUR CART IS EMPTY` (`Sorry Mate... No Item Found Inside Your Cart!`).
  3. **Erro de E-mail Inválido no Login**: Valida a mensagem `E-mail inválido.`.
  4. **Erro de Senha Inválida no Login**: Valida a mensagem `Senha inválida.` para senhas com menos de 6 dígitos.
  5. **Erro de Nome Obrigatório no Cadastro**: Valida a mensagem `O campo nome deve ser prenchido`.
  6. **Erro de E-mail Inválido no Cadastro**: Valida a mensagem `O campo e-mail deve ser prenchido corretamente`.
  7. **Erro de Senha Curta no Cadastro**: Valida a mensagem `O campo senha deve ter pelo menos 6 dígitos`.
  8. **Erro de Cupom Inválido no Carrinho**: Aplica um código de cupom inexistente e valida o modal `Error!!` (`Invalid Cuppon Code`).
  9. **Alerta de Quantidade Mínima do Produto**: Tenta reduzir a quantidade abaixo de `1` na página do produto e valida o alerta `Sorry!` (`Minimun Quantity Reached`).
  10. **Erros de Campos Obrigatórios e Bloqueio de Pedido no Checkout**: Valida o bloqueio `Preencha os dados de pagamento!` ao clicar em `Place Order` sem faturamento salvo e valida as 9 mensagens de erro obrigatórias do formulário `Billings Information`.
- **Passo 4 — Wishlist (Favoritos) e Busca de Produtos (`tests/e2e-wishlist-and-search.spec.ts`)**:
  1. **Adicionar Produto à Wishlist**: Favorita um produto (`Green Dress For Woman`), valida o modal `Success` (`Added to Wishlist`) e confirma sua presença na tabela de Favoritos (`/wishlist`).
  2. **Bloqueio de Duplicidade na Wishlist**: Tenta favoritar o mesmo produto duas vezes seguidas e valida o modal de erro `Failed` (`Already Added in Wishlist`).
  3. **Mover Produto da Wishlist para o Carrinho**: Clica em `Add to cart` dentro da tabela da Wishlist, confirma que o item saiu da lista de desejos e foi adicionado ao Carrinho (`/cart`).
  4. **Remoção Individual da Wishlist**: Remove um item específico (`Skater Dress`) clicando na lixeira da linha e confirma que os demais permanecem.
  5. **Esvaziar toda a Wishlist**: Remove todos os itens da lista de desejos e valida a mensagem `YOUR WISHLIST IS EMPTY`.
  6. **Busca de Produtos (Search Modal)**: Abre o modal de pesquisa pela lupa do cabeçalho, busca por `Dress`, valida o modal `Success` (`Check out the Results`) e o redirecionamento automático para `/shop`.

---

## 🛠️ 2. Tecnologias e Linguagem Utilizadas

| Tecnologia | Versão / Detalhe | Finalidade |
| :--- | :--- | :--- |
| **Node.js** | LTS (v18+ ou v20+ recomendado) | Ambiente de execução JavaScript/TypeScript |
| **TypeScript** | `^5.8.0` | Linguagem principal com tipagem estática e segura |
| **Playwright Test** | `@playwright/test ^1.51.0` | Framework de automação web E2E, runner e asserções |
| **NPM** | Nativo do Node.js | Gerenciador de pacotes e scripts do projeto |

---

## ⚙️ 3. Pré-requisitos (O que precisa ser instalado antes de começar)

Antes de rodar o projeto na sua máquina, certifique-se de ter instalado:

1. **Node.js (versão 18 ou superior)**:
   - Baixe e instale em: [https://nodejs.org/](https://nodejs.org/)
   - Para verificar se já está instalado, abra o terminal e rode:
     ```bash
     node -v
     npm -v
     ```
2. **Git**:
   - Baixe e instale em: [https://git-scm.com/](https://git-scm.com/)
   - Verifique com:
     ```bash
     git --version
     ```
3. **VS Code (Visual Studio Code)** *(Recomendado)*:
   - Extensão recomendada: **Playwright Test for VSCode** (da Microsoft).

---

## 🚀 4. Passo a Passo de Instalação e Configuração Local

Siga os passos abaixo na ordem exata para preparar e rodar o projeto do zero:

### Passo 4.1 — Clonar o repositório
Abra o seu terminal (PowerShell, CMD ou Git Bash) e clone o projeto:
```bash
git clone https://github.com/RafaelJrS/automationpratice-pw.git
cd automationpratice-pw
```

### Passo 4.2 — Instalar as dependências do Node.js (`node_modules`)
Instale os pacotes definidos no `package.json` (`@playwright/test`, `typescript`, `@types/node`):
```bash
npm install
```

### Passo 4.3 — Instalar o navegador do Playwright (Chromium)
O Playwright utiliza binários próprios de navegadores para garantir que os testes rodem de maneira idêntica em qualquer máquina. Instale o Chromium executando:
```bash
npx playwright install chromium
```
*(Caso deseje instalar todos os navegadores padrão do Playwright — Chromium, Firefox e WebKit — basta rodar `npx playwright install`).*

---

## ▶️ 5. Como Executar os Testes (Passo a Passo)

O projeto possui scripts configurados no `package.json` para facilitar o dia a dia:

### 1️⃣ Executar todos os testes em modo Headless (em segundo plano, sem abrir janela)
Ideal para execução rápida e validação no terminal:
```bash
npm test
```
*(Equivalente a `npx playwright test`)*

### 2️⃣ Executar os testes vendo o navegador abrir (Modo Headed)
Ideal para acompanhar visualmente cada clique e navegação do Playwright na tela:
```bash
npm run test:headed
```
*(Equivalente a `npx playwright test --headed`)*

### 3️⃣ Executar com a Interface Visual Interativa do Playwright (UI Mode)
Abre o painel interativo com *Time Travel* (permite ver cada passo, inspecionar o DOM, rede e console passo a passo):
```bash
npm run test:ui
```
*(Equivalente a `npx playwright test --ui`)*

### 4️⃣ Executar apenas um arquivo de teste específico
Para rodar somente o teste inicial da Home:
```bash
npx playwright test tests/home.spec.ts
```

### 5️⃣ Abrir o Relatório HTML da última execução
Após rodar os testes, o Playwright gera automaticamente um relatório detalhado em `playwright-report/`. Para abri-lo no navegador:
```bash
npm run report
```
*(Equivalente a `npx playwright show-report`)*

---

## 🏗️ 6. Arquitetura de Pastas do Projeto

A estrutura segue o padrão de camadas para manter o código limpo, reutilizável e fácil de dar manutenção:

```text
📁 automationpratice-pw/
├── 📁 fixtures/
│   └── 📄 pom.fixture.ts       # Injeção automática dos Page Objects nos testes (test.extend)
├── 📁 pages/
│   └── 📄 HomePage.ts          # Page Object da Home (Locators readonly e ações da página inicial)
├── 📁 tests/
│   ├── 📄 home.spec.ts         # Cenário de teste: Passo 1 - Acesso inicial ao site
│   └── 📄 seed.spec.ts         # Arquivo semente para inicialização de sessões/exploração
├── 📄 .gitignore               # Arquivos ignorados pelo Git (node_modules, relatórios, configs locais)
├── 📄 package.json             # Dependências e scripts de execução NPM
├── 📄 playwright.config.ts     # Configuração global do Playwright (baseURL, timeouts, browser, traces)
├── 📄 tsconfig.json            # Configurações do compilador TypeScript
└── 📄 README.md                # Documentação passo a passo do projeto
```

---

## 💡 7. Boas Práticas Adotadas desde o Passo 1

- **Page Object Model (POM) Enxuto**: Nenhum seletor fica solto dentro dos arquivos `.spec.ts`. Toda interação com a página fica encapsulada na pasta `pages/`.
- **Custom Fixtures (`pom.fixture.ts`)**: Em vez de instanciar `new HomePage(page)` manualmente em todo teste, injetamos `{ homePage }` diretamente na assinatura do teste.
- **Locadores Semânticos (`getByRole`)**: Priorizamos seletores baseados em acessibilidade e visão do usuário em vez de XPaths ou classes CSS frágeis.
- **Zero `waitForTimeout`**: Utilizamos exclusivamente o *Auto-Wait* nativo do Playwright e *Web-First Assertions* (`await expect(...).toBeVisible()`).
