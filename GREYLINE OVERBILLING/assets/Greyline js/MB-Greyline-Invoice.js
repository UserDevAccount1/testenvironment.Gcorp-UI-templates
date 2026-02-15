// Grey Line Invoice Management Application
const greylineInvoiceApp = {
    // Invoice Data - Complete sample data
    allInvoices: [
        {
            id: 1,
            invoiceNumber: 'INV-2025-03321',
            date: '2025-03-15',
            client: 'Maria Santos',
            serviceType: 'Deep Clean',
            recurrence: 'Weekly',
            subtotal: 420,
            greyLine: 28,
            total: 476.24,
            threshold: 0.14,
            greyLineStatus: 'applied',
            invoiceStatus: 'paid',
            items: [
                { description: 'Deep Cleaning — 3 Rooms + 2 Bathrooms', amount: 280 },
                { description: 'Add-on: Carpet Steam Clean', amount: 50 },
                { description: 'Add-on: Kitchen Degrease', amount: 30 },
                { description: 'Add-on: Balcony Cleaning', amount: 40 },
                { description: 'Eco-friendly Solutions', amount: 20 }
            ],
            greyLineDetails: {
                appliedDate: '2025-03-14 10:30',
                appliedBy: 'John Manager',
                reasons: ['Weekly recurrence buildup', 'Pets in home', 'Kitchen grease buildup'],
                parameters: {
                    recurrence: 4,
                    dirtLevel: 5,
                    pets: 5,
                    kitchen: 3,
                    seasonal: 4
                },
                auditLog: [
                    { date: '2025-03-14 10:30', action: 'Grey Line Applied', user: 'John Manager', amount: 28 },
                    { date: '2025-03-13 14:15', action: 'Invoice Created', user: 'System', amount: 0 }
                ]
            }
        },
        // Add these to your existing allInvoices array after the existing 10 invoices
{
    id: 11,
    invoiceNumber: 'INV-2025-03331',
    date: '2025-03-05',
    client: 'Emily Rodriguez',
    serviceType: 'Residential',
    recurrence: 'Bi-Weekly',
    subtotal: 320,
    greyLine: 22,
    total: 386.56,
    threshold: 0.15,
    greyLineStatus: 'applied',
    invoiceStatus: 'paid',
    items: [
        { description: 'Standard Cleaning — 3 Bedrooms + Living Room', amount: 220 },
        { description: 'Add-on: Window Cleaning', amount: 60 },
        { description: 'Eco-friendly Products', amount: 40 }
    ],
    greyLineDetails: {
        appliedDate: '2025-03-04 14:20',
        appliedBy: 'Jane Supervisor',
        reasons: ['High dust accumulation', 'Multiple pets in home', 'Seasonal allergies'],
        parameters: {
            recurrence: 3,
            dirtLevel: 6,
            pets: 7,
            kitchen: 2,
            seasonal: 4
        },
        auditLog: [
            { date: '2025-03-04 14:20', action: 'Grey Line Applied', user: 'Jane Supervisor', amount: 22 },
            { date: '2025-03-03 16:45', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 12,
    invoiceNumber: 'INV-2025-03332',
    date: '2025-03-04',
    client: 'Tech Startup Hub',
    serviceType: 'Commercial',
    recurrence: 'Weekly',
    subtotal: 1850,
    greyLine: 55,
    total: 2151.75,
    threshold: 0.12,
    greyLineStatus: 'applied',
    invoiceStatus: 'pending',
    items: [
        { description: 'Office Cleaning — 8000 sq ft', amount: 1250 },
        { description: 'Kitchen & Break Room Cleaning', amount: 300 },
        { description: 'Restroom Sanitization', amount: 200 },
        { description: 'Special: Electronics Dusting', amount: 100 }
    ],
    greyLineDetails: {
        appliedDate: '2025-03-03 11:45',
        appliedBy: 'John Manager',
        reasons: ['High-tech equipment dusting', 'Daily foot traffic', 'Food areas maintenance'],
        parameters: {
            recurrence: 8,
            dirtLevel: 5,
            pets: 0,
            kitchen: 6,
            seasonal: 0
        },
        auditLog: [
            { date: '2025-03-03 11:45', action: 'Grey Line Applied', user: 'John Manager', amount: 55 },
            { date: '2025-03-02 09:30', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 13,
    invoiceNumber: 'INV-2025-03333',
    date: '2025-03-03',
    client: 'David Miller',
    serviceType: 'Deep Clean',
    recurrence: 'Monthly',
    subtotal: 680,
    greyLine: 48,
    total: 823.04,
    threshold: 0.18,
    greyLineStatus: 'applied',
    invoiceStatus: 'paid',
    items: [
        { description: 'Deep Cleaning — 5 Rooms + 4 Bathrooms', amount: 450 },
        { description: 'Add-on: Carpet Steam Clean (All Rooms)', amount: 120 },
        { description: 'Add-on: Window Washing (Inside/Outside)', amount: 80 },
        { description: 'Special: Mold Treatment', amount: 30 }
    ],
    greyLineDetails: {
        appliedDate: '2025-03-02 15:30',
        appliedBy: 'John Manager',
        reasons: ['Post-renovation cleaning', 'Mold remediation required', 'High window count'],
        parameters: {
            recurrence: 5,
            dirtLevel: 8,
            pets: 0,
            kitchen: 3,
            seasonal: 7
        },
        auditLog: [
            { date: '2025-03-02 15:30', action: 'Grey Line Applied', user: 'John Manager', amount: 48 },
            { date: '2025-03-01 10:15', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 14,
    invoiceNumber: 'INV-2025-03334',
    date: '2025-03-02',
    client: 'Sunshine Apartments',
    serviceType: 'Commercial',
    recurrence: 'Monthly',
    subtotal: 2450,
    greyLine: 72,
    total: 2851.50,
    threshold: 0.10,
    greyLineStatus: 'applied',
    invoiceStatus: 'overdue',
    items: [
        { description: 'Common Areas Cleaning — 15,000 sq ft', amount: 1800 },
        { description: 'Laundry Room Maintenance', amount: 300 },
        { description: 'Elevator Cleaning', amount: 200 },
        { description: 'Garbage Area Sanitization', amount: 150 }
    ],
    greyLineDetails: {
        appliedDate: '2025-03-01 13:15',
        appliedBy: 'Jane Supervisor',
        reasons: ['Large multi-unit property', 'High resident turnover', 'Common area wear'],
        parameters: {
            recurrence: 6,
            dirtLevel: 7,
            pets: 3,
            kitchen: 0,
            seasonal: 5
        },
        auditLog: [
            { date: '2025-03-01 13:15', action: 'Grey Line Applied', user: 'Jane Supervisor', amount: 72 },
            { date: '2025-02-28 11:20', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 15,
    invoiceNumber: 'INV-2025-03335',
    date: '2025-03-01',
    client: 'Karen Wilson',
    serviceType: 'Residential',
    recurrence: 'Weekly',
    subtotal: 295,
    greyLine: 0,
    total: 333.35,
    threshold: 0,
    greyLineStatus: 'not-applied',
    invoiceStatus: 'draft',
    items: [
        { description: 'Standard Cleaning — 2 Bedrooms', amount: 180 },
        { description: 'Add-on: Kitchen Organization', amount: 80 },
        { description: 'Eco-friendly Products', amount: 35 }
    ],
    greyLineDetails: null
},
{
    id: 16,
    invoiceNumber: 'INV-2025-03336',
    date: '2025-02-28',
    client: 'Grand Hotel & Resort',
    serviceType: 'Commercial',
    recurrence: 'Weekly',
    subtotal: 5200,
    greyLine: 156,
    total: 6048.28,
    threshold: 0.11,
    greyLineStatus: 'applied',
    invoiceStatus: 'paid',
    items: [
        { description: 'Lobby & Reception Cleaning', amount: 1200 },
        { description: 'Guest Room Cleaning (50 rooms)', amount: 2500 },
        { description: 'Restaurant & Kitchen Deep Clean', amount: 1000 },
        { description: 'Pool Area Maintenance', amount: 500 }
    ],
    greyLineDetails: {
        appliedDate: '2025-02-27 09:45',
        appliedBy: 'John Manager',
        reasons: ['Hospitality industry standards', '24/7 operation', 'High guest expectations'],
        parameters: {
            recurrence: 9,
            dirtLevel: 6,
            pets: 0,
            kitchen: 8,
            seasonal: 6
        },
        auditLog: [
            { date: '2025-02-27 09:45', action: 'Grey Line Applied', user: 'John Manager', amount: 156 },
            { date: '2025-02-26 14:30', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 17,
    invoiceNumber: 'INV-2025-03337',
    date: '2025-02-27',
    client: 'Michael Chen',
    serviceType: 'Deep Clean',
    recurrence: 'One Time',
    subtotal: 750,
    greyLine: 60,
    total: 915.50,
    threshold: 0.21,
    greyLineStatus: 'applied',
    invoiceStatus: 'paid',
    items: [
        { description: 'Post-Construction Cleanup', amount: 500 },
        { description: 'Debris Removal & Disposal', amount: 150 },
        { description: 'Final Touch Cleaning', amount: 80 },
        { description: 'Air Duct Cleaning', amount: 20 }
    ],
    greyLineDetails: {
        appliedDate: '2025-02-26 16:20',
        appliedBy: 'Jane Supervisor',
        reasons: ['Construction dust cleanup', 'Heavy debris removal', 'Specialized equipment needed'],
        parameters: {
            recurrence: 2,
            dirtLevel: 9,
            pets: 0,
            kitchen: 2,
            seasonal: 0
        },
        auditLog: [
            { date: '2025-02-26 16:20', action: 'Grey Line Applied', user: 'Jane Supervisor', amount: 60 },
            { date: '2025-02-25 12:45', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 18,
    invoiceNumber: 'INV-2025-03338',
    date: '2025-02-26',
    client: 'Pet Paradise Center',
    serviceType: 'Commercial',
    recurrence: 'Weekly',
    subtotal: 890,
    greyLine: 35,
    total: 1045.95,
    threshold: 0.13,
    greyLineStatus: 'applied',
    invoiceStatus: 'pending',
    items: [
        { description: 'Kennel Cleaning & Sanitization', amount: 500 },
        { description: 'Play Area Maintenance', amount: 250 },
        { description: 'Odor Control Treatment', amount: 100 },
        { description: 'Waiting Area Cleaning', amount: 40 }
    ],
    greyLineDetails: {
        appliedDate: '2025-02-25 10:30',
        appliedBy: 'John Manager',
        reasons: ['Animal facility standards', 'High sanitation requirements', 'Odor control needs'],
        parameters: {
            recurrence: 7,
            dirtLevel: 8,
            pets: 9,
            kitchen: 0,
            seasonal: 4
        },
        auditLog: [
            { date: '2025-02-25 10:30', action: 'Grey Line Applied', user: 'John Manager', amount: 35 },
            { date: '2025-02-24 15:20', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 19,
    invoiceNumber: 'INV-2025-03339',
    date: '2025-02-25',
    client: 'Sophia Martinez',
    serviceType: 'Residential',
    recurrence: 'Bi-Weekly',
    subtotal: 410,
    greyLine: 28,
    total: 494.94,
    threshold: 0.14,
    greyLineStatus: 'applied',
    invoiceStatus: 'paid',
    items: [
        { description: 'Standard Cleaning — 4 Rooms', amount: 280 },
        { description: 'Add-on: Bathroom Deep Scrub', amount: 80 },
        { description: 'Add-on: Closet Organization', amount: 40 },
        { description: 'Eco-friendly Products', amount: 10 }
    ],
    greyLineDetails: {
        appliedDate: '2025-02-24 14:45',
        appliedBy: 'Jane Supervisor',
        reasons: ['Allergy-sensitive client', 'High-maintenance surfaces', 'Special product requests'],
        parameters: {
            recurrence: 3,
            dirtLevel: 4,
            pets: 4,
            kitchen: 3,
            seasonal: 2
        },
        auditLog: [
            { date: '2025-02-24 14:45', action: 'Grey Line Applied', user: 'Jane Supervisor', amount: 28 },
            { date: '2025-02-23 11:30', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
},
{
    id: 20,
    invoiceNumber: 'INV-2025-03340',
    date: '2025-02-24',
    client: 'Fitness First Gym',
    serviceType: 'Commercial',
    recurrence: 'Daily',
    subtotal: 3200,
    greyLine: 96,
    total: 3724.48,
    threshold: 0.10,
    greyLineStatus: 'applied',
    invoiceStatus: 'paid',
    items: [
        { description: 'Gym Equipment Sanitization', amount: 1800 },
        { description: 'Locker Room Cleaning', amount: 800 },
        { description: 'Pool & Sauna Maintenance', amount: 400 },
        { description: 'Reception Area', amount: 200 }
    ],
    greyLineDetails: {
        appliedDate: '2025-02-23 08:15',
        appliedBy: 'John Manager',
        reasons: ['High-frequency service', 'Health code requirements', 'Equipment maintenance'],
        parameters: {
            recurrence: 10,
            dirtLevel: 7,
            pets: 0,
            kitchen: 0,
            seasonal: 3
        },
        auditLog: [
            { date: '2025-02-23 08:15', action: 'Grey Line Applied', user: 'John Manager', amount: 96 },
            { date: '2025-02-22 16:45', action: 'Invoice Created', user: 'System', amount: 0 }
        ]
    }
}
        // ... (keep all your existing invoice data)
    ],

    // State Management
    filteredInvoices: [],
    selectedInvoices: new Set(),
    currentPage: 1,
    invoicesPerPage: 10,
    currentInvoiceDetails: null,
    activeTab: 'details',
    
    // NEW: Grey Line Configuration Settings with editable categories
    greyLineConfig: {
        // Configurable categories
        categories: [
            {
                id: 'recurrence-intensity',
                name: 'Recurrence Intensity',
                factors: [
                    { id: 'recurrenceIntensity', name: 'Recurrence Level', value: 4, min: 0, max: 10, step: 1 },
                    { id: 'clientType', name: 'Client Type Modifier', value: 2, min: 0, max: 5, step: 1 },
                    { id: 'clientHistory', name: 'Client History', value: 1, min: 0, max: 3, step: 1 }
                ]
            },
            {
                id: 'site-assessment',
                name: 'Site Assessment',
                factors: [
                    { id: 'dirtLevel', name: 'Dirt Level', value: 5, min: 0, max: 10, step: 1 },
                    { id: 'pets', name: 'Pets in Home', value: 5, min: 0, max: 10, step: 1 },
                    { id: 'kitchen', name: 'Kitchen Severity', value: 3, min: 0, max: 8, step: 1 }
                ]
            },
            {
                id: 'special-conditions',
                name: 'Special Conditions',
                factors: [
                    { id: 'seasonal', name: 'Seasonal Dirt', value: 4, min: 0, max: 8, step: 1 },
                    { id: 'taskExpansion', name: 'Task Expansion', value: 3, min: 0, max: 6, step: 1 },
                    { id: 'navigation', name: 'Navigation Time', value: 2, min: 0, max: 4, step: 1 }
                ]
            }
        ],
        
        // User-defined custom categories
        customCategories: [],
        
        // Threshold Configuration (0.10 to 0.30)
        thresholdGreen: { min: 0.10, max: 0.11 },
        thresholdBlue: { min: 0.11, max: 0.14 },
        thresholdYellow: { min: 0.15, max: 0.16 },
        thresholdRed: { min: 0.17, max: 0.20 },
        thresholdPurple: { min: 0.21, max: 0.30 },
        
        // Real-time Threshold
        currentThreshold: 0.14,
        
        // NEW: Lock threshold option
        lockThreshold: false,
        lockedThresholdValue: 0.07
    },

    // Initialize
    init: function() {
        this.filteredInvoices = [...this.allInvoices];
        this.updateStats();
        this.populateInvoiceTable();
        this.setupPagination();
        this.hideExportPanel();
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Close floating window when clicking overlay
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('floating-overlay')) {
                this.closeFloatingWindow();
            }
        });
    },

    // Update statistics
    updateStats: function() {
        const totalInvoices = this.allInvoices.length;
        const greyLineInvoices = this.allInvoices.filter(inv => inv.greyLineStatus === 'applied').length;
        const totalRevenue = this.allInvoices.reduce((sum, inv) => sum + inv.total, 0);
        const totalGreyLine = this.allInvoices.reduce((sum, inv) => sum + inv.greyLine, 0);
        const greyLineRevenue = this.allInvoices.reduce((sum, inv) => sum + (inv.greyLine || 0), 0);

        document.getElementById('gl-total-invoices').textContent = totalInvoices;
        document.getElementById('gl-greyline-invoices').textContent = greyLineInvoices;
        document.getElementById('gl-total-revenue').textContent = `$${totalRevenue.toFixed(0)}`;
        document.getElementById('gl-total-greyline').textContent = `+${totalGreyLine}`;
        document.getElementById('gl-greyline-revenue').textContent = `$${greyLineRevenue.toFixed(0)}`;
    },

    // Get threshold color and label
    getThresholdInfo: function(threshold) {
        if (threshold === 0) return { color: '#e2e8f0', label: 'N/A', class: 'none' };
        
        if (threshold >= this.greyLineConfig.thresholdGreen.min && threshold <= this.greyLineConfig.thresholdGreen.max) 
            return { color: 'var(--gl-threshold-green)', label: 'Green', class: 'green' };
        if (threshold > this.greyLineConfig.thresholdBlue.min && threshold <= this.greyLineConfig.thresholdBlue.max) 
            return { color: 'var(--gl-threshold-blue)', label: 'Blue', class: 'blue' };
        if (threshold > this.greyLineConfig.thresholdYellow.min && threshold <= this.greyLineConfig.thresholdYellow.max) 
            return { color: 'var(--gl-threshold-yellow)', label: 'Yellow', class: 'yellow' };
        if (threshold > this.greyLineConfig.thresholdRed.min && threshold <= this.greyLineConfig.thresholdRed.max) 
            return { color: 'var(--gl-threshold-red)', label: 'Red', class: 'red' };
        if (threshold > this.greyLineConfig.thresholdPurple.min && threshold <= this.greyLineConfig.thresholdPurple.max) 
            return { color: 'var(--gl-threshold-purple)', label: 'Purple', class: 'purple' };
        
        return { color: '#e2e8f0', label: 'N/A', class: 'none' };
    },

    // Get status badge
    getStatusBadge: function(status) {
        switch(status) {
            case 'paid': return '<span class="status-badge status-paid"><i class="fas fa-check-circle"></i> Paid</span>';
            case 'pending': return '<span class="status-badge status-pending"><i class="fas fa-clock"></i> Pending</span>';
            case 'overdue': return '<span class="status-badge status-overdue"><i class="fas fa-exclamation-circle"></i> Overdue</span>';
            case 'draft': return '<span class="status-badge status-draft"><i class="fas fa-edit"></i> Draft</span>';
            default: return '<span class="status-badge status-draft">Unknown</span>';
        }
    },

    // Get Grey Line status badge
    getGreyLineStatusBadge: function(status) {
        if (status === 'applied') {
            return '<span class="status-badge status-applied"><i class="fas fa-chart-line"></i> Applied</span>';
        } else {
            return '<span class="status-badge status-not-applied"><i class="fas fa-minus"></i> Not Applied</span>';
        }
    },

    // Filter invoices based on criteria
    filterInvoices: function() {
        const searchTerm = document.getElementById('gl-search-input').value.toLowerCase();
        const dateRange = document.getElementById('gl-date-range').value;
        const greyLineFilter = document.getElementById('gl-greyline-filter').value;
        const statusFilter = document.getElementById('gl-status-filter').value;
        const serviceFilter = document.getElementById('gl-service-filter').value;
        const thresholdFilter = document.getElementById('gl-threshold-filter').value;
        const recurrenceFilter = document.getElementById('gl-recurrence-filter').value;
        const sortBy = document.getElementById('gl-sort-by').value;

        // Apply filters
        this.filteredInvoices = this.allInvoices.filter(invoice => {
            // Search filter
            if (searchTerm && !(
                invoice.invoiceNumber.toLowerCase().includes(searchTerm) ||
                invoice.client.toLowerCase().includes(searchTerm)
            )) return false;

            // Date range filter
            if (dateRange !== 'all') {
                const invoiceDate = new Date(invoice.date);
                const today = new Date();
                const diffDays = Math.floor((today - invoiceDate) / (1000 * 60 * 60 * 24));
                
                switch(dateRange) {
                    case 'today':
                        if (diffDays !== 0) return false;
                        break;
                    case 'week':
                        if (diffDays > 7) return false;
                        break;
                    case 'month':
                        if (diffDays > 30) return false;
                        break;
                    case 'quarter':
                        if (diffDays > 90) return false;
                        break;
                    case 'year':
                        if (diffDays > 365) return false;
                        break;
                }
            }

            // Grey Line filter
            if (greyLineFilter !== 'all' && invoice.greyLineStatus !== greyLineFilter) {
                return false;
            }

            // Invoice status filter
            if (statusFilter !== 'all' && invoice.invoiceStatus !== statusFilter) {
                return false;
            }

            // Service type filter
            if (serviceFilter !== 'all' && !invoice.serviceType.toLowerCase().includes(serviceFilter.toLowerCase())) {
                return false;
            }

            // Threshold filter
            if (thresholdFilter !== 'all') {
                const thresholdInfo = this.getThresholdInfo(invoice.threshold);
                if (thresholdInfo.class !== thresholdFilter) {
                    return false;
                }
            }

            // Recurrence filter
            if (recurrenceFilter !== 'all' && invoice.recurrence.toLowerCase().replace('-', ' ') !== recurrenceFilter.toLowerCase().replace('-', ' ')) {
                return false;
            }

            return true;
        });

        // Sort invoices
        this.filteredInvoices.sort((a, b) => {
            switch(sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'amount-desc':
                    return b.total - a.total;
                case 'amount-asc':
                    return a.total - b.total;
                case 'greyline-desc':
                    return b.greyLine - a.greyLine;
                case 'greyline-asc':
                    return a.greyLine - b.greyLine;
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        this.currentPage = 1;
        this.populateInvoiceTable();
        this.setupPagination();
    },

    // Reset all filters
    resetFilters: function() {
        document.getElementById('gl-search-input').value = '';
        document.getElementById('gl-date-range').value = 'month';
        document.getElementById('gl-greyline-filter').value = 'all';
        document.getElementById('gl-status-filter').value = 'all';
        document.getElementById('gl-service-filter').value = 'all';
        document.getElementById('gl-threshold-filter').value = 'all';
        document.getElementById('gl-recurrence-filter').value = 'all';
        document.getElementById('gl-sort-by').value = 'date-desc';
        
        this.filterInvoices();
    },

    // Populate invoice table
    populateInvoiceTable: function() {
        const tableBody = document.getElementById('gl-invoice-table-body');
        tableBody.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.invoicesPerPage;
        const endIndex = startIndex + this.invoicesPerPage;
        const pageInvoices = this.filteredInvoices.slice(startIndex, endIndex);

        pageInvoices.forEach(invoice => {
            const thresholdInfo = this.getThresholdInfo(invoice.threshold);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <input type="checkbox" class="invoice-checkbox" value="${invoice.id}" 
                           onchange="greylineInvoiceApp.toggleInvoiceSelection(${invoice.id})" 
                           ${this.selectedInvoices.has(invoice.id) ? 'checked' : ''}>
                </td>
                <td><strong>${invoice.invoiceNumber}</strong></td>
                <td>${this.formatDate(invoice.date)}</td>
                <td>${invoice.client}</td>
                <td>${invoice.serviceType}</td>
                <td>${invoice.recurrence}</td>
                <td class="amount-cell">$${invoice.subtotal.toFixed(2)}</td>
                <td class="grey-line-cell">${invoice.greyLine > 0 ? `+$${invoice.greyLine.toFixed(2)}` : '-'}</td>
                <td class="amount-cell">$${invoice.total.toFixed(2)}</td>
                <td>
                    <span class="threshold-indicator" style="background: ${thresholdInfo.color};"></span>
                    <span>${thresholdInfo.label}</span>
                </td>
                <td>${this.getGreyLineStatusBadge(invoice.greyLineStatus)}</td>
                <td>${this.getStatusBadge(invoice.invoiceStatus)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="greylineInvoiceApp.viewInvoiceDetails(${invoice.id})" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="greylineInvoiceApp.editInvoice(${invoice.id})" title="Edit Invoice">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="greylineInvoiceApp.applyGreyLineToInvoice(${invoice.id})" title="Apply Grey Line" ${invoice.greyLineStatus === 'applied' ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                            <i class="fas fa-chart-line"></i>
                        </button>
                        <button class="action-btn" onclick="greylineInvoiceApp.deleteInvoice(${invoice.id})" title="Delete Invoice">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    },

    // Format date
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    },

    // Setup pagination
    setupPagination: function() {
        const totalPages = Math.ceil(this.filteredInvoices.length / this.invoicesPerPage);
        const pageNumbers = document.getElementById('gl-page-numbers');
        pageNumbers.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => {
                this.currentPage = i;
                this.populateInvoiceTable();
                this.setupPagination();
            };
            pageNumbers.appendChild(pageBtn);
        }

        // Update navigation buttons
        document.getElementById('gl-first-page').disabled = this.currentPage === 1;
        document.getElementById('gl-prev-page').disabled = this.currentPage === 1;
        document.getElementById('gl-next-page').disabled = this.currentPage === totalPages;
        document.getElementById('gl-last-page').disabled = this.currentPage === totalPages;
    },

    // Change page
    changePage: function(direction) {
        const totalPages = Math.ceil(this.filteredInvoices.length / this.invoicesPerPage);
        
        switch(direction) {
            case 'first':
                this.currentPage = 1;
                break;
            case 'prev':
                if (this.currentPage > 1) this.currentPage--;
                break;
            case 'next':
                if (this.currentPage < totalPages) this.currentPage++;
                break;
            case 'last':
                this.currentPage = totalPages;
                break;
        }
        
        this.populateInvoiceTable();
        this.setupPagination();
    },

    // Toggle invoice selection
    toggleInvoiceSelection: function(invoiceId) {
        if (this.selectedInvoices.has(invoiceId)) {
            this.selectedInvoices.delete(invoiceId);
        } else {
            this.selectedInvoices.add(invoiceId);
        }
    },

    // Select all invoices
    selectAllInvoices: function() {
        const selectAll = document.getElementById('gl-select-all-invoices');
        const checkboxes = document.querySelectorAll('#greyline-invoice-app .invoice-checkbox');
        
        if (selectAll.checked) {
            const startIndex = (this.currentPage - 1) * this.invoicesPerPage;
            const endIndex = startIndex + this.invoicesPerPage;
            const pageInvoices = this.filteredInvoices.slice(startIndex, endIndex);
            
            pageInvoices.forEach(invoice => this.selectedInvoices.add(invoice.id));
            checkboxes.forEach(cb => cb.checked = true);
        } else {
            this.selectedInvoices.clear();
            checkboxes.forEach(cb => cb.checked = false);
        }
    },

    // View invoice details in floating window with tabs
    viewInvoiceDetails: function(invoiceId) {
        const invoice = this.allInvoices.find(inv => inv.id === invoiceId);
        if (!invoice) return;
        
        this.currentInvoiceDetails = invoice;
        
        // Set header info
        document.querySelector('#greyline-invoice-app .floating-title h2').textContent = invoice.invoiceNumber;
        document.querySelector('#greyline-invoice-app .floating-title p').textContent = 
            `${invoice.client} • ${invoice.serviceType} • ${this.formatDate(invoice.date)}`;
        
        // Clear previous tab content
        this.clearTabContent();
        
        // Populate all tabs
        this.populateDetailsTab(invoice);
        this.populateGreyLineConfigTab(invoice);
        this.populateThresholdCalculatorTab(invoice);
        this.populateGenerateReasoningTab(invoice);
        this.populateBeforeAfterTab(invoice);
        
        // Activate first tab
        this.switchTab('details');
        
        // Show floating window
        document.querySelector('#greyline-invoice-app .floating-overlay').style.display = 'block';
        document.querySelector('#greyline-invoice-app .floating-window').style.display = 'block';
    },

    // Clear all tab content
    clearTabContent: function() {
        const tabContents = document.querySelectorAll('#greyline-invoice-app .tab-content');
        tabContents.forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });
        
        // Reset active tab button
        const tabButtons = document.querySelectorAll('#greyline-invoice-app .tab-btn');
        tabButtons.forEach(btn => btn.classList.remove('active'));
    },

    // Switch between tabs
    switchTab: function(tabName) {
        this.activeTab = tabName;
        
        // Update tab buttons
        const tabButtons = document.querySelectorAll('#greyline-invoice-app .tab-btn');
        tabButtons.forEach(btn => {
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show selected tab content
        const tabContents = document.querySelectorAll('#greyline-invoice-app .tab-content');
        tabContents.forEach(tab => {
            if (tab.id === `${tabName}Tab`) {
                tab.style.display = 'block';
                tab.classList.add('active');
            } else {
                tab.style.display = 'none';
                tab.classList.remove('active');
            }
        });
    },

    // Populate Details Tab
    populateDetailsTab: function(invoice) {
        const tabContent = document.getElementById('detailsTab');
        let detailsHtml = `
            <div class="details-grid">
                <div class="detail-group">
                    <h4><i class="fas fa-file-invoice"></i> Invoice Information</h4>
                    <div class="detail-row">
                        <span class="detail-label">Invoice Number:</span>
                        <span class="detail-value">${invoice.invoiceNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">${this.formatDate(invoice.date)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Client:</span>
                        <span class="detail-value">${invoice.client}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Service Type:</span>
                        <span class="detail-value">${invoice.serviceType}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Recurrence:</span>
                        <span class="detail-value">${invoice.recurrence}</span>
                    </div>
                </div>
                
                <div class="detail-group">
                    <h4><i class="fas fa-dollar-sign"></i> Financial Details</h4>
                    <div class="detail-row">
                        <span class="detail-label">Subtotal:</span>
                        <span class="detail-value">$${invoice.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Grey Line Amount:</span>
                        <span class="detail-value">${invoice.greyLine > 0 ? `+$${invoice.greyLine.toFixed(2)}` : 'Not Applied'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Total Amount:</span>
                        <span class="detail-value">$${invoice.total.toFixed(2)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Threshold Level:</span>
                        <span class="detail-value">${invoice.threshold > 0 ? invoice.threshold.toFixed(2) : 'N/A'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Invoice Status:</span>
                        <span class="detail-value">${this.getStatusBadge(invoice.invoiceStatus).replace(/<[^>]*>/g, '')}</span>
                    </div>
                </div>
        `;
        
        if (invoice.greyLineDetails) {
            detailsHtml += `
                <div class="detail-group">
                    <h4><i class="fas fa-chart-line"></i> Grey Line Application</h4>
                    <div class="detail-row">
                        <span class="detail-label">Applied Date:</span>
                        <span class="detail-value">${invoice.greyLineDetails.appliedDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Applied By:</span>
                        <span class="detail-value">${invoice.greyLineDetails.appliedBy}</span>
                    </div>
                </div>
                
                <div class="detail-group">
                    <h4><i class="fas fa-history"></i> Audit Log</h4>
                    ${invoice.greyLineDetails.auditLog.map(log => `
                        <div class="detail-row" style="border-bottom: none; padding-bottom: 5px;">
                            <div style="display: flex; justify-content: space-between; width: 100%;">
                                <span class="detail-label">${log.date}</span>
                                <span class="detail-value">${log.action}</span>
                            </div>
                            <div style="font-size: 12px; color: var(--gl-text-secondary); margin-top: 2px;">
                                <i class="fas fa-user"></i> ${log.user} ${log.amount > 0 ? `• +$${log.amount}` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        detailsHtml += `</div>`;
        tabContent.innerHTML = detailsHtml;
    },

    // Populate Grey Line Configuration Tab - UPDATED with editable categories
    populateGreyLineConfigTab: function(invoice) {
        const tabContent = document.getElementById('configTab');
        
        // Build categories HTML
        let categoriesHtml = '';
        
        // Built-in categories
        this.greyLineConfig.categories.forEach(category => {
            categoriesHtml += this.buildCategoryHtml(category);
        });
        
        // Custom categories
        this.greyLineConfig.customCategories.forEach(category => {
            categoriesHtml += this.buildCategoryHtml(category, true);
        });
        
        const configHtml = `
            <div class="config-controls">
                <!-- Threshold Lock Option -->
                <div style="margin-bottom: 25px; padding: 15px; background: var(--gl-primary-light); border-radius: var(--gl-radius-sm); border: 2px solid var(--gl-border);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                        <div>
                            <h4 style="color: var(--gl-primary); margin: 0;"><i class="fas fa-lock"></i> Threshold Lock</h4>
                            <p style="font-size: 12px; color: var(--gl-text-secondary); margin-top: 5px;">
                                Lock threshold to specific value while adjusting minutes
                            </p>
                        </div>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" id="thresholdLockToggle" ${this.greyLineConfig.lockThreshold ? 'checked' : ''} 
                                   onchange="greylineInvoiceApp.toggleThresholdLock()">
                            <span style="font-weight: 600; color: var(--gl-primary);">Lock Threshold</span>
                        </label>
                    </div>
                    
                    <div id="thresholdLockControls" style="${this.greyLineConfig.lockThreshold ? '' : 'display: none;'}">
                        <div class="control-item">
                            <div class="control-label">
                                <span>Locked Threshold Value:</span>
                                <span id="lockedThresholdDisplay">${this.greyLineConfig.lockedThresholdValue.toFixed(2)}</span>
                            </div>
                            <input type="range" min="7" max="30" value="${this.greyLineConfig.lockedThresholdValue * 100}" 
                                   class="control-slider" id="lockedThresholdSlider" 
                                   onchange="greylineInvoiceApp.updateLockedThreshold(this.value)">
                            <div style="font-size: 12px; color: var(--gl-text-secondary); margin-top: 5px;">
                                When locked, minutes will adjust automatically to maintain this threshold
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Configuration Categories -->
                ${categoriesHtml}
                
                <!-- Add New Category Button -->
                <div style="text-align: center; margin: 25px 0;">
                    <button class="btn btn-outline" onclick="greylineInvoiceApp.addNewCategory()">
                        <i class="fas fa-plus"></i> Add New Configuration Category
                    </button>
                </div>
            </div>
            
            <!-- Threshold Visualization -->
            <div class="threshold-visualization">
                <h4><i class="fas fa-layer-group"></i> Real-time Threshold Visualization</h4>
                <div class="threshold-scale">
                    <div class="threshold-segment" style="background: var(--gl-threshold-green);" title="Green: 0.10-0.11">
                        Green (0.10-0.11)
                    </div>
                    <div class="threshold-segment" style="background: var(--gl-threshold-blue);" title="Blue: 0.11-0.14">
                        Blue (0.11-0.14)
                    </div>
                    <div class="threshold-segment" style="background: var(--gl-threshold-yellow);" title="Yellow: 0.15-0.16">
                        Yellow (0.15-0.16)
                    </div>
                    <div class="threshold-segment" style="background: var(--gl-threshold-red);" title="Red: 0.17-0.20">
                        Red (0.17-0.20)
                    </div>
                    <div class="threshold-segment" style="background: var(--gl-threshold-purple);" title="Purple: 0.21-0.30">
                        Purple (0.21-0.30)
                    </div>
                </div>
                
                <div id="currentThresholdDisplay" style="text-align: center; margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: var(--gl-radius-sm);">
                    <p>Current Threshold Level:</p>
                    <div id="thresholdBadge" class="current-threshold-badge" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-top: 5px;">
                        <!-- Will be populated by JavaScript -->
                    </div>
                    <p style="font-size: 12px; color: var(--gl-text-secondary); margin-top: 10px;">
                        Total Grey Line Minutes: <strong id="totalGreyLineMinutes">0 minutes</strong><br>
                        Threshold Value: <strong id="thresholdValueDisplay">0.00</strong>
                    </p>
                </div>
            </div>
            
            <div class="action-buttons" style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="greylineInvoiceApp.applyConfigToInvoice()">
                    <i class="fas fa-check-circle"></i> Apply Configuration to Invoice
                </button>
                <button class="btn btn-outline" onclick="greylineInvoiceApp.saveConfigPreset()">
                    <i class="fas fa-save"></i> Save as Preset
                </button>
            </div>
        `;
        
        tabContent.innerHTML = configHtml;
        this.updateThresholdDisplay();
    },

    // Build category HTML
    buildCategoryHtml: function(category, isCustom = false) {
        let categoryHtml = `
            <div class="config-group" id="category-${category.id}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4><i class="fas fa-${isCustom ? 'plus-circle' : 'folder'}"></i> ${category.name}</h4>
                    ${isCustom ? `
                        <div style="display: flex; gap: 8px;">
                            <button class="action-btn" onclick="greylineInvoiceApp.editCategory('${category.id}')" title="Edit Category">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn" onclick="greylineInvoiceApp.deleteCategory('${category.id}')" title="Delete Category">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
        `;
        
        category.factors.forEach(factor => {
            categoryHtml += `
                <div class="control-item">
                    <div class="control-label">
                        <span>${factor.name}</span>
                        <span id="${factor.id}ValueDisplay">+${factor.value} min</span>
                    </div>
                    <input type="range" min="${factor.min}" max="${factor.max}" step="${factor.step}" 
                           value="${factor.value}" class="control-slider" id="${factor.id}Slider" 
                           onchange="greylineInvoiceApp.updateConfigValue('${factor.id}', this.value, '${category.id}')">
                </div>
            `;
        });
        
        // Add factor button for custom categories
        if (isCustom) {
            categoryHtml += `
                <div style="margin-top: 15px;">
                    <button class="btn btn-outline" style="padding: 8px 12px; font-size: 12px;" 
                            onclick="greylineInvoiceApp.addFactorToCategory('${category.id}')">
                        <i class="fas fa-plus"></i> Add Factor
                    </button>
                </div>
            `;
        }
        
        categoryHtml += `</div>`;
        return categoryHtml;
    },

    // Update configuration value
    updateConfigValue: function(factorId, value, categoryId = null) {
        // Find the factor in categories
        let factorFound = false;
        
        // Search in built-in categories
        for (const category of this.greyLineConfig.categories) {
            const factor = category.factors.find(f => f.id === factorId);
            if (factor) {
                factor.value = parseInt(value);
                factorFound = true;
                break;
            }
        }
        
        // Search in custom categories if not found
        if (!factorFound && categoryId) {
            const category = this.greyLineConfig.customCategories.find(c => c.id === categoryId);
            if (category) {
                const factor = category.factors.find(f => f.id === factorId);
                if (factor) {
                    factor.value = parseInt(value);
                    factorFound = true;
                }
            }
        }
        
        if (factorFound) {
            // Update display
            const displayElement = document.getElementById(`${factorId}ValueDisplay`);
            if (displayElement) {
                displayElement.textContent = `+${value} min`;
            }
            
            // If threshold is locked, adjust other factors
            if (this.greyLineConfig.lockThreshold) {
                this.adjustForLockedThreshold();
            } else {
                this.updateThresholdDisplay();
            }
        }
    },

    // Toggle threshold lock
    toggleThresholdLock: function() {
        this.greyLineConfig.lockThreshold = !this.greyLineConfig.lockThreshold;
        
        const controls = document.getElementById('thresholdLockControls');
        if (controls) {
            controls.style.display = this.greyLineConfig.lockThreshold ? 'block' : 'none';
        }
        
        if (this.greyLineConfig.lockThreshold) {
            this.adjustForLockedThreshold();
        } else {
            this.updateThresholdDisplay();
        }
        
        this.showNotification(`Threshold lock ${this.greyLineConfig.lockThreshold ? 'enabled' : 'disabled'}`, 'info');
    },

    // Update locked threshold
    updateLockedThreshold: function(value) {
        const threshold = value / 100;
        this.greyLineConfig.lockedThresholdValue = threshold;
        
        const displayElement = document.getElementById('lockedThresholdDisplay');
        if (displayElement) {
            displayElement.textContent = threshold.toFixed(2);
        }
        
        // Recalculate if lock is enabled
        if (this.greyLineConfig.lockThreshold) {
            this.adjustForLockedThreshold();
        }
    },

    // Adjust factors for locked threshold
    adjustForLockedThreshold: function() {
        const invoice = this.currentInvoiceDetails;
        if (!invoice) return;
        
        // Calculate target total minutes based on locked threshold
        const targetTotalMinutes = Math.round(invoice.subtotal * this.greyLineConfig.lockedThresholdValue);
        
        // Get current total minutes
        const currentTotalMinutes = this.getTotalConfigMinutes();
        
        // Calculate adjustment ratio
        const adjustmentRatio = targetTotalMinutes / currentTotalMinutes;
        
        // Apply adjustment to all factors
        const allCategories = [...this.greyLineConfig.categories, ...this.greyLineConfig.customCategories];
        
        allCategories.forEach(category => {
            category.factors.forEach(factor => {
                const newValue = Math.round(factor.value * adjustmentRatio);
                factor.value = Math.max(factor.min, Math.min(factor.max, newValue));
                
                // Update slider and display
                const slider = document.getElementById(`${factor.id}Slider`);
                const display = document.getElementById(`${factor.id}ValueDisplay`);
                
                if (slider) slider.value = factor.value;
                if (display) display.textContent = `+${factor.value} min`;
            });
        });
        
        this.updateThresholdDisplay();
    },

    // Get total minutes from config
    getTotalConfigMinutes: function() {
        const allCategories = [...this.greyLineConfig.categories, ...this.greyLineConfig.customCategories];
        return allCategories.reduce((total, category) => {
            return total + category.factors.reduce((catTotal, factor) => catTotal + factor.value, 0);
        }, 0);
    },

    // Update threshold display
    updateThresholdDisplay: function() {
        const invoice = this.currentInvoiceDetails;
        if (!invoice) return;
        
        // Calculate total grey line minutes
        const totalMinutes = this.getTotalConfigMinutes();
        
        // Calculate threshold value
        const thresholdValue = totalMinutes / invoice.subtotal;
        
        const thresholdInfo = this.getThresholdInfo(thresholdValue);
        
        // Update display
        document.getElementById('totalGreyLineMinutes').textContent = `${totalMinutes} minutes`;
        document.getElementById('thresholdValueDisplay').textContent = thresholdValue.toFixed(2);
        
        const badge = document.getElementById('thresholdBadge');
        if (badge) {
            badge.style.background = thresholdInfo.color;
            badge.innerHTML = `
                <i class="fas fa-circle"></i>
                ${thresholdInfo.label} (${thresholdValue.toFixed(2)})
            `;
        }
        
        // Update config
        this.greyLineConfig.currentThreshold = thresholdValue;
        
        // Update before/after tab if it's active
        if (this.activeTab === 'comparison') {
            this.populateBeforeAfterTab(invoice);
        }
    },

    // Add new category
    addNewCategory: function() {
        const categoryId = 'custom-' + Date.now();
        const newCategory = {
            id: categoryId,
            name: 'New Category',
            factors: [
                { id: 'newFactor1', name: 'New Factor 1', value: 2, min: 0, max: 10, step: 1 }
            ]
        };
        
        this.greyLineConfig.customCategories.push(newCategory);
        this.populateGreyLineConfigTab(this.currentInvoiceDetails);
        this.showNotification('New category added. Click edit to rename.', 'success');
    },

    // Edit category
    editCategory: function(categoryId) {
        const category = this.greyLineConfig.customCategories.find(c => c.id === categoryId);
        if (!category) return;
        
        const newName = prompt('Enter new category name:', category.name);
        if (newName && newName.trim()) {
            category.name = newName.trim();
            this.populateGreyLineConfigTab(this.currentInvoiceDetails);
            this.showNotification('Category renamed successfully', 'success');
        }
    },

    // Delete category
    deleteCategory: function(categoryId) {
        if (confirm('Are you sure you want to delete this category?')) {
            const index = this.greyLineConfig.customCategories.findIndex(c => c.id === categoryId);
            if (index !== -1) {
                this.greyLineConfig.customCategories.splice(index, 1);
                this.populateGreyLineConfigTab(this.currentInvoiceDetails);
                this.showNotification('Category deleted successfully', 'success');
            }
        }
    },

    // Add factor to category
    addFactorToCategory: function(categoryId) {
        const category = this.greyLineConfig.customCategories.find(c => c.id === categoryId);
        if (!category) return;
        
        const factorCount = category.factors.length + 1;
        const newFactor = {
            id: `factor-${categoryId}-${factorCount}`,
            name: `New Factor ${factorCount}`,
            value: 2,
            min: 0,
            max: 10,
            step: 1
        };
        
        category.factors.push(newFactor);
        this.populateGreyLineConfigTab(this.currentInvoiceDetails);
        this.showNotification('New factor added to category', 'success');
    },

    // Populate Threshold Calculator Tab - UPDATED with threshold range 10-30%
    populateThresholdCalculatorTab: function(invoice) {
        const tabContent = document.getElementById('calculatorTab');
        
        // Calculate threshold value from current config
        const totalMinutes = this.getTotalConfigMinutes();
        const currentThreshold = totalMinutes / invoice.subtotal;
        
        const calculatorHtml = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h3><i class="fas fa-calculator"></i> Threshold Calculator</h3>
                <p style="color: var(--gl-text-secondary);">Calculate optimal threshold for Grey Line application (10-30%)</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <div class="config-group">
                        <h4><i class="fas fa-sliders-h"></i> Calculator Inputs</h4>
                        <div class="control-item">
                            <div class="control-label">
                                <span>Invoice Subtotal:</span>
                                <span>$${invoice.subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <div class="control-item">
                            <div class="control-label">
                                <span>Desired Grey Line %:</span>
                                <span id="desiredPercentDisplay">${(currentThreshold * 100).toFixed(1)}%</span>
                            </div>
                            <input type="range" min="10" max="30" value="${(currentThreshold * 100).toFixed(0)}" 
                                   class="control-slider" id="desiredPercentSlider" 
                                   onchange="greylineInvoiceApp.updateDesiredPercent(this.value)">
                            <div style="font-size: 11px; color: var(--gl-text-secondary); margin-top: 5px; display: flex; justify-content: space-between;">
                                <span>10%</span>
                                <span>30%</span>
                            </div>
                        </div>
                        <div class="control-item">
                            <div class="control-label">
                                <span>Current Threshold:</span>
                                <span>${currentThreshold.toFixed(2)}</span>
                            </div>
                        </div>
                        <div class="control-item">
                            <div class="control-label">
                                <span>Threshold Level:</span>
                                <span id="currentThresholdLevelDisplay">${this.getThresholdInfo(currentThreshold).label}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="config-group">
                        <h4><i class="fas fa-chart-line"></i> Calculation Results</h4>
                        <div style="text-align: center; padding: 20px;">
                            <div style="font-size: 12px; color: var(--gl-text-secondary);">Recommended Grey Line</div>
                            <div style="font-size: 32px; font-weight: 700; color: var(--gl-primary); margin: 10px 0;" id="recommendedAmount">
                                +$${(invoice.subtotal * currentThreshold).toFixed(2)}
                            </div>
                            <div style="font-size: 14px; color: var(--gl-text-secondary); margin-bottom: 15px;">
                                <span id="recommendedMinutes">${Math.round(invoice.subtotal * currentThreshold)} minutes</span>
                            </div>
                            <div style="padding: 10px; background: var(--gl-primary-light); border-radius: var(--gl-radius-sm);">
                                <div style="font-size: 12px; color: var(--gl-text-secondary);">Threshold Visualization</div>
                                <div id="calculatorThresholdBadge" class="current-threshold-badge" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin-top: 5px; background: ${this.getThresholdInfo(currentThreshold).color}; color: white;">
                                    ${this.getThresholdInfo(currentThreshold).label} Level
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Presets -->
            <div style="margin-top: 30px;">
                <h4 style="margin-bottom: 15px;"><i class="fas fa-bolt"></i> Quick Presets</h4>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
                    <button class="btn btn-outline" onclick="greylineInvoiceApp.applyCalculatorPreset(0.10)" style="padding: 10px;">
                        Green (10%)
                    </button>
                    <button class="btn btn-outline" onclick="greylineInvoiceApp.applyCalculatorPreset(0.12)" style="padding: 10px;">
                        Blue (12%)
                    </button>
                    <button class="btn btn-outline" onclick="greylineInvoiceApp.applyCalculatorPreset(0.16)" style="padding: 10px;">
                        Yellow (16%)
                    </button>
                    <button class="btn btn-outline" onclick="greylineInvoiceApp.applyCalculatorPreset(0.19)" style="padding: 10px;">
                        Red (19%)
                    </button>
                    <button class="btn btn-outline" onclick="greylineInvoiceApp.applyCalculatorPreset(0.25)" style="padding: 10px;">
                        Purple (25%)
                    </button>
                </div>
            </div>
            
            <div class="action-buttons" style="margin-top: 30px;">
                <button class="btn btn-primary" onclick="greylineInvoiceApp.applyCalculatorToInvoice()">
                    <i class="fas fa-check-circle"></i> Apply Calculation to Config
                </button>
                <button class="btn btn-outline" onclick="greylineInvoiceApp.resetCalculator()">
                    <i class="fas fa-redo"></i> Reset to Current
                </button>
            </div>
        `;
        
        tabContent.innerHTML = calculatorHtml;
    },

    // Update desired percent in calculator
    updateDesiredPercent: function(percent) {
        const invoice = this.currentInvoiceDetails;
        if (!invoice) return;
        
        const threshold = percent / 100;
        const recommendedAmount = invoice.subtotal * threshold;
        const thresholdInfo = this.getThresholdInfo(threshold);
        
        document.getElementById('desiredPercentDisplay').textContent = `${percent}%`;
        document.getElementById('recommendedAmount').textContent = `+$${recommendedAmount.toFixed(2)}`;
        document.getElementById('recommendedMinutes').textContent = `${Math.round(recommendedAmount)} minutes`;
        document.getElementById('currentThresholdLevelDisplay').textContent = thresholdInfo.label;
        
        const badge = document.getElementById('calculatorThresholdBadge');
        if (badge) {
            badge.style.background = thresholdInfo.color;
            badge.textContent = `${thresholdInfo.label} Level`;
        }
    },

    // Apply calculator preset
    applyCalculatorPreset: function(presetThreshold) {
        const invoice = this.currentInvoiceDetails;
        if (!invoice) return;
        
        const percent = presetThreshold * 100;
        document.getElementById('desiredPercentSlider').value = percent;
        this.updateDesiredPercent(percent);
    },

    // Populate Generate Reasoning Tab
    populateGenerateReasoningTab: function(invoice) {
        const tabContent = document.getElementById('reasoningTab');
        
        // Available reasoning options
        const reasoningOptions = [
            { id: 'weekly_buildup', label: 'Weekly recurrence buildup', selected: invoice.recurrence === 'Weekly' },
            { id: 'monthly_dirt', label: 'Monthly dirt accumulation', selected: invoice.recurrence === 'Monthly' },
            { id: 'residential', label: 'Residential client patterns', selected: invoice.serviceType === 'Residential' },
            { id: 'commercial', label: 'Commercial foot traffic', selected: invoice.serviceType === 'Commercial' },
            { id: 'deep_clean', label: 'Deep clean requirements', selected: invoice.serviceType === 'Deep Clean' },
            { id: 'seasonal', label: 'Seasonal dirt variations', selected: true },
            { id: 'pets', label: 'Pets in household', selected: Math.random() > 0.5 },
            { id: 'kitchen', label: 'Kitchen grease buildup', selected: true },
            { id: 'bathroom', label: 'Bathroom mold/mildew', selected: Math.random() > 0.5 },
            { id: 'clutter', label: 'Extra clutter handling', selected: Math.random() > 0.5 },
            { id: 'stains', label: 'Stubborn stain treatment', selected: Math.random() > 0.3 },
            { id: 'navigation', label: 'Navigation and setup time', selected: true }
        ];
        
        const reasoningHtml = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h3><i class="fas fa-lightbulb"></i> Generate Reasoning for Grey Line</h3>
                <p style="color: var(--gl-text-secondary);">Select applicable reasons for Grey Line application</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h4 style="margin-bottom: 15px;"><i class="fas fa-list-check"></i> Select Reasons</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px;">
                    ${reasoningOptions.map(option => `
                        <div class="reason-option" onclick="greylineInvoiceApp.toggleReasonSelection('${option.id}')" 
                             id="reasonOption_${option.id}" style="padding: 15px; background: #f8f9fa; border-radius: var(--gl-radius-sm); border: 2px solid var(--gl-border); cursor: pointer; transition: all 0.3s ease;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="width: 20px; height: 20px; border: 2px solid var(--gl-border); border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                    ${option.selected ? '<i class="fas fa-check" style="color: var(--gl-primary); font-size: 12px;"></i>' : ''}
                                </div>
                                <span>${option.label}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Generated Reasoning Preview -->
            <div class="config-group">
                <h4><i class="fas fa-file-alt"></i> Generated Reasoning Preview</h4>
                <div id="reasoningPreview" style="padding: 20px; background: white; border-radius: var(--gl-radius-sm); border: 1px solid var(--gl-border); margin-top: 15px; min-height: 200px;">
                    <p style="color: var(--gl-text-secondary); font-style: italic;">Select reasons above to generate justification text...</p>
                </div>
            </div>
            
            <div class="action-buttons" style="margin-top: 30px;">
                <button class="btn btn-primary" onclick="greylineInvoiceApp.generateReasoning()">
                    <i class="fas fa-magic"></i> Generate Reasoning
                </button>
                <button class="btn btn-outline" onclick="greylineInvoiceApp.copyReasoning()">
                    <i class="fas fa-copy"></i> Copy to Clipboard
                </button>
                <button class="btn btn-outline" onclick="greylineInvoiceApp.saveReasoning()">
                    <i class="fas fa-save"></i> Save to Invoice
                </button>
            </div>
        `;
        
        tabContent.innerHTML = reasoningHtml;
    },

    // Toggle reason selection
    toggleReasonSelection: function(reasonId) {
        const optionElement = document.getElementById(`reasonOption_${reasonId}`);
        const checkbox = optionElement.querySelector('.fa-check');
        
        if (checkbox.style.display === 'none' || !checkbox.style.display) {
            checkbox.style.display = 'block';
            optionElement.style.borderColor = 'var(--gl-primary)';
            optionElement.style.background = 'var(--gl-primary-light)';
        } else {
            checkbox.style.display = 'none';
            optionElement.style.borderColor = 'var(--gl-border)';
            optionElement.style.background = '#f8f9fa';
        }
    },

    // Generate reasoning text
    generateReasoning: function() {
        const invoice = this.currentInvoiceDetails;
        if (!invoice) return;
        
        const totalMinutes = this.getTotalConfigMinutes();
        const threshold = this.greyLineConfig.currentThreshold;
        
        const reasoningText = `
            <h4 style="color: var(--gl-primary); margin-bottom: 10px;">Justification for +${totalMinutes} minutes (${(threshold * 100).toFixed(1)}% threshold):</h4>
            <p style="margin-bottom: 15px;">Based on comprehensive site assessment and client history analysis, the following factors justify the Grey Line adjustment:</p>
            <ul style="color: var(--gl-text-secondary); line-height: 1.8; margin-left: 20px;">
                <li><strong>Recurrence Intensity:</strong> ${invoice.recurrence} service pattern requiring additional preparation time</li>
                <li><strong>Site Assessment:</strong> Dirt level assessment indicates above-average cleaning requirements</li>
                <li><strong>Special Conditions:</strong> Seasonal variations and task complexity factors considered</li>
            </ul>
            <p style="margin-top: 15px; color: var(--gl-text-secondary); font-size: 12px;">
                <i class="fas fa-eye-slash"></i> Note: This reasoning is for internal records only. Client sees only rounded total time.
            </p>
        `;
        
        document.getElementById('reasoningPreview').innerHTML = reasoningText;
    },

    // Copy reasoning to clipboard
    copyReasoning: function() {
        const reasoningText = document.getElementById('reasoningPreview').innerText;
        navigator.clipboard.writeText(reasoningText)
            .then(() => this.showNotification('Reasoning copied to clipboard', 'success'))
            .catch(() => this.showNotification('Failed to copy reasoning', 'error'));
    },

    // Populate Before/After Comparison Tab - UPDATED with real-time calculations
    populateBeforeAfterTab: function(invoice) {
        const tabContent = document.getElementById('comparisonTab');
        
        // Calculate values based on current config
        const subtotal = invoice.subtotal;
        const totalMinutes = this.getTotalConfigMinutes();
        const greyLine = totalMinutes; // $1 per minute
        const threshold = this.greyLineConfig.currentThreshold;
        const taxRate = 0.13;
        
        const taxBefore = subtotal * taxRate;
        const totalBefore = subtotal + taxBefore;
        
        const subtotalAfter = subtotal + greyLine;
        const taxAfter = subtotalAfter * taxRate;
        const totalAfter = subtotalAfter + taxAfter;
        
        const thresholdInfo = this.getThresholdInfo(threshold);
        
        const comparisonHtml = `
            <div class="invoice-comparison">
                <div class="comparison-section">
                    <h3><i class="fas fa-file-invoice"></i> Before Grey Line</h3>
                    <p style="color: var(--gl-text-secondary); margin-bottom: 15px;">Original invoice without adjustments</p>
                    
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoice.items.map(item => `
                                <tr>
                                    <td>${item.description}</td>
                                    <td style="text-align: right;">$${item.amount.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                            <tr style="border-top: 2px solid var(--gl-border);">
                                <td><strong>Subtotal</strong></td>
                                <td style="text-align: right;"><strong>$${subtotal.toFixed(2)}</strong></td>
                            </tr>
                            <tr>
                                <td>Tax (13% HST)</td>
                                <td style="text-align: right;">$${taxBefore.toFixed(2)}</td>
                            </tr>
                            <tr class="total-row">
                                <td><strong>Total</strong></td>
                                <td style="text-align: right; color: var(--gl-primary);"><strong>$${totalBefore.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="comparison-section">
                    <h3><i class="fas fa-chart-line"></i> After Grey Line</h3>
                    <p style="color: var(--gl-text-secondary); margin-bottom: 15px;">With Grey Line adjustments applied</p>
                    
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoice.items.map(item => `
                                <tr>
                                    <td>${item.description}</td>
                                    <td style="text-align: right;">$${item.amount.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                            <tr style="border-top: 2px solid var(--gl-border);">
                                <td><strong>Subtotal</strong></td>
                                <td style="text-align: right;"><strong>$${subtotal.toFixed(2)}</strong></td>
                            </tr>
                            <tr class="grey-line-row">
                                <td><i class="fas fa-eye-slash"></i> Grey Line Adjustment</td>
                                <td style="text-align: right; color: var(--gl-primary); font-style: italic;">+$${greyLine.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Tax (13% HST)</td>
                                <td style="text-align: right;">$${taxAfter.toFixed(2)}</td>
                            </tr>
                            <tr class="total-row">
                                <td><strong>Client Sees</strong></td>
                                <td style="text-align: right; color: var(--gl-success);"><strong>$${totalAfter.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: var(--gl-primary-light); border-radius: var(--gl-radius-sm);">
                <h4 style="color: var(--gl-primary); margin-bottom: 10px;">Grey Line Impact Summary</h4>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 15px;">
                    <div>
                        <div style="font-size: 12px; color: var(--gl-text-secondary);">Grey Line Amount</div>
                        <div style="font-size: 18px; font-weight: 700; color: var(--gl-primary);">+$${greyLine.toFixed(2)}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gl-text-secondary);">Revenue Increase</div>
                        <div style="font-size: 18px; font-weight: 700; color: var(--gl-success);">+${((greyLine / subtotal) * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gl-text-secondary);">Threshold Level</div>
                        <div style="font-size: 18px; font-weight: 700; color: var(--gl-primary);">${threshold.toFixed(2)}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gl-text-secondary);">Threshold Color</div>
                        <div style="font-size: 18px; font-weight: 700; color: ${thresholdInfo.color};">${thresholdInfo.label}</div>
                    </div>
                </div>
            </div>
        `;
        
        tabContent.innerHTML = comparisonHtml;
    },

    // Close floating window
    closeFloatingWindow: function() {
        document.querySelector('#greyline-invoice-app .floating-overlay').style.display = 'none';
        document.querySelector('#greyline-invoice-app .floating-window').style.display = 'none';
        this.currentInvoiceDetails = null;
    },

    // Hide details panel
    hideDetails: function() {
        document.getElementById('gl-details-panel').style.display = 'none';
    },

    // Show export options
    showExportOptions: function() {
        if (this.selectedInvoices.size === 0) {
            this.showNotification('Please select invoices to export.', 'warning');
            return;
        }
        
        document.getElementById('gl-export-panel').style.display = 'block';
        document.getElementById('gl-export-panel').scrollIntoView({ behavior: 'smooth' });
    },

    // Hide export panel
    hideExportPanel: function() {
        document.getElementById('gl-export-panel').style.display = 'none';
    },

    // Export functions
    exportCSV: function() {
        const selectedInvoiceData = this.allInvoices.filter(inv => this.selectedInvoices.has(inv.id));
        const csvContent = this.convertToCSV(selectedInvoiceData);
        this.downloadFile(csvContent, 'grey-line-invoices.csv', 'text/csv');
        this.showNotification('CSV export completed successfully!', 'success');
    },

    exportExcel: function() {
        this.showNotification('Excel export feature coming soon!', 'info');
    },

    exportPDF: function() {
        this.showNotification('PDF export feature coming soon!', 'info');
    },

    exportJSON: function() {
        const selectedInvoiceData = this.allInvoices.filter(inv => this.selectedInvoices.has(inv.id));
        const jsonContent = JSON.stringify(selectedInvoiceData, null, 2);
        this.downloadFile(jsonContent, 'grey-line-invoices.json', 'application/json');
        this.showNotification('JSON export completed successfully!', 'success');
    },

    exportAllData: function() {
        const jsonContent = JSON.stringify(this.allInvoices, null, 2);
        this.downloadFile(jsonContent, 'all-grey-line-invoices.json', 'application/json');
        this.showNotification('All data exported successfully!', 'success');
    },

    // Convert to CSV
    convertToCSV: function(data) {
        const headers = ['Invoice #', 'Date', 'Client', 'Service Type', 'Recurrence', 'Subtotal', 'Grey Line', 'Total', 'Threshold', 'Grey Line Status', 'Invoice Status'];
        const rows = data.map(invoice => [
            invoice.invoiceNumber,
            invoice.date,
            invoice.client,
            invoice.serviceType,
            invoice.recurrence,
            invoice.subtotal,
            invoice.greyLine,
            invoice.total,
            invoice.threshold,
            invoice.greyLineStatus,
            invoice.invoiceStatus
        ]);
        
        return [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
    },

    // Download file
    downloadFile: function(content, fileName, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Edit invoice
    editInvoice: function(invoiceId) {
        this.showNotification('Edit feature coming soon!', 'info');
    },

    // Apply Grey Line to invoice
    applyGreyLineToInvoice: function(invoiceId) {
        const invoice = this.allInvoices.find(inv => inv.id === invoiceId);
        if (invoice && invoice.greyLineStatus !== 'applied') {
            if (confirm(`Apply Grey Line to invoice ${invoice.invoiceNumber}?\n\nClient: ${invoice.client}\nSubtotal: $${invoice.subtotal.toFixed(2)}`)) {
                // In a real app, this would open the Grey Line application interface
                this.showNotification(`Opening Grey Line application for ${invoice.invoiceNumber}...`, 'info');
                this.viewInvoiceDetails(invoiceId);
            }
        } else {
            this.showNotification('Grey Line already applied to this invoice.', 'warning');
        }
    },

    // Delete invoice
    deleteInvoice: function(invoiceId) {
        const invoice = this.allInvoices.find(inv => inv.id === invoiceId);
        if (invoice && confirm(`Are you sure you want to delete invoice ${invoice.invoiceNumber}?\n\nThis action cannot be undone.`)) {
            this.showNotification(`Invoice ${invoice.invoiceNumber} deleted successfully.`, 'success');
            // In a real app, this would make an API call to delete the invoice
            // For now, we'll just filter it out
            const index = this.allInvoices.findIndex(inv => inv.id === invoiceId);
            if (index !== -1) {
                this.allInvoices.splice(index, 1);
                this.filterInvoices();
                this.updateStats();
            }
        }
    },

    // Refresh data
    refreshData: function() {
        this.showNotification('Data refreshed successfully!', 'success');
        this.filterInvoices();
    },

    // Show notification
    showNotification: function(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '9999';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.maxWidth = '400px';
        notification.style.transform = 'translateX(120%)';
        notification.style.transition = 'transform 0.3s ease';
        
        // Set colors based on type
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #10b981 0%, #0da271 100%)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <div>${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Click to dismiss
        notification.onclick = function() {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
    },

    // Apply configuration to invoice
    applyConfigToInvoice: function() {
        if (!this.currentInvoiceDetails) return;
        
        const totalMinutes = this.getTotalConfigMinutes();
        const invoice = this.currentInvoiceDetails;
        const threshold = this.greyLineConfig.currentThreshold;
        
        invoice.greyLine = totalMinutes;
        invoice.threshold = threshold;
        invoice.greyLineStatus = 'applied';
        
        // Add to audit log
        if (!invoice.greyLineDetails) {
            invoice.greyLineDetails = {
                appliedDate: new Date().toLocaleString(),
                appliedBy: 'Current User',
                reasons: ['Configuration applied from Grey Line Config tab'],
                parameters: {},
                auditLog: []
            };
        }
        
        invoice.greyLineDetails.auditLog.unshift({
            date: new Date().toLocaleString(),
            action: 'Grey Line Applied via Configuration',
            user: 'Current User',
            amount: totalMinutes
        });
        
        // Update total
        const taxRate = 0.13;
        invoice.total = (invoice.subtotal + totalMinutes) * (1 + taxRate);
        
        this.showNotification(`Configuration applied: +${totalMinutes} minutes (${(threshold * 100).toFixed(1)}%)`, 'success');
        this.populateInvoiceTable();
        this.updateStats();
    },

    saveConfigPreset: function() {
        // Save current configuration as a preset
        const presetName = prompt('Enter a name for this configuration preset:', 'Custom Configuration');
        if (presetName && presetName.trim()) {
            const preset = {
                name: presetName.trim(),
                categories: JSON.parse(JSON.stringify(this.greyLineConfig.categories)),
                customCategories: JSON.parse(JSON.stringify(this.greyLineConfig.customCategories)),
                lockedThresholdValue: this.greyLineConfig.lockedThresholdValue,
                lockThreshold: this.greyLineConfig.lockThreshold
            };
            
            // In a real app, save to localStorage or API
            localStorage.setItem(`greyLinePreset_${Date.now()}`, JSON.stringify(preset));
            this.showNotification(`Preset "${presetName}" saved successfully`, 'success');
        }
    },

    applyCalculatorToInvoice: function() {
        if (!this.currentInvoiceDetails) return;
        
        const sliderValue = document.getElementById('desiredPercentSlider').value;
        const threshold = sliderValue / 100;
        const invoice = this.currentInvoiceDetails;
        const targetTotalMinutes = Math.round(invoice.subtotal * threshold);
        
        // Adjust configuration to match target threshold
        this.greyLineConfig.lockedThresholdValue = threshold;
        this.greyLineConfig.lockThreshold = true;
        
        // Recalculate all factors
        const currentTotalMinutes = this.getTotalConfigMinutes();
        const adjustmentRatio = targetTotalMinutes / currentTotalMinutes;
        
        const allCategories = [...this.greyLineConfig.categories, ...this.greyLineConfig.customCategories];
        
        allCategories.forEach(category => {
            category.factors.forEach(factor => {
                const newValue = Math.round(factor.value * adjustmentRatio);
                factor.value = Math.max(factor.min, Math.min(factor.max, newValue));
            });
        });
        
        // Refresh config tab
        this.populateGreyLineConfigTab(invoice);
        
        this.showNotification(`Configuration adjusted to ${sliderValue}% threshold`, 'success');
    },

    resetCalculator: function() {
        if (!this.currentInvoiceDetails) return;
        
        const currentThreshold = this.greyLineConfig.currentThreshold;
        const percent = Math.round(currentThreshold * 100);
        const slider = document.getElementById('desiredPercentSlider');
        if (slider) {
            slider.value = percent;
            this.updateDesiredPercent(percent);
        }
        this.showNotification('Calculator reset to current configuration', 'info');
    },

    saveReasoning: function() {
        if (!this.currentInvoiceDetails) return;
        
        // Add reasoning to invoice audit log
        const invoice = this.currentInvoiceDetails;
        const reasoningText = document.getElementById('reasoningPreview').innerText;
        
        if (!invoice.greyLineDetails) {
            invoice.greyLineDetails = {
                appliedDate: new Date().toLocaleString(),
                appliedBy: 'Current User',
                reasons: [],
                parameters: {},
                auditLog: []
            };
        }
        
        invoice.greyLineDetails.reasons = reasoningText.split('\n').filter(line => line.trim());
        
        this.showNotification('Reasoning saved to invoice', 'success');
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    greylineInvoiceApp.init();
});