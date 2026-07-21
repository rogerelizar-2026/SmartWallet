# Setup Rápido - Smart Finance+

## 🚀 Comece em 5 minutos

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Acessar no navegador
# http://localhost:3000
```

## 📦 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor local com hot reload

# Build
npm run build        # Build para produção
npm run preview      # Preview do build

# Testes
npm test             # Rodar todos os testes
npm run test:unit    # Apenas unitários
npm run test:coverage # Com relatório de cobertura

# Qualidade
npm run lint         # Verificar código
npm run lint:fix     # Corrigir automaticamente
npm run format       # Format código
```

## 🎯 Estrutura Principal

```
smart-finance-plus/
├── src/
│   ├── core/           # Núcleo (SmartFinance, EventManager, StateManager)
│   ├── modules/        # Módulos (render, transactions, accounts)
│   ├── utils/          # Funções utilitárias
│   └── main.js         # Entry point
├── tests/              # Testes
├── docs/               # Documentação
└── public/             # Assets
```

## 🔧 Configuração

### .env (opcional)
```env
VITE_API_URL=https://api.smartfinance.plus
VITE_DEBUG=true
```

### vite.config.js
Personalize aliases, build, server no `vite.config.js`.

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Port already in use"
Edite `vite.config.js` e mude a porta:
```javascript
server: { port: 3001 }
```

### Build falha
```bash
rm -rf node_modules dist
npm install
npm run build
```

## 📚 Próximos Passos

1. Leia [README-PLUS.md](./README-PLUS.md)
2. Veja [Documentação](./docs/README.md)
3. Confira [Próximos Passos](./PROXIMOS_PASSOS.md)

## 💡 Dica

Use o modo debug para ver logs detalhados:
```javascript
const app = new SmartFinance({ debug: true });
```

---

Precisa de ajuda? Abra uma issue!
