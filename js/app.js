(isRecurring) {
                const recurrenceType = document.getElementById('recurrenceType').value;
                const recurrenceCount = parseInt(document.getElementById('recurrenceCount').value);
                if (recurrenceCount < 2) { 
                    this.showToast('❌ ' + this.t('minInstallments')); 
                    return; 
                }
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
                    if (recurrenceType === 'installment') {
                        transDescription = description + ' - Parcela ' + (i + 1) + '/' + recurrenceCount;
                    }
                    const uniqueId = this.generateUniqueId() + '_' + i;
                    this.transactions.push({
                        id: uniqueId, 
                        date: transDate.toISOString().split('T')[0], 
                        amount: signedAmount,
                        category: category, 
                        description: transDescription, 
                        statusOk: statusOk,
                        paymentMethod: paymentMethod, 
                        accountId: accountId,
                        recurrence: { 
                            groupId: recurrenceGroupId, 
                            type: recurrenceType, 
                            total: recurrenceCount, 
                            current: i + 1 
                        }
                    });
                    createdCount++;
                }
                
                // CORREÇÃO v4.4.3: Atualizar saldo de TODAS as parcelas no mês atual
                const currentMonth = this.currentMonth.getMonth();
                const currentYear = this.currentMonth.getFullYear();
                const monthTrans = this.transactions.filter(t => {
                    if (t.accountId !== accountId) return false;
                    if (!t.recurrence || t.recurrence.groupId !== recurrenceGroupId) return false;
                    const d = new Date(t.date);
                    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
                });
                
                if (monthTrans.length > 0) {
                    let monthTotal = 0;
                    monthTrans.forEach(t => monthTotal += t.amount);
                    this.updateAccountBalance(accountId, monthTotal);
                }
                
                this.clearCache(); 
                this.saveTransactions(); 
                this.render(); 
                this.updateCharts(); 
                this.updateAlertBadge();
                this.showToast('✅ ' + createdCount + ' ' + this.t('recurringCreated'));
                closeModal('newTransactionModal'); 
                this.clearForm();
                this.checkNegativeBalance();
                return;
            }

            const transaction = {
                id: this.generateUniqueId(), 
                date: date, 
                amount: signedAmount,
                category: category, 
                description: description, 
                statusOk: statusOk,
                paymentMethod: paymentMethod, 
                accountId: accountId
            };
            this.transactions.push(transaction);
            const success = this.updateAccountBalance(accountId, signedAmount);
            if (!success) {
                this.transactions.pop();
                return;
            }
            this.clearCache(); 
            this.saveTransactions(); 
            this.render(); 
            this.updateCharts(); 
            this.updateAlertBadge();
            this.showToast('✅ ' + this.t('transactionAdded'));
            closeModal('newTransactionModal'); 
            this.clearForm();
            this.checkNegativeBalance();
        }

        clearForm() {
            const form = document.getElementById('transactionForm');
            if (form) form.reset();
            this.setDefaultDate();
            this.currentTransactionType = 'expense';
            document.querySelectorAll('#transactionForm .type-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-type') === 'expense');
            });
            this.filterCategoriesByType('category', 'expense');
            const recurringOptions = document.getElementById('recurringOptions');
            if (recurringOptions) recurringOptions.style.display = 'none';
        }

        editTransaction(id) {
            const t = this.transactions.find(x => x.id === id);
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
            
            document.querySelectorAll('#editForm .type-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-type') === this.currentEditType);
            });
            this.filterCategoriesByType('editCategory', this.currentEditType);
            openModal('editModal');
        }

        updateTransaction() {
            const fields = [
                { id: 'editDate', label: this.t('selectDate'), required: true },
                { id: 'editAmount', label: this.t('invalidAmount'), required: true, type: 'number', min: 0.01 },
                { id: 'editCategory', label: this.t('selectCategory'), required: true },
                { id: 'editPaymentMethod', label: this.t('selectPayment'), required: true },
                { id: 'editTransactionAccount', label: this.t('selectAccount'), required: true }
            ];

            if (!this.validateForm(fields)) return;

            const id = document.getElementById('editId').value;
            const date = document.getElementById('editDate').value;
            const amount = parseFloat(document.getElementById('editAmount').value);
            const category = document.getElementById('editCategory').value;
            const paymentMethod = document.getElementById('editPaymentMethod').value;
            const accountId = document.getElementById('editTransactionAccount').value;

            let idx = -1;
            for (let i = 0; i < this.transactions.length; i++) {
                if (String(this.transactions[i].id) === String(id)) { 
                    idx = i; 
                    break; 
                }
            }
            if (idx === -1) { 
                this.showToast('❌ ' + this.t('transactionNotFound')); 
                return; 
            }

            const oldTransaction = this.transactions[idx];
            const oldAmount = oldTransaction.amount;
            const oldAccountId = oldTransaction.accountId;
            const newAmount = this.currentEditType === 'expense' ? -Math.abs(amount) : Math.abs(amount);

            if (oldAccountId) this.updateAccountBalance(oldAccountId, -oldAmount);

            // Verificar saldo negativo
            if (this.settings.blockNegativeBalance && newAmount < 0) {
                const acc = this.getAccountById(accountId);
                if (acc) {
                    const newBalance = (parseFloat(acc.balance) || 0) + newAmount;
                    if (newBalance < 0) {
                        if (oldAccountId) this.updateAccountBalance(oldAccountId, oldAmount);
                        this.showToast(this.t('negativeBalanceBlocked'));
                        return;
                    }
                }
            }

            const isRecurring = document.getElementById('editRecurring').checked;
            let recurrenceData = null;
            if (isRecurring) {
                const recurrenceType = document.getElementById('editRecurrenceType').value;
                const recurrenceCount = parseInt(document.getElementById('editRecurrenceCount').value);
                recurrenceData = { 
                    type: recurrenceType, 
                    total: recurrenceCount, 
                    current: oldTransaction.recurrence ? oldTransaction.recurrence.current : 1 
                };
            }

            this.transactions[idx] = {
                id: oldTransaction.id, 
                date: date, 
                amount: newAmount,
                category: category, 
                description: document.getElementById('editDescription').value,
                statusOk: document.getElementById('editStatusOk').checked,
                paymentMethod: paymentMethod, 
                accountId: accountId,
                recurrence: recurrenceData
            };

            this.updateAccountBalance(accountId, newAmount);
            this.clearCache(); 
            this.saveTransactions(); 
            this.render();
            this.updateCharts(); 
            this.updateAlertBadge();
            closeModal('editModal');
            this.showToast('✅ ' + this.t('transactionUpdated'));
            this.checkNegativeBalance();
        }

        deleteFromEdit() {
            if (!this.currentEditId) return;
            if (!confirm('Excluir esta transação?')) return;
            const t = this.transactions.find(x => x.id === this.currentEditId);
            if (t && t.accountId) this.updateAccountBalance(t.accountId, -t.amount);
            this.transactions = this.transactions.filter(x => x.id !== this.currentEditId);
            this.clearCache(); 
            this.saveTransactions(); 
            this.render();
            this.updateCharts(); 
            this.updateAlertBadge();
            closeModal('editModal');
            this.showToast('✅ ' + this.t('transactionDeleted'));
            this.checkNegativeBalance();
        }

        deleteTransaction(id) {
            if (!confirm('Excluir esta transação?')) return;
            const t = this.transactions.find(x => x.id === id);
            if (t && t.accountId) this.updateAccountBalance(t.accountId, -t.amount);
            this.transactions = this.transactions.filter(x => x.id !== id);
            this.clearCache(); 
            this.saveTransactions(); 
            this.render();
            this.updateCharts(); 
            this.updateAlertBadge();
            this.showToast('✅ ' + this.t('transactionDeleted'));
            this.checkNegativeBalance();
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
                try { 
                    this.updateChartsTheme(); 
                } catch (e) { 
                    console.warn('[SmartWallet] Erro tema:', e); 
                }
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
            if (typeof Chart === 'undefined') { 
                console.error('[SmartWallet] Chart.js não carregado!'); 
                return; 
            }
            const colors = this.getChartColors();
            const lineOpts = {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: 'top', 
                        labels: { color: colors.text } 
                    } 
                },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        ticks: { color: colors.textSecondary }, 
                        grid: { color: colors.grid } 
                    },
                    x: { 
                        ticks: { color: colors.textSecondary }, 
                        grid: { color: colors.grid } 
                    }
                }
            };
            try {
                this.charts.line = new Chart(document.getElementById('lineChart').getContext('2d'), {
                    type: 'line',
                    data: { 
                        labels: [], 
                        datasets: [
                            { 
                                label: this.t('income_plural'), 
                                data: [], 
                                borderColor: '#10b981', 
                                backgroundColor: 'rgba(16,185,129,0.1)', 
                                tension: 0.4 
                            },
                            { 
                                label: this.t('expense_plural'), 
                                data: [], 
                                borderColor: '#ef4444', 
                                backgroundColor: 'rgba(239,68,68,0.1)', 
                                tension: 0.4 
                            }
                        ]
                    },
                    options: lineOpts
                });
            } catch (e) { 
                console.error('[SmartWallet] Erro line:', e); 
            }
            try {
                this.charts.pie = new Chart(document.getElementById('pieChart').getContext('2d'), {
                    type: 'bar',
                    data: { 
                        labels: [], 
                        datasets: [{ data: [], backgroundColor: [] }] 
                    },
                    options: {
                        indexAxis: 'y', 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { display: false } 
                        },
                        scales: {
                            x: { 
                                beginAtZero: true, 
                                ticks: { color: colors.textSecondary }, 
                                grid: { color: colors.grid } 
                            },
                            y: { 
                                ticks: { color: colors.textSecondary }, 
                                grid: { color: colors.grid } 
                            }
                        },
                        barPercentage: 0.3, 
                        categoryPercentage: 0.5
                    }
                });
            } catch (e) { 
                console.error('[SmartWallet] Erro pie:', e); 
            }
            try {
                this.charts.cards = new Chart(document.getElementById('cardsChart').getContext('2d'), {
                    type: 'line',
                    data: { 
                        labels: [], 
                        datasets: [] 
                    },
                    options: {
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { 
                                position: 'top', 
                                labels: { color: colors.text } 
                            } 
                        },
                        scales: {
                            y: { 
                                beginAtZero: true, 
                                ticks: { color: colors.textSecondary }, 
                                grid: { color: colors.grid } 
                            },
                            x: { 
                                ticks: { color: colors.textSecondary }, 
                                grid: { color: colors.grid } 
                            }
                        }
                    }
                });
            } catch (e) { 
                console.error('[SmartWallet] Erro cards:', e); 
            }
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
                } catch (e) { 
                    console.warn('[SmartWallet] Erro tema gráfico:', e); 
                }
            });
        }

        updateCharts() {
            const self = this;
            const monthsShort = this.getMonths('short');
            const lLabels = [], lInc = [], lExp = [];
            for (let i = -2; i <= 3; i++) {
                const d = new Date(this.currentMonth);
                d.setMonth(d.getMonth() + i);
                lLabels.push(monthsShort[d.getMonth()] + '/' + d.getFullYear());
                const mt = this.getMonthTransactions(d);
                let inc = 0, exp = 0;
                mt.forEach(t => { 
                    if (t.amount > 0) inc += t.amount; 
                    else exp += t.amount; 
                });
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
                    cardLabels.push(monthsShort[d.getMonth()] + '/' + d.getFullYear());
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
                        label: card.name, 
                        data: data,
                        borderColor: card.color, 
                        backgroundColor: card.color + '20',
                        tension: 0.4, 
                        fill: false
                    });
                });
                this.charts.cards.data.labels = cardLabels;
                this.charts.cards.data.datasets = cardDatasets;
                this.charts.cards.update();
            }
            this.updateInvestmentChart();
            this.renderWaterfallChart();
        }

        // ===== ALERTAS =====
        updateAlertBadge() {
            const today = new Date(); 
            today.setHours(0, 0, 0, 0);
            const in3Days = new Date(today); 
            in3Days.setDate(in3Days.getDate() + 3);
            const tomorrow = new Date(today); 
            tomorrow.setDate(tomorrow.getDate() + 1);
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
            
            // Notificações push
            if (this.settings.notifyBills && bills.length > 0 && Notification.permission === 'granted') {
                const notifKey = 'smartwallet_notif_' + today.toISOString().split('T')[0];
                if (!localStorage.getItem(notifKey)) {
                    new Notification(this.t('notificationTitle'), {
                        body: this.t('notificationBody', { count: bills.length }),
                        icon: 'favicon.svg'
                    });
                    localStorage.setItem(notifKey, 'true');
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
            const today = new Date(); 
            today.setHours(0, 0, 0, 0);
            const isClosed = closingDate < today;
            let dueDate = new Date(closingDate);
            if (isClosed) dueDate.setMonth(dueDate.getMonth() + 1);
            dueDate.setDate(card.dueDay);
            return { 
                startDate: previousClosingDate, 
                closingDate: closingDate, 
                dueDate: dueDate, 
                isClosed: isClosed 
            };
        }

        calculateInvoiceTotal(purchases) {
            let total = 0;
            purchases.forEach(p => total += Math.abs(p.amount));
            return total;
        }

        renderCreditCardsList() {
            const container = document.getElementById('creditCardsList');
            if (!container) return;
            this.updateCardMonthLabel();
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
                html += '<div class="credit-card-visual" style="background:linear-gradient(135deg, ' + card.color + ' 0%, ' + self.adjustColor(card.color, -30) + ' 100%);" data-card-id="' + card.id + '">';
                html += '<div class="cc-actions"><button class="cc-action-btn edit-card-btn" data-card-id="' + card.id + '">✏️</button><button class="cc-action-btn delete-card-btn" data-card-id="' + card.id + '">🗑️</button></div>';
                html += '<div class="cc-header"><div class="cc-brand">' + self.escapeHtml(card.brand) + '</div><div class="cc-chip"></div></div>';
                html += '<div class="cc-name">' + self.escapeHtml(card.name) + '</div>';
                html += '<div class="cc-number">•••• •••• •••• ' + self.escapeHtml(card.last4 || '****') + '</div>';
                html += '<div class="cc-footer"><div><div class="cc-label">Fatura Atual</div><div class="cc-value">' + self.formatCurrency(total) + '</div></div><div style="text-align:right;"><div class="cc-label">Disponível</div><div class="cc-value">' + self.formatCurrency(available) + '</div></div></div>';
                html += '<div style="position:absolute; bottom:0; left:0; right:0; height:4px; background:rgba(0,0,0,0.3);"><div style="height:100%; width:' + usedPct + '%; background:' + (usedPct > 80 ? '#ef4444' : usedPct > 50 ? '#f59e0b' : '#10b981') + ';"></div></div>';
                html += '</div>';
            });
            html += '</div>';
            container.innerHTML = html;

            container.querySelectorAll('.credit-card-visual').forEach(cardEl => {
                cardEl.addEventListener('click', () => {
                    const cardId = cardEl.dataset.cardId;
                    openInvoiceModal(cardId);
                });
            });
            container.querySelectorAll('.edit-card-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    self.editCard(btn.dataset.cardId);
                });
            });
            container.querySelectorAll('.delete-card-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    self.deleteCard(btn.dataset.cardId);
                });
            });
        }

        updateCardMonthLabel() {
            const months = this.getMonths();
            const label = document.getElementById('cardMonthLabel');
            if (label) label.textContent = months[this.cardModalMonth.getMonth()] + ' ' + this.cardModalMonth.getFullYear();
        }

        adjustColor(color, amount) {
            const hex = color.replace('#', '');
            const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
            const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
            const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
            return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
        }

        saveCard() {
            const fields = [
                { id: 'cardName', label: this.t('informName'), required: true }
            ];
            if (!this.validateForm(fields)) return;

            const id = document.getElementById('cardEditId').value;
            const name = document.getElementById('cardName').value.trim();
            const brand = document.getElementById('cardBrand').value;
            const last4 = document.getElementById('cardLast4').value.trim();
            const closingDay = parseInt(document.getElementById('cardClosingDay').value);
            const dueDay = parseInt(document.getElementById('cardDueDay').value);
            const limit = parseFloat(document.getElementById('cardLimit').value);
            const color = document.getElementById('cardColor').value;

            if (id) {
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.cards[i].id === id) { 
                        this.cards[i] = { id, name, brand, last4, closingDay, dueDay, limit, color }; 
                        break; 
                    }
                }
            } else {
                this.cards.push({ 
                    id: this.generateUniqueId(), 
                    name, brand, last4, closingDay, dueDay, limit, color 
                });
            }
            this.clearCache(); 
            this.saveCards(); 
            this.populatePaymentMethodSelects(); 
            this.renderCreditCardsList();
            closeModal('newCardModal');
            this.showToast('✅ ' + (id ? this.t('cardUpdated') : this.t('cardCreated')));
        }

        deleteCard(id) {
            if (!confirm('Excluir este cartão?')) return;
            this.cards = this.cards.filter(c => c.id !== id);
            this.clearCache(); 
            this.saveCards(); 
            this.populatePaymentMethodSelects(); 
            this.renderCreditCardsList();
            this.showToast('✅ ' + this.t('cardRemoved'));
        }

        editCard(id) {
            const card = this.getCardById(id); 
            if (!card) return;
            document.getElementById('cardEditId').value = card.id;
            document.getElementById('cardName').value = card.name;
            document.getElementById('cardBrand').value = card.brand;
            document.getElementById('cardLast4').value = card.last4 || '';
            document.getElementById('cardClosingDay').value = card.closingDay;
            document.getElementById('cardDueDay').value = card.dueDay;
            document.getElementById('cardLimit').value = card.limit;
            document.getElementById('cardColor').value = card.color;
            document.getElementById('newCardTitle').textContent = 'Editar Cartão';
            openModal('newCardModal');
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
            const today = new Date(); 
            today.setHours(0, 0, 0, 0);
            const daysUntilDue = Math.ceil((period.dueDate - today) / (1000 * 60 * 60 * 24));
            let dueClass = '';
            let dueText = this.formatDate(period.dueDate.toISOString().split('T')[0]);
            if (daysUntilDue < 0) { 
                dueClass = 'overdue'; 
                dueText += ' (' + this.t('overdue') + ' ' + Math.abs(daysUntilDue) + ' ' + this.t('days') + ')'; 
            } else if (daysUntilDue === 0) { 
                dueClass = 'overdue'; 
                dueText += ' (' + this.t('dueToday') + ')'; 
            } else if (daysUntilDue <= 3) { 
                dueText += ' (' + this.t('inDays', {days: daysUntilDue}) + ')'; 
            }
            if (period.isClosed) dueText += ' ✓ ' + this.t('closed');
            let html = '<div class="invoice-period-display">';
            html += '<div class="invoice-period-info"><div class="invoice-period-label">📅 ' + this.t('invoicePeriod') + '</div>';
            html += '<div class="invoice-period-value">' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' até ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '</div></div>';
            html += '<div class="invoice-due-info"><div class="invoice-due-label">💳 ' + this.t('dueDate') + '</div>';
            html += '<div class="invoice-due-value ' + dueClass + '">' + dueText + '</div></div></div>';
            html += '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">';
            html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">' + this.t('limit') + '</span><span style="font-weight:600;">' + this.formatCurrency(card.limit) + '</span></div>';
            html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">' + this.t('invoiceTotal') + '</span><span style="font-weight:600; color:var(--danger-color);">' + this.formatCurrency(total) + '</span></div>';
            html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">' + this.t('minimum') + '</span><span style="font-weight:600;">' + this.formatCurrency(minimum) + '</span></div>';
            html += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700;"><span>' + this.t('available') + '</span><span style="color:var(--success-color);">' + this.formatCurrency(available) + '</span></div></div>';
            html += '<div style="display:flex; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:10px;">';
            html += '<h3 style="font-size:1.1rem;">' + this.t('purchases') + ' (' + purchases.length + ')</h3>';
            html += '<div style="display:flex; gap:8px;">';
            html += '<button class="btn btn-secondary btn-small" id="exportInvoiceCsvBtn">📥 CSV</button>';
            html += '<button class="btn btn-secondary btn-small" id="printInvoicePdfBtn">🖨️ PDF</button></div></div>';
            html += '<div>';
            if (purchases.length === 0) {
                html += '<p style="text-align:center; padding:20px; color:var(--text-secondary);">' + this.t('noPurchases') + '</p>';
            } else {
                purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(p => {
                    const cat = self.getCategoryById(p.category);
                    html += '<div style="background:var(--input-bg); border-radius:12px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:12px;">';
                    html += '<div style="flex:1;"><div style="font-weight:600;">' + self.escapeHtml(p.description) + '</div>';
                    html += '<div style="font-size:0.8rem; color:var(--text-secondary); display:flex; gap:10px;"><span>' + self.formatDate(p.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeHtml(cat.name) + '</span></div></div>';
                    html += '<div style="font-weight:700;">' + self.formatCurrency(Math.abs(p.amount)) + '</div>';
                    html += '<button class="btn btn-danger btn-small delete-invoice-item" data-id="' + p.id + '">🗑️</button></div>';
                });
            }
            html += '</div>';
            html += '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">';
            html += '<button class="btn btn-success" id="payInvoiceBtn">💰 ' + this.t('payInvoice') + '</button>';
            html += '<button class="btn btn-secondary" data-close-modal="invoiceModal">' + this.t('close') + '</button></div>';
            document.getElementById('invoiceContent').innerHTML = html;
            openModal('invoiceModal');

            document.getElementById('exportInvoiceCsvBtn').addEventListener('click', () => self.exportInvoiceCSV(cardId));
            document.getElementById('printInvoicePdfBtn').addEventListener('click', () => self.printInvoicePDF(cardId));
            document.getElementById('payInvoiceBtn').addEventListener('click', () => self.payInvoice(cardId));
            document.querySelectorAll('.delete-invoice-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    self.deleteTransaction(btn.dataset.id);
                    self.openInvoice(cardId, offset);
                });
            });
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
            if (total <= 0) { 
                this.showToast('❌ ' + this.t('emptyInvoice')); 
                return; 
            }
            if (!confirm(this.t('confirmPayment') + ' ' + this.formatCurrency(total) + '?')) return;
            this.transactions.push({
                id: this.generateUniqueId(), 
                date: new Date().toISOString().split('T')[0],
                amount: -total, 
                category: 'servicos', 
                description: 'Pagamento Fatura ' + card.name,
                statusOk: false, 
                paymentMethod: 'pix', 
                accountId: ''
            });
            this.clearCache(); 
            this.saveTransactions(); 
            this.render(); 
            this.updateCharts(); 
            this.updateAlertBadge();
            this.showToast('✅ ' + this.t('paymentRegistered'));
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
                if (result === 'saved' || result === 'downloaded') {
                    this.showToast('✅ ' + this.t('backupExported'));
                }
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
            if (!printWindow) { 
                this.showToast('⚠️ ' + this.t('allowPopups')); 
                return; 
            }
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
            printWindow.document.write('<tfoot><tr class="total"><td colspan="3" style="text-align:right;">' + this.t('total') + ':</td><td>' + this.formatCurrency(total) + '</td></tr></tfoot></table>');
            printWindow.document.write('<div class="footer">Smart Wallet • Gerado em ' + new Date().toLocaleString(this.getLanguage()) + '<br>Idealizado por RogerElizar™</div>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.document.title = fileName;
            setTimeout(() => { 
                printWindow.focus(); 
                printWindow.print(); 
            }, 300);
        }
