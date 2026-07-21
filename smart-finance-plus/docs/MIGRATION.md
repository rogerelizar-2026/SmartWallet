# Guia de Migração - Smart Finance para Smart Finance+

## Introdução

Este guia ajuda na migração do Smart Finance original (v1.x) para o Smart Finance+ (v2.0).

## Principais Mudanças

### 1. Arquitetura Modular

**Antes (v1.x):**
```javascript
// Tudo em um único arquivo app.js
const app = new SmartFinance();
```

**Depois (v2.0):**
```javascript
// Módulos ES6+ separados
import { SmartFinance } from '@core';
import { formatCurrency } from '@utils';
```

### 2. Sistema de Build

**Antes:** Script shell manual (`optimize.sh`)
**Depois:** Vite com build otimizado automático

### 3. Testes

**Antes:** Sem testes automatizados
**Depois:** Vitest com testes unitários e de integração

### 4. Estrutura de Pastas

| v1.x | v2.0 |
|------|------|
| `js/app.js` | `src/core/SmartFinance.js` |
| `js/modules/` | `src/modules/` |
| - | `src/components/` |
| - | `tests/` |

## Passo a Passo da Migração

### Passo 1: Backup dos Dados

Antes de tudo, exporte seus dados do Smart Finance original:

```javascript
// No console do navegador com v1.x
const data = localStorage.getItem('smartfinance_state');
console.log(data);
// Salve este JSON em um arquivo seguro
```

### Passo 2: Instalar Dependências

```bash
cd smart-finance-plus
npm install
```

### Passo 3: Importar Dados

Use o script de importação:

```javascript
import { TransactionManager } from '@modules/transactions';

const oldData = JSON.parse(savedBackup);
await transactionManager.import(oldData.transactions);
```

### Passo 4: Atualizar Código Personalizado

Se você tem código personalizado:

**Antes:**
```javascript
app.addTransaction({...});
```

**Depois:**
```javascript
await app.transactions.add({...});
```

### Passo 5: Testar

```bash
npm run dev
# Acesse http://localhost:3000
# Verifique se todos os dados foram migrados
```

## Compatibilidade

### Dados
- ✅ Formato JSON compatível
- ✅ localStorage mesma estrutura
- ✅ IDs mantidos

### API
- ⚠️ Alguns métodos renomeados
- ⚠️ Novos métodos assíncronos (async/await)
- ✅ Mesma lógica de negócio

### UI
- ✅ Mesmo layout visual
- ✅ Mesmos recursos
- ✨ Novos componentes modulares

## Problemas Comuns

### 1. Dados não aparecem

**Solução:** Verifique se o backup foi importado corretamente:
```javascript
const state = app.getState();
console.log(state.transactions.length);
```

### 2. Erro de módulo não encontrado

**Solução:** Verifique imports:
```javascript
// Use aliases configurados no vite.config.js
import { X } from '@core';
import { Y } from '@modules';
```

### 3. Build falha

**Solução:** Limpe cache e reinstale:
```bash
rm -rf node_modules dist
npm install
npm run build
```

## Rollback

Se precisar voltar para v1.x:

1. Exporte dados do v2.0
2. Faça checkout da branch v1.x
3. Importe dados no formato original

## Suporte

Encontrou problemas? Abra uma issue:
https://github.com/smart-finance-plus/smart-finance-plus/issues

## Recursos Adicionais

- [Documentação Completa](./README.md)
- [API Reference](./API.md)
- [Exemplos de Código](./examples/)
