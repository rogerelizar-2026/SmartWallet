# Smart Finance+

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/smart-finance-plus/smart-finance-plus)

**Smart Finance+** é a evolução do Smart Finance, com arquitetura moderna, modular e otimizada para performance e manutenibilidade.

## 🚀 Destaques

- **Arquitetura Modular** - Código organizado em módulos ES6+ independentes
- **Build Moderno** - Vite para desenvolvimento rápido e build otimizado
- **Testes Automatizados** - Suite completa com Vitest
- **Performance** - Code splitting, tree shaking e lazy loading
- **TypeScript Ready** - Preparado para migração TypeScript
- **Documentação Completa** - Guides, API reference e exemplos

## 📦 Instalação Rápida

```bash
# Clonar repositório
git clone https://github.com/smart-finance-plus/smart-finance-plus.git
cd smart-finance-plus

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## 🛠️ Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm run preview` | Preview do build |
| `npm test` | Rodar testes |
| `npm run test:unit` | Testes unitários |
| `npm run test:integration` | Testes de integração |
| `npm run lint` | Verificar código |
| `npm run format` | Format código |

## 📁 Estrutura do Projeto

```
smart-finance-plus/
├── src/
│   ├── core/           # Núcleo da aplicação
│   │   ├── SmartFinance.js
│   │   ├── EventManager.js
│   │   └── StateManager.js
│   ├── modules/        # Módulos funcionais
│   │   ├── render.js
│   │   ├── transactions.js
│   │   └── accounts.js
│   ├── utils/          # Utilitários
│   └── main.js         # Entry point
├── tests/
│   ├── unit/           # Testes unitários
│   └── integration/    # Testes de integração
├── docs/               # Documentação
├── public/             # Assets públicos
└── package.json
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=https://api.smartfinance.plus
VITE_DEBUG=true
```

### Personalização

Edite `vite.config.js` para customizar o build:

```javascript
export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
});
```

## 📚 Documentação

- [Guia Completo](./docs/README.md)
- [Migração v1→v2](./docs/MIGRATION.md)
- [API Reference](./docs/API.md)
- [Changelog](./CHANGELOG.md)

## 🧪 Testes

```bash
# Todos os testes
npm test

# Com coverage
npm run test:coverage

# Watch mode
npm test -- --watch
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja nosso [Guia de Contribuição](./CONTRIBUTING.md).

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona minha feature'`)
4. Push (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links

- **Site:** https://smartfinance.plus
- **Issues:** https://github.com/smart-finance-plus/smart-finance-plus/issues
- **Discord:** https://discord.gg/smartfinance

## 👥 Autores

- Smart Finance Team

## 🙏 Agradecimentos

Obrigado a todos os contribuidores e usuários do Smart Finance original!

---

Feito com ❤️ pela comunidade Smart Finance
