# 💰 Smart Finance

> **Controle financeiro pessoal inteligente — 100% offline, seguro e gratuito.**

![Versão](https://img.shields.io/badge/versão-2.0.2-6366f1?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Sim-10b981?style=for-the-badge)
![Offline](https://img.shields.io/badge/Offline-100%25-06b6d4?style=for-the-badge)
![Licença](https://img.shields.io/badge/licença-Gratuita-f59e0b?style=for-the-badge)

<p align="center">
  <img src="logomarca.svg" alt="Smart Finance" width="320">
</p>

<p align="center">
  <em>"Suas finanças sob seu domínio!"</em>
</p>

---

## 🎯 Sobre o Projeto

O **Smart Finance** é uma aplicação web progressiva (PWA) desenvolvida para ajudar você a organizar suas finanças pessoais de forma simples, visual e inteligente. Funciona **100% offline** — todos os dados ficam no seu dispositivo, sem necessidade de cadastro, servidor ou rastreamento.

✨ Idealizado e desenvolvido por **RogerElizar™**

---

## 🚀 Principais Funcionalidades

### 💼 Gestão Completa
- ✅ **Múltiplas contas** (corrente, poupança, investimento)
- ✅ **Cartões de crédito** com controle de fatura, fechamento e vencimento
- ✅ **Aplicações financeiras** (CDB, Tesouro, LCI/LCA, FIIs, Ações, etc.)
- ✅ **Transferências** entre contas
- ✅ **Transações recorrentes** e parceladas

### 📊 Visualizações Inteligentes
- 📈 Gráfico de **Entradas e Saídas** (6 meses)
- 🥧 Gráfico de **Despesas por Categoria**
- 💳 Gráfico de **Uso dos Cartões**
- 💰 Gráfico **Waterfall** (Fluxo de Caixa acumulado)
- 📊 Evolução dos **Investimentos** com rendimento %

### 🔔 Produtividade
- 🔔 **Alertas de contas a vencer** (até 3 dias)
- 🔔 **Notificações push** do navegador
- 📅 **Projeção do próximo mês** (média móvel)
- 📊 **Orçamento por categoria** com comparativo à média
- 🎯 **Meta de reserva** com cálculo de aporte

### 🛡️ Segurança & Privacidade
- 🔒 **100% offline** — dados nunca saem do dispositivo
- 🚫 **Sem cadastro**, sem e-mail, sem cookies de analytics
- 🔐 **Backup criptografado** (AES-256-GCM + PBKDF2)
- 👁️ **Modo privacidade** (ofusca valores com blur)
- 🗑️ **Apagar todos os dados** com confirmação em duas etapas

### 📱 Experiência
- 📲 **Instalável como app** (PWA)
- 🌓 **Tema claro e escuro**
- 🌎 **Português (BR) e Inglês (US)**
- 💵 Moeda em **Real (R$) e Dólar ($)**
- 👆 **Swipe gestures** no mobile (deslize para pagar/excluir)
- ⌨️ **Atalhos de teclado** (← → para navegar meses)
- 📄 **Paginação** configurável (10/20/50/100 itens)

### 📥 Importação & Exportação
- 📥 Importar/Exportar **CSV** (extrato mensal)
- 💾 Backup/Restauração **JSON** (com ou sem senha)
- 🖨️ Impressão de **extrato em PDF**
- 🖨️ Impressão de **fatura do cartão em PDF**
- 📘 **Manual do usuário** integrado

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| **HTML5 + CSS3** | Estrutura e design glassmorphism |
| **JavaScript (ES6+)** | Lógica principal (classe `SmartFinance`) |
| **Chart.js 4.4** | Gráficos interativos |
| **LocalStorage** | Persistência dos dados |
| **Web Crypto API** | Criptografia AES-256 dos backups |
| **Service Worker** | Cache offline (PWA) |
| **File System Access API** | Download moderno no desktop |

---

## 📂 Estrutura do Projeto

```
smart-finance/
├── index.html          # Estrutura HTML + modais
├── styles.css          # Estilos (glassmorphism, responsivo)
├── js/
│   └── app.js          # Lógica principal (classe SmartFinance)
├── sw.js               # Service Worker (cache offline)
├── manifest.json       # Configuração PWA
├── logomarca.svg       # Logo completa (ícone + texto)
├── logo.svg            # Ícone do app
├── favicon.svg         # Favicon
└── README.md           # Este arquivo
```

---

## 📥 Instalação

### Opção 1: Uso Local (Recomendado)

1. **Clone ou baixe** o repositório:
   ```bash
   git clone https://github.com/seu-usuario/smart-finance.git
   cd smart-finance
   ```

2. **Sirva via HTTP** (Service Worker exige protocolo seguro):
   ```bash
   # Com Python
   python -m http.server 8000

   # Com Node.js (npx)
   npx serve .

   # Com PHP
   php -S localhost:8000
   ```

3. Acesse `http://localhost:8000` no navegador.

4. **Instale como app**: clique no ícone de instalação na barra de endereço.

### Opção 2: Hospedagem

Faça upload dos arquivos para qualquer hospedagem estática:
- **GitHub Pages** (gratuito)
- **Netlify** / **Vercel** (gratuito)
- **Cloudflare Pages** (gratuito)

> ⚠️ **Importante:** Service Workers exigem HTTPS ou `localhost`.

---

## 🎮 Como Usar

### 🚀 Primeiros Passos

1. **Leia e aceite** os Termos de Uso na primeira abertura.
2. **Cadastre suas contas** (Menu → Minhas Contas).
3. **Cadastre seus cartões** (Menu → Meus Cartões) — opcional.
4. **Adicione transações** usando o botão flutuante `+`.
5. **Acompanhe** tudo no Dashboard e nos gráficos!

### 💡 Dica: Modo Demonstração

Quer testar sem cadastrar nada? No menu **ⓘ Informações → Modo Demonstração**, o app carrega dados fictícios de 6 meses para você explorar todas as funcionalidades.

### ⌨️ Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `←` | Mês anterior |
| `→` | Próximo mês |
| `Home` | Volta ao mês atual |
| `Esc` | Fecha modal ativo |

### 📱 Gestos no Mobile

- **Deslize para a direita** em uma transação → Marcar como paga
- **Deslize para a esquerda** → Excluir transação
- **Deslize horizontalmente** na tabela → Navegar entre meses

---

## 🔐 Backup & Segurança

### Fazer Backup
1. Vá em **⚙️ Configurações → 💾 Backup Automático**
2. Ative "Fazer Agora" ou aguarde o lembrete semanal
3. Opcionalmente, marque **"Proteger com senha"** (AES-256)
4. Guarde o arquivo `.json` em local seguro

### Restaurar Backup
1. Menu → **Restaurar Backup**
2. Selecione o arquivo `.json`
3. Se protegido, digite a senha
4. Confirme a substituição dos dados

> ⚠️ **Atenção:** A restauração **substitui todos os dados atuais**. Faça backup antes!

---

## 🧩 Categorias Padrão

O app já vem com **23 categorias** pré-configuradas:

**Despesas:** Casa, Despensa, Transporte, Saúde, Educação, Cuidados Pessoais, Serviços, Lazer, Pets, Instituição Financeira, Documento/Jurídico, Empréstimo, Doação/Generosidade, Reserva/Aplicação

**Receitas:** Salário, Vale Alimentação, Auxílios, Benefícios, Restituição, Freelance, Rendimentos, Resgate

💡 Você pode **criar categorias personalizadas** e o app **sugere automaticamente** com base na descrição (ex.: digitar "uber" sugere "Transporte").

---

## 🌍 Internacionalização

| Idioma | Moeda | Código |
|--------|-------|--------|
| Português (BR) | Real (R$) | `pt-BR` / `BRL` |
| English (US) | Dollar ($) | `en-US` / `USD` |

Troque no menu **ⓘ Informações → Idioma / Moeda**.

---

## 📱 Compatibilidade

| Navegador | Suporte |
|-----------|---------|
| Chrome / Edge 90+ | ✅ Completo |
| Firefox 90+ | ✅ Completo |
| Safari 15+ | ✅ Completo |
| Samsung Internet | ✅ Completo |
| iOS Safari | ✅ Funcional (PWA limitado) |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 🔧 Enviar pull requests
- 🌐 Traduzir para outros idiomas

---

## 📄 Licença

Este projeto é **gratuito para uso pessoal**.

© 2026 **RogerElizar™** — Todos os direitos reservados.

> *"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."* — Tiago 1:17

---

## ☕ Apoie o Projeto

Se o Smart Finance tem sido útil para você, que tal um cafezinho?

💚 **Chave PIX:** `rogerelizar@gmail.com`

---

## 📧 Contato

- 📧 **E-mail:** [rogerelizar@gmail.com](mailto:rogerelizar@gmail.com)
- 💡 **Feedback:** Envie sugestões, críticas ou ideias!

---

<p align="center">
  <strong>Feito com 💜 por RogerElizar™</strong><br>
  <em>Que Deus abençoe sua jornada financeira.</em>
</p>
## 📄 Changelog

### v2.0.1 - 2026
**🎨 Melhorias de Interface e Experiência do Usuário**

**Adicionado:**
- ✅ **Sequência de Inicialização Otimizada:**
  1. Splash Screen exibida por 3 segundos
  2. Disclaimer aparece e desaparece ao clicar em "OK"
  3. Citação motivacional exibida por 3 segundos
  4. Dashboard é carregada

**Alterado:**
- ✅ **Barra Flutuante:** Adicionada linha azul clara fina no contorno superior para destaque

**Corrigido:**
- ✅ **Botão "OK":** Diminuído para tamanho mais compacto (80px max-width)
- ✅ **Indicador Numérico do Sino:** Agora aparece apenas quando há contas a vencer; caso contrário, apenas o sino fica visível

---

### v2.0.0 - 2026
**🎨 Melhorias de Interface e Experiência do Usuário**
- ✅ **Botão Disclaimer:** Texto alterado de "Aceitar e continuar" para "OK"
- ✅ **Layout do Disclaimer:** Botão movido para o final do texto, ao lado direito da checkbox
- ✅ **Minificação de Assets:** Performance otimizada com arquivos minificados
  - `app.min.js`: 229KB → 142KB (38% redução)
  - `styles.min.css`: 64KB → 48KB (25% redução)
  - `sw.min.js`: 5.2KB → 2.4KB (54% redução)
  - `index.min.html`: 59KB → 47KB (21% redução)
- ✅ **Build Script:** `optimize.sh` para regenerar arquivos minificados

**Total de economia: ~120KB (33% de redução)**

---

### v1.0.0 - 2026
**Lançamento Inicial**
- ✅ Controle financeiro pessoal completo
- ✅ Múltiplas contas e cartões de crédito
- ✅ Aplicações financeiras
- ✅ Gráficos interativos com Chart.js
- ✅ Backup criptografado (AES-256)
- ✅ Modo offline (PWA)
- ✅ Internacionalização (pt-BR / en-US)
- ✅ Temas claro e escuro
- ✅ Modo privacidade
- ✅ Notificações push
- ✅ Importação/Exportação CSV e JSON

---
