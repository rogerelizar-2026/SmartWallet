/**
 * Smart Finance - Constantes e Configurações Globais
 * Módulo de constantes, categorias, traduções e configurações
 */

export const PAYMENT_METHODS = [
    { id: 'pix', name: 'PIX', icon: '' },
    { id: 'debit', name: 'Cart.Débito', icon: '💳' },
    { id: 'auto', name: 'Débito Automático', icon: '🔄' },
    { id: 'scheduled', name: 'Agendamento', icon: '📅' },
    { id: 'transfer', name: 'Transferência', icon: '↔️' }
];

export const DEFAULT_CATEGORIES = [
    { id: 'casa', name: 'Casa', color: '#f59e0b', type: 'expense' },
    { id: 'despensa', name: 'Despensa', color: '#10b981', type: 'expense' },
    { id: 'transporte', name: 'Transporte', color: '#f97316', type: 'expense' },
    { id: 'saude', name: 'Saúde', color: '#ef4444', type: 'expense' },
    { id: 'educacao', name: 'Educação', color: '#3b82f6', type: 'expense' },
    { id: 'cuidados_pessoais', name: 'Cuidados Pessoais', color: '#ec4899', type: 'expense' },
    { id: 'servicos', name: 'Serviços', color: '#8b5cf6', type: 'expense' },
    { id: 'lazer', name: 'Lazer', color: '#f43f5e', type: 'expense' },
    { id: 'pets', name: 'Pets', color: '#a855f7', type: 'expense' },
    { id: 'inst_financeira', name: 'Instituição Financeira', color: '#6366f1', type: 'expense' },
    { id: 'docs_juridico', name: 'Documento/Jurídico', color: '#64748b', type: 'expense' },
    { id: 'emprestimo', name: 'Empréstimo', color: '#de076b', type: 'expense' },
    { id: 'doacao_generosidade', name: 'Doação/Generosidade', color: '#84cc16', type: 'expense' },
    { id: 'reserva_aplicacao', name: 'Reserva/Aplicação', color: '#06b6d4', type: 'expense' },
    { id: 'salario', name: 'Salário', color: '#22c55e', type: 'income' },
    { id: 'vale_alimentacao', name: 'Vale Alimentação', color: '#eab308', type: 'income' },
    { id: 'auxilios', name: 'Auxílios', color: '#14b8a6', type: 'income' },
    { id: 'beneficios', name: 'Benefícios', color: '#0ea5e9', type: 'income' },
    { id: 'restituicao', name: 'Restituição', color: '#d946ef', type: 'income' },
    { id: 'freelance', name: 'Freelance', color: '#f59e0b', type: 'income' },
    { id: 'rendimentos', name: 'Rendimentos', color: '#8b5cf6', type: 'income' },
    { id: 'resgate', name: 'Resgate (invest/reserva)', color: '#6366f1', type: 'income' }
];

export const CATEGORY_KEYWORDS = {
    casa: ['aluguel', 'condominio', 'condomínio', 'iptu', 'luz', 'energia', 'agua', 'água', 'gas', 'gás', 'internet', 'wifi', 'imobiliaria', 'imobiliária'],
    despensa: ['mercado', 'supermercado', 'feira', 'hortifruti', 'padaria', 'acougue', 'açougue'],
    transporte: ['uber', '99', 'combustivel', 'combustível', 'gasolina', 'alcool', 'álcool', 'estacionamento', 'pedagio', 'pedágio', 'onibus', 'ônibus', 'metro', 'metrô'],
    saude: ['farmacia', 'farmácia', 'remedio', 'remédio', 'medico', 'médico', 'consulta', 'plano de saude', 'plano de saúde', 'dentista', 'hospital'],
    educacao: ['curso', 'faculdade', 'escola', 'livro', 'mensalidade'],
    cuidados_pessoais: ['salao', 'salão', 'barbearia', 'academia', 'cabeleireiro', 'estetica', 'estética'],
    servicos: ['assinatura', 'netflix', 'spotify', 'streaming', 'celular', 'telefone'],
    lazer: ['cinema', 'viagem', 'show', 'bar', 'restaurante', 'ifood', 'lanche'],
    pets: ['pet', 'veterinario', 'veterinário', 'racao', 'ração', 'petshop'],
    inst_financeira: ['tarifa', 'taxa banco', 'anuidade', 'iof'],
    docs_juridico: ['cartorio', 'cartório', 'advogado', 'multa'],
    emprestimo: ['emprestimo', 'empréstimo', 'financiamento'],
    doacao_generosidade: ['doacao', 'doação', 'dizimo', 'dízimo', 'oferta'],
    reserva_aplicacao: ['investimento', 'aplicacao', 'aplicação', 'poupanca', 'poupança', 'cdb', 'tesouro'],
    salario: ['salario', 'salário', 'holerite'],
    vale_alimentacao: ['vale alimentacao', 'vale alimentação', 'alelo', 'sodexo'],
    auxilios: ['auxilio', 'auxílio', 'bolsa'],
    beneficios: ['beneficio', 'benefício', 'bonus', 'bônus'],
    restituicao: ['restituicao', 'restituição', 'imposto de renda'],
    freelance: ['freela', 'freelance'],
    rendimentos: ['rendimento', 'juros', 'dividendo'],
    resgate: ['resgate']
};

export const FINANCIAL_QUOTES = [
    { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
    { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
    { text: "O dinheiro não é bom nem mau; é como uma faca.", author: "Sabedoria Financeira" },
    { text: "Riqueza verdadeira não é ter muito, é depender de pouco.", author: "Sabedoria Financeira" },
    { text: "Riqueza é a capacidade de viver completamente a vida.", author: "Henry David Thoreau" },
    { text: "Não economize o que resta depois de gastar; gaste o que resta depois de poupar.", author: "Warren Buffett" },
    { text: "O melhor investimento que você pode fazer é em si mesmo.", author: "Warren Buffett" },
    { text: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", author: "Epicteto" },
    { text: "Cuidado com pequenos gastos; um pequeno vazamento afundará um grande navio.", author: "Benjamin Franklin" },
    { text: "Pague a si mesmo primeiro.", author: "George Samuel Clason" },
    { text: "Finanças não são sobre matemática, são sobre comportamento.", author: "Morgan Housel" },
    { text: "Investir em conhecimento paga os melhores juros.", author: "Benjamin Franklin" },
    { text: "A educação financeira é a base da liberdade financeira.", author: "Robert Kiyosaki" },
    { text: "A paciência é a virtude dos investidores bem-sucedidos.", author: "Peter Lynch" },
    { text: "Quem compra o que não precisa, rouba a si mesmo.", author: "Provérbio Popular" }
];

export const TRANSLATIONS = {
    'pt-BR': {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        transactionTypes: {
            income: 'Receita',
            expense: 'Despesa',
            transfer: 'Transferência'
        },
        accountTypes: {
            checking: 'Conta Corrente',
            investment: 'Investimento'
        },
        status: {
            paid: 'Pago',
            pending: 'Pendente'
        },
        recurrenceTypes: {
            recurrent: 'Recorrente',
            installment: 'Parcelado'
        },
        labels: {
            description: 'Descrição',
            category: 'Categoria',
            account: 'Conta',
            value: 'Valor',
            date: 'Data',
            paymentMethod: 'Forma de Pagamento',
            card: 'Cartão',
            installments: 'Parcelas',
            notes: 'Observações'
        }
    },
    'en-US': {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        transactionTypes: {
            income: 'Income',
            expense: 'Expense',
            transfer: 'Transfer'
        },
        accountTypes: {
            checking: 'Checking Account',
            investment: 'Investment'
        },
        status: {
            paid: 'Paid',
            pending: 'Pending'
        },
        recurrenceTypes: {
            recurrent: 'Recurrent',
            installment: 'Installment'
        },
        labels: {
            description: 'Description',
            category: 'Category',
            account: 'Account',
            value: 'Value',
            date: 'Date',
            paymentMethod: 'Payment Method',
            card: 'Card',
            installments: 'Installments',
            notes: 'Notes'
        }
    },
    'es-ES': {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        transactionTypes: {
            income: 'Ingreso',
            expense: 'Gasto',
            transfer: 'Transferencia'
        },
        accountTypes: {
            checking: 'Cuenta Corriente',
            investment: 'Inversión'
        },
        status: {
            paid: 'Pagado',
            pending: 'Pendiente'
        },
        recurrenceTypes: {
            recurrent: 'Recurrente',
            installment: 'Cuotas'
        },
        labels: {
            description: 'Descripción',
            category: 'Categoría',
            account: 'Cuenta',
            value: 'Valor',
            date: 'Fecha',
            paymentMethod: 'Método de Pago',
            card: 'Tarjeta',
            installments: 'Cuotas',
            notes: 'Notas'
        }
    }
};

export const CURRENCIES = {
    'BRL': { symbol: 'R$', locale: 'pt-BR', decimals: 2 },
    'USD': { symbol: '$', locale: 'en-US', decimals: 2 },
    'EUR': { symbol: '€', locale: 'de-DE', decimals: 2 },
    'GBP': { symbol: '£', locale: 'en-GB', decimals: 2 },
    'JPY': { symbol: '¥', locale: 'ja-JP', decimals: 0 },
    'ARS': { symbol: '$', locale: 'es-AR', decimals: 2 }
};

export const VERSION = '2.0.3';
export const APP_NAME = 'Smart Finance';
