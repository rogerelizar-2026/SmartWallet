(function() {
    'use strict';

    // ===== CONSTANTES =====
    const PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'scheduled', name: 'Agendamento', icon: '📅' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

    const DEFAULT_CATEGORIES = [
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

    const FINANCIAL_QUOTES = [
        { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
        { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
        { text: "O dinheiro não é bom nem mau; é como uma faca. Pode cortar o pão da família ou ferir alguém. Tudo depende da mão que o segura.", author: "Sabedoria Financeira" },
        { text: "Dinheiro é energia. Se você o retém com medo, ele estagna. Se o movimenta com propósito, ele se multiplica.", author: "Sabedoria Financeira" },
        { text: "Não pergunte quanto custa, pergunte quanto vale. Preço é o que você paga; valor é o que você recebe.", author: "Sabedoria Financeira" },
        { text: "O dinheiro deve trabalhar para você, não você para o dinheiro. Liberdade financeira é ter opções, não ostentação.", author: "Sabedoria Financeira" },
        { text: "Riqueza verdadeira não é ter muito, é depender de pouco.", author: "Sabedoria Financeira" },
        { text: "Riqueza é a capacidade de viver completamente a vida.", author: "Henry David Thoreau" },
        { text: "Um orçamento está dizendo a seu dinheiro para onde ir, em vez de se perguntar para onde ele foi.", author: "Dave Ramsey" },
        { text: "Amar dinheiro é a raiz de todos os problemas.", author: "1 Timóteo 6:10" },
        { text: "É melhor ter pouco e temer a Deus do que ter um tesouro enorme e viver preocupado.", author: "Provérbios 15:16" },
        { text: "Quem deve fica escravo de quem empresta.", author: "Provérbios 22:7" },
        { text: "O dinheiro não muda pessoas; apenas revela quem elas realmente são.", author: "Provérbio Financeiro Moderno" },
        { text: "Quando Deus abençoa com prosperidade, isso não vem junto com dor de cabeça.", author: "Provérbios 10:22" },
        { text: "É melhor trabalhar com dedicação do que ser preguiçoso e só ficar sonhando.", author: "Provérbios 13:4" },
        { text: "Não economize o que resta depois de gastar; gaste o que resta depois de poupar.", author: "Warren Buffett" },
        { text: "Se você não encontrar uma maneira de ganhar dinheiro enquanto dorme, você trabalhará até morrer.", author: "Warren Buffett" },
        { text: "O melhor investimento que você pode fazer é em si mesmo.", author: "Warren Buffett" },
        { text: "Dinheiro é um péssimo mestre, mas um excelente servo.", author: "P.T. Barnum" },
        { text: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", author: "Epicteto" },
        { text: "Cuidado com pequenos gastos; um pequeno vazamento afundará um grande navio.", author: "Benjamin Franklin" },
        { text: "Dê um décimo para que você se torne rico.", author: "Talmude" },
        { text: "Com dinheiro você não pode fazer tudo; sem dinheiro você não pode fazer nada!", author: "Provérbio Judaico" },
        { text: "Quem compra o que não precisa, rouba a si mesmo.", author: "Provérbio Popular" },
        { text: "A independência financeira não é sobre ficar rico, é sobre ter opções.", author: "Chris Reining" },
        { text: "Pague a si mesmo primeiro.", author: "George Samuel Clason" },
        { text: "O mercado de ações é um mecanismo para transferir dinheiro do impaciente para o paciente.", author: "Warren Buffett" },
        { text: "A melhor hora para plantar uma árvore foi há 20 anos. A segunda melhor hora é agora.", author: "Provérbio Chinês" },
        { text: "Finanças não são sobre matemática, são sobre comportamento.", author: "Morgan Housel" },
        { text: "Pessoas ricas acreditam que ganham dinheiro com ideias.", author: "Robert Kiyosaki" },
        { text: "Gastar dinheiro para impressionar pessoas é a maneira mais rápida de ficar pobre.", author: "Morgan Housel" },
        { text: "Economizar é a melhor estratégia de investimento.", author: "Nathaniel Hale" },
        { text: "Cada real que você economiza é um empregado que trabalha para você.", author: "T. Harv Eker" },
        { text: "A liberdade financeira é mais sobre controle do que sobre dinheiro.", author: "Ramit Sethi" },
        { text: "O maior inimigo da riqueza é a expectativa de ficar rico rápido.", author: "Morgan Housel" },
        { text: "Ricos adquirem ativos. Pobres e classe média adquirem passivos que acham serem ativos.", author: "Robert Kiyosaki" },
        { text: "A paciência é a virtude dos investidores bem-sucedidos.", author: "Peter Lynch" },
        { text: "Saber gastar é tão importante quanto saber ganhar.", author: "Provérbio Popular" },
        { text: "Investir em conhecimento paga os melhores juros.", author: "Benjamin Franklin" },
        { text: "Não espere; o tempo nunca será 'o certo'. Comece de onde você está.", author: "Napoleon Hill" },
        { text: "A educação financeira é a base da liberdade financeira.", author: "Robert Kiyosaki" },
        { text: "Antes de gastar, aprenda a ganhar. Antes de ganhar, aprenda a poupar.", author: "Provérbio" }
    ];

    const manualHTML = '<div class="manual-cover">' +
        '<h1>📘 Manual do Usuário</h1>' +
        '<h2>Smart Wallet Brasil</h2>' +
        '<p>Controle Financeiro Pessoal Inteligente</p>' +
        '<p class="version">Versão 4.2.1 - 2026</p>' +
        '<p class="author">Idealizado por RogerElizar™</p>' +
        '</div>' +
        '<div class="manual-quote">' +
        '<p>"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."</p>' +
        '<div class="quote-author">— Tiago 1:17</div>' +
        '</div>' +
        '<p>Agradeço a Deus por toda sabedoria, saúde e recursos que me permitiram desenvolver este projeto.</p>' +
        '<div class="dedication">' +
        '<h3>💝 Aos meus filhos</h3>' +
        '<div class="manual-quote">' +
        '<p>Dedico este trabalho a vocês, meus amados filhos. Que este seja um legado de ensino, organização e sabedoria financeira.</p>' +
        '<div class="quote-author">— Com todo amor: Rogério</div>' +
        '</div>' +
        '</div>' +
        '<h2>🎯 Bem-vindo ao Smart Wallet Brasil!</h2>' +
        '<p>Parabéns por dar o primeiro passo rumo à sua <strong>liberdade financeira</strong>!</p>' +
        '<h2>📱 Instalação como WebApp</h2>' +
        '<h3>💻 No Computador (Chrome, Edge, Brave)</h3>' +
        '<ol><li>Acesse o site pelo navegador</li><li>Procure o ícone de instalação na barra de endereços</li><li>Confirme a instalação</li></ol>' +
        '<h3>📱 No Celular Android (Chrome)</h3>' +
        '<ol><li>Abra o site no Chrome</li><li>Toque nos três pontos (⋮)</li><li>Selecione "Instalar aplicativo"</li></ol>' +
        '<h3>🍎 No iPhone (Safari)</h3>' +
        '<ol><li>Abra o site no Safari</li><li>Toque no botão Compartilhar</li><li>Toque em "Adicionar à Tela de Início"</li></ol>' +
        '<div class="manual-tip"><strong>🔒 Privacidade Total:</strong> Todos os dados ficam apenas no seu dispositivo.</div>' +
        '<h2>💰 Funcionalidades Principais</h2>' +
        '<h3>📊 Dashboard Financeiro</h3>' +
        '<p><strong>Saldo Unificado:</strong> Soma das contas correntes + investimentos. Cada lançamento de receita/despesa atualiza automaticamente o saldo da conta selecionada.</p>' +
        '<div class="manual-tip"><strong>🆕 Novidade v4.2.1:</strong> Os lançamentos agora debita/credita corretamente nas contas. O saldo unificado reflete em tempo real.</div>' +
        '<h3>⚡ Ações Rápidas (Botão +)</h3>' +
        '<ul><li><strong>💸 Despesa:</strong> Modal já com tipo "Despesa"</li><li><strong>💰 Receita:</strong> Modal já com tipo "Receita"</li><li><strong>🔄 Transferência:</strong> Move saldo entre contas</li></ul>' +
        '<h3>💳 Gestão de Cartões de Crédito</h3>' +
        '<ul><li>Navegue entre faturas usando as setas ← →</li><li>Período: fechamento anterior até fechamento atual</li><li>Vencimento só avança quando a fatura fecha</li></ul>' +
        '<h3>📊 Orçamento por Categoria</h3>' +
        '<p>Comparativo com a média dos últimos 3 meses.</p>' +
        '<h3>📱 Gestos no Celular (Swipe)</h3>' +
        '<ul><li><strong>Direita:</strong> Marca como paga</li><li><strong>Esquerda:</strong> Exclui</li></ul>' +
        '<h2>🎯 A Regra 50-30-20</h2>' +
        '<ul><li><strong>50%</strong> necessidades</li><li><strong>30%</strong> desejos</li><li><strong>20%</strong> objetivos financeiros</li></ul>' +
        '<h2>💾 Backup & Segurança</h2>' +
        '<ul><li><strong>Backup Regular:</strong> Menu → Backup JSON</li><li><strong>Modo Privacidade:</strong> 👁️ oculta valores</li></ul>' +
        '<h2>🌐 Sistema Bilíngue</h2>' +
        '<p>Alterne entre Português e Inglês pelo menu. Ao usar inglês, pode alternar entre R$ e $.</p>' +
        '<h2>💾 Salvamento Inteligente</h2>' +
        '<p>Exportações e backups abrem o diálogo "Salvar como" com nome pré-preenchido (ex: SmartWallet-202607041530_extrato_07-2026.csv).</p>' +
        '<h2>📋 Histórico Ordenável</h2>' +
        '<p>Clique em qualquer cabeçalho de coluna (Data, Descrição, Categoria, etc.) para ordenar. Receitas e despesas aparecem agrupadas separadamente.</p>' +
        '<div class="manual-blessing"><h3>🙏 É Isso! 💰</h3>' +
        '<div class="manual-quote"><p>Que Deus abençoe sua jornada financeira.</p><div class="quote-author">Com amor e orações,<br>RogerElizar®</div></div></div>';

    // ===== TRADUÇÕES =====
    const TRANSLATIONS = {
        'pt-BR': {
            appTitle: 'Smart Wallet',
            appSubtitle: 'Suas finanças sob seu domínio!',
            unifiedBalance: 'Saldo Unificado',
            income: 'Receitas',
            expenses: 'Despesas',
            creditCardTotal: 'Acumulado C.Crédito',
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            languageChanged: 'Idioma alterado!',
            currencyChanged: 'Moeda alterada!',
            noTransactions: 'Nenhuma transação encontrada',
            backupExported: 'Exportado com sucesso!',
            allowPopups: 'Por favor, permita popups.',
            monthlyStatement: 'Extrato do Mês',
            period: 'Período',
            date: 'Data',
            description: 'Descrição',
            category: 'Categoria',
            type: 'Tipo',
            payment: 'Pagamento',
            status: 'Status',
            value: 'Valor',
            account: 'Conta',
            completed: 'Concluído',
            pending: 'Pendente',
            income: 'Receita',
            expense: 'Despesa',
            incomeGroup: '💰 Receitas',
            expenseGroup: '💸 Despesas',
            allCards: 'Todos Cartões',
            invoice: 'Fatura',
            invoicePeriod: 'Período da Fatura',
            dueDate: 'Vencimento',
            invoiceTotal: 'Total da Fatura',
            printPDF: 'Imprimir / PDF'
        },
        'en-US': {
            appTitle: 'Smart Wallet',
            appSubtitle: 'Your finances under your control!',
            unifiedBalance: 'Unified Balance',
            income: 'Income',
            expenses: 'Expenses',
            creditCardTotal: 'Credit Card Total',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            languageChanged: 'Language changed!',
            currencyChanged: 'Currency changed!',
            noTransactions: 'No transactions found',
            backupExported: 'Exported successfully!',
            allowPopups: 'Please allow popups.',
            monthlyStatement: 'Monthly Statement',
            period: 'Period',
            date: 'Date',
            description: 'Description',
            category: 'Category',
            type: 'Type',
            payment: 'Payment',
            status: 'Status',
            value: 'Value',
            account: 'Account',
            completed: 'Completed',
            pending: 'Pending',
            income: 'Income',
            expense: 'Expense',
            incomeGroup: '💰 Income',
            expenseGroup: '💸 Expenses',
            allCards: 'All Cards',
            invoice: 'Invoice',
            invoicePeriod: 'Invoice Period',
            dueDate: 'Due Date',
            invoiceTotal: 'Invoice Total',
            printPDF: 'Print / PDF'
        }
    };

    const CURRENCIES = {
        'BRL': { symbol: 'R$', code: 'BRL', locale: 'pt-BR', name: 'Real Brasileiro' },
        'USD': { symbol: '$', code: 'USD', locale: 'en-US', name: 'US Dollar' }
    };

    // ===== HELPER: SALVAR ARQUIVO =====
    async function saveFileWithPicker(blob, suggestedName, mimeType) {
        if (window.showSaveFilePicker) {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: suggestedName,
                    types: [{
                        description: 'Arquivo ' + suggestedName.split('.').pop().toUpperCase(),
                        accept: { [mimeType]: ['.csv', '.json'] }
                    }],
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                return 'saved';
            } catch (err) {
                if (err.name === 'AbortError') return 'cancelled';
                console.warn('File System Access API falhou, usando fallback:', err);
            }
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = suggestedName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        return 'downloaded';
    }

    // ===== CLASSE PRINCIPAL =====
    class SmartWallet {
        constructor() {
            this.currentMonth = new Date();
            this.currentMonth.setDate(1);
            this.currentMonth.setHours(0, 0, 0, 0);
            this.transactions = [];
            this.categories = [];
            this.accounts = [];
            this.cards = [];
            this.investments = [];
            this.cardModalMonth = new Date();
            this.cardModalMonth.setDate(1);
            this.currentTransactionType = 'expense';
            this.currentEditType = 'expense';
            this.currentEditId = null;
            this.darkMode = true;
            this.privacyOn = false;
            this.charts = {};
            this.searchTimeout = null;
            this.toastT = null;
            this._cache = {};
            this.currentInvoiceCardId = null;
            this.currentInvoiceOffset = 0;
            this.sortColumn = 'date';
            this.sortDirection = 'desc';
            this.loadData();
            this.init();
        }

        // ===== CARREGAMENTO E SALVAMENTO =====
        loadData() {
            try {
                const t = localStorage.getItem('smartwallet_transactions');
                if (t) this.transactions = JSON.parse(t);
                const c = localStorage.getItem('smartwallet_categories');
                if (c) this.categories = JSON.parse(c);
                else this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
                const a = localStorage.getItem('smartwallet_accounts');
                if (a) this.accounts = JSON.parse(a);
                const cd = localStorage.getItem('smartwallet_cards');
                if (cd) this.cards = JSON.parse(cd);
                const inv = localStorage.getItem('smartwallet_investments');
                if (inv) this.investments = JSON.parse(inv);
                const dm = localStorage.getItem('smartwallet_dark');
                if (dm !== null) this.darkMode = dm === 'true';
                const pv = localStorage.getItem('smartwallet_privacy');
                if (pv !== null) this.privacyOn = pv === 'true';
            } catch (e) { console.error('[SmartWallet] Erro ao carregar:', e); }
        }
        saveTransactions() { try { localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions)); } catch(e){} }
        saveCategories() { try { localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories)); } catch(e){} }
        saveAccounts() { try { localStorage.setItem('smartwallet_accounts', JSON.stringify(this.accounts)); } catch(e){} }
        saveCards() { try { localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards)); } catch(e){} }
        saveInvestments() { try { localStorage.setItem('smartwallet_investments', JSON.stringify(this.investments)); } catch(e){} }
        clearCache() { this._cache = {}; }

        // ===== IDIOMA E MOEDA =====
        t(key, params = {}) {
            const lang = this.getLanguage();
            let text = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['pt-BR'][key] || key;
            if (typeof text !== 'string') return key;
            Object.keys(params).forEach(param => {
                text = text.replace(new RegExp('\\{' + param + '\\}', 'g'), params[param]);
            });
            return text;
        }
        getLanguage() { return localStorage.getItem('smartwallet_language') || 'pt-BR'; }
        setLanguage(lang) {
            localStorage.setItem('smartwallet_language', lang);
            document.documentElement.lang = lang;
            this.applyLanguage();
            this.showToast(this.t('languageChanged'));
        }
        applyLanguage() {
            const titleEl = document.querySelector('.header-title');
            if (titleEl) titleEl.textContent = this.t('appTitle');
            const subtitleEl = document.querySelector('.header-subtitle');
            if (subtitleEl) subtitleEl.textContent = this.t('appSubtitle');
            this.updateMonthDisplay();
            this.populateCardFilter();
            this.clearCache();
            this.render();
            this.updateCharts();
        }
        getCurrency() { return localStorage.getItem('smartwallet_currency') || 'BRL'; }
        setCurrency(currency) {
            if (!CURRENCIES[currency]) return;
            localStorage.setItem('smartwallet_currency', currency);
            this.applyCurrency();
            this.showToast(this.t('currencyChanged'));
        }
        applyCurrency() {
            this.clearCache();
            this.render();
            this.updateCharts();
            this.updateCurrencySelectorVisibility();
        }
        updateCurrencySelectorVisibility() {
            const lang = this.getLanguage();
            const currencyItem = document.getElementById('currencyMenuItem');
            if (currencyItem) currencyItem.style.display = lang === 'en-US' ? 'flex' : 'none';
        }
        formatCurrency(value) {
            const currency = this.getCurrency();
            const data = CURRENCIES[currency];
            return new Intl.NumberFormat(data.locale, {
                style: 'currency',
                currency: data.code,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value || 0);
        }

        // ===== INICIALIZAÇÃO =====
        init() {
            console.log('✅ Smart Wallet v4.2.1 inicializado');
            this.applyTheme();
            this.applyPrivacy();
            this.setupEventListeners();
            this.setupFocusTrap();
            this.setDefaultDate();
            this.updateMonthDisplay();
            this.populateCategorySelects();
            this.populatePaymentMethodSelects();
            this.populateAccountSelects();
            this.populateCardFilter();
            this.restoreFilters();
            this.render();
            this.initCharts();
            this.updateAlertBadge();
            this.applyLanguage();
            this.applyCurrency();
            this.checkVersionUpdate();
            if (window.innerWidth <= 640) this.initSwipeGestures();
        }
        setupEventListeners() {
            const self = this;
            const search = document.getElementById('searchFilter');
            if (search) {
                search.addEventListener('input', () => {
                    clearTimeout(self.searchTimeout);
                    self.searchTimeout = setTimeout(() => { self.clearCache(); self.render(); self.clearDashboardHighlight(); }, 300);
                });
            }
            ['typeFilter', 'categoryFilter', 'statusFilter', 'accountFilter', 'cardFilter'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('change', () => {
                    if (id === 'typeFilter') self.filterCategoriesByType('categoryFilter', el.value);
                    self.clearCache();
                    self.render();
                    self.saveFilters();
                    self.clearDashboardHighlight();
                });
            });
            const recurringCheckbox = document.getElementById('recurring');
            if (recurringCheckbox) {
                recurringCheckbox.addEventListener('change', function() {
                    const options = document.getElementById('recurringOptions');
                    if (options) options.style.display = this.checked ? 'block' : 'none';
                });
            }
            const editRecurringCheckbox = document.getElementById('editRecurring');
            if (editRecurringCheckbox) {
                editRecurringCheckbox.addEventListener('change', function() {
                    const options = document.getElementById('editRecurringOptions');
                    if (options) options.style.display = this.checked ? 'block' : 'none';
                });
            }
        }
        setupFocusTrap() {
            // Impede scroll do body quando modal aberto
            document.addEventListener('keydown', (e) => {
                const activeModal = document.querySelector('.modal.active');
                if (!activeModal) return;
                
                // ESC fecha o modal ativo
                if (e.key === 'Escape') {
                    e.preventDefault();
                    const closeBtn = activeModal.querySelector('.modal-close');
                    if (closeBtn) closeBtn.click();
                    return;
                }
                
                // TAB trap dentro do modal
                if (e.key === 'Tab') {
                    const focusable = activeModal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
                    if (focusable.length === 0) return;
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                }
            });
        }
        saveFilters() {
            const filters = {
                type: document.getElementById('typeFilter')?.value || '',
                category: document.getElementById('categoryFilter')?.value || '',
                status: document.getElementById('statusFilter')?.value || '',
                account: document.getElementById('accountFilter')?.value || '',
                card: document.getElementById('cardFilter')?.value || '',
                search: document.getElementById('searchFilter')?.value || ''
            };
            try { localStorage.setItem('smartwallet_filters', JSON.stringify(filters)); } catch(e){}
        }
        restoreFilters() {
            try {
                const filters = JSON.parse(localStorage.getItem('smartwallet_filters') || '{}');
                if (filters.type) document.getElementById('typeFilter').value = filters.type;
                if (filters.status) document.getElementById('statusFilter').value = filters.status;
                if (filters.account) document.getElementById('accountFilter').value = filters.account;
                if (filters.card) document.getElementById('cardFilter').value = filters.card;
                if (filters.search) document.getElementById('searchFilter').value = filters.search;
                setTimeout(() => { if (filters.category) document.getElementById('categoryFilter').value = filters.category; }, 100);
            } catch(e){}
        }
        clearDashboardHighlight() { document.querySelectorAll('.card.clickable').forEach(c => c.classList.remove('active-filter')); }
        setDefaultDate() { const el = document.getElementById('date'); if (el) el.value = new Date().toISOString().split('T')[0]; }
        changeMonth(delta) { this.currentMonth.setMonth(this.currentMonth.getMonth() + delta); this.updateMonthDisplay(); this.clearCache(); this.clearDashboardHighlight(); this.render(); this.updateCharts(); }
        updateMonthDisplay() {
    	const lang = this.getLanguage();
	    const months = (TRANSLATIONS[lang] && TRANSLATIONS[lang].months) || TRANSLATIONS['pt-BR'].months;
    	const el = document.getElementById('currentMonth');
    		if (el && months) {
        	el.textContent = months[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
   			 }
		}
        formatMonthYear(date) { if (!date) date = this.currentMonth; return String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear(); }
        generateTimestamp() {
            const now = new Date();
            return 'SmartWallet-' + now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') +
                String(now.getDate()).padStart(2, '0') + String(now.getHours()).padStart(2, '0') +
                String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');
        }

        // ===== TRANSAÇÕES DO MÊS =====
        getMonthTransactions(date) {
            if (!date) date = this.currentMonth;
            if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
                date = new Date(); date.setDate(1); date.setHours(0, 0, 0, 0);
                this.currentMonth = date;
            }
            const key = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
            if (!this._cache.monthTransactions) this._cache.monthTransactions = {};
            if (this._cache.monthTransactions[key]) return this._cache.monthTransactions[key];
            const m = date.getMonth(), y = date.getFullYear();
            const result = this.transactions.filter(t => {
                const d = new Date(t.date + 'T12:00:00');
                return d.getMonth() === m && d.getFullYear() === y;
            });
            this._cache.monthTransactions[key] = result;
            return result;
        }
        getCardTransactions(cardId, date) {
            if (!date) date = this.currentMonth;
            const m = date.getMonth(), y = date.getFullYear();
            return this.transactions.filter(t => {
                if (t.paymentMethod !== 'card:' + cardId || t.amount >= 0) return false;
                const d = new Date(t.date + 'T12:00:00');
                return d.getMonth() === m && d.getFullYear() === y;
            });
        }
        getCardTransactionsForPeriod(cardId, startDate, closingDate) {
            const start = new Date(startDate); start.setHours(0, 0, 0, 0);
            const end = new Date(closingDate); end.setHours(23, 59, 59, 999);
            return this.transactions.filter(t => {
                if (t.paymentMethod !== 'card:' + cardId) return false;
                if (t.amount >= 0) return false;
                const tDate = new Date(t.date + 'T12:00:00');
                return tDate >= start && tDate <= end;
            });
        }

        // ===== POPULAR SELECTS =====
        populateCategorySelects() {
            const self = this;
            ['category', 'editCategory', 'categoryFilter'].forEach((id, i) => {
                const sel = document.getElementById(id);
                if (!sel) return;
                const val = sel.value;
                sel.innerHTML = i === 2 ? '<option value="">Todas as categorias</option>' : '<option value="">Selecione uma categoria...</option>';
                self.categories.forEach(cat => {
                    const opt = document.createElement('option');
                    opt.value = cat.id;
                    opt.textContent = cat.name;
                    opt.dataset.type = cat.type;
                    sel.appendChild(opt);
                });
                sel.value = val;
            });
            this.filterCategoriesByType('category', this.currentTransactionType);
            const typeFilter = document.getElementById('typeFilter');
            if (typeFilter) this.filterCategoriesByType('categoryFilter', typeFilter.value);
        }
        populatePaymentMethodSelects() {
            const self = this;
            ['paymentMethod', 'editPaymentMethod'].forEach(id => {
                const sel = document.getElementById(id);
                if (!sel) return;
                const currentVal = sel.value;
                sel.innerHTML = '<option value="">Selecione...</option>';
                const group = document.createElement('optgroup');
                group.label = '💰 Formas de Pagamento';
                PAYMENT_METHODS.forEach(pm => {
                    const opt = document.createElement('option');
                    opt.value = pm.id;
                    opt.textContent = pm.icon + ' ' + pm.name;
                    group.appendChild(opt);
                });
                sel.appendChild(group);
                if (self.cards.length > 0) {
                    const cardGroup = document.createElement('optgroup');
                    cardGroup.label = '💳 Cartões de Crédito';
                    self.cards.forEach(card => {
                        const opt = document.createElement('option');
                        opt.value = 'card:' + card.id;
                        opt.textContent = '💳 ' + card.name + ' •••• ' + (card.last4 || '****');
                        cardGroup.appendChild(opt);
                    });
                    sel.appendChild(cardGroup);
                }
                sel.value = currentVal;
            });
        }
        populateAccountSelects() {
            const self = this;
            ['transactionAccount', 'editTransactionAccount', 'accountFilter', 'transferFrom', 'transferTo'].forEach(id => {
                const sel = document.getElementById(id);
                if (!sel) return;
                const val = sel.value;
                const isFilter = id === 'accountFilter';
                sel.innerHTML = isFilter ? '<option value="">Todas as contas</option>' : '<option value="">Selecione a conta...</option>';
                self.accounts.forEach(acc => {
                    const opt = document.createElement('option');
                    opt.value = acc.id;
                    opt.textContent = (acc.type === 'checking' ? '💳 ' : '📈 ') + acc.name;
                    sel.appendChild(opt);
                });
                sel.value = val;
            });
        }
        populateCardFilter() {
            const sel = document.getElementById('cardFilter');
            if (!sel) return;
            const val = sel.value;
            sel.innerHTML = '<option value="">' + this.t('allCards') + '</option>';
            this.cards.forEach(card => {
                const opt = document.createElement('option');
                opt.value = 'card:' + card.id;
                opt.textContent = '💳 ' + card.name;
                sel.appendChild(opt);
            });
            sel.value = val;
        }
        filterCategoriesByType(selectId, type) {
            const sel = document.getElementById(selectId);
            if (!sel) return;
            sel.querySelectorAll('option').forEach(opt => {
                if (opt.value === '') opt.style.display = 'block';
                else opt.style.display = (!type || opt.dataset.type === type) ? 'block' : 'none';
            });
            const currentVal = sel.value;
            if (currentVal) {
                const currentOpt = sel.querySelector('option[value="' + currentVal + '"]');
                if (currentOpt && currentOpt.style.display === 'none') sel.value = '';
            }
        }
        getCategoryById(id) {
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].id === id) return this.categories[i];
            }
            return { name: 'Sem categoria', color: '#6b7280', type: 'expense' };
        }
        findCategoryByName(name) {
            const lower = name.toLowerCase();
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].name.toLowerCase() === lower) return this.categories[i];
            }
            return null;
        }
        getCardById(id) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].id === id) return this.cards[i];
            }
            return null;
        }
        getPaymentMethodName(method) {
            if (!method) return '-';
            if (method.indexOf('card:') === 0) {
                const card = this.getCardById(method.replace('card:', ''));
                return card ? '💳 ' + card.name : 'Cartão removido';
            }
            for (let i = 0; i < PAYMENT_METHODS.length; i++) {
                if (PAYMENT_METHODS[i].id === method) return PAYMENT_METHODS[i].icon + ' ' + PAYMENT_METHODS[i].name;
            }
            return method;
        }
        formatDate(d) { return new Date(d + 'T12:00:00').toLocaleDateString(this.getLanguage()); }
        escapeHtml(t) {
            if (t === null || t === undefined) return '';
            const div = document.createElement('div');
            div.textContent = String(t);
            return div.innerHTML;
        }
        showToast(msg) {
            const t = document.getElementById('toast');
            if (!t) return;
            t.textContent = msg;
            t.classList.add('active');
            clearTimeout(this.toastT);
            this.toastT = setTimeout(() => t.classList.remove('active'), 3000);
        }

        // ===== DASHBOARD =====
        updateDashboard() {
            if (!this.currentMonth || !(this.currentMonth instanceof Date) || isNaN(this.currentMonth.getTime())) {
                this.currentMonth = new Date();
                this.currentMonth.setDate(1);
                this.currentMonth.setHours(0, 0, 0, 0);
            }
            const mt = this.getMonthTransactions();
            let inc = 0, exp = 0;
            mt.forEach(t => { if (t.amount > 0) inc += t.amount; else exp += t.amount; });
            
            // SALDO UNIFICADO = SOMA DE TODAS AS CONTAS CORRENTES
            let unifiedBalance = 0;
            this.accounts.forEach(a => {
                if (a.type === 'checking') unifiedBalance += (parseFloat(a.balance) || 0);
            });
            // Soma também investimentos sem conta vinculada
            this.investments.forEach(inv => {
                if (!inv.accountId) unifiedBalance += (inv.current || 0);
            });
            
            let creditCardTotal = 0;
            const self = this;
            this.cards.forEach(card => {
                const cardTrans = self.getCardTransactions(card.id);
                cardTrans.forEach(t => { creditCardTotal += Math.abs(t.amount); });
            });
            
            const balEl = document.getElementById('totalBalance');
            if (balEl) {
                balEl.textContent = this.formatCurrency(unifiedBalance);
                balEl.className = 'card-value privacy-value ' + (unifiedBalance >= 0 ? 'positive' : 'negative');
            }
            const incEl = document.getElementById('totalIncome');
            if (incEl) incEl.textContent = this.formatCurrency(inc);
            const expEl = document.getElementById('totalExpenses');
            if (expEl) expEl.textContent = this.formatCurrency(Math.abs(exp));
            const goalEl = document.getElementById('goalProgress');
            if (goalEl) {
                goalEl.textContent = this.formatCurrency(creditCardTotal);
                goalEl.className = 'card-value privacy-value negative';
            }
        }
		        // ===== RENDERIZAÇÃO =====
        render() {
            this.updateDashboard();
            const tbody = document.getElementById('transactionsTable');
            const empty = document.getElementById('emptyState');
            if (!tbody) return;
            
            const filtered = this.getFilteredTransactions();
            if (!filtered.length) {
                tbody.innerHTML = '';
                if (empty) empty.style.display = 'block';
                return;
            }
            if (empty) empty.style.display = 'none';
            
            // ORDENAR por coluna ativa
            const sorted = filtered.slice().sort((a, b) => this.compareTransactions(a, b));
            
            // AGRUPAR Receitas e Despesas
            const incomeGroup = sorted.filter(t => t.amount > 0);
            const expenseGroup = sorted.filter(t => t.amount < 0);
            
            let totalIncome = 0, totalExpense = 0;
            incomeGroup.forEach(t => totalIncome += t.amount);
            expenseGroup.forEach(t => totalExpense += t.amount);
            
            const fragment = document.createDocumentFragment();
            const isMobile = window.innerWidth <= 640;
            const self = this;
            
            // Adicionar grupo Receitas
            if (incomeGroup.length > 0) {
                const incomeLabel = document.createElement('tr');
                incomeLabel.innerHTML = '<td colspan="' + (isMobile ? 1 : 7) + '" class="transactions-group-label income"><span>' + this.t('incomeGroup') + ' (' + incomeGroup.length + ')</span><span class="group-total">+ ' + this.formatCurrency(totalIncome) + '</span></td>';
                fragment.appendChild(incomeLabel);
                incomeGroup.forEach(t => {
                    fragment.appendChild(self.createTransactionRow(t, isMobile));
                });
            }
            
            // Adicionar grupo Despesas
            if (expenseGroup.length > 0) {
                const expenseLabel = document.createElement('tr');
                expenseLabel.innerHTML = '<td colspan="' + (isMobile ? 1 : 7) + '" class="transactions-group-label expense"><span>' + this.t('expenseGroup') + ' (' + expenseGroup.length + ')</span><span class="group-total">- ' + this.formatCurrency(Math.abs(totalExpense)) + '</span></td>';
                fragment.appendChild(expenseLabel);
                expenseGroup.forEach(t => {
                    fragment.appendChild(self.createTransactionRow(t, isMobile));
                });
            }
            
            tbody.innerHTML = '';
            tbody.appendChild(fragment);
            this.updateSortIndicators();
        }
        
        createTransactionRow(t, isMobile) {
            const cat = this.getCategoryById(t.category);
            let acc = null;
            for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].id === t.accountId) { acc = this.accounts[i]; break; }
            }
            const cls = t.amount >= 0 ? 'positive' : 'negative';
            const statusClass = t.statusOk ? 'status-done' : 'status-pending';
            const statusText = t.statusOk ? this.t('completed') : this.t('pending');
            const paymentName = this.getPaymentMethodName(t.paymentMethod);
            
            let recurrenceHtml = '-';
            if (t.recurrence) {
                if (t.recurrence.type === 'installment') recurrenceHtml = '<span class="recurrence-badge">📅 ' + (t.recurrence.current || 1) + '/' + (t.recurrence.total || 1) + '</span>';
                else if (t.recurrence.type === 'monthly') recurrenceHtml = '<span class="recurrence-badge">🔁 Mensal</span>';
                else if (t.recurrence.type === 'yearly') recurrenceHtml = '<span class="recurrence-badge">📅 Anual</span>';
            }
            
            const tr = document.createElement('tr');
            tr.className = 'transaction-row';
            tr.dataset.id = t.id;
            tr.onclick = function() { smartwallet.editTransaction(t.id); };
            
            let rowHtml = '';
            if (isMobile) {
                rowHtml += '<div class="swipe-actions"><div class="swipe-action complete">✓ Paga</div><div class="swipe-action delete">🗑️ Excluir</div></div>';
            }
            rowHtml += '<td data-label="Data">' + this.formatDate(t.date) + '</td>' +
                '<td data-label="Descrição">' + this.escapeHtml(t.description || '-') + '</td>' +
                '<td data-label="Categoria"><span class="category-badge" style="background:' + cat.color + '">' + this.escapeHtml(cat.name) + '</span></td>' +
                '<td data-label="Conta">' + (acc ? '<span class="account-badge">' + this.escapeHtml(acc.name) + '</span>' : '-') + '</td>' +
                '<td data-label="Pagamento"><span class="payment-badge">' + paymentName + '</span></td>' +
                '<td data-label="Status"><span class="status-badge ' + statusClass + '">' + statusText + '</span></td>' +
                '<td data-label="Valor" class="amount ' + cls + ' privacy-value">' + this.formatCurrency(t.amount) + '</td>';
            
            tr.innerHTML = rowHtml;
            return tr;
        }
        
        updateSortIndicators() {
            document.querySelectorAll('th[data-sort]').forEach(th => {
                th.classList.remove('sort-asc', 'sort-desc');
                if (th.dataset.sort === this.sortColumn) {
                    th.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
                }
            });
        }
        
        compareTransactions(a, b) {
            const col = this.sortColumn;
            const dir = this.sortDirection === 'asc' ? 1 : -1;
            let va, vb;
            
            switch(col) {
                case 'date':
                    va = new Date(a.date).getTime();
                    vb = new Date(b.date).getTime();
                    break;
                case 'description':
                    va = (a.description || '').toLowerCase();
                    vb = (b.description || '').toLowerCase();
                    break;
                case 'category':
                    va = this.getCategoryById(a.category).name.toLowerCase();
                    vb = this.getCategoryById(b.category).name.toLowerCase();
                    break;
                case 'account':
                    const accA = this.accounts.find(x => x.id === a.accountId);
                    const accB = this.accounts.find(x => x.id === b.accountId);
                    va = (accA ? accA.name : '').toLowerCase();
                    vb = (accB ? accB.name : '').toLowerCase();
                    break;
                case 'payment':
                    va = this.getPaymentMethodName(a.paymentMethod).toLowerCase();
                    vb = this.getPaymentMethodName(b.paymentMethod).toLowerCase();
                    break;
                case 'status':
                    va = a.statusOk ? 1 : 0;
                    vb = b.statusOk ? 1 : 0;
                    break;
                case 'amount':
                    va = a.amount;
                    vb = b.amount;
                    break;
                default:
                    va = a.id;
                    vb = b.id;
            }
            
            if (va < vb) return -1 * dir;
            if (va > vb) return 1 * dir;
            return 0;
        }
        
        getFilteredTransactions() {
            const search = (document.getElementById('searchFilter').value || '').toLowerCase();
            const catFilter = document.getElementById('categoryFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;
            const accountFilter = document.getElementById('accountFilter').value;
            const cardFilter = document.getElementById('cardFilter')?.value || '';
            const self = this;
            
            return this.getMonthTransactions().filter(t => {
                const cat = self.getCategoryById(t.category);
                const matchSearch = !search || (t.description || '').toLowerCase().indexOf(search) !== -1 || cat.name.toLowerCase().indexOf(search) !== -1;
                const matchCat = !catFilter || t.category === catFilter;
                const matchType = !typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0);
                const matchStatus = !statusFilter || (statusFilter === 'done' ? t.statusOk : !t.statusOk);
                const matchAccount = !accountFilter || t.accountId === accountFilter;
                const matchCard = !cardFilter || t.paymentMethod === cardFilter;
                return matchSearch && matchCat && matchType && matchStatus && matchAccount && matchCard;
            });
        }
        
        generateUniqueId() {
            if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
            return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
        }

        // ===== SALDO DA CONTA =====
        updateAccountBalance(accountId, amount) {
            if (!accountId) return;
            for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].id === accountId) {
                    this.accounts[i].balance = (parseFloat(this.accounts[i].balance) || 0) + amount;
                    break;
                }
            }
            this.saveAccounts();
        }

        // ===== ADICIONAR TRANSAÇÃO =====
        addTransaction() {
            const date = document.getElementById('date').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const statusOk = document.getElementById('statusOk').checked;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const accountId = document.getElementById('transactionAccount').value;
            const isRecurring = document.getElementById('recurring').checked;
            
            if (!category) { this.showToast('Selecione uma categoria'); return; }
            if (!paymentMethod) { this.showToast('Selecione a forma de pagamento'); return; }
            if (!date) { this.showToast('Selecione uma data'); return; }
            if (isNaN(amount) || amount <= 0) { this.showToast('Valor inválido'); return; }
            if (!accountId) { this.showToast('Selecione uma conta'); return; }
            
            const signedAmount = this.currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount);
            
            if (isRecurring) {
                const recurrenceType = document.getElementById('recurrenceType').value;
                const recurrenceCount = parseInt(document.getElementById('recurrenceCount').value);
                if (recurrenceCount < 2) { this.showToast('Mínimo de 2 parcelas'); return; }
                const startDate = new Date(date + 'T12:00:00');
                const recurrenceGroupId = this.generateUniqueId();
                let createdCount = 0;
                for (let i = 0; i < recurrenceCount; i++) {
                    const transDate = new Date(startDate);
                    if (recurrenceType === 'monthly' || recurrenceType === 'installment') {
                        transDate.setMonth(startDate.getMonth() + i);
                        const lastDay = new Date(transDate.getFullYear(), transDate.getMonth() + 1, 0).getDate();
                        transDate.setDate(startDate.getDate() > lastDay ? lastDay : startDate.getDate());
                    } else if (recurrenceType === 'yearly') {
                        transDate.setFullYear(startDate.getFullYear() + i);
                        const lastDay = new Date(transDate.getFullYear(), transDate.getMonth() + 1, 0).getDate();
                        transDate.setDate(startDate.getDate() > lastDay ? lastDay : startDate.getDate());
                    }
                    let transDescription = description;
                    if (recurrenceType === 'installment') transDescription = description + ' - Parcela ' + (i + 1) + '/' + recurrenceCount;
                    const uniqueId = this.generateUniqueId() + '_' + i;
                    this.transactions.push({
                        id: uniqueId, date: transDate.toISOString().split('T')[0], amount: signedAmount,
                        category: category, description: transDescription, statusOk: statusOk,
                        paymentMethod: paymentMethod, accountId: accountId,
                        recurrence: { groupId: recurrenceGroupId, type: recurrenceType, total: recurrenceCount, current: i + 1 }
                    });
                    createdCount++;
                }
                // Atualiza saldo apenas uma vez (soma de todas as parcelas do mês atual)
                const monthTotal = this.getMonthTransactions().filter(t => 
                    t.accountId === accountId && 
                    t.recurrence && t.recurrence.groupId === recurrenceGroupId
                ).reduce((sum, t) => sum + t.amount, 0);
                this.updateAccountBalance(accountId, monthTotal);
                
                this.clearCache(); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
                this.showToast('✅ ' + createdCount + ' transações recorrentes criadas!');
                closeNewTransactionModal(); this.clearForm();
                return;
            }
            
            const transaction = {
                id: this.generateUniqueId(), date: date, amount: signedAmount,
                category: category, description: description, statusOk: statusOk,
                paymentMethod: paymentMethod, accountId: accountId
            };
            this.transactions.push(transaction);
            this.updateAccountBalance(accountId, signedAmount);
            this.clearCache(); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
            this.showToast('Transação adicionada!');
            closeNewTransactionModal(); this.clearForm();
        }
        
        clearForm() {
            const form = document.getElementById('transactionForm');
            if (form) form.reset();
            this.setDefaultDate();
            this.currentTransactionType = 'expense';
            document.querySelectorAll('#transactionForm .type-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === 'expense'));
            this.filterCategoriesByType('category', 'expense');
            const recurringOptions = document.getElementById('recurringOptions');
            if (recurringOptions) recurringOptions.style.display = 'none';
        }
        
        editTransaction(id) {
            let t = null;
            for (let i = 0; i < this.transactions.length; i++) {
                if (this.transactions[i].id === id) { t = this.transactions[i]; break; }
            }
            if (!t) return;
            this.currentEditId = id;
            this.currentEditType = t.amount > 0 ? 'income' : 'expense';
            document.getElementById('editId').value = t.id;
            document.getElementById('editDate').value = t.date;
            document.getElementById('editAmount').value = Math.abs(t.amount);
            document.getElementById('editCategory').value = t.category || '';
            document.getElementById('editPaymentMethod').value = t.paymentMethod || '';
            document.getElementById('editTransactionAccount').value = t.accountId || '';
            document.getElementById('editDescription').value = t.description || '';
            document.getElementById('editStatusOk').checked = !!t.statusOk;
            if (t.recurrence) {
                document.getElementById('editRecurring').checked = true;
                document.getElementById('editRecurringOptions').style.display = 'block';
                document.getElementById('editRecurrenceType').value = t.recurrence.type;
                document.getElementById('editRecurrenceCount').value = t.recurrence.total;
            } else {
                document.getElementById('editRecurring').checked = false;
                document.getElementById('editRecurringOptions').style.display = 'none';
            }
            document.querySelectorAll('#editForm .type-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === this.currentEditType));
            this.filterCategoriesByType('editCategory', this.currentEditType);
            document.getElementById('editModal').classList.add('active');
            document.body.classList.add('modal-open');
            document.body.style.setProperty('--scroll-y', -window.scrollY + 'px');
        }
        
        updateTransaction() {
            const id = document.getElementById('editId').value;
            const date = document.getElementById('editDate').value;
            const amount = parseFloat(document.getElementById('editAmount').value);
            const category = document.getElementById('editCategory').value;
            const paymentMethod = document.getElementById('editPaymentMethod').value;
            const accountId = document.getElementById('editTransactionAccount').value;
            
            if (!id || !date || isNaN(amount) || amount <= 0 || !category || !paymentMethod || !accountId) {
                this.showToast('⚠️ Preencha todos os campos');
                return;
            }
            
            let idx = -1;
            for (let i = 0; i < this.transactions.length; i++) {
                if (String(this.transactions[i].id) === String(id)) { idx = i; break; }
            }
            if (idx === -1) { this.showToast('❌ Transação não encontrada'); return; }
            
            const oldTransaction = this.transactions[idx];
            const oldAmount = oldTransaction.amount;
            const oldAccountId = oldTransaction.accountId;
            const newAmount = this.currentEditType === 'expense' ? -Math.abs(amount) : Math.abs(amount);
            
            // REVERTER saldo antigo
            if (oldAccountId) this.updateAccountBalance(oldAccountId, -oldAmount);
            
            const isRecurring = document.getElementById('editRecurring').checked;
            let recurrenceData = null;
            if (isRecurring) {
                const recurrenceType = document.getElementById('editRecurrenceType').value;
                const recurrenceCount = parseInt(document.getElementById('editRecurrenceCount').value);
                recurrenceData = { type: recurrenceType, total: recurrenceCount, current: oldTransaction.recurrence ? oldTransaction.recurrence.current : 1 };
            }
            
            this.transactions[idx] = {
                id: oldTransaction.id, date: date, amount: newAmount,
                category: category, description: document.getElementById('editDescription').value,
                statusOk: document.getElementById('editStatusOk').checked,
                paymentMethod: paymentMethod, accountId: accountId,
                recurrence: recurrenceData
            };
            
            // APLICAR novo saldo
            this.updateAccountBalance(accountId, newAmount);
            
            this.clearCache(); this.saveTransactions(); this.render();
            this.updateCharts(); this.updateAlertBadge();
            closeEditModal();
            this.showToast('✅ Transação atualizada!');
        }
        
        deleteFromEdit() {
            if (!this.currentEditId) return;
            if (!confirm('Excluir esta transação?')) return;
            const t = this.transactions.find(x => x.id === this.currentEditId);
            if (t && t.accountId) this.updateAccountBalance(t.accountId, -t.amount);
            this.transactions = this.transactions.filter(x => x.id !== this.currentEditId);
            this.clearCache(); this.saveTransactions(); this.render();
            this.updateCharts(); this.updateAlertBadge();
            closeEditModal();
            this.showToast('Excluída!');
        }
        
        deleteTransaction(id) {
            if (!confirm('Excluir esta transação?')) return;
            const t = this.transactions.find(x => x.id === id);
            if (t && t.accountId) this.updateAccountBalance(t.accountId, -t.amount);
            this.transactions = this.transactions.filter(x => x.id !== id);
            this.clearCache(); this.saveTransactions(); this.render();
            this.updateCharts(); this.updateAlertBadge();
            this.showToast('Transação excluída!');
        }

        // ===== TEMA E PRIVACIDADE =====
        applyTheme() {
            document.body.classList.toggle('light', !this.darkMode);
            const btn = document.getElementById('themeBtn');
            if (btn) {
                btn.innerHTML = this.darkMode
                    ? '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
                    : '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
            }
            if (Object.keys(this.charts).length > 0) {
                try { this.updateChartsTheme(); } catch (e) { console.warn('[SmartWallet] Erro tema:', e); }
            }
        }
        applyPrivacy() {
            document.body.classList.toggle('privacy-on', this.privacyOn);
            const btn = document.getElementById('privacyBtn');
            if (btn) {
                btn.innerHTML = this.privacyOn
                    ? '<svg class="icon" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
                    : '<svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
                btn.classList.toggle('active', this.privacyOn);
            }
        }

        // ===== GRÁFICOS =====
        getChartColors() {
            const isLight = document.body.classList.contains('light');
            return {
                text: isLight ? '#1e293b' : '#e2e8f0',
                grid: isLight ? '#e5e7eb' : '#334155',
                textSecondary: isLight ? '#64748b' : '#94a3b8'
            };
        }
        initCharts() {
            if (typeof Chart === 'undefined') { console.error('[SmartWallet] Chart.js não carregado!'); return; }
            const colors = this.getChartColors();
            const lineOpts = {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { color: colors.text } } },
                scales: {
                    y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                    x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                }
            };
            try {
                this.charts.line = new Chart(document.getElementById('lineChart').getContext('2d'), {
                    type: 'line',
                    data: { labels: [], datasets: [
                        { label: 'Receitas', data: [], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4 },
                        { label: 'Despesas', data: [], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', tension: 0.4 }
                    ]},
                    options: lineOpts
                });
            } catch (e) { console.error('[SmartWallet] Erro line:', e); }
            try {
                this.charts.pie = new Chart(document.getElementById('pieChart').getContext('2d'), {
                    type: 'bar',
                    data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
                    options: {
                        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                            y: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                        },
                        barPercentage: 0.3, categoryPercentage: 0.5
                    }
                });
            } catch (e) { console.error('[SmartWallet] Erro pie:', e); }
            try {
                this.charts.cards = new Chart(document.getElementById('cardsChart').getContext('2d'), {
                    type: 'line',
                    data: { labels: [], datasets: [] },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { position: 'top', labels: { color: colors.text } } },
                        scales: {
                            y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                            x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                        }
                    }
                });
            } catch (e) { console.error('[SmartWallet] Erro cards:', e); }
            this.updateCharts();
        }
        updateChartsTheme() {
            const colors = this.getChartColors();
            const self = this;
            Object.keys(this.charts).forEach(key => {
                const chart = self.charts[key];
                if (!chart || !chart.options) return;
                try {
                    if (chart.options.scales?.y?.ticks) chart.options.scales.y.ticks.color = colors.textSecondary;
                    if (chart.options.scales?.y?.grid) chart.options.scales.y.grid.color = colors.grid;
                    if (chart.options.scales?.x?.ticks) chart.options.scales.x.ticks.color = colors.textSecondary;
                    if (chart.options.scales?.x?.grid) chart.options.scales.x.grid.color = colors.grid;
                    if (chart.options.plugins?.legend?.labels) chart.options.plugins.legend.labels.color = colors.text;
                    chart.update('none');
                } catch (e) { console.warn('[SmartWallet] Erro tema gráfico:', e); }
            });
        }
        updateCharts() {
            const self = this;
            const lLabels = [], lInc = [], lExp = [];
            for (let i = -2; i <= 3; i++) {
                const d = new Date(this.currentMonth);
                d.setMonth(d.getMonth() + i);
                const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                lLabels.push(months[d.getMonth()] + '/' + d.getFullYear());
                const mt = this.getMonthTransactions(d);
                let inc = 0, exp = 0;
                mt.forEach(t => { if (t.amount > 0) inc += t.amount; else exp += t.amount; });
                lInc.push(inc);
                lExp.push(Math.abs(exp));
            }
            if (this.charts.line) {
                this.charts.line.data.labels = lLabels;
                this.charts.line.data.datasets[0].data = lInc;
                this.charts.line.data.datasets[1].data = lExp;
                this.charts.line.update();
            }
            const exps = {};
            this.getMonthTransactions().forEach(t => {
                if (t.amount < 0) {
                    const c = self.getCategoryById(t.category);
                    if (!exps[c.name]) exps[c.name] = { t: 0, color: c.color };
                    exps[c.name].t += Math.abs(t.amount);
                }
            });
            if (this.charts.pie) {
                this.charts.pie.data.labels = Object.keys(exps);
                this.charts.pie.data.datasets[0].data = Object.keys(exps).map(k => exps[k].t);
                this.charts.pie.data.datasets[0].backgroundColor = Object.keys(exps).map(k => exps[k].color);
                this.charts.pie.update();
            }
            if (this.charts.cards) {
                const cardLabels = [];
                const cardDatasets = [];
                for (let i = -2; i <= 3; i++) {
                    const d = new Date(this.currentMonth);
                    d.setMonth(d.getMonth() + i);
                    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                    cardLabels.push(months[d.getMonth()] + '/' + d.getFullYear());
                }
                this.cards.forEach(card => {
                    const data = [];
                    for (let i = -2; i <= 3; i++) {
                        const d = new Date(self.currentMonth);
                        d.setMonth(d.getMonth() + i);
                        const cardTrans = self.getCardTransactions(card.id, d);
                        let total = 0;
                        cardTrans.forEach(t => total += Math.abs(t.amount));
                        data.push(total);
                    }
                    cardDatasets.push({
                        label: card.name, data: data,
                        borderColor: card.color, backgroundColor: card.color + '20',
                        tension: 0.4, fill: false
                    });
                });
                this.charts.cards.data.labels = cardLabels;
                this.charts.cards.data.datasets = cardDatasets;
                this.charts.cards.update();
            }
            this.updateInvestmentChart();
        }

        // ===== ALERTAS =====
        updateAlertBadge() {
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const in3Days = new Date(today); in3Days.setDate(in3Days.getDate() + 3);
            const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
            const bills = this.transactions.filter(t => {
                if (t.statusOk || t.amount >= 0) return false;
                const tDate = new Date(t.date + 'T12:00:00');
                return tDate <= in3Days;
            });
            let closingAlertsCount = 0;
            this.cards.forEach(card => {
                const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                const closingDay = Math.min(card.closingDay, lastDayOfMonth);
                const closingDate = new Date(today.getFullYear(), today.getMonth(), closingDay);
                closingDate.setHours(0, 0, 0, 0);
                if (closingDate.getTime() === tomorrow.getTime()) closingAlertsCount++;
            });
            const totalAlerts = bills.length + closingAlertsCount;
            const badge = document.getElementById('alertBadge');
            const btn = document.getElementById('alertBtn');
            if (badge && btn) {
                if (totalAlerts > 0) {
                    badge.textContent = totalAlerts;
                    badge.classList.add('visible');
                    btn.classList.add('has-alerts');
                } else {
                    badge.classList.remove('visible');
                    btn.classList.remove('has-alerts');
                }
            }
        }

        // ===== FATURA DE CARTÃO =====
        getInvoicePeriod(card, referenceDate) {
            const refDate = referenceDate || this.cardModalMonth || new Date();
            const year = refDate.getFullYear();
            const month = refDate.getMonth();
            const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
            const closingDay = Math.min(card.closingDay, lastDayOfMonth);
            let closingDate = new Date(year, month, closingDay);
            const previousClosingDate = new Date(closingDate);
            previousClosingDate.setMonth(previousClosingDate.getMonth() - 1);
            previousClosingDate.setDate(previousClosingDate.getDate() + 1);
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const isClosed = closingDate < today;
            let dueDate = new Date(closingDate);
            if (isClosed) dueDate.setMonth(dueDate.getMonth() + 1);
            dueDate.setDate(card.dueDay);
            return { startDate: previousClosingDate, closingDate: closingDate, dueDate: dueDate, isClosed: isClosed };
        }
        calculateInvoiceTotal(purchases) {
            let total = 0;
            purchases.forEach(p => total += Math.abs(p.amount));
            return total;
        }
        renderCreditCardsList() {
            const container = document.getElementById('creditCardsList');
            if (!container) return;
            window.updateCardMonthLabel();
            if (!this.cards.length) {
                container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">💳</div><h3>Nenhum cartão cadastrado</h3></div>';
                return;
            }
            const self = this;
            const refDate = this.cardModalMonth;
            let html = '<div class="credit-cards-grid">';
            this.cards.forEach(card => {
                const period = self.getInvoicePeriod(card, refDate);
                const purchases = self.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
                const total = self.calculateInvoiceTotal(purchases);
                const available = card.limit - total;
                const usedPct = Math.min(100, (total / card.limit) * 100);
                html += '<div class="credit-card-visual" style="background:linear-gradient(135deg, ' + card.color + ' 0%, ' + self.adjustColor(card.color, -30) + ' 100%);" onclick="openInvoiceModal(\'' + card.id + '\')">';
                html += '<div class="cc-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editCard(\'' + card.id + '\')">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteCard(\'' + card.id + '\')">🗑️</button></div>';
                html += '<div class="cc-header"><div class="cc-brand">' + self.escapeHtml(card.brand) + '</div><div class="cc-chip"></div></div>';
                html += '<div class="cc-name">' + self.escapeHtml(card.name) + '</div>';
                html += '<div class="cc-number">•••• •••• •••• ' + self.escapeHtml(card.last4 || '****') + '</div>';
                html += '<div class="cc-footer"><div><div class="cc-label">Fatura Atual</div><div class="cc-value">' + self.formatCurrency(total) + '</div></div><div style="text-align:right;"><div class="cc-label">Disponível</div><div class="cc-value">' + self.formatCurrency(available) + '</div></div></div>';
                html += '<div style="position:absolute; bottom:0; left:0; right:0; height:4px; background:rgba(0,0,0,0.3);"><div style="height:100%; width:' + usedPct + '%; background:' + (usedPct > 80 ? '#ef4444' : usedPct > 50 ? '#f59e0b' : '#10b981') + ';"></div></div>';
                html += '</div>';
            });
            html += '</div>';
            container.innerHTML = html;
        }
        adjustColor(color, amount) {
            const hex = color.replace('#', '');
            const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
            const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
            const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
            return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
        }
        saveCard() {
            const id = document.getElementById('cardEditId').value;
            const name = document.getElementById('cardName').value.trim();
            const brand = document.getElementById('cardBrand').value;
            const last4 = document.getElementById('cardLast4').value.trim();
            const closingDay = parseInt(document.getElementById('cardClosingDay').value);
            const dueDay = parseInt(document.getElementById('cardDueDay').value);
            const limit = parseFloat(document.getElementById('cardLimit').value);
            const color = document.getElementById('cardColor').value;
            if (!name) { this.showToast('Informe o nome'); return; }
            if (id) {
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.cards[i].id === id) { this.cards[i] = { id, name, brand, last4, closingDay, dueDay, limit, color }; break; }
                }
            } else {
                this.cards.push({ id: this.generateUniqueId(), name, brand, last4, closingDay, dueDay, limit, color });
            }
            this.clearCache(); this.saveCards(); this.populatePaymentMethodSelects(); this.renderCreditCardsList();
            closeNewCardModal(); this.showToast(id ? 'Cartão atualizado!' : 'Cartão cadastrado!');
        }
        deleteCard(id) {
            if (!confirm('Excluir este cartão?')) return;
            this.cards = this.cards.filter(c => c.id !== id);
            this.clearCache(); this.saveCards(); this.populatePaymentMethodSelects(); this.renderCreditCardsList();
            this.showToast('Cartão removido!');
        }
        editCard(id) {
            const card = this.getCardById(id); if (!card) return;
            document.getElementById('cardEditId').value = card.id;
            document.getElementById('cardName').value = card.name;
            document.getElementById('cardBrand').value = card.brand;
            document.getElementById('cardLast4').value = card.last4 || '';
            document.getElementById('cardClosingDay').value = card.closingDay;
            document.getElementById('cardDueDay').value = card.dueDay;
            document.getElementById('cardLimit').value = card.limit;
            document.getElementById('cardColor').value = card.color;
            document.getElementById('newCardTitle').textContent = 'Editar Cartão';
            document.getElementById('newCardModal').classList.add('active');
        }
        openInvoice(cardId, offset = 0) {
            const card = this.getCardById(cardId);
            if (!card) return;
            this.currentInvoiceCardId = cardId;
            this.currentInvoiceOffset = offset;
            const refDate = new Date(this.cardModalMonth);
            refDate.setMonth(refDate.getMonth() + offset);
            const period = this.getInvoicePeriod(card, refDate);
            const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
            const total = this.calculateInvoiceTotal(purchases);
            const minimum = total * 0.15;
            const available = card.limit - total;
            const self = this;
            document.getElementById('invoiceTitle').textContent = this.t('invoice') + ' - ' + card.name;
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const daysUntilDue = Math.ceil((period.dueDate - today) / (1000 * 60 * 60 * 24));
            let dueClass = '';
            let dueText = this.formatDate(period.dueDate.toISOString().split('T')[0]);
            if (daysUntilDue < 0) { dueClass = 'overdue'; dueText += ' (Vencida há ' + Math.abs(daysUntilDue) + ' dias)'; }
            else if (daysUntilDue === 0) { dueClass = 'overdue'; dueText += ' (Vence hoje!)'; }
            else if (daysUntilDue <= 3) { dueText += ' (Em ' + daysUntilDue + ' dias)'; }
            if (period.isClosed) dueText += ' ✓ Fechada';
            let html = '<div class="invoice-period-display">';
            html += '<div class="invoice-period-info"><div class="invoice-period-label">📅 ' + this.t('invoicePeriod') + '</div>';
            html += '<div class="invoice-period-value">' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' até ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '</div></div>';
            html += '<div class="invoice-due-info"><div class="invoice-due-label">💳 ' + this.t('dueDate') + '</div>';
            html += '<div class="invoice-due-value ' + dueClass + '">' + dueText + '</div></div></div>';
            html += '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">';
            html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Limite Total</span><span style="font-weight:600;">' + this.formatCurrency(card.limit) + '</span></div>';
            html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">' + this.t('invoiceTotal') + '</span><span style="font-weight:600; color:var(--danger-color);">' + this.formatCurrency(total) + '</span></div>';
            html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Mínimo (15%)</span><span style="font-weight:600;">' + this.formatCurrency(minimum) + '</span></div>';
            html += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700;"><span>Disponível</span><span style="color:var(--success-color);">' + this.formatCurrency(available) + '</span></div></div>';
            html += '<div style="display:flex; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:10px;">';
            html += '<h3 style="font-size:1.1rem;">Compras (' + purchases.length + ')</h3>';
            html += '<div style="display:flex; gap:8px;">';
            html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.exportInvoiceCSV(\'' + cardId + '\')">📥 CSV</button>';
            html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.printInvoicePDF(\'' + cardId + '\')">🖨️ PDF</button></div></div>';
            html += '<div>';
            if (purchases.length === 0) {
                html += '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma compra neste período.</p>';
            } else {
                purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(p => {
                    const cat = self.getCategoryById(p.category);
                    html += '<div style="background:var(--input-bg); border-radius:12px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:12px;">';
                    html += '<div style="flex:1;"><div style="font-weight:600;">' + self.escapeHtml(p.description) + '</div>';
                    html += '<div style="font-size:0.8rem; color:var(--text-secondary); display:flex; gap:10px;"><span>' + self.formatDate(p.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeHtml(cat.name) + '</span></div></div>';
                    html += '<div style="font-weight:700;">' + self.formatCurrency(Math.abs(p.amount)) + '</div>';
                    html += '<button class="btn btn-danger btn-small" onclick="smartwallet.deleteTransaction(' + p.id + '); smartwallet.openInvoice(\'' + cardId + '\', ' + offset + ')">🗑️</button></div>';
                });
            }
            html += '</div>';
            html += '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">';
            html += '<button class="btn btn-success" onclick="smartwallet.payInvoice(\'' + cardId + '\')">💰 Pagar Fatura</button>';
            html += '<button class="btn btn-secondary" onclick="closeInvoiceModal()">Fechar</button></div>';
            document.getElementById('invoiceContent').innerHTML = html;
            document.getElementById('invoiceModal').classList.add('active');
        }
        navigateInvoice(direction) {
            if (!this.currentInvoiceCardId) return;
            this.currentInvoiceOffset += direction;
            this.openInvoice(this.currentInvoiceCardId, this.currentInvoiceOffset);
        }
        payInvoice(cardId) {
            const card = this.getCardById(cardId);
            if (!card) return;
            const period = this.getInvoicePeriod(card);
            const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
            const total = this.calculateInvoiceTotal(purchases);
            if (total <= 0) { this.showToast('Fatura sem valor'); return; }
            if (!confirm('Pagar fatura de ' + this.formatCurrency(total) + '?')) return;
            this.transactions.push({
                id: this.generateUniqueId(), date: new Date().toISOString().split('T')[0],
                amount: -total, category: 'servicos', description: 'Pagamento Fatura ' + card.name,
                statusOk: false, paymentMethod: 'pix', accountId: ''
            });
            this.clearCache(); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
            this.showToast('Pagamento registrado!');
        }
        exportInvoiceCSV(cardId) {
            const card = this.getCardById(cardId);
            if (!card) return;
            const period = this.getInvoicePeriod(card);
            const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
            const self = this;
            let csv = '\ufeff' + this.t('invoice') + ' - ' + card.name + '\n';
            csv += this.t('invoicePeriod') + ': ' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' a ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '\n';
            csv += this.t('dueDate') + ': ' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '\n\n';
            csv += this.t('date') + ';' + this.t('description') + ';' + this.t('category') + ';' + this.t('value') + '\n';
            purchases.forEach(p => {
                const cat = self.getCategoryById(p.category);
                csv += p.date + ';"' + (p.description || '').replace(/"/g,'""') + '";"' + cat.name + '";' + Math.abs(p.amount).toFixed(2) + '\n';
            });
            const total = this.calculateInvoiceTotal(purchases);
            csv += '\n' + this.t('invoiceTotal') + ';;;' + total.toFixed(2) + '\n';
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const fileName = this.generateTimestamp() + '_fatura_' + card.name.replace(/\s+/g,'_') + '.csv';
            saveFileWithPicker(blob, fileName, 'text/csv').then(result => {
                if (result === 'saved' || result === 'downloaded') this.showToast(this.t('backupExported'));
            }).catch(e => this.showToast('❌ ' + e.message));
        }
        printInvoicePDF(cardId) {
            const card = this.getCardById(cardId);
            if (!card) return;
            const period = this.getInvoicePeriod(card);
            const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
            const total = this.calculateInvoiceTotal(purchases);
            const self = this;
            const printWindow = window.open('', '_blank');
            if (!printWindow) { alert(this.t('allowPopups')); return; }
            const rows = purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).map(p => {
                const cat = self.getCategoryById(p.category);
                return '<tr><td>' + self.formatDate(p.date) + '</td><td>' + self.escapeHtml(p.description) + '</td><td>' + self.escapeHtml(cat.name) + '</td><td style="text-align:right;">' + self.formatCurrency(Math.abs(p.amount)) + '</td></tr>';
            }).join('');
            const fileName = this.generateTimestamp() + '_fatura_' + card.name.replace(/\s+/g,'_') + '.pdf';
            printWindow.document.write('<!DOCTYPE html><html><head><title>' + fileName + '</title><style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;}.header{border-bottom:3px solid #6366f1;padding-bottom:20px;margin-bottom:30px;}.header h1{color:#6366f1;margin:0 0 5px 0;}table{width:100%;border-collapse:collapse;}th,td{padding:10px;text-align:left;border-bottom:1px solid #e5e7eb;}th{background:#f1f5f9;}.total{font-weight:700;font-size:1.2rem;}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #6366f1;font-size:0.85rem;color:#64748b;text-align:center;}@media print{body{padding:20px;}}</style></head><body>');
            printWindow.document.write('<div class="header"><h1>Fatura - ' + this.escapeHtml(card.name) + '</h1><div style="color:#64748b;">' + this.escapeHtml(card.brand) + ' •••• ' + this.escapeHtml(card.last4 || '****') + '</div></div>');
            printWindow.document.write('<p><strong>Período:</strong> ' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' a ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '</p>');
            printWindow.document.write('<p><strong>Vencimento:</strong> ' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '</p>');
            printWindow.document.write('<table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th></tr></thead><tbody>' + rows + '</tbody>');
            printWindow.document.write('<tfoot><tr class="total"><td colspan="3" style="text-align:right;">TOTAL:</td><td>' + this.formatCurrency(total) + '</td></tr></tfoot></table>');
            printWindow.document.write('<div class="footer">Smart Wallet • Gerado em ' + new Date().toLocaleString(this.getLanguage()) + '<br>Idealizado por RogerElizar™</div>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.document.title = fileName;
            setTimeout(() => { printWindow.focus(); printWindow.print(); }, 300);
        }

        // ===== EXPORTAÇÕES =====
        exportCSV() {
            const mt = this.getMonthTransactions();
            if (!mt.length) { this.showToast(this.t('noTransactions')); return; }
            const self = this;
            let csv = '\ufeff' + this.t('monthlyStatement') + '\n';
            csv += this.t('period') + ': ' + this.formatMonthYear(this.currentMonth) + '\n\n';
            csv += this.t('date') + ';' + this.t('description') + ';' + this.t('category') + ';' +
                   this.t('type') + ';' + this.t('payment') + ';' + this.t('status') + ';' +
                   this.t('value') + '\n';
            mt.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(t => {
                const c = self.getCategoryById(t.category);
                const status = t.statusOk ? this.t('completed') : this.t('pending');
                const payment = self.getPaymentMethodName(t.paymentMethod);
                const type = t.amount > 0 ? this.t('income') : this.t('expense');
                csv += t.date + ';"' + (t.description || '').replace(/"/g,'""') + '";"' +
                       c.name + '";' + type + ';"' + payment + '";' + status + ';' +
                       Math.abs(t.amount).toFixed(2) + '\n';
            });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const fileName = this.generateTimestamp() + '_extrato_' + this.formatMonthYear(this.currentMonth) + '.csv';
            saveFileWithPicker(blob, fileName, 'text/csv').then(result => {
                if (result === 'saved' || result === 'downloaded') this.showToast(this.t('backupExported'));
            }).catch(e => this.showToast('❌ ' + e.message));
            closeExportModal();
        }
        printExtratoPDF() {
            const filtered = this.getFilteredTransactions();
            if (!filtered.length) { this.showToast(this.t('noTransactions')); return; }
            const months = this.t('months');
            const period = months[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
            let totalReceitas = 0, totalDespesas = 0;
            const sorted = filtered.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
            sorted.forEach(t => {
                if (t.amount > 0) totalReceitas += t.amount;
                else totalDespesas += Math.abs(t.amount);
            });
            const saldo = totalReceitas - totalDespesas;
            const rowsHtml = sorted.map(t => {
                const cat = this.getCategoryById(t.category);
                const acc = this.accounts.find(a => a.id === t.accountId);
                return '<tr><td>' + this.formatDate(t.date) + '</td><td>' + this.escapeHtml(t.description || '-') + '</td>' +
                       '<td style="font-size:8pt;">' + this.escapeHtml(cat.name) + '</td><td>' + (acc ? this.escapeHtml(acc.name) : '-') + '</td>' +
                       '<td>' + this.getPaymentMethodName(t.paymentMethod).replace(/^[^\s]+\s/, '') + '</td>' +
                       '<td style="color:' + (t.statusOk ? '#10b981' : '#f59e0b') + ';font-weight:600;">' + (t.statusOk ? this.t('completed') : this.t('pending')) + '</td>' +
                       '<td style="color:' + (t.amount >= 0 ? '#10b981' : '#ef4444') + ';font-weight:600;text-align:right;">' + this.formatCurrency(t.amount) + '</td></tr>';
            }).join('');
            const fileName = this.generateTimestamp() + '_extrato_' + period.replace(/ /g,'_') + '.pdf';
            const html = '<!DOCTYPE html><html lang="' + this.getLanguage() + '"><head><meta charset="UTF-8"><title>' + fileName + '</title><style>@page { size: A4; margin: 2cm; }body { font-family: Arial, sans-serif; color: #1e293b; padding: 20px; max-width: 900px; margin: 0 auto; }.header { text-align: center; border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }.header h1 { color: #6366f1; font-size: 28pt; margin: 0 0 8px 0; }table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 9pt; }th { background: #6366f1; color: white; padding: 10px 8px; text-align: left; font-weight: 600; }td { padding: 8px; border-bottom: 1px solid #e5e7eb; }tr:nth-child(even) { background: #f8fafc; }.summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }.summary-box { background: #f8fafc; border-radius: 8px; padding: 16px; text-align: center; border: 2px solid #e5e7eb; }.summary-box .label { font-size: 9pt; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }.summary-box .value { font-size: 16pt; font-weight: bold; }.summary-box.receitas .value { color: #10b981; }.summary-box.despesas .value { color: #ef4444; }.summary-box.saldo .value { color: #6366f1; }.footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #6366f1; text-align: center; font-size: 9pt; color: #64748b; }.no-print { text-align:center; margin-top:24px; }@media print { body { padding: 0; } .no-print { display: none; } }</style></head><body><div class="header"><h1>Smart Wallet</h1><p style="color:#64748b;">' + this.t('appSubtitle') + '</p><p style="color:#6366f1;font-size:14pt;font-weight:bold;margin:12px 0 0 0;">' + this.t('monthlyStatement') + ': ' + period + '</p></div><table><thead><tr><th>' + this.t('date') + '</th><th>' + this.t('description') + '</th><th>' + this.t('category') + '</th><th>' + this.t('account') + '</th><th>' + this.t('payment') + '</th><th>' + this.t('status') + '</th><th style="text-align:right;">' + this.t('value') + '</th></tr></thead><tbody>' + rowsHtml + '</tbody></table><div class="summary"><div class="summary-box receitas"><div class="label">' + this.t('income') + '</div><div class="value">' + this.formatCurrency(totalReceitas) + '</div></div><div class="summary-box despesas"><div class="label">' + this.t('expenses') + '</div><div class="value">' + this.formatCurrency(totalDespesas) + '</div></div><div class="summary-box saldo"><div class="label">' + this.t('unifiedBalance') + '</div><div class="value">' + this.formatCurrency(saldo) + '</div></div></div><div class="footer"><p>Smart Wallet - ' + this.t('appSubtitle') + '</p><p style="font-weight:600;color:#6366f1;margin-top:6px;">Idealizado por RogerElizar™ | rogerelizar@gmail.com</p></div><div class="no-print"><button onclick="window.print()" style="background:#6366f1;color:white;border:none;padding:12px 24px;border-radius:8px;font-size:11pt;cursor:pointer;">🖨️ ' + this.t('printPDF') + '</button></div></body></html>';
            const printWindow = window.open('', '_blank');
            if (!printWindow) { alert(this.t('allowPopups')); return; }
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.document.title = fileName;
            setTimeout(() => { printWindow.focus(); printWindow.print(); }, 300);
        }
        exportBackup() {
            try {
                const backup = {
                    version: '4.2.1', exportDate: new Date().toISOString(),
                    appName: 'Smart Wallet', language: this.getLanguage(),
                    currency: this.getCurrency(), transactions: this.transactions,
                    categories: this.categories, accounts: this.accounts,
                    cards: this.cards, investments: this.investments,
                    darkMode: this.darkMode, privacyOn: this.privacyOn
                };
                const jsonString = JSON.stringify(backup, null, 2);
                const blob = new Blob(['\ufeff' + jsonString], { type: 'application/json;charset=utf-8' });
                const fileName = this.generateTimestamp() + '_backup.json';
                saveFileWithPicker(blob, fileName, 'application/json').then(result => {
                    if (result === 'saved' || result === 'downloaded') this.showToast(this.t('backupExported'));
                }).catch(e => this.showToast('❌ ' + e.message));
                document.getElementById('mainMenu').classList.remove('active');
            } catch (e) {
                this.showToast('❌ Erro: ' + e.message);
            }
        }
        importBackup() {
            if (!window._pendingBackupData) { this.showToast('⚠️ Selecione um arquivo'); return; }
            try {
                let cleanData = window._pendingBackupData;
                if (cleanData.charCodeAt(0) === 0xFEFF) cleanData = cleanData.substring(1);
                cleanData = cleanData.trim();
                if (!cleanData) { this.showToast('⚠️ Arquivo vazio!'); return; }
                const data = JSON.parse(cleanData);
                if (!data || typeof data !== 'object') { this.showToast('❌ Estrutura inválida'); return; }
                const transactions = Array.isArray(data.transactions) ? data.transactions : [];
                const categories = Array.isArray(data.categories) ? data.categories : this.categories;
                const accounts = Array.isArray(data.accounts) ? data.accounts : [];
                const cards = Array.isArray(data.cards) ? data.cards : [];
                const investments = Array.isArray(data.investments) ? data.investments : [];
                if (!confirm('⚠️ Substituir TODOS os dados?')) return this.showToast('Cancelado');
                this.transactions = transactions;
                this.categories = categories;
                this.accounts = accounts;
                this.cards = cards;
                this.investments = investments;
                if (typeof data.darkMode === 'boolean') this.darkMode = data.darkMode;
                if (typeof data.privacyOn === 'boolean') this.privacyOn = data.privacyOn;
                if (typeof data.language === 'string') localStorage.setItem('smartwallet_language', data.language);
                if (typeof data.currency === 'string') localStorage.setItem('smartwallet_currency', data.currency);
                this.clearCache(); this.saveTransactions(); this.saveCategories();
                this.saveAccounts(); this.saveCards(); this.saveInvestments();
                localStorage.setItem('smartwallet_dark', this.darkMode);
                localStorage.setItem('smartwallet_privacy', this.privacyOn);
                this.populateCategorySelects(); this.populatePaymentMethodSelects();
                this.populateAccountSelects(); this.applyTheme(); this.applyPrivacy();
                this.applyLanguage(); this.applyCurrency();
                this.render(); this.updateCharts(); this.updateAlertBadge();
                closeImportBackupModal();
                this.showToast('✅ Backup restaurado!');
                window._pendingBackupData = null;
            } catch (e) {
                this.showToast('⚠️ Erro: ' + e.message);
            }
        }
        importCSV() {
            if (!window._pendingCsvData) { this.showToast('Selecione um arquivo CSV'); return; }
            const replace = document.getElementById('csvReplaceData').checked;
            const lines = window._pendingCsvData.split(/\r?\n/).filter(l => l.trim());
            if (lines.length < 2) { this.showToast('CSV vazio ou inválido'); return; }
            const header = lines[0].toLowerCase();
            if (header.indexOf('data') === -1 || header.indexOf('valor') === -1) {
                this.showToast('Formato CSV inválido'); return;
            }
            const self = this;
            const transactionsToAdd = [];
            let skipped = 0;
            for (let i = 1; i < lines.length; i++) {
                const cols = this.parseCSVLine(lines[i]);
                if (cols.length < 6) { skipped++; continue; }
                const [date, desc, catName, tipo, payment, status, valor] = cols;
                if (!date || !valor) { skipped++; continue; }
                const category = this.findCategoryByName(catName);
                const amount = parseFloat(valor.replace(',', '.'));
                if (isNaN(amount)) { skipped++; continue; }
                const signedAmount = tipo.toLowerCase().indexOf('despesa') !== -1 ? -Math.abs(amount) : Math.abs(amount);
                let paymentMethod = 'pix';
                const payLower = (payment || '').toLowerCase();
                if (payLower.indexOf('pix') !== -1) paymentMethod = 'pix';
                else if (payLower.indexOf('debit') !== -1 || payLower.indexOf('débito') !== -1) paymentMethod = 'debit';
                else if (payLower.indexOf('auto') !== -1) paymentMethod = 'auto';
                else if (payLower.indexOf('transf') !== -1) paymentMethod = 'transfer';
                transactionsToAdd.push({
                    id: this.generateUniqueId(), date, amount: signedAmount,
                    category: category ? category.id : '', description: desc,
                    statusOk: status.toLowerCase().indexOf('conclu') !== -1,
                    paymentMethod, accountId: ''
                });
            }
            if (replace) {
                const m = this.currentMonth.getMonth(), y = this.currentMonth.getFullYear();
                this.transactions = this.transactions.filter(t => {
                    const d = new Date(t.date + 'T12:00:00');
                    return !(d.getMonth() === m && d.getFullYear() === y);
                });
            }
            this.transactions = this.transactions.concat(transactionsToAdd);
            this.clearCache(); this.saveTransactions(); this.render();
            this.updateCharts(); this.updateAlertBadge();
            closeImportCsvModal();
            this.showToast(transactionsToAdd.length + ' transações importadas!' + (skipped > 0 ? ' (' + skipped + ' ignoradas)' : ''));
            window._pendingCsvData = null;
        }
        parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const c = line[i];
                if (c === '"') {
                    if (inQuotes && line[i+1] === '"') { current += '"'; i++; }
                    else { inQuotes = !inQuotes; }
                } else if (c === ';' && !inQuotes) {
                    result.push(current.trim());
                    current = '';
                } else {
                    current += c;
                }
            }
            result.push(current.trim());
            return result;
        }
        clearAllData() {
            this.transactions = [];
            this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
            this.accounts = [];
            this.cards = [];
            this.investments = [];
            this.clearCache();
            this.saveTransactions(); this.saveCategories(); this.saveAccounts();
            this.saveCards(); this.saveInvestments();
            this.populateCategorySelects(); this.populatePaymentMethodSelects();
            this.populateAccountSelects(); this.render(); this.updateCharts();
            this.updateAlertBadge();
            closeClearDataModal();
            this.showToast('🗑️ Dados apagados!');
        }

        // ===== CONTAS =====
        saveAccount() {
            const id = document.getElementById('accountEditId').value;
            const name = document.getElementById('accountName').value.trim();
            const type = document.getElementById('accountType').value;
            const balance = parseFloat(document.getElementById('accountBalance').value) || 0;
            const color = document.getElementById('accountColor').value;
            if (!name) { this.showToast('Informe o nome'); return; }
            if (id) {
                for (let i = 0; i < this.accounts.length; i++) {
                    if (this.accounts[i].id === id) {
                        this.accounts[i] = { id, name, type, balance, color };
                        break;
                    }
                }
            } else {
                this.accounts.push({ id: this.generateUniqueId(), name, type, balance, color });
            }
            this.clearCache(); this.saveAccounts();
            this.populateAccountSelects(); this.renderAccountsList(); this.render();
            closeNewAccountModal();
            this.showToast(id ? 'Conta atualizada!' : 'Conta cadastrada!');
        }
        deleteAccount(id) {
            if (!confirm('Excluir esta conta?')) return;
            this.accounts = this.accounts.filter(a => a.id !== id);
            this.clearCache(); this.saveAccounts();
            this.populateAccountSelects(); this.renderAccountsList(); this.render();
            this.showToast('Conta removida!');
        }
        editAccount(id) {
            let acc = null;
            for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].id === id) { acc = this.accounts[i]; break; }
            }
            if (!acc) return;
            document.getElementById('accountEditId').value = acc.id;
            document.getElementById('accountName').value = acc.name;
            document.getElementById('accountType').value = acc.type;
            document.getElementById('accountBalance').value = acc.balance;
            document.getElementById('accountColor').value = acc.color;
            document.getElementById('newAccountTitle').textContent = 'Editar Conta';
            document.getElementById('newAccountModal').classList.add('active');
        }
        renderAccountsList() {
            const container = document.getElementById('accountsList');
            if (!container) return;
            if (!this.accounts.length) {
                container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">🏦</div><h3>Nenhuma conta cadastrada</h3></div>';
                return;
            }
            const self = this;
            container.innerHTML = '<div class="accounts-grid">' + this.accounts.map(acc => {
                let investmentsHtml = '';
                if (acc.type === 'investment') {
                    const linkedInvestments = self.investments.filter(inv => inv.accountId === acc.id);
                    if (linkedInvestments.length > 0) {
                        investmentsHtml = '<div style="margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.2); font-size:0.85rem;">';
                        investmentsHtml += '<div style="opacity:0.9; margin-bottom:6px;">📊 Aplicações vinculadas:</div>';
                        linkedInvestments.forEach(inv => {
                            const typeLabels = { cdb: 'CDB', tesouro: 'Tesouro', lci: 'LCI/LCA', fundo: 'Fundo', acao: 'Ações', fiis: 'FIIs', poupanca: 'Poupança', outro: 'Outro' };
                            investmentsHtml += '<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>' + (typeLabels[inv.type] || inv.type) + ': ' + self.escapeHtml(inv.name) + '</span><span>' + self.formatCurrency(inv.current) + '</span></div>';
                        });
                        investmentsHtml += '</div>';
                    }
                }
                return '<div class="account-card" style="background:linear-gradient(135deg, ' + acc.color + ' 0%, ' + self.adjustColor(acc.color, -30) + ' 100%);"><div class="account-card-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editAccount(\'' + acc.id + '\')">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteAccount(\'' + acc.id + '\')">🗑️</button></div><div class="account-card-header"><div class="account-card-type">' + (acc.type === 'checking' ? '💳 Conta Corrente' : '📈 Investimento') + '</div></div><div class="account-card-name">' + self.escapeHtml(acc.name) + '</div><div class="account-card-balance">' + self.formatCurrency(acc.balance) + '</div>' + investmentsHtml + '</div>';
            }).join('') + '</div>';
        }

        // ===== BILLS =====
        renderBillsModal() {
            const container = document.getElementById('billsList');
            if (!container) return;
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const in3Days = new Date(today); in3Days.setDate(in3Days.getDate() + 3);
            const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
            const self = this;
            const bills = this.transactions.filter(t => {
                if (t.statusOk || t.amount >= 0) return false;
                const tDate = new Date(t.date + 'T12:00:00');
                return tDate <= in3Days;
            }).sort((a, b) => new Date(a.date) - new Date(b.date));
            const closingAlerts = [];
            this.cards.forEach(card => {
                const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                const closingDay = Math.min(card.closingDay, lastDayOfMonth);
                const closingDate = new Date(today.getFullYear(), today.getMonth(), closingDay);
                closingDate.setHours(0, 0, 0, 0);
                if (closingDate.getTime() === tomorrow.getTime()) {
                    closingAlerts.push({
                        card: card, closingDate: closingDate,
                        message: 'O cartão ' + card.name + ' fecha amanhã!'
                    });
                }
            });
            if (bills.length === 0 && closingAlerts.length === 0) {
                container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px;">✅</div><h3>Nenhuma conta pendente!</h3></div>';
                return;
            }
            let total = 0;
            bills.forEach(b => total += Math.abs(b.amount));
            let html = '';
            if (closingAlerts.length > 0) {
                html += '<div style="margin-bottom: 20px;">';
                html += '<h3 style="color: var(--accent-color); margin-bottom: 12px; font-size: 1.1rem;">🔔 Fechamento de Fatura</h3>';
                closingAlerts.forEach(alert => {
                    html += '<div class="bill-item closing-alert">';
                    html += '<div class="bill-info"><div class="bill-desc">💳 ' + self.escapeHtml(alert.message) + '</div>';
                    html += '<div class="bill-meta"><span>📅 Fechamento: ' + self.formatDate(alert.closingDate.toISOString().split('T')[0]) + '</span></div></div>';
                    html += '<div style="display:flex; gap:4px;">';
                    html += '<button class="btn btn-secondary btn-small" onclick="openCreditCardsModal(); closeBillsModal();">Ver Cartão</button></div></div>';
                });
                html += '</div>';
            }
            if (bills.length > 0) {
                html += '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">';
                html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total de contas</span><span style="font-weight:600;">' + bills.length + '</span></div>';
                html += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700; font-size:1.1rem;"><span>Total a pagar</span><span style="color:var(--danger-color);">' + self.formatCurrency(total) + '</span></div></div>';
                bills.forEach(bill => {
                    const cat = self.getCategoryById(bill.category);
                    const billDate = new Date(bill.date + 'T12:00:00');
                    const diffDays = Math.round((billDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    let daysClass = 'warning', daysText = '', itemClass = '';
                    if (diffDays < 0) { daysClass = 'overdue'; daysText = Math.abs(diffDays) + 'd atrasada'; itemClass = 'overdue'; }
                    else if (diffDays === 0) { daysClass = 'urgent'; daysText = 'Vence hoje'; itemClass = 'urgent'; }
                    else if (diffDays === 1) { daysClass = 'urgent'; daysText = 'Vence amanhã'; itemClass = 'urgent'; }
                    else { daysText = 'Em ' + diffDays + ' dias'; }
                    html += '<div class="bill-item ' + itemClass + '"><div class="bill-info"><div class="bill-desc">' + self.escapeHtml(bill.description) + '<span class="bill-days ' + daysClass + '">' + daysText + '</span></div><div class="bill-meta"><span>📅 ' + self.formatDate(bill.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeHtml(cat.name) + '</span></div></div><div class="bill-amount">' + self.formatCurrency(Math.abs(bill.amount)) + '</div><div style="display:flex; gap:4px;"><button class="btn btn-success btn-small" onclick="smartwallet.markBillAsPaid(\'' + bill.id + '\')">✓</button><button class="btn btn-secondary btn-small" onclick="smartwallet.editTransaction(\'' + bill.id + '\'); closeBillsModal();">✏️</button></div></div>';
                });
            }
            container.innerHTML = html;
        }
        markBillAsPaid(id) {
            for (let i = 0; i < this.transactions.length; i++) {
                if (this.transactions[i].id === id) {
                    this.transactions[i].statusOk = true;
                    break;
                }
            }
            this.clearCache(); this.saveTransactions(); this.render();
            this.updateAlertBadge(); this.renderBillsModal();
            this.showToast('✓ Conta paga!');
        }
		        // ===== INVESTIMENTOS =====
        updateInvestmentChart() {
            const section = document.getElementById('investmentsChartSection');
            if (!section) return;
            if (!this.investments.length) { section.style.display = 'none'; return; }
            section.style.display = 'block';
            const colors = this.getChartColors();
            const now = new Date();
            const monthlyData = {};
            for (let i = 5; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
                monthlyData[key] = { invested: 0, current: 0 };
            }
            const self = this;
            this.investments.forEach(inv => {
                const invDate = new Date(inv.date + 'T12:00:00');
                const invKey = invDate.getFullYear() + '-' + String(invDate.getMonth() + 1).padStart(2, '0');
                Object.keys(monthlyData).forEach(key => {
                    if (key >= invKey) monthlyData[key].invested += inv.initial;
                });
                const currentKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
                if (monthlyData[currentKey]) monthlyData[currentKey].current += inv.current;
            });
            const labels = [], investedData = [], currentData = [], profitPctData = [];
            Object.keys(monthlyData).forEach(key => {
                const d = new Date(key + '-01');
                const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                labels.push(monthNames[d.getMonth()] + '/' + d.getFullYear());
                const invested = monthlyData[key].invested;
                const current = monthlyData[key].current || invested;
                investedData.push(invested);
                currentData.push(current);
                profitPctData.push(invested > 0 ? ((current - invested) / invested * 100) : 0);
            });
            if (!this.charts.invest) {
                const canvas = document.getElementById('investChart');
                if (!canvas) return;
                this.charts.invest = new Chart(canvas.getContext('2d'), {
                    type: 'line',
                    data: { labels, datasets: [
                        { label: 'Investido', data: investedData, borderColor: '#94a3b8', backgroundColor: 'rgba(148,163,184,0.1)', tension: 0.4, fill: false, yAxisID: 'y' },
                        { label: 'Atual', data: currentData, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4, fill: true, yAxisID: 'y' },
                        { label: 'Rendimento (%)', data: profitPctData, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', tension: 0.4, fill: false, yAxisID: 'y1' }
                    ]},
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { position: 'top', labels: { color: colors.text } } },
                        scales: {
                            y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                            y1: { position: 'right', ticks: { color: colors.textSecondary, callback: v => v + '%' }, grid: { display: false } },
                            x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                        }
                    }
                });
            } else {
                this.charts.invest.data.labels = labels;
                this.charts.invest.data.datasets[0].data = investedData;
                this.charts.invest.data.datasets[1].data = currentData;
                this.charts.invest.data.datasets[2].data = profitPctData;
                this.charts.invest.update();
            }
            const summaryEl = document.getElementById('investSummary');
            if (summaryEl) {
                let totalInitial = 0, totalCurrent = 0;
                this.investments.forEach(inv => { totalInitial += inv.initial; totalCurrent += inv.current; });
                const totalProfit = totalCurrent - totalInitial;
                const totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0;
                summaryEl.innerHTML = '<div class="investment-summary"><h3>📊 Resumo</h3><div class="investment-summary-grid"><div class="investment-summary-item"><div class="investment-summary-label">Total Investido</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div><div class="investment-summary-item"><div class="investment-summary-label">Valor Atual</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div><div class="investment-summary-item"><div class="investment-summary-label">Rendimento</div><div class="investment-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div></div></div>';
            }
        }
        saveInvestment() {
            const id = document.getElementById('investmentEditId').value;
            const name = document.getElementById('investmentName').value.trim();
            const type = document.getElementById('investmentType').value;
            const initial = parseFloat(document.getElementById('investmentInitial').value) || 0;
            const current = parseFloat(document.getElementById('investmentCurrent').value) || 0;
            const date = document.getElementById('investmentDate').value;
            const rate = parseFloat(document.getElementById('investmentRate').value) || 0;
            const selectedAccountId = document.getElementById('investmentAccount').value;
            const createLinked = document.getElementById('createLinkedAccount').checked;
            if (!name) { this.showToast('Informe o nome'); return; }
            let accountId = selectedAccountId;
            if (!accountId && createLinked) {
                const newAccountId = this.generateUniqueId();
                this.accounts.push({ id: newAccountId, name: name, type: 'investment', balance: current, color: '#10b981' });
                accountId = newAccountId;
                this.saveAccounts();
                this.populateAccountSelects();
            }
            if (id) {
                for (let i = 0; i < this.investments.length; i++) {
                    if (this.investments[i].id === id) {
                        this.investments[i] = { id, name, type, initial, current, date, rate, accountId };
                        break;
                    }
                }
            } else {
                this.investments.push({ id: this.generateUniqueId(), name, type, initial, current, date, rate, accountId });
            }
            if (accountId) {
                for (let i = 0; i < this.accounts.length; i++) {
                    if (this.accounts[i].id === accountId) { this.accounts[i].balance = current; break; }
                }
                this.saveAccounts();
            }
            this.clearCache(); this.saveInvestments();
            this.renderInvestmentsModal(); this.updateInvestmentChart();
            this.renderAccountsList(); this.updateDashboard();
            closeNewInvestmentModal();
            this.showToast(id ? 'Aplicação atualizada!' : 'Aplicação cadastrada!');
        }
        deleteInvestment(id) {
            if (!confirm('Excluir esta aplicação?')) return;
            this.investments = this.investments.filter(i => i.id !== id);
            this.clearCache(); this.saveInvestments();
            this.renderInvestmentsModal(); this.updateInvestmentChart();
            this.showToast('Aplicação excluída!');
        }
        editInvestment(id) {
            let inv = null;
            for (let i = 0; i < this.investments.length; i++) {
                if (this.investments[i].id === id) { inv = this.investments[i]; break; }
            }
            if (!inv) return;
            document.getElementById('investmentEditId').value = inv.id;
            document.getElementById('investmentName').value = inv.name;
            document.getElementById('investmentType').value = inv.type;
            document.getElementById('investmentInitial').value = inv.initial;
            document.getElementById('investmentCurrent').value = inv.current;
            document.getElementById('investmentDate').value = inv.date;
            document.getElementById('investmentRate').value = inv.rate;
            document.getElementById('newInvestmentTitle').textContent = 'Editar Aplicação';
            document.getElementById('newInvestmentModal').classList.add('active');
        }
        openUpdateInvestment(id) {
            let inv = null;
            for (let i = 0; i < this.investments.length; i++) {
                if (this.investments[i].id === id) { inv = this.investments[i]; break; }
            }
            if (!inv) return;
            document.getElementById('updateInvestmentId').value = inv.id;
            document.getElementById('updateInvestmentName').textContent = inv.name;
            document.getElementById('updateInvestmentValue').value = inv.current;
            document.getElementById('updateInvestmentDate').value = new Date().toISOString().split('T')[0];
            document.getElementById('updateInvestmentModal').classList.add('active');
        }
        updateInvestmentValue() {
            const id = document.getElementById('updateInvestmentId').value;
            const newValue = parseFloat(document.getElementById('updateInvestmentValue').value) || 0;
            for (let i = 0; i < this.investments.length; i++) {
                if (this.investments[i].id === id) {
                    this.investments[i].current = newValue;
                    if (this.investments[i].accountId) {
                        for (let j = 0; j < this.accounts.length; j++) {
                            if (this.accounts[j].id === this.investments[i].accountId) {
                                this.accounts[j].balance = newValue;
                                break;
                            }
                        }
                        this.saveAccounts();
                        this.renderAccountsList();
                    }
                    break;
                }
            }
            this.clearCache(); this.saveInvestments();
            this.renderInvestmentsModal(); this.updateInvestmentChart();
            this.updateDashboard();
            closeUpdateInvestmentModal();
            this.showToast('Valor atualizado!');
        }
        renderInvestmentsModal() {
            const container = document.getElementById('investmentsContent');
            if (!container) return;
            const self = this;
            const typeLabels = { cdb: 'CDB', tesouro: 'Tesouro', lci: 'LCI/LCA', fundo: 'Fundo', acao: 'Ações', fiis: 'FIIs', poupanca: 'Poupança', outro: 'Outro' };
            if (!this.investments.length) {
                container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">📈</div><h3>Nenhuma aplicação cadastrada</h3></div>';
                return;
            }
            let totalInitial = 0, totalCurrent = 0;
            let html = '<div>';
            this.investments.forEach(inv => {
                const profit = inv.current - inv.initial;
                const profitPct = inv.initial > 0 ? (profit / inv.initial * 100) : 0;
                totalInitial += inv.initial;
                totalCurrent += inv.current;
                let accountInfo = '';
                if (inv.accountId) {
                    const linkedAccount = self.accounts.find(a => a.id === inv.accountId);
                    if (linkedAccount) accountInfo = ' • 🏦 ' + self.escapeHtml(linkedAccount.name);
                }
                html += '<div class="investment-card"><div class="investment-card-header"><div><div class="investment-card-title">' + self.escapeHtml(inv.name) + '</div><div class="investment-card-type">' + (typeLabels[inv.type] || inv.type) + ' • ' + self.formatDate(inv.date) + accountInfo + '</div></div><div class="investment-card-actions"><button class="btn btn-secondary btn-small" onclick="smartwallet.openUpdateInvestment(\'' + inv.id + '\')">💰</button><button class="btn btn-secondary btn-small" onclick="smartwallet.editInvestment(\'' + inv.id + '\')">✏️</button><button class="btn btn-danger btn-small" onclick="smartwallet.deleteInvestment(\'' + inv.id + '\')">🗑️</button></div></div><div class="investment-card-values"><div class="investment-value-item"><div class="investment-value-label">Inicial</div><div class="investment-value-amount privacy-value">' + self.formatCurrency(inv.initial) + '</div></div><div class="investment-value-item"><div class="investment-value-label">Atual</div><div class="investment-value-amount privacy-value">' + self.formatCurrency(inv.current) + '</div></div><div class="investment-value-item"><div class="investment-value-label">Rendimento</div><div class="investment-value-amount privacy-value ' + (profit >= 0 ? 'positive' : 'negative') + '">' + profitPct.toFixed(2) + '% (' + self.formatCurrency(profit) + ')</div></div></div>';
                if (inv.rate > 0) html += '<div style="font-size:0.85rem; color:var(--text-secondary);" class="privacy-value">Taxa: ' + inv.rate + '% ao ano</div>';
                html += '</div>';
            });
            html += '</div>';
            const totalProfit = totalCurrent - totalInitial;
            const totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0;
            html += '<div class="investment-summary"><h3>📊 Resumo Geral</h3><div class="investment-summary-grid"><div class="investment-summary-item"><div class="investment-summary-label">Investido</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div><div class="investment-summary-item"><div class="investment-summary-label">Atual</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div><div class="investment-summary-item"><div class="investment-summary-label">Rendimento</div><div class="investment-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div></div></div>';
            container.innerHTML = html;
        }

        // ===== ORÇAMENTO POR CATEGORIA =====
        renderCategoryBudget() {
            const container = document.getElementById('categoryBudgetContent');
            if (!container) return;
            const self = this;
            const currentMonthExpenses = this.getMonthTransactions().filter(t => t.amount < 0);
            const categoryTotals = {};
            currentMonthExpenses.forEach(t => {
                if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
                categoryTotals[t.category] += Math.abs(t.amount);
            });
            const last3Months = [];
            for (let i = 1; i <= 3; i++) {
                const d = new Date(this.currentMonth);
                d.setMonth(d.getMonth() - i);
                last3Months.push(d);
            }
            const categoryAverages = {};
            last3Months.forEach(monthDate => {
                const monthTrans = this.getMonthTransactions(monthDate).filter(t => t.amount < 0);
                monthTrans.forEach(t => {
                    if (!categoryAverages[t.category]) categoryAverages[t.category] = [];
                    categoryAverages[t.category].push(Math.abs(t.amount));
                });
            });
            Object.keys(categoryAverages).forEach(catId => {
                const values = categoryAverages[catId];
                const sum = values.reduce((a, b) => a + b, 0);
                categoryAverages[catId] = sum / values.length;
            });
            let html = '<div style="margin-bottom: 20px; padding: 16px; background: var(--glass-bg); border-radius: 14px;"><p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">📊 Comparativo com a média dos últimos 3 meses</p></div>';
            let html2 = '<div>';
            const sortedCategories = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a]);
            sortedCategories.forEach(catId => {
                const category = self.getCategoryById(catId);
                const currentAmount = categoryTotals[catId];
                const averageAmount = categoryAverages[catId] || 0;
                const percentage = averageAmount > 0 ? (currentAmount / averageAmount) * 100 : 0;
                let barClass = '';
                if (percentage > 100) barClass = 'danger';
                else if (percentage > 80) barClass = 'warning';
                html2 += '<div class="category-budget-item" style="border-left-color: ' + category.color + ';">';
                html2 += '<div class="category-budget-header"><div class="category-budget-name"><span style="width: 12px; height: 12px; background: ' + category.color + '; border-radius: 50%; display: inline-block;"></span>' + self.escapeHtml(category.name) + '</div><div class="category-budget-amount">' + self.formatCurrency(currentAmount) + '</div></div>';
                html2 += '<div class="category-budget-bar"><div class="category-budget-progress ' + barClass + '" style="width: ' + Math.min(percentage, 100) + '%"></div></div>';
                html2 += '<div class="category-budget-info"><span>' + percentage.toFixed(0) + '% da média</span><span>Média: ' + self.formatCurrency(averageAmount) + '</span></div>';
                if (averageAmount > 0) {
                    const diff = currentAmount - averageAmount;
                    const diffText = diff > 0 ? '+' + self.formatCurrency(diff) : self.formatCurrency(diff);
                    html2 += '<div class="category-budget-average" style="color: ' + (diff > 0 ? 'var(--danger-color)' : 'var(--success-color)') + ';">' + (diff > 0 ? '⬆️' : '⬇️') + ' ' + diffText + ' vs média</div>';
                }
                html2 += '</div>';
            });
            html2 += '</div>';
            if (Object.keys(categoryTotals).length === 0) {
                html2 = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);"><div style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;">📊</div><h3>Nenhuma despesa este mês</h3></div>';
            }
            container.innerHTML = html + html2;
        }

        // ===== TRANSFERÊNCIA =====
        saveTransfer() {
            const fromId = document.getElementById('transferFrom').value;
            const toId = document.getElementById('transferTo').value;
            const amount = parseFloat(document.getElementById('transferAmount').value);
            const date = document.getElementById('transferDate').value;
            const description = document.getElementById('transferDescription').value || 'Transferência';
            if (!fromId || !toId) { this.showToast('Selecione as contas'); return; }
            if (fromId === toId) { this.showToast('Contas devem ser diferentes'); return; }
            if (isNaN(amount) || amount <= 0) { this.showToast('Valor inválido'); return; }
            if (!date) { this.showToast('Selecione uma data'); return; }
            const fromAcc = this.accounts.find(a => a.id === fromId);
            const toAcc = this.accounts.find(a => a.id === toId);
            if (!fromAcc || !toAcc) { this.showToast('Contas não encontradas'); return; }
            if (fromAcc.balance < amount) { this.showToast('Saldo insuficiente'); return; }
            fromAcc.balance -= amount;
            toAcc.balance += amount;
            this.transactions.push({
                id: this.generateUniqueId(), date: date, amount: -amount,
                category: 'reserva_aplicacao', description: description + ' (saída)',
                statusOk: true, paymentMethod: 'transfer', accountId: fromId
            });
            this.transactions.push({
                id: this.generateUniqueId(), date: date, amount: amount,
                category: 'resgate', description: description + ' (entrada)',
                statusOk: true, paymentMethod: 'transfer', accountId: toId
            });
            this.clearCache(); this.saveTransactions(); this.saveAccounts();
            this.render(); this.renderAccountsList(); this.updateDashboard();
            closeTransferModal();
            this.showToast('✅ Transferência realizada!');
        }

        // ===== SWIPE GESTURES =====
        initSwipeGestures() {
            const self = this;
            let touchStartX = 0, touchStartY = 0;
            let currentRow = null;
            let isSwiping = false;
            document.addEventListener('touchstart', function(e) {
                const row = e.target.closest('.transaction-row');
                if (!row) return;
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
                currentRow = row;
                isSwiping = false;
            }, { passive: true });
            document.addEventListener('touchmove', function(e) {
                if (!currentRow) return;
                const diffX = touchStartX - e.changedTouches[0].screenX;
                const diffY = Math.abs(touchStartY - e.changedTouches[0].screenY);
                if (Math.abs(diffX) > 30 && diffY < 50) {
                    isSwiping = true;
                    if (diffX < -30) {
                        currentRow.classList.add('swiping-right');
                        currentRow.classList.remove('swiping-left');
                    } else if (diffX > 30) {
                        currentRow.classList.add('swiping-left');
                        currentRow.classList.remove('swiping-right');
                    }
                }
            }, { passive: true });
            document.addEventListener('touchend', function(e) {
                if (!currentRow || !isSwiping) {
                    if (currentRow) currentRow.classList.remove('swiping-right', 'swiping-left');
                    currentRow = null;
                    return;
                }
                const diff = touchStartX - e.changedTouches[0].screenX;
                const id = currentRow.dataset.id;
                if (Math.abs(diff) > 80 && id) {
                    if (diff < -80) self.completeTransaction(id);
                    else if (diff > 80) self.deleteTransactionSwipe(id);
                } else {
                    currentRow.classList.remove('swiping-right', 'swiping-left');
                }
                currentRow = null;
                isSwiping = false;
            }, { passive: true });
        }
        completeTransaction(id) {
            const t = this.transactions.find(x => String(x.id) === String(id));
            if (t) {
                t.statusOk = true;
                this.clearCache(); this.saveTransactions();
                this.render(); this.updateAlertBadge();
                this.showToast('✅ Transação concluída!');
            }
        }
        deleteTransactionSwipe(id) {
            if (confirm('Excluir esta transação?')) {
                const t = this.transactions.find(x => String(x.id) === String(id));
                if (t && t.accountId) this.updateAccountBalance(t.accountId, -t.amount);
                this.transactions = this.transactions.filter(x => String(x.id) !== String(id));
                this.clearCache(); this.saveTransactions();
                this.render(); this.updateCharts(); this.updateAlertBadge();
                this.showToast('🗑️ Excluída!');
            }
        }

        // ===== IMPRESSÃO DO MANUAL =====
        printManual() {
            try {
                const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
                if (!printWindow) { alert('⚠️ Permita popups para imprimir.'); return; }
                const fileName = this.generateTimestamp() + '_manual_smart_wallet.pdf';
                const content = '<!DOCTYPE html><html lang="' + this.getLanguage() + '"><head><meta charset="UTF-8"><title>' + fileName + '</title><style>@page{size:A4;margin:2cm;}body{font-family:Georgia,serif;color:#1e293b;line-height:1.6;font-size:11pt;padding:20px;max-width:800px;margin:0 auto;}h1{color:#6366f1;font-size:28pt;text-align:center;}h2{color:#6366f1;font-size:16pt;margin-top:30px;border-bottom:2px solid #6366f1;padding-bottom:8px;}h3{color:#06b6d4;font-size:13pt;margin-top:20px;}p{margin-bottom:12px;}ul,ol{margin-left:24px;margin-bottom:16px;}li{margin-bottom:8px;}.manual-cover{text-align:center;padding:40px 20px;border:3px solid #6366f1;border-radius:16px;margin-bottom:30px;}.manual-quote{margin:24px 0;padding:20px 30px;border-left:4px solid #6366f1;background:#f8fafc;border-radius:8px;font-style:italic;}.quote-author{font-size:9pt;font-weight:600;color:#6366f1;text-align:right;margin-top:12px;font-style:normal;}.manual-blessing{text-align:center;margin-top:40px;padding:30px;background:#f8fafc;border-radius:16px;}.manual-tip,.manual-success,.manual-warning{padding:12px 16px;margin:12px 0;border-radius:8px;border-left:4px solid;}.manual-tip{background:rgba(6,182,212,0.1);border-color:#06b6d4;}.manual-success{background:rgba(16,185,129,0.1);border-color:#10b981;}.manual-warning{background:rgba(245,158,11,0.1);border-color:#f59e0b;}@media print{.manual-cover{page-break-after:always;}}</style></head><body>' + manualHTML + '</body></html>';
                printWindow.document.write(content);
                printWindow.document.close();
                printWindow.document.title = fileName;
                setTimeout(() => { printWindow.focus(); printWindow.print(); }, 500);
            } catch (e) {
                alert('❌ Erro: ' + e.message);
            }
        }

        // ===== SISTEMA DE ATUALIZAÇÃO =====
        checkVersionUpdate() {
            const CURRENT_VERSION = '4.2.1';
            const STORAGE_KEY = 'smartwallet_last_version';
            try {
                const lastVersion = localStorage.getItem(STORAGE_KEY);
                if (!lastVersion) {
                    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
                    return;
                }
                if (lastVersion !== CURRENT_VERSION) {
                    this.showWhatsNewModal(CURRENT_VERSION);
                    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
                }
            } catch (e) {}
        }
        showWhatsNewModal(version) {
            const WHATS_NEW_DATA = {
                '4.2.1': {
                    version: '4.2.1',
                    features: [
                        { type: 'new', icon: '💰', title: 'Saldo Atualizado em Tempo Real', description: 'Lançamentos agora debitam/creditam automaticamente nas contas. O saldo unificado reflete corretamente.' },
                        { type: 'new', icon: '📊', title: 'Histórico Ordenável', description: 'Clique nos cabeçalhos das colunas (Data, Descrição, Valor...) para ordenar. Receitas e despesas aparecem agrupadas.' },
                        { type: 'new', icon: '💳', title: 'Filtro de Cartão de Crédito', description: 'Novo filtro "Todos Cartões" no histórico do mês para ver transações de um cartão específico.' },
                        { type: 'improved', icon: '🎯', title: 'Descrição Reposicionada', description: 'O campo de descrição agora fica logo após a data, facilitando o preenchimento.' },
                        { type: 'improved', icon: '🔒', title: 'Focus Trap nos Modais', description: 'Ao abrir um modal, o fundo é bloqueado. TAB navega apenas dentro do modal. ESC fecha.' },
                        { type: 'improved', icon: '🎨', title: 'Menus Recolhem Outros', description: 'Ao abrir um menu dropdown, outros abertos são fechados automaticamente.' },
                        { type: 'improved', icon: '🖱️', title: 'Clicar fora não fecha modal', description: 'Modais agora só fecham com o botão X ou tecla ESC.' }
                    ]
                }
            };
            const data = WHATS_NEW_DATA[version];
            if (!data) return;
            const versionEl = document.getElementById('whatsNewVersion');
            if (versionEl) versionEl.textContent = data.version;
            const featuresContainer = document.getElementById('whatsNewFeatures');
            if (featuresContainer) {
                let html = '';
                data.features.forEach(feature => {
                    const badgeText = feature.type === 'new' ? 'NOVO' : feature.type === 'improved' ? 'MELHORADO' : 'CORRIGIDO';
                    html += '<div class="feature-item ' + feature.type + '"><div class="feature-icon">' + feature.icon + '</div><div class="feature-content"><h4>' + this.escapeHtml(feature.title) + ' <span class="feature-badge ' + feature.type + '">' + badgeText + '</span></h4><p>' + this.escapeHtml(feature.description) + '</p></div></div>';
                });
                featuresContainer.innerHTML = html;
            }
            document.getElementById('whatsNewModal').classList.add('active');
        }
    }

    // ===== INSTÂNCIA GLOBAL =====
    window.smartwallet = new SmartWallet();

    // ===== FUNÇÕES GLOBAIS =====
    window.selectTransactionType = function(t) {
        smartwallet.currentTransactionType = t;
        document.querySelectorAll('#transactionForm .type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-type') === t);
        });
        smartwallet.filterCategoriesByType('category', t);
    };
    window.selectEditType = function(t) {
        smartwallet.currentEditType = t;
        document.querySelectorAll('#editForm .type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-type') === t);
        });
        smartwallet.filterCategoriesByType('editCategory', t);
    };
    window.dashboardAction = function(action) {
        const typeFilter = document.getElementById('typeFilter');
        const statusFilter = document.getElementById('statusFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const accountFilter = document.getElementById('accountFilter');
        const cardFilter = document.getElementById('cardFilter');
        const searchFilter = document.getElementById('searchFilter');
        document.querySelectorAll('.card.clickable').forEach(c => c.classList.remove('active-filter'));
        switch(action) {
            case 'accounts': openAccountsModal(); break;
            case 'income':
                if (typeFilter) typeFilter.value = 'income';
                if (statusFilter) statusFilter.value = '';
                if (categoryFilter) categoryFilter.value = '';
                if (accountFilter) accountFilter.value = '';
                if (cardFilter) cardFilter.value = '';
                if (searchFilter) searchFilter.value = '';
                smartwallet.clearCache(); smartwallet.render(); smartwallet.saveFilters();
                document.querySelectorAll('.card.clickable')[1].classList.add('active-filter');
                scrollToTransactions(); break;
            case 'expense':
                if (typeFilter) typeFilter.value = 'expense';
                if (statusFilter) statusFilter.value = '';
                if (categoryFilter) categoryFilter.value = '';
                if (accountFilter) accountFilter.value = '';
                if (cardFilter) cardFilter.value = '';
                if (searchFilter) searchFilter.value = '';
                smartwallet.clearCache(); smartwallet.render(); smartwallet.saveFilters();
                document.querySelectorAll('.card.clickable')[2].classList.add('active-filter');
                scrollToTransactions(); break;
            case 'cards': openCreditCardsModal(); break;
        }
    };
    function scrollToTransactions() {
        const section = document.querySelector('.transactions-section');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.sortTransactions = function(column) {
        if (smartwallet.sortColumn === column) {
            smartwallet.sortDirection = smartwallet.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            smartwallet.sortColumn = column;
            smartwallet.sortDirection = column === 'date' ? 'desc' : 'asc';
        }
        smartwallet.render();
    };

    window.changeCardMonth = function(delta) {
        smartwallet.cardModalMonth.setMonth(smartwallet.cardModalMonth.getMonth() + delta);
        smartwallet.renderCreditCardsList();
    };
    window.changeCardMonthToToday = function() {
        smartwallet.cardModalMonth = new Date();
        smartwallet.cardModalMonth.setDate(1);
        smartwallet.renderCreditCardsList();
    };
    window.updateCardMonthLabel = function() {
        const months = smartwallet.t('months');
        const label = document.getElementById('cardMonthLabel');
        if (label) label.textContent = months[smartwallet.cardModalMonth.getMonth()] + ' ' + smartwallet.cardModalMonth.getFullYear();
    };

    // ===== HELPERS DE MODAIS =====
    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        // Salva posição atual do scroll antes de bloquear
        document.body.style.setProperty('--scroll-y', -window.scrollY + 'px');
        document.body.classList.add('modal-open');
        modal.classList.add('active');
        // Focus trap: foca no primeiro elemento do modal
        setTimeout(() => {
            const focusable = modal.querySelector('.modal-content');
            if (focusable) focusable.focus();
        }, 50);
    }
    function closeModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('active');
        // Verifica se há outro modal ativo antes de liberar o body
        const stillOpen = document.querySelector('.modal.active');
        if (!stillOpen) {
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('--scroll-y');
            window.scrollTo(0, 0);
        }
    }

    window.openNewTransactionModal = function() {
        smartwallet.setDefaultDate();
        smartwallet.currentTransactionType = 'expense';
        document.querySelectorAll('#transactionForm .type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-type') === 'expense');
        });
        smartwallet.populateCategorySelects();
        smartwallet.populatePaymentMethodSelects();
        smartwallet.populateAccountSelects();
        openModal('newTransactionModal');
    };
    window.closeNewTransactionModal = function() {
        closeModal('newTransactionModal');
        smartwallet.clearForm();
    };
    window.closeEditModal = function() {
        closeModal('editModal');
        smartwallet.currentEditId = null;
    };
    window.openExportModal = function() { openModal('exportModal'); };
    window.closeExportModal = function() { closeModal('exportModal'); };
    window.openGoalModal = function() { openModal('goalModal'); };
    window.closeGoalModal = function() { closeModal('goalModal'); };
    window.openImportCsvModal = function() {
        window._pendingCsvData = null;
        document.getElementById('csvFileInput').value = '';
        document.getElementById('csvFileName').textContent = 'Clique para selecionar';
        document.getElementById('csvReplaceData').checked = false;
        openModal('importCsvModal');
        closeAllDropdowns();
    };
    window.closeImportCsvModal = function() { closeModal('importCsvModal'); };
    window.openImportBackupModal = function() {
        window._pendingBackupData = null;
        document.getElementById('backupFileInput').value = '';
        document.getElementById('backupFileName').textContent = 'Clique para selecionar';
        openModal('importBackupModal');
        closeAllDropdowns();
    };
    window.closeImportBackupModal = function() { closeModal('importBackupModal'); };
    window.openClearDataModal = function() {
        document.getElementById('clearStep1').style.display = 'block';
        document.getElementById('clearStep2').style.display = 'none';
        document.getElementById('clearConfirmInput').value = '';
        document.getElementById('clearConfirmInput').classList.remove('match');
        document.getElementById('finalClearBtn').disabled = true;
        document.getElementById('finalClearBtn').style.opacity = '0.5';
        openModal('clearDataModal');
        closeAllDropdowns();
    };
    window.closeClearDataModal = function() { closeModal('clearDataModal'); };
    window.openAccountsModal = function() {
        smartwallet.renderAccountsList();
        openModal('accountsModal');
        closeAllDropdowns();
    };
    window.closeAccountsModal = function() { closeModal('accountsModal'); };
    window.openNewAccountModal = function() {
        document.getElementById('accountEditId').value = '';
        document.getElementById('accountForm').reset();
        document.getElementById('accountColor').value = '#6366f1';
        document.getElementById('newAccountTitle').textContent = 'Nova Conta';
        openModal('newAccountModal');
    };
    window.closeNewAccountModal = function() { closeModal('newAccountModal'); };
    window.openCreditCardsModal = function() {
        smartwallet.cardModalMonth = new Date(smartwallet.currentMonth);
        smartwallet.renderCreditCardsList();
        openModal('creditCardsModal');
        closeAllDropdowns();
    };
    window.closeCreditCardsModal = function() { closeModal('creditCardsModal'); };
    window.openNewCardModal = function() {
        document.getElementById('cardEditId').value = '';
        document.getElementById('cardForm').reset();
        document.getElementById('cardClosingDay').value = 20;
        document.getElementById('cardDueDay').value = 27;
        document.getElementById('cardColor').value = '#6366f1';
        document.getElementById('newCardTitle').textContent = 'Novo Cartão';
        openModal('newCardModal');
    };
    window.closeNewCardModal = function() { closeModal('newCardModal'); };
    window.openInvoiceModal = function(cardId) {
        smartwallet.openInvoice(cardId);
    };
    window.closeInvoiceModal = function() { closeModal('invoiceModal'); };
    window.openBillsModal = function() {
        smartwallet.renderBillsModal();
        openModal('billsModal');
    };
    window.closeBillsModal = function() { closeModal('billsModal'); };
    window.openInvestmentsModal = function() {
        smartwallet.renderInvestmentsModal();
        openModal('investmentsModal');
        closeAllDropdowns();
    };
    window.closeInvestmentsModal = function() { closeModal('investmentsModal'); };
    window.openNewInvestmentModal = function() {
        document.getElementById('investmentEditId').value = '';
        document.getElementById('investmentForm').reset();
        document.getElementById('investmentDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('newInvestmentTitle').textContent = 'Nova Aplicação';
        const accountSelect = document.getElementById('investmentAccount');
        accountSelect.innerHTML = '<option value="">-- Criar nova --</option>';
        smartwallet.accounts.filter(a => a.type === 'investment').forEach(acc => {
            const opt = document.createElement('option');
            opt.value = acc.id;
            opt.textContent = acc.name + ' - ' + smartwallet.formatCurrency(acc.balance);
            accountSelect.appendChild(opt);
        });
        openModal('newInvestmentModal');
    };
    window.closeNewInvestmentModal = function() { closeModal('newInvestmentModal'); };
    window.closeUpdateInvestmentModal = function() { closeModal('updateInvestmentModal'); };
    window.openManualModal = function() {
        document.getElementById('manualContent').innerHTML = manualHTML;
        openModal('manualModal');
        closeAllDropdowns();
    };
    window.closeManualModal = function() { closeModal('manualModal'); };
    window.printManual = function() { smartwallet.printManual(); };
    window.openTermsModal = function() {
        openModal('disclaimerModal');
        initDisclaimer();
        closeAllDropdowns();
    };
    window.openThanksModal = function() {
        openModal('thanksModal');
        closeAllDropdowns();
    };
    window.closeThanksModal = function() { closeModal('thanksModal'); };
    window.openCategoryBudgetModal = function() {
        smartwallet.renderCategoryBudget();
        openModal('categoryBudgetModal');
        closeAllDropdowns();
    };
    window.closeCategoryBudgetModal = function() { closeModal('categoryBudgetModal'); };

    // ===== FAB =====
    window.toggleFab = function() {
        const fab = document.getElementById('fabBtn');
        const actions = document.getElementById('fabActions');
        const plusIcon = fab.querySelector('.fab-icon-plus');
        const closeIcon = fab.querySelector('.fab-icon-close');
        fab.classList.toggle('active');
        actions.classList.toggle('active');
        const isExpanded = fab.classList.contains('active');
        fab.setAttribute('aria-expanded', isExpanded);
        if (plusIcon && closeIcon) {
            plusIcon.style.display = isExpanded ? 'none' : 'block';
            closeIcon.style.display = isExpanded ? 'block' : 'none';
        }
    };
    window.openExpenseModal = function() {
        if (document.getElementById('fabBtn').classList.contains('active')) toggleFab();
        smartwallet.setDefaultDate();
        smartwallet.currentTransactionType = 'expense';
        document.querySelectorAll('#transactionForm .type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-type') === 'expense');
        });
        smartwallet.populateCategorySelects();
        smartwallet.populatePaymentMethodSelects();
        smartwallet.populateAccountSelects();
        openModal('newTransactionModal');
    };
    window.openIncomeModal = function() {
        if (document.getElementById('fabBtn').classList.contains('active')) toggleFab();
        smartwallet.setDefaultDate();
        smartwallet.currentTransactionType = 'income';
        document.querySelectorAll('#transactionForm .type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-type') === 'income');
        });
        smartwallet.populateCategorySelects();
        smartwallet.populatePaymentMethodSelects();
        smartwallet.populateAccountSelects();
        openModal('newTransactionModal');
    };
    window.openTransferModal = function() {
        if (document.getElementById('fabBtn').classList.contains('active')) toggleFab();
        smartwallet.populateAccountSelects();
        document.getElementById('transferForm').reset();
        document.getElementById('transferDate').value = new Date().toISOString().split('T')[0];
        openModal('transferModal');
    };
    window.closeTransferModal = function() { closeModal('transferModal'); };

    // ===== TOGGLES =====
    window.togglePrivacy = function() {
        smartwallet.privacyOn = !smartwallet.privacyOn;
        localStorage.setItem('smartwallet_privacy', smartwallet.privacyOn);
        smartwallet.applyPrivacy();
    };
    window.toggleTheme = function() {
        smartwallet.darkMode = !smartwallet.darkMode;
        localStorage.setItem('smartwallet_dark', smartwallet.darkMode);
        smartwallet.applyTheme();
    };

    // ===== MENUS DROPDOWN (com lógica de recolher outros) =====
    function closeAllDropdowns() {
        const info = document.getElementById('infoMenu');
        const main = document.getElementById('mainMenu');
        if (info) info.classList.remove('active');
        if (main) main.classList.remove('active');
        // Remove destaque dos botões
        document.querySelectorAll('.header-btn').forEach(b => b.classList.remove('menu-active'));
    }
    window.toggleMenu = function(e) {
        if (e) e.stopPropagation();
        const main = document.getElementById('mainMenu');
        const info = document.getElementById('infoMenu');
        const isActive = main.classList.contains('active');
        // Fecha outros menus
        if (info) info.classList.remove('active');
        document.querySelectorAll('.header-btn.info-btn').forEach(b => b.classList.remove('menu-active'));
        // Alterna
        main.classList.toggle('active');
        const menuBtn = document.querySelector('.header-btn.menu-btn');
        if (menuBtn) menuBtn.classList.toggle('menu-active', !isActive);
    };
    window.toggleInfoMenu = function(e) {
        if (e) e.stopPropagation();
        const info = document.getElementById('infoMenu');
        const main = document.getElementById('mainMenu');
        const isActive = info.classList.contains('active');
        // Fecha outros menus
        if (main) main.classList.remove('active');
        document.querySelectorAll('.header-btn.menu-btn').forEach(b => b.classList.remove('menu-active'));
        // Alterna
        info.classList.toggle('active');
        const infoBtn = document.querySelector('.header-btn.info-btn');
        if (infoBtn) infoBtn.classList.toggle('menu-active', !isActive);
    };

    window.toggleLanguage = function() {
        const currentLang = smartwallet.getLanguage();
        const newLang = currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
        smartwallet.setLanguage(newLang);
        const langText = document.getElementById('languageText');
        if (langText) langText.textContent = newLang === 'pt-BR' ? 'Idioma: Português' : 'Language: English';
        smartwallet.updateCurrencySelectorVisibility();
        closeAllDropdowns();
    };
    window.toggleCurrency = function() {
        const currentCurrency = smartwallet.getCurrency();
        const newCurrency = currentCurrency === 'BRL' ? 'USD' : 'BRL';
        smartwallet.setCurrency(newCurrency);
        const currencyText = document.getElementById('currencyText');
        if (currencyText) currencyText.textContent = newCurrency === 'BRL' ? 'Moeda: R$' : 'Currency: $';
        closeAllDropdowns();
    };

    // ===== FILE HANDLERS =====
    window.handleCsvFileSelect = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.csv')) {
            alert('⚠️ Selecione um arquivo .csv');
            event.target.value = '';
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('⚠️ Arquivo muito grande (máx 10MB)');
            event.target.value = '';
            return;
        }
        document.getElementById('csvFileName').textContent = '📄 ' + file.name + ' (' + (file.size/1024).toFixed(1) + ' KB)';
        const reader = new FileReader();
        reader.onload = (e) => { window._pendingCsvData = e.target.result; };
        reader.onerror = () => { alert('❌ Erro ao ler arquivo'); event.target.value = ''; };
        reader.readAsText(file, 'UTF-8');
    };
    window.handleBackupFileSelect = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.json')) {
            alert('⚠️ Selecione um arquivo .json');
            event.target.value = '';
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('⚠️ Arquivo muito grande (máx 10MB)');
            event.target.value = '';
            return;
        }
        document.getElementById('backupFileName').textContent = '💾 ' + file.name + ' (' + (file.size/1024).toFixed(1) + ' KB)';
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                JSON.parse(e.target.result);
                window._pendingBackupData = e.target.result;
                smartwallet.showToast('✅ Arquivo carregado!');
            } catch (error) {
                alert('❌ JSON inválido: ' + error.message);
                event.target.value = '';
                window._pendingBackupData = null;
            }
        };
        reader.onerror = () => { alert('❌ Erro ao ler arquivo'); event.target.value = ''; };
        reader.readAsText(file, 'UTF-8');
    };

    // ===== CLEAR DATA =====
    window.showClearStep2 = function() {
        document.getElementById('clearStep1').style.display = 'none';
        document.getElementById('clearStep2').style.display = 'block';
        setTimeout(() => document.getElementById('clearConfirmInput').focus(), 100);
    };
    window.checkClearConfirm = function() {
        const input = document.getElementById('clearConfirmInput');
        const btn = document.getElementById('finalClearBtn');
        if (input.value.trim().toUpperCase() === 'LIMPAR') {
            input.classList.add('match');
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            input.classList.remove('match');
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    };
    window.copyPixKey = function() {
        const key = document.getElementById('pixKey').textContent;
        navigator.clipboard.writeText(key)
            .then(() => smartwallet.showToast('✅ Chave PIX copiada!'))
            .catch(() => smartwallet.showToast('❌ Copie: ' + key));
    };

    // ===== DISCLAIMER & QUOTE =====
    function initDisclaimer() {
        let countdown = 12;
        const timerEl = document.getElementById('disclaimerTimer');
        const btnEl = document.getElementById('acceptDisclaimerBtn');
        if (!timerEl || !btnEl) return;
        btnEl.classList.remove('enabled');
        btnEl.disabled = true;
        timerEl.innerHTML = '⏱️ Aguarde <span id="countdown">' + countdown + '</span> segundos';
        const interval = setInterval(() => {
            countdown--;
            const span = document.getElementById('countdown');
            if (span) span.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(interval);
                btnEl.classList.add('enabled');
                btnEl.disabled = false;
                timerEl.innerHTML = '✅ Pode aceitar os termos';
            }
        }, 1000);
    }
    function showQuoteModal() {
        const quote = FINANCIAL_QUOTES[Math.floor(Math.random() * FINANCIAL_QUOTES.length)];
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const quoteModal = document.getElementById('quoteModal');
        if (quoteText) quoteText.textContent = '"' + quote.text + '"';
        if (quoteAuthor) quoteAuthor.textContent = '— ' + quote.author;
        if (quoteModal) quoteModal.classList.add('active');
    }
    window.acceptDisclaimer = function() {
        const btn = document.getElementById('acceptDisclaimerBtn');
        if (!btn || !btn.classList.contains('enabled')) return;
        localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
        const disclaimer = document.getElementById('disclaimerModal');
        const splash = document.getElementById('splashScreen');
        if (disclaimer) {
            disclaimer.classList.add('disintegrating');
            setTimeout(() => {
                disclaimer.classList.remove('active', 'disintegrating');
                disclaimer.style.display = 'none';
                if (splash) {
                    splash.classList.add('fade-out');
                    setTimeout(() => {
                        splash.style.display = 'none';
                        setTimeout(showQuoteModal, 300);
                    }, 800);
                } else {
                    setTimeout(showQuoteModal, 300);
                }
            }, 600);
        }
    };
    window.startApp = function() {
        const quote = document.getElementById('quoteModal');
        const main = document.getElementById('mainApp');
        const fab = document.getElementById('fabBtn');
        if (quote) { quote.classList.remove('active'); quote.style.display = 'none'; }
        if (main) main.style.display = 'block';
        if (fab) fab.style.display = 'flex';
    };
    function updatePrintDate() {
        const dateEl = document.getElementById('printDate');
        if (dateEl) dateEl.textContent = 'Gerado em: ' + new Date().toLocaleString('pt-BR');
    }

    window.closeWhatsNewModal = function() { closeModal('whatsNewModal'); };
    window.printManualFromWhatsNew = function() {
        closeWhatsNewModal();
        setTimeout(() => { smartwallet.printManual(); }, 300);
    };
    window.openManualFromWhatsNew = function() {
        closeWhatsNewModal();
        setTimeout(() => { openManualModal(); }, 300);
    };

    // ===== EVENT LISTENERS GLOBAIS =====
    window.addEventListener('load', () => {
        updatePrintDate();
        const accepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
        const splash = document.getElementById('splashScreen');
        const disclaimer = document.getElementById('disclaimerModal');
        if (splash) {
            splash.style.display = 'flex';
            splash.classList.remove('fade-out');
        }
        setTimeout(() => {
            if (!accepted && disclaimer) {
                disclaimer.classList.add('active');
                disclaimer.style.display = 'flex';
                initDisclaimer();
            } else {
                setTimeout(() => {
                    if (splash) {
                        splash.classList.add('fade-out');
                        setTimeout(() => {
                            splash.style.display = 'none';
                            showQuoteModal();
                        }, 800);
                    }
                }, 3000);
            }
        }, 3500);
    });

    // Click fora fecha MENUS (não modais!)
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mainMenu');
        const info = document.getElementById('infoMenu');
        const menuBtn = document.querySelector('.header-btn.menu-btn');
        const infoBtn = document.querySelector('.header-btn.info-btn');
        
        if (menu && menu.classList.contains('active') && !e.target.closest('.dropdown-wrapper')) {
            menu.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('menu-active');
        }
        if (info && info.classList.contains('active') && !e.target.closest('.dropdown-wrapper')) {
            info.classList.remove('active');
            if (infoBtn) infoBtn.classList.remove('menu-active');
        }
        
        const fabWrapper = document.getElementById('fabWrapper');
        const fab = document.getElementById('fabBtn');
        if (fabWrapper && !fabWrapper.contains(e.target) && fab && fab.classList.contains('active')) {
            toggleFab();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('clickable') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.target.click();
        }
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('[SmartWallet] SW registrado:', reg.scope))
                .catch(err => console.log('[SmartWallet] SW falhou:', err));
        });
    }

    console.log('🎉 Smart Wallet v4.2.1 carregado com sucesso!');
})();
