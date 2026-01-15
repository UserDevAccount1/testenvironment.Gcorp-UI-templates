// GCorp Booking, Invoice & Lead Nurturing Management System
const GCorpBookingManager = (function() {
    // Enhanced Sample Data with Follow-up and Lead Nurturing
    const sampleData = [
        {
            id: "GC-2024-0876",
            client: "Sarah Johnson",
            email: "sarah.j@email.com",
            phone: "(416) 555-0123",
            serviceType: "Deep Cleaning",
            propertyCategory: "residential",
            propertyType: "Single Family Home",
            cleanerAssigned: "Team Alpha (3 members)",
            status: "synced",
            address: "123 Main St, Toronto, ON M5V 2T6",
            date: "2024-11-28",
            time: "09:00 AM",
            duration: "4.5 hours",
            estimatedPrice: "$406.80",
            actualPrice: "$406.80",
            deposit: "$120.00", // Updated to 120
            depositStatus: "Paid",
            billingType: "Credit Card - End of Month",
            clientType: "Recurring Residential",
            leadScore: 85,
            lastContact: "2024-11-28",
            nextFollowup: "2024-12-05",
            quickbooksSync: {
                status: "success",
                date: "2024-11-28",
                time: "14:30",
                invoiceId: "INV-87654",
                lastSync: "2 hours ago"
            },
            timeline: [
                { step: "Booking Created", date: "2024-11-26", time: "10:30 AM", status: "completed", type: "system" },
                { step: "Deposit Received", date: "2024-11-26", time: "11:15 AM", status: "completed", type: "payment" },
                { step: "Cleaner Assigned", date: "2024-11-27", time: "09:15 AM", status: "completed", type: "assignment" },
                { step: "Service Completed", date: "2024-11-28", time: "13:45 PM", status: "completed", type: "service" },
                { step: "Invoice Generated", date: "2024-11-28", time: "14:00 PM", status: "completed", type: "billing" },
                { step: "QuickBooks Sync", date: "2024-11-28", time: "14:30 PM", status: "completed", type: "sync" },
                { step: "Thank You Email Sent", date: "2024-11-28", time: "15:00 PM", status: "completed", type: "followup", followupId: "FU001" },
                { step: "Satisfaction Survey Sent", date: "2024-11-29", time: "10:00 AM", status: "scheduled", type: "followup", followupId: "FU002" }
            ],
            followupActions: [
                { id: "FU001", name: "Send Thank You Email", type: "marketing", category: "post-service", status: "completed", scheduled: "2024-11-28", trigger: "after_service" },
                { id: "FU002", name: "Send Satisfaction Survey", type: "feedback", category: "post-service", status: "scheduled", scheduled: "2024-11-29", trigger: "24_hours_after" },
                { id: "FU003", name: "Offer Maintenance Plan", type: "upsell", category: "recurring", status: "pending", scheduled: "2024-12-05", trigger: "7_days_after" },
                { id: "FU004", name: "Request Google Review", type: "marketing", category: "reputation", status: "pending", scheduled: "2024-12-12", trigger: "14_days_after" },
                { id: "FU005", name: "Schedule Next Cleaning", type: "booking", category: "recurring", status: "pending", scheduled: "2024-12-19", trigger: "21_days_after" }
            ],
            customFollowups: [
                { id: "CF001", name: "Seasonal Promotion Offer", type: "promotion", category: "seasonal", message: "Get 20% off your next spring cleaning!" }
            ]
        },
        {
            id: "GC-2024-0877",
            client: "Michael Chen",
            email: "m.chen@email.com",
            phone: "(647) 555-9876",
            serviceType: "Move-In Cleaning",
            propertyCategory: "commercial",
            propertyType: "Office Building",
            cleanerAssigned: "Team Beta (4 members)",
            status: "pending",
            address: "456 Bay St, Suite 1200, Toronto, ON M5H 2Y4",
            estimatedPrice: "$850.00",
            actualPrice: "$920.50",
            deposit: "$120.00", // Updated to 120
            depositStatus: "Pending",
            billingType: "Invoice - 30 Days",
            clientType: "First Time Commercial",
            leadScore: 65,
            lastContact: "2024-11-27",
            nextFollowup: "2024-11-29",
            quickbooksSync: {
                status: "pending",
                date: "",
                time: "",
                invoiceId: "",
                lastSync: "Never"
            },
            timeline: [
                { step: "Booking Created", date: "2024-11-27", time: "14:20 PM", status: "completed", type: "system" },
                { step: "Deposit Pending", date: "2024-11-27", time: "15:30 PM", status: "pending", type: "payment" },
                { step: "Cleaner Assigned", date: "2024-11-28", time: "11:00 AM", status: "completed", type: "assignment" },
                { step: "Service In Progress", date: "2024-11-29", time: "08:00 AM", status: "in-progress", type: "service" },
                { step: "Invoice Generation", date: "", time: "", status: "pending", type: "billing" },
                { step: "QuickBooks Sync", date: "", time: "", status: "pending", type: "sync" }
            ],
            followupActions: [
                { id: "FU101", name: "Send Deposit Reminder", type: "payment", category: "pre-service", status: "pending", scheduled: "2024-11-29", trigger: "48_hours_before" },
                { id: "FU102", name: "Confirm Service Details", type: "service", category: "pre-service", status: "completed", scheduled: "2024-11-28", trigger: "24_hours_before" },
                { id: "FU103", name: "Send Welcome Package", type: "marketing", category: "onboarding", status: "scheduled", scheduled: "2024-11-30", trigger: "after_service" }
            ]
        },
        {
            id: "GC-2024-0878",
            client: "Emily Rodriguez",
            email: "emily.r@email.com",
            phone: "(905) 555-4567",
            serviceType: "Regular Maintenance",
            propertyCategory: "residential",
            propertyType: "Condo",
            cleanerAssigned: "Team Gamma (2 members)",
            status: "completed",
            address: "789 King St W, Toronto, ON M5V 1J8",
            estimatedPrice: "$280.00",
            actualPrice: "$280.00",
            deposit: "$120.00", // Updated to 120
            depositStatus: "Paid",
            billingType: "Credit Card - 15th of Month",
            clientType: "Recurring Residential",
            leadScore: 92,
            lastContact: "2024-11-27",
            nextFollowup: "2024-12-04",
            quickbooksSync: {
                status: "failed",
                date: "2024-11-27",
                time: "16:45",
                invoiceId: "INV-87655",
                lastSync: "Yesterday",
                error: "Connection timeout"
            },
            timeline: [
                { step: "Booking Created", date: "2024-11-25", time: "16:30 PM", status: "completed", type: "system" },
                { step: "Deposit Received", date: "2024-11-25", time: "17:15 PM", status: "completed", type: "payment" },
                { step: "Cleaner Assigned", date: "2024-11-26", time: "09:45 AM", status: "completed", type: "assignment" },
                { step: "Service Completed", date: "2024-11-27", time: "13:00 PM", status: "completed", type: "service" },
                { step: "Invoice Generated", date: "2024-11-27", time: "16:30 PM", status: "completed", type: "billing" },
                { step: "QuickBooks Sync", date: "2024-11-27", time: "16:45 PM", status: "failed", type: "sync" },
                { step: "Error Notification Sent", date: "2024-11-27", time: "17:00 PM", status: "completed", type: "followup" }
            ],
            followupActions: [
                { id: "FU201", name: "Retry QuickBooks Sync", type: "sync", category: "technical", status: "pending", scheduled: "2024-11-28", trigger: "manual" },
                { id: "FU202", name: "Send Thank You Email", type: "marketing", category: "post-service", status: "completed", scheduled: "2024-11-27", trigger: "after_service" },
                { id: "FU203", name: "Request Review", type: "marketing", category: "reputation", status: "scheduled", scheduled: "2024-12-04", trigger: "7_days_after" }
            ]
        }
    ];

    // Follow-up Templates Database
    const followupTemplates = [
        {
            id: "TEMP001",
            name: "Thank You Email",
            type: "marketing",
            category: "post-service",
            trigger: "after_service",
            defaultMessage: "Thank you for choosing GCorp! We hope you enjoyed our service. Let us know if you need anything else.",
            variables: ["client_name", "service_type", "cleaner_team"],
            mandatory: true
        },
        {
            id: "TEMP002",
            name: "Satisfaction Survey",
            type: "feedback",
            category: "post-service",
            trigger: "24_hours_after",
            defaultMessage: "How was your cleaning experience? Please take 2 minutes to complete our survey.",
            variables: ["client_name", "service_date"],
            mandatory: true
        },
        {
            id: "TEMP003",
            name: "Maintenance Plan Offer",
            type: "upsell",
            category: "recurring",
            trigger: "7_days_after",
            defaultMessage: "Keep your space spotless with our maintenance plan. Save 15% on recurring services!",
            variables: ["client_name", "property_type"],
            mandatory: false
        },
        {
            id: "TEMP004",
            name: "Google Review Request",
            type: "marketing",
            category: "reputation",
            trigger: "14_days_after",
            defaultMessage: "Help others find great cleaning services! Please leave us a Google review.",
            variables: ["client_name"],
            mandatory: false
        },
        {
            id: "TEMP005",
            name: "Schedule Next Cleaning",
            type: "booking",
            category: "recurring",
            trigger: "21_days_after",
            defaultMessage: "It's time for your next cleaning! Click here to schedule.",
            variables: ["client_name", "last_service_date"],
            mandatory: false
        }
    ];

    // Lead Nurturing Stages
    const leadStages = [
        { id: 1, name: "New Lead", description: "Initial booking inquiry", actions: ["Send welcome", "Schedule call"] },
        { id: 2, name: "Active Client", description: "First service completed", actions: ["Send thank you", "Request review"] },
        { id: 3, name: "Repeat Client", description: "Multiple bookings", actions: ["Offer loyalty", "Schedule next"] },
        { id: 4, name: "Advocate", description: "Refers others", actions: ["Request referral", "Offer affiliate"] },
        { id: 5, name: "At Risk", description: "No booking in 90 days", actions: ["Send win-back", "Special offer"] }
    ];

    // DOM Elements
    const elements = {
        tableBody: document.getElementById('gcorp-table-body'),
        greylineModal: document.getElementById('gcorp-greyline-modal'),
        actionModal: document.getElementById('gcorp-action-modal'),
        syncProgressModal: document.getElementById('gcorp-sync-progress-modal'),
        searchInput: document.getElementById('gcorp-search-input'),
        statusFilter: document.getElementById('gcorp-status-filter'),
        propertyFilter: document.getElementById('gcorp-property-filter'),
        dateFilter: document.getElementById('gcorp-date-filter'),
        cleanerFilter: document.getElementById('gcorp-cleaner-filter'),
        selectAllCheckbox: document.getElementById('gcorp-select-all'),
        showingCount: document.getElementById('gcorp-showing-count'),
        totalCount: document.getElementById('gcorp-total-count'),
        modalTabs: document.getElementById('gcorp-modal-tabs')
    };

    // Global State
    let currentBooking = null;
    let followupSettings = JSON.parse(localStorage.getItem('gcorp_followup_settings')) || {
        automationEnabled: true,
        autoSendThankYou: true,
        autoScheduleSurvey: true,
        autoOfferMaintenance: false,
        autoRequestReview: true,
        emailReminders: true,
        smsReminders: false,
        leadScoring: true,
        defaultFollowups: ["TEMP001", "TEMP002", "TEMP004"],
        customMessages: {}
    };

    // Initialize
    function init() {
        console.log('GCorp Management System Initialized');
        populateTable(sampleData);
        setupEventListeners();
        updateCounts();
        loadFollowupTemplates();
    }

    // Enhanced Table Population with deposit column
    function populateTable(data) {
        elements.tableBody.innerHTML = '';
        
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.dataset.id = item.id;
            
            // Status badge
            let statusBadge = '';
            switch(item.status) {
                case 'synced': statusBadge = '<span class="gcorp-status-badge gcorp-status-synced">QuickBooks Synced</span>'; break;
                case 'completed': statusBadge = '<span class="gcorp-status-badge gcorp-status-completed">Completed</span>'; break;
                case 'in-progress': statusBadge = '<span class="gcorp-status-badge gcorp-status-in-progress">In Progress</span>'; break;
                case 'pending': statusBadge = '<span class="gcorp-status-badge gcorp-status-pending">Pending</span>'; break;
                case 'failed': statusBadge = '<span class="gcorp-status-badge gcorp-status-failed">Sync Failed</span>'; break;
            }
            
            // Property badge
            const propertyBadge = item.propertyCategory === 'residential' 
                ? '<span class="gcorp-property-badge gcorp-property-residential"><i class="fas fa-home"></i> Residential</span>'
                : '<span class="gcorp-property-badge gcorp-property-commercial"><i class="fas fa-building"></i> Commercial</span>';
            
            // Deposit status - all set to $120
            const depositStatus = item.depositStatus === 'Paid' 
                ? '<span style="color:#28a745;"><i class="fas fa-check-circle"></i> Paid</span>'
                : '<span style="color:#dc3545;"><i class="fas fa-clock"></i> Pending</span>';
            
            row.innerHTML = `
                <td class="gcorp-checkbox-col">
                    <input type="checkbox" class="gcorp-row-checkbox" data-id="${item.id}">
                </td>
                <td><strong>${item.id}</strong></td>
                <td>
                    <div><strong>${item.client}</strong></div>
                    <div class="gcorp-small-text">${item.phone}</div>
                </td>
                <td>${item.serviceType}</td>
                <td>${propertyBadge}</td>
                <td>${item.cleanerAssigned}</td>
                <td>${statusBadge}</td>
                <td>${item.address}</td>
                <td>${item.deposit}<br>${depositStatus}</td>
                <td><strong>${item.estimatedPrice}</strong></td>
                <td class="gcorp-grey-line-cell">
                    <button class="gcorp-grey-line-btn gcorp-view-greyline" data-index="${index}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
                <td class="gcorp-action-cell">
                    <div class="gcorp-action-buttons">
                        <button class="gcorp-action-btn gcorp-view" data-id="${item.id}" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="gcorp-action-btn gcorp-invoice" data-id="${item.id}" title="Send Invoice">
                            <i class="fas fa-envelope"></i>
                        </button>
                        <button class="gcorp-action-btn gcorp-followup" data-id="${item.id}" title="Follow-up Actions">
                            <i class="fas fa-tasks"></i>
                        </button>
                        <button class="gcorp-action-btn gcorp-sync" data-id="${item.id}" title="Sync to QuickBooks" ${item.status === 'synced' ? 'disabled' : ''}>
                            <i class="fas fa-sync"></i>
                        </button>
                    </div>
                </td>
            `;
            
            elements.tableBody.appendChild(row);
        });
    }

    // Set up event listeners
    function setupEventListeners() {
        // Filter event listeners
        if (elements.searchInput) elements.searchInput.addEventListener('input', filterTable);
        if (elements.statusFilter) elements.statusFilter.addEventListener('change', filterTable);
        if (elements.propertyFilter) elements.propertyFilter.addEventListener('change', filterTable);
        if (elements.dateFilter) elements.dateFilter.addEventListener('change', filterTable);
        if (elements.cleanerFilter) elements.cleanerFilter.addEventListener('change', filterTable);
        
        // Select all checkbox
        if (elements.selectAllCheckbox) {
            elements.selectAllCheckbox.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('.gcorp-row-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }
        
        // Grey line button clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('.gcorp-view-greyline')) {
                const index = e.target.closest('.gcorp-view-greyline').dataset.index;
                showGreylineModal(sampleData[index]);
            }
            
            // View details button
            if (e.target.closest('.gcorp-action-btn.gcorp-view')) {
                const id = e.target.closest('.gcorp-action-btn').dataset.id;
                const item = sampleData.find(d => d.id === id);
                currentBooking = item;
                showActionModal(item);
                showTab('details');
            }
            
            // Send invoice button
            if (e.target.closest('.gcorp-action-btn.gcorp-invoice')) {
                const id = e.target.closest('.gcorp-action-btn').dataset.id;
                const item = sampleData.find(d => d.id === id);
                currentBooking = item;
                showActionModal(item);
                showTab('invoice');
            }
            
            // Follow-up button
            if (e.target.closest('.gcorp-action-btn.gcorp-followup')) {
                const id = e.target.closest('.gcorp-action-btn').dataset.id;
                const item = sampleData.find(d => d.id === id);
                currentBooking = item;
                showActionModal(item);
                showTab('followup');
            }
            
            // Sync button
            if (e.target.closest('.gcorp-action-btn.gcorp-sync')) {
                const id = e.target.closest('.gcorp-action-btn').dataset.id;
                const item = sampleData.find(d => d.id === id);
                currentBooking = item;
                showActionModal(item);
                showTab('sync');
            }
        });
        
        // Tab switching
        if (elements.modalTabs) {
            elements.modalTabs.addEventListener('click', function(e) {
                if (e.target.closest('.gcorp-modal-tab')) {
                    const tab = e.target.closest('.gcorp-modal-tab');
                    const tabName = tab.dataset.tab;
                    showTab(tabName);
                }
            });
        }
        
        // Modal close buttons
        const closeGreyline = document.getElementById('gcorp-close-greyline');
        if (closeGreyline) closeGreyline.addEventListener('click', () => {
            elements.greylineModal.style.display = 'none';
        });
        
        const closeActionBtn = document.getElementById('gcorp-close-action-btn');
        if (closeActionBtn) closeActionBtn.addEventListener('click', () => {
            elements.actionModal.style.display = 'none';
        });
        
        const closeActionModal = document.getElementById('gcorp-close-action-modal');
        if (closeActionModal) closeActionModal.addEventListener('click', () => {
            elements.actionModal.style.display = 'none';
        });
        
        const closeSyncModal = document.getElementById('gcorp-close-sync-modal');
        if (closeSyncModal) closeSyncModal.addEventListener('click', () => {
            elements.syncProgressModal.style.display = 'none';
        });
        
        const cancelSync = document.getElementById('gcorp-cancel-sync');
        if (cancelSync) cancelSync.addEventListener('click', () => {
            elements.syncProgressModal.style.display = 'none';
        });
        
        // Print button in action modal
        const printDetails = document.getElementById('gcorp-print-details');
        if (printDetails) printDetails.addEventListener('click', function() {
            window.print();
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === elements.greylineModal) {
                elements.greylineModal.style.display = 'none';
            }
            if (event.target === elements.actionModal) {
                elements.actionModal.style.display = 'none';
            }
            if (event.target === elements.syncProgressModal) {
                elements.syncProgressModal.style.display = 'none';
            }
        });
        
        // Refresh button
        const refreshData = document.getElementById('gcorp-refresh-data');
        if (refreshData) refreshData.addEventListener('click', function() {
            populateTable(sampleData);
            updateCounts();
            showToast('Data refreshed successfully!', 'success');
        });
        
        // Export CSV button
        const exportCsv = document.getElementById('gcorp-export-csv');
        if (exportCsv) exportCsv.addEventListener('click', exportToCSV);
        
        // Add new booking button
        const addBooking = document.getElementById('gcorp-add-booking');
        if (addBooking) addBooking.addEventListener('click', addNewBooking);
    }

    // Show tab content
    function showTab(tabName) {
        // Update active tab
        document.querySelectorAll('.gcorp-modal-tab').forEach(tab => {
            tab.classList.remove('gcorp-active');
        });
        const activeTab = document.querySelector(`.gcorp-modal-tab[data-tab="${tabName}"]`);
        if (activeTab) activeTab.classList.add('gcorp-active');
        
        // Hide all tab content
        document.querySelectorAll('.gcorp-tab-content').forEach(content => {
            content.classList.remove('gcorp-active');
        });
        
        // Show selected tab content
        const tabContent = document.getElementById(`gcorp-tab-${tabName}`);
        if (tabContent) {
            tabContent.classList.add('gcorp-active');
        }
        
        // Populate tab content if needed
        if (currentBooking) {
            populateTabContent(tabName, currentBooking);
        }
    }

    // Populate tab content
    function populateTabContent(tabName, item) {
        const tabContent = document.getElementById(`gcorp-tab-${tabName}`);
        if (!tabContent) return;
        
        switch(tabName) {
            case 'details':
                tabContent.innerHTML = `
                    <h4><i class="fas fa-info-circle"></i> Booking Information</h4>
                    <div class="gcorp-booking-info-grid">
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Booking ID</span>
                            <span class="gcorp-info-value">${item.id}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Client Name</span>
                            <span class="gcorp-info-value">${item.client}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Email</span>
                            <span class="gcorp-info-value">${item.email}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Phone</span>
                            <span class="gcorp-info-value">${item.phone}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Service Type</span>
                            <span class="gcorp-info-value">${item.serviceType}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Property Category</span>
                            <span class="gcorp-info-value">${item.propertyCategory === 'residential' ? 'Residential' : 'Commercial'}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Property Type</span>
                            <span class="gcorp-info-value">${item.propertyType || 'Not specified'}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Cleaner Assigned</span>
                            <span class="gcorp-info-value">${item.cleanerAssigned}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Service Date</span>
                            <span class="gcorp-info-value">${item.date} at ${item.time}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Duration</span>
                            <span class="gcorp-info-value">${item.duration}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Estimated Price</span>
                            <span class="gcorp-info-value">${item.estimatedPrice}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Actual Price</span>
                            <span class="gcorp-info-value">${item.actualPrice}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Deposit</span>
                            <span class="gcorp-info-value">${item.deposit} (${item.depositStatus})</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Billing Type</span>
                            <span class="gcorp-info-value">${item.billingType}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Client Type</span>
                            <span class="gcorp-info-value">${item.clientType}</span>
                        </div>
                        <div class="gcorp-info-item">
                            <span class="gcorp-info-label">Address</span>
                            <span class="gcorp-info-value">${item.address}</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <h4><i class="fas fa-sync"></i> QuickBooks Status</h4>
                        <div class="gcorp-sync-info">
                            <span class="gcorp-sync-status ${item.quickbooksSync.status === 'success' ? 'gcorp-sync-success' : item.quickbooksSync.status === 'failed' ? 'gcorp-sync-failed' : 'gcorp-sync-pending'}">
                                <i class="fas ${item.quickbooksSync.status === 'success' ? 'fa-check-circle' : item.quickbooksSync.status === 'failed' ? 'fa-times-circle' : 'fa-clock'}"></i>
                                ${item.quickbooksSync.status === 'success' ? 'Synced' : item.quickbooksSync.status === 'failed' ? 'Sync Failed' : 'Pending Sync'}
                            </span>
                            <div class="gcorp-sync-details">
                                <p><strong>Invoice ID:</strong> ${item.quickbooksSync.invoiceId || 'Not synced yet'}</p>
                                <p><strong>Last Sync:</strong> ${item.quickbooksSync.lastSync}</p>
                                ${item.quickbooksSync.error ? `<p><strong>Error:</strong> ${item.quickbooksSync.error}</p>` : ''}
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'invoice':
                tabContent.innerHTML = `
                    <h4><i class="fas fa-file-invoice"></i> Invoice Management</h4>
                    <div class="gcorp-invoice-form">
                        <div class="gcorp-form-group">
                            <label>Service Description</label>
                            <input type="text" id="gcorp-invoice-service" value="${item.serviceType}">
                        </div>
                        
                        <div class="gcorp-form-group">
                            <label>Amount</label>
                            <input type="text" id="gcorp-invoice-amount" value="${item.actualPrice.replace('$', '')}">
                        </div>
                        
                        <div class="gcorp-form-group">
                            <label>Deposit Amount</label>
                            <input type="text" id="gcorp-invoice-deposit" value="120" readonly>
                            <small class="text-muted">Minimum deposit set to $120</small>
                        </div>
                        
                        <div class="gcorp-form-group">
                            <label>Tax Rate</label>
                            <select id="gcorp-invoice-tax">
                                <option ${item.propertyCategory === 'residential' ? 'selected' : ''}>13% HST</option>
                                <option ${item.propertyCategory === 'commercial' ? 'selected' : ''}>5% GST</option>
                                <option>No Tax</option>
                            </select>
                        </div>
                        
                        <div class="gcorp-form-group">
                            <label>Notes/Instructions</label>
                            <textarea id="gcorp-invoice-notes" rows="4">Special instructions or additional services</textarea>
                        </div>
                        
                        <div class="gcorp-form-group">
                            <label>Recipient Email</label>
                            <input type="email" id="gcorp-invoice-email" value="${item.email}">
                        </div>
                        
                        <div class="gcorp-form-group">
                            <label>Message to Client</label>
                            <textarea id="gcorp-invoice-message" rows="4">
Dear ${item.client},

Thank you for choosing GCorp Cleaning Services. Please find attached your invoice for the ${item.serviceType.toLowerCase()} service completed on ${item.date}.

Total Amount: ${item.actualPrice}
Deposit Applied: ${item.deposit}

You can make payment through the link below or contact us for other payment options.

Best regards,
GCorp Team
                            </textarea>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button class="gcorp-btn gcorp-btn-primary" onclick="GCorpBookingManager.sendInvoice('${item.id}')">
                                <i class="fas fa-paper-plane"></i> Send Invoice
                            </button>
                            <button class="gcorp-btn gcorp-btn-outline" onclick="GCorpBookingManager.saveInvoice('${item.id}')">
                                <i class="fas fa-save"></i> Save Draft
                            </button>
                            <button class="gcorp-btn gcorp-btn-outline" onclick="GCorpBookingManager.previewInvoice('${item.id}')">
                                <i class="fas fa-eye"></i> Preview
                            </button>
                        </div>
                    </div>
                `;
                break;
                
            case 'sync':
                tabContent.innerHTML = `
                    <h4><i class="fas fa-sync"></i> QuickBooks Sync</h4>
                    <div class="gcorp-sync-info">
                        <div style="margin-bottom: 20px;">
                            <span class="gcorp-sync-status ${item.quickbooksSync.status === 'success' ? 'gcorp-sync-success' : item.quickbooksSync.status === 'failed' ? 'gcorp-sync-failed' : 'gcorp-sync-pending'}">
                                <i class="fas ${item.quickbooksSync.status === 'success' ? 'fa-check-circle' : item.quickbooksSync.status === 'failed' ? 'fa-times-circle' : 'fa-clock'}"></i>
                                ${item.quickbooksSync.status === 'success' ? 'Synced' : item.quickbooksSync.status === 'failed' ? 'Sync Failed' : 'Pending Sync'}
                            </span>
                            <div class="gcorp-sync-details">
                                <p><strong>Invoice ID:</strong> ${item.quickbooksSync.invoiceId || 'Not synced yet'}</p>
                                <p><strong>Last Sync:</strong> ${item.quickbooksSync.lastSync}</p>
                                ${item.quickbooksSync.error ? `<p><strong>Error:</strong> ${item.quickbooksSync.error}</p>` : ''}
                            </div>
                        </div>
                        
                        <div style="text-align: center; padding: 30px;">
                            ${item.status === 'synced' ? 
                                `<p style="color: #28a745;"><i class="fas fa-check-circle fa-3x"></i></p>
                                 <h4 style="color: #28a745;">Already Synced to QuickBooks</h4>
                                 <p>This invoice was successfully synced to QuickBooks.</p>` : 
                                `<button class="gcorp-btn gcorp-btn-primary" onclick="GCorpBookingManager.startQuickbooksSync()" style="padding: 15px 30px; font-size: 16px;">
                                    <i class="fas fa-sync"></i> Sync Now to QuickBooks
                                 </button>
                                 <p style="margin-top: 15px; color: #6c757d;">Click to sync this invoice to QuickBooks Online</p>`
                            }
                        </div>
                        
                        <div style="margin-top: 30px;">
                            <h5>Sync History</h5>
                            <div class="gcorp-sync-log" style="max-height: 200px; overflow-y: auto;">
                                ${item.timeline.filter(step => step.step.includes('Sync') || step.step.includes('Invoice')).map(step => `
                                    <div style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                        <strong>${step.step}</strong>
                                        <div style="color: #6c757d; font-size: 12px;">
                                            ${step.date} ${step.time} - ${step.status}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'followup':
                populateFollowupTab(item);
                break;
                
            case 'timeline':
                populateTimelineTab(item);
                break;
                
            case 'lead-nurture':
                populateLeadNurtureTab(item);
                break;
                
            case 'followup-settings':
                populateSettingsTab();
                break;
        }
    }

    // Enhanced Follow-up Tab Content
    function populateFollowupTab(item) {
        const tabContent = document.getElementById('gcorp-tab-followup');
        
        tabContent.innerHTML = `
            <div class="gcorp-followup-system">
                <div class="gcorp-followup-actions">
                    <h4><i class="fas fa-tasks"></i> Follow-up Actions for ${item.client}</h4>
                    <p style="color: #6c757d; margin-bottom: 20px;">Manage automated and custom follow-ups</p>
                    
                    <div id="gcorp-followup-list">
                        ${item.followupActions.map(followup => `
                            <div class="gcorp-followup-item">
                                <input type="checkbox" id="gcorp-followup-${followup.id}" 
                                       class="gcorp-followup-checkbox" ${followup.status === 'completed' ? 'checked' : ''}>
                                <div style="flex: 1; margin-left: 10px;">
                                    <div style="display: flex; align-items: center;">
                                        <strong>${followup.name}</strong>
                                        <span class="gcorp-followup-category gcorp-category-${followup.category}">${followup.category}</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                                        <span class="gcorp-followup-trigger">
                                            <i class="fas fa-clock"></i> ${followup.scheduled}
                                        </span>
                                        <span class="gcorp-status-badge gcorp-status-${followup.status}">
                                            ${followup.status}
                                        </span>
                                    </div>
                                </div>
                                <div class="gcorp-followup-controls">
                                    <button class="gcorp-btn gcorp-btn-sm gcorp-btn-outline" 
                                            onclick="GCorpBookingManager.editFollowup('${followup.id}', '${item.id}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="gcorp-btn gcorp-btn-sm gcorp-btn-outline gcorp-btn-danger"
                                            onclick="GCorpBookingManager.deleteFollowup('${followup.id}', '${item.id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <button class="gcorp-btn gcorp-btn-outline" onclick="GCorpBookingManager.runAllFollowups('${item.id}')">
                            <i class="fas fa-play-circle"></i> Run All Scheduled
                        </button>
                    </div>
                </div>
                
                <div class="gcorp-followup-create">
                    <h4><i class="fas fa-plus-circle"></i> Create New Follow-up</h4>
                    
                    <div class="gcorp-form-group" style="margin-top: 15px;">
                        <label>Follow-up Type</label>
                        <select id="gcorp-new-followup-type" class="gcorp-form-control">
                            <option value="">Select Type</option>
                            <option value="marketing">Marketing & Promotion</option>
                            <option value="feedback">Feedback & Survey</option>
                            <option value="upsell">Upsell & Cross-sell</option>
                            <option value="booking">Booking & Scheduling</option>
                            <option value="recovery">Customer Recovery</option>
                            <option value="custom">Custom Message</option>
                        </select>
                    </div>
                    
                    <div class="gcorp-form-group">
                        <label>Message Template</label>
                        <select id="gcorp-new-followup-template" class="gcorp-form-control" onchange="GCorpBookingManager.loadTemplate(this.value, '${item.id}')">
                            <option value="">Select Template</option>
                            ${followupTemplates.map(template => `
                                <option value="${template.id}">${template.name} (${template.type})</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="gcorp-form-group">
                        <label>Custom Message</label>
                        <textarea id="gcorp-new-followup-message" rows="4" class="gcorp-form-control" 
                                  placeholder="Enter your custom follow-up message..."></textarea>
                    </div>
                    
                    <div class="gcorp-form-group">
                        <label>Schedule For</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="date" id="gcorp-new-followup-date" value="${getNextWeekDate()}" class="gcorp-form-control" style="flex: 1;">
                            <input type="time" id="gcorp-new-followup-time" value="09:00" class="gcorp-form-control" style="flex: 1;">
                        </div>
                    </div>
                    
                    <div class="gcorp-form-group">
                        <label>Trigger Condition</label>
                        <select id="gcorp-new-followup-trigger" class="gcorp-form-control">
                            <option value="immediate">Send Immediately</option>
                            <option value="24_hours_after">24 Hours After Service</option>
                            <option value="7_days_after">7 Days After Service</option>
                            <option value="14_days_after">14 Days After Service</option>
                            <option value="30_days_after">30 Days After Service</option>
                            <option value="custom_date">Custom Date</option>
                        </select>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <button class="gcorp-btn gcorp-btn-primary" onclick="GCorpBookingManager.createNewFollowup('${item.id}')">
                            <i class="fas fa-plus"></i> Create Follow-up
                        </button>
                        <button class="gcorp-btn gcorp-btn-outline" onclick="GCorpBookingManager.saveAsTemplate('${item.id}')">
                            <i class="fas fa-save"></i> Save as Template
                        </button>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <h5><i class="fas fa-history"></i> Recent Follow-up History</h5>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; max-height: 200px; overflow-y: auto;">
                    ${item.timeline.filter(step => step.type === 'followup').map(step => `
                        <div style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                            <div style="display: flex; justify-content: space-between;">
                                <strong>${step.step}</strong>
                                <span style="font-size: 12px; color: #6c757d;">${step.date} ${step.time}</span>
                            </div>
                            <div style="font-size: 12px; color: #28a745;">
                                <i class="fas fa-check-circle"></i> ${step.status}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Lead Nurture Tab Content
    function populateLeadNurtureTab(item) {
        const tabContent = document.getElementById('gcorp-tab-lead-nurture');
        
        // Calculate lead stage based on history
        const leadStage = calculateLeadStage(item);
        
        tabContent.innerHTML = `
            <div class="gcorp-lead-score">
                <div class="gcorp-lead-score-circle">
                    <div>${item.leadScore}</div>
                    <div style="font-size: 12px;">SCORE</div>
                </div>
                <h4 style="color: white; margin-bottom: 5px;">${leadStage.name}</h4>
                <p style="color: rgba(255,255,255,0.8);">${leadStage.description}</p>
            </div>
            
            <h4><i class="fas fa-chart-line"></i> Lead Nurturing Pathway</h4>
            <p>Guide ${item.client} towards their next booking through strategic follow-ups</p>
            
            <div class="gcorp-nurture-timeline">
                ${leadStages.map((stage, index) => `
                    <div class="gcorp-nurture-step ${stage.id === leadStage.id ? 'active' : stage.id < leadStage.id ? 'completed' : 'future'}">
                        <h6>${stage.name}</h6>
                        <p style="font-size: 12px; color: #6c757d;">${stage.description}</p>
                        ${stage.id === leadStage.id ? 
                            `<button class="gcorp-btn gcorp-btn-sm gcorp-btn-primary" 
                                     onclick="GCorpBookingManager.executeStageAction('${item.id}', ${stage.id})">
                                <i class="fas fa-play"></i> Execute Actions
                            </button>` : 
                            stage.id < leadStage.id ?
                            `<span style="color: #28a745;"><i class="fas fa-check"></i> Completed</span>` :
                            `<span style="color: #6c757d;"><i class="fas fa-lock"></i> Locked</span>`
                        }
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 30px;">
                <h5><i class="fas fa-lightbulb"></i> Recommended Actions</h5>
                <div style="background: #fff3cd; padding: 15px; border-radius: 8px;">
                    ${leadStage.actions.map(action => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
                            <span>${action}</span>
                            <button class="gcorp-btn gcorp-btn-sm gcorp-btn-outline" 
                                    onclick="GCorpBookingManager.createFollowupFromSuggestion('${action}', '${item.id}')">
                                <i class="fas fa-plus"></i> Add as Follow-up
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <h5><i class="fas fa-bullseye"></i> Conversion Predictions</h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">
                    <div style="background: white; border: 1px solid #e9ecef; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #28a745;">${calculateNextBookingChance(item)}%</div>
                        <div style="font-size: 12px; color: #6c757d;">Next Booking Chance</div>
                    </div>
                    <div style="background: white; border: 1px solid #e9ecef; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #17a2b8;">${calculateDaysToNextBooking(item)}</div>
                        <div style="font-size: 12px; color: #6c757d;">Days to Next Booking</div>
                    </div>
                    <div style="background: white; border: 1px solid #e9ecef; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #6f42c1;">${calculateRecommendedFollowups(item)}</div>
                        <div style="font-size: 12px; color: #6c757d;">Recommended Follow-ups</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Settings Tab Content
    function populateSettingsTab() {
        const tabContent = document.getElementById('gcorp-tab-followup-settings');
        
        tabContent.innerHTML = `
            <div class="gcorp-settings-panel">
                <div class="gcorp-settings-section">
                    <h5><i class="fas fa-robot"></i> Automation Settings</h5>
                    
                    <div class="gcorp-setting-item">
                        <span>Enable Follow-up Automation</span>
                        <label class="gcorp-switch">
                            <input type="checkbox" id="gcorp-setting-automation" ${followupSettings.automationEnabled ? 'checked' : ''}>
                            <span class="gcorp-slider"></span>
                        </label>
                    </div>
                    
                    <div class="gcorp-setting-item">
                        <span>Auto-send Thank You Email</span>
                        <label class="gcorp-switch">
                            <input type="checkbox" id="gcorp-setting-thankyou" ${followupSettings.autoSendThankYou ? 'checked' : ''}>
                            <span class="gcorp-slider"></span>
                        </label>
                    </div>
                    
                    <div class="gcorp-setting-item">
                        <span>Auto-schedule Satisfaction Survey</span>
                        <label class="gcorp-switch">
                            <input type="checkbox" id="gcorp-setting-survey" ${followupSettings.autoScheduleSurvey ? 'checked' : ''}>
                            <span class="gcorp-slider"></span>
                        </label>
                    </div>
                    
                    <div class="gcorp-setting-item">
                        <span>Auto-request Google Reviews</span>
                        <label class="gcorp-switch">
                            <input type="checkbox" id="gcorp-setting-reviews" ${followupSettings.autoRequestReview ? 'checked' : ''}>
                            <span class="gcorp-slider"></span>
                        </label>
                    </div>
                    
                    <div class="gcorp-setting-item">
                        <span>Lead Scoring System</span>
                        <label class="gcorp-switch">
                            <input type="checkbox" id="gcorp-setting-leadscoring" ${followupSettings.leadScoring ? 'checked' : ''}>
                            <span class="gcorp-slider"></span>
                        </label>
                    </div>
                </div>
                
                <div class="gcorp-settings-section">
                    <h5><i class="fas fa-bell"></i> Notification Settings</h5>
                    
                    <div class="gcorp-setting-item">
                        <span>Email Reminders</span>
                        <label class="gcorp-switch">
                            <input type="checkbox" id="gcorp-setting-email" ${followupSettings.emailReminders ? 'checked' : ''}>
                            <span class="gcorp-slider"></span>
                        </label>
                    </div>
                    
                    <div class="gcorp-setting-item">
                        <span>SMS Reminders</span>
                        <label class="gcorp-switch">
                            <input type="checkbox" id="gcorp-setting-sms" ${followupSettings.smsReminders ? 'checked' : ''}>
                            <span class="gcorp-slider"></span>
                        </label>
                    </div>
                    
                    <div class="gcorp-setting-item">
                        <span>Default Follow-up Days</span>
                        <select id="gcorp-setting-followup-days" class="gcorp-form-control" style="width: 100px;">
                            <option ${followupSettings.defaultDays === 7 ? 'selected' : ''}>7</option>
                            <option ${followupSettings.defaultDays === 14 ? 'selected' : ''}>14</option>
                            <option ${followupSettings.defaultDays === 30 ? 'selected' : ''}>30</option>
                        </select>
                    </div>
                </div>
                
                <div class="gcorp-settings-section">
                    <h5><i class="fas fa-cogs"></i> Automation Rules</h5>
                    
                    <div class="gcorp-automation-rule">
                        <strong>Rule #1: Post-Service Follow-up</strong>
                        <p style="font-size: 12px; color: #6c757d; margin: 5px 0;">
                            Trigger: After service completion → Actions: Send thank you, schedule survey
                        </p>
                    </div>
                    
                    <div class="gcorp-automation-rule">
                        <strong>Rule #2: Recurring Client Nurture</strong>
                        <p style="font-size: 12px; color: #6c757d; margin: 5px 0;">
                            Trigger: 21 days after service → Actions: Schedule next cleaning, offer maintenance
                        </p>
                    </div>
                    
                    <div class="gcorp-automation-rule">
                        <strong>Rule #3: At-Risk Recovery</strong>
                        <p style="font-size: 12px; color: #6c757d; margin: 5px 0;">
                            Trigger: No booking in 90 days → Actions: Send win-back offer, special discount
                        </p>
                    </div>
                    
                    <button class="gcorp-btn gcorp-btn-outline" style="width: 100%; margin-top: 10px;">
                        <i class="fas fa-plus"></i> Add New Rule
                    </button>
                </div>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
                <button class="gcorp-btn gcorp-btn-primary" onclick="GCorpBookingManager.saveSettings()">
                    <i class="fas fa-save"></i> Save All Settings
                </button>
                <button class="gcorp-btn gcorp-btn-outline" onclick="GCorpBookingManager.resetSettings()">
                    <i class="fas fa-undo"></i> Reset to Defaults
                </button>
            </div>
        `;
        
        // Add event listeners to settings
        document.querySelectorAll('.gcorp-switch input').forEach(switchEl => {
            switchEl.addEventListener('change', function() {
                const settingId = this.id.replace('gcorp-setting-', '');
                followupSettings[settingId] = this.checked;
            });
        });
    }

    // Enhanced Timeline Tab with Follow-up Integration
    function populateTimelineTab(item) {
        const tabContent = document.getElementById('gcorp-tab-timeline');
        
        tabContent.innerHTML = `
            <h4><i class="fas fa-history"></i> Complete Booking Timeline</h4>
            <p style="margin-bottom: 20px; color: #6c757d;">
                Tracking all activities from booking to follow-up nurturing
            </p>
            
            <div class="gcorp-timeline-detail">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                    <div>
                        <strong>Booking Created</strong>
                        <p style="color: #6c757d; font-size: 14px;">${item.timeline[0].date} ${item.timeline[0].time}</p>
                    </div>
                    <div>
                        <strong>Last Activity</strong>
                        <p style="color: #6c757d; font-size: 14px;">${item.timeline[item.timeline.length - 1].date} ${item.timeline[item.timeline.length - 1].time}</p>
                    </div>
                    <div>
                        <strong>Next Follow-up</strong>
                        <p style="color: #28a745; font-size: 14px;">${item.nextFollowup}</p>
                    </div>
                    <div>
                        <strong>Lead Score</strong>
                        <p style="color: #764ba2; font-size: 14px; font-weight: bold;">${item.leadScore}/100</p>
                    </div>
                </div>
                
                <div class="gcorp-horizontal-timeline">
                    ${item.timeline.map((step, index) => {
                        let statusClass = '';
                        let statusIcon = '';
                        let followupBadge = '';
                        
                        switch(step.status) {
                            case 'completed': statusClass = 'gcorp-completed'; statusIcon = '<i class="fas fa-check"></i>'; break;
                            case 'in-progress': statusClass = 'gcorp-in-progress'; statusIcon = '<i class="fas fa-spinner"></i>'; break;
                            case 'scheduled': statusClass = 'gcorp-scheduled'; statusIcon = '<i class="fas fa-clock"></i>'; break;
                            case 'failed': statusClass = 'gcorp-failed'; statusIcon = '<i class="fas fa-times"></i>'; break;
                            default: statusClass = 'gcorp-pending'; statusIcon = '<i class="far fa-clock"></i>';
                        }
                        
                        if (step.followupId) {
                            const followup = item.followupActions.find(f => f.id === step.followupId);
                            if (followup) {
                                followupBadge = `<span class="gcorp-followup-badge" style="background: ${getCategoryColor(followup.category)}">${followup.category}</span>`;
                            }
                        }
                        
                        return `
                            <div class="gcorp-timeline-step ${statusClass}">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <h5>${step.step} ${followupBadge}</h5>
                                    <span style="font-size: 12px; color: #6c757d;">Step ${index + 1}</span>
                                </div>
                                <p>${statusIcon} ${step.status.charAt(0).toUpperCase() + step.status.slice(1)}</p>
                                <p style="font-size: 12px;">${step.date}</p>
                                <p class="gcorp-time">${step.time}</p>
                                ${step.followupId ? 
                                    `<button class="gcorp-btn gcorp-btn-sm gcorp-btn-outline" style="margin-top: 5px;" onclick="GCorpBookingManager.triggerFollowupNow('${step.followupId}', '${item.id}')">
                                        <i class="fas fa-play"></i> Trigger Now
                                    </button>` : ''
                                }
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div style="margin-top: 30px;">
                    <h5><i class="fas fa-chart-bar"></i> Timeline Analytics</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 20px; font-weight: bold;">${item.timeline.filter(s => s.status === 'completed').length}</div>
                            <div style="font-size: 12px; color: #6c757d;">Completed Steps</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 20px; font-weight: bold;">${item.timeline.filter(s => s.type === 'followup').length}</div>
                            <div style="font-size: 12px; color: #6c757d;">Follow-ups</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 20px; font-weight: bold;">${calculateResponseRate(item)}%</div>
                            <div style="font-size: 12px; color: #6c757d;">Response Rate</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 20px; font-weight: bold;">${calculateConversionTime(item)}d</div>
                            <div style="font-size: 12px; color: #6c757d;">Avg. Conversion Time</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Filter table based on filters
    function filterTable() {
        let filteredData = [...sampleData];
        
        // Search filter
        const searchTerm = elements.searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredData = filteredData.filter(item => 
                item.client.toLowerCase().includes(searchTerm) ||
                item.id.toLowerCase().includes(searchTerm) ||
                item.address.toLowerCase().includes(searchTerm) ||
                item.serviceType.toLowerCase().includes(searchTerm)
            );
        }
        
        // Status filter
        const statusValue = elements.statusFilter.value;
        if (statusValue !== 'all') {
            filteredData = filteredData.filter(item => item.status === statusValue);
        }
        
        // Property filter
        const propertyValue = elements.propertyFilter.value;
        if (propertyValue !== 'all') {
            filteredData = filteredData.filter(item => item.propertyCategory === propertyValue);
        }
        
        // Date filter (simplified)
        const dateValue = elements.dateFilter.value;
        if (dateValue === 'today') {
            filteredData = filteredData.filter(item => item.date === '2024-11-28');
        } else if (dateValue === 'week') {
            filteredData = filteredData.filter(item => {
                const itemDate = new Date(item.date);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return itemDate >= weekAgo;
            });
        }
        
        // Cleaner filter
        const cleanerValue = elements.cleanerFilter.value;
        if (cleanerValue !== 'all') {
            filteredData = filteredData.filter(item => 
                item.cleanerAssigned.toLowerCase().includes(cleanerValue)
            );
        }
        
        // Populate filtered data
        populateTable(filteredData);
        updateCounts(filteredData.length);
    }

    // Update counts
    function updateCounts(filteredLength = null) {
        const total = sampleData.length;
        const showing = filteredLength || total;
        
        elements.showingCount.textContent = showing;
        elements.totalCount.textContent = total;
    }

    // Show Grey Line Modal
    function showGreylineModal(item) {
        const content = document.getElementById('gcorp-greyline-content');
        
        content.innerHTML = `
            <div class="gcorp-greyline-details">
                <i class="fas fa-info-circle" style="font-size: 48px; color: #6c757d; margin-bottom: 20px;"></i>
                <p>Click "View Details" in the Actions column to see the complete timeline and booking information.</p>
                <p style="font-size: 14px; color: #adb5bd;">Booking ID: ${item.id}</p>
                <p style="font-size: 14px; color: #adb5bd;">Client: ${item.client}</p>
                <p style="font-size: 14px; color: #adb5bd;">Deposit: ${item.deposit} (${item.depositStatus})</p>
            </div>
        `;
        
        elements.greylineModal.style.display = 'flex';
    }

    // Show Action Modal
    function showActionModal(item) {
        document.getElementById('gcorp-action-modal-title').textContent = `Booking: ${item.id}`;
        elements.actionModal.style.display = 'flex';
        
        // Populate all tabs
        populateTabContent('details', item);
        populateTabContent('invoice', item);
        populateTabContent('sync', item);
        populateTabContent('followup', item);
        populateTabContent('timeline', item);
        populateTabContent('lead-nurture', item);
        populateTabContent('followup-settings', item);
    }

    // Start QuickBooks Sync
    function startQuickbooksSync() {
        if (!currentBooking) return;
        
        elements.syncProgressModal.style.display = 'flex';
        
        const progressFill = document.getElementById('gcorp-progress-fill');
        const progressText = document.getElementById('gcorp-progress-text');
        const syncDetails = document.getElementById('gcorp-sync-details');
        
        // Reset progress
        progressFill.style.width = '0%';
        progressText.textContent = 'Initializing QuickBooks sync...';
        syncDetails.innerHTML = `<div class="gcorp-sync-log">Starting sync for ${currentBooking.id}...</div>`;
        
        // Simulate sync process
        let progress = 0;
        const steps = [
            { progress: 20, text: 'Connecting to QuickBooks Online...' },
            { progress: 40, text: 'Validating invoice data...' },
            { progress: 60, text: 'Creating invoice record...' },
            { progress: 80, text: 'Uploading line items...' },
            { progress: 95, text: 'Finalizing transaction...' },
            { progress: 100, text: 'Sync completed successfully!' }
        ];
        
        let currentStep = 0;
        
        const syncInterval = setInterval(() => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                progress = step.progress;
                progressFill.style.width = `${progress}%`;
                progressText.textContent = step.text;
                
                // Add log entry
                const logEntry = document.createElement('div');
                logEntry.className = 'gcorp-sync-log';
                logEntry.textContent = `${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${step.text}`;
                syncDetails.appendChild(logEntry);
                
                currentStep++;
                
                // If sync completed
                if (progress === 100) {
                    clearInterval(syncInterval);
                    
                    // Update the booking status
                    currentBooking.status = 'synced';
                    currentBooking.quickbooksSync = {
                        status: 'success',
                        date: new Date().toISOString().split('T')[0],
                        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                        invoiceId: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
                        lastSync: 'Just now'
                    };
                    
                    // Update the table
                    updateRowStatus(currentBooking.id, 'synced');
                    
                    // Close modal after delay
                    setTimeout(() => {
                        elements.syncProgressModal.style.display = 'none';
                        showToast(`Invoice ${currentBooking.id} synced to QuickBooks successfully!`, 'success');
                        
                        // Refresh the sync tab
                        populateTabContent('sync', currentBooking);
                    }, 1500);
                }
            }
        }, 800);
    }

    // Update row status after sync
    function updateRowStatus(id, newStatus) {
        const row = document.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            const statusCell = row.cells[6];
            let newBadge = '';
            
            switch(newStatus) {
                case 'synced':
                    newBadge = '<span class="gcorp-status-badge gcorp-status-synced">QuickBooks Synced</span>';
                    break;
                case 'failed':
                    newBadge = '<span class="gcorp-status-badge gcorp-status-failed">Sync Failed</span>';
                    break;
            }
            
            statusCell.innerHTML = newBadge;
            
            // Disable sync button
            const syncBtn = row.querySelector('.gcorp-action-btn.gcorp-sync');
            if (syncBtn) {
                syncBtn.disabled = true;
                syncBtn.innerHTML = '<i class="fas fa-check"></i>';
                syncBtn.style.opacity = '0.6';
            }
        }
    }

    // Helper Functions
    function calculateLeadStage(item) {
        const score = item.leadScore;
        if (score >= 90) return leadStages[3]; // Advocate
        if (score >= 75) return leadStages[2]; // Repeat Client
        if (score >= 50) return leadStages[1]; // Active Client
        if (score >= 30) return leadStages[0]; // New Lead
        return leadStages[4]; // At Risk
    }

    function getCategoryColor(category) {
        const colors = {
            'post-service': '#d1ecf1',
            'recurring': '#d4edda',
            'reputation': '#fff3cd',
            'seasonal': '#e2e3e5',
            'marketing': '#cce5ff',
            'pre-service': '#f8d7da',
            'onboarding': '#e2d9f3',
            'technical': '#d1d3e7'
        };
        return colors[category] || '#e9ecef';
    }

    function calculateResponseRate(item) {
        const followups = item.timeline.filter(s => s.type === 'followup');
        const completed = followups.filter(s => s.status === 'completed').length;
        return followups.length > 0 ? Math.round((completed / followups.length) * 100) : 0;
    }

    function calculateConversionTime(item) {
        // Simplified calculation - in real app, would calculate actual time differences
        return 22;
    }

    function calculateNextBookingChance(item) {
        // Based on lead score and history
        if (item.leadScore >= 90) return 85;
        if (item.leadScore >= 75) return 68;
        if (item.leadScore >= 50) return 45;
        return 22;
    }

    function calculateDaysToNextBooking(item) {
        // Based on service type and lead score
        if (item.serviceType.includes('Maintenance')) return 30;
        if (item.serviceType.includes('Regular')) return 14;
        return 22;
    }

    function calculateRecommendedFollowups(item) {
        // Based on pending followups
        return item.followupActions.filter(f => f.status === 'pending' || f.status === 'scheduled').length;
    }

    function loadFollowupTemplates() {
        // Load from localStorage or use defaults
        const saved = localStorage.getItem('gcorp_followup_templates');
        if (saved) {
            return JSON.parse(saved);
        }
        return followupTemplates;
    }

    // Action Functions (Public API)
    function createNewFollowup(bookingId) {
        const type = document.getElementById('gcorp-new-followup-type').value;
        const templateId = document.getElementById('gcorp-new-followup-template').value;
        const message = document.getElementById('gcorp-new-followup-message').value;
        const date = document.getElementById('gcorp-new-followup-date').value;
        const time = document.getElementById('gcorp-new-followup-time').value;
        const trigger = document.getElementById('gcorp-new-followup-trigger').value;
        
        if (!type || !message) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        const newFollowup = {
            id: `FU${Date.now()}`,
            name: `Custom Follow-up ${new Date(date).toLocaleDateString()}`,
            type: type,
            category: 'custom',
            status: 'scheduled',
            scheduled: `${date} ${time}`,
            trigger: trigger,
            message: message
        };
        
        // Add to booking
        const booking = sampleData.find(b => b.id === bookingId);
        if (booking) {
            booking.followupActions.push(newFollowup);
            booking.timeline.push({
                step: `Custom Follow-up Created: ${type}`,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                status: 'scheduled',
                type: 'followup',
                followupId: newFollowup.id
            });
            
            // Update UI
            populateFollowupTab(booking);
            showToast('New follow-up created successfully!', 'success');
        }
    }

    function editFollowup(followupId, bookingId) {
        const booking = sampleData.find(b => b.id === bookingId);
        if (!booking) return;
        
        const followup = booking.followupActions.find(f => f.id === followupId);
        if (!followup) return;
        
        // Show edit modal or form
        const newMessage = prompt('Edit follow-up message:', followup.message || '');
        if (newMessage !== null) {
            followup.message = newMessage;
            populateFollowupTab(booking);
            showToast('Follow-up updated successfully!', 'success');
        }
    }

    function deleteFollowup(followupId, bookingId) {
        if (!confirm('Are you sure you want to delete this follow-up?')) return;
        
        const booking = sampleData.find(b => b.id === bookingId);
        if (!booking) return;
        
        booking.followupActions = booking.followupActions.filter(f => f.id !== followupId);
        booking.timeline = booking.timeline.filter(t => t.followupId !== followupId);
        
        populateFollowupTab(booking);
        showToast('Follow-up deleted successfully!', 'success');
    }

    function runAllFollowups(bookingId) {
        const booking = sampleData.find(b => b.id === bookingId);
        if (!booking) return;
        
        let completed = 0;
        booking.followupActions.forEach(followup => {
            if (followup.status === 'scheduled') {
                followup.status = 'completed';
                completed++;
                
                // Add to timeline
                booking.timeline.push({
                    step: `Follow-up Executed: ${followup.name}`,
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    status: 'completed',
                    type: 'followup',
                    followupId: followup.id
                });
            }
        });
        
        populateFollowupTab(booking);
        showToast(`${completed} follow-ups executed successfully!`, 'success');
    }

    function loadTemplate(templateId, bookingId) {
        const template = followupTemplates.find(t => t.id === templateId);
        if (!template) return;
        
        const booking = sampleData.find(b => b.id === bookingId);
        if (!booking) return;
        
        let message = template.defaultMessage;
        message = message.replace('[client_name]', booking.client);
        message = message.replace('[service_type]', booking.serviceType);
        message = message.replace('[cleaner_team]', booking.cleanerAssigned);
        message = message.replace('[service_date]', booking.date);
        message = message.replace('[property_type]', booking.propertyType);
        message = message.replace('[last_service_date]', booking.date);
        
        document.getElementById('gcorp-new-followup-message').value = message;
    }

    function saveAsTemplate(bookingId) {
        const message = document.getElementById('gcorp-new-followup-message').value;
        const type = document.getElementById('gcorp-new-followup-type').value;
        
        if (!message || !type) {
            showToast('Please fill in all fields before saving as template', 'error');
            return;
        }
        
        const newTemplate = {
            id: `TEMP${Date.now()}`,
            name: `Custom Template ${new Date().toLocaleDateString()}`,
            type: type,
            category: 'custom',
            defaultMessage: message,
            variables: ['client_name', 'service_type'],
            mandatory: false
        };
        
        followupTemplates.push(newTemplate);
        localStorage.setItem('gcorp_followup_templates', JSON.stringify(followupTemplates));
        
        showToast('Template saved successfully!', 'success');
    }

    function executeStageAction(bookingId, stageId) {
        const stage = leadStages.find(s => s.id === stageId);
        if (!stage) return;
        
        showToast(`Executing ${stage.name} actions...`, 'info');
        
        // In real app, this would trigger specific actions
        setTimeout(() => {
            showToast(`${stage.actions.length} actions executed for ${stage.name} stage`, 'success');
        }, 1000);
    }

    function createFollowupFromSuggestion(action, bookingId) {
        const booking = sampleData.find(b => b.id === bookingId);
        if (!booking) return;
        
        const newFollowup = {
            id: `FU${Date.now()}`,
            name: action,
            type: 'custom',
            category: 'marketing',
            status: 'scheduled',
            scheduled: getNextWeekDate() + ' 10:00',
            trigger: '7_days_after',
            message: `Automated follow-up for: ${action}`
        };
        
        booking.followupActions.push(newFollowup);
        populateFollowupTab(booking);
        showToast(`Follow-up created from suggestion: ${action}`, 'success');
    }

    function triggerFollowupNow(followupId, bookingId) {
        const booking = sampleData.find(b => b.id === bookingId);
        if (!booking) return;
        
        const followup = booking.followupActions.find(f => f.id === followupId);
        if (!followup) return;
        
        followup.status = 'completed';
        booking.timeline.push({
            step: `Follow-up Triggered Manually: ${followup.name}`,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: 'completed',
            type: 'followup',
            followupId: followup.id
        });
        
        showToast(`Follow-up "${followup.name}" triggered successfully!`, 'success');
        
        // Update timeline tab if open
        if (document.getElementById('gcorp-tab-timeline').classList.contains('gcorp-active')) {
            populateTimelineTab(booking);
        }
    }

    function saveSettings() {
        localStorage.setItem('gcorp_followup_settings', JSON.stringify(followupSettings));
        showToast('Settings saved successfully!', 'success');
    }

    function resetSettings() {
        if (confirm('Reset all settings to defaults?')) {
            followupSettings = {
                automationEnabled: true,
                autoSendThankYou: true,
                autoScheduleSurvey: true,
                autoOfferMaintenance: false,
                autoRequestReview: true,
                emailReminders: true,
                smsReminders: false,
                leadScoring: true,
                defaultFollowups: ["TEMP001", "TEMP002", "TEMP004"]
            };
            populateSettingsTab();
            showToast('Settings reset to defaults', 'info');
        }
    }

    // Utility Functions
    function getNextWeekDate() {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split('T')[0];
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `gcorp-toast gcorp-toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'gcorpSlideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // Export to CSV
    function exportToCSV() {
        const headers = ['ID', 'Client', 'Service Type', 'Property Category', 'Cleaner', 'Status', 'Address', 'Deposit', 'Estimated Price'];
        const rows = sampleData.map(item => [
            item.id,
            item.client,
            item.serviceType,
            item.propertyCategory,
            item.cleanerAssigned,
            item.status,
            item.address,
            item.deposit,
            item.estimatedPrice
        ]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `gcorp-bookings-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        showToast('Data exported to CSV successfully!', 'success');
    }

    // Add new booking
    function addNewBooking() {
        showToast('Opening new booking form...', 'info');
        // In a real application, this would open a modal or redirect to a form
    }

    // Action functions
    function sendInvoice(id) {
        showToast(`Invoice ${id} sent to client successfully!`, 'success');
    }

    function saveInvoice(id) {
        showToast(`Invoice ${id} saved as draft!`, 'info');
    }

    function previewInvoice(id) {
        showToast(`Opening preview for invoice ${id}...`, 'info');
        window.open(`/preview/${id}`, '_blank');
    }

    // Public API
    return {
        init,
        sendInvoice,
        saveInvoice,
        previewInvoice,
        createNewFollowup,
        editFollowup,
        deleteFollowup,
        runAllFollowups,
        loadTemplate,
        saveAsTemplate,
        executeStageAction,
        createFollowupFromSuggestion,
        triggerFollowupNow,
        saveSettings,
        resetSettings,
        startQuickbooksSync,
        addNewBooking,
        exportToCSV,
        populateFollowupTab,
        populateLeadNurtureTab,
        populateSettingsTab,
        populateTimelineTab
    };
})();

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    GCorpBookingManager.init();
});