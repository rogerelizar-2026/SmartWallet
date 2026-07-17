// Smart Finance - App JavaScript
// Controle Financeiro Pessoal Inteligente
// Idealizado por RogerElizar™

(function() {
    'use strict';

    // ============================================
    // ESTADO DA APLICAÇÃO
    // ============================================
    const state = {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        transactions: [],
        accounts: [],
        creditCards: [],
        investments: [],
        budgets: [],
        goals: [],
        settings: {
            theme: 'light',
            language: 'pt-BR',
            currency: 'BRL',
            privacyMode: false,
            demoMode: false,
            notifications: false
        },
        userAcceptedTerms: false
    };

    // ============================================
    // UTILITÁRIOS
    // ============================================
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    };

    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const showToast = (message, type = 'info') => {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.className = `toast show ${type}`;
            setTimeout(() => {
                toast.className = 'toast';
            }, 3000);
        }
    };

    // ============================================
    // ARMAZENAMENTO LOCAL
    // ============================================
    const saveData = () => {
        try {
            localStorage.setItem('smartFinance_data', JSON.stringify({
                transactions: state.transactions,
                accounts: state.accounts,
                creditCards: state.creditCards,
                investments: state.investments,
                budgets: state.budgets,
                goals: state.goals,
                settings: state.settings,
                userAcceptedTerms: state.userAcceptedTerms
            }));
        } catch (e) {
            console.error('Erro ao salvar dados:', e);
        }
    };

    const loadData = () => {
        try {
            const data = localStorage.getItem('smartFinance_data');
            if (data) {
                const parsed = JSON.parse(data);
                state.transactions = parsed.transactions || [];
                state.accounts = parsed.accounts || [];
                state.creditCards = parsed.creditCards || [];
                state.investments = parsed.investments || [];
                state.budgets = parsed.budgets || [];
                state.goals = parsed.goals || [];
                state.settings = { ...state.settings, ...parsed.settings };
                state.userAcceptedTerms = parsed.userAcceptedTerms || false;
            }
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    };

    const clearData = () => {
        localStorage.removeItem('smartFinance_data');
        state.transactions = [];
        state.accounts = [];
        state.creditCards = [];
        state.investments = [];
        state.budgets = [];
        state.goals = [];
    };

    // ============================================
    // NAVEGAÇÃO E UI
    // ============================================
    const updateMonthDisplay = () => {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const currentMonthEl = document.getElementById('currentMonth');
        if (currentMonthEl) {
            currentMonthEl.textContent = `${monthNames[state.currentMonth]} ${state.currentYear}`;
        }
    };

    const togglePrivacyMode = () => {
        state.settings.privacyMode = !state.settings.privacyMode;
        document.body.classList.toggle('privacy-mode', state.settings.privacyMode);
        updateDashboard();
        saveData();
    };

    const toggleTheme = () => {
        state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.settings.theme);
        saveData();
    };

    // ============================================
    // DASHBOARD
    // ============================================
    const calculateTotals = () => {
        const monthTransactions = state.transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === state.currentMonth && date.getFullYear() === state.currentYear;
        });

        const income = monthTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const expenses = monthTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const balance = income - expenses;

        return { income, expenses, balance };
    };

    const updateDashboard = () => {
        const totals = calculateTotals();
        
        const totalBalanceEl = document.getElementById('totalBalance');
        const totalIncomeEl = document.getElementById('totalIncome');
        const totalExpensesEl = document.getElementById('totalExpenses');
        const goalProgressEl = document.getElementById('goalProgress');

        if (totalBalanceEl) {
            totalBalanceEl.textContent = state.settings.privacyMode ? '•••••' : formatCurrency(totals.balance);
            totalBalanceEl.className = `card-value privacy-value ${totals.balance >= 0 ? 'positive' : 'negative'}`;
        }

        if (totalIncomeEl) {
            totalIncomeEl.textContent = state.settings.privacyMode ? '•••••' : formatCurrency(totals.income);
        }

        if (totalExpensesEl) {
            totalExpensesEl.textContent = state.settings.privacyMode ? '•••••' : formatCurrency(totals.expenses);
        }

        if (goalProgressEl) {
            const cardTotal = state.creditCards.reduce((sum, card) => {
                return sum + (card.currentBalance || 0);
            }, 0);
            goalProgressEl.textContent = state.settings.privacyMode ? '•••••' : formatCurrency(cardTotal);
        }

        updateCharts();
    };

    // ============================================
    // GRÁFICOS
    // ============================================
    let lineChartInstance = null;
    let cardsChartInstance = null;
    let pieChartInstance = null;

    const updateCharts = () => {
        updateLineChart();
        updateCardsChart();
        updatePieChart();
    };

    const updateLineChart = () => {
        const ctx = document.getElementById('lineChart');
        if (!ctx) return;

        const canvas = ctx.getContext('2d');
        
        // Dados dos últimos 6 meses
        const labels = [];
        const incomeData = [];
        const expenseData = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(state.currentYear, state.currentMonth - i, 1);
            const monthName = date.toLocaleString('pt-BR', { month: 'short' });
            labels.push(monthName);

            const monthTrans = state.transactions.filter(t => {
                const d = new Date(t.date);
                return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
            });

            const income = monthTrans.filter(t => t.type === 'income').reduce((s, t) => s + parseFloat(t.amount), 0);
            const expense = monthTrans.filter(t => t.type === 'expense').reduce((s, t) => s + parseFloat(t.amount), 0);

            incomeData.push(income);
            expenseData.push(expense);
        }

        if (lineChartInstance) {
            lineChartInstance.destroy();
        }

        lineChartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Receitas',
                        data: incomeData,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Despesas',
                        data: expenseData,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const updateCardsChart = () => {
        const ctx = document.getElementById('cardsChart');
        if (!ctx) return;

        const canvas = ctx.getContext('2d');
        
        const labels = [];
        const data = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(state.currentYear, state.currentMonth - i, 1);
            const monthName = date.toLocaleString('pt-BR', { month: 'short' });
            labels.push(monthName);

            const total = state.creditCards.reduce((sum, card) => {
                const cardTrans = card.transactions?.filter(t => {
                    const d = new Date(t.date);
                    return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
                }) || [];
                return sum + cardTrans.reduce((s, t) => s + parseFloat(t.amount), 0);
            }, 0);

            data.push(total);
        }

        if (cardsChartInstance) {
            cardsChartInstance.destroy();
        }

        cardsChartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cartões de Crédito',
                    data: data,
                    backgroundColor: '#6366f1',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const updatePieChart = () => {
        const ctx = document.getElementById('pieChart');
        if (!ctx) return;

        const canvas = ctx.getContext('2d');
        
        const categories = {};
        const monthTransactions = state.transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === state.currentMonth && 
                   date.getFullYear() === state.currentYear && 
                   t.type === 'expense';
        });

        monthTransactions.forEach(t => {
            const category = t.category || 'Outros';
            categories[category] = (categories[category] || 0) + parseFloat(t.amount);
        });

        const colors = [
            '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', 
            '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
        ];

        if (pieChartInstance) {
            pieChartInstance.destroy();
        }

        pieChartInstance = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: colors.slice(0, Object.keys(categories).length),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    };

    // ============================================
    // MODAIS
    // ============================================
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    const setupDisclaimerModal = () => {
        const checkbox = document.getElementById('acceptTermsCheckbox');
        const acceptBtn = document.getElementById('acceptDisclaimerBtn');
        const splashScreen = document.getElementById('splashScreen');
        const quoteModal = document.getElementById('quoteModal');

        if (state.userAcceptedTerms) {
            if (splashScreen) splashScreen.style.display = 'none';
            showQuote();
            return;
        }

        if (checkbox && acceptBtn) {
            checkbox.addEventListener('change', () => {
                acceptBtn.disabled = !checkbox.checked;
            });

            acceptBtn.addEventListener('click', () => {
                state.userAcceptedTerms = true;
                saveData();
                
                if (splashScreen) {
                    splashScreen.style.opacity = '0';
                    setTimeout(() => {
                        splashScreen.style.display = 'none';
                        showQuote();
                    }, 300);
                }
            });
        }
    };

    const quotes = [
        { text: "O dinheiro é um bom servo, mas um mau mestre.", author: "Francis Bacon" },
        { text: "Não é sobre quanto você ganha, mas sobre quanto você guarda.", author: "Robert Kiyosaki" },
        { text: "A poupança é a base de toda a riqueza.", author: "Provérbio Chinês" },
        { text: "Cuidado com as pequenas despesas; um pequeno vazamento afunda um grande navio.", author: "Benjamin Franklin" },
        { text: "Investir em conhecimento rende os melhores juros.", author: "Benjamin Franklin" }
    ];

    const showQuote = () => {
        const quoteModal = document.getElementById('quoteModal');
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const startBtn = document.getElementById('startAppBtn');

        if (quoteModal && quoteText && quoteAuthor) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteText.textContent = randomQuote.text;
            quoteAuthor.textContent = `- ${randomQuote.author}`;
            
            setTimeout(() => {
                quoteModal.classList.add('show');
            }, 100);

            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    quoteModal.classList.remove('show');
                    updateDashboard();
                });
            }
        }
    };

    // ============================================
    // EVENTOS E INICIALIZAÇÃO
    // ============================================
    const setupEventListeners = () => {
        // Navegação de meses
        const prevMonthBtn = document.getElementById('prevMonthBtn');
        const nextMonthBtn = document.getElementById('nextMonthBtn');

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                state.currentMonth--;
                if (state.currentMonth < 0) {
                    state.currentMonth = 11;
                    state.currentYear--;
                }
                updateMonthDisplay();
                updateDashboard();
            });
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                state.currentMonth++;
                if (state.currentMonth > 11) {
                    state.currentMonth = 0;
                    state.currentYear++;
                }
                updateMonthDisplay();
                updateDashboard();
            });
        }

        // Botões do header
        const privacyBtn = document.getElementById('privacyBtn');
        const themeBtn = document.getElementById('themeBtn');
        const menuBtn = document.getElementById('menuBtn');
        const mainMenu = document.getElementById('mainMenu');

        if (privacyBtn) {
            privacyBtn.addEventListener('click', togglePrivacyMode);
        }

        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }

        if (menuBtn && mainMenu) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mainMenu.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                mainMenu.classList.remove('show');
            });

            // Menu dropdown actions
            const menuItems = mainMenu.querySelectorAll('[data-action]');
            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    const action = item.getAttribute('data-action');
                    handleMenuAction(action);
                    mainMenu.classList.remove('show');
                });
            });
        }

        // Print date
        const printDateEl = document.getElementById('printDate');
        if (printDateEl) {
            printDateEl.textContent = new Date().toLocaleDateString('pt-BR');
        }
    };

    const handleMenuAction = (action) => {
        switch(action) {
            case 'toggleLanguage':
                toggleLanguage();
                break;
            case 'toggleCurrency':
                toggleCurrency();
                break;
            case 'enableNotifications':
                enableNotifications();
                break;
            case 'openClearDataModal':
                if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
                    clearData();
                    location.reload();
                }
                break;
            default:
                showToast(`Funcionalidade "${action}" em desenvolvimento`, 'info');
        }
    };

    const toggleLanguage = () => {
        state.settings.language = state.settings.language === 'pt-BR' ? 'en-US' : 'pt-BR';
        const languageText = document.getElementById('languageText');
        if (languageText) {
            languageText.textContent = state.settings.language === 'pt-BR' 
                ? 'Idioma: Português' 
                : 'Language: English';
        }
        saveData();
        showToast('Idioma alterado. Reinicie para aplicar.', 'info');
    };

    const toggleCurrency = () => {
        state.settings.currency = state.settings.currency === 'BRL' ? 'USD' : 'BRL';
        saveData();
        showToast('Moeda alterada', 'info');
    };

    const enableNotifications = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    state.settings.notifications = true;
                    saveData();
                    showToast('Notificações ativadas!', 'success');
                    
                    const notificationsText = document.getElementById('notificationsText');
                    if (notificationsText) {
                        notificationsText.textContent = 'Notificações Ativas';
                    }
                } else {
                    showToast('Permissão de notificação negada', 'error');
                }
            });
        } else {
            showToast('Seu navegador não suporta notificações', 'error');
        }
    };

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    const init = () => {
        console.log('Smart Finance inicializando...');
        
        // Carregar dados salvos
        loadData();
        
        // Aplicar tema salvo
        if (state.settings.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        // Configurar modal de termos
        setupDisclaimerModal();
        
        // Configurar eventos
        setupEventListeners();
        
        // Atualizar display do mês
        updateMonthDisplay();
        
        // Simular dados de demonstração se estiver em modo demo
        if (state.settings.demoMode) {
            loadDemoData();
        }
        
        console.log('Smart Finance inicializado com sucesso!');
    };

    const loadDemoData = () => {
        // Dados de exemplo para demonstração
        const today = new Date();
        
        state.transactions = [
            { id: generateId(), type: 'income', amount: 5000, description: 'Salário', category: 'Trabalho', date: new Date(today.getFullYear(), today.getMonth(), 5).toISOString() },
            { id: generateId(), type: 'expense', amount: 1500, description: 'Aluguel', category: 'Moradia', date: new Date(today.getFullYear(), today.getMonth(), 10).toISOString() },
            { id: generateId(), type: 'expense', amount: 500, description: 'Supermercado', category: 'Alimentação', date: new Date(today.getFullYear(), today.getMonth(), 15).toISOString() },
            { id: generateId(), type: 'expense', amount: 200, description: 'Internet', category: 'Contas', date: new Date(today.getFullYear(), today.getMonth(), 20).toISOString() }
        ];
        
        state.accounts = [
            { id: generateId(), name: 'Conta Corrente', balance: 3500, type: 'checking' },
            { id: generateId(), name: 'Poupança', balance: 10000, type: 'savings' }
        ];
        
        state.creditCards = [
            { id: generateId(), name: 'Cartão Platinum', limit: 10000, currentBalance: 2500, transactions: [] }
        ];
        
        saveData();
    };

    // Iniciar aplicação quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
