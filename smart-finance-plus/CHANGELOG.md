# Smart Finance+ - CHANGELOG

Todas as mudanças importantes neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [2.0.0] - 2024-07-21

### ✨ Adicionado
- Nova arquitetura modular com ES6+ modules
- Sistema de build moderno com Vite
- Framework de testes com Vitest
- Gerenciador de eventos (EventManager)
- Gerenciador de estado (StateManager)
- Módulo de renderização (Renderer)
- Módulo de transações (TransactionManager)
- Módulo de contas (AccountManager)
- Utilitários modernos (utils/)
- Configuração ESLint e Prettier
- Documentação completa
- Guia de migração v1.x → v2.0

### 🔧 Modificado
- Refatoração completa da classe SmartFinance
- Separação de responsabilidades em módulos
- API baseada em Promises/async-await
- Sistema de eventos unificado

### 🚀 Melhorias de Performance
- Code splitting automático
- Tree shaking para eliminação de código morto
- Lazy loading de módulos
- Build otimizado com minificação

### 📁 Estrutura
- Nova organização de pastas (src/, tests/, docs/)
- Separação clara entre core, modules, components, utils
- Tests unitários e de integração

### 🐛 Corrigido
- Problemas de escopo do código monolítico
- Dificuldade de manutenção
- Ausência de testes automatizados

## [1.x.x] - Versão Original

### Notas
- Versão original do Smart Finance
- Código monolítico em app.js
- Sem testes automatizados
- Build manual via optimize.sh

---

## Legendas

- `✨ Adicionado` - Novas funcionalidades
- `🐛 Corrigido` - Correções de bugs
- `🔧 Modificado` - Mudanças em funcionalidades existentes
- `🚀 Performance` - Melhorias de performance
- `📁 Estrutura` - Mudanças na estrutura do projeto
- `⚠️ Breaking` - Mudanças que quebram compatibilidade
