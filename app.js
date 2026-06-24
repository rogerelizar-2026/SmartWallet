(function() {
    'use strict';

    const financialQuotes = [
        { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
        { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
        { text: "Um orçamento está dizendo a seu dinheiro para onde ir.", author: "Dave Ramsey" },
        { text: "Não economize o que resta depois de gastar; gaste o que resta depois de poupar.", author: "Warren Buffett" },
        { text: "O melhor investimento que você pode fazer é em si mesmo.", author: "Warren Buffett" },
        { text: "Dinheiro é um péssimo mestre, mas um excelente servo.", author: "P.T. Barnum" },
        { text: "Cuidado com pequenos gastos; um pequeno vazamento afundará um grande navio.", author: "Benjamin Franklin" },
        { text: "Pague a si mesmo primeiro.", author: "George Samuel Clason" },
        { text: "A melhor hora para plantar uma árvore foi há 20 anos. A segunda melhor hora é agora.", author: "Provérbio Chinês" },
        { text: "Finanças não são sobre matemática, são sobre comportamento.", author: "Morgan Housel" }
    ];

    const PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'scheduled', name: 'Agendamento', icon: '📅' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

    const DEFAULT_CATEGORIES = [
        { id: 'generosidade', name: 'Generosidade', color: '#007306', type: 'expense' },
        { id: 'despensa', name: 'Despensa', color: '#e37171', type: 'expense' },
        { id: 'transporte', name: 'Transporte', color: '#21fffb', type: 'expense' },
        { id: 'moradia', name: 'Moradia', color: '#ffff00', type: 'expense' },
        { id: 'saude', name: 'Saúde', color: '#ff9c38', type: 'expense' },
        { id: 'educacao', name: 'Educação', color: '#0000ff', type: 'expense' },
        { id: 'lazer', name: 'Lazer', color: '#ff00ff', type: 'expense' },
        { id: 'salario', name: 'Salário', color: '#475569', type: 'income' },
        { id: 'investimento', name: 'Investimento', color: '#e6dcb1', type: 'expense' }
    ];

    const manualHTML = '<div style="text-align:center;padding:40px 20px;border:3px solid #6366f1;border-radius:16px;margin-bottom:30px;"><h1 style="color:#6366f1;">Manual do Usuário</h1><h2>Smart Wallet</h2><p>Controle Financeiro Pessoal Inteligente</p><p>Versão 2.0 - 2026</p></div><h2>Bem-vindo!</h2><p>O Smart Wallet é seu parceiro na jornada financeira.</p><h2>Instalação</h2><p>Menu do navegador → Instalar aplicativo</p><h2>Funcionalidades</h2><ul><li>Contas e Investimentos</li><li>Cartões de Crédito</li><li>Acompanhamento de Aplicações</li><li>Alertas de Contas</li></ul>';

    class SmartWallet {
        constructor() {
            this.transactions = this.loadFromStorage('smartwallet_transactions', []);
            this.categories = this.loadFromStorage('smartwallet_categories', JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)));
            this.cards = this.loadFromStorage('smartwallet_cards', []);
            this.cardPurchases = this.loadFromStorage('smartwallet_card_purchases', []);
            this.accounts = this.loadFromStorage('smartwallet_accounts', []);
            this.investments = this.loadFromStorage('smartwallet_investments', []);
            this.currentMonth = new Date();
            this.currentMonth.setDate(1);
            this.currentTransactionType = 'expense';
            this.currentEditId = null;
            this.privacyOn = localStorage.getItem('smartwallet_privacy') === 'true';
            this.darkMode = localStorage.getItem('smartwallet_dark') !== 'false';
            this.charts = {};
            this.init();
        }

        init() {
            this.applyTheme();
            this.applyPrivacy();
            this.setupEventListeners();
            this.setDefaultDate();
            this.updateMonthDisplay();
            this.populateCategorySelects();
            this.populatePaymentMethodSelects();
            this.populateAccountSelects();
            this.render();
            this.initCharts();
            this.updateAlertBadge();
        }

        loadFromStorage(key, def) {
            try {
                const v = localStorage.getItem(key);
                if (!v) return def;
                return JSON.parse(v);
            } catch (e) {
                return def;
            }
        }

        saveTransactions() {
            localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions));
        }

        saveCategories() {
            localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories));
        }

        saveCards() {
            localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards));
        }

        saveAccounts() {
            localStorage.setItem('smartwallet_accounts', JSON.stringify(this.accounts));
        }

        saveInvestments() {
            localStorage.setItem('smartwallet_investments', JSON.stringify(this.investments));
        }

        setupEventListeners() {
            const form = document.getElementById('transactionForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.addTransaction();
                });
            }

            const search = document.getElementById('searchFilter');
            if (search) {
                search.addEventListener('input', () => this.render());
            }

            const filters = ['typeFilter', 'categoryFilter', 'statusFilter', 'accountFilter'];
            filters.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('change', () => this.render());
            });
        }

        setDefaultDate() {
            const el = document.getElementById('date');
            if (el) el.value = new Date().toISOString().split('T')[0];
        }

        changeMonth(delta) {
            this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
            this.updateMonthDisplay();
            this.render();
        }

        updateMonthDisplay() {
            const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            const el = document.getElementById('currentMonth');
            if (el) {
                el.textContent = months[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
            }
        }

        getMonthTransactions() {
            const m = this.currentMonth.getMonth();
            const y = this.currentMonth.getFullYear();
            return this.transactions.filter(t => {
                const d = new Date(t.date);
                return d.getMonth() === m && d.getFullYear() === y;
            });
        }

        populateCategorySelects() {
            const selects = ['category', 'categoryFilter'];
            selects.forEach(id => {
                const sel = document.getElementById(id);
                if (!sel) return;
                sel.innerHTML = '<option value="">Todas</option>';
                this.categories.forEach(cat => {
                    const opt = document.createElement('option');
                    opt.value = cat.id;
                    opt.textContent = cat.name;
                    sel.appendChild(opt);
                });
            });
        }

        populatePaymentMethodSelects() {
            const sel = document.getElementById('paymentMethod');
            if (!sel) return;
            sel.innerHTML = '<option value="">Selecione...</option>';
            PAYMENT_METHODS.forEach(pm => {
                const opt = document.createElement('option');
                opt.value = pm.id;
                opt.textContent = pm.icon + ' ' + pm.name;
                sel.appendChild(opt);
            });
        }

        populateAccountSelects() {
            const selects = ['transactionAccount', 'accountFilter'];
            selects.forEach(id => {
                const sel = document.getElementById(id);
                if (!sel) return;
                sel.innerHTML = '<option value="">Selecione...</option>';
                this.accounts.forEach(acc => {
                    const opt = document.createElement('option');
                    opt.value = acc.id;
                    opt.textContent = acc.name;
                    sel.appendChild(opt);
                });
            });
        }

        addTransaction() {
            const date = document.getElementById('date').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const accountId = document.getElementById('transactionAccount').value;

            if (!category || !paymentMethod) {
                this.showToast('Preencha todos os campos');
                return;
            }

            const transaction = {
                id: Date.now(),
                date: date,
                amount: this.currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount),
                category: category,
                description: description,
                paymentMethod: paymentMethod,
                accountId: accountId,
                statusOk: false
            };

            this.transactions.push(transaction);
            this.saveTransactions();
            this.render();
            this.showToast('Transação adicionada!');
            this.clearForm();
            document.getElementById('newTransactionModal').classList.remove('active');
        }

        clearForm() {
            document.getElementById('transactionForm').reset();
            this.setDefaultDate();
        }

        editTransaction(id) {
            const t = this.transactions.find(x => x.id === id);
            if (!t) return;
            this.currentEditId = id;
            document.getElementById('editId').value = t.id;
            document.getElementById('editDate').value = t.date;
            document.getElementById('editAmount').value = Math.abs(t.amount);
            document.getElementById('editCategory').value = t.category;
            document.getElementById('editDescription').value = t.description;
            document.getElementById('editModal').classList.add('active');
        }

        deleteTransaction() {
            if (!this.currentEditId) return;
            if (!confirm('Excluir esta transação?')) return;
            this.transactions = this.transactions.filter(t => t.id !== this.currentEditId);
            this.saveTransactions();
            this.render();
            this.showToast('Excluída!');
            document.getElementById('editModal').classList.remove('active');
        }

        getFilteredTransactions() {
            const search = (document.getElementById('searchFilter').value || '').toLowerCase();
            const catFilter = document.getElementById('categoryFilter').value;
            const accountFilter = document.getElementById('accountFilter').value;

            return this.getMonthTransactions().filter(t => {
                const matchSearch = !search || t.description.toLowerCase().includes(search);
                const matchCat = !catFilter || t.category === catFilter;
                const matchAcc = !accountFilter || t.accountId === accountFilter;
                return matchSearch && matchCat && matchAcc;
            });
        }

        formatCurrency(v) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
        }

        formatDate(d) {
            return new Date(d).toLocaleDateString('pt-BR');
        }

        getCategoryById(id) {
            return this.categories.find(c => c.id === id) || { name: 'Sem categoria', color: '#6b7280' };
        }

        render() {
            const tbody = document.getElementById('transactionsTable');
            if (!tbody) return;

            const filtered = this.getFilteredTransactions();
            if (!filtered.length) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;">Nenhuma transação</td></tr>';
                return;
            }

            const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            tbody.innerHTML = sorted.map(t => {
                const cat = this.getCategoryById(t.category);
                const acc = this.accounts.find(a => a.id === t.accountId);
                return '<tr onclick="smartwallet.editTransaction(' + t.id + ')">' +
                    '<td>' + this.formatDate(t.date) + '</td>' +
                    '<td>' + (t.description || '-') + '</td>' +
                    '<td><span style="background:' + cat.color + ';padding:4px 8px;border-radius:8px;color:white;">' + cat.name + '</span></td>' +
                    '<td>' + (acc ? acc.name : '-') + '</td>' +
                    '<td>' + (t.paymentMethod || '-') + '</td>' +
                    '<td>' + (t.statusOk ? '✓' : '⏳') + '</td>' +
                    '<td style="color:' + (t.amount >= 0 ? '#10b981' : '#ef4444') + ';font-weight:600;">' + this.formatCurrency(t.amount) + '</td>' +
                    '<td>-</td>' +
                    '</tr>';
            }).join('');

            this.updateDashboard();
        }

        updateDashboard() {
            const mt = this.getMonthTransactions();
            const inc = mt.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
            const exp = mt.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);

            document.getElementById('totalIncome').textContent = this.formatCurrency(inc);
            document.getElementById('totalExpenses').textContent = this.formatCurrency(Math.abs(exp));
            document.getElementById('totalBalance').textContent = this.formatCurrency(inc + exp);
        }

        applyTheme() {
            document.body.classList.toggle('light', !this.darkMode);
        }

        applyPrivacy() {
            document.body.classList.toggle('privacy-on', this.privacyOn);
        }

        showToast(msg) {
            const t = document.getElementById('toast');
            if (!t) return;
            t.textContent = msg;
            t.classList.add('active');
            setTimeout(() => t.classList.remove('active'), 3000);
        }

        initCharts() {
            if (typeof Chart === 'undefined') return;
            console.log('Charts inicializados');
        }

        updateAlertBadge() {
            const badge = document.getElementById('alertBadge');
            if (badge) badge.textContent = '0';
        }
    }

    const smartwallet = new SmartWallet();
    window.smartwallet = smartwallet;

    window.selectTransactionType = function(t) {
        smartwallet.currentTransactionType = t;
    };

    window.openNewTransactionModal = function() {
        document.getElementById('newTransactionModal').classList.add('active');
    };

    window.closeNewTransactionModal = function() {
        document.getElementById('newTransactionModal').classList.remove('active');
        smartwallet.clearForm();
    };

    window.closeEditModal = function() {
        document.getElementById('editModal').classList.remove('active');
    };

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

    window.toggleMenu = function(e) {
        e.stopPropagation();
        document.getElementById('mainMenu').classList.toggle('active');
    };

    window.toggleInfoMenu = function(e) {
        e.stopPropagation();
        document.getElementById('infoMenu').classList.toggle('active');
    };

    window.openManualModal = function() {
        document.getElementById('manualContent').innerHTML = manualHTML;
        document.getElementById('manualModal').classList.add('active');
    };

    window.closeManualModal = function() {
        document.getElementById('manualModal').classList.remove('active');
    };

    window.printManual = function() {
        window.print();
    };

    window.openTermsModal = function() {
        document.getElementById('disclaimerModal').style.display = 'flex';
        initDisclaimer();
    };

    window.openThanksModal = function() {
        document.getElementById('thanksModal').classList.add('active');
    };

    window.closeThanksModal = function() {
        document.getElementById('thanksModal').classList.remove('active');
    };

    window.copyPixKey = function() {
        const key = document.getElementById('pixKey').textContent;
        navigator.clipboard.writeText(key);
        smartwallet.showToast('Chave copiada!');
    };

    function initDisclaimer() {
        let countdown = 12;
        const timerEl = document.getElementById('disclaimerTimer');
        const btnEl = document.getElementById('acceptDisclaimerBtn');

        if (!timerEl || !btnEl) return;

        btnEl.classList.remove('enabled');
        timerEl.innerHTML = '⏱️ Aguarde <span id="countdown">' + countdown + '</span> segundos';

        const interval = setInterval(function() {
            countdown--;
            const span = document.getElementById('countdown');
            if (span) span.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                btnEl.classList.add('enabled');
                timerEl.innerHTML = '✅ Pode aceitar os termos';
            }
        }, 1000);
    }

    window.acceptDisclaimer = function() {
        const btn = document.getElementById('acceptDisclaimerBtn');
        if (!btn || !btn.classList.contains('enabled')) return;

        localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
        document.getElementById('disclaimerModal').style.display = 'none';

        setTimeout(function() {
            document.getElementById('splashScreen').classList.add('fade-out');
            setTimeout(function() {
                document.getElementById('splashScreen').style.display = 'none';
                document.getElementById('quoteModal').classList.add('active');
            }, 800);
        }, 3000);
    };

    window.startApp = function() {
        document.getElementById('quoteModal').classList.remove('active');
        document.getElementById('mainApp').style.display = 'block';
        document.getElementById('fabBtn').style.display = 'flex';
    };

window.addEventListener('load', function()

    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mainMenu');
        const info = document.getElementById('infoMenu');
        if (!e.target.closest('.menu-btn') && menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
        if (!e.target.closest('.info-btn') && info && info.classList.contains('active')) {
            info.classList.remove('active');
        }
    });
})();
