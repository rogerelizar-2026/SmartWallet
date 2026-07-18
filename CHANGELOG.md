# 📝 Changelog - Smart Finance

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto aderem ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.0.2] - 2026

### 📘 eBook Manual do Usuário

#### Adicionado
- **Novo eBook em HTML5:** Arquivo `ebook-manual.html` com manual completo formatado para leitura em tela e impressão A4
  - Capa com logomarca e frase centralizada sobre nuvem transparente com símbolos "$"
  - Fonte corpo do texto: tamanho 12pt (Georgia, serif)
  - Títulos e subtítulos: tamanho 14pt e 18pt
  - Cada tópico inclui citação breve de finanças
  - Dicas de coach financeiro ao final de cada seção com transição para próximo tópico
  - Conclusão com revisão integrada de todos os tópicos mostrando como se complementam

#### Alterado
- **Modal "Manual do Usuário":** 
  - Botão "Imprimir" substituído por "eBook"
  - Ao clicar, abre o eBook em nova janela (invisível até o clique)
  
- **Modal "Novidades":**
  - Botão "Imprimir" substituído por "Baixar eBook"
  - Texto atualizado para "Baixe o eBook completo em PDF!"

#### Conteúdo do eBook
- **Capa:** Logomarca + slogan sobre fundo com nuvem de "$"
- **Seções detalhadas:**
  1. Bem-vindo e instalação como WebApp
  2. Gestão Completa de Contas (múltiplas contas, cartões, investimentos)
  3. Visualizações Inteligentes (gráficos e análise de dados)
  4. Produtividade e Alertas (contas a vencer, projeções, metas)
  5. Segurança & Privacidade (offline, backup criptografado, modo privacidade)
  6. Experiência do Usuário (temas, atalhos, multi-idioma)
  7. Conclusão: Revisão integrada mostrando ecossistema completo para liberdade financeira

### 📊 Resumo
- **Foco:** Transformação do manual em eBook profissional com conteúdo educativo enriquecido

---

## [2.0.1] - 2026

### 🎨 Melhorias de Interface e Experiência do Usuário

#### Adicionado
- **Sequência de Inicialização Otimizada:**
  1. Splash Screen exibida por 3 segundos
  2. Disclaimer aparece e desaparece ao clicar em "OK"
  3. Citação motivacional exibida por 3 segundos
  4. Dashboard é carregada

#### Alterado
- **Botão do Disclaimer:** Texto alterado de "Aceitar e continuar" para "OK"
- **Layout do Disclaimer:** Botão movido para o final do texto, posicionado ao lado direito da checkbox
- **Barra Flutuante:** Adicionada linha azul clara fina no contorno superior para destaque

#### Corrigido
- **Botão "OK":** Diminuído para tamanho mais compacto (80px max-width)
- **Indicador Numérico do Sino:** Agora aparece apenas quando há contas a vencer; caso contrário, apenas o sino fica visível

### 📊 Resumo
- **Foco:** Melhoria na sequência de inicialização, ajustes de UI/UX e correções visuais

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
