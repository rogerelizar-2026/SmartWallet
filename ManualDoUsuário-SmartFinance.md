# 📘 Manual do Usuário - Smart Finance

Bem-vindo ao **Smart Finance**! Este manual foi criado para ajudar você a dominar todas as funcionalidades da nossa ferramenta de controle financeiro pessoal. 

O Smart Finance é **100% offline**, o que significa que nenhum dado sai do seu dispositivo. Sua privacidade é total, mas a responsabilidade pelo registro e backup dos dados é inteiramente sua.

---

## 🎯 1. Visão Geral do Painel (Dashboard)

Ao abrir o Smart Finance, você se depara com o painel principal. Ele resume sua saúde financeira do mês atual:

* **Saldo Unificado**: A soma de todo o dinheiro disponível em todas as suas contas correntes (descontando saldos negativos, se houver).
* **Receitas**: Todo o dinheiro que entrou no mês atual.
* **Despesas**: Tudo o que você gastou ou tem agendado para gastar no mês atual.
* **Acumulado C. Crédito**: A soma das faturas parciais de todos os seus cartões de crédito para o mês.
* **📈 Projeção Próx. Mês**: Uma estimativa de como começará o seu próximo mês com base nas despesas recorrentes e parcelas futuras.

---

## 🏦 2. Primeiros Passos: Contas e Cartões

Antes de registrar qualquer gasto, você precisa cadastrar de onde o dinheiro sai e entra.

### ➕ Cadastrando uma Conta
A conta representa onde seu dinheiro físico ou digital está guardado.
1. No menu inferior, clique em **Minhas Contas**.
2. Clique em **➕ Nova Conta**.
3. **Nome da Conta**: Escolha um nome claro (Ex: *Banco Itaú*, *Carteira Dinheiro*, *Nubank NuConta*).
4. **Tipo**: Escolha entre *Conta Corrente* (movimentação diária) ou *Investimento* (dinheiro guardado).
5. **Saldo Inicial**: Digite exatamente o valor que você tem hoje nessa conta.
6. Clique em **💾 Salvar**.

### ➕ Cadastrando um Cartão de Crédito
O cartão de crédito acumula gastos que só serão pagos em uma data futura.
1. No menu inferior, clique em **Meus Cartões**.
2. Clique em **➕ Novo Cartão**.
3. Defina o **Nome** (Ex: *Inter Black*), a **Bandeira**, e os **4 últimos dígitos** (opcional, para identificação).
4. **Fechamento**: O dia em que a fatura "calcula o total" e fecha (Ex: dia 20).
5. **Vencimento**: O dia em que você efetivamente paga a fatura (Ex: dia 27).
6. **Limite**: O limite total de crédito que o banco te deu.
7. Clique em **💾 Salvar**.

---

## 📝 3. Registrando Movimentações Diárias

No topo da página, você verá três botões coloridos. Eles são as suas ferramentas diárias:

### 💰 Registrar uma Receita (Entrada de Dinheiro)
Use para Salários, Pix recebidos, Vendas, Rendimentos, etc.
* **Exemplo Prático**: Você recebeu seu salário de R$ 3.000,00 no Banco Itaú.
* **Como preencher**:
  * Tipo: `💰 Receita`
  * Valor (R$): `3000,00`
  * Descrição: `Salário Mensal`
  * Categoria: `Salário` (ou crie uma)
  * 🏦 Conta: Selecione `Banco Itaú`.

### 💸 Registrar uma Despesa (Saída de Dinheiro)
Use para qualquer gasto, seja à vista, no débito ou no cartão de crédito.
* **Exemplo À Vista / Débito**: Compra de R$ 50,00 no mercado paga com o cartão de débito do Itaú.
  * Tipo: `💸 Despesa`
  * Valor (R$): `50,00`
  * Descrição: `Compras da Semana`
  * 💳 Efetuado com: Deixe em branco (pois não foi cartão de crédito).
  * 🏦 Conta: Selecione `Banco Itaú`.
* **Exemplo no Cartão de Crédito Parcelado**: Compra de uma geladeira de R$ 1.200,00 em 4 parcelas no cartão Inter.
  * Tipo: `💸 Despesa`
  * Valor (R$): Digite o **valor total** `1200,00` (o sistema dividirá sozinho).
  * 💳 Efetuado com: Selecione o seu cartão `Inter`.
  * 🏦 Conta: Deixe em branco (o dinheiro não sai da conta agora, só no vencimento da fatura).
  * Marque a caixinha `↻ Recorrente/Parcelada`.
  * Tipo de recorrência: Selecione `Parcelado`.
  * Parcelas: Digite `4`. O sistema lançará automaticamente R$ 300,00 neste mês e nos próximos 3 meses.

### 🔄 Registrar uma Transferência
Use quando movimentar dinheiro entre suas próprias contas. **Não altera seu saldo total.**
* **Exemplo Prático**: Você tirou R$ 200,00 do Banco Itaú e colocou na Poupança Caixa.
* **Como preencher**:
  * Origem: `Banco Itaú`
  * Destino: `Poupança Caixa`
  * Valor: `200,00`

---

## 🎯 4. Planejamento Financeiro Avançado

### 📊 Orçamento por Categoria
Permite estipular um teto de gastos mensais para não estourar o orçamento.
1. Acesse **Orçamento por Categoria** no menu inferior.
2. Defina um limite máximo para cada categoria (Ex: *Alimentação: R$ 600,00*, *Lazer: R$ 300,00*).
3. O gráfico de pizza e as barras de progresso mostrarão visualmente se você está perto de atingir o limite estipulado.

### 🎯 Meta de Reserva (Reserva de Emergência)
Ideal para planejar sua estabilidade financeira ou economizar para um objetivo.
1. Acesse **Meta de Reserva**.
2. No campo **Meta (R$)**, insira o valor total desejado (Ex: `6000,00`).
3. No campo **Aporte Mensal (R$)**, insira quanto consegue guardar por mês (Ex: `500,00`).
4. Clique em **Calcular & Salvar**. O sistema informará que você levará 12 meses para atingir o objetivo e passará a exibir sua evolução no painel.

---

## 📈 5. Investimentos e Aplicações

Para acompanhar a evolução do dinheiro que está rendendo:
1. Vá em **Aplicações** e clique em **➕ Nova**.
2. Preencha o nome (Ex: *Tesouro Selic 2029*), o Tipo (*Tesouro Direto*) e a taxa de rentabilidade.
3. Se desejar, marque a opção para vincular a uma conta de investimento criada anteriormente.
4. **Atualização**: Todo mês, utilize o botão **💰 Atualizar Valor** para corrigir o saldo com base nos rendimentos reais do seu extrato bancário.

---

## 🔒 6. Manutenção de Dados e Backups (Crítico!)

Como o Smart Finance não possui um banco de dados na nuvem, **se você limpar o histórico do seu navegador ou formatar o dispositivo, seus dados serão perdidos.** 

### 📥 Como fazer Backup (Semanal/Mensal)
1. Vá em **Configurações** (engrenagem no menu inferior).
2. Na seção *Backup Automático*, clique em **Fazer Agora**.
3. Um arquivo `.json` será baixado no seu dispositivo. Guarde este arquivo em um local seguro (Google Drive, WhatsApp, e-mail).
4. *Opcional*: Ative a opção "Proteger backup com senha" para criptografar seus dados antes de baixar.

### 📤 Como restaurar seus dados
Se você trocar de celular ou usar um navegador diferente:
1. Vá em **Configurações** > **Restaurar Backup**.
2. Selecione o arquivo `.json` que você havia salvado anteriormente.
3. Se usou senha, digite-a. Pronto, todo o seu histórico estará de volta.

### 🧹 Limpando os Dados
Se quiser apagar tudo e recomeçar do zero (ou após usar o modo demonstração):
1. Clique em **Limpar Dados** no menu inferior.
2. Digite a palavra **LIMPAR** em letras maiúsculas para confirmar o procedimento irreversível.

---

## 📂 7. Sugestão de Categorias para Organização

Para manter seus relatórios visuais e gráficos precisos, utilize uma estrutura padronizada de categorias. Veja abaixo uma tabela com sugestões práticas:

| Categoria | Tipo de Gasto | Exemplos de Lançamento |
| :--- | :--- | :--- |
| **Habitação** | Fixo / Essencial | Aluguel, condomínio, luz, água, internet |
| **Alimentação** | Variável / Essencial | Supermercado, feira, açougue |
| **Transporte** | Variável / Essencial | Combustível, Uber, transporte público, manutenção do carro |
| **Saúde** | Variável / Essencial | Farmácia, consultas médicas, plano de saúde |
| **Lazer / Estilo de Vida**| Variável / Não Essencial | Restaurantes, cinema, delivery, viagens, hobbies |
| **Assinaturas** | Fixo / Não Essencial | Netflix, Spotify, academia, softwares |
| **Educação** | Fixo / Essencial | Mensalidade da faculdade, cursos, livros |
| **Investimentos** | Reserva / Futuro | Aportes em ações, fundos, poupança |

---

## ❓ 8. Perguntas Frequentes (FAQ)

### O Smart Finance cobra alguma taxa ou mensalidade?
**Não.** O Smart Finance é uma ferramenta de uso 100% gratuito para fins pessoais, idealizada pelo desenvolvedor RogerElizar. Se o projeto te ajudar, você pode usar a opção **Apoie o Projeto** no menu para pagar um café por Pix.

### Posso acessar meus dados sincronizados no celular e no computador?
**Não automaticamente.** Como a ferramenta funciona de forma 100% offline e local, os dados digitados no celular ficam salvos apenas no celular. Para ver os mesmos dados no computador, você deve exportar o backup (`.json`) no celular e restaurá-lo no computador.

### Esqueci a senha que coloquei no meu backup. Como recuperar?
**Infelizmente não é possível.** A criptografia utilizada (AES-256) é de alta segurança. Sem a senha exata, os dados do arquivo não podem ser descriptografados ou restaurados. Guarde sempre sua senha em um gerenciador de senhas seguro.

### O aplicativo avisa se eu esquecer de pagar uma conta?
**Sim, desde que a página esteja aberta ou com notificações ativas.** Na seção de configurações, você pode ativar o alerta de **Contas a Vencer**. O sistema exibirá um aviso no painel para pendências que vencem em até 3 dias.

### Como faço para excluir uma transação errada?
No painel principal, role até o **Histórico do Mês**. Clique sobre a transação que deseja corrigir para abrir a janela **Editar Transação** e, em seguida, clique no botão vermelho **🗑 Excluir**.

---

## ⚡ 9. Atalhos Rápidos e Dicas de Produtividade

Para que você não perca tempo abrindo menus complexos toda vez que for lançar um gasto, siga estas dicas práticas de uso diário:

### 📱 1. Crie um "Aplicativo" no seu Celular (PWA)
Você não precisa abrir o navegador e digitar o link do Smart Finance toda vez.
* **No Android (Chrome)**: Abra o site, clique nos três pontinhos superiores e selecione **Adicionar à tela inicial**.
* **No iPhone (Safari)**: Abra o site, clique no botão de **Compartilhar** (quadrado com uma seta para cima) e selecione **Tela de Início**.
* *Resultado*: Um ícone será gerado na tela do seu celular, permitindo abrir o Smart Finance como se fosse um aplicativo instalado, com inicialização imediata.

### 💻 2. Crie uma Tecla de Atalho no Computador (Windows)
Se você usa o Windows para gerenciar suas contas, pode configurar uma combinação de teclas para abrir o sistema instantaneamente.
1. Clique com o botão direito na Área de Trabalho > **Novo** > **Atalho**.
2. Cole a URL do Smart Finance no campo de localização: `https://github.io` e clique em Avançar.
3. Defina o nome como `Smart Finance` e clique em Concluir.
4. Clique com o botão direito sobre o atalho criado > **Propriedades**.
5. No campo **Tecla de atalho**, pressione a combinação que deseja usar (Exemplo: `Ctrl` + `Alt` + `F`).
6. Dê OK. Pronto! Sempre que você pressionar essa combinação, o painel financeiro abrirá em seu navegador de forma imediata.

### 📅 3. Lançamento Inteligente com o Botão "Hoje"
Sempre que estiver registrando uma Transação ou consultando seus Cartões de Crédito, utilize o botão rápido **📅 Hoje** localizado no painel. Ele sincroniza instantaneamente o calendário do sistema com o fuso horário atual do seu aparelho, evitando o preenchimento manual de datas em transações que ocorreram no mesmo dia.

---

## 📊 10. Como Importar Dados via Planilha CSV

Se você está vindo de outro aplicativo ou prefere lançar seus gastos em massa usando o Excel ou Google Sheets, você pode utilizar a função **Importar CSV** seguindo estes passos:

1. Crie uma planilha com exatamente 7 colunas nesta ordem: `Data`, `Descricao`, `Categoria`, `Conta`, `Pagamento`, `Status`, `Valor`.
2. Lembre-se de colocar valores **positivos para receitas** e **negativos para despesas** (Ex: `-25.50`).
3. Exporte ou salve o arquivo no formato **CSV (Separado por vírgulas)**.
4. No Smart Finance, vá no menu inferior e clique em **Importar CSV**.
5. Se quiser apagar o histórico atual do mês para colocar o da planilha, marque a caixinha *Substituir transações do mês*. Caso contrário, os dados serão apenas somados.
6. Clique em **Clique para selecionar**, escolha seu arquivo e clique em **📥 Importar**.

---

## 🛠️ Apêndice: Guia Completo de Configurações

Acesse o menu de **Configurações** (ícone de engrenagem) no menu inferior para personalizar o comportamento do Smart Finance e gerenciar a segurança do sistema.

### 🔒 1. Segurança Criptografada do Backup
Como o Smart Finance opera de forma 100% offline, os dados ficam armazenados no banco de dados local do seu navegador (IndexedDB). Para garantir que suas informações financeiras confidenciais fiquem protegidas ao exportar um arquivo de segurança, você pode utilizar a criptografia:

* **Como Funciona**: O sistema utiliza o algoritmo **AES-256** (padrão militar de segurança). Ao ativar a opção **Proteger backup com senha**, o arquivo `.json` gerado será transformado em um código ilegível para qualquer pessoa que não possua a chave.
* **Senha de Proteção**: Digite uma senha forte e memorize-a. Se você perder essa senha, **não haverá como recuperar ou ler os dados do backup**, pois o desenvolvedor não possui acesso aos seus arquivos.
* **Restaurar com Senha**: Ao clicar em *Restaurar Backup* nas configurações de um novo dispositivo, o sistema detectará a criptografia e solicitará a senha definida para descriptografar e restaurar o seu histórico.

### 💾 2. Backup Automático
* **Backup Automático Semanal**: Quando ativado, o Smart Finance monitora o volume de novas transações guardadas. Caso haja muitas movimentações recentes sem salvamento externo, o sistema exibirá um lembrete visual sugerindo que você clique em **Fazer Agora** para atualizar seu arquivo de segurança `.json`.

### 💰 3. Saldo Negativo
* **Alertar quando saldo ficar negativo**: Mostra um aviso visual em vermelho e uma notificação no topo da tela caso o saldo de alguma conta corrente fique abaixo de zero.
* **Bloquear transações que deixam saldo negativo**: Uma trava de segurança estrita. Se ativada, o sistema impedirá o salvamento de qualquer despesa caso o valor resulte em um saldo menor que zero na conta selecionada.

### 🔔 4. Notificações de Contas a Vencer
* **Alertas de Vencimento**: Verifica localmente as transações que possuem o status `Pendente`. Se a data de vencimento configurada estiver dentro do prazo de até 3 dias, o sistema emitirá alertas visuais no painel para que você não esqueça de efetuar o pagamento.

### 📄 5. Paginação de Transações
* **Itens por Página**: Define a quantidade de linhas exibidas por vez na tabela de *Histórico do Mês*. Você pode escolher entre **10, 20, 50, 100 itens** ou **Todos** (exibição contínua sem paginação). Configurar valores menores (como 10 ou 20) melhora o desempenho de carregamento em celulares mais antigos.
