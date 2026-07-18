# 📝 Changelog - Smart Finance

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto aderem ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.0.0] - 2026

### 🎨 Melhorias de Interface e Experiência do Usuário

#### Alterado
- **Botão do Disclaimer:** Texto alterado de "Aceitar e continuar" para "OK"
- **Layout do Disclaimer:** Botão movido para o final do texto, posicionado ao lado direito da checkbox
- **Performance:** Assets minificados para produção
  - `app.min.js`: 229KB → 142KB (38% redução)
  - `styles.min.css`: 64KB → 48KB (25% redução)
  - `sw.min.js`: 5.2KB → 2.4KB (54% redução)
  - `index.min.html`: 59KB → 47KB (21% redução)

#### Adicionado
- Script `optimize.sh` para regenerar arquivos minificados
- Seção de Changelog no README.md

### 📊 Resumo
- **Total de economia:** ~120KB (33% de redução no tamanho dos assets)
- **Foco:** Otimização de performance e melhorias na UX do disclaimer

---

## [1.0.0] - 2026

### 🎉 Lançamento Inicial

#### Funcionalidades Principais
- **Gestão Financeira Completa**
  - Múltiplas contas (corrente, poupança, investimento)
  - Cartões de crédito com controle de fatura
  - Aplicações financeiras (CDB, Tesouro, LCI/LCA, FIIs, Ações)
  - Transferências entre contas
  - Transações recorrentes e parceladas

- **Visualizações Inteligentes**
  - Gráfico de Entradas e Saídas (6 meses)
  - Gráfico de Despesas por Categoria
  - Gráfico de Uso dos Cartões
  - Gráfico Waterfall (Fluxo de Caixa)
  - Evolução dos Investimentos com rendimento %

- **Produtividade**
  - Alertas de contas a vencer (até 3 dias)
  - Notificações push do navegador
  - Projeção do próximo mês (média móvel)
  - Orçamento por categoria com comparativo
  - Meta de reserva com cálculo de aporte

- **Segurança & Privacidade**
  - 100% offline (dados locais)
  - Sem cadastro, e-mail ou analytics
  - Backup criptografado (AES-256-GCM + PBKDF2)
  - Modo privacidade (ofusca valores)
  - Apagar todos os dados com confirmação em duas etapas

- **Experiência**
  - PWA instalável como app
  - Temas claro e escuro
  - Internacionalização (pt-BR / en-US)
  - Moeda (Real R$ / Dólar $)
  - Swipe gestures no mobile
  - Atalhos de teclado
  - Paginação configurável

- **Importação & Exportação**
  - Importar/Exportar CSV
  - Backup/Restauração JSON (com ou sem senha)
  - Impressão de extrato em PDF
  - Impressão de fatura em PDF
  - Manual do usuário integrado

#### Tecnologias
- HTML5 + CSS3 (Glassmorphism)
- JavaScript ES6+
- Chart.js 4.4
- LocalStorage
- Web Crypto API
- Service Worker (PWA)
- File System Access API

---

## Notas de Versão

### Convenções
- **Adicionado:** Novas funcionalidades
- **Alterado:** Mudanças em funcionalidades existentes
- **Corrigido:** Correções de bugs
- **Removido:** Funcionalidades removidas
- **Segurança:** Melhorias de segurança

### Links
- [2.0.0]: #200---2026
- [1.0.0]: #100---2026
