# Smart Finance+

Versão modernizada e modular do Smart Finance, com arquitetura refatorada para melhor performance, manutenibilidade e escalabilidade.

## 🚀 Melhorias da Versão Plus

- **Arquitetura Modular**: Código organizado em módulos independentes
- **Performance Otimizada**: Lazy loading e code splitting
- **TypeScript Ready**: Preparado para migração TypeScript
- **Testes Automatizados**: Suite de testes unitários e de integração
- **Build Moderno**: Vite como bundler para desenvolvimento e produção
- **Tree Shaking**: Eliminação de código não utilizado
- **ES6+ Modules**: Import/export nativos

## 📁 Estrutura do Projeto

```
smart-finance-plus/
├── src/
│   ├── core/           # Núcleo da aplicação
│   ├── modules/        # Módulos funcionais (accounts, transactions, cards, investments)
│   ├── components/     # Componentes de UI reutilizáveis
│   ├── utils/          # Funções utilitárias
│   └── assets/         # Recursos estáticos
├── tests/
│   ├── unit/           # Testes unitários
│   └── integration/    # Testes de integração
├── public/             # Arquivos públicos
├── docs/               # Documentação
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Tecnologias

- **JavaScript ES6+**
- **Vite** (Bundler)
- **Vitest** (Framework de testes)
- **ESLint** (Linting)
- **Prettier** (Formatação)

## 📦 Instalação

```bash
npm install
```

## 🏃 Desenvolvimento

```bash
npm run dev
```

## 📦 Build

```bash
npm run build
```

## ✅ Testes

```bash
npm test              # Rodar todos os testes
npm run test:unit     # Testes unitários
npm run test:integration  # Testes de integração
```

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🔗 Links

- [Documentação Completa](./docs/)
- [Changelog](./CHANGELOG.md)
- [Guia de Migração](./docs/MIGRATION.md)
