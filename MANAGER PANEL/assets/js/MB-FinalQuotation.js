// Sample Data for 10 quotations (Updated with consistent structure)
const sampleQuotations = [
    {
        id: "QT001",
        clientName: "Jane Doe",
        serviceType: "Move-Out Cleaning",
        dateTime: "Nov 10, 2025 - 10:00 AM",
        address: "25 Jupiter St., Canada City",
        estimatedPrice: "$994.35",
        status: "visit_completed",
        supervisor: "John Smith",
        contact: "+63 912 345 6789",
        email: "jane.doe@example.com",
        recurrence: "Weekly",
        subtotal: 947.00,
        tax: 47.35,
        upsells: 0,
        finalTotal: 994.35,
        siteNotes: "Client requested detailed carpet cleaning. Property well-maintained, requires deep clean for kitchen and living area. Additional staining found in master bedroom carpet.",
        specialInstructions: "Client has pets (2 cats). Use eco-friendly products only. Side gate access required.",
        taskList: "✓ Carpet steam cleaning in all rooms\n✓ Deep clean kitchen appliances (oven, refrigerator)\n✓ Wash and sanitize bathrooms (2)\n✓ Window cleaning (interior only)\n✓ Floor mopping and vacuuming\n✓ Dusting of all surfaces\n✓ Empty all trash bins",
        internalNotes: "Ensure all optional tasks are included in final invoice\nClient requested eco-friendly cleaning products\nSpecial attention to master bedroom carpet stain\nBackyard access through side gate - key provided\nPet owner - be mindful of allergies\nSchedule morning crew for this booking",
        photos: [
            { src: "https://placehold.co/400x300/2c5aa0/ffffff?text=Living+Room", title: "Living Room" },
            { src: "https://placehold.co/400x300/10b981/ffffff?text=Kitchen", title: "Kitchen" },
            { src: "https://placehold.co/400x300/f59e0b/ffffff?text=Bedroom", title: "Bedroom" },
            { src: "https://placehold.co/400x300/dc3545/ffffff?text=Carpet+Stain", title: "Carpet Stain" }
        ],
        estimationItems: [
            { category: "Steam Clean Services", items: [
                { item: "Carpets - Large Room 10x10", qty: 1, unitPrice: "$75.00", total: "$75.00" },
                { item: "Carpets - Regular Room 8x8", qty: 2, unitPrice: "$60.00", total: "$120.00" },
                { item: "Rug - Area Rug", qty: 1, unitPrice: "$30.00", total: "$30.00" },
                { item: "Stair Flight (5 flights)", qty: 5, unitPrice: "$5.00", total: "$25.00" }
            ]},
            { category: "Maintenance Clean", items: [
                { item: "Kitchen (Large, 3 hrs)", qty: 1, unitPrice: "$38/hr", total: "$114.00" },
                { item: "Bathroom (2.5 hrs)", qty: 1, unitPrice: "$38/hr", total: "$95.00" },
                { item: "Bedroom (1 hr)", qty: 1, unitPrice: "$38/hr", total: "$38.00" }
            ]},
            { category: "Move Out Clean", items: [
                { item: "Deep Clean (9 hrs)", qty: 1, unitPrice: "$50/hr", total: "$450.00" }
            ]}
        ],
        upsellingOptions: [
            { id: "deepClean", name: "Add Deep Clean Service", description: "Intensive cleaning including hard-to-reach areas and detailed sanitization", price: 120, selected: false },
            { id: "carpetProtect", name: "Add Carpet Protection Treatment", description: "Professional-grade stain protection for carpets (lasts 6 months)", price: 60, selected: false },
            { id: "windowExterior", name: "Add Exterior Window Cleaning", description: "Professional exterior window cleaning (ground floor only)", price: 85, selected: false },
            { id: "furniturePolish", name: "Add Furniture Polishing", description: "Professional furniture polishing and protection", price: 45, selected: false }
        ]
    },
    {
        id: "QT002",
        clientName: "Robert Johnson",
        serviceType: "Deep Cleaning",
        dateTime: "Nov 12, 2025 - 2:00 PM",
        address: "42 Maple Ave, Springfield",
        estimatedPrice: "$1,245.50",
        status: "pending_review",
        supervisor: "Sarah Williams",
        contact: "+63 923 456 7890",
        email: "robert.j@example.com",
        recurrence: "Monthly",
        subtotal: 1186.19,
        tax: 59.31,
        upsells: 0,
        finalTotal: 1245.50,
        siteNotes: "Property is 3-bedroom with large living area. Requires extensive cleaning due to recent renovation.",
        specialInstructions: "Use non-toxic cleaning products. Client has allergies.",
        taskList: "✓ Deep clean all rooms\n✓ Kitchen degreasing\n✓ Bathroom sanitization\n✓ Window cleaning\n✓ Carpet shampooing",
        photos: [
            { src: "https://placehold.co/400x300/2c5aa0/ffffff?text=Living+Area", title: "Living Area" },
            { src: "https://placehold.co/400x300/10b981/ffffff?text=Kitchen", title: "Kitchen" }
        ],
        estimationItems: [
            { category: "Deep Cleaning Services", items: [
                { item: "Deep Clean - Living Room", qty: 1, unitPrice: "$150.00", total: "$150.00" },
                { item: "Deep Clean - Kitchen", qty: 1, unitPrice: "$200.00", total: "$200.00" },
                { item: "Deep Clean - Bathrooms (3)", qty: 3, unitPrice: "$100.00", total: "$300.00" }
            ]}
        ],
        upsellingOptions: [
            { id: "deepClean", name: "Add Deep Clean Service", description: "Intensive cleaning including hard-to-reach areas", price: 120, selected: false }
        ]
    },
    {
        id: "QT003",
        clientName: "Maria Garcia",
        serviceType: "Regular Cleaning",
        dateTime: "Nov 15, 2025 - 9:00 AM",
        address: "88 Oak Street, Metro City",
        estimatedPrice: "$525.75",
        status: "quotation_sent",
        supervisor: "Michael Brown",
        contact: "+63 934 567 8901",
        email: "maria.g@example.com",
        recurrence: "Weekly",
        subtotal: 500.71,
        tax: 25.04,
        upsells: 0,
        finalTotal: 525.75,
        siteNotes: "Standard maintenance clean. Apartment in good condition.",
        specialInstructions: "Focus on kitchen and bathrooms. No pets.",
        taskList: "✓ Kitchen cleaning\n✓ Bathroom sanitization\n✓ Dusting\n✓ Vacuuming",
        photos: [
            { src: "https://placehold.co/400x300/2c5aa0/ffffff?text=Apartment", title: "Apartment" }
        ],
        estimationItems: [
            { category: "Regular Cleaning", items: [
                { item: "Weekly Cleaning - 2 hrs", qty: 2, unitPrice: "$38/hr", total: "$76.00" }
            ]}
        ],
        upsellingOptions: []
    },
    {
        id: "QT004",
        clientName: "James Wilson",
        serviceType: "Carpet Cleaning",
        dateTime: "Nov 18, 2025 - 11:00 AM",
        address: "123 Pine Road, Green Valley",
        estimatedPrice: "$385.25",
        status: "revision_requested",
        supervisor: "Lisa Taylor",
        contact: "+63 945 678 9012",
        email: "james.w@example.com",
        recurrence: "One-time",
        subtotal: 367.86,
        tax: 18.39,
        upsells: 0,
        finalTotal: 385.25,
        siteNotes: "Carpets heavily stained in living room and bedrooms. Requires special treatment.",
        specialInstructions: "Test cleaning solution in hidden area first.",
        taskList: "✓ Carpet steam cleaning\n✓ Stain treatment\n✓ Drying",
        photos: [
            { src: "https://placehold.co/400x300/dc3545/ffffff?text=Stained+Carpet", title: "Stained Carpet" }
        ],
        estimationItems: [
            { category: "Carpet Cleaning", items: [
                { item: "Carpet Cleaning - Living Room", qty: 1, unitPrice: "$150.00", total: "$150.00" },
                { item: "Stain Treatment", qty: 3, unitPrice: "$25.00", total: "$75.00" }
            ]}
        ],
        upsellingOptions: [
            { id: "carpetProtect", name: "Carpet Protection", description: "Stain protection treatment", price: 60, selected: false }
        ]
    },
    {
        id: "QT005",
        clientName: "Emily Chen",
        serviceType: "Move-Out Cleaning",
        dateTime: "Nov 20, 2025 - 8:30 AM",
        address: "55 Cedar Lane, Westside",
        estimatedPrice: "$1,120.80",
        status: "approved",
        supervisor: "David Miller",
        contact: "+63 956 789 0123",
        email: "emily.c@example.com",
        recurrence: "One-time",
        subtotal: 1067.43,
        tax: 53.37,
        upsells: 0,
        finalTotal: 1120.80,
        siteNotes: "Property vacant. Requires full move-out cleaning for inspection.",
        specialInstructions: "Landlord will be present during cleaning.",
        taskList: "✓ Full house deep clean\n✓ Appliance cleaning\n✓ Window washing\n✓ Carpet cleaning",
        photos: [],
        estimationItems: [
            { category: "Move-Out Cleaning", items: [
                { item: "Complete Move-Out Clean", qty: 1, unitPrice: "$850.00", total: "$850.00" },
                { item: "Carpet Cleaning", qty: 1, unitPrice: "$150.00", total: "$150.00" }
            ]}
        ],
        upsellingOptions: []
    },
    {
        id: "QT006",
        clientName: "Thomas Anderson",
        serviceType: "Commercial Cleaning",
        dateTime: "Nov 22, 2025 - 6:00 PM",
        address: "789 Business Blvd, Downtown",
        estimatedPrice: "$2,450.00",
        status: "pending_review",
        supervisor: "Jessica Lee",
        contact: "+63 967 890 1234",
        email: "thomas.a@example.com",
        recurrence: "Monthly",
        subtotal: 2333.33,
        tax: 116.67,
        upsells: 0,
        finalTotal: 2450.00,
        siteNotes: "Office building, 5 floors. Requires after-hours cleaning.",
        specialInstructions: "Security clearance required. Contact building manager.",
        taskList: "✓ Office cleaning\n✓ Restroom sanitization\n✓ Trash removal\n✓ Floor maintenance",
        photos: [],
        estimationItems: [
            { category: "Commercial Cleaning", items: [
                { item: "Monthly Contract - 5 floors", qty: 1, unitPrice: "$2000.00", total: "$2000.00" }
            ]}
        ],
        upsellingOptions: []
    },
    {
        id: "QT007",
        clientName: "Sophia Martinez",
        serviceType: "Regular Cleaning",
        dateTime: "Nov 25, 2025 - 10:00 AM",
        address: "321 Elm Street, North Park",
        estimatedPrice: "$450.50",
        status: "quotation_sent",
        supervisor: "Kevin Davis",
        contact: "+63 978 901 2345",
        email: "sophia.m@example.com",
        recurrence: "Weekly",
        subtotal: 429.05,
        tax: 21.45,
        upsells: 0,
        finalTotal: 450.50,
        siteNotes: "Small apartment, regular maintenance cleaning.",
        specialInstructions: "Client prefers morning appointments.",
        taskList: "✓ Kitchen clean\n✓ Bathroom sanitize\n✓ Dusting\n✓ Vacuuming",
        photos: [],
        estimationItems: [
            { category: "Regular Cleaning", items: [
                { item: "Weekly Cleaning", qty: 1, unitPrice: "$180.00", total: "$180.00" }
            ]}
        ],
        upsellingOptions: []
    },
    {
        id: "QT008",
        clientName: "William Clark",
        serviceType: "Deep Cleaning",
        dateTime: "Nov 28, 2025 - 1:00 PM",
        address: "654 Birch Court, Eastside",
        estimatedPrice: "$875.25",
        status: "visit_completed",
        supervisor: "Amanda White",
        contact: "+63 989 012 3456",
        email: "william.c@example.com",
        recurrence: "One-time",
        subtotal: 833.57,
        tax: 41.68,
        upsells: 0,
        finalTotal: 875.25,
        siteNotes: "Home recently vacated by tenants. Requires deep cleaning before new tenants.",
        specialInstructions: "Focus on kitchen appliances and bathrooms.",
        taskList: "✓ Deep clean kitchen\n✓ Bathroom sanitization\n✓ Carpet cleaning\n✓ Window washing",
        photos: [],
        estimationItems: [
            { category: "Deep Cleaning", items: [
                { item: "Deep Clean - Whole House", qty: 1, unitPrice: "$700.00", total: "$700.00" }
            ]}
        ],
        upsellingOptions: []
    },
    {
        id: "QT009",
        clientName: "Olivia Taylor",
        serviceType: "Carpet Cleaning",
        dateTime: "Nov 30, 2025 - 3:00 PM",
        address: "987 Walnut Way, Southgate",
        estimatedPrice: "$625.40",
        status: "rejected",
        supervisor: "Brian Wilson",
        contact: "+63 990 123 4567",
        email: "olivia.t@example.com",
        recurrence: "One-time",
        subtotal: 595.62,
        tax: 29.78,
        upsells: 0,
        finalTotal: 625.40,
        siteNotes: "Client cancelled booking after site visit.",
        specialInstructions: "No special instructions.",
        taskList: "✓ Carpet cleaning\n✓ Stain removal",
        photos: [],
        estimationItems: [],
        upsellingOptions: []
    },
    {
        id: "QT010",
        clientName: "Daniel Lee",
        serviceType: "Move-Out Cleaning",
        dateTime: "Dec 2, 2025 - 9:00 AM",
        address: "147 Spruce Street, Riverside",
        estimatedPrice: "$1,350.75",
        status: "pending_review",
        supervisor: "Rachel Kim",
        contact: "+63 901 234 5678",
        email: "daniel.l@example.com",
        recurrence: "One-time",
        subtotal: 1286.43,
        tax: 64.32,
        upsells: 0,
        finalTotal: 1350.75,
        siteNotes: "Large family home, 4 bedrooms. Requires extensive cleaning.",
        specialInstructions: "Family will be moving during cleaning day.",
        taskList: "✓ Full house cleaning\n✓ Appliance deep clean\n✓ Carpet shampooing\n✓ Window cleaning",
        photos: [],
        estimationItems: [
            { category: "Move-Out Cleaning", items: [
                { item: "Complete Move-Out Service", qty: 1, unitPrice: "$1200.00", total: "$1200.00" }
            ]}
        ],
        upsellingOptions: []
    }
];

// Global variables
let currentPage = 1;
let itemsPerPage = 10;
let filteredQuotations = [...sampleQuotations];
let currentQuotationId = null;
let modalInstance = null;

// DOM Elements
const quotationsTableBody = document.getElementById('quotationsTableBody');
const detailModal = document.getElementById('detailModal');
const modalTabs = document.getElementById('modalTabs');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const statusFilter = document.getElementById('statusFilter');
const serviceFilter = document.getElementById('serviceFilter');
const dateFilter = document.getElementById('dateFilter');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const itemsPerPageSelect = document.getElementById('itemsPerPage');
const refreshBtn = document.getElementById('refreshBtn');
const exportBtn = document.getElementById('exportBtn');
const messageToast = document.getElementById('messageToast');
const toastText = document.getElementById('toastText');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Quotation Management System...');
    initializeTable();
    setupEventListeners();
    updatePagination();
    updateStats();
    console.log('Initialization complete. Loaded', sampleQuotations.length, 'quotations.');
});

// Initialize quotations table
function initializeTable() {
    renderTableRows();
}

// Render table rows based on current page and filters
function renderTableRows() {
    quotationsTableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentQuotations = filteredQuotations.slice(startIndex, endIndex);
    
    if (currentQuotations.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="8" class="text-center py-4">
                <i class="fas fa-search fa-2x text-muted mb-3"></i>
                <p class="text-muted">No quotations found matching your criteria.</p>
            </td>
        `;
        quotationsTableBody.appendChild(row);
        return;
    }
    
    currentQuotations.forEach(quotation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${quotation.id}</strong></td>
            <td>${quotation.clientName}</td>
            <td>${quotation.serviceType}</td>
            <td>${quotation.dateTime}</td>
            <td>${quotation.address}</td>
            <td><strong>${quotation.estimatedPrice}</strong></td>
            <td><span class="mbqf-status-badge ${quotation.status}">${quotation.status.replace('_', ' ')}</span></td>
            <td>
                <div class="mbqf-table-actions-cell">
                    <button class="mbqf-action-btn small mbqf-view" onclick="viewQuotation('${quotation.id}')" title="View Details">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="mbqf-action-btn small mbqf-edit" onclick="editQuotation('${quotation.id}')" title="Edit Quotation">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </td>
        `;
        quotationsTableBody.appendChild(row);
    });
    
    // Update pagination info
    const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages || 1;
    
    // Enable/disable pagination buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Setup event listeners
function setupEventListeners() {
    // Modal tabs
    if (modalTabs) {
        modalTabs.addEventListener('click', function(e) {
            if (e.target.classList.contains('mbqf-tab-btn')) {
                // Remove active class from all tabs
                document.querySelectorAll('.mbqf-tab-btn').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.mbqf-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected tab content
                const tabId = e.target.getAttribute('data-tab');
                const tabContent = document.getElementById(`${tabId}Tab`);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            }
        });
    }
    
    // Filters
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    // Pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderTableRows();
                updatePagination();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTableRows();
                updatePagination();
            }
        });
    }
    
    // Items per page
    if (itemsPerPageSelect) {
        itemsPerPageSelect.addEventListener('change', function() {
            itemsPerPage = parseInt(this.value);
            currentPage = 1;
            renderTableRows();
            updatePagination();
        });
    }
    
    // Refresh button
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            showToast('Data refreshed successfully!', 'success');
            applyFilters();
        });
    }
    
    // Export button
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    
    // Modal action buttons
    const generateBtn = document.getElementById('generateQuotationBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateQuotation);
    }
    
    const reviseBtn = document.getElementById('requestRevisionBtn');
    if (reviseBtn) {
        reviseBtn.addEventListener('click', requestRevision);
    }
    
    const rejectBtn = document.getElementById('rejectBookingBtn');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', rejectBooking);
    }
    
    const saveBtn = document.getElementById('saveChangesBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveChanges);
    }
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && detailModal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Apply filters to quotations
function applyFilters() {
    const status = statusFilter.value;
    const service = serviceFilter.value;
    const date = dateFilter.value;
    
    filteredQuotations = sampleQuotations.filter(quotation => {
        let matches = true;
        
        // Filter by status
        if (status !== 'all' && quotation.status !== status) {
            matches = false;
        }
        
        // Filter by service type
        if (service !== 'all') {
            const serviceType = quotation.serviceType.toLowerCase();
            if (service === 'move_out' && !serviceType.includes('move-out')) matches = false;
            if (service === 'deep_clean' && !serviceType.includes('deep')) matches = false;
            if (service === 'regular' && !serviceType.includes('regular')) matches = false;
            if (service === 'carpet' && !serviceType.includes('carpet')) matches = false;
            if (service === 'commercial' && !serviceType.includes('commercial')) matches = false;
        }
        
        // Filter by date
        if (date) {
            const filterDate = new Date(date);
            const filterDateStr = filterDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
            
            // Check if the quotation date contains the date string
            if (!quotation.dateTime.includes(filterDateStr.split(' ')[0])) {
                matches = false;
            }
        }
        
        return matches;
    });
    
    currentPage = 1;
    renderTableRows();
    updatePagination();
    updateStats();
    
    showToast(`Found ${filteredQuotations.length} quotation(s)`, 'info');
}

// Reset all filters
function resetFilters() {
    statusFilter.value = 'all';
    serviceFilter.value = 'all';
    dateFilter.value = '';
    
    filteredQuotations = [...sampleQuotations];
    currentPage = 1;
    renderTableRows();
    updatePagination();
    updateStats();
    
    showToast('Filters reset successfully!', 'info');
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);
    if (totalPagesSpan) {
        totalPagesSpan.textContent = totalPages || 1;
    }
    
    if (prevPageBtn) {
        prevPageBtn.disabled = currentPage === 1;
        prevPageBtn.classList.toggle('disabled', currentPage === 1);
    }
    
    if (nextPageBtn) {
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        nextPageBtn.classList.toggle('disabled', currentPage === totalPages || totalPages === 0);
    }
}

// Update statistics
function updateStats() {
    const total = filteredQuotations.length;
    const pending = filteredQuotations.filter(q => q.status === 'pending_review' || q.status === 'visit_completed').length;
    const sent = filteredQuotations.filter(q => q.status === 'quotation_sent').length;
    
    if (document.getElementById('totalQuotations')) {
        document.getElementById('totalQuotations').textContent = total;
    }
    
    const pendingElement = document.querySelector('.mbqf-stat-value.mbqf-pending');
    if (pendingElement) {
        pendingElement.textContent = pending;
    }
    
    const sentElement = document.querySelector('.mbqf-stat-value.mbqf-sent');
    if (sentElement) {
        sentElement.textContent = sent;
    }
}

// View quotation details
function viewQuotation(quotationId) {
    const quotation = sampleQuotations.find(q => q.id === quotationId);
    if (!quotation) {
        showToast('Quotation not found!', 'danger');
        return;
    }
    
    currentQuotationId = quotationId;
    
    // Populate modal with quotation data
    const setElementValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value || '';
    };
    
    const setInputValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.value = value || '';
    };
    
    setElementValue('modalClientName', quotation.clientName);
    setElementValue('modalClientContact', quotation.contact);
    setElementValue('modalClientEmail', quotation.email);
    setElementValue('modalClientAddress', quotation.address);
    setElementValue('modalServiceType', quotation.serviceType);
    setElementValue('modalRecurrence', quotation.recurrence);
    setElementValue('modalBookingDate', quotation.dateTime);
    setElementValue('modalSupervisor', quotation.supervisor || 'John Smith');
    setElementValue('modalStatus', quotation.status);
    
    const statusElement = document.getElementById('modalStatus');
    if (statusElement) {
        statusElement.className = `mbqf-status-badge ${quotation.status}`;
        statusElement.textContent = quotation.status.replace('_', ' ');
    }
    
    setInputValue('modalTaskList', quotation.taskList || '');
    setElementValue('modalSubtotal', `$${quotation.subtotal.toFixed(2)}`);
    setElementValue('modalTax', `$${quotation.tax.toFixed(2)}`);
    setElementValue('modalUpsells', `$${quotation.upsells.toFixed(2)}`);
    setElementValue('modalFinalTotal', `$${quotation.finalTotal.toFixed(2)}`);
    setInputValue('modalSiteNotes', quotation.siteNotes || '');
    setInputValue('modalSpecialInstructions', quotation.specialInstructions || '');
    setInputValue('modalInternalNotes', quotation.internalNotes || '');
    
    const estimateInput = document.getElementById('modalUpdatedEstimate');
    if (estimateInput) {
        const estimateRange = quotation.finalTotal * 0.85; // 85% of final total for lower bound
        estimateInput.value = `$${estimateRange.toFixed(2)} - $${quotation.finalTotal.toFixed(2)} (before tax)`;
    }
    
    // Set estimation items
    renderEstimationItems(quotation.estimationItems);
    
    // Set photos
    renderPhotos(quotation.photos);
    
    // Set upselling options
    renderUpsellingOptions(quotation.upsellingOptions);
    
    // Open modal using Bootstrap
    if (typeof bootstrap !== 'undefined') {
        if (!modalInstance) {
            modalInstance = new bootstrap.Modal(detailModal);
        }
        modalInstance.show();
    } else {
        // Fallback if Bootstrap not available
        detailModal.style.display = 'block';
        detailModal.classList.add('show');
    }
    
    // Show first tab
    document.querySelectorAll('.mbqf-tab-btn').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.mbqf-tab-content').forEach(content => content.classList.remove('active'));
    
    const overviewTabBtn = document.querySelector('[data-tab="overview"]');
    const overviewTab = document.getElementById('overviewTab');
    
    if (overviewTabBtn) overviewTabBtn.classList.add('active');
    if (overviewTab) overviewTab.classList.add('active');
}

// Edit quotation
function editQuotation(quotationId) {
    viewQuotation(quotationId);
    
    // Switch to edit mode (estimation tab)
    const estimationTabBtn = document.querySelector('[data-tab="estimation"]');
    if (estimationTabBtn) {
        estimationTabBtn.click();
    }
    
    showToast('Edit mode activated. Make your changes and click Save.', 'info');
}

// Close modal
function closeModal() {
    if (modalInstance) {
        modalInstance.hide();
    } else if (typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(detailModal);
        if (modal) {
            modal.hide();
        }
    } else {
        detailModal.style.display = 'none';
        detailModal.classList.remove('show');
    }
}

// Render estimation items in modal
function renderEstimationItems(estimationItems) {
    const estimationTableBody = document.getElementById('estimationTableBody');
    if (!estimationTableBody) return;
    
    estimationTableBody.innerHTML = '';
    
    if (!estimationItems || estimationItems.length === 0) {
        // Create default estimation items if none provided
        const defaultItem = {
            category: "Default Services",
            items: [
                { item: "Basic Cleaning Service", qty: 1, unitPrice: "$100.00", total: "$100.00" }
            ]
        };
        estimationItems = [defaultItem];
    }
    
    estimationItems.forEach(category => {
        // Add category row
        const categoryRow = document.createElement('tr');
        categoryRow.className = 'mbqf-service-category';
        categoryRow.innerHTML = `<td colspan="4"><strong>${category.category}</strong></td>`;
        estimationTableBody.appendChild(categoryRow);
        
        // Add items for this category
        category.items.forEach(item => {
            const itemRow = document.createElement('tr');
            itemRow.innerHTML = `
                <td>${item.item}</td>
                <td class="text-center">${item.qty}</td>
                <td class="text-end">${item.unitPrice}</td>
                <td class="text-end"><strong>${item.total}</strong></td>
            `;
            estimationTableBody.appendChild(itemRow);
        });
    });
}

// Render photos in modal
function renderPhotos(photos) {
    const photosGrid = document.getElementById('photosGrid');
    if (!photosGrid) return;
    
    photosGrid.innerHTML = '';
    
    if (!photos || photos.length === 0) {
        // Use default photos if none provided
        photos = [
            { src: "https://placehold.co/400x300/2c5aa0/ffffff?text=No+Photos", title: "No Photos Available" }
        ];
    }
    
    photos.forEach(photo => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-4 col-6 mb-3';
        
        const photoItem = document.createElement('div');
        photoItem.className = 'mbqf-photo-item';
        photoItem.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" class="img-fluid rounded">
            <div class="mbqf-photo-overlay">${photo.title}</div>
        `;
        photoItem.addEventListener('click', function() {
            window.open(photo.src, '_blank');
        });
        
        col.appendChild(photoItem);
        photosGrid.appendChild(col);
    });
    
    const photosCount = document.getElementById('photosCount');
    if (photosCount) {
        photosCount.textContent = photos.length;
    }
}

// Render upselling options in modal
function renderUpsellingOptions(upsellingOptions) {
    const upsellingContainer = document.getElementById('upsellingOptions');
    if (!upsellingContainer) return;
    
    upsellingContainer.innerHTML = '';
    
    if (!upsellingOptions || upsellingOptions.length === 0) {
        // Show message if no upselling options
        const noOptions = document.createElement('div');
        noOptions.className = 'alert alert-info';
        noOptions.textContent = 'No upselling options available for this quotation.';
        upsellingContainer.appendChild(noOptions);
        return;
    }
    
    let totalUpsells = 0;
    
    upsellingOptions.forEach(option => {
        const upsellingItem = document.createElement('div');
        upsellingItem.className = 'mbqf-upselling-item';
        upsellingItem.innerHTML = `
            <input type="checkbox" id="${option.id}" data-price="${option.price}" ${option.selected ? 'checked' : ''}>
            <div class="mbqf-upselling-content">
                <div class="mbqf-upselling-title">${option.name}</div>
                <div class="mbqf-upselling-description">${option.description}</div>
            </div>
            <div class="mbqf-upselling-price">+$${option.price.toFixed(2)}</div>
        `;
        
        // Add event listener to update total
        const checkbox = upsellingItem.querySelector('input');
        checkbox.addEventListener('change', function() {
            option.selected = this.checked;
            updateUpsellsTotal();
        });
        
        upsellingContainer.appendChild(upsellingItem);
        
        if (option.selected) {
            totalUpsells += option.price;
        }
    });
    
    // Update total display
    updateUpsellsTotal(totalUpsells);
}

// Update upsells total in modal
function updateUpsellsTotal(initialTotal = null) {
    const checkboxes = document.querySelectorAll('#upsellingOptions input[type="checkbox"]');
    let total = initialTotal || 0;
    
    if (!initialTotal) {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.getAttribute('data-price'));
            }
        });
    }
    
    const totalElement = document.getElementById('selectedUpsellsTotal');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Also update the main price computation
    const quotation = sampleQuotations.find(q => q.id === currentQuotationId);
    if (quotation) {
        quotation.upsells = total;
        const finalTotal = quotation.subtotal + quotation.tax + total;
        quotation.finalTotal = finalTotal;
        
        const upsellsElement = document.getElementById('modalUpsells');
        const finalTotalElement = document.getElementById('modalFinalTotal');
        
        if (upsellsElement) upsellsElement.textContent = `$${total.toFixed(2)}`;
        if (finalTotalElement) finalTotalElement.textContent = `$${finalTotal.toFixed(2)}`;
    }
}

// Generate quotation action
function generateQuotation() {
    if (!currentQuotationId) return;
    
    const quotation = sampleQuotations.find(q => q.id === currentQuotationId);
    if (!quotation) return;
    
    if (confirm(`Generate official quotation for $${quotation.finalTotal.toFixed(2)}?\n\nThis will:\n• Send quotation to accounting\n• Update status to "quotation_sent"\n• Notify client`)) {
        // Update status
        quotation.status = 'quotation_sent';
        
        // Update table
        renderTableRows();
        updateStats();
        
        // Close modal
        closeModal();
        
        // Show success message
        showToast(`✅ Quotation ${quotation.id} generated successfully! Sent to accounting and client notified.`, 'success');
    }
}

// Request revision action
function requestRevision() {
    if (!currentQuotationId) return;
    
    const revisionReason = prompt("Please provide revision notes for the supervisor:", "Please review and update the pricing as discussed.");
    if (revisionReason && revisionReason.trim() !== '') {
        const quotation = sampleQuotations.find(q => q.id === currentQuotationId);
        if (quotation) {
            quotation.status = 'revision_requested';
            
            // Update table
            renderTableRows();
            updateStats();
            
            // Close modal
            closeModal();
            
            showToast(`🔁 Revision request sent for ${quotation.id}. Status updated.`, 'info');
        }
    }
}

// Reject booking action
function rejectBooking() {
    if (!currentQuotationId) return;
    
    const rejectionReason = prompt("Please provide reason for rejection:", "Client requirements cannot be met with current pricing.");
    if (rejectionReason && rejectionReason.trim() !== '') {
        if (confirm(`Are you sure you want to reject booking ${currentQuotationId}?\n\nReason: "${rejectionReason}"`)) {
            const quotation = sampleQuotations.find(q => q.id === currentQuotationId);
            if (quotation) {
                quotation.status = 'rejected';
                
                // Update table
                renderTableRows();
                updateStats();
                
                // Close modal
                closeModal();
                
                showToast(`❌ Booking ${quotation.id} rejected. Client notified of cancellation.`, 'danger');
            }
        }
    }
}

// Save changes action
function saveChanges() {
    if (!currentQuotationId) return;
    
    const quotation = sampleQuotations.find(q => q.id === currentQuotationId);
    if (quotation) {
        // Update task list
        const taskListElement = document.getElementById('modalTaskList');
        if (taskListElement) {
            quotation.taskList = taskListElement.value;
        }
        
        // Update site notes
        const siteNotesElement = document.getElementById('modalSiteNotes');
        if (siteNotesElement) {
            quotation.siteNotes = siteNotesElement.value;
        }
        
        // Update special instructions
        const specialInstructionsElement = document.getElementById('modalSpecialInstructions');
        if (specialInstructionsElement) {
            quotation.specialInstructions = specialInstructionsElement.value;
        }
        
        // Update internal notes
        const internalNotesElement = document.getElementById('modalInternalNotes');
        if (internalNotesElement) {
            quotation.internalNotes = internalNotesElement.value;
        }
        
        // Update estimate input
        const estimateInput = document.getElementById('modalUpdatedEstimate');
        if (estimateInput) {
            // Parse the estimate range from input
            const estimateText = estimateInput.value;
            const matches = estimateText.match(/\$([\d.]+)\s*-\s*\$([\d.]+)/);
            if (matches) {
                const lower = parseFloat(matches[1]);
                const upper = parseFloat(matches[2]);
                // You could store these values if needed
            }
        }
        
        // Show success message
        showToast(`✅ Changes saved successfully for ${quotation.id}!`, 'success');
        
        // Update table
        renderTableRows();
    }
}

// Export data
function exportData() {
    // In a real app, this would generate a CSV or Excel file
    // For this demo, we'll create a CSV string
    const exportData = filteredQuotations.map(q => ({
        ID: q.id,
        Client: q.clientName,
        Service: q.serviceType,
        Date: q.dateTime,
        Address: q.address,
        Price: q.estimatedPrice,
        Status: q.status
    }));
    
    // Create CSV content
    const headers = ['ID', 'Client', 'Service', 'Date', 'Address', 'Price', 'Status'];
    const csvContent = [
        headers.join(','),
        ...exportData.map(row => [
            `"${row.ID}"`,
            `"${row.Client}"`,
            `"${row.Service}"`,
            `"${row.Date}"`,
            `"${row.Address}"`,
            `"${row.Price}"`,
            `"${row.Status}"`
        ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quotations_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`Exported ${exportData.length} quotations to CSV file.`, 'success');
}

// Show toast message
function showToast(message, type = 'success') {
    if (!messageToast || !toastText) return;
    
    toastText.textContent = message;
    
    // Set color based on type
    const colors = {
        success: '#10b981',
        danger: '#dc3545',
        info: '#2c5aa0',
        warning: '#f59e0b'
    };
    
    messageToast.style.background = colors[type] || colors.success;
    
    // Show toast
    messageToast.style.display = 'flex';
    messageToast.style.opacity = '1';
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        messageToast.style.opacity = '0';
        setTimeout(() => {
            messageToast.style.display = 'none';
        }, 300);
    }, 3000);
}

// Make functions available globally for onclick handlers
window.viewQuotation = viewQuotation;
window.editQuotation = editQuotation;

console.log('MB-FinalQuotation.js loaded successfully');