# 💰 Smart Finance

[![Versão](https://img.shields.io/badge/versão-2.0.3-blue)](CHANGELOG.md)
[![Licença](https://img.shields.io/badge/licença-MIT-green)](LICENSE)
[![Idiomas](https://img.shields.io/badge/idiomas-pt--BR%7Cen--US-yellow)](README-EN.md)
[![PWA](https://img.shields.io/badge/PWA-ready-orange)]()

> **Seu assistente pessoal de finanças - Simples, seguro e offline**

---

## 📖 Sobre o Projeto

O **Smart Finance** é um Progressive Web App (PWA) desenvolvido para ajudar você a controlar suas finanças pessoais de forma simples, segura e eficiente. Funciona completamente offline, protege seus dados com criptografia e oferece uma experiência moderna em qualquer dispositivo.

### ✨ Principais Funcionalidades

- 📊 **Gestão Completa de Contas** - Cadastre contas correntes, investimentos e cartões
- 💹 **Controle de Receitas e Despesas** - Registre todas as suas transações financeiras
- 📈 **Gráficos Interativos** - Visualize seus gastos e receitas com Chart.js
- 🔐 **Segurança Avançada** - Criptografia AES-GCM de 256 bits para proteger seus dados
- 📱 **100% Offline** - Funciona sem internet usando IndexedDB e Service Workers
- 🌙 **Modo Escuro** - Interface moderna com tema claro/escuro
- 🔄 **Backup Automático** - Exporte e importe seus dados facilmente
- 📅 **Transações Recorrentes** - Automatize lançamentos periódicos
- 💳 **Parcelamento Inteligente** - Controle de compras parceladas no cartão
- 🔍 **Busca Avançada** - Filtre transações por descrição, categoria, valor e data
- 🌐 **Multi-idioma** - Português (BR), Inglês (US) e Espanhol (ES)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| HTML5 | Estrutura semântica |
| CSS3 | Estilização e responsividade |
| JavaScript (ES6+) | Lógica da aplicação |
| Chart.js 4.x | Gráficos interativos |
| IndexedDB | Armazenamento local |
| Service Worker | Funcionalidade offline |
| Web Crypto API | Criptografia de dados |
| Manifest.json | Instalação como PWA |

---

## 📁 Estrutura do Projeto

```
smart-finance/
├── index.html              # Página principal
├── manifest.json           # Configuração PWA
├── sw.js                   # Service Worker
├── css/
│   └── style.css          # Folhas de estilo
├── js/
│   ├── app.js             # Aplicação principal
│   └── modules/
│       ├── constants.js   # Constantes e categorias
│       ├── crypto.js      # Módulo de criptografia
│       ├── smartfinance.js # Lógica financeira
│       └── utils.js       # Funções utilitárias
├── README.md              # Este arquivo (PT-BR)
├── README-EN.md           # Versão em inglês
├── CHANGELOG.md           # Histórico de versões
├── LICENSE                # Licença MIT
└── MANUAL_DO_USUARIO.md   # Guia completo do usuário
```

---

## 🚀 Instalação

### Opção 1: Uso Local (Recomendado)

1. **Clone ou baixe o repositório**
   ```bash
   git clone https://github.com/seu-usuario/smart-finance.git
   cd smart-finance
   ```

2. **Abra diretamente no navegador**
   - Basta abrir o arquivo `index.html` em qualquer navegador moderno
   - O aplicativo funcionará imediatamente, mesmo sem servidor web

3. **Instale como PWA (Opcional)**
   - No Chrome/Edge: Clique no ícone de instalação na barra de endereço
   - No Safari (iOS): Toque em "Compartilhar" → "Adicionar à Tela de Início"
   - No Firefox: Menu → "Aplicativo" → "Instalar"

### Opção 2: Hospedagem Gratuita

O Smart Finance pode ser hospedado gratuitamente em:

- **[GitHub Pages](https://pages.github.com/)**
  ```bash
  # Habilite GitHub Pages nas configurações do repositório
  ```

- **[Vercel](https://vercel.com/)**
  ```bash
  npm install -g vercel
  vercel deploy
  ```

- **[Netlify](https://netlify.com/)**
  - Arraste a pasta do projeto para o painel do Netlify

- **[Firebase Hosting](https://firebase.google.com/docs/hosting)**
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting
  firebase deploy
  ```

---

## 📖 Primeiros Passos

### 1️⃣ Configuração Inicial

Ao abrir o aplicativo pela primeira vez:

1. **Defina sua moeda** (padrão: BRL - Real Brasileiro)
2. **Cadastre suas contas**:
   - Conta Corrente (saldo inicial)
   - Investimentos (se houver)
   - Cartões de crédito (com limite e fechamento)

### 2️⃣ Adicione Transações

- Clique em **"+ Nova Transação"**
- Preencha:
  - **Descrição**: Ex: "Supermercado", "Salário"
  - **Valor**: R$ 500,00
  - **Categoria**: Selecione da lista (veja abaixo)
  - **Conta**: Onde ocorreu a transação
  - **Data**: Data do lançamento
  - **Forma de Pagamento**: PIX, Débito, Crédito, etc.

### 3️⃣ Acompanhe Seus Resultados

- **Dashboard**: Visão geral do mês
- **Gráficos**: Distribuição por categoria
- **Extrato**: Lista completa de transações
- **Relatórios**: Balanço por período

---

## 📋 Categorias Padrão

O Smart Finance já vem com **22 categorias pré-configuradas** para organizar suas finanças:

### 🟢 Receitas (8 categorias)

| Categoria | Descrição | Cor |
|-----------|-----------|-----|
| 💼 Salário | Rendimentos do trabalho formal | Verde |
| 🎫 Vale Alimentação | VA/VR, Alelo, Sodexo | Amarelo |
| 🤝 Auxílios | Auxílios e bolsas | Turquesa |
| 🎁 Benefícios | Bônus, premiações | Azul claro |
| 💰 Restituição | Restituição IR, devoluções | Rosa |
| 💻 Freelance | Trabalhos autônomos | Laranja |
| 📈 Rendimentos | Juros, dividendos | Roxo |
| 🏦 Resgate | Resgate de investimentos/reserva | Índigo |

### 🔴 Despesas (14 categorias)

| Categoria | Descrição | Cor |
|-----------|-----------|-----|
| 🏠 Casa | Aluguel, condomínio, IPTU, luz, água, gás | Laranja |
| 🛒 Despensa | Mercado, feira, padaria, açougue | Verde água |
| 🚗 Transporte | Uber, combustível, estacionamento, pedágio | Laranja avermelhado |
| 🏥 Saúde | Farmácia, médico, dentista, plano de saúde | Vermelho |
| 📚 Educação | Curso, faculdade, escola, livros | Azul |
| 💇 Cuidados Pessoais | Salão, barbearia, academia, estética | Rosa |
| 📱 Serviços | Assinaturas, streaming, celular | Roxo claro |
| 🎉 Lazer | Cinema, viagem, show, restaurante, iFood | Rosa avermelhado |
| 🐾 Pets | Veterinário, ração, petshop | Roxo |
| 🏦 Instituição Financeira | Tarifas bancárias, taxas, IOF | Índigo |
| 📄 Documento/Jurídico | Cartório, advogado, multas | Cinza azulado |
| 💸 Empréstimo | Empréstimos e financiamentos | Magenta |
| ❤️ Doação/Generosidade | Doações, dízimo, ofertas | Verde lima |
| 💎 Reserva/Aplicação | Investimentos, poupança, CDB, Tesouro | Ciano |

> **Dica:** O sistema usa palavras-chave para categorização automática. Por exemplo, "Uber" será automaticamente classificado como **Transporte**.

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl + N` | Nova transação |
| `Ctrl + S` | Salvar transação |
| `Ctrl + F` | Buscar transações |
| `Ctrl + D` | Alternar modo escuro |
| `Esc` | Fechar modal |
| `Enter` | Confirmar ação |

---

## 📱 Gestos Mobile (Touch)

| Gesto | Ação |
|-------|------|
| 👆 Toque único | Selecionar item |
| 👆👆 Toque duplo | Editar item |
| ➡️ Deslizar direita | Marcar como pago/recebido |
| ⬅️ Deslizar esquerda | Excluir item |
| ⬇️ Puxar para baixo | Atualizar lista |

---

## 🔐 Backup e Segurança

### Criptografia de Dados

- Seus dados são criptografados localmente usando **AES-GCM 256 bits**
- A chave de criptografia é derivada da sua senha usando **PBKDF2**
- Nenhum dado é enviado para servidores externos

### Backup dos Dados

1. **Exportar Backup**:
   - Vá em **Configurações** → **Backup**
   - Clique em **"Exportar Dados"**
   - Salve o arquivo `.json` em local seguro

2. **Importar Backup**:
   - Vá em **Configurações** → **Backup**
   - Clique em **"Importar Dados"**
   - Selecione o arquivo `.json` de backup

> **Importante:** Faça backups regulares e guarde-os em locais seguros (nuvem, HD externo, etc.)

### Senha de Acesso

- Defina uma senha forte na primeira utilização
- Use combinação de letras, números e símbolos
- Nunca compartilhe sua senha

---

## 🌐 Internacionalização (i18n)

O Smart Finance suporta múltiplos idiomas:

| Idioma | Código | Status |
|--------|--------|--------|
| Português (Brasil) | pt-BR | ✅ Completo |
| Inglês (EUA) | en-US | ✅ Completo |
| Espanhol (Espanha) | es-ES | ✅ Completo |

Para alterar o idioma:
1. Acesse **Configurações**
2. Selecione **Idioma**
3. Escolha o idioma desejado
4. A interface será atualizada automaticamente

---

## 🖥️ Compatibilidade com Navegadores

| Navegador | Versão Mínima | Status |
|-----------|---------------|--------|
| Google Chrome | 80+ | ✅ Total |
| Mozilla Firefox | 75+ | ✅ Total |
| Microsoft Edge | 80+ | ✅ Total |
| Safari | 14+ | ✅ Total |
| Opera | 70+ | ✅ Total |
| Samsung Internet | 13+ | ✅ Total |

### Requisitos Técnicos

- Suporte a **ES6+** (JavaScript moderno)
- **IndexedDB** para armazenamento
- **Service Workers** para funcionalidade offline
- **Web Crypto API** para criptografia

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

### Diretrizes de Contribuição

- Mantenha o código limpo e documentado
- Siga o padrão de código existente
- Teste em múltiplos navegadores
- Actualize a documentação se necessário

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Você pode:
- ✅ Usar para fins pessoais
- ✅ Usar para fins comerciais
- ✅ Modificar o código
- ✅ Distribuir cópias

Desde que mantenha o aviso de copyright original.

---

## 📞 Contato e Suporte

- **📧 Email**: suporte@smartfinance.app (exemplo)
- **💬 Issues**: [GitHub Issues](https://github.com/seu-usuario/smart-finance/issues)
- **📖 Documentação**: Consulte o [Manual do Usuário](MANUAL_DO_USUARIO.md)

### Recursos de Ajuda

- [Manual Completo do Usuário](MANUAL_DO_USUARIO.md)
- [Histórico de Mudanças](CHANGELOG.md)
- [Perguntas Frequentes (FAQ)](FAQ.md)

---

## 🗺️ Roadmap

### ✅ Versão 2.0 (Atual)
- Criptografia de dados
- Multi-idioma
- Categorias inteligentes
- Modo escuro
- PWA completo

### 🚧 Próximas Versões
- [ ] Relatórios em PDF
- [ ] Integração com Open Finance (leitura)
- [ ] Metas financeiras
- [ ] Orçamento por categoria
- [ ] Notificações push
- [ ] Sincronização em nuvem (opcional)

---

## 🙏 Agradecimentos

- [Chart.js](https://www.chartjs.org/) - Biblioteca de gráficos
- [Font Awesome](https://fontawesome.com/) - Ícones
- Comunidade de desenvolvedores open-source

---

## ⚠️ Aviso Legal

O Smart Finance é fornecido "como está", sem garantias de qualquer tipo. Embora implementemos medidas de segurança robustas, recomendamos:

- Fazer backups regulares dos seus dados
- Usar senhas fortes e únicas
- Manter seu navegador sempre atualizado
- Não compartilhar sua senha de acesso

Este aplicativo não se conecta a instituições financeiras e não realiza transações bancárias reais. É uma ferramenta de controle financeiro pessoal.

---

<div align="center">

**Gostou do projeto?** ⭐ Deixe uma estrela no repositório!

[Voltar ao topo](#-smart-finance)

</div>
