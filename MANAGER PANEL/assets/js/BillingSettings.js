// Billing Settings Management System
class MBQFBillingSettings {
    constructor() {
        this.settings = {
            billingRules: {},
            depositSettings: {},
            automation: {},
            documents: [],
            clientData: [],
            currentRule: null
        };
        
        this.chart = null;
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.bindEvents();
        this.bindDepositEvents();
        this.initializeChart();
        this.loadClientOverview();
        this.initializeDepositUI();
    }
    
    // ==================== SETTINGS MANAGEMENT ====================
    
    loadSettings() {
        const savedSettings = localStorage.getItem('mbqf_billing_settings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
        } else {
            this.setDefaultSettings();
        }
    }
    
    setDefaultSettings() {
        this.settings = {
            billingRules: {
                commercial: {
                    id: 'commercial',
                    name: 'Commercial',
                    description: 'All commercial recurring services (weekly, bi-weekly, monthly) are billed once at the end of the month.',
                    invoiceTrigger: 'end_of_month',
                    consolidation: true,
                    autoInvoice: true,
                    smartSettings: true,
                    enabled: true
                },
                residential_recurring: {
                    id: 'residential_recurring',
                    name: 'Residential Recurring',
                    description: 'Recurring residential services receive one invoice on the 15th of the month.',
                    invoiceTrigger: '15th_of_month',
                    consolidation: true,
                    autoInvoice: true,
                    smartSettings: true,
                    enabled: true
                },
                residential_onetime: {
                    id: 'residential_onetime',
                    name: 'Residential One-Time',
                    description: 'One-time residential cleanings are billed immediately upon service completion.',
                    invoiceTrigger: 'after_service',
                    consolidation: false,
                    autoInvoice: true,
                    smartSettings: true,
                    enabled: true
                },
                commercial_onetime: {
                    id: 'commercial_onetime',
                    name: 'Commercial One-Time',
                    description: 'One-time commercial cleanings are billed immediately after service completion.',
                    invoiceTrigger: 'after_service',
                    consolidation: false,
                    autoInvoice: true,
                    smartSettings: true,
                    enabled: true
                }
            },
            depositSettings: {
                enabled: true,
                quickbooksConnected: true,
                lastSync: new Date().toISOString(),
                rules: {
                    commercial: {
                        id: 'commercial',
                        depositRequired: true,
                        depositAmount: 120,
                        depositTiming: 'booking_confirmation',
                        quickbooksSync: true,
                        percentageOption: 50
                    },
                    residential_recurring: {
                        id: 'residential_recurring',
                        depositRequired: true,
                        depositAmount: 120,
                        depositTiming: 'booking_confirmation',
                        quickbooksSync: true,
                        percentageOption: 25
                    },
                    residential_onetime: {
                        id: 'residential_onetime',
                        depositRequired: true,
                        depositAmount: 120,
                        depositTiming: 'booking_confirmation',
                        quickbooksSync: true,
                        percentageOption: 30
                    },
                    commercial_onetime: {
                        id: 'commercial_onetime',
                        depositRequired: true,
                        depositAmount: 120,
                        depositTiming: 'booking_confirmation',
                        quickbooksSync: true,
                        percentageOption: 50
                    }
                }
            },
            automation: {
                autoInvoiceGeneration: true,
                endOfDayReview: true,
                autoClientCategorization: true,
                financingAutomation: true,
                criteriaHours: true,
                criteriaRecurrence: true,
                criteriaServiceType: true,
                eomProcessing: 'last_business_day',
                midMonthProcessing: true,
                realTimeProcessing: true,
                notifyAdmin: true,
                notifyErrors: true,
                logRetention: '30'
            },
            documents: [
                {
                    id: 1,
                    name: 'Commercial Billing Template',
                    category: 'billing_templates',
                    type: 'PDF',
                    size: '245 KB',
                    uploaded: '2024-01-15'
                },
                {
                    id: 2,
                    name: 'Residential Recurring Contract',
                    category: 'contracts',
                    type: 'DOCX',
                    size: '512 KB',
                    uploaded: '2024-01-10'
                },
                {
                    id: 3,
                    name: 'Automation Rules Guide',
                    category: 'automation_rules',
                    type: 'PDF',
                    size: '1.2 MB',
                    uploaded: '2024-01-05'
                }
            ],
            clientData: this.generateSampleClients()
        };
    }
    
    generateSampleClients() {
        return [
            { id: 1, name: 'ABC Corporation', type: 'recurring_commercial', schedule: 'end_of_month', frequency: 'weekly', autoInvoice: true, lastInvoice: '2024-01-31' },
            { id: 2, name: 'Smith Residence', type: 'recurring_residential', schedule: '15th_of_month', frequency: 'bi-weekly', autoInvoice: true, lastInvoice: '2024-01-15' },
            { id: 3, name: 'Johnson Family', type: 'first_time_residential', schedule: 'after_service', frequency: 'one-time', autoInvoice: true, lastInvoice: '2024-01-20' },
            { id: 4, name: 'Tech Startup Inc', type: 'first_time_commercial', schedule: 'after_service', frequency: 'one-time', autoInvoice: true, lastInvoice: '2024-01-18' },
            { id: 5, name: 'Brown Residence', type: 'recurring_residential', schedule: '15th_of_month', frequency: 'monthly', autoInvoice: true, lastInvoice: '2024-01-15' },
            { id: 6, name: 'Retail Store', type: 'recurring_commercial', schedule: 'end_of_month', frequency: 'weekly', autoInvoice: true, lastInvoice: '2024-01-31' }
        ];
    }
    
    saveToLocalStorage() {
        localStorage.setItem('mbqf_billing_settings', JSON.stringify(this.settings));
    }
    
    // ==================== EVENT BINDING ====================
    
    bindEvents() {
        // Save All Settings
        document.getElementById('mbqfSaveAllSettings')?.addEventListener('click', () => this.saveAllSettings());
        
        // Apply Filters
        document.getElementById('mbqfApplyFilters')?.addEventListener('click', () => this.applyFilters());
        
        // Export Overview
        document.getElementById('mbqfExportOverview')?.addEventListener('click', () => this.exportOverview());
        
        // Document Categories
        document.querySelectorAll('#mbqfDocumentCategories a').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('#mbqfDocumentCategories a').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.filterDocuments(e.currentTarget.dataset.category);
            });
        });
        
        // Upload Document
        document.getElementById('mbqfUploadDocument')?.addEventListener('click', () => this.uploadDocument());
        
        // Billing Rule Events
        document.querySelectorAll('.mbqf-edit-rule').forEach(button => {
            button.addEventListener('click', (e) => {
                const ruleId = e.currentTarget.dataset.ruleId;
                this.editRule(ruleId);
            });
        });
        
        // Smart Settings Toggle
        document.querySelectorAll('.mbqf-smart-settings').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.handleSmartSettingsChange(ruleId, e.target.checked);
            });
        });
        
        // Auto Invoice Toggle
        document.querySelectorAll('.mbqf-auto-invoice').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.updateRuleSetting(ruleId, 'autoInvoice', e.target.checked);
            });
        });
        
        // Consolidation Toggle
        document.querySelectorAll('.mbqf-consolidation').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.updateRuleSetting(ruleId, 'consolidation', e.target.checked);
            });
        });
        
        // Invoice Trigger Change
        document.querySelectorAll('.mbqf-invoice-trigger').forEach(select => {
            select.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.updateRuleSetting(ruleId, 'invoiceTrigger', e.target.value);
            });
        });
        
        // Automation Settings
        document.querySelectorAll('#mbqf-tab-automation-content input, #mbqf-tab-automation-content select').forEach(element => {
            element.addEventListener('change', () => this.updateAutomationSettings());
        });
        
        // Tab Change
        document.querySelectorAll('#mbqfBillingTabs button').forEach(tab => {
            tab.addEventListener('shown.bs.tab', () => {
                if (tab.id === 'mbqf-tab-overview') {
                    this.updateChart();
                }
            });
        });
        
        // Modal Close
        document.getElementById('mbqfBillingSettingsModal')?.addEventListener('hidden.bs.modal', () => {
            this.saveToLocalStorage();
        });
    }
    
    bindDepositEvents() {
        // QuickBooks Sync Button
        document.getElementById('mbqfSyncQuickBooks')?.addEventListener('click', () => this.syncQuickBooks());
        
        // Configure QuickBooks Button
        document.getElementById('mbqfConfigureQB')?.addEventListener('click', () => this.configureQuickBooks());
        
        // Global Deposit Activation
        const depositActivation = document.getElementById('mbqfDepositActivation');
        if (depositActivation) {
            depositActivation.addEventListener('change', (e) => {
                this.updateDepositActivation(e.target.checked);
            });
        }
        
        // Deposit Required Toggle
        document.querySelectorAll('.mbqf-deposit-required').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.updateDepositSetting(ruleId, 'depositRequired', e.target.checked);
                this.updateDepositStats();
            });
        });
        
        // Deposit Amount Change
        document.querySelectorAll('.mbqf-deposit-amount').forEach(input => {
            input.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.updateDepositSetting(ruleId, 'depositAmount', parseFloat(e.target.value));
                this.updateDepositStats();
            });
        });
        
        // Deposit Timing Change
        document.querySelectorAll('.mbqf-deposit-timing').forEach(select => {
            select.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.updateDepositSetting(ruleId, 'depositTiming', e.target.value);
            });
        });
        
        // QuickBooks Sync Toggle
        document.querySelectorAll('.mbqf-qb-sync').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const ruleId = e.target.dataset.ruleId;
                this.updateDepositSetting(ruleId, 'quickbooksSync', e.target.checked);
                this.updateDepositStats();
            });
        });
        
        // Edit Deposit Rule Buttons
        document.querySelectorAll('.mbqf-edit-deposit-rule').forEach(button => {
            button.addEventListener('click', (e) => {
                const ruleId = e.currentTarget.dataset.ruleId;
                this.editDepositRule(ruleId);
            });
        });
    }
    
    // ==================== CHART FUNCTIONS ====================
    
    initializeChart() {
        const ctx = document.getElementById('mbqfClientDistributionChart');
        if (!ctx) return;
        
        this.chart = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Recurring Residential', 'First Time Commercial', 'First Time Residential', 'Recurring Commercial'],
                datasets: [{
                    data: [2, 1, 1, 2],
                    backgroundColor: [
                        '#0d6efd',
                        '#198754',
                        '#6f42c1',
                        '#fd7e14'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    updateChart() {
        if (!this.chart) return;
        
        const clientTypes = {
            'recurring_residential': 0,
            'first_time_commercial': 0,
            'first_time_residential': 0,
            'recurring_commercial': 0
        };
        
        this.settings.clientData.forEach(client => {
            if (clientTypes.hasOwnProperty(client.type)) {
                clientTypes[client.type]++;
            }
        });
        
        this.chart.data.datasets[0].data = Object.values(clientTypes);
        this.chart.update();
        
        // Update counters
        document.getElementById('mbqfCountRR').textContent = clientTypes.recurring_residential;
        document.getElementById('mbqfCountFTC').textContent = clientTypes.first_time_commercial;
        document.getElementById('mbqfCountFTR').textContent = clientTypes.first_time_residential;
    }
    
    // ==================== CLIENT OVERVIEW FUNCTIONS ====================
    
    loadClientOverview() {
        const tbody = document.getElementById('mbqfClientOverviewBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.settings.clientData.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.name}</td>
                <td><span class="badge ${this.getTypeBadgeClass(client.type)}">${this.formatClientType(client.type)}</span></td>
                <td>${this.formatSchedule(client.schedule)}</td>
                <td>${this.formatFrequency(client.frequency)}</td>
                <td><span class="badge ${client.autoInvoice ? 'bg-success' : 'bg-secondary'}">${client.autoInvoice ? 'Enabled' : 'Disabled'}</span></td>
                <td>${client.lastInvoice}</td>
            `;
            tbody.appendChild(row);
        });
        
        this.updateChart();
    }
    
    getTypeBadgeClass(type) {
        const classes = {
            'recurring_residential': 'bg-primary',
            'first_time_commercial': 'bg-success',
            'first_time_residential': 'bg-info',
            'recurring_commercial': 'bg-warning',
            'onetime_residential': 'bg-secondary',
            'onetime_commercial': 'bg-dark'
        };
        return classes[type] || 'bg-secondary';
    }
    
    formatClientType(type) {
        const types = {
            'recurring_residential': 'Recurring Residential',
            'first_time_commercial': 'First Time Commercial',
            'first_time_residential': 'First Time Residential',
            'recurring_commercial': 'Recurring Commercial',
            'onetime_residential': 'One-Time Residential',
            'onetime_commercial': 'One-Time Commercial'
        };
        return types[type] || type;
    }
    
    formatSchedule(schedule) {
        const schedules = {
            'end_of_month': 'End of Month',
            '15th_of_month': '15th of Month',
            'after_service': 'After Service'
        };
        return schedules[schedule] || schedule;
    }
    
    formatFrequency(frequency) {
        const frequencies = {
            'weekly': 'Weekly',
            'bi-weekly': 'Bi-Weekly',
            'monthly': 'Monthly',
            'one-time': 'One-Time'
        };
        return frequencies[frequency] || frequency;
    }
    
    applyFilters() {
        const typeFilter = document.getElementById('mbqfClientTypeFilter').value;
        const scheduleFilter = document.getElementById('mbqfBillingScheduleFilter').value;
        
        const filteredClients = this.settings.clientData.filter(client => {
            const typeMatch = typeFilter === 'all' || client.type === typeFilter;
            const scheduleMatch = scheduleFilter === 'all' || client.schedule === scheduleFilter;
            return typeMatch && scheduleMatch;
        });
        
        const tbody = document.getElementById('mbqfClientOverviewBody');
        tbody.innerHTML = '';
        
        filteredClients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.name}</td>
                <td><span class="badge ${this.getTypeBadgeClass(client.type)}">${this.formatClientType(client.type)}</span></td>
                <td>${this.formatSchedule(client.schedule)}</td>
                <td>${this.formatFrequency(client.frequency)}</td>
                <td><span class="badge ${client.autoInvoice ? 'bg-success' : 'bg-secondary'}">${client.autoInvoice ? 'Enabled' : 'Disabled'}</span></td>
                <td>${client.lastInvoice}</td>
            `;
            tbody.appendChild(row);
        });
        
        this.showNotification(`${filteredClients.length} clients found`, 'info');
    }
    
    exportOverview() {
        const table = document.getElementById('mbqfClientOverviewTable');
        let csv = [];
        
        // Headers
        const headers = [];
        table.querySelectorAll('thead th').forEach(th => {
            headers.push(th.textContent);
        });
        csv.push(headers.join(','));
        
        // Data
        table.querySelectorAll('tbody tr').forEach(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach(cell => {
                const badge = cell.querySelector('.badge');
                if (badge) {
                    rowData.push(badge.textContent);
                } else {
                    rowData.push(cell.textContent.trim());
                }
            });
            csv.push(rowData.join(','));
        });
        
        // Download
        const csvContent = csv.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `client-overview-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        this.showNotification('Export completed successfully', 'success');
    }
    
    // ==================== DOCUMENT FUNCTIONS ====================
    
    filterDocuments(category) {
        const tbody = document.getElementById('mbqfDocumentsBody');
        const rows = tbody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const categoryBadge = row.querySelector('.badge');
            if (category === 'all' || categoryBadge.textContent === category) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    uploadDocument() {
        this.showNotification('Document upload feature would be implemented here', 'info');
    }
    
    // ==================== BILLING RULE FUNCTIONS ====================
    
    editRule(ruleId) {
        const rule = this.settings.billingRules[ruleId];
        this.currentRule = ruleId;
        
        const modalContent = document.getElementById('mbqfEditRuleContent');
        if (!modalContent) return;
        
        modalContent.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label class="form-label">Rule Name</label>
                        <input type="text" class="form-control" id="mbqfEditRuleName" value="${rule.name}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" id="mbqfEditRuleDesc" rows="3">${rule.description}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Invoice Trigger</label>
                        <select class="form-select" id="mbqfEditInvoiceTrigger">
                            <option value="end_of_month" ${rule.invoiceTrigger === 'end_of_month' ? 'selected' : ''}>End of Month</option>
                            <option value="15th_of_month" ${rule.invoiceTrigger === '15th_of_month' ? 'selected' : ''}>15th of Month</option>
                            <option value="after_service" ${rule.invoiceTrigger === 'after_service' ? 'selected' : ''}>After Service</option>
                            <option value="custom" ${rule.invoiceTrigger === 'custom' ? 'selected' : ''}>Custom Date</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="mbqfEditAutoInvoice" ${rule.autoInvoice ? 'checked' : ''}>
                                <label class="form-check-label" for="mbqfEditAutoInvoice">Auto Invoice</label>
                            </div>
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="mbqfEditConsolidation" ${rule.consolidation ? 'checked' : ''} ${rule.id.includes('onetime') ? 'disabled' : ''}>
                                <label class="form-check-label" for="mbqfEditConsolidation">Consolidation</label>
                            </div>
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="mbqfEditSmartSettings" ${rule.smartSettings ? 'checked' : ''}>
                                <label class="form-check-label" for="mbqfEditSmartSettings">Smart Settings</label>
                            </div>
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="mbqfEditEnabled" ${rule.enabled ? 'checked' : ''}>
                                <label class="form-check-label" for="mbqfEditEnabled">Rule Enabled</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('mbqfEditRuleModal'));
        modal.show();
        
        document.getElementById('mbqfSaveRuleChanges').onclick = () => this.saveRuleChanges();
    }
    
    saveRuleChanges() {
        if (!this.currentRule) return;
        
        const rule = this.settings.billingRules[this.currentRule];
        
        rule.name = document.getElementById('mbqfEditRuleName').value;
        rule.description = document.getElementById('mbqfEditRuleDesc').value;
        rule.invoiceTrigger = document.getElementById('mbqfEditInvoiceTrigger').value;
        rule.autoInvoice = document.getElementById('mbqfEditAutoInvoice').checked;
        rule.consolidation = document.getElementById('mbqfEditConsolidation').checked;
        rule.smartSettings = document.getElementById('mbqfEditSmartSettings').checked;
        rule.enabled = document.getElementById('mbqfEditEnabled').checked;
        
        this.updateRuleUI(this.currentRule);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('mbqfEditRuleModal'));
        if (modal) modal.hide();
        
        this.showNotification('Rule updated successfully', 'success');
    }
    
    updateRuleUI(ruleId) {
        const rule = this.settings.billingRules[ruleId];
        const row = document.querySelector(`tr[data-rule-id="${ruleId}"]`);
        
        if (row) {
            const descCell = row.querySelector('.mbqf-rule-desc');
            if (descCell) descCell.textContent = rule.description;
            
            const triggerSelect = row.querySelector('.mbqf-invoice-trigger');
            if (triggerSelect) triggerSelect.value = rule.invoiceTrigger;
            
            const autoInvoiceCheckbox = row.querySelector('.mbqf-auto-invoice');
            if (autoInvoiceCheckbox) autoInvoiceCheckbox.checked = rule.autoInvoice;
            
            const consolidationCheckbox = row.querySelector('.mbqf-consolidation');
            if (consolidationCheckbox) {
                consolidationCheckbox.checked = rule.consolidation;
                consolidationCheckbox.disabled = ruleId.includes('onetime');
            }
            
            const smartSettingsCheckbox = row.querySelector('.mbqf-smart-settings');
            if (smartSettingsCheckbox) smartSettingsCheckbox.checked = rule.smartSettings;
        }
    }
    
    handleSmartSettingsChange(ruleId, enabled) {
        if (!enabled) return;
        
        // If smart settings enabled for a residential rule, disable other residential rules
        if (ruleId.includes('residential')) {
            Object.keys(this.settings.billingRules).forEach(id => {
                if (id.includes('residential') && id !== ruleId) {
                    this.settings.billingRules[id].smartSettings = false;
                    const checkbox = document.querySelector(`.mbqf-smart-settings[data-rule-id="${id}"]`);
                    if (checkbox) checkbox.checked = false;
                }
            });
        }
        
        // If smart settings enabled for a commercial rule, disable other commercial rules
        if (ruleId.includes('commercial')) {
            Object.keys(this.settings.billingRules).forEach(id => {
                if (id.includes('commercial') && id !== ruleId) {
                    this.settings.billingRules[id].smartSettings = false;
                    const checkbox = document.querySelector(`.mbqf-smart-settings[data-rule-id="${id}"]`);
                    if (checkbox) checkbox.checked = false;
                }
            });
        }
    }
    
    updateRuleSetting(ruleId, setting, value) {
        if (this.settings.billingRules[ruleId]) {
            this.settings.billingRules[ruleId][setting] = value;
        }
    }
    
    // ==================== DEPOSIT FUNCTIONS ====================
    
    initializeDepositUI() {
        // Set initial values for deposit settings
        const depositActivation = document.getElementById('mbqfDepositActivation');
        if (depositActivation) {
            depositActivation.checked = this.settings.depositSettings.enabled;
        }
        
        // Update last sync time
        const lastSyncElement = document.getElementById('mbqfLastSync');
        if (lastSyncElement) {
            lastSyncElement.textContent = new Date(this.settings.depositSettings.lastSync).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        // Update QuickBooks status
        const qbStatus = document.getElementById('mbqfQBStatus');
        if (qbStatus) {
            qbStatus.textContent = this.settings.depositSettings.quickbooksConnected ? 'Connected' : 'Disconnected';
            qbStatus.className = this.settings.depositSettings.quickbooksConnected ? 'fw-bold text-success' : 'fw-bold text-danger';
        }
        
        this.updateDepositStats();
    }
    
    syncQuickBooks() {
        this.showNotification('Syncing with QuickBooks...', 'info');
        
        setTimeout(() => {
            this.settings.depositSettings.lastSync = new Date().toISOString();
            document.getElementById('mbqfLastSync').textContent = new Date().toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            this.showNotification('QuickBooks sync completed successfully', 'success');
        }, 1500);
    }
    
    configureQuickBooks() {
        this.showNotification('Opening QuickBooks configuration...', 'info');
    }
    
    updateDepositActivation(enabled) {
        this.settings.depositSettings.enabled = enabled;
        
        document.querySelectorAll('.mbqf-deposit-required').forEach(checkbox => {
            checkbox.disabled = !enabled;
            if (!enabled) {
                checkbox.checked = false;
            }
        });
        
        document.querySelectorAll('.mbqf-deposit-amount').forEach(input => {
            input.disabled = !enabled;
        });
        
        document.querySelectorAll('.mbqf-deposit-timing').forEach(select => {
            select.disabled = !enabled;
        });
        
        document.querySelectorAll('.mbqf-qb-sync').forEach(checkbox => {
            checkbox.disabled = !enabled;
        });
        
        const status = enabled ? 'Activated' : 'Deactivated';
        this.showNotification(`Deposit requirements ${status}`, enabled ? 'success' : 'warning');
    }
    
    updateDepositSetting(ruleId, setting, value) {
        if (this.settings.depositSettings.rules[ruleId]) {
            this.settings.depositSettings.rules[ruleId][setting] = value;
        }
    }
    
    updateDepositStats() {
        const rules = this.settings.depositSettings.rules;
        const activeRules = Object.values(rules).filter(rule => rule.depositRequired).length;
        const qbSyncActive = Object.values(rules).filter(rule => rule.quickbooksSync).length;
        const depositRequired = Object.values(rules).filter(rule => rule.depositRequired).length;
        
        const amounts = Object.values(rules)
            .filter(rule => rule.depositRequired)
            .map(rule => rule.depositAmount);
        const avgDeposit = amounts.length > 0 
            ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length)
            : 0;
        
        document.getElementById('mbqfActiveDepositRules').textContent = activeRules;
        document.getElementById('mbqfQBSyncActive').textContent = qbSyncActive;
        document.getElementById('mbqfDepositRequired').textContent = depositRequired;
        document.getElementById('mbqfAvgDeposit').textContent = `$${avgDeposit}`;
    }
    
    editDepositRule(ruleId) {
        const rule = this.settings.depositSettings.rules[ruleId];
        
        const modalContent = `
            <div class="modal-header">
                <h5 class="modal-title">Edit Deposit Rule - ${ruleId.replace('_', ' ').toUpperCase()}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Deposit Amount ($)</label>
                    <input type="number" class="form-control" id="mbqfEditDepositAmount" value="${rule.depositAmount}" min="0" step="50">
                </div>
                <div class="mb-3">
                    <label class="form-label">Percentage Option (%)</label>
                    <input type="number" class="form-control" id="mbqfEditDepositPercentage" value="${rule.percentageOption}" min="0" max="100" step="5">
                    <small class="text-muted">Percentage of total service cost as deposit alternative</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">When to Collect Deposit</label>
                    <select class="form-select" id="mbqfEditDepositTiming">
                        <option value="booking_confirmation" ${rule.depositTiming === 'booking_confirmation' ? 'selected' : ''}>At Booking Confirmation</option>
                        <option value="48_hours_before" ${rule.depositTiming === '48_hours_before' ? 'selected' : ''}>48 Hours Before Service</option>
                        <option value="week_before" ${rule.depositTiming === 'week_before' ? 'selected' : ''}>1 Week Before Service</option>
                        <option value="custom" ${rule.depositTiming === 'custom' ? 'selected' : ''}>Custom Timeline</option>
                    </select>
                </div>
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="mbqfEditDepositRequired" ${rule.depositRequired ? 'checked' : ''}>
                    <label class="form-check-label" for="mbqfEditDepositRequired">Deposit Required</label>
                </div>
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="mbqfEditQBSync" ${rule.quickbooksSync ? 'checked' : ''}>
                    <label class="form-check-label" for="mbqfEditQBSync">Sync to QuickBooks</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="mbqfSaveDepositChanges">Save Changes</button>
            </div>
        `;
        
        let modal = document.getElementById('mbqfEditDepositModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = 'mbqfEditDepositModal';
            modal.innerHTML = modalContent;
            document.body.appendChild(modal);
        } else {
            modal.innerHTML = modalContent;
        }
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.querySelector('#mbqfSaveDepositChanges').addEventListener('click', () => {
            this.saveDepositChanges(ruleId);
            bsModal.hide();
        });
    }
    
    saveDepositChanges(ruleId) {
        const rule = this.settings.depositSettings.rules[ruleId];
        
        rule.depositAmount = parseFloat(document.getElementById('mbqfEditDepositAmount').value);
        rule.percentageOption = parseFloat(document.getElementById('mbqfEditDepositPercentage').value);
        rule.depositTiming = document.getElementById('mbqfEditDepositTiming').value;
        rule.depositRequired = document.getElementById('mbqfEditDepositRequired').checked;
        rule.quickbooksSync = document.getElementById('mbqfEditQBSync').checked;
        
        this.updateDepositRuleUI(ruleId);
        this.updateDepositStats();
        
        this.showNotification('Deposit rule updated successfully', 'success');
    }
    
    updateDepositRuleUI(ruleId) {
        const rule = this.settings.depositSettings.rules[ruleId];
        const row = document.querySelector(`tr[data-deposit-rule-id="${ruleId}"]`);
        
        if (row) {
            const amountInput = row.querySelector('.mbqf-deposit-amount');
            if (amountInput) amountInput.value = rule.depositAmount;
            
            const depositRequiredCheckbox = row.querySelector('.mbqf-deposit-required');
            if (depositRequiredCheckbox) depositRequiredCheckbox.checked = rule.depositRequired;
            
            const timingSelect = row.querySelector('.mbqf-deposit-timing');
            if (timingSelect) timingSelect.value = rule.depositTiming;
            
            const qbSyncCheckbox = row.querySelector('.mbqf-qb-sync');
            if (qbSyncCheckbox) qbSyncCheckbox.checked = rule.quickbooksSync;
        }
    }
    
    // ==================== AUTOMATION SETTINGS ====================
    
    updateAutomationSettings() {
        this.settings.automation = {
            autoInvoiceGeneration: document.getElementById('mbqfAutoInvoiceGeneration')?.checked || false,
            endOfDayReview: document.getElementById('mbqfEndOfDayReview')?.checked || false,
            autoClientCategorization: document.getElementById('mbqfAutoClientCategorization')?.checked || false,
            financingAutomation: document.getElementById('mbqfFinancingAutomation')?.checked || false,
            criteriaHours: document.getElementById('mbqfCriteriaHours')?.checked || false,
            criteriaRecurrence: document.getElementById('mbqfCriteriaRecurrence')?.checked || false,
            criteriaServiceType: document.getElementById('mbqfCriteriaServiceType')?.checked || false,
            eomProcessing: document.getElementById('mbqfEOMProcessing')?.value || 'last_business_day',
            midMonthProcessing: document.getElementById('mbqfMidMonthProcessing')?.checked || false,
            realTimeProcessing: document.getElementById('mbqfRealTimeProcessing')?.checked || false,
            notifyAdmin: document.getElementById('mbqfNotifyAdmin')?.checked || false,
            notifyErrors: document.getElementById('mbqfNotifyErrors')?.checked || false,
            logRetention: document.getElementById('mbqfLogRetention')?.value || '30'
        };
    }
    
    // ==================== SAVE ALL SETTINGS ====================
    
    saveAllSettings() {
        this.updateAutomationSettings();
        
        // Save deposit settings
        const depositActivation = document.getElementById('mbqfDepositActivation');
        if (depositActivation) {
            this.settings.depositSettings.enabled = depositActivation.checked;
        }
        
        this.saveToLocalStorage();
        this.showNotification('All settings saved successfully', 'success');
        
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('mbqfBillingSettingsModal'));
            if (modal) modal.hide();
        }, 1500);
    }
    
    // ==================== NOTIFICATION SYSTEM ====================
    
    showNotification(message, type = 'info') {
        const existingAlert = document.querySelector('.mbqf-notification-alert');
        if (existingAlert) existingAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} mbqf-notification-alert`;
        alert.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${message}</span>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '9999';
        alert.style.minWidth = '300px';
        alert.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.mbqfBillingSettings = new MBQFBillingSettings();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});