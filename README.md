# 📘 Smart Finance - Controle Financeiro Pessoal Inteligente

[![Version](https://img.shields.io/badge/version-2.0.2-blue.svg)](https://github.com/RogerElizar/smart-finance/releases)
[![License](https://img.shields.io/badge/license-CC0-lightgrey.svg)](LICENSE)
[![PT-BR](https://img.shields.io/badge/lang-pt--BR-green.svg)](README.md)
[![EN-US](https://img.shields.io/badge/lang-en--US-red.svg)](README-EN.md)

**Smart Finance** é um aplicativo web progressivo (PWA) desenvolvido para ajudar você a organizar suas finanças pessoais de forma simples, segura e inteligente. **100% offline**, sem necessidade de cadastro ou instalação de servidores.

---

## 🌟 Principais Funcionalidades

### 💰 Gestão Completa de Contas
- **Múltiplas contas correntes**: Banco Itaú, Nubank, Caixa, etc.
- **Contas de investimento**: Reserve e acompanhe seus investimentos
- **Cartões de crédito**: Cadastre múltiplos cartões com datas de fechamento e vencimento personalizadas
- **Transferências**: Movimente dinheiro entre suas contas facilmente

### 📊 Visualizações Inteligentes
- **Dashboard completo**: Saldo unificado, receitas, despesas e acumulado de cartão de crédito
- **Gráficos interativos**: Pizza, barras e linhas com Chart.js
- **Projeção financeira**: Previsão do próximo mês baseada em despesas recorrentes e parcelas
- **Orçamento por categoria**: Defina limites de gastos e acompanhe seu progresso

### 🎯 Planejamento Financeiro
- **Metas de reserva**: Calcule quanto tempo levará para atingir sua reserva de emergência
- **Despesas parceladas**: Registre compras em até 48x e acompanhe automaticamente
- **Despesas recorrentes**: Automatize lançamentos mensais fixos
- **Contas a vencer**: Alertas visuais para pagamentos próximos

### 🔒 Segurança e Privacidade
- **100% Offline**: Todos os dados são armazenados localmente no seu dispositivo
- **Sem cadastro**: Não é necessário criar conta ou fornecer e-mail
- **Sem rastreamento**: Não utilizamos cookies de analytics ou rastreamento
- **Backup criptografado**: Exporte e importe seus dados com segurança
- **Modo privacidade**: Oculte valores sensíveis quando necessário

### 📱 Experiência do Usuário
- **PWA (Progressive Web App)**: Instale como aplicativo nativo no seu dispositivo
- **Design responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Temas personalizáveis**: Claro, escuro e nas cores da bandeira do seu cartão
- **Multi-idioma**: Português (BR) e Inglês (US)
- **Atalhos de teclado**: Produtividade máxima com comandos rápidos
- **Gestos mobile**: Swipe para editar e excluir lançamentos

---

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização moderna com variáveis CSS e Flexbox/Grid
- **JavaScript (ES6+)** - Lógica de negócio e manipulação do DOM
- **Chart.js 4.4.0** - Gráficos interativos e responsivos
- **LocalStorage** - Armazenamento local de dados
- **Service Worker** - Funcionamento offline e cache
- **Web App Manifest** - Instalação como PWA
- **Google Fonts (Inter)** - Tipografia moderna e legível

---

## 📁 Estrutura do Projeto

```
smart-finance/
├── index.html              # Aplicação principal
├── index.min.html          # Versão otimizada
├── styles.css              # Folha de estilos completa
├── styles.min.css          # Versão minificada
├── js/
│   ├── app.js              # Lógica principal da aplicação
│   └── app.min.js          # Versão minificada
├── sw.js                   # Service Worker (offline)
├── sw.min.js               # Service Worker minificado
├── manifest.json           # Configuração PWA
├── favicon.svg             # Ícone do aplicativo
├── logo.svg                # Logomarca
├── logomarca.svg           # Logomarca alternativa
├── README.md               # Este arquivo (Português)
├── README-EN.md            # README em Inglês
├── CHANGELOG.md            # Histórico de versões
├── LICENSE                 # Licença CC0 1.0
└── ManualDoUsuário-SmartFinance.md  # Manual completo
```

---

## 📦 Instalação

### Opção 1: Uso Local (Recomendado)
1. **Baixe os arquivos** deste repositório
2. **Extraia** para uma pasta no seu computador
3. **Abra** o arquivo `index.html` em seu navegador preferido
4. **Instale como PWA** (opcional):
   - No Chrome/Edge: Clique no ícone de instalação na barra de endereços
   - No Safari (iOS): Toque em "Compartilhar" → "Adicionar à Tela de Início"

### Opção 2: Hospedagem Gratuita
Você pode hospedar gratuitamente em:
- **GitHub Pages**: Ative nas configurações do repositório
- **Netlify**: Arraste a pasta para [netlify.com](https://netlify.com)
- **Vercel**: Importe o repositório em [vercel.com](https://vercel.com)

### Requisitos do Sistema
- **Navegadores suportados**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Armazenamento**: Mínimo de 5MB livres no navegador
- **Conexão**: Apenas para carregamento inicial (funciona offline após)

---

## 🎯 Primeiros Passos

### 1️⃣ Configurando Suas Contas
Antes de registrar transações, cadastre suas contas:

1. Clique em **"Minhas Contas"** no menu inferior
2. Toque em **"➕ Nova Conta"**
3. Preencha:
   - **Nome**: Ex: "Banco Itaú", "Nubank", "Carteira"
   - **Tipo**: Conta Corrente ou Investimento
   - **Saldo Inicial**: Valor atual na conta
4. Clique em **"💾 Salvar"**

### 2️⃣ Cadastrando Cartões de Crédito
1. Acesse **"Meus Cartões"** no menu
2. Clique em **"➕ Novo Cartão"**
3. Informe:
   - **Nome**: Ex: "Inter Black"
   - **Bandeira**: Visa, Mastercard, etc.
   - **Dia de Fechamento**: Quando a fatura fecha
   - **Dia de Vencimento**: Quando você paga a fatura
   - **Limite**: Limite total do cartão
4. Salve as configurações

### 3️⃣ Registrando Sua Primeira Transação
No topo da página, use os botões coloridos:

- **💰 Receita**: Salários, rendimentos, vendas
- **💸 Despesa**: Compras, contas, lazer
- **🔄 Transferência**: Movimentação entre contas

**Exemplo de despesa no cartão:**
```
Tipo: 💸 Despesa
Valor: R$ 1.200,00 (valor total)
Descrição: Geladeira
Cartão: Inter
Parcelado: ✓ (4x de R$ 300,00)
```

---

## ⌨️ Atalhos de Teclado (Desktop)

| Atalho | Ação |
|--------|------|
| `Ctrl + N` | Nova receita |
| `Ctrl + D` | Nova despesa |
| `Ctrl + T` | Nova transferência |
| `Ctrl + S` | Salvar formulário |
| `Ctrl + F` | Buscar transações |
| `Esc` | Fechar modal |
| `F1` | Abrir ajuda |

---

## 📱 Gestos Mobile

- **Swipe para esquerda**: Excluir lançamento
- **Swipe para direita**: Editar lançamento
- **Toque longo**: Selecionar múltiplos itens
- **Pull to refresh**: Atualizar dashboard

---

## 🗂️ Backup e Segurança

### Exportar Dados
1. Acesse **Configurações** ⚙️
2. Clique em **"Exportar Dados"**
3. Baixe o arquivo `.json` criptografado
4. Guarde em local seguro (nuvem, HD externo)

### Importar Dados
1. Em **Configurações** ⚙️
2. Selecione **"Importar Dados"**
3. Escolha o arquivo `.json` de backup
4. Confirme a importação

### ⚠️ Importante
- **Backup regular**: Exporte seus dados semanalmente
- **Responsabilidade**: Os dados são armazenados apenas no seu dispositivo
- **Limpeza do navegador**: Pode apagar todos os dados se não houver backup

---

## 🏷️ Categorias Padrão

### Receitas
- Salário
- Rendimentos
- Vendas
- Presentes
- Outros

### Despesas
- Alimentação
- Moradia
- Transporte
- Saúde
- Educação
- Lazer
- Vestuário
- Serviços
- Outros

*Você pode criar categorias personalizadas em Configurações.*

---

## 🌐 Internacionalização (i18n)

O Smart Finance está disponível em:

- **🇧🇷 Português (Brasil)** - Idioma padrão
- **🇺🇸 English (United States)** - [Switch to English](README-EN.md)

Para alterar o idioma:
1. Acesse **Configurações** ⚙️
2. Em **Idioma**, selecione sua preferência
3. A interface será atualizada automaticamente

---

## 🔧 Compatibilidade com Navegadores

| Navegador | Versão Mínima | Status |
|-----------|---------------|--------|
| Google Chrome | 90+ | ✅ Completo |
| Mozilla Firefox | 88+ | ✅ Completo |
| Microsoft Edge | 90+ | ✅ Completo |
| Apple Safari | 14+ | ✅ Completo |
| Opera | 76+ | ✅ Completo |
| Samsung Internet | 14+ | ✅ Completo |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça o **commit** das mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o **push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Diretrizes de Desenvolvimento
- Mantenha o código limpo e comentado
- Siga o padrão ES6+ do JavaScript
- Teste em múltiplos navegadores
- Documente novas funcionalidades
- Respeite a licença CC0 1.0

---

## 📄 Licença

Este projeto está sob a licença **Creative Commons CC0 1.0 Universal**.

Isso significa que você pode:
- ✅ Usar para qualquer finalidade (pessoal ou comercial)
- ✅ Modificar e distribuir
- ✅ Usar sem atribuição (embora apreciemos créditos)

Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).

---

## 👨‍💻 Autor e Contato

**Smart Finance** foi idealizado e desenvolvido por **RogerElizar™**

- **E-mail**: rogerelizar@gmail.com
- **GitHub**: [@RogerElizar](https://github.com/RogerElizar)

---

## 🆘 Suporte e Dúvidas

### Precisa de Ajuda?
1. Consulte o [Manual do Usuário](ManualDoUsuário-SmartFinance.md)
2. Verifique o [CHANGELOG](CHANGELOG.md) para novidades
3. Entre em contato por e-mail: rogerelizar@gmail.com

### Problemas Técnicos?
- Limpe o cache do navegador
- Verifique se o JavaScript está habilitado
- Tente abrir em modo anônimo/incógnito
- Atualize para a versão mais recente

---

## 📈 Roadmap (Próximas Versões)

- [ ] Relatórios personalizados em PDF
- [ ] Integração com APIs bancárias (Open Banking)
- [ ] Notificações push para contas a vencer
- [ ] Modo multi-usuário (família)
- [ ] Exportação para planilhas Excel/CSV
- [ ] Gráficos de evolução patrimonial
- [ ] Sugestões de economia baseadas em IA

---

## 🙏 Agradecimentos

- **Chart.js** - Biblioteca de gráficos open-source
- **Google Fonts** - Tipografia Inter
- **Comunidade Dev** - Por todo suporte e inspiração

---

## ⚠️ Aviso Legal

**Smart Finance** é uma ferramenta de apoio ao controle financeiro pessoal e **não substitui consultoria financeira profissional**.

- Todas as decisões financeiras são de responsabilidade exclusiva do usuário
- O desenvolvedor não se responsabiliza por perdas ou danos decorrentes do uso da aplicação
- É responsabilidade do usuário manter backups regulares de seus dados
- A aplicação não possui vínculo com instituições financeiras mencionadas

---

## 📝 Changelog

Para visualizar todas as alterações entre versões, consulte o arquivo [CHANGELOG.md](CHANGELOG.md).

**Versão Atual**: 2.0.2
- ✨ eBook Manual do Usuário em HTML5
- 🎨 Melhorias de interface e experiência
- 📊 Novos gráficos e visualizações
- 🔒 Aprimoramentos de segurança

---

<div align="center">

**Smart Finance © 2026** - Desenvolvido com ❤️ por RogerElizar™

[⬆️ Voltar ao topo](#-smart-finance---controle-financeiro-pessoal-inteligente)

</div>
