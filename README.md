# 🎭 Automação E2E - Automation Practice (`automationpratice-pw`)

Projeto de automação de testes End-to-End (E2E) construído passo a passo para o e-commerce de treinos **[Automation Practice (QAZANDO Shop)](https://automationpratice.com.br/)**, utilizando **Playwright** e **TypeScript** com arquitetura profissional baseada em **Page Object Model (POM)** e **Custom Fixtures**.

---

## 📋 1. O que este projeto executa?

O objetivo deste repositório é evoluir gradualmente, do básico ao avançado, na automação do site `https://automationpratice.com.br/`.

### Etapa Atual (Passos 1 a 7 + CI/CD — Cobertura Completa E2E & Arquitetura de Mercado):
- **Passo 1 — Acesso Inicial (`tests/e2e/01-home.spec.ts`)**: Abre o navegador Chromium, acessa a página principal do Automation Practice e valida o carregamento da Home.
- **Passo 2 — Fluxos Positivos End-to-End (`tests/e2e/02-positive-flows.spec.ts`)**:
  1. **Cadastro de Novo Usuário**: Navega até `/register`, preenche nome, e-mail e senha válidos e valida o modal `Cadastro realizado!` (`Bem-vindo <Nome>`) e redirecionamento para `/my-account`.
  2. **Login de Usuário**: Navega até `/login`, autentica com credenciais válidas e valida o modal `Login realizado` (`Olá, <E-mail>`) e redirecionamento para `/my-account`.
  3. **Adição de Produto ao Carrinho**: Acessa o produto (`Green Dress For Woman`), adiciona ao carrinho validando o modal `Success!` (`Successfully added to your Cart`) e confirma a presença do item na tabela do carrinho (`/cart`).
  4. **Jornada Completa E2E (Login → Produto → Carrinho → Checkout → Pedido Concluído)**: Executa o fluxo de compra completo, preenche todos os dados de cobrança (*Billings Information*), valida a mensagem `Billings Information registred with success!` e finaliza o pedido validando o modal `Order success!` (`Congrats! Your order was created with sucess!`).
  5. **Inscrição na Newsletter**: Preenche o e-mail no rodapé e valida o modal `Success` (`Thank you for your Subscribtion`).
- **Passo 3 — Fluxos de Remoção do Carrinho e Mensagens de Erro (`tests/e2e/03-removal-and-errors.spec.ts`)**:
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
- **Passo 4 — Wishlist (Favoritos) e Busca de Produtos (`tests/e2e/04-wishlist-and-search.spec.ts`)**:
  1. **Adicionar Produto à Wishlist**: Favorita um produto (`Green Dress For Woman`), valida o modal `Success` (`Added to Wishlist`) e confirma sua presença na tabela de Favoritos (`/wishlist`).
  2. **Bloqueio de Duplicidade na Wishlist**: Tenta favoritar o mesmo produto duas vezes seguidas e valida o modal de erro `Failed` (`Already Added in Wishlist`).
  3. **Mover Produto da Wishlist para o Carrinho**: Clica em `Add to cart` dentro da tabela da Wishlist, confirma que o item saiu da lista de desejos e foi adicionado ao Carrinho (`/cart`).
  4. **Remoção Individual da Wishlist**: Remove um item específico (`Skater Dress`) clicando na lixeira da linha e confirma que os demais permanecem.
  5. **Esvaziar toda a Wishlist**: Remove todos os itens da lista de desejos e valida a mensagem `YOUR WISHLIST IS EMPTY`.
  6. **Busca de Produtos (Search Modal)**: Abre o modal de pesquisa pela lupa do cabeçalho, busca por `Dress`, valida o modal `Success` (`Check out the Results`) e o redirecionamento automático para `/shop`.
- **Passo 5 — Minha Conta, Rastreio de Pedido e Comparação de Produtos (`tests/e2e/05-account-tracking-and-compare.spec.ts`)**:
  1. **Navegação no Painel Minha Conta (`My Account`)**: Após o login, percorre as abas `Orders`, `Downloads`, `Addresses` e `Account details` validando pedidos e configurações.
  2. **Logout do Usuário**: Executa o logout pelo menu lateral do painel Minha Conta, valida o modal `Logout Sucessfull` (`Thank You`) e o retorno para `/login`.
  3. **Rastreio de Pedido (`Order Tracking`)**: Em `/order-tracking`, informa o `Order ID` e o `Billing Email`, clica em `Track` e valida a tela de conclusão `/order-complete` (`Your order is completed!`).
  4. **Adicionar Novo Produto à Comparação (`Compare`)**: Adiciona o produto `V-Neck Dress` à lista de comparação, valida o modal `Success!` (`Successfully added to Compare List`) e verifica sua presença na tabela de `/compare`.
  5. **Bloqueio de Duplicidade na Comparação**: Tenta adicionar um produto que já está na lista de comparação e valida o modal de erro `Failed!` (`Already Added in Compare List`).
  6. **Mover da Comparação para o Carrinho e Esvaziar Comparação**: Move o primeiro item da tabela de comparação para o carrinho (`ADD TO CART`), remove o segundo na lixeira e valida a mensagem `PRODUCT NOT FOUND` (`Sorry Mate... No Item Found Inside Your Compare List!`).
- **Passo 6 — Carrinho Avançado, Catálogo/Variações de Produto e Layout Alternativo (`tests/e2e/06-advanced-cart-and-catalog.spec.ts`)**:
  1. **Recálculo Matemático Dinâmico no Carrinho (`/cart`)**: Altera a quantidade de um produto para `3` e valida a atualização imediata do Total da linha (`$156.00`).
  2. **Mini-Carrinho Lateral (Offcanvas Drawer)**: Abre o drawer lateral da sacola, remove um item, valida a atualização do Subtotal (`$107.00` → `$55.00`) e navega para o Checkout.
  3. **Incremento de Quantidade no Layout Cart View Two (`/cartTwo`)**: Clica no botão `+` na tabela do segundo layout de carrinho e valida o recálculo do Total (`$28.00`).
  4. **Ordenação do Catálogo (`/shop`) e Adição Direta pela Vitrine**: Ordena os produtos por `Price: Low to High` e adiciona o item ao carrinho diretamente pelo card da vitrine.
  5. **Seleção de Variações do Produto (`/product-details-one/1`)**: Seleciona Tamanho (`XL`), Cor (`Green`), incrementa quantidade no botão `+` para `2` e adiciona ao carrinho.
  6. **Layout 2 de Detalhes do Produto (`/product-details-two/1`)**: Valida o carregamento e adição ao carrinho pelo segundo template de página de produto.
- **Passo 7 — Edição de Conta, Validações Negativas de Checkout/Formulários, Contato e 404 (`tests/e2e/07-account-edit-contact-and-validations.spec.ts`)**:
  1. **Atualização Cadastral e Troca de Senha (`/account-edit`)**: Preenche nome, sobrenome, e-mail, senha atual e nova senha e valida o redirecionamento para o perfil atualizado (`/vendor/vendor-profile`).
  2. **Bloqueio de Submissão Vazia em `/account-edit`**: Valida o bloqueio nativo HTML5 (`:invalid`) ao tentar salvar o perfil em branco.
  3. **Validação Negativa de E-mail Inválido no Checkout (`/checkout-one`)**: Preenche todos os campos obrigatórios com um e-mail inválido e valida a exibição exclusiva do erro `O campo E-mail deve ser prenchido ou é inválido` e o bloqueio do salvamento.
  4. **Seleção de Métodos de Pagamento Alternativos no Checkout**: Alterna entre `Mobile Banking` e `Paypal` e conclui o pedido com sucesso (`Order success!`).
  5. **Fale Conosco (`/contact-two`) — Positivo e Negativo**: Valida o bloqueio de envio vazio e envia uma mensagem completa validando o modal `Thank You` (`We Got Your Message`).
  6. **Bloqueio de Rastreio Vazio e Página de Erro 404 (`/error`)**: Valida o bloqueio de rastreio sem `Order ID`, acessa `/error`, confere a mensagem `404` (`We are sorry, the page you've requested is not available`) e retorna à Home pelo botão `Back To Home Page`.
- **Esteira de CI/CD com GitHub Actions (`.github/workflows/playwright.yml`)**:
  - Pipeline configurado conforme os padrões de mercado (Node.js LTS com cache NPM, `npm ci`, provisionamento enxuto com `npx playwright install --with-deps chromium`, validação de tipagem `npm run typecheck`, controle de concorrência e publicação automática do `playwright-report/` como artefato).
  - Configurado com gatilho manual (`workflow_dispatch`) para demonstrar a arquitetura de CI/CD sem disparar execuções automáticas desnecessárias a cada `git push`.

---

## 🛠️ 2. Tecnologias e Linguagem Utilizadas

| Tecnologia | Versão / Detalhe | Finalidade |
| :--- | :--- | :--- |
| **Node.js** | LTS (v18+ ou v20+ recomendado) | Ambiente de execução JavaScript/TypeScript |
| **TypeScript** | `^5.8.0` | Linguagem principal com tipagem estática e segura |
| **Playwright Test** | `@playwright/test ^1.51.0` | Framework de automação web E2E, runner e asserções |
| **Dotenv** | `^18.0.10` | Carregamento de variáveis de ambiente via `.env` |
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

### Passo 4.4 — Configurar variáveis de ambiente (Opcional)
Para sobrescrever a URL base ou credenciais de teste localmente sem alterar o código, copie o arquivo de exemplo `.env.example` para `.env`:
```bash
cp .env.example .env
```
*(O arquivo `.env` já está no `.gitignore` e não é versionado.)*

---

## ▶️ 5. Como Executar os Testes (Passo a Passo)

O projeto possui scripts configurados no `package.json` para execução completa, filtrada por tags ou validação estática:

### 1️⃣ Executar todos os testes E2E em modo Headless (40 cenários)
Ideal para execução rápida e validação completa no terminal:
```bash
npm test
```
*(Equivalente a `npx playwright test tests/e2e`)*

### 2️⃣ Executar por Tags (`@smoke`, `@regression`, `@negative`)
Permite rodar apenas testes críticos de fumaça, toda a regressão ou apenas cenários negativos:
```bash
npm run test:smoke
npm run test:regression
npm run test:negative
```

### 3️⃣ Executar os testes vendo o navegador abrir (Modo Headed)
Ideal para acompanhar visualmente cada clique e navegação do Playwright na tela:
```bash
npm run test:headed
```
*(Equivalente a `npx playwright test tests/e2e --headed`)*

### 4️⃣ Executar com a Interface Visual Interativa do Playwright (UI Mode)
Abre o painel interativo com *Time Travel* (permite ver cada passo, inspecionar o DOM, rede e console passo a passo):
```bash
npm run test:ui
```
*(Equivalente a `npx playwright test tests/e2e --ui`)*

### 5️⃣ Validar Tipagem Estática do TypeScript (`typecheck`)
Verifica erros de tipo em todos os arquivos sem emitir JavaScript:
```bash
npm run typecheck
```
*(Equivalente a `tsc --noEmit`)*

### 6️⃣ Executar apenas um arquivo de teste específico
Para rodar somente o teste inicial da Home:
```bash
npx playwright test tests/e2e/01-home.spec.ts
```

### 7️⃣ Abrir o Relatório HTML da última execução
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
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 playwright.yml   # Pipeline CI/CD do GitHub Actions (configurado em modo manual workflow_dispatch)
├── 📁 components/
│   └── 📄 AlertModal.ts        # Component Object compartilhado para modais SweetAlert2 (#swal2-*)
├── 📁 fixtures/
│   └── 📄 pom.fixture.ts       # Injeção automática dos Page Objects nos testes (test.extend)
├── 📁 pages/
│   ├── 📄 AccountEditPage.ts   # Page Object de Edição de Conta e Senha (/account-edit)
│   ├── 📄 CartPage.ts          # Page Object do Carrinho, CartTwo e Offcanvas (/cart, /cartTwo)
│   ├── 📄 CheckoutPage.ts      # Page Object do Checkout, Faturamento e Pagamentos (/checkout-one)
│   ├── 📄 ComparePage.ts       # Page Object de Comparação de Produtos (/compare)
│   ├── 📄 ContactPage.ts       # Page Object de Fale Conosco (/contact-two)
│   ├── 📄 Error404Page.ts      # Page Object da Página de Erro 404 (/error)
│   ├── 📄 HomePage.ts          # Page Object da Home, Busca e Newsletter (/)
│   ├── 📄 LoginPage.ts         # Page Object de Autenticação (/login)
│   ├── 📄 MyAccountPage.ts     # Page Object do Painel Minha Conta e Logout (/my-account)
│   ├── 📄 OrderTrackingPage.ts # Page Object de Rastreio de Pedidos (/order-tracking)
│   ├── 📄 ProductPage.ts       # Page Object de Detalhes e Variações do Produto (/product-details-one/:id)
│   ├── 📄 RegisterPage.ts      # Page Object de Cadastro de Usuário (/register)
│   ├── 📄 ShopPage.ts          # Page Object do Catálogo e Ordenação da Loja (/shop)
│   └── 📄 WishlistPage.ts      # Page Object da Lista de Desejos / Favoritos (/wishlist)
├── 📁 specs/
│   ├── 📄 fluxos-positivos-e2e.md                  # Plano de Testes: Passo 2 (Happy Paths E2E)
│   ├── 📄 fluxos-remocao-e-erros.md                # Plano de Testes: Passo 3 (Remoções e Mensagens de Erro)
│   ├── 📄 wishlist-e-busca.md                      # Plano de Testes: Passo 4 (Wishlist e Search Modal)
│   ├── 📄 minha-conta-rastreio-e-comparacao.md      # Plano de Testes: Passo 5 (My Account, Tracking e Compare)
│   ├── 📄 carrinho-avancado-catalogo-e-variacoes.md # Plano de Testes: Passo 6 (Cálculos, Offcanvas e Catálogo)
│   └── 📄 edicao-conta-contato-404-e-validacoes.md  # Plano de Testes: Passo 7 (Account Edit, Contact, 404)
├── 📁 test-data/
│   ├── 📄 index.ts             # Barrel file (ponto único de importação dos dados)
│   ├── 📄 types.ts             # Interfaces TypeScript (UserCredentials, BillingDetails, ProductRef)
│   ├── 📄 users.data.ts        # Massa de usuários válidos e credenciais inválidas
│   ├── 📄 products.data.ts     # Produtos de referência e listas padrão (Carrinho, Wishlist, Compare)
│   ├── 📄 checkout.data.ts     # Dados válidos de faturamento (Billings Information)
│   └── 📄 scenarios.data.ts    # Mensagens esperadas e entradas de validação por funcionalidade
├── 📁 tests/
│   ├── 📁 e2e/
│   │   ├── 📄 01-home.spec.ts                               # Passo 1: Acesso inicial ao site
│   │   ├── 📄 02-positive-flows.spec.ts                     # Passo 2: Fluxos positivos de ponta a ponta (E2E)
│   │   ├── 📄 03-removal-and-errors.spec.ts                 # Passo 3: Remoção de itens e validação de erros
│   │   ├── 📄 04-wishlist-and-search.spec.ts                # Passo 4: Wishlist (Favoritos) e Busca de Produtos
│   │   ├── 📄 05-account-tracking-and-compare.spec.ts       # Passo 5: Minha Conta, Rastreio e Comparação
│   │   ├── 📄 06-advanced-cart-and-catalog.spec.ts          # Passo 6: Carrinho Avançado, Catálogo e Variações
│   │   └── 📄 07-account-edit-contact-and-validations.spec.ts # Passo 7: Edição de Conta, Contato, 404 e Validações
│   └── 📄 seed.spec.ts                                      # Arquivo semente para inicialização de sessões/exploração
├── 📄 .env.example             # Modelo de variáveis de ambiente para execução local
├── 📄 .gitignore               # Arquivos ignorados pelo Git (node_modules, .env, relatórios, configs locais)
├── 📄 package.json             # Dependências e scripts de execução NPM
├── 📄 playwright.config.ts     # Configuração global do Playwright (dotenv, baseURL, traces, vídeos em falha)
├── 📄 tsconfig.json            # Configurações do compilador TypeScript (strict + noEmit)
└── 📄 README.md                # Documentação passo a passo do projeto
```

---

## 💡 7. Boas Práticas Adotadas (Padrão de Mercado)

- **Page Object Model (POM) + Component Objects (`components/`)**: Nenhum seletor fica solto dentro dos arquivos `.spec.ts`. Elementos transversais compartilhados (como os modais SweetAlert2 em `AlertModal.ts`) ficam isolados em `components/` para evitar duplicação.
- **Custom Fixtures (`pom.fixture.ts`)**: Em vez de instanciar páginas manualmente em todo teste, injetamos os Page Objects diretamente via `test.extend`.
- **Massa de Dados Modular + `.env.example`**: Dados e contratos tipados separados por domínio em `test-data/` com suporte a variáveis de ambiente carregadas via `dotenv`.
- **Tags de Execução (`@smoke`, `@regression`, `@negative`)**: Suíte organizada em `tests/e2e/` com tags nativas do Playwright para permitir execuções direcionadas em CI/CD ou localmente.
- **Tipagem Estrita & Typecheck (`tsc --noEmit`)**: Validação estática de tipos integrada aos scripts e ao workflow do GitHub Actions.
- **Locadores Semânticos & Zero `waitForTimeout`**: Priorização de locadores acessíveis (`getByRole`, `getByPlaceholder`), *Auto-Wait* nativo e *Web-First Assertions*.
