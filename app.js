    (function() {
        'use strict';
        
        const financialQuotes = [
            { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
            { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
            { text: "Um orçamento está dizendo a seu dinheiro para onde ir, em vez de se perguntar para onde ele foi.", author: "Dave Ramsey" },
            { text: "Não economize o que resta depois de gastar; gaste o que resta depois de poupar.", author: "Warren Buffett" },
            { text: "Se você não encontrar uma maneira de ganhar dinheiro enquanto dorme, você trabalhará até morrer.", author: "Warren Buffett" },
            { text: "O melhor investimento que você pode fazer é em si mesmo.", author: "Warren Buffett" },
            { text: "Dinheiro é um péssimo mestre, mas um excelente servo.", author: "P.T. Barnum" },
            { text: "Cuidado com pequenos gastos; um pequeno vazamento afundará um grande navio.", author: "Benjamin Franklin" },
            { text: "Pague a si mesmo primeiro.", author: "George Samuel Clason" },
            { text: "A melhor hora para plantar uma árvore foi há 20 anos. A segunda melhor hora é agora.", author: "Provérbio Chinês" },
            { text: "Finanças não são sobre matemática, são sobre comportamento.", author: "Morgan Housel" },
            { text: "Gastar dinheiro para impressionar pessoas é a maneira mais rápida de ficar pobre.", author: "Morgan Housel" },
            { text: "Cada real que você economiza é um empregado que trabalha para você.", author: "T. Harv Eker" },
            { text: "A liberdade financeira é mais sobre controle do que sobre dinheiro.", author: "Ramit Sethi" },
            { text: "O maior inimigo da riqueza é a expectativa de ficar rico rápido.", author: "Morgan Housel" },
            { text: "Planeje suas finanças como planeja suas férias: com destino, roteiro e orçamento.", author: "Anônimo" },
            { text: "A paciência é a virtude dos investidores bem-sucedidos.", author: "Peter Lynch" },
            { text: "Investir em conhecimento paga os melhores juros.", author: "Benjamin Franklin" },
            { text: "A educação financeira é a base da liberdade financeira.", author: "Robert Kiyosaki" },
            { text: "O futuro pertence àqueles que se preparam hoje.", author: "Malcolm X" }
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
            { id: 'cuidados_pessoais', name: 'Cuidados Pessoais', color: '#701a1a', type: 'expense' },
            { id: 'docs_juridico', name: 'Docs&Juridico', color: '#404040', type: 'expense' },
            { id: 'inst_financeira', name: 'Inst. Financeira', color: '#574737', type: 'expense' },
            { id: 'lazer', name: 'Lazer', color: '#ff00ff', type: 'expense' },
            { id: 'servicos', name: 'Serviços', color: '#5117a3', type: 'expense' },
            { id: 'pets', name: 'Pets', color: '#1349a8', type: 'expense' },
            { id: 'reserva', name: 'Reserva Emergência', color: '#00ff00', type: 'expense' },
            { id: 'meta', name: 'Meta Econômica', color: '#ccff00', type: 'expense' },
            { id: 'investimento', name: 'Investimento', color: '#e6dcb1', type: 'expense' },
            { id: 'salario', name: 'Salário', color: '#475569', type: 'income' },
            { id: 'freelancer', name: 'Freelancer', color: '#b3e6e0', type: 'income' },
            { id: 'previdencia', name: 'Previdência', color: '#c861ff', type: 'income' },
            { id: 'restituicao', name: 'Restituição', color: '#ffdd00', type: 'income' },
            { id: 'beneficios', name: 'Benefícios', color: '#82cfff', type: 'income' }
        ];

        const manualHTML = `
            <div style="text-align: center; margin-bottom: 40px; padding: 30px; background: var(--gradient-card); border-radius: 16px;">
                <h1 style="font-size: 2rem; margin-bottom: 16px;">🙏 Gratidão e Dedicatória</h1>
                <div class="manual-quote">
                    <p>"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."</p>
                    <div class="quote-author">— Tiago 1:17</div>
                </div>
                <p style="font-size: 1rem; line-height: 1.8; margin-top: 20px;">
                    Agradeço a Deus por toda sabedoria, saúde e recursos que me permitiram desenvolver este projeto. 
                    Cada linha de código, cada ideia, cada oportunidade são frutos da Sua graça em minha vida.
                </p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid var(--primary-color);">
                    <h3 style="color: var(--accent-color); margin-bottom: 12px;">💝 Aos meus filhos</h3>
                    <div class="manual-quote">
                        <p>Dedico este trabalho a vocês, meus amados filhos. Que este seja um legado de ensino, organização e sabedoria financeira. Que através dele, vocês aprendam o valor do planejamento, da responsabilidade e da generosidade. Que cada real economizado hoje seja uma semente de prosperidade para o amanhã. Amo vocês infinitamente!</p>
                        <div class="quote-author">— Com todo amor, pai</div>
                    </div>
                </div>
            </div>
            
            <h2>🎯 Bem-vindo ao Smart Wallet!</h2>
            <p>Parabéns por dar o primeiro passo rumo à sua <strong>liberdade financeira</strong>! O Smart Wallet não é apenas mais um aplicativo de controle de gastos — é seu parceiro na jornada para transformar sua relação com o dinheiro.</p>
            
            <div class="manual-tip">
                <strong>💡 Você sabia?</strong> Estudos mostram que pessoas que acompanham suas finanças regularmente economizam em média <strong>20% a mais</strong> do que aquelas que não controlam seus gastos.
            </div>
            
            <h2>📱 Instalação como WebApp</h2>
            <p>O Smart Wallet funciona como um aplicativo instalado no seu dispositivo, mesmo sendo uma aplicação web.</p>
            
            <h3>💻 No Computador (Chrome, Edge, Brave)</h3>
            <ol>
                <li>Acesse o site pelo navegador</li>
                <li>Procure o ícone de instalação na barra de endereços</li>
                <li>Ou clique no menu do navegador (⋮) → "Instalar Smart Wallet..."</li>
                <li>Confirme a instalação</li>
                <li>Pronto! O app aparecerá na sua área de trabalho</li>
            </ol>
            
            <h3>📱 No Celular Android (Chrome)</h3>
            <ol>
                <li>Abra o site no Chrome</li>
                <li>Toque nos três pontos (⋮) no canto superior direito</li>
                <li>Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"</li>
                <li>Confirme tocando em "Instalar"</li>
                <li>O ícone aparecerá na sua tela inicial</li>
            </ol>
            
            <h3>🍎 No iPhone (Safari)</h3>
            <ol>
                <li>Abra o site no Safari</li>
                <li>Toque no botão Compartilhar</li>
                <li>Role para baixo e toque em "Adicionar à Tela de Início"</li>
                <li>Toque em "Adicionar"</li>
                <li>O app aparecerá na sua tela inicial</li>
            </ol>
            
            <div class="manual-tip">
                <strong>🔒 Privacidade Total:</strong> Após a instalação, o app funciona mesmo offline! Todos os dados ficam apenas no seu dispositivo.
            </div>
            
            <h2>💰 Funcionalidades Principais</h2>
            
            <h3>📊 Dashboard Financeiro</h3>
            <p>A tela inicial mostra um resumo completo da sua situação financeira:</p>
            <ul>
                <li><strong>Saldo do Mês:</strong> Quanto você ganhou menos quanto gastou</li>
                <li><strong>Receitas:</strong> Total de entradas</li>
                <li><strong>Despesas:</strong> Total de saídas</li>
                <li><strong>Meta de Reserva:</strong> Progresso em direção à sua meta</li>
            </ul>
            
            <div class="manual-success">
                <strong>🎯 Dica de Coach:</strong> Uma boa regra é ter uma reserva de emergência equivalente a <strong>6 meses</strong> das suas despesas mensais. Isso te protege contra imprevistos sem precisar recorrer a empréstimos.
            </div>
            
            <h3>💳 Gestão de Cartões de Crédito</h3>
            <p>Controle todos os seus cartões em um só lugar:</p>
            <ul>
                <li>Cadastre cartões com limite, dia de fechamento e vencimento</li>
                <li>Acompanhe faturas e compras parceladas</li>
                <li>Veja quanto do limite já foi utilizado</li>
                <li>Exporte faturas em CSV ou PDF</li>
            </ul>
            
            <div class="manual-warning">
                <strong>⚠️ Atenção:</strong> Cartões de crédito podem ser grandes vilões financeiros se mal utilizados. A regra de ouro: <strong>só compre no crédito se puder pagar a fatura integralmente</strong>. Parcelar a fatura gera juros que podem multiplicar sua dívida em até 15x!
            </div>
            
            <h3>🔔 Alertas de Contas</h3>
            <p>Nunca mais esqueça uma conta! O sistema avisa automaticamente quando há contas vencendo nos próximos 3 dias.</p>
            
            <h3>📈 Gráficos e Análises</h3>
            <p>Visualize seus dados de forma clara:</p>
            <ul>
                <li><strong>Entradas e Saídas:</strong> Evolução mensal</li>
                <li><strong>Despesas por Categoria:</strong> Onde seu dinheiro está indo</li>
                <li><strong>Cartões de Crédito:</strong> Acompanhamento de 6 meses</li>
            </ul>
            
            <h2>🚀 Guia do Sucesso Financeiro</h2>
            
            <h3>💡 A Mentalidade da Prosperidade</h3>
            <p>Muitas pessoas acham que riqueza é apenas para "ricos". Mas a verdade é que <strong>prosperidade financeira</strong> é acessível a todos que seguem princípios básicos:</p>
            
            <div class="manual-success">
                <strong>Caso Real - João e Maria:</strong><br>
                João e Maria ganhavam R$ 5.000/mês. Sem controle, viviam no limite. Começaram a usar o Smart Wallet e aplicaram a regra 50-30-20:<br><br>
                • <strong>R$ 2.500</strong> (50%) - Necessidades<br>
                • <strong>R$ 1.500</strong> (30%) - Desejos<br>
                • <strong>R$ 1.000</strong> (20%) - Objetivos financeiros<br><br>
                Em 3 anos, construíram uma reserva de R$ 36.000 e começaram a investir. Hoje, 5 anos depois, têm R$ 120.000 investidos e uma vida financeira tranquila. Não são milionários, mas são <strong>financeiramente livres</strong>.
            </div>
            
            <h3>🎯 A Regra 50-30-20</h3>
            <p>Uma boa divisão do seu salário é:</p>
            <ul>
                <li><strong>50%</strong> para necessidades (aluguel, comida, transporte)</li>
                <li><strong>30%</strong> para desejos (lazer, restaurantes, hobbies)</li>
                <li><strong>20%</strong> para objetivos financeiros (reserva, investimentos, quitar dívidas)</li>
            </ul>
            
            <h3>💎 Poupar NÃO é Suficiente - Invista!</h3>
            <p>Muitas pessoas cometem o erro de apenas guardar dinheiro na poupança. Mas com a inflação, seu dinheiro <strong>perde valor</strong> com o tempo!</p>
            
            <div class="manual-warning">
                <strong>Caso Real - Carlos:</strong><br>
                Carlos guardava R$ 500/mês na poupança. Em 10 anos, tinha R$ 60.000. Mas com inflação média de 5% ao ano, esses R$ 60.000 compravam apenas o equivalente a R$ 37.000 de 10 anos atrás. Ele <strong>perdeu R$ 23.000 em poder de compra</strong>!
            </div>
            
            <div class="manual-success">
                <strong>Caso Real - Ana:</strong><br>
                Ana investia R$ 500/mês em um CDB que rendia 10% ao ano. Em 10 anos, tinha R$ 102.000. Mesmo com a mesma inflação, seu dinheiro <strong>rendeu acima da inflação</strong> e ela ganhou poder de compra real!
            </div>
            
            <h3>📊 Onde Investir (Básico)</h3>
            <p>Para iniciantes, algumas opções seguras:</p>
            <ul>
                <li><strong>Tesouro Direto:</strong> Emprestar dinheiro para o governo (muito seguro)</li>
                <li><strong>CDB:</strong> Emprestar dinheiro para bancos (rendimento melhor que poupança)</li>
                <li><strong>LCI/LCA:</strong> Isentos de imposto de renda</li>
                <li><strong>Fundos de Investimento:</strong> Pool de investimentos gerenciados por profissionais</li>
            </ul>
            
            <div class="manual-tip">
                <strong>💡 Dica de Ouro:</strong> Antes de investir, quite todas as dívidas com juros altos (cartão de crédito, cheque especial). Os juros que você paga são quase sempre maiores que qualquer investimento!
            </div>
            
            <h3>⚠️ Os Riscos da Estagnação Financeira</h3>
            <p>Não cuidar das finanças pode levar a situações graves:</p>
            
            <div class="manual-warning">
                <strong>Caso Hipotético - Pedro:</strong><br>
                Pedro ganhava bem, mas não controlava gastos. Acumulou R$ 30.000 em dívidas no cartão. Os juros de 12% ao mês fizeram a dívida crescer para R$ 100.000 em 2 anos. Perdeu o emprego, não conseguiu pagar, teve o nome negativado e não conseguia mais nem alugar um apartamento. Levou 5 anos para se recuperar.<br><br>
                <strong>Lição:</strong> Dívidas não resolvidas crescem exponencialmente e podem destruir sua vida financeira por anos.
            </div>
            
            <h3>🎓 Educação Financeira Contínua</h3>
            <p>O mundo financeiro está sempre mudando. Mantenha-se informado:</p>
            <ul>
                <li>Leia livros sobre finanças (sugestões: "Pai Rico, Pai Pobre", "O Homem Mais Rico da Babilônia")</li>
                <li>Acompanhe canais educativos no YouTube</li>
                <li>Faça cursos gratuitos online</li>
                <li>Converse com pessoas financeiramente organizadas</li>
            </ul>
            
            <h2>🎯 Seu Plano de Ação</h2>
            
            <h3>Semana 1: Diagnóstico</h3>
            <ol>
                <li>Cadastre todas as suas fontes de renda</li>
                <li>Registre todos os gastos do mês atual</li>
                <li>Identifique onde seu dinheiro está indo</li>
            </ol>
            
            <h3>Semana 2: Organização</h3>
            <ol>
                <li>Crie categorias personalizadas para seus gastos</li>
                <li>Defina sua meta de reserva de emergência</li>
                <li>Configure alertas para contas importantes</li>
            </ol>
            
            <h3>Semana 3: Planejamento</h3>
            <ol>
                <li>Aplique a regra 50-30-20 ao seu orçamento</li>
                <li>Identifique gastos que podem ser cortados</li>
                <li>Defina metas financeiras de curto, médio e longo prazo</li>
            </ol>
            
            <h3>Semana 4: Execução</h3>
            <ol>
                <li>Comece a registrar TODOS os gastos diariamente</li>
                <li>Revise seus gastos semanalmente</li>
                <li>Ajuste seu orçamento conforme necessário</li>
            </ol>
            
            <div class="manual-success">
                <strong>🌟 Lembre-se:</strong> A jornada de mil milhas começa com um único passo. Você já deu o primeiro passo ao baixar este aplicativo. Continue firme e consistente. Em 6 meses, você não vai se reconhecer!
            </div>
            
            <h2>📞 Suporte e Comunidade</h2>
            <p>Se tiver dúvidas ou sugestões, entre em contato:</p>
            <ul>
                <li><strong>E-mail:</strong> rogerelizar@gmail.com</li>
                <li><strong>Feedback:</strong> Use o botão "Apoie o Projeto" no menu</li>
            </ul>
            
            <div style="text-align: center; margin-top: 40px; padding: 30px; background: var(--gradient-card); border-radius: 16px;">
                <h3 style="margin-bottom: 16px;">🙏 Bênção Final</h3>
                <div class="manual-quote">
                    <p>Que Deus abençoe sua jornada financeira. Que você tenha sabedoria para administrar, generosidade para compartilhar e disciplina para perseverar. Que cada decisão financeira seja um passo em direção à prosperidade que Deus preparou para você.</p>
                    <div class="quote-author">— RogerElizar™</div>
                </div>
            </div>
        `;

        class SmartWallet {
            constructor() {
                this.transactions = this.loadFromStorage('smartwallet_transactions', []);
                this.categories = this.loadFromStorage('smartwallet_categories', this.getDefaultCategories());
                this.cards = this.loadFromStorage('smartwallet_cards', []);
                this.cardPurchases = this.loadFromStorage('smartwallet_card_purchases', []);
                this.currentMonth = new Date();
                this.currentMonth.setDate(1);
                this.goal = this.loadFromStorage('smartwallet_goal', 0);
                this.monthlyContribution = this.loadFromStorage('smartwallet_monthly_contribution', 0);
                this.currentTransactionType = 'expense';
                this.currentEditType = 'expense';
                this.newCategoryType = 'expense';
                this.currentEditId = null;
                this.privacyOn = localStorage.getItem('smartwallet_privacy') === 'true';
                this.darkMode = localStorage.getItem('smartwallet_dark') !== 'false';
                this.charts = {};
                this.pendingCsvData = null;
                this.pendingBackupData = null;
                this.searchTimeout = null;
                this.pendingRecurrenceUpdate = null;
                this.init();
            }

            getDefaultCategories() { return JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)); }

            init() {
                this.applyTheme();
                this.applyPrivacy();
                this.setupEventListeners();
                this.setDefaultDate();
                this.updateMonthDisplay();
                this.populateCategorySelects();
                this.populatePaymentMethodSelects();
                this.setupGoalForm();
                this.render();
                this.initCharts();
                this.updateAlertBadge();
                this.setupConnectionHandler();
                this.setupStorageSync();
                this.setupKeyboardShortcuts();
                this.setupGlobalErrorHandlers();
            }

            loadFromStorage(key, def) { 
                try { 
                    const v = localStorage.getItem(key); 
                    if (!v) return def;
                    const parsed = JSON.parse(v);
                    if (Array.isArray(def) && !Array.isArray(parsed)) return def;
                    if (typeof def === 'number' && typeof parsed !== 'number') return def;
                    if (typeof def === 'boolean' && typeof parsed !== 'boolean') return def;
                    return parsed;
                } catch { 
                    return def; 
                }
            }

            saveTransactions() { 
                try {
                    localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions));
                } catch (e) {
                    if (e.name === 'QuotaExceededError') {
                        this.showToast('⚠️ Armazenamento cheio! Exporte um backup e limpe dados antigos.');
                    }
                }
            }
            saveCategories() { 
                try {
                    localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories));
                } catch (e) {
                    if (e.name === 'QuotaExceededError') {
                        this.showToast('⚠️ Armazenamento cheio!');
                    }
                }
            }
            saveCards() { 
                try {
                    localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards));
                } catch (e) {
                    if (e.name === 'QuotaExceededError') {
                        this.showToast('⚠️ Armazenamento cheio!');
                    }
                }
            }
            saveCardPurchases() { 
                try {
                    localStorage.setItem('smartwallet_card_purchases', JSON.stringify(this.cardPurchases));
                } catch (e) {
                    if (e.name === 'QuotaExceededError') {
                        this.showToast('⚠️ Armazenamento cheio!');
                    }
                }
            }

            setupEventListeners() {
                const safeAddListener = (id, event, handler) => {
                    const el = document.getElementById(id);
                    if (el) el.addEventListener(event, handler);
                };

                safeAddListener('transactionForm', 'submit', e => { e.preventDefault(); this.addTransaction(); });
                safeAddListener('editForm', 'submit', e => { e.preventDefault(); this.updateTransaction(); });
                safeAddListener('recurring', 'change', e => { 
                    const opts = document.getElementById('recurringOptions');
                    if (opts) opts.style.display = e.target.checked ? 'block' : 'none'; 
                });
                safeAddListener('editRecurring', 'change', e => { 
                    const opts = document.getElementById('editRecurringOptions');
                    if (opts) opts.style.display = e.target.checked ? 'block' : 'none'; 
                });
                
                safeAddListener('searchFilter', 'input', () => {
                    clearTimeout(this.searchTimeout);
                    this.searchTimeout = setTimeout(() => this.render(), 300);
                });
                safeAddListener('categoryFilter', 'change', () => this.render());
                safeAddListener('typeFilter', 'change', () => this.render());
                safeAddListener('statusFilter', 'change', () => this.render());
                
                ['newTransactionModal', 'editModal', 'categoryModal', 'exportModal', 'goalModal', 
                 'importCsvModal', 'importBackupModal', 'clearDataModal', 'creditCardsModal', 
                 'newCardModal', 'invoiceModal', 'newPurchaseModal', 'billsModal', 'manualModal', 'thanksModal'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.addEventListener('click', e => { 
                            if(e.target.id === id) e.target.classList.remove('active'); 
                        });
                    }
                });
            }

            setDefaultDate() { document.getElementById('date').value = new Date().toISOString().split('T')[0]; }

            changeMonth(delta) {
                this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
                this.updateMonthDisplay();
                this.render();
                this.updateCharts();
            }

            updateMonthDisplay() {
                const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
                document.getElementById('currentMonth').textContent = `${months[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;
            }

            formatMonthYear(date) {
                const m = String(date.getMonth() + 1).padStart(2, '0');
                return `${m}-${date.getFullYear()}`;
            }

            getMonthTransactions(date = this.currentMonth) {
                const m = date.getMonth(), y = date.getFullYear();
                return this.transactions.filter(t => { const d = new Date(t.date + 'T00:00:00'); return d.getMonth() === m && d.getFullYear() === y; });
            }

            populateCategorySelects() {
                const selects = [document.getElementById('category'), document.getElementById('editCategory'), document.getElementById('categoryFilter'), document.getElementById('purchaseCategory')];
                selects.forEach((sel, i) => {
                    if (!sel) return;
                    const val = sel.value;
                    const isFilter = i === 2;
                    sel.innerHTML = isFilter ? '<option value="">Todas as categorias</option>' : '<option value="">Selecione...</option>';
                    this.categories.forEach(cat => {
                        const opt = document.createElement('option');
                        opt.value = cat.id;
                        opt.textContent = cat.name;
                        opt.dataset.type = cat.type;
                        sel.appendChild(opt);
                    });
                    sel.value = val;
                });
                this.filterCategoriesByType('category', this.currentTransactionType);
            }

            populatePaymentMethodSelects() {
                const selects = [document.getElementById('paymentMethod'), document.getElementById('editPaymentMethod')];
                selects.forEach(sel => {
                    if (!sel) return;
                    const currentVal = sel.value;
                    sel.innerHTML = '<option value="">Selecione a forma de pagamento...</option>';
                    
                    const optgroupStandard = document.createElement('optgroup');
                    optgroupStandard.label = '💰 Formas de Pagamento';
                    PAYMENT_METHODS.forEach(pm => {
                        const opt = document.createElement('option');
                        opt.value = pm.id;
                        opt.textContent = `${pm.icon} ${pm.name}`;
                        optgroupStandard.appendChild(opt);
                    });
                    sel.appendChild(optgroupStandard);
                    
                    if (this.cards.length > 0) {
                        const optgroupCards = document.createElement('optgroup');
                        optgroupCards.label = '💳 Cartões de Crédito';
                        this.cards.forEach(card => {
                            const opt = document.createElement('option');
                            opt.value = `card:${card.id}`;
                            opt.textContent = `${card.name} •••• ${card.last4 || '****'}`;
                            optgroupCards.appendChild(opt);
                        });
                        sel.appendChild(optgroupCards);
                    }
                    
                    sel.value = currentVal;
                });
            }

            filterCategoriesByType(selectId, type) {
                const sel = document.getElementById(selectId);
                if (!sel) return;
                const options = sel.querySelectorAll('option');
                options.forEach(opt => {
                    if (opt.value === '') opt.style.display = 'block';
                    else opt.style.display = (opt.dataset.type === type) ? 'block' : 'none';
                });
                const currentVal = sel.value;
                if (currentVal) {
                    const currentOpt = sel.querySelector(`option[value="${currentVal}"]`);
                    if (currentOpt && currentOpt.style.display === 'none') sel.value = '';
                }
            }

            getCategoryById(id) { return this.categories.find(c => c.id === id) || { name: 'Sem categoria', color: '#6b7280', type: 'expense' }; }
            findCategoryByName(name) { return this.categories.find(c => c.name.toLowerCase() === name.toLowerCase()); }
            getCardById(id) { return this.cards.find(c => c.id === id); }
            
            getPaymentMethodName(method) {
                if (!method) return '-';
                if (method.startsWith('card:')) {
                    const cardId = method.replace('card:', '');
                    const card = this.getCardById(cardId);
                    return card ? `💳 ${card.name}` : 'Cartão removido';
                }
                const pm = PAYMENT_METHODS.find(p => p.id === method);
                return pm ? `${pm.icon} ${pm.name}` : method;
            }

            addCategory() {
                const name = document.getElementById('newCategoryName').value.trim();
                const color = document.getElementById('newCategoryColor').value;
                if (!name) return this.showToast('Digite um nome');
                if (this.categories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.type === this.newCategoryType)) return this.showToast('Categoria já existe');
                this.categories.push({ id: name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now(), name, color, type: this.newCategoryType });
                this.saveCategories(); this.populateCategorySelects(); this.renderCategoryList();
                document.getElementById('newCategoryName').value = '';
                this.showToast('Categoria adicionada!');
            }

            deleteCategory(id) {
                if (this.transactions.some(t => t.category === id)) {
                    if (!confirm('Categoria em uso. Remover mesmo assim?')) return;
                    this.transactions.forEach(t => { if (t.category === id) t.category = ''; });
                    this.saveTransactions();
                }
                this.categories = this.categories.filter(c => c.id !== id);
                this.saveCategories(); this.populateCategorySelects(); this.renderCategoryList(); this.render();
                this.showToast('Categoria removida!');
            }

            renderCategoryList() {
                const c = document.getElementById('categoryList');
                if (!this.categories.length) return c.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma categoria</p>';
                c.innerHTML = this.categories.map(cat => `
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:var(--input-bg); border-radius:12px;">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span style="width:20px; height:20px; border-radius:50%; background:${cat.color}; display:inline-block;"></span>
                            <div>
                                <div style="font-weight:500;">${this.escapeHtml(cat.name)}</div>
                                <div style="font-size:0.75rem; color:var(--text-secondary);">${cat.type === 'income' ? '💰 Receita' : '💸 Despesa'}</div>
                            </div>
                        </div>
                        <button class="btn btn-danger btn-small" onclick="smartwallet.deleteCategory('${cat.id}')"><svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                    </div>
                `).join('');
            }

            addTransaction() {
                const date = document.getElementById('date').value;
                const amount = parseFloat(document.getElementById('amount').value);
                const type = this.currentTransactionType;
                const category = document.getElementById('category').value;
                const description = document.getElementById('description').value;
                const statusOk = document.getElementById('statusOk').checked;
                const paymentMethod = document.getElementById('paymentMethod').value;
                const isRecurring = document.getElementById('recurring').checked;
                
                if (!category) return this.showToast('Selecione uma categoria');
                if (!paymentMethod) return this.showToast('Selecione a forma de pagamento');
                
                if (paymentMethod.startsWith('card:')) {
                    const cardId = paymentMethod.replace('card:', '');
                    this.openCardPurchaseFromTransaction({ date, amount: Math.abs(amount), type, category, description, statusOk, cardId, isRecurring });
                    closeNewTransactionModal();
                    return;
                }
                
                const base = { date, amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount), category, description, statusOk, paymentMethod };
                if (isRecurring) {
                    const rType = document.getElementById('recurrenceType').value;
                    const rCount = parseInt(document.getElementById('recurrenceCount').value);
                    this.createRecurring(base, rType, rCount);
                    this.showToast(`${rCount} transações criadas!`);
                } else {
                    base.id = Date.now(); this.transactions.push(base);
                    this.showToast('Transação adicionada!');
                }
                this.saveTransactions(); this.render(); this.updateCharts();
                this.updateAlertBadge();
                closeNewTransactionModal(); this.clearForm();
            }

            openCardPurchaseFromTransaction(data) {
                document.getElementById('purchaseCardId').value = data.cardId;
                document.getElementById('purchaseDate').value = data.date;
                document.getElementById('purchaseAmount').value = data.amount;
                document.getElementById('purchaseDescription').value = data.description;
                document.getElementById('purchaseCategory').value = data.category;
                document.getElementById('purchaseInstallments').value = '1';
                document.getElementById('purchaseStatus').value = data.statusOk ? 'done' : 'pending';
                document.getElementById('newPurchaseModal').classList.add('active');
            }

            createRecurring(base, type, count) {
                const start = new Date(base.date + 'T00:00:00');
                const recurrenceGroupId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                
                for (let i = 0; i < count; i++) {
                    const t = { ...base, id: Date.now() + i, recurrenceGroupId };
                    const d = new Date(start);
                    
                    if (type === 'yearly') {
                        d.setFullYear(start.getFullYear() + i);
                    } else {
                        d.setMonth(start.getMonth() + i);
                    }
                    
                    t.date = d.toISOString().split('T')[0];
                    t.recurrence = { type: type };
                    if (type === 'installment') {
                        t.recurrence.total = count;
                        t.recurrence.current = i + 1;
                        t.description = `${base.description || ''} ${i + 1}/${count}`.trim();
                    }
                    this.transactions.push(t);
                }
            }

            deleteTransaction(id) {
                if (confirm('Excluir esta transação?')) {
                    this.transactions = this.transactions.filter(t => t.id !== id);
                    this.saveTransactions(); this.render(); this.updateCharts();
                    this.updateAlertBadge();
                    this.showToast('Excluída!');
                    closeEditModal();
                }
            }

            deleteFromEdit() { if (this.currentEditId) this.deleteTransaction(this.currentEditId); }

            editTransaction(id) {
                const t = this.transactions.find(x => x.id === id); if (!t) return;
                this.currentEditId = t.id;
                this.currentEditType = t.amount > 0 ? 'income' : 'expense';
                document.getElementById('editId').value = t.id;
                document.getElementById('editDate').value = t.date;
                document.getElementById('editAmount').value = Math.abs(t.amount);
                document.getElementById('editCategory').value = t.category || '';
                document.getElementById('editPaymentMethod').value = t.paymentMethod || '';
                document.getElementById('editDescription').value = t.description;
                document.getElementById('editStatusOk').checked = !!t.statusOk;
                
                const hasRecurrence = !!t.recurrence;
                document.getElementById('editRecurring').checked = hasRecurrence;
                document.getElementById('editRecurringOptions').style.display = hasRecurrence ? 'block' : 'none';
                if (hasRecurrence) {
                    document.getElementById('editRecurrenceType').value = t.recurrence.type || 'monthly';
                    document.getElementById('editRecurrenceCount').value = t.recurrence.total || 2;
                } else {
                    document.getElementById('editRecurrenceType').value = 'monthly';
                    document.getElementById('editRecurrenceCount').value = 2;
                }
                
                document.querySelectorAll('#editForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === this.currentEditType));
                this.filterCategoriesByType('editCategory', this.currentEditType);
                document.getElementById('editModal').classList.add('active');
            }

            updateTransaction() {
                const id = parseInt(document.getElementById('editId').value);
                const idx = this.transactions.findIndex(t => t.id === id); if (idx === -1) return;
                const type = this.currentEditType;
                const isRecurring = document.getElementById('editRecurring').checked;
                const paymentMethod = document.getElementById('editPaymentMethod').value;
                
                const updated = {
                    ...this.transactions[idx],
                    date: document.getElementById('editDate').value,
                    amount: type === 'expense' ? -Math.abs(parseFloat(document.getElementById('editAmount').value)) : Math.abs(parseFloat(document.getElementById('editAmount').value)),
                    category: document.getElementById('editCategory').value,
                    description: document.getElementById('editDescription').value,
                    statusOk: document.getElementById('editStatusOk').checked,
                    paymentMethod: paymentMethod
                };
                
                if (isRecurring) {
                    const rType = document.getElementById('editRecurrenceType').value;
                    updated.recurrence = { type: rType };
                    if (rType === 'installment') {
                        updated.recurrence.total = parseInt(document.getElementById('editRecurrenceCount').value);
                        if (this.transactions[idx].recurrence && this.transactions[idx].recurrence.current) {
                            updated.recurrence.current = this.transactions[idx].recurrence.current;
                        }
                    }
                } else {
                    delete updated.recurrence;
                }
                
                // Verifica se é transação recorrente e mostra modal de confirmação
                if (this.transactions[idx].recurrenceGroupId) {
                    this.pendingRecurrenceUpdate = {
                        transaction: updated,
                        originalIndex: idx,
                        recurrenceGroupId: this.transactions[idx].recurrenceGroupId
                    };
                    this.showRecurrenceConfirmModal();
                } else {
                    this.transactions[idx] = updated;
                    this.saveTransactions(); this.render(); this.updateCharts();
                    this.updateAlertBadge();
                    closeEditModal(); this.showToast('Atualizada!');
                }
            }

            showRecurrenceConfirmModal() {
                const pending = this.pendingRecurrenceUpdate;
                if (!pending) return;
                
                const transaction = pending.transaction;
                const category = this.getCategoryById(transaction.category);
                const recurrenceCount = this.transactions.filter(t => t.recurrenceGroupId === pending.recurrenceGroupId).length;
                
                document.getElementById('recurrenceInfo').innerHTML = `
                    <div class="recurrence-info-item">
                        <span class="recurrence-info-label">Descrição:</span>
                        <span class="recurrence-info-value">${this.escapeHtml(transaction.description)}</span>
                    </div>
                    <div class="recurrence-info-item">
                        <span class="recurrence-info-label">Categoria:</span>
                        <span class="recurrence-info-value">${this.escapeHtml(category.name)}</span>
                    </div>
                    <div class="recurrence-info-item">
                        <span class="recurrence-info-label">Valor:</span>
                        <span class="recurrence-info-value">${this.formatCurrency(Math.abs(transaction.amount))}</span>
                    </div>
                    <div class="recurrence-info-item">
                        <span class="recurrence-info-label">Ocorrências:</span>
                        <span class="recurrence-info-value">${recurrenceCount} transações</span>
                    </div>
                `;
                
                document.getElementById('recurrenceConfirmModal').classList.add('active');
            }

            applyRecurrenceUpdate(scope) {
                const pending = this.pendingRecurrenceUpdate;
                if (!pending) return;
                
                const { transaction, originalIndex, recurrenceGroupId } = pending;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const relatedTransactions = this.transactions.filter(t => t.recurrenceGroupId === recurrenceGroupId);
                
                if (scope === 'current') {
                    // Apenas a transação atual
                    this.transactions[originalIndex] = transaction;
                } else if (scope === 'future') {
                    // Esta e as futuras
                    relatedTransactions.forEach(t => {
                        const tDate = new Date(t.date + 'T00:00:00');
                        if (tDate >= today) {
                            const idx = this.transactions.findIndex(tr => tr.id === t.id);
                            if (idx !== -1) {
                                this.transactions[idx] = { ...t, ...transaction };
                            }
                        }
                    });
                } else if (scope === 'all') {
                    // Todas as ocorrências
                    relatedTransactions.forEach(t => {
                        const idx = this.transactions.findIndex(tr => tr.id === t.id);
                        if (idx !== -1) {
                            this.transactions[idx] = { ...t, ...transaction };
                        }
                    });
                }
                
                this.saveTransactions();
                this.render();
                this.updateCharts();
                this.updateAlertBadge();
                closeEditModal();
                closeRecurrenceConfirmModal();
                
                const scopeText = scope === 'current' ? 'apenas esta transação' : 
                                 scope === 'future' ? 'esta e as futuras ocorrências' : 
                                 'todas as ocorrências';
                this.showToast(`Atualizada! (${scopeText})`);
                
                this.pendingRecurrenceUpdate = null;
            }

            clearForm() {
                document.getElementById('transactionForm').reset(); this.setDefaultDate();
                document.getElementById('recurringOptions').style.display = 'none';
                this.currentTransactionType = 'expense';
                document.querySelectorAll('#transactionForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === 'expense'));
                this.filterCategoriesByType('category', 'expense');
            }

            setupGoalForm() {
                document.getElementById('goalForm').addEventListener('submit', e => {
                    e.preventDefault();
                    this.goal = parseFloat(document.getElementById('goalAmount').value);
                    this.monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
                    localStorage.setItem('smartwallet_goal', this.goal);
                    localStorage.setItem('smartwallet_monthly_contribution', this.monthlyContribution);
                    this.calculateGoalResult(); this.updateDashboard();
                    this.showToast('Meta configurada!');
                });
                document.getElementById('goalAmount').value = this.goal || '';
                document.getElementById('monthlyContribution').value = this.monthlyContribution || '';
            }

            calculateGoalResult() {
                const el = document.getElementById('goalResult');
                const goal = this.goal, contrib = this.monthlyContribution;
                const totalBal = this.transactions.reduce((s, t) => s + t.amount, 0);
                const rem = Math.max(0, goal - totalBal);
                if (!goal || !contrib || contrib <= 0) {
                    el.style.display = 'block'; el.innerHTML = '<p style="color:var(--danger-color); font-weight:500;">Preencha os campos corretamente.</p>'; return;
                }
                if (rem <= 0) {
                    el.style.display = 'block'; el.innerHTML = '<p style="color:var(--success-color); font-weight:500;">🎉 Parabéns! Meta já atingida!</p>'; return;
                }
                const months = Math.ceil(rem / contrib);
                const years = Math.floor(months / 12);
                const remM = months % 12;
                let timeStr = years > 0 ? `${years} ano${years > 1 ? 's' : ''} ` : '';
                timeStr += remM > 0 ? `${remM} mês${remM > 1 ? 'es' : ''}` : '1 mês';
                el.style.display = 'block';
                el.innerHTML = `<div style="font-weight:500; margin-bottom:6px;">⏱️ Tempo estimado:</div><div style="font-size:1.2rem; font-weight:700; color:var(--primary-color);">${timeStr}</div><div style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">Faltam: ${this.formatCurrency(rem)} com aporte de ${this.formatCurrency(contrib)}/mês</div>`;
            }

            getFilteredTransactions() {
                const search = document.getElementById('searchFilter').value.toLowerCase();
                const catFilter = document.getElementById('categoryFilter').value;
                const typeFilter = document.getElementById('typeFilter').value;
                const statusFilter = document.getElementById('statusFilter').value;
                return this.getMonthTransactions().filter(t => {
                    const cat = this.getCategoryById(t.category);
                    const matchesStatus = !statusFilter || (statusFilter === 'done' ? t.statusOk : !t.statusOk);
                    return (!search || t.description.toLowerCase().includes(search) || cat.name.toLowerCase().includes(search)) &&
                           (!catFilter || t.category === catFilter) &&
                           (!typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0)) &&
                           matchesStatus;
                });
            }

            formatCurrency(v) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v); }
            formatDate(d) { return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR'); }
            escapeHtml(t) { const d = document.createElement('div'); d.textContent = t || ''; return d.innerHTML; }

            getRecurrenceDisplay(t) {
                if (!t.recurrence) return '';
                if (t.recurrence.type === 'installment') {
                    return `<span class="recurrence-badge">📅 ${t.recurrence.current}/${t.recurrence.total}</span>`;
                } else if (t.recurrence.type === 'monthly') {
                    return '<span class="recurrence-badge">📅 Mensal</span>';
                } else if (t.recurrence.type === 'yearly') {
                    return '<span class="recurrence-badge">📅 Anual</span>';
                }
                return '';
            }

            updateDashboard() {
                const mt = this.getMonthTransactions();
                const inc = mt.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
                const exp = mt.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);
                const bal = inc + exp;
                const balEl = document.getElementById('totalBalance'); 
                balEl.textContent = this.formatCurrency(bal); 
                balEl.className = 'card-value privacy-value ' + (bal >= 0 ? 'positive' : 'negative');
                document.getElementById('totalIncome').textContent = this.formatCurrency(inc);
                document.getElementById('totalExpenses').textContent = this.formatCurrency(Math.abs(exp));

                const goalEl = document.getElementById('goalProgress');
                const bar = document.querySelector('.goal-bar');
                const fill = document.getElementById('goalBarFill');
                if (this.goal > 0) {
                    const totalBal = this.transactions.reduce((s, t) => s + t.amount, 0);
                    let pct = Math.min(Math.max((totalBal / this.goal) * 100, 0), 100);
                    goalEl.textContent = `${pct.toFixed(1)}%`;
                    goalEl.className = `card-value privacy-value ${pct >= 100 ? 'positive' : ''}`;
                    goalEl.style.cursor = 'default';
                    goalEl.onclick = null;
                    bar.style.display = 'block'; fill.style.width = `${pct}%`;
                } else {
                    goalEl.textContent = 'Definir meta →'; goalEl.className = 'card-value privacy-value';
                    goalEl.style.cursor = 'pointer'; goalEl.onclick = () => openGoalModal();
                    bar.style.display = 'none';
                }
            }

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
                    console.error('Chart.js não está carregado!');
                    return;
                }
                
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
                        ] },
                        options: lineOpts
                    });
                } catch (e) { console.error('Erro ao criar gráfico line:', e); }
                
                try {
                    this.charts.pie = new Chart(document.getElementById('pieChart').getContext('2d'), {
                        type: 'pie',
                        data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
                        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: colors.text } } } }
                    });
                } catch (e) { console.error('Erro ao criar gráfico pie:', e); }
                
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
                } catch (e) { console.error('Erro ao criar gráfico cards:', e); }
                
                this.updateCharts();
            }

            updateChartsTheme() {
                const colors = this.getChartColors();
                Object.values(this.charts).forEach(chart => {
                    if (!chart || !chart.options) return;
                    try {
                        if (chart.options.scales?.y?.ticks) chart.options.scales.y.ticks.color = colors.textSecondary;
                        if (chart.options.scales?.y?.grid) chart.options.scales.y.grid.color = colors.grid;
                        if (chart.options.scales?.x?.ticks) chart.options.scales.x.ticks.color = colors.textSecondary;
                        if (chart.options.scales?.x?.grid) chart.options.scales.x.grid.color = colors.grid;
                        if (chart.options.plugins?.legend?.labels) chart.options.plugins.legend.labels.color = colors.text;
                        chart.update('none');
                    } catch (e) { console.warn('Erro ao atualizar tema do gráfico:', e); }
                });
            }

            updateCharts() {
                const lLabels=[], lInc=[], lExp=[];
                for(let i=5;i>=0;i--){ const d=new Date(this.currentMonth); d.setMonth(d.getMonth()-i); const mt=this.getMonthTransactions(d); lLabels.push(`${d.getMonth()+1}/${d.getFullYear()}`); lInc.push(mt.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0)); lExp.push(Math.abs(mt.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0))); }
                if (this.charts.line) {
                    this.charts.line.data.labels = lLabels;
                    this.charts.line.data.datasets[0].data = lInc;
                    this.charts.line.data.datasets[1].data = lExp;
                    this.charts.line.update();
                }
                
                const exps={}; this.getMonthTransactions().filter(t=>t.amount<0).forEach(t=>{ const c=this.getCategoryById(t.category); if(!exps[c.name]) exps[c.name]={t:0, color:c.color}; exps[c.name].t+=Math.abs(t.amount); });
                if (this.charts.pie) {
                    this.charts.pie.data.labels=Object.keys(exps);
                    this.charts.pie.data.datasets[0].data=Object.values(exps).map(x=>x.t);
                    this.charts.pie.data.datasets[0].backgroundColor=Object.values(exps).map(x=>x.color);
                    this.charts.pie.update();
                }
                
                // Gráfico de Cartões de Crédito - 6 meses
                if (this.charts.cards && this.cards.length > 0) {
                    const cardLabels = [];
                    const cardDatasets = [];
                    
                    for (let i = 0; i < 6; i++) {
                        const d = new Date(this.currentMonth);
                        d.setMonth(d.getMonth() + i);
                        const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                        cardLabels.push(`${months[d.getMonth()]}/${d.getFullYear()}`);
                    }
                    
                    this.cards.forEach(card => {
                        const data = [];
                        for (let i = 0; i < 6; i++) {
                            const d = new Date(this.currentMonth);
                            d.setMonth(d.getMonth() + i);
                            const m = d.getMonth(), y = d.getFullYear();
                            const monthPurchases = this.cardPurchases.filter(p => {
                                if (p.cardId !== card.id) return false;
                                const pDate = new Date(p.date + 'T00:00:00');
                                return pDate.getMonth() === m && pDate.getFullYear() === y;
                            });
                            const total = monthPurchases.reduce((sum, p) => sum + p.amount, 0);
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
                } else if (this.charts.cards) {
                    this.charts.cards.data.labels = [];
                    this.charts.cards.data.datasets = [];
                    this.charts.cards.update();
                }
            }

            exportCSV() {
                const mt = this.getMonthTransactions();
                if (!mt.length) return this.showToast('Nenhuma transação no mês.');
                let csv = '\ufeffData;Descrição;Categoria;Tipo;Pagamento;Status;Recorrência;Valor\n';
                mt.sort((a,b) => new Date(a.date)-new Date(b.date)).forEach(t => {
                    const c=this.getCategoryById(t.category);
                    const status = t.statusOk ? 'Concluído' : 'Pendente';
                    const payment = this.getPaymentMethodName(t.paymentMethod).replace(/[💳⚡💰🔄📅↔️]/g, '').trim();
                    let recurrence = '';
                    if (t.recurrence) {
                        if (t.recurrence.type === 'installment') recurrence = `${t.recurrence.current}/${t.recurrence.total}`;
                        else if (t.recurrence.type === 'monthly') recurrence = 'Mensal';
                        else if (t.recurrence.type === 'yearly') recurrence = 'Anual';
                    }
                    csv += `${t.date};"${(t.description||'').replace(/"/g,'""')}";"${c.name}";${t.amount>0?'Receita':'Despesa'};"${payment}";${status};${recurrence};${Math.abs(t.amount).toFixed(2)}\n`;
                });
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); const a=document.createElement('a');
                a.href=URL.createObjectURL(blob); a.download=`extrato_${this.formatMonthYear(this.currentMonth)}.csv`; a.click();
                this.showToast('CSV exportado!'); closeExportModal();
            }

            importCSV() {
                if (!this.pendingCsvData) return this.showToast('Selecione um arquivo CSV primeiro');
                const replace = document.getElementById('csvReplaceData').checked;
                const lines = this.pendingCsvData.split(/\r?\n/).filter(l => l.trim());
                if (lines.length < 2) return this.showToast('CSV vazio ou inválido');
                
                let imported = 0, skipped = 0;
                const header = lines[0].toLowerCase();
                if (!header.includes('data') || !header.includes('valor')) return this.showToast('Formato CSV inválido.');
                
                const transactionsToAdd = [];
                for (let i = 1; i < lines.length; i++) {
                    const cols = this.parseCSVLine(lines[i]);
                    if (cols.length < 6) { skipped++; continue; }
                    
                    const [date, desc, catName, tipo, payment, status, valor] = cols;
                    if (!date || !valor) { skipped++; continue; }
                    
                    const category = this.findCategoryByName(catName);
                    const amount = parseFloat(valor.replace(',', '.'));
                    if (isNaN(amount)) { skipped++; continue; }
                    
                    const signedAmount = tipo.toLowerCase().includes('despesa') ? -Math.abs(amount) : Math.abs(amount);
                    
                    let paymentMethod = 'pix';
                    const payLower = (payment || '').toLowerCase();
                    if (payLower.includes('pix')) paymentMethod = 'pix';
                    else if (payLower.includes('débito') || payLower.includes('debit')) paymentMethod = 'debit';
                    else if (payLower.includes('automático') || payLower.includes('automatic')) paymentMethod = 'auto';
                    else if (payLower.includes('agend')) paymentMethod = 'scheduled';
                    else if (payLower.includes('transf')) paymentMethod = 'transfer';
                    
                    transactionsToAdd.push({
                        id: Date.now() + i + Math.random() * 1000,
                        date: date,
                        amount: signedAmount,
                        category: category ? category.id : '',
                        description: desc,
                        statusOk: status.toLowerCase().includes('conclu'),
                        paymentMethod: paymentMethod
                    });
                    imported++;
                }
                
                if (replace) {
                    const m = this.currentMonth.getMonth(), y = this.currentMonth.getFullYear();
                    this.transactions = this.transactions.filter(t => {
                        const d = new Date(t.date + 'T00:00:00');
                        return !(d.getMonth() === m && d.getFullYear() === y);
                    });
                }
                
                this.transactions.push(...transactionsToAdd);
                this.saveTransactions();
                this.render();
                this.updateCharts();
                this.updateAlertBadge();
                closeImportCsvModal();
                this.showToast(`${imported} transações importadas!${skipped > 0 ? ` (${skipped} ignoradas)` : ''}`);
                this.pendingCsvData = null;
            }

            parseCSVLine(line) {
                const result = [];
                let current = '';
                let inQuotes = false;
                for (let i = 0; i < line.length; i++) {
                    const c = line[i];
                    if (c === '"') {
                        if (inQuotes && line[i+1] === '"') { current += '"'; i++; }
                        else inQuotes = !inQuotes;
                    } else if (c === ';' && !inQuotes) {
                        result.push(current.trim()); current = '';
                    } else {
                        current += c;
                    }
                }
                result.push(current.trim());
                return result;
            }

            exportBackup() {
                try {
                    const backup = {
                        version: '2.2',
                        exportDate: new Date().toISOString(),
                        appName: 'Smart Wallet',
                        appVersion: '1.1.0',
                        transactions: this.transactions || [],
                        categories: this.categories || this.getDefaultCategories(),
                        cards: this.cards || [],
                        cardPurchases: this.cardPurchases || [],
                        goal: this.goal || 0,
                        monthlyContribution: this.monthlyContribution || 0,
                        privacyOn: this.privacyOn || false,
                        darkMode: this.darkMode !== false
                    };
                    
                    const jsonString = JSON.stringify(backup, null, 2);
                    const blob = new Blob(['\ufeff' + jsonString], { type: 'application/json;charset=utf-8' });
                    
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    const dateStr = new Date().toISOString().split('T')[0];
                    const timeStr = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
                    a.download = `smart_wallet_backup_${dateStr}_${timeStr}.json`;
                    
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(a.href);
                    
                    this.showToast('✅ Backup exportado com sucesso!');
                    document.getElementById('mainMenu').classList.remove('active');
                } catch (e) {
                    this.showToast('❌ Erro ao exportar: ' + e.message);
                    console.error('Erro no exportBackup:', e);
                }
            }

            importBackup() {
                if (!this.pendingBackupData) {
                    return this.showToast('⚠️ Selecione um arquivo de backup primeiro');
                }
                
                try {
                    let cleanData = this.pendingBackupData;
                    if (cleanData.charCodeAt(0) === 0xFEFF) {
                        cleanData = cleanData.substring(1);
                    }
                    cleanData = cleanData.trim();
                    
                    if (!cleanData || cleanData.length === 0) {
                        return this.showToast('❌ Arquivo vazio!');
                    }
                    
                    let data;
                    try {
                        data = JSON.parse(cleanData);
                    } catch (parseError) {
                        console.error('Erro ao parsear JSON:', parseError);
                        return this.showToast('❌ Arquivo JSON inválido ou corrompido.');
                    }
                    
                    if (!data || typeof data !== 'object') {
                        return this.showToast('❌ Estrutura do backup inválida');
                    }
                    
                    if (!Array.isArray(data.transactions)) {
                        console.warn('Campo transactions não é array, usando array vazio');
                        data.transactions = [];
                    }
                    
                    const validTransactions = [];
                    data.transactions.forEach((t, index) => {
                        try {
                            if (t && typeof t === 'object' && typeof t.id !== 'undefined') {
                                validTransactions.push({
                                    id: t.id,
                                    date: t.date || new Date().toISOString().split('T')[0],
                                    amount: typeof t.amount === 'number' ? t.amount : 0,
                                    category: t.category || '',
                                    description: t.description || '',
                                    statusOk: t.statusOk === true,
                                    paymentMethod: t.paymentMethod || 'pix',
                                    recurrence: t.recurrence || null,
                                    recurrenceGroupId: t.recurrenceGroupId || null
                                });
                            }
                        } catch (e) {
                            console.warn(`Transação ${index} inválida, ignorada:`, e);
                        }
                    });
                    
                    if (!Array.isArray(data.categories)) {
                        console.warn('Campo categories não é array, usando categorias padrão');
                        data.categories = this.getDefaultCategories();
                    }
                    
                    const validCategories = [];
                    data.categories.forEach((c, index) => {
                        try {
                            if (c && typeof c === 'object' && c.id && c.name) {
                                validCategories.push({
                                    id: c.id,
                                    name: c.name,
                                    color: c.color || '#6366f1',
                                    type: c.type || 'expense'
                                });
                            }
                        } catch (e) {
                            console.warn(`Categoria ${index} inválida, ignorada:`, e);
                        }
                    });
                    
                    const cards = Array.isArray(data.cards) ? data.cards.filter(c => c && typeof c === 'object') : [];
                    const cardPurchases = Array.isArray(data.cardPurchases) ? data.cardPurchases.filter(p => p && typeof p === 'object') : [];
                    const goal = typeof data.goal === 'number' && !isNaN(data.goal) ? data.goal : 0;
                    const monthlyContribution = typeof data.monthlyContribution === 'number' && !isNaN(data.monthlyContribution) ? data.monthlyContribution : 0;
                    const privacyOn = data.privacyOn === true;
                    const darkMode = data.darkMode !== false;
                    
                    const transCount = validTransactions.length;
                    const catCount = validCategories.length;
                    const cardCount = cards.length;
                    
                    if (!confirm(
                        `⚠️ ATENÇÃO: Esta ação irá substituir TODOS os dados atuais!\n\n` +
                        `📊 Dados do backup:\n` +
                        `• ${transCount} transações\n` +
                        `• ${catCount} categorias\n` +
                        `• ${cardCount} cartões\n\n` +
                        `Deseja continuar?`
                    )) {
                        return this.showToast('Importação cancelada');
                    }
                    
                    this.transactions = validTransactions;
                    this.categories = validCategories.length > 0 ? validCategories : this.getDefaultCategories();
                    this.cards = cards;
                    this.cardPurchases = cardPurchases;
                    this.goal = goal;
                    this.monthlyContribution = monthlyContribution;
                    this.privacyOn = privacyOn;
                    this.darkMode = darkMode;
                    
                    this.saveTransactions();
                    this.saveCategories();
                    this.saveCards();
                    this.saveCardPurchases();
                    localStorage.setItem('smartwallet_goal', this.goal);
                    localStorage.setItem('smartwallet_monthly_contribution', this.monthlyContribution);
                    localStorage.setItem('smartwallet_privacy', this.privacyOn);
                    localStorage.setItem('smartwallet_dark', this.darkMode);
                    
                    this.populateCategorySelects();
                    this.populatePaymentMethodSelects();
                    this.applyTheme();
                    this.applyPrivacy();
                    
                    const goalInput = document.getElementById('goalAmount');
                    const contribInput = document.getElementById('monthlyContribution');
                    if (goalInput) goalInput.value = this.goal || '';
                    if (contribInput) contribInput.value = this.monthlyContribution || '';
                    
                    this.render();
                    this.updateCharts();
                    this.updateAlertBadge();
                    
                    closeImportBackupModal();
                    
                    this.showToast(
                        `✅ Backup restaurado com sucesso!\n` +
                        `📊 ${transCount} transações\n` +
                        `📁 ${catCount} categorias\n` +
                        `💳 ${cardCount} cartões`
                    );
                    
                    this.pendingBackupData = null;
                    
                } catch (e) {
                    console.error('Erro ao importar backup:', e);
                    this.showToast('❌ Erro ao importar: ' + e.message);
                }
            }

            clearAllData() {
                this.transactions = [];
                this.categories = this.getDefaultCategories();
                this.cards = [];
                this.cardPurchases = [];
                this.goal = 0;
                this.monthlyContribution = 0;
                this.saveTransactions();
                this.saveCategories();
                this.saveCards();
                this.saveCardPurchases();
                localStorage.setItem('smartwallet_goal', 0);
                localStorage.setItem('smartwallet_monthly_contribution', 0);
                this.populateCategorySelects();
                this.populatePaymentMethodSelects();
                document.getElementById('goalAmount').value = '';
                document.getElementById('monthlyContribution').value = '';
                this.render();
                this.updateCharts();
                this.updateAlertBadge();
                closeClearDataModal();
                this.showToast('🗑️ Todos os dados foram apagados!');
            }

            getUpcomingBills() {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const in3Days = new Date(today);
                in3Days.setDate(in3Days.getDate() + 3);
                
                return this.transactions.filter(t => {
                    if (t.statusOk) return false;
                    if (t.amount >= 0) return false;
                    const tDate = new Date(t.date + 'T00:00:00');
                    return tDate <= in3Days;
                }).sort((a, b) => new Date(a.date) - new Date(b.date));
            }

            updateAlertBadge() {
                const bills = this.getUpcomingBills();
                const badge = document.getElementById('alertBadge');
                const btn = document.getElementById('alertBtn');
                
                if (bills.length > 0) {
                    badge.textContent = bills.length;
                    badge.classList.add('visible');
                    btn.classList.add('has-alerts');
                } else {
                    badge.classList.remove('visible');
                    btn.classList.remove('has-alerts');
                }
            }

            renderBillsModal() {
                const bills = this.getUpcomingBills();
                const container = document.getElementById('billsList');
                
                if (bills.length === 0) {
                    container.innerHTML = `
                        <div style="text-align:center; padding:40px 20px; color:var(--text-secondary);">
                            <div style="font-size:3rem; margin-bottom:12px;">✅</div>
                            <h3 style="margin-bottom:8px;">Nenhuma conta pendente!</h3>
                            <p>Todas as contas estão em dia.</p>
                        </div>
                    `;
                    return;
                }
                
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const total = bills.reduce((s, b) => s + Math.abs(b.amount), 0);
                
                container.innerHTML = `
                    <div style="background: var(--input-bg); border-radius: 14px; padding: 16px; margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">Total de contas</span>
                            <span style="font-weight: 600;">${bills.length}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0 0 0; margin-top: 4px; border-top: 2px solid var(--border-color); font-weight: 700; font-size: 1.1rem; color: var(--primary-color);">
                            <span>Total a pagar</span>
                            <span style="color:var(--danger-color);">${this.formatCurrency(total)}</span>
                        </div>
                    </div>
                    ${bills.map(bill => {
                        const cat = this.getCategoryById(bill.category);
                        const billDate = new Date(bill.date + 'T00:00:00');
                        const diffTime = billDate.getTime() - today.getTime();
                        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                        
                        let daysClass = 'warning';
                        let daysText = '';
                        let itemClass = '';
                        
                        if (diffDays < 0) {
                            daysClass = 'overdue';
                            daysText = `${Math.abs(diffDays)}d atrasada`;
                            itemClass = 'overdue';
                        } else if (diffDays === 0) {
                            daysClass = 'urgent';
                            daysText = 'Vence hoje';
                            itemClass = 'urgent';
                        } else if (diffDays === 1) {
                            daysClass = 'urgent';
                            daysText = 'Vence amanhã';
                            itemClass = 'urgent';
                        } else {
                            daysClass = 'warning';
                            daysText = `Em ${diffDays} dias`;
                        }
                        
                        return `
                            <div class="bill-item ${itemClass}">
                                <div class="bill-info">
                                    <div class="bill-desc">
                                        ${this.escapeHtml(bill.description)}
                                        <span class="bill-days ${daysClass}">${daysText}</span>
                                    </div>
                                    <div class="bill-meta">
                                        <span>📅 ${this.formatDate(bill.date)}</span>
                                        <span style="color:${cat.color};">● ${this.escapeHtml(cat.name)}</span>
                                        ${bill.paymentMethod ? `<span>${this.getPaymentMethodName(bill.paymentMethod)}</span>` : ''}
                                    </div>
                                </div>
                                <div class="bill-amount">${this.formatCurrency(Math.abs(bill.amount))}</div>
                                <div style="display: flex; gap: 4px;">
                                    <button class="btn btn-success btn-small" onclick="smartwallet.markBillAsPaid(${bill.id})" title="Marcar como paga">
                                        <svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                    </button>
                                    <button class="btn btn-secondary btn-small" onclick="smartwallet.editTransaction(${bill.id}); closeBillsModal();" title="Editar">
                                        <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                `;
            }

            markBillAsPaid(id) {
                const idx = this.transactions.findIndex(t => t.id === id);
                if (idx === -1) return;
                this.transactions[idx].statusOk = true;
                this.saveTransactions();
                this.render();
                this.updateAlertBadge();
                this.renderBillsModal();
                this.showToast('✓ Conta marcada como paga!');
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
                
                if (!name) return this.showToast('Informe o nome do cartão');
                
                if (id) {
                    const idx = this.cards.findIndex(c => c.id === id);
                    if (idx !== -1) {
                        this.cards[idx] = { ...this.cards[idx], name, brand, last4, closingDay, dueDay, limit, color };
                    }
                } else {
                    this.cards.push({ id: 'card_' + Date.now(), name, brand, last4, closingDay, dueDay, limit, color });
                }
                
                this.saveCards();
                this.populatePaymentMethodSelects();
                this.renderCreditCardsList();
                closeNewCardModal();
                this.showToast(id ? 'Cartão atualizado!' : 'Cartão cadastrado!');
            }

            deleteCard(id) {
                const purchases = this.cardPurchases.filter(p => p.cardId === id);
                if (purchases.length > 0) {
                    if (!confirm(`Este cartão tem ${purchases.length} compra(s). Deseja remover mesmo assim?`)) return;
                    this.cardPurchases = this.cardPurchases.filter(p => p.cardId !== id);
                    this.saveCardPurchases();
                }
                this.cards = this.cards.filter(c => c.id !== id);
                this.saveCards();
                this.populatePaymentMethodSelects();
                this.renderCreditCardsList();
                this.showToast('Cartão removido!');
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
                document.getElementById('newCardModal').classList.add('active');
            }

            getInvoicePeriod(card) {
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                
                let closingDate = new Date(currentYear, currentMonth, card.closingDay);
                if (now.getDate() < card.closingDay) {
                    closingDate = new Date(currentYear, currentMonth - 1, card.closingDay);
                }
                let startDate = new Date(closingDate);
                startDate.setMonth(startDate.getMonth() - 1);
                startDate.setDate(startDate.getDate() + 1);
                
                let dueDate = new Date(closingDate);
                dueDate.setMonth(dueDate.getMonth() + 1);
                dueDate.setDate(card.dueDay);
                
                return { startDate, closingDate, dueDate };
            }

            getCardPurchasesForInvoice(cardId, startDate, closingDate) {
                return this.cardPurchases.filter(p => {
                    if (p.cardId !== cardId) return false;
                    const pDate = new Date(p.date + 'T00:00:00');
                    return pDate >= startDate && pDate <= closingDate;
                });
            }

            getInstallmentAmount(purchase) {
                if (!purchase.installments || purchase.installments <= 1) return purchase.amount;
                return purchase.amount / purchase.installments;
            }

            calculateInvoiceTotal(card, purchases, startDate, closingDate) {
                let total = 0;
                purchases.forEach(p => {
                    const pDate = new Date(p.date + 'T00:00:00');
                    const installmentAmount = this.getInstallmentAmount(p);
                    
                    if (p.installments && p.installments > 1) {
                        for (let i = 0; i < p.installments; i++) {
                            const installmentDate = new Date(pDate);
                            installmentDate.setMonth(installmentDate.getMonth() + i);
                            if (installmentDate >= startDate && installmentDate <= closingDate) {
                                total += installmentAmount;
                            }
                        }
                    } else {
                        total += p.amount;
                    }
                });
                return total;
            }

            renderCreditCardsList() {
                const container = document.getElementById('creditCardsList');
                if (!this.cards.length) {
                    container.innerHTML = `
                        <div style="text-align:center; padding:40px 20px; color:var(--text-secondary);">
                            <div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">💳</div>
                            <h3 style="margin-bottom:8px;">Nenhum cartão cadastrado</h3>
                            <p>Clique em "Novo Cartão" para começar</p>
                        </div>
                    `;
                    return;
                }
                
                container.innerHTML = '<div class="credit-cards-grid">' + this.cards.map(card => {
                    const period = this.getInvoicePeriod(card);
                    const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
                    const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
                    const available = card.limit - total;
                    const usedPct = Math.min(100, (total / card.limit) * 100);
                    
                    return `
                        <div class="credit-card-visual" style="background: linear-gradient(135deg, ${card.color} 0%, ${this.adjustColor(card.color, -30)} 100%);" onclick="openInvoiceModal('${card.id}')">
                            <div class="cc-actions">
                                <button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editCard('${card.id}')" title="Editar">
                                    <svg class="icon" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteCard('${card.id}')" title="Excluir">
                                    <svg class="icon" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                </button>
                            </div>
                            <div class="cc-header">
                                <div class="cc-brand">${this.escapeHtml(card.brand)}</div>
                                <div class="cc-chip"></div>
                            </div>
                            <div class="cc-name">${this.escapeHtml(card.name)}</div>
                            <div class="cc-number">•••• •••• •••• ${this.escapeHtml(card.last4 || '****')}</div>
                            <div class="cc-footer">
                                <div>
                                    <div class="cc-label">Fatura Atual</div>
                                    <div class="cc-value">${this.formatCurrency(total)}</div>
                                </div>
                                <div style="text-align:right;">
                                    <div class="cc-label">Disponível</div>
                                    <div class="cc-value">${this.formatCurrency(available)}</div>
                                </div>
                            </div>
                            <div style="position:absolute; bottom:0; left:0; right:0; height:4px; background:rgba(0,0,0,0.3);">
                                <div style="height:100%; width:${usedPct}%; background:${usedPct > 80 ? '#ef4444' : usedPct > 50 ? '#f59e0b' : '#10b981'}; transition:width 0.4s ease;"></div>
                            </div>
                        </div>
                    `;
                }).join('') + '</div>';
            }

            adjustColor(color, amount) {
                const hex = color.replace('#', '');
                const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
                const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
                const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
                return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
            }

            openInvoice(cardId) {
                const card = this.getCardById(cardId);
                if (!card) return;
                
                const period = this.getInvoicePeriod(card);
                const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
                const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
                const minimum = total * 0.15;
                const available = card.limit - total;
                
                document.getElementById('invoiceTitle').textContent = `Fatura - ${card.name}`;
                
                const content = document.getElementById('invoiceContent');
                content.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
                        <div>
                            <div style="font-size:0.85rem; color:var(--text-secondary);">Período da Fatura</div>
                            <div style="font-weight:600;">${this.formatDate(period.startDate.toISOString().split('T')[0])} - ${this.formatDate(period.closingDate.toISOString().split('T')[0])}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:0.85rem; color:var(--text-secondary);">Vencimento</div>
                            <div style="font-weight:600; color:var(--warning-color);">${this.formatDate(period.dueDate.toISOString().split('T')[0])}</div>
                        </div>
                    </div>
                    
                    <div style="background: var(--input-bg); border-radius: 14px; padding: 16px; margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">Limite Total</span>
                            <span style="font-weight: 600;">${this.formatCurrency(card.limit)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">Total da Fatura</span>
                            <span style="font-weight: 600; color:var(--danger-color);">${this.formatCurrency(total)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">Pagamento Mínimo (15%)</span>
                            <span style="font-weight: 600;">${this.formatCurrency(minimum)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0 0 0; margin-top: 4px; border-top: 2px solid var(--border-color); font-weight: 700; font-size: 1.1rem; color: var(--primary-color);">
                            <span>Limite Disponível</span>
                            <span style="color:var(--success-color);">${this.formatCurrency(available)}</span>
                        </div>
                    </div>
                    
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                        <h3 style="font-size:1.1rem;">Compras no Período (${purchases.length})</h3>
                        <div style="display:flex; gap:8px;">
                            <button class="btn btn-secondary btn-small" onclick="smartwallet.exportInvoiceCSV('${cardId}')">
                                <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                CSV
                            </button>
                            <button class="btn btn-secondary btn-small" onclick="smartwallet.printInvoicePDF('${cardId}')">
                                <svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                                PDF
                            </button>
                        </div>
                    </div>
                    
                    <div id="invoicePurchasesList">
                        ${purchases.length === 0 ? '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma compra neste período</p>' : 
                        purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).map(p => {
                            const cat = this.getCategoryById(p.category);
                            const installmentAmount = this.getInstallmentAmount(p);
                            const installmentInfo = p.installments > 1 ? ` • ${p.installments}x de ${this.formatCurrency(installmentAmount)}` : '';
                            return `
                                <div style="background: var(--input-bg); border-radius: 12px; padding: 12px 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
                                    <div style="flex: 1; min-width: 0;">
                                        <div style="font-weight: 600; margin-bottom: 2px;">${this.escapeHtml(p.description)}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; gap: 10px; flex-wrap: wrap;">
                                            <span>${this.formatDate(p.date)}</span>
                                            <span style="color:${cat.color};">● ${this.escapeHtml(cat.name)}</span>
                                            ${installmentInfo}
                                        </div>
                                    </div>
                                    <div style="font-weight: 700; font-size: 1rem; white-space: nowrap;">${this.formatCurrency(p.amount)}</div>
                                    <div style="display: flex; gap: 4px;">
                                        <button class="btn btn-danger btn-small" onclick="smartwallet.deletePurchase(${p.id}, '${cardId}')" title="Excluir">
                                            <svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top:20px;">
                        <button class="btn btn-primary" onclick="openNewPurchaseModal('${cardId}')">
                            <svg class="icon icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Nova Compra
                        </button>
                        <button class="btn btn-success" onclick="smartwallet.payInvoice('${cardId}')">
                            <svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                            Pagar Fatura
                        </button>
                        <button class="btn btn-secondary" onclick="closeInvoiceModal()">Fechar</button>
                    </div>
                `;
                
                document.getElementById('invoiceModal').classList.add('active');
            }

            savePurchase() {
                const cardId = document.getElementById('purchaseCardId').value;
                const date = document.getElementById('purchaseDate').value;
                const amount = parseFloat(document.getElementById('purchaseAmount').value);
                const description = document.getElementById('purchaseDescription').value.trim();
                const category = document.getElementById('purchaseCategory').value;
                const installments = parseInt(document.getElementById('purchaseInstallments').value);
                const status = document.getElementById('purchaseStatus').value;
                
                if (!cardId || !date || !amount || !description || !category) {
                    return this.showToast('Preencha todos os campos');
                }
                
                this.cardPurchases.push({
                    id: Date.now(),
                    cardId,
                    date,
                    amount,
                    description,
                    category,
                    installments,
                    status: status === 'done'
                });
                
                this.saveCardPurchases();
                this.renderCreditCardsList();
                closeNewPurchaseModal();
                this.openInvoice(cardId);
                this.showToast('Compra adicionada!');
            }

            deletePurchase(id, cardId) {
                if (!confirm('Excluir esta compra?')) return;
                this.cardPurchases = this.cardPurchases.filter(p => p.id !== id);
                this.saveCardPurchases();
                this.openInvoice(cardId);
                this.showToast('Compra excluída!');
            }

            payInvoice(cardId) {
                const card = this.getCardById(cardId);
                if (!card) return;
                
                const period = this.getInvoicePeriod(card);
                const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
                const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
                
                if (total <= 0) return this.showToast('Fatura sem valor a pagar');
                
                if (!confirm(`Criar transação de pagamento da fatura no valor de ${this.formatCurrency(total)}?`)) return;
                
                this.transactions.push({
                    id: Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    amount: -total,
                    category: 'inst_financeira',
                    description: `Pagamento Fatura ${card.name} - ${period.dueDate.toLocaleDateString('pt-BR')}`,
                    statusOk: false,
                    paymentMethod: 'pix'
                });
                
                this.saveTransactions();
                this.render();
                this.updateCharts();
                this.updateAlertBadge();
                this.showToast('Transação de pagamento criada!');
            }

            exportInvoiceCSV(cardId) {
                const card = this.getCardById(cardId);
                if (!card) return;
                
                const period = this.getInvoicePeriod(card);
                const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
                
                let csv = `\ufeffFATURA - ${card.name}\n`;
                csv += `Período:;${this.formatDate(period.startDate.toISOString().split('T')[0])} a ${this.formatDate(period.closingDate.toISOString().split('T')[0])}\n`;
                csv += `Vencimento:;${this.formatDate(period.dueDate.toISOString().split('T')[0])}\n\n`;
                csv += 'Data;Descrição;Categoria;Parcelas;Valor Total;Valor Parcela\n';
                
                purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(p => {
                    const cat = this.getCategoryById(p.category);
                    const installmentAmount = this.getInstallmentAmount(p);
                    csv += `${p.date};"${(p.description||'').replace(/"/g,'""')}";"${cat.name}";${p.installments || 1}x;${p.amount.toFixed(2)};${installmentAmount.toFixed(2)}\n`;
                });
                
                const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
                csv += `\nTOTAL DA FATURA;;;${this.formatCurrency(total)}\n`;
                csv += `PAGAMENTO MÍNIMO;;;${this.formatCurrency(total * 0.15)}\n`;
                
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `fatura_${card.name.replace(/\s+/g,'_')}_${this.formatMonthYear(new Date())}.csv`;
                a.click();
                this.showToast('Fatura exportada!');
            }

            printInvoicePDF(cardId) {
                const card = this.getCardById(cardId);
                if (!card) return;
                
                const period = this.getInvoicePeriod(card);
                const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
                const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
                
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html><head><title>Fatura ${card.name}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; color: #1e293b; }
                        h1 { color: ${card.color}; margin-bottom: 4px; }
                        .subtitle { color: #64748b; margin-bottom: 20px; }
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 8px; }
                        .info-label { font-size: 0.85rem; color: #64748b; }
                        .info-value { font-weight: 600; font-size: 1.1rem; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
                        th { background: #f1f5f9; font-size: 0.85rem; text-transform: uppercase; }
                        .total-row { background: #f8fafc; font-weight: 700; font-size: 1.2rem; }
                        .total-row td { padding: 15px 10px; }
                        .footer { margin-top: 30px; font-size: 0.85rem; color: #64748b; text-align: center; }
                        @media print { body { padding: 0; } }
                    </style></head><body>
                    <h1>${this.escapeHtml(card.name)}</h1>
                    <div class="subtitle">${this.escapeHtml(card.brand)} •••• ${this.escapeHtml(card.last4 || '****')}</div>
                    
                    <div class="info-grid">
                        <div><div class="info-label">Período</div><div class="info-value">${this.formatDate(period.startDate.toISOString().split('T')[0])} a ${this.formatDate(period.closingDate.toISOString().split('T')[0])}</div></div>
                        <div><div class="info-label">Vencimento</div><div class="info-value" style="color:#f59e0b;">${this.formatDate(period.dueDate.toISOString().split('T')[0])}</div></div>
                        <div><div class="info-label">Limite Total</div><div class="info-value">${this.formatCurrency(card.limit)}</div></div>
                        <div><div class="info-label">Disponível</div><div class="info-value" style="color:#10b981;">${this.formatCurrency(card.limit - total)}</div></div>
                    </div>
                    
                    <table>
                        <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Parcelas</th><th style="text-align:right;">Valor</th></tr></thead>
                        <tbody>
                            ${purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).map(p => {
                                const cat = this.getCategoryById(p.category);
                                const installmentInfo = p.installments > 1 ? `${p.installments}x de ${this.formatCurrency(this.getInstallmentAmount(p))}` : 'À vista';
                                return `<tr><td>${this.formatDate(p.date)}</td><td>${this.escapeHtml(p.description)}</td><td>${this.escapeHtml(cat.name)}</td><td>${installmentInfo}</td><td style="text-align:right;">${this.formatCurrency(p.amount)}</td></tr>`;
                            }).join('')}
                            <tr class="total-row"><td colspan="4">TOTAL DA FATURA</td><td style="text-align:right;">${this.formatCurrency(total)}</td></tr>
                            <tr><td colspan="4" style="text-align:right; font-weight:600;">Pagamento Mínimo (15%)</td><td style="text-align:right;">${this.formatCurrency(total * 0.15)}</td></tr>
                        </tbody>
                    </table>
                    
                    <div class="footer">
                        Smart Wallet • Fatura gerada em ${new Date().toLocaleString('pt-BR')}<br>
                        Idealizado por RogerElizar™
                    </div>
                    </body></html>
                `);
                printWindow.document.close();
                setTimeout(() => { printWindow.print(); }, 250);
            }

            printPDF() { window.print(); }

            render() {
                this.updateDashboard();
                const tbody = document.getElementById('transactionsTable');
                const empty = document.getElementById('emptyState');
                const filtered = this.getFilteredTransactions();
                if (!filtered.length) { tbody.innerHTML=''; empty.style.display='block'; return; }
                empty.style.display='none';
                const sorted = [...filtered].sort((a,b) => new Date(b.date)-new Date(a.date));
                const balMap=new Map(); let run=0; [...sorted].reverse().forEach(t => { run+=t.amount; balMap.set(t.id,run); });
                tbody.innerHTML = sorted.map(t => {
                    const c=this.getCategoryById(t.category);
                    const cls=t.amount>=0?'positive':'negative';
                    const statusClass = t.statusOk ? 'status-done' : 'status-pending';
                    const statusText = t.statusOk ? 'Concluído' : 'Pendente';
                    const recurrenceHtml = this.getRecurrenceDisplay(t);
                    const paymentName = this.getPaymentMethodName(t.paymentMethod);
                    return `<tr class="transaction-row" onclick="smartwallet.editTransaction(${t.id})">
                        <td data-label="Data">${this.formatDate(t.date)}</td>
                        <td data-label="Descrição" style="flex-direction: column; align-items: flex-start;">${this.escapeHtml(t.description)||'-'}</td>
                        <td data-label="Categoria"><span class="category-badge" style="background:${c.color}">${this.escapeHtml(c.name)}</span></td>
                        <td data-label="Pagamento"><span class="payment-badge">${paymentName}</span></td>
                        <td data-label="Status"><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td data-label="Recorrência">${recurrenceHtml || '<span style="color:var(--text-secondary); font-size:0.85rem;">-</span>'}</td>
                        <td data-label="Valor" class="amount ${cls} privacy-value">${this.formatCurrency(t.amount)}</td>
                        <td data-label="Saldo" class="balance privacy-value">${this.formatCurrency(balMap.get(t.id))}</td>
                    </tr>`;
                }).join('');
            }

            applyTheme() {
                document.body.classList.toggle('light', !this.darkMode);
                const btn = document.getElementById('themeBtn');
                if (btn) {
                    if (this.darkMode) {
                        btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
                    } else {
                        btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
                    }
                }
                
                if (Object.keys(this.charts).length > 0) {
                    const hasValidCharts = Object.values(this.charts).some(c => c && c.options);
                    if (hasValidCharts) {
                        try {
                            this.updateChartsTheme();
                        } catch (e) {
                            console.warn('Erro ao atualizar tema dos gráficos:', e);
                        }
                    }
                }
            }

            applyPrivacy() {
                document.body.classList.toggle('privacy-on', this.privacyOn);
                const btn = document.getElementById('privacyBtn');
                if (btn) {
                    if (this.privacyOn) {
                        btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
                        btn.classList.add('active');
                    } else {
                        btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
                        btn.classList.remove('active');
                    }
                }
            }

            showToast(msg) { 
                const t=document.getElementById('toast'); 
                t.textContent=msg; 
                t.classList.add('active'); 
                clearTimeout(this.toastT); 
                this.toastT=setTimeout(()=>t.classList.remove('active'), 3000); 
            }

            setupConnectionHandler() {
                const statusEl = document.getElementById('connectionStatus');
                if (!statusEl) return;
                
                const updateStatus = () => {
                    if (navigator.onLine) {
                        statusEl.classList.remove('offline');
                    } else {
                        statusEl.classList.add('offline');
                    }
                };
                
                window.addEventListener('online', updateStatus);
                window.addEventListener('offline', updateStatus);
                
                if (!navigator.onLine) {
                    statusEl.classList.add('offline');
                }
            }

            setupStorageSync() {
                window.addEventListener('storage', (e) => {
                    if (e.key && e.key.startsWith('smartwallet_')) {
                        this.transactions = this.loadFromStorage('smartwallet_transactions', []);
                        this.categories = this.loadFromStorage('smartwallet_categories', this.getDefaultCategories());
                        this.cards = this.loadFromStorage('smartwallet_cards', []);
                        this.cardPurchases = this.loadFromStorage('smartwallet_card_purchases', []);
                        this.goal = this.loadFromStorage('smartwallet_goal', 0);
                        this.monthlyContribution = this.loadFromStorage('smartwallet_monthly_contribution', 0);
                        this.render();
                        this.updateCharts();
                        this.updateAlertBadge();
                    }
                });
            }

            setupKeyboardShortcuts() {
                document.addEventListener('keydown', (e) => {
                    if (e.ctrlKey && e.key === 'n') {
                        e.preventDefault();
                        openNewTransactionModal();
                    }
                    if (e.key === 'Escape') {
                        document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
                    }
                });
            }

            setupGlobalErrorHandlers() {
                window.addEventListener('error', (e) => {
                    console.error('Erro não capturado:', e.error);
                });

                window.addEventListener('unhandledrejection', (e) => {
                    console.error('Promise rejeitada:', e.reason);
                });
            }
        }

        const smartwallet = new SmartWallet();
        window.smartwallet = smartwallet;

        window.selectTransactionType = function(t) { smartwallet.currentTransactionType=t; document.querySelectorAll('#transactionForm .type-btn').forEach(b=>b.classList.toggle('active', b.dataset.type===t)); smartwallet.filterCategoriesByType('category', t); };
        window.selectEditType = function(t) { smartwallet.currentEditType=t; document.querySelectorAll('#editForm .type-btn').forEach(b=>b.classList.toggle('active', b.dataset.type===t)); smartwallet.filterCategoriesByType('editCategory', t); };
        window.selectNewCategoryType = function(t) { smartwallet.newCategoryType=t; document.querySelectorAll('#categoryModal .type-btn').forEach(b=>b.classList.toggle('active', b.dataset.type===t)); };
        
        window.openNewTransactionModal = function() { smartwallet.setDefaultDate(); smartwallet.filterCategoriesByType('category', smartwallet.currentTransactionType); document.getElementById('newTransactionModal').classList.add('active'); };
        window.closeNewTransactionModal = function() { document.getElementById('newTransactionModal').classList.remove('active'); smartwallet.clearForm(); };
        window.closeEditModal = function() { document.getElementById('editModal').classList.remove('active'); smartwallet.currentEditId = null; };
        window.openCategoryManager = function() { smartwallet.renderCategoryList(); document.getElementById('categoryModal').classList.add('active'); };
        window.closeCategoryManager = function() { document.getElementById('categoryModal').classList.remove('active'); };
        window.openExportModal = function() { document.getElementById('exportModal').classList.add('active'); };
        window.closeExportModal = function() { document.getElementById('exportModal').classList.remove('active'); };
        window.openGoalModal = function() { smartwallet.calculateGoalResult(); document.getElementById('goalModal').classList.add('active'); };
        window.closeGoalModal = function() { document.getElementById('goalModal').classList.remove('active'); };

        window.openImportCsvModal = function() {
            smartwallet.pendingCsvData = null;
            document.getElementById('csvFileInput').value = '';
            document.getElementById('csvFileName').textContent = 'Clique para selecionar';
            document.getElementById('csvReplaceData').checked = false;
            document.getElementById('importCsvModal').classList.add('active');
            document.getElementById('mainMenu').classList.remove('active');
        };
        window.closeImportCsvModal = function() { document.getElementById('importCsvModal').classList.remove('active'); };

        window.handleCsvFileSelect = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith('.csv')) {
                alert('⚠️ Por favor, selecione um arquivo com extensão .csv');
                event.target.value = '';
                return;
            }
            
            document.getElementById('csvFileName').textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
            const reader = new FileReader();
            reader.onload = (e) => { smartwallet.pendingCsvData = e.target.result; };
            reader.readAsText(file, 'UTF-8');
        };

        window.openImportBackupModal = function() {
            smartwallet.pendingBackupData = null;
            document.getElementById('backupFileInput').value = '';
            document.getElementById('backupFileName').textContent = 'Clique para selecionar';
            document.getElementById('importBackupModal').classList.add('active');
            document.getElementById('mainMenu').classList.remove('active');
        };
        window.closeImportBackupModal = function() { document.getElementById('importBackupModal').classList.remove('active'); };

        window.handleBackupFileSelect = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith('.json')) {
                alert('⚠️ Por favor, selecione um arquivo com extensão .json');
                event.target.value = '';
                return;
            }
            
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('⚠️ Arquivo muito grande! Máximo permitido: 10MB');
                event.target.value = '';
                return;
            }
            
            document.getElementById('backupFileName').textContent = `💾 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    
                    if (!content || content.trim().length === 0) {
                        alert('⚠️ Arquivo vazio!');
                        event.target.value = '';
                        return;
                    }
                    
                    JSON.parse(content);
                    
                    smartwallet.pendingBackupData = content;
                    smartwallet.showToast('✅ Arquivo carregado com sucesso!');
                    
                } catch (error) {
                    console.error('Erro ao validar JSON:', error);
                    alert('❌ Arquivo JSON inválido ou corrompido!\n\nErro: ' + error.message);
                    event.target.value = '';
                    smartwallet.pendingBackupData = null;
                }
            };
            
            reader.onerror = (error) => {
                console.error('Erro ao ler arquivo:', error);
                alert('❌ Erro ao ler o arquivo!');
                event.target.value = '';
            };
            
            reader.readAsText(file, 'UTF-8');
        };

        window.openClearDataModal = function() {
            document.getElementById('clearStep1').style.display = 'block';
            document.getElementById('clearStep2').style.display = 'none';
            document.getElementById('clearConfirmInput').value = '';
            document.getElementById('clearConfirmInput').classList.remove('match');
            const btn = document.getElementById('finalClearBtn');
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            document.getElementById('clearDataModal').classList.add('active');
            document.getElementById('mainMenu').classList.remove('active');
        };
        window.closeClearDataModal = function() { document.getElementById('clearDataModal').classList.remove('active'); };

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
                btn.style.cursor = 'pointer';
            } else {
                input.classList.remove('match');
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
        };

        window.openCreditCardsModal = function() {
            smartwallet.renderCreditCardsList();
            document.getElementById('creditCardsModal').classList.add('active');
            document.getElementById('mainMenu').classList.remove('active');
        };
        window.closeCreditCardsModal = function() { document.getElementById('creditCardsModal').classList.remove('active'); };

        window.openNewCardModal = function() {
            document.getElementById('cardEditId').value = '';
            document.getElementById('cardForm').reset();
            document.getElementById('cardClosingDay').value = 20;
            document.getElementById('cardDueDay').value = 27;
            document.getElementById('cardColor').value = '#6366f1';
            document.getElementById('newCardTitle').textContent = 'Novo Cartão';
            document.getElementById('newCardModal').classList.add('active');
        };
        window.closeNewCardModal = function() { document.getElementById('newCardModal').classList.remove('active'); };

        window.openInvoiceModal = function(cardId) { smartwallet.openInvoice(cardId); };
        window.closeInvoiceModal = function() { document.getElementById('invoiceModal').classList.remove('active'); };

        window.openNewPurchaseModal = function(cardId) {
            document.getElementById('purchaseForm').reset();
            document.getElementById('purchaseCardId').value = cardId;
            document.getElementById('purchaseDate').value = new Date().toISOString().split('T')[0];
            document.getElementById('purchaseInstallments').value = '1';
            document.getElementById('purchaseStatus').value = 'pending';
            smartwallet.populateCategorySelects();
            document.getElementById('newPurchaseModal').classList.add('active');
        };
        window.closeNewPurchaseModal = function() { document.getElementById('newPurchaseModal').classList.remove('active'); };

        window.openBillsModal = function() {
            smartwallet.renderBillsModal();
            document.getElementById('billsModal').classList.add('active');
        };
        window.closeBillsModal = function() { document.getElementById('billsModal').classList.remove('active'); };

        window.openManualModal = function() {
            document.getElementById('manualContent').innerHTML = manualHTML;
            document.getElementById('manualModal').classList.add('active');
            document.getElementById('infoMenu').classList.remove('active');
        };
        window.closeManualModal = function() { document.getElementById('manualModal').classList.remove('active'); };

        window.openTermsModal = function() {
            document.getElementById('disclaimerModal').style.display = 'flex';
            initDisclaimer();
            document.getElementById('infoMenu').classList.remove('active');
        };

        window.openThanksModal = function() {
            document.getElementById('thanksModal').classList.add('active');
            document.getElementById('infoMenu').classList.remove('active');
        };
        window.closeThanksModal = function() { document.getElementById('thanksModal').classList.remove('active'); };

        window.copyPixKey = function() {
            const pixKey = document.getElementById('pixKey').textContent;
            navigator.clipboard.writeText(pixKey).then(() => {
                smartwallet.showToast('✅ Chave PIX copiada!');
            }).catch(() => {
                smartwallet.showToast('❌ Erro ao copiar. Copie manualmente: ' + pixKey);
            });
        };

        window.toggleInfoMenu = function(e) {
            e.stopPropagation();
            document.getElementById('infoMenu').classList.toggle('active');
        };

        window.toggleMenu = function(e) {
            e.stopPropagation();
            document.getElementById('mainMenu').classList.toggle('active');
            document.getElementById('infoMenu').classList.remove('active');
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

        let disclaimerTimerInterval;
        let disclaimerCountdown = 15;

        function initDisclaimer() {
            const timerEl = document.getElementById('countdown');
            const btnEl = document.getElementById('acceptDisclaimerBtn');
            
            disclaimerCountdown = 15;
            btnEl.classList.remove('enabled');
            timerEl.innerHTML = `⏱️ Por favor, leia atentamente. O botão será habilitado em <span id="countdown">${disclaimerCountdown}</span> segundos`;
            
            clearInterval(disclaimerTimerInterval);
            disclaimerTimerInterval = setInterval(() => {
                disclaimerCountdown--;
                const countdownSpan = document.getElementById('countdown');
                if (countdownSpan) countdownSpan.textContent = disclaimerCountdown;
                
                if (disclaimerCountdown <= 0) {
                    clearInterval(disclaimerTimerInterval);
                    btnEl.classList.add('enabled');
                    timerEl.innerHTML = '✅ Você já pode aceitar os termos';
                }
            }, 1000);
        }

        window.acceptDisclaimer = function() {
            const btnEl = document.getElementById('acceptDisclaimerBtn');
            if (!btnEl.classList.contains('enabled')) return;
            
            document.getElementById('disclaimerModal').style.display = 'none';
            showQuoteModal();
        };

        function showQuoteModal() {
            const quote = financialQuotes[Math.floor(Math.random() * financialQuotes.length)];
            document.getElementById('quoteText').textContent = `"${quote.text}"`;
            document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
            document.getElementById('quoteModal').classList.add('active');
        }

        window.startApp = function() {
            document.getElementById('quoteModal').classList.remove('active');
            document.getElementById('mainApp').style.display = 'block';
            document.getElementById('fabBtn').style.display = 'flex';
        };

        window.printManual = function() {
            window.print();
        };

        function updatePrintDate() {
            const dateEl = document.getElementById('printDate');
            if (dateEl) {
                dateEl.textContent = 'Gerado em: ' + new Date().toLocaleString('pt-BR');
            }
        }

        window.addEventListener('load', () => {
            updatePrintDate();
            initDisclaimer();
            
            setTimeout(() => {
                const splash = document.getElementById('splashScreen');
                splash.classList.add('fade-out');
                setTimeout(() => {
                    splash.style.display = 'none';
                    document.getElementById('disclaimerModal').style.display = 'flex';
                }, 600);
            }, 3000);
        });

        document.addEventListener('click', (e) => {
            const menu = document.getElementById('mainMenu');
            const infoMenu = document.getElementById('infoMenu');
            const menuBtn = e.target.closest('.menu-btn');
            const infoBtn = e.target.closest('.info-btn');
            
            if (!menuBtn && menu.classList.contains('active')) menu.classList.remove('active');
            if (!infoBtn && infoMenu.classList.contains('active')) infoMenu.classList.remove('active');
        });

        // Funções para o modal de confirmação de recorrência
        window.closeRecurrenceConfirmModal = function() {
            document.getElementById('recurrenceConfirmModal').classList.remove('active');
            smartwallet.pendingRecurrenceUpdate = null;
        };

        window.applyRecurrenceUpdate = function(scope) {
            smartwallet.applyRecurrenceUpdate(scope);
        };

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(reg => console.log('✅ SW registrado:', reg.scope))
                    .catch(err => console.log('❌ SW falhou:', err));
            });
        }
    })();