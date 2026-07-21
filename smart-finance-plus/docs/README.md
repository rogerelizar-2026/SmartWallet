# Documentação Smart Finance+

## Visão Geral

Smart Finance+ é uma versão modernizada e modular do Smart Finance, desenvolvida com arquitetura baseada em módulos ES6+, build otimizado com Vite e suite de testes automatizados.

## Arquitetura

### Estrutura de Módulos

```
src/
├── core/           # Núcleo da aplicação
│   ├── index.js        # Export principal
│   ├── SmartFinance.js # Classe principal
│   ├── EventManager.js # Gerenciador de eventos
│   └── StateManager.js # Gerenciador de estado
├── modules/        # Módulos funcionais
│   ├── render.js       # Renderização UI
│   ├── transactions.js # Gestão de transações
│   ├── accounts.js     # Gestão de contas
│   ├── cards.js        # Gestão de cartões (TODO)
│   └── investments.js  # Gestão de investimentos (TODO)
├── components/     # Componentes reutilizáveis
├── utils/          # Funções utilitárias
└── assets/         # Recursos estáticos
```

## Guia de Migração

### Do Smart Finance Original para Smart Finance+

1. **Importação de Dados**
   - Exporte seus dados do Smart Finance original (JSON)
   - Use a função de import no TransactionManager

2. **Diferenças Principais**
   - Nova estrutura modular
   - API baseada em classes
   - Eventos assíncronos
   - Build otimizado

3. **Compatibilidade**
   - Formato de dados mantido
   - localStorage compatível
   - API similar com melhorias

## API Reference

### SmartFinance Class

```javascript
const app = new SmartFinance({
  container: '#app',
  debug: true,
});

await app.init();
```

### TransactionManager

```javascript
// Adicionar transação
await app.transactions.add({
  type: 'expense', // ou 'income'
  amount: 100.50,
  description: 'Compra exemplo',
  category: 'Alimentação',
  date: new Date().toISOString(),
  accountId: 'acc_123',
});

// Listar transações
const all = app.transactions.getAll();
const filtered = app.transactions.getAll({ 
  type: 'expense',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
});

// Atualizar
await app.transactions.update(id, { amount: 150 });

// Deletar
await app.transactions.delete(id);
```

### AccountManager

```javascript
// Adicionar conta
await app.accounts.add({
  name: 'Conta Corrente',
  type: 'checking',
  initialBalance: 1000,
});

// Transferir entre contas
await app.accounts.transfer(fromId, toId, 500, 'Transferência');

// Saldo da conta
const balance = app.accounts.getBalance(accountId);
```

## Utilitários

Funções disponíveis em `@utils`:

- `formatCurrency(value, locale, currency)`
- `formatDate(date, locale)`
- `generateId(prefix)`
- `debounce(func, wait)`
- `throttle(func, limit)`
- `isValidEmail(email)`
- `isValidCPF(cpf)`
- `parseNumber(str)`
- `groupBy(array, key)`
- `sortBy(array, key, order)`

## Testes

### Rodar testes
```bash
npm test              # Todos os testes
npm run test:unit     # Unitários
npm run test:integration  # Integração
npm run test:coverage # Com cobertura
```

### Escrever testes

```javascript
import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/utils';

describe('Minha função', () => {
  it('deve fazer algo', () => {
    expect(formatCurrency(100)).toBe('R$ 100,00');
  });
});
```

## Build e Deploy

### Desenvolvimento
```bash
npm install
npm run dev
```

### Produção
```bash
npm run build
# Output em dist/
```

### Preview
```bash
npm run preview
```

## Performance

Otimizações incluídas:

- **Code Splitting**: Módulos carregados sob demanda
- **Tree Shaking**: Código não utilizado removido
- **Lazy Loading**: Carregamento diferido
- **Minificação**: CSS e JS minificados
- **Source Maps**: Debug facilitado

## Contribuição

1. Fork o projeto
2. Crie branch para feature (`git checkout -b feature/nova-feature`)
3. Commit mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push (`git push origin feature/nova-feature`)
5. Open Pull Request

## Changelog

### v2.0.0
- Refatoração completa para módulos ES6+
- Novo sistema de build com Vite
- Suite de testes com Vitest
- Nova arquitetura baseada em eventos
- Melhorias de performance

### v1.x.x
- Versão original Smart Finance

## Licença

MIT License - veja LICENSE para detalhes.

## Suporte

- Issues: https://github.com/smart-finance-plus/smart-finance-plus/issues
- Email: suporte@smartfinance.plus
