(function() {
    'use strict';

    var financialQuotes = [
        { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
        { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
        { text: "Um orçamento está dizendo a seu dinheiro para onde ir.", author: "Dave Ramsey" },
        { text: "Não economize o que resta depois de gastar; gaste o que resta depois de poupar.", author: "Warren Buffett" },
        { text: "O melhor investimento que você pode fazer é em si mesmo.", author: "Warren Buffett" }
    ];

    var PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

    var DEFAULT_CATEGORIES = [
        { id: 'moradia', name: 'Moradia', color: '#ffff00', type: 'expense' },
        { id: 'alimentacao', name: 'Alimentação', color: '#e37171', type: 'expense' },
        { id: 'transporte', name: 'Transporte', color: '#21fffb', type: 'expense' },
        { id: 'lazer', name: 'Lazer', color: '#ff00ff', type: 'expense' },
        { id: 'saude', name: 'Saúde', color: '#ff9c38', type: 'expense' },
        { id: 'salario', name: 'Salário', color: '#475569', type: 'income' },
        { id: 'freelancer', name: 'Freelancer', color: '#b3e6e0', type: 'income' }
    ];

    var manualHTML = '<div style="text-align:center;padding:40px;border:3px solid #6366f1;border-radius:16px;margin-bottom:30px;"><h1 style="color:#6366f1;">Manual do Usuário</h1><h2>Smart Wallet</h2><p>Controle Financeiro Pessoal Inteligente</p><p>Versão 2.0 - 2026</p></div><h2>Bem-vindo!</h2><p>O Smart Wallet é seu parceiro na jornada financeira.</p><h2>Instalação</h2><p>Menu do navegador → Instalar aplicativo</p><h2>Funcionalidades</h2><ul><li>Contas e Investimentos</li><li>Cartões de Crédito</li><li>Alertas de Contas</li></ul>';

    // ===== CLASSE PRINCIPAL =====
    function SmartWallet() {
        this.transactions = [];
        this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        this.accounts = [];
        this.cards = [];
        this.investments = [];
        this.currentMonth = new Date();
        this.currentMonth.setDate(1);
        this.currentTransactionType = 'expense';
        this.darkMode = true;
        this.privacyOn = false;
        this.charts = {};
        
        this.loadData();
        this.init();
    }

    SmartWallet.prototype.loadData = function() {
        try {
            var trans = localStorage.getItem('smartwallet_transactions');
            if (trans) this.transactions = JSON.parse(trans);
            
            var cats = localStorage.getItem('smartwallet_categories');
            if (cats) this.categories = JSON.parse(cats);
            
            var accs = localStorage.getItem('smartwallet_accounts');
            if (accs) this.accounts = JSON.parse(accs);
            
            var crds = localStorage.getItem('smartwallet_cards');
            if (crds) this.cards = JSON.parse(crds);
            
            var invs = localStorage.getItem('smartwallet_investments');
            if (invs) this.investments = JSON.parse(invs);
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    };

    SmartWallet.prototype.init = function() {
        console.log('✅ Smart Wallet inicializado');
        this.applyTheme();
        this.updateMonthDisplay();
        this.populateSelects();
        this.render();
        this.updateDashboard();
        this.setupEventListeners();
    };

    SmartWallet.prototype.setupEventListeners = function() {
        var self = this;
        
        var form = document.getElementById('transactionForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                self.addTransaction();
            });
        }

        var search = document.getElementById('searchFilter');
        if (search) {
            search.addEventListener('input', function() { self.render(); });
        }

        var typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', function() { self.render(); });
        }

        var catFilter = document.getElementById('categoryFilter');
        if (catFilter) {
            catFilter.addEventListener('change', function() { self.render(); });
        }
    };

    SmartWallet.prototype.updateMonthDisplay = function() {
        var months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        var el = document.getElementById('currentMonth');
        if (el) {
            el.textContent = months[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
        }
    };

    SmartWallet.prototype.changeMonth = function(delta) {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
        this.updateMonthDisplay();
        this.render();
        this.updateDashboard();
    };

    SmartWallet.prototype.populateSelects = function() {
        var self = this;
        
        var catSelect = document.getElementById('category');
        if (catSelect) {
            catSelect.innerHTML = '<option value="">Selecione...</option>';
            this.categories.forEach(function(cat) {
                var opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = cat.name;
                catSelect.appendChild(opt);
            });
        }

        var paySelect = document.getElementById('paymentMethod');
        if (paySelect) {
            paySelect.innerHTML = '<option value="">Selecione...</option>';
            PAYMENT_METHODS.forEach(function(pm) {
                var opt = document.createElement('option');
                opt.value = pm.id;
                opt.textContent = pm.icon + ' ' + pm.name;
                paySelect.appendChild(opt);
            });
        }

        var accSelect = document.getElementById('transactionAccount');
        if (accSelect) {
            accSelect.innerHTML = '<option value="">Selecione...</option>';
            this.accounts.forEach(function(acc) {
                var opt = document.createElement('option');
                opt.value = acc.id;
                opt.textContent = acc.name;
                accSelect.appendChild(opt);
            });
        }

        var catFilter = document.getElementById('categoryFilter');
        if (catFilter) {
            catFilter.innerHTML = '<option value="">Todas</option>';
            this.categories.forEach(function(cat) {
                var opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = cat.name;
                catFilter.appendChild(opt);
            });
        }
    };

    SmartWallet.prototype.addTransaction = function() {
        var date = document.getElementById('date').value;
        var amount = parseFloat(document.getElementById('amount').value);
        var category = document.getElementById('category').value;
        var description = document.getElementById('description').value;
        var paymentMethod = document.getElementById('paymentMethod').value;
        var accountId = document.getElementById('transactionAccount').value;

        if (!date || !amount || !category || !paymentMethod) {
            this.showToast('Preencha todos os campos');
            return;
        }

        var transaction = {
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
        localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions));
        
        this.render();
        this.updateDashboard();
        this.showToast('Transação adicionada!');
        
        document.getElementById('transactionForm').reset();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
        var modal = document.getElementById('newTransactionModal');
        if (modal) modal.classList.remove('active');
    };

    SmartWallet.prototype.getMonthTransactions = function() {
        var m = this.currentMonth.getMonth();
        var y = this.currentMonth.getFullYear();
        return this.transactions.filter(function(t) {
            var d = new Date(t.date);
            return d.getMonth() === m && d.getFullYear() === y;
        });
    };

    SmartWallet.prototype.getFilteredTransactions = function() {
        var self = this;
        var searchEl = document.getElementById('searchFilter');
        var search = searchEl ? searchEl.value.toLowerCase() : '';
        var catFilterEl = document.getElementById('categoryFilter');
        var catFilter = catFilterEl ? catFilterEl.value : '';
        var typeFilterEl = document.getElementById('typeFilter');
        var typeFilter = typeFilterEl ? typeFilterEl.value : '';

        return this.getMonthTransactions().filter(function(t) {
            var matchSearch = !search || (t.description || '').toLowerCase().indexOf(search) !== -1;
            var matchCat = !catFilter || t.category === catFilter;
            var matchType = !typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0);
            return matchSearch && matchCat && matchType;
        });
    };

    SmartWallet.prototype.formatCurrency = function(v) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
    };

    SmartWallet.prototype.formatDate = function(d) {
        return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
    };

    SmartWallet.prototype.getCategoryById = function(id) {
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id === id) return this.categories[i];
        }
        return { name: 'Sem categoria', color: '#6b7280' };
    };

    SmartWallet.prototype.render = function() {
        var self = this;
        var tbody = document.getElementById('transactionsTable');
        var empty = document.getElementById('emptyState');
        if (!tbody) return;

        var filtered = this.getFilteredTransactions();
        
        if (!filtered.length) {
            tbody.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
        }
        
        if (empty) empty.style.display = 'none';

        var sorted = filtered.slice().sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        var html = '';
        sorted.forEach(function(t) {
            var cat = self.getCategoryById(t.category);
            var statusText = t.statusOk ? '✓' : '⏳';
            var amountColor = t.amount >= 0 ? '#10b981' : '#ef4444';
            
            html += '<tr class="transaction-row" onclick="smartwallet.editTransaction(' + t.id + ')">';
            html += '<td data-label="Data">' + self.formatDate(t.date) + '</td>';
            html += '<td data-label="Descrição">' + (t.description || '-') + '</td>';
            html += '<td data-label="Categoria"><span class="category-badge" style="background:' + cat.color + '">' + cat.name + '</span></td>';
            html += '<td data-label="Pagamento">' + (t.paymentMethod || '-') + '</td>';
            html += '<td data-label="Status">' + statusText + '</td>';
            html += '<td data-label="Valor" class="amount privacy-value" style="color:' + amountColor + '">' + self.formatCurrency(t.amount) + '</td>';
            html += '</tr>';
        });

        tbody.innerHTML = html;
    };

    SmartWallet.prototype.editTransaction = function(id) {
        var t = null;
        for (var i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id === id) {
                t = this.transactions[i];
                break;
            }
        }
        if (!t) return;
        
        var editDate = document.getElementById('editDate');
        var editAmount = document.getElementById('editAmount');
        var editCategory = document.getElementById('editCategory');
        var editDescription = document.getElementById('editDescription');
        var editId = document.getElementById('editId');
        var editModal = document.getElementById('editModal');

        if (editDate) editDate.value = t.date;
        if (editAmount) editAmount.value = Math.abs(t.amount);
        if (editCategory) editCategory.value = t.category;
        if (editDescription) editDescription.value = t.description || '';
        if (editId) editId.value = t.id;
        if (editModal) editModal.classList.add('active');
    };

    SmartWallet.prototype.updateDashboard = function() {
        var mt = this.getMonthTransactions();
        var inc = 0, exp = 0;
        
        mt.forEach(function(t) {
            if (t.amount > 0) inc += t.amount;
            else exp += t.amount;
        });

        var balEl = document.getElementById('totalBalance');
        var incEl = document.getElementById('totalIncome');
        var expEl = document.getElementById('totalExpenses');

        if (balEl) balEl.textContent = this.formatCurrency(inc + exp);
        if (incEl) incEl.textContent = this.formatCurrency(inc);
        if (expEl) expEl.textContent = this.formatCurrency(Math.abs(exp));
    };

    SmartWallet.prototype.applyTheme = function() {
        if (this.darkMode) {
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
        }
    };

    SmartWallet.prototype.showToast = function(msg) {
        var t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.classList.add('active');
        setTimeout(function() {
            t.classList.remove('active');
        }, 3000);
    };

    SmartWallet.prototype.initCharts = function() {
        if (typeof Chart === 'undefined') {
            console.log('Chart.js não carregado');
            return;
        }
        console.log('Charts OK');
    };

    SmartWallet.prototype.updateAlertBadge = function() {
        var badge = document.getElementById('alertBadge');
        if (badge) badge.textContent = '0';
    };

    // ===== INSTÂNCIA GLOBAL =====
    var smartwallet = new SmartWallet();
    window.smartwallet = smartwallet;

    // ===== FUNÇÕES GLOBAIS =====
    window.selectTransactionType = function(t) {
        smartwallet.currentTransactionType = t;
        var btns = document.querySelectorAll('#transactionForm .type-btn');
        btns.forEach(function(b) {
            if (b.getAttribute('data-type') === t) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    };

    window.openNewTransactionModal = function() {
        var modal = document.getElementById('newTransactionModal');
        if (modal) modal.classList.add('active');
    };

    window.closeNewTransactionModal = function() {
        var modal = document.getElementById('newTransactionModal');
        if (modal) modal.classList.remove('active');
        smartwallet.clearForm();
    };

    SmartWallet.prototype.clearForm = function() {
        var form = document.getElementById('transactionForm');
        if (form) form.reset();
        var dateEl = document.getElementById('date');
        if (dateEl) dateEl.value = new Date().toISOString().split('T')[0];
    };

    window.closeEditModal = function() {
        var modal = document.getElementById('editModal');
        if (modal) modal.classList.remove('active');
    };

    window.togglePrivacy = function() {
        smartwallet.privacyOn = !smartwallet.privacyOn;
        document.body.classList.toggle('privacy-on', smartwallet.privacyOn);
        localStorage.setItem('smartwallet_privacy', smartwallet.privacyOn);
    };

    window.toggleTheme = function() {
        smartwallet.darkMode = !smartwallet.darkMode;
        localStorage.setItem('smartwallet_dark', smartwallet.darkMode);
        smartwallet.applyTheme();
    };

    window.toggleMenu = function(e) {
        if (e) e.stopPropagation();
        var menu = document.getElementById('mainMenu');
        if (menu) menu.classList.toggle('active');
    };

    window.toggleInfoMenu = function(e) {
        if (e) e.stopPropagation();
        var menu = document.getElementById('infoMenu');
        if (menu) menu.classList.toggle('active');
    };

    window.openManualModal = function() {
        var content = document.getElementById('manualContent');
        if (content) content.innerHTML = manualHTML;
        var modal = document.getElementById('manualModal');
        if (modal) modal.classList.add('active');
    };

    window.closeManualModal = function() {
        var modal = document.getElementById('manualModal');
        if (modal) modal.classList.remove('active');
    };

    window.printManual = function() {
        window.print();
    };

    window.openTermsModal = function() {
        var modal = document.getElementById('disclaimerModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('active');
        }
        initDisclaimer();
    };

    window.openThanksModal = function() {
        var modal = document.getElementById('thanksModal');
        if (modal) modal.classList.add('active');
    };

    window.closeThanksModal = function() {
        var modal = document.getElementById('thanksModal');
        if (modal) modal.classList.remove('active');
    };

    window.copyPixKey = function() {
        var key = document.getElementById('pixKey');
        if (!key) return;
        navigator.clipboard.writeText(key.textContent);
        smartwallet.showToast('Chave copiada!');
    };

    window.openAccountsModal = function() {
        var modal = document.getElementById('accountsModal');
        if (modal) modal.classList.add('active');
    };

    window.closeAccountsModal = function() {
        var modal = document.getElementById('accountsModal');
        if (modal) modal.classList.remove('active');
    };

    window.openNewAccountModal = function() {
        var modal = document.getElementById('newAccountModal');
        if (modal) modal.classList.add('active');
    };

    window.closeNewAccountModal = function() {
        var modal = document.getElementById('newAccountModal');
        if (modal) modal.classList.remove('active');
    };

    window.openCreditCardsModal = function() {
        var modal = document.getElementById('creditCardsModal');
        if (modal) modal.classList.add('active');
    };

    window.closeCreditCardsModal = function() {
        var modal = document.getElementById('creditCardsModal');
        if (modal) modal.classList.remove('active');
    };

    window.openNewCardModal = function() {
        var modal = document.getElementById('newCardModal');
        if (modal) modal.classList.add('active');
    };

    window.closeNewCardModal = function() {
        var modal = document.getElementById('newCardModal');
        if (modal) modal.classList.remove('active');
    };

    window.openBillsModal = function() {
        var modal = document.getElementById('billsModal');
        if (modal) modal.classList.add('active');
    };

    window.closeBillsModal = function() {
        var modal = document.getElementById('billsModal');
        if (modal) modal.classList.remove('active');
    };

    window.openInvestmentsModal = function() {
        var modal = document.getElementById('investmentsModal');
        if (modal) modal.classList.add('active');
    };

    window.closeInvestmentsModal = function() {
        var modal = document.getElementById('investmentsModal');
        if (modal) modal.classList.remove('active');
    };

    window.openNewInvestmentModal = function() {
        var modal = document.getElementById('newInvestmentModal');
        if (modal) modal.classList.add('active');
    };

    window.closeNewInvestmentModal = function() {
        var modal = document.getElementById('newInvestmentModal');
        if (modal) modal.classList.remove('active');
    };

    window.openExportModal = function() {
        var modal = document.getElementById('exportModal');
        if (modal) modal.classList.add('active');
    };

    window.closeExportModal = function() {
        var modal = document.getElementById('exportModal');
        if (modal) modal.classList.remove('active');
    };

    window.openGoalModal = function() {
        var modal = document.getElementById('goalModal');
        if (modal) modal.classList.add('active');
    };

    window.closeGoalModal = function() {
        var modal = document.getElementById('goalModal');
        if (modal) modal.classList.remove('active');
    };

    window.openImportCsvModal = function() {
        var modal = document.getElementById('importCsvModal');
        if (modal) modal.classList.add('active');
    };

    window.closeImportCsvModal = function() {
        var modal = document.getElementById('importCsvModal');
        if (modal) modal.classList.remove('active');
    };

    window.openImportBackupModal = function() {
        var modal = document.getElementById('importBackupModal');
        if (modal) modal.classList.add('active');
    };

    window.closeImportBackupModal = function() {
        var modal = document.getElementById('importBackupModal');
        if (modal) modal.classList.remove('active');
    };

    window.openClearDataModal = function() {
        var modal = document.getElementById('clearDataModal');
        if (modal) modal.classList.add('active');
    };

    window.closeClearDataModal = function() {
        var modal = document.getElementById('clearDataModal');
        if (modal) modal.classList.remove('active');
    };

    window.showClearStep2 = function() {
        var step1 = document.getElementById('clearStep1');
        var step2 = document.getElementById('clearStep2');
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = 'block';
    };

    window.checkClearConfirm = function() {
        var input = document.getElementById('clearConfirmInput');
        var btn = document.getElementById('finalClearBtn');
        if (!input || !btn) return;
        if (input.value.trim().toUpperCase() === 'LIMPAR') {
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    };

    SmartWallet.prototype.exportBackup = function() {
        var backup = {
            transactions: this.transactions,
            categories: this.categories,
            accounts: this.accounts,
            cards: this.cards,
            investments: this.investments
        };
        var blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'smartwallet_backup_' + new Date().toISOString().split('T')[0] + '.json';
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Backup exportado!');
    };

    SmartWallet.prototype.printPDF = function() {
        window.print();
    };

    SmartWallet.prototype.exportCSV = function() {
        var mt = this.getMonthTransactions();
        if (!mt.length) {
            this.showToast('Nenhuma transação');
            return;
        }
        var csv = 'Data;Descrição;Categoria;Valor\n';
        mt.forEach(function(t) {
            csv += t.date + ';"' + (t.description || '') + '";' + t.category + ';' + t.amount + '\n';
        });
        var blob = new Blob([csv], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'extrato.csv';
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('CSV exportado!');
    };

    SmartWallet.prototype.clearAllData = function() {
        this.transactions = [];
        this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        this.accounts = [];
        this.cards = [];
        this.investments = [];
        localStorage.clear();
        this.render();
        this.updateDashboard();
        this.showToast('Dados apagados!');
    };

    // ===== DISCLAIMER =====
    function initDisclaimer() {
        var countdown = 12;
        var timerEl = document.getElementById('disclaimerTimer');
        var btnEl = document.getElementById('acceptDisclaimerBtn');

        if (!timerEl || !btnEl) return;

        btnEl.classList.remove('enabled');
        btnEl.disabled = true;
        timerEl.innerHTML = '⏱️ Aguarde <span id="countdown">' + countdown + '</span> segundos';

        var interval = setInterval(function() {
            countdown--;
            var span = document.getElementById('countdown');
            if (span) span.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                btnEl.classList.add('enabled');
                btnEl.disabled = false;
                timerEl.innerHTML = '✅ Pode aceitar os termos';
            }
        }, 1000);
    }

    window.acceptDisclaimer = function() {
        var btn = document.getElementById('acceptDisclaimerBtn');
        if (!btn || !btn.classList.contains('enabled')) return;

        localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
        
        var disclaimer = document.getElementById('disclaimerModal');
        if (disclaimer) {
            disclaimer.style.display = 'none';
            disclaimer.classList.remove('active');
        }
        
        // Fica 3s na splash e vai para quote
        setTimeout(function() {
            var splash = document.getElementById('splashScreen');
            if (splash) {
                splash.classList.add('fade-out');
                setTimeout(function() {
                    splash.style.display = 'none';
                    var quote = document.getElementById('quoteModal');
                    if (quote) quote.classList.add('active');
                }, 800);
            }
        }, 3000);
    };

    window.startApp = function() {
        var quote = document.getElementById('quoteModal');
        var main = document.getElementById('mainApp');
        var fab = document.getElementById('fabBtn');

        if (quote) quote.classList.remove('active');
        if (main) main.style.display = 'block';
        if (fab) fab.style.display = 'flex';
    };

    // ===== INICIALIZAÇÃO =====
    window.addEventListener('load', function() {
        var accepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
        var splash = document.getElementById('splashScreen');
        var disclaimer = document.getElementById('disclaimerModal');

        if (splash) {
            splash.style.display = 'flex';
        }

        // Splash sempre visível por 3.5s
        setTimeout(function() {
            if (!accepted && disclaimer) {
                // Primeiro acesso: mostra disclaimer sobre a splash
                disclaimer.style.display = 'flex';
                disclaimer.classList.add('active');
                initDisclaimer();
            } else {
                // Já aceitou: splash fica +3s e vai para quote
                setTimeout(function() {
                    if (splash) {
                        splash.classList.add('fade-out');
                        setTimeout(function() {
                            splash.style.display = 'none';
                            var quote = document.getElementById('quoteModal');
                            if (quote) quote.classList.add('active');
                        }, 800);
                    }
                }, 3000);
            }
        }, 3500);
    });

    // Fechar menus ao clicar fora
    document.addEventListener('click', function(e) {
        var menu = document.getElementById('mainMenu');
        var info = document.getElementById('infoMenu');
        
        if (!e.target.closest('.menu-btn') && menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
        if (!e.target.closest('.info-btn') && info && info.classList.contains('active')) {
            info.classList.remove('active');
        }
    });

    // Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js')
                .then(function(reg) { console.log('SW OK:', reg.scope); })
                .catch(function(err) { console.log('SW falhou:', err); });
        });
    }

    console.log('🎉 Smart Wallet carregado com sucesso!');
})();
