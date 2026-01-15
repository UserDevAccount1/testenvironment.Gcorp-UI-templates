// Complete Sample Data for 10 quotations - SHARED DATA
// Note: This data will be accessible to both files when loaded in the same page
window.mbqfSampleQuotations = [
    {
        id: "QT001",
        clientName: "Jane Doe",
        serviceType: "Move-Out Cleaning",
        propertyType: "Residential",
        billingType: "residential_onetime",
        dateTime: "Nov 10, 2025 - 10:00 AM",
        address: "25 Jupiter St., Canada City",
        depositRequired: true,
        depositPaid: true,
        depositAmount: 200,
        estimatedPrice: "$994.35",
        status: "visit_completed",
        supervisor: "John Smith",
        contact: "+63 912 345 6789",
        email: "jane.doe@example.com",
        recurrence: "One-Time",
        travelTime: 45,
        squareFootage: 1500,
        hourlyRate: true,
        subtotal: 947.00,
        travelCost: 28.50,
        tax: 47.35,
        upsells: 0,
        finalTotal: 994.35,
        siteNotes: "Client requested detailed carpet cleaning. Property well-maintained, requires deep clean for kitchen and living area. Additional staining found in master bedroom carpet.",
        specialInstructions: "Client has pets (2 cats). Use eco-friendly products only. Side gate access required.",
        taskList: "✓ Carpet steam cleaning in all rooms\n✓ Deep clean kitchen appliances (oven, refrigerator)\n✓ Wash and sanitize bathrooms (2)\n✓ Window cleaning (interior only)\n✓ Floor mopping and vacuuming\n✓ Dusting of all surfaces\n✓ Empty all trash bins",
        internalNotes: "Ensure all optional tasks are included in final invoice\nClient requested eco-friendly cleaning products\nSpecial attention to master bedroom carpet stain\nBackyard access through side gate - key provided\nPet owner - be mindful of allergies\nSchedule morning crew for this booking",
        mediaGallery: [
            {
                id: 1,
                url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                type: "image",
                caption: "Living room carpet stains",
                date: "2025-01-24",
                fileName: "carpet_stains.jpg",
                fileSize: 2456789
            },
            {
                id: 2,
                url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                type: "image",
                caption: "Kitchen overview - needs deep clean",
                date: "2025-01-24",
                fileName: "kitchen_overview.jpg",
                fileSize: 3123456
            },
            {
                id: 3,
                url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                type: "image",
                caption: "Bathroom condition",
                date: "2025-01-24",
                fileName: "bathroom.jpg",
                fileSize: 1876543
            },
            {
                id: 4,
                type: "video",
                url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-carpet-texture-27131-large.mp4",
                caption: "Carpet texture close-up video",
                date: "2025-01-24",
                fileName: "carpet_video.mp4",
                fileSize: 12567890
            },
            {
                id: 5,
                url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                type: "image",
                caption: "Entryway and hallway",
                date: "2025-01-24",
                fileName: "hallway.jpg",
                fileSize: 2987654
            },
            {
                id: 6,
                url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
                type: "image",
                caption: "Additional stain in bedroom corner",
                date: "2025-01-24",
                fileName: "bedroom_stain.jpg",
                fileSize: 2765432
            },
            {
                id: 7,
                type: "audio",
                url: "https://assets.mixkit.co/music/preview/mixkit-cleaning-the-house-229.mp3",
                caption: "Site inspection audio notes",
                date: "2025-01-24",
                fileName: "audio_notes.mp3",
                fileSize: 3456789
            }
        ],
        estimationItems: [
            { 
                category: "Steam Clean Services", 
                items: [
                    { item: "Carpets - Large Room 10x10", qty: 1, unitPrice: "$75.00", total: "$75.00" },
                    { item: "Carpets - Regular Room 8x8", qty: 2, unitPrice: "$60.00", total: "$120.00" }
                ]
            },
            { 
                category: "Maintenance Clean", 
                items: [
                    { item: "Kitchen (Large, 3 hrs)", qty: 1, unitPrice: "$38/hr", total: "$114.00" },
                    { item: "Bathroom (2.5 hrs)", qty: 1, unitPrice: "$38/hr", total: "$95.00" }
                ]
            }
        ],
        upsellingOptions: [
            { id: "deepClean", name: "Add Deep Clean Service", description: "Intensive cleaning including hard-to-reach areas and detailed sanitization", price: 120, selected: false },
            { id: "carpetProtect", name: "Add Carpet Protection Treatment", description: "Professional-grade stain protection for carpets (lasts 6 months)", price: 60, selected: false },
            { id: "windowExterior", name: "Add Exterior Window Cleaning", description: "Professional exterior window cleaning (ground floor only)", price: 85, selected: false }
        ]
    },
    {
        id: "QT002",
        clientName: "Robert Johnson",
        serviceType: "Deep Cleaning",
        propertyType: "Commercial",
        billingType: "commercial",
        dateTime: "Nov 12, 2025 - 2:00 PM",
        address: "42 Maple Ave, Springfield",
        depositRequired: false,
        depositPaid: false,
        depositAmount: 0,
        estimatedPrice: "$1,245.50",
        status: "pending_review",
        supervisor: "Sarah Williams",
        contact: "+63 923 456 7890",
        email: "robert.j@example.com",
        recurrence: "Monthly",
        travelTime: 30,
        squareFootage: 2500,
        hourlyRate: false,
        subtotal: 1186.19,
        travelCost: 19.00,
        tax: 59.31,
        upsells: 0,
        finalTotal: 1245.50,
        siteNotes: "Property is 3-bedroom with large living area. Requires extensive cleaning due to recent renovation.",
        specialInstructions: "Use non-toxic cleaning products. Client has allergies.",
        taskList: "✓ Deep clean all rooms\n✓ Kitchen degreasing\n✓ Bathroom sanitization\n✓ Window cleaning\n✓ Carpet shampooing",
        internalNotes: "Commercial client - invoice at end of month\nSpecial pricing negotiated",
        mediaGallery: [
            {
                id: 1,
                url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                type: "image",
                caption: "Office entrance",
                date: "2025-01-24",
                fileName: "office_entrance.jpg",
                fileSize: 2345678
            }
        ],
        estimationItems: [
            { 
                category: "Commercial Cleaning", 
                items: [
                    { item: "Office Deep Clean", qty: 1, unitPrice: "$850.00", total: "$850.00" },
                    { item: "Carpet Cleaning", qty: 1, unitPrice: "$200.00", total: "$200.00" }
                ]
            }
        ],
        upsellingOptions: [
            { id: "deepClean", name: "Add Deep Clean Service", description: "Intensive cleaning including hard-to-reach areas", price: 120, selected: false }
        ]
    },
    {
        id: "QT003",
        clientName: "Maria Garcia",
        serviceType: "Regular Cleaning",
        propertyType: "Residential",
        billingType: "residential_recurring",
        dateTime: "Nov 15, 2025 - 9:00 AM",
        address: "88 Oak Street, Metro City",
        depositRequired: true,
        depositPaid: true,
        depositAmount: 150,
        estimatedPrice: "$525.75",
        status: "quotation_sent",
        supervisor: "Michael Brown",
        contact: "+63 934 567 8901",
        email: "maria.g@example.com",
        recurrence: "Weekly",
        travelTime: 20,
        squareFootage: 1200,
        hourlyRate: true,
        subtotal: 500.71,
        travelCost: 12.67,
        tax: 25.04,
        upsells: 0,
        finalTotal: 525.75,
        siteNotes: "Standard maintenance clean. Apartment in good condition.",
        specialInstructions: "Focus on kitchen and bathrooms. No pets.",
        taskList: "✓ Kitchen cleaning\n✓ Bathroom sanitization\n✓ Dusting\n✓ Vacuuming",
        internalNotes: "Recurring client - invoice on 15th of each month",
        mediaGallery: [],
        estimationItems: [
            { 
                category: "Regular Cleaning", 
                items: [
                    { item: "Weekly Cleaning - 2 hrs", qty: 2, unitPrice: "$38/hr", total: "$76.00" }
                ]
            }
        ],
        upsellingOptions: []
    },
    {
        id: "QT004",
        clientName: "James Wilson",
        serviceType: "Carpet Cleaning",
        propertyType: "Residential",
        billingType: "residential_onetime",
        dateTime: "Nov 18, 2025 - 11:00 AM",
        address: "123 Pine Road, Green Valley",
        depositRequired: true,
        depositPaid: false,
        depositAmount: 100,
        estimatedPrice: "$385.25",
        status: "revision_requested",
        supervisor: "Lisa Taylor",
        contact: "+63 945 678 9012",
        email: "james.w@example.com",
        recurrence: "One-time",
        travelTime: 60,
        squareFootage: 1800,
        hourlyRate: false,
        subtotal: 367.86,
        travelCost: 38.00,
        tax: 18.39,
        upsells: 0,
        finalTotal: 385.25,
        siteNotes: "Carpets heavily stained in living room and bedrooms. Requires special treatment.",
        specialInstructions: "Test cleaning solution in hidden area first.",
        taskList: "✓ Carpet steam cleaning\n✓ Stain treatment\n✓ Drying",
        internalNotes: "Client requested revision on pricing",
        mediaGallery: [],
        estimationItems: [
            { 
                category: "Carpet Cleaning", 
                items: [
                    { item: "Carpet Cleaning - Living Room", qty: 1, unitPrice: "$150.00", total: "$150.00" },
                    { item: "Stain Treatment", qty: 3, unitPrice: "$25.00", total: "$75.00" }
                ]
            }
        ],
        upsellingOptions: [
            { id: "carpetProtect", name: "Carpet Protection", description: "Stain protection treatment", price: 60, selected: false }
        ]
    },
    {
        id: "QT005",
        clientName: "Emily Chen",
        serviceType: "Move-Out Cleaning",
        propertyType: "Commercial",
        billingType: "commercial",
        dateTime: "Nov 20, 2025 - 8:30 AM",
        address: "55 Cedar Lane, Westside",
        depositRequired: false,
        depositPaid: false,
        depositAmount: 0,
        estimatedPrice: "$1,120.80",
        status: "approved",
        supervisor: "David Miller",
        contact: "+63 956 789 0123",
        email: "emily.c@example.com",
        recurrence: "One-time",
        travelTime: 45,
        squareFootage: 3000,
        hourlyRate: false,
        subtotal: 1067.43,
        travelCost: 28.50,
        tax: 53.37,
        upsells: 0,
        finalTotal: 1120.80,
        siteNotes: "Property vacant. Requires full move-out cleaning for inspection.",
        specialInstructions: "Landlord will be present during cleaning.",
        taskList: "✓ Full house deep clean\n✓ Appliance cleaning\n✓ Window washing\n✓ Carpet cleaning",
        internalNotes: "Commercial one-time service",
        mediaGallery: [],
        estimationItems: [
            { 
                category: "Move-Out Cleaning", 
                items: [
                    { item: "Complete Move-Out Service", qty: 1, unitPrice: "$850.00", total: "$850.00" },
                    { item: "Carpet Cleaning", qty: 1, unitPrice: "$150.00", total: "$150.00" }
                ]
            }
        ],
        upsellingOptions: []
    },
    {
        id: "QT006",
        clientName: "Thomas Anderson",
        serviceType: "Commercial Cleaning",
        propertyType: "Commercial",
        billingType: "commercial",
        dateTime: "Nov 22, 2025 - 6:00 PM",
        address: "789 Business Blvd, Downtown",
        depositRequired: true,
        depositPaid: true,
        depositAmount: 500,
        estimatedPrice: "$2,450.00",
        status: "pending_review",
        supervisor: "Jessica Lee",
        contact: "+63 967 890 1234",
        email: "thomas.a@example.com",
        recurrence: "Monthly",
        travelTime: 90,
        squareFootage: 5000,
        hourlyRate: false,
        subtotal: 2333.33,
        travelCost: 57.00,
        tax: 116.67,
        upsells: 0,
        finalTotal: 2450.00,
        siteNotes: "Office building, 5 floors. Requires after-hours cleaning.",
        specialInstructions: "Security clearance required. Contact building manager.",
        taskList: "✓ Office cleaning\n✓ Restroom sanitization\n✓ Trash removal\n✓ Floor maintenance",
        internalNotes: "Large commercial account - special rates applied",
        mediaGallery: [],
        estimationItems: [
            { 
                category: "Commercial Cleaning", 
                items: [
                    { item: "Monthly Contract - 5 floors", qty: 1, unitPrice: "$2000.00", total: "$2000.00" }
                ]
            }
        ],
        upsellingOptions: []
    },
    {
        id: "QT007",
        clientName: "Sophia Martinez",
        serviceType: "Regular Cleaning",
        propertyType: "Residential",
        billingType: "residential_recurring",
        dateTime: "Nov 25, 2025 - 10:00 AM",
        address: "321 Elm Street, North Park",
        depositRequired: true,
        depositPaid: true,
        depositAmount: 120,
        estimatedPrice: "$450.50",
        status: "quotation_sent",
        supervisor: "Kevin Davis",
        contact: "+63 978 901 2345",
        email: "sophia.m@example.com",
        recurrence: "Weekly",
        travelTime: 25,
        squareFootage: 1100,
        hourlyRate: true,
        subtotal: 429.05,
        travelCost: 15.83,
        tax: 21.45,
        upsells: 0,
        finalTotal: 450.50,
        siteNotes: "Small apartment, regular maintenance cleaning.",
        specialInstructions: "Client prefers morning appointments.",
        taskList: "✓ Kitchen clean\n✓ Bathroom sanitize\n✓ Dusting\n✓ Vacuuming",
        internalNotes: "Recurring residential client",
        mediaGallery: [],
        estimationItems: [
            { 
                category: "Regular Cleaning", 
                items: [
                    { item: "Weekly Cleaning", qty: 1, unitPrice: "$180.00", total: "$180.00" }
                ]
            }
        ],
        upsellingOptions: []
    },
    {
        id: "QT008",
        clientName: "William Clark",
        serviceType: "Deep Cleaning",
        propertyType: "Residential",
        billingType: "residential_onetime",
        dateTime: "Nov 28, 2025 - 1:00 PM",
        address: "654 Birch Court, Eastside",
        depositRequired: true,
        depositPaid: false,
        depositAmount: 175,
        estimatedPrice: "$875.25",
        status: "visit_completed",
        supervisor: "Amanda White",
        contact: "+63 989 012 3456",
        email: "william.c@example.com",
        recurrence: "One-time",
        travelTime: 35,
        squareFootage: 2200,
        hourlyRate: false,
        subtotal: 833.57,
        travelCost: 22.17,
        tax: 41.68,
        upsells: 0,
        finalTotal: 875.25,
        siteNotes: "Home recently vacated by tenants. Requires deep cleaning before new tenants.",
        specialInstructions: "Focus on kitchen appliances and bathrooms.",
        taskList: "✓ Deep clean kitchen\n✓ Bathroom sanitization\n✓ Carpet cleaning\n✓ Window washing",
        internalNotes: "Deposit pending - follow up with client",
        mediaGallery: [],
        estimationItems: [
            { 
                category: "Deep Cleaning", 
                items: [
                    { item: "Deep Clean - Whole House", qty: 1, unitPrice: "$700.00", total: "$700.00" }
                ]
            }
        ],
        upsellingOptions: []
    },
    {
        id: "QT009",
        clientName: "Olivia Taylor",
        serviceType: "Carpet Cleaning",
        propertyType: "Commercial",
        billingType: "commercial",
        dateTime: "Nov 30, 2025 - 3:00 PM",
        address: "987 Walnut Way, Southgate",
        depositRequired: false,
        depositPaid: false,
        depositAmount: 0,
        estimatedPrice: "$625.40",
        status: "rejected",
        supervisor: "Brian Wilson",
        contact: "+63 990 123 4567",
        email: "olivia.t@example.com",
        recurrence: "One-time",
        travelTime: 50,
        squareFootage: 2800,
        hourlyRate: false,
        subtotal: 595.62,
        travelCost: 31.67,
        tax: 29.78,
        upsells: 0,
        finalTotal: 625.40,
        siteNotes: "Client cancelled booking after site visit.",
        specialInstructions: "No special instructions.",
        taskList: "✓ Carpet cleaning\n✓ Stain removal",
        internalNotes: "Booking rejected - client found cheaper alternative",
        mediaGallery: [],
        estimationItems: [],
        upsellingOptions: []
    },
    {
        id: "QT010",
        clientName: "Daniel Lee",
        serviceType: "Move-Out Cleaning",
        propertyType: "Residential",
        billingType: "residential_onetime",
        dateTime: "Dec 2, 2025 - 9:00 AM",
        address: "147 Spruce Street, Riverside",
        depositRequired: true,
        depositPaid: true,
        depositAmount: 250,
        estimatedPrice: "$1,350.75",
        status: "pending_review",
        supervisor: "Rachel Kim",
        contact: "+63 901 234 5678",
        email: "daniel.l@example.com",
        recurrence: "One-time",
        travelTime: 40,
        squareFootage: 3200,
        hourlyRate: true,
        subtotal: 1286.43,
        travelCost: 25.33,
        tax: 64.32,
        upsells: 0,
        finalTotal: 1350.75,
        siteNotes: "Large family home, 4 bedrooms. Requires extensive cleaning.",
        specialInstructions: "Family will be moving during cleaning day.",
        taskList: "✓ Full house cleaning\n✓ Appliance deep clean\n✓ Carpet shampooing\n✓ Window cleaning",
        internalNotes: "High-value residential one-time service",
        mediaGallery: [
            {
                id: 1,
                url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                type: "image",
                caption: "Living area",
                date: "2025-01-24",
                fileName: "living_area.jpg",
                fileSize: 3123456
            }
        ],
        estimationItems: [
            { 
                category: "Move-Out Cleaning", 
                items: [
                    { item: "Complete Move-Out Service", qty: 1, unitPrice: "$1200.00", total: "$1200.00" }
                ]
            }
        ],
        upsellingOptions: [
            { id: "deepClean", name: "Add Deep Clean Service", description: "Intensive cleaning including hard-to-reach areas", price: 120, selected: false },
            { id: "furniturePolish", name: "Add Furniture Polishing", description: "Professional furniture polishing and protection", price: 45, selected: false }
        ]
    }
];

// Global variables - TABLE MANAGEMENT ONLY
let mbqfCurrentPage = 1;
let mbqfItemsPerPage = 10;
let mbqfFilteredQuotations = [...window.mbqfSampleQuotations];

// Initialize the application - TABLE MANAGEMENT ONLY
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Quotation Management System...');
    mbqfInitializeTable();
    mbqfSetupEventListeners();
    mbqfUpdatePagination();
    mbqfUpdateStats();
    console.log('Table Management initialized. Loaded', window.mbqfSampleQuotations.length, 'quotations.');
});

// Initialize quotations table
function mbqfInitializeTable() {
    mbqfRenderTableRows();
}

// Render table rows based on current page and filters
function mbqfRenderTableRows() {
    const tableBody = document.getElementById('mbqfQuotationsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const startIndex = (mbqfCurrentPage - 1) * mbqfItemsPerPage;
    const endIndex = startIndex + mbqfItemsPerPage;
    const currentQuotations = mbqfFilteredQuotations.slice(startIndex, endIndex);
    
    if (currentQuotations.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="11" class="text-center py-4">
                <i class="fas fa-search fa-2x text-muted mb-3"></i>
                <p class="text-muted">No quotations found matching your criteria.</p>
            </td>
        `;
        tableBody.appendChild(row);
        return;
    }
    
    currentQuotations.forEach(quotation => {
        const row = document.createElement('tr');
        
        // Determine deposit display
        let depositDisplay = '';
        if (!quotation.depositRequired) {
            depositDisplay = '<span class="mbqf-deposit-status not-required"><i class="fas fa-times"></i> Not Required</span>';
        } else if (quotation.depositPaid) {
            depositDisplay = `<span class="mbqf-deposit-status paid"><i class="fas fa-check-circle"></i> Paid ($${quotation.depositAmount})</span>`;
        } else {
            depositDisplay = `<span class="mbqf-deposit-status pending"><i class="fas fa-clock"></i> Pending ($${quotation.depositAmount})</span>`;
        }
        
        // Determine billing type badge
        let billingBadge = '';
        let billingText = '';
        switch(quotation.billingType) {
            case 'commercial':
                billingBadge = 'mbqf-billing-badge commercial';
                billingText = 'Commercial';
                break;
            case 'residential_recurring':
                billingBadge = 'mbqf-billing-badge residential_recurring';
                billingText = 'Residential Recurring';
                break;
            case 'residential_onetime':
                billingBadge = 'mbqf-billing-badge residential_onetime';
                billingText = 'Residential One-Time';
                break;
            default:
                billingBadge = 'mbqf-billing-badge';
                billingText = quotation.billingType;
        }
        
        row.innerHTML = `
            <td data-label="ID"><strong>${quotation.id}</strong></td>
            <td data-label="Client">${quotation.clientName}</td>
            <td data-label="Service Type">${quotation.serviceType}</td>
            <td data-label="Property Type">${quotation.propertyType}</td>
            <td data-label="Date/Time">${quotation.dateTime}</td>
            <td data-label="Address">${quotation.address}</td>
            <td data-label="Deposit">${depositDisplay}</td>
            <td data-label="Billing Type"><span class="${billingBadge}">${billingText}</span></td>
            <td data-label="Estimated Price"><strong>${quotation.estimatedPrice}</strong></td>
            <td data-label="Status"><span class="mbqf-status-badge ${quotation.status}">${quotation.status.replace('_', ' ')}</span></td>
            <td data-label="Actions">
                <div class="mbqf-table-actions-cell">
                    <button class="mbqf-action-btn small mbqf-view" onclick="mbqfOpenQuotationModal('${quotation.id}')" title="View Details">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="mbqf-action-btn small mbqf-edit" onclick="mbqfEditQuotation('${quotation.id}')" title="Edit Quotation">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Update pagination info
    const totalPages = Math.ceil(mbqfFilteredQuotations.length / mbqfItemsPerPage);
    document.getElementById('mbqfCurrentPage').textContent = mbqfCurrentPage;
    document.getElementById('mbqfTotalPages').textContent = totalPages || 1;
    
    // Enable/disable pagination buttons
    const prevBtn = document.getElementById('mbqfPrevPage');
    const nextBtn = document.getElementById('mbqfNextPage');
    
    if (prevBtn) {
        prevBtn.disabled = mbqfCurrentPage === 1;
        prevBtn.classList.toggle('disabled', mbqfCurrentPage === 1);
    }
    
    if (nextBtn) {
        nextBtn.disabled = mbqfCurrentPage === totalPages || totalPages === 0;
        nextBtn.classList.toggle('disabled', mbqfCurrentPage === totalPages || totalPages === 0);
    }
}

// Setup event listeners - TABLE MANAGEMENT ONLY
function mbqfSetupEventListeners() {
    // Search input
    const searchInput = document.getElementById('mbqfSearchQuotations');
    if (searchInput) {
        searchInput.addEventListener('input', mbqfDebounce(function(e) {
            mbqfApplyFilters();
        }, 300));
    }
    
    // Filter buttons
    const applyFiltersBtn = document.getElementById('mbqfApplyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', mbqfApplyFilters);
    }
    
    const resetFiltersBtn = document.getElementById('mbqfResetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', mbqfResetFilters);
    }
    
    // Billing settings button
    const billingSettingsBtn = document.getElementById('mbqfBillingSettingsBtn');
    if (billingSettingsBtn) {
        billingSettingsBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('mbqfBillingSettingsModal'));
            modal.show();
        });
    }
    
    // Pagination
    const prevPageBtn = document.getElementById('mbqfPrevPage');
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (mbqfCurrentPage > 1) {
                mbqfCurrentPage--;
                mbqfRenderTableRows();
                mbqfUpdatePagination();
            }
        });
    }
    
    const nextPageBtn = document.getElementById('mbqfNextPage');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(mbqfFilteredQuotations.length / mbqfItemsPerPage);
            if (mbqfCurrentPage < totalPages) {
                mbqfCurrentPage++;
                mbqfRenderTableRows();
                mbqfUpdatePagination();
            }
        });
    }
    
    // Items per page
    const itemsPerPageSelect = document.getElementById('mbqfItemsPerPage');
    if (itemsPerPageSelect) {
        itemsPerPageSelect.addEventListener('change', function() {
            mbqfItemsPerPage = parseInt(this.value);
            mbqfCurrentPage = 1;
            mbqfRenderTableRows();
            mbqfUpdatePagination();
        });
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('mbqfRefreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            mbqfShowToast('Data refreshed successfully!', 'success');
            mbqfApplyFilters();
        });
    }
    
    // Export button
    const exportBtn = document.getElementById('mbqfExportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', mbqfExportData);
    }
    
    // Billing settings modal save
    const saveBillingSettingsBtn = document.getElementById('mbqfSaveBillingSettings');
    if (saveBillingSettingsBtn) {
        saveBillingSettingsBtn.addEventListener('click', mbqfSaveBillingSettings);
    }
}

// Apply filters to quotations - TABLE MANAGEMENT ONLY
function mbqfApplyFilters() {
    const status = document.getElementById('mbqfStatusFilter').value;
    const service = document.getElementById('mbqfServiceFilter').value;
    const propertyType = document.getElementById('mbqfPropertyFilter').value;
    const billingType = document.getElementById('mbqfBillingFilter').value;
    const depositFilter = document.getElementById('mbqfDepositFilter').value;
    const date = document.getElementById('mbqfDateFilter').value;
    const searchTerm = document.getElementById('mbqfSearchQuotations') ? document.getElementById('mbqfSearchQuotations').value.toLowerCase() : '';
    
    mbqfFilteredQuotations = window.mbqfSampleQuotations.filter(quotation => {
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
        
        // Filter by property type
        if (propertyType !== 'all' && quotation.propertyType.toLowerCase() !== propertyType) {
            matches = false;
        }
        
        // Filter by billing type
        if (billingType !== 'all' && quotation.billingType !== billingType) {
            matches = false;
        }
        
        // Filter by deposit status
        if (depositFilter !== 'all') {
            if (depositFilter === 'required' && !quotation.depositRequired) matches = false;
            if (depositFilter === 'paid' && (!quotation.depositRequired || !quotation.depositPaid)) matches = false;
            if (depositFilter === 'pending' && (!quotation.depositRequired || quotation.depositPaid)) matches = false;
            if (depositFilter === 'not_required' && quotation.depositRequired) matches = false;
        }
        
        // Filter by date
        if (date) {
            const filterDate = new Date(date);
            const filterDateStr = filterDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
            
            if (!quotation.dateTime.includes(filterDateStr.split(' ')[0])) {
                matches = false;
            }
        }
        
        // Search filter
        if (searchTerm) {
            const searchFields = [
                quotation.id,
                quotation.clientName,
                quotation.serviceType,
                quotation.propertyType,
                quotation.address,
                quotation.supervisor,
                quotation.contact,
                quotation.email
            ].join(' ').toLowerCase();
            
            if (!searchFields.includes(searchTerm)) {
                matches = false;
            }
        }
        
        return matches;
    });
    
    mbqfCurrentPage = 1;
    mbqfRenderTableRows();
    mbqfUpdatePagination();
    mbqfUpdateStats();
    
    mbqfShowToast(`Found ${mbqfFilteredQuotations.length} quotation(s)`, 'info');
}

// Reset all filters - TABLE MANAGEMENT ONLY
function mbqfResetFilters() {
    document.getElementById('mbqfStatusFilter').value = 'all';
    document.getElementById('mbqfServiceFilter').value = 'all';
    document.getElementById('mbqfPropertyFilter').value = 'all';
    document.getElementById('mbqfBillingFilter').value = 'all';
    document.getElementById('mbqfDepositFilter').value = 'all';
    document.getElementById('mbqfDateFilter').value = '';
    
    const searchInput = document.getElementById('mbqfSearchQuotations');
    if (searchInput) searchInput.value = '';
    
    mbqfFilteredQuotations = [...window.mbqfSampleQuotations];
    mbqfCurrentPage = 1;
    mbqfRenderTableRows();
    mbqfUpdatePagination();
    mbqfUpdateStats();
    
    mbqfShowToast('Filters reset successfully!', 'info');
}

// Update pagination controls - TABLE MANAGEMENT ONLY
function mbqfUpdatePagination() {
    const totalPages = Math.ceil(mbqfFilteredQuotations.length / mbqfItemsPerPage);
    const totalPagesSpan = document.getElementById('mbqfTotalPages');
    
    if (totalPagesSpan) {
        totalPagesSpan.textContent = totalPages || 1;
    }
    
    const prevPageBtn = document.getElementById('mbqfPrevPage');
    const nextPageBtn = document.getElementById('mbqfNextPage');
    
    if (prevPageBtn) {
        prevPageBtn.disabled = mbqfCurrentPage === 1;
        prevPageBtn.classList.toggle('disabled', mbqfCurrentPage === 1);
    }
    
    if (nextPageBtn) {
        nextPageBtn.disabled = mbqfCurrentPage === totalPages || totalPages === 0;
        nextPageBtn.classList.toggle('disabled', mbqfCurrentPage === totalPages || totalPages === 0);
    }
}

// Update statistics - TABLE MANAGEMENT ONLY
function mbqfUpdateStats() {
    const total = mbqfFilteredQuotations.length;
    const pending = mbqfFilteredQuotations.filter(q => q.status === 'pending_review' || q.status === 'visit_completed').length;
    const sent = mbqfFilteredQuotations.filter(q => q.status === 'quotation_sent').length;
    const approved = mbqfFilteredQuotations.filter(q => q.status === 'approved').length;
    const totalValue = mbqfFilteredQuotations.reduce((sum, q) => sum + parseFloat(q.finalTotal), 0);
    const upsellRevenue = mbqfFilteredQuotations.reduce((sum, q) => sum + q.upsells, 0);
    
    // Update stats
    document.getElementById('mbqfTotalQuotations').textContent = total;
    document.getElementById('mbqfPendingQuotations').textContent = pending;
    document.getElementById('mbqfSentQuotations').textContent = sent;
    
    // Update stat cards
    document.getElementById('mbqfTotalValue').textContent = `$${totalValue.toFixed(2)}`;
    document.getElementById('mbqfApprovedCount').textContent = approved;
    document.getElementById('mbqfPendingReviewCount').textContent = pending;
    document.getElementById('mbqfUpsellRevenue').textContent = `$${upsellRevenue.toFixed(2)}`;
}

// Open quotation modal - BRIDGE FUNCTION to Floating Window
function mbqfOpenQuotationModal(quotationId) {
    // This function will call the function from the floating window JS
    if (typeof window.mbqfFloatingWindow !== 'undefined' && 
        typeof window.mbqfFloatingWindow.viewQuotation === 'function') {
        window.mbqfFloatingWindow.viewQuotation(quotationId);
    } else {
        // Fallback if floating window JS not loaded
        console.warn('Floating window JavaScript not loaded. Loading quotation data directly.');
        mbqfOpenModalDirectly(quotationId);
    }
}

// Fallback function if floating window JS is not loaded
function mbqfOpenModalDirectly(quotationId) {
    const quotation = window.mbqfSampleQuotations.find(q => q.id === quotationId);
    if (!quotation) {
        mbqfShowToast('Quotation not found!', 'danger');
        return;
    }
    
    // Basic modal opening (just alert for demo)
    alert(`Viewing Quotation: ${quotation.id}\nClient: ${quotation.clientName}\nPrice: ${quotation.estimatedPrice}\n\nNote: Floating window JavaScript not loaded.`);
}

// Edit quotation - BRIDGE FUNCTION to Floating Window
function mbqfEditQuotation(quotationId) {
    if (typeof window.mbqfFloatingWindow !== 'undefined' && 
        typeof window.mbqfFloatingWindow.editQuotation === 'function') {
        window.mbqfFloatingWindow.editQuotation(quotationId);
    } else {
        // Fallback if floating window JS not loaded
        console.warn('Floating window JavaScript not loaded. Editing quotation directly.');
        mbqfOpenModalDirectly(quotationId);
    }
}

// Save billing settings - TABLE MANAGEMENT ONLY
function mbqfSaveBillingSettings() {
    // Get values from billing settings modal
    const commercialAuto = document.getElementById('mbqfCommercialAutoSetting').checked;
    const residentialRecurringAuto = document.getElementById('mbqfResidentialRecurringAutoSetting').checked;
    const residentialOnetimeAuto = document.getElementById('mbqfResidentialOnetimeAutoSetting').checked;
    const autoInvoiceGen = document.getElementById('mbqfAutoInvoiceGeneration').checked;
    const autoClientCat = document.getElementById('mbqfAutoClientCategorization').checked;
    
    // In a real application, you would save these settings to a database
    // For demo, we'll just show a success message
    mbqfShowToast('Billing settings saved successfully!', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('mbqfBillingSettingsModal'));
    if (modal) {
        modal.hide();
    }
}

// Edit billing setting
function mbqfEditBillingSetting(type) {
    let title = '';
    let description = '';
    
    switch(type) {
        case 'commercial':
            title = 'Commercial Billing Settings';
            description = 'Configure commercial billing automation and settings';
            break;
        case 'residential_recurring':
            title = 'Residential Recurring Billing Settings';
            description = 'Configure residential recurring billing automation';
            break;
        case 'residential_onetime':
            title = 'Residential One-Time Billing Settings';
            description = 'Configure residential one-time billing automation';
            break;
    }
    
    alert(`Editing ${title}\n\n${description}\n\nIn a full implementation, this would open an edit form.`);
}

// Export data - TABLE MANAGEMENT ONLY
function mbqfExportData() {
    const exportData = mbqfFilteredQuotations.map(q => ({
        ID: q.id,
        Client: q.clientName,
        Service: q.serviceType,
        Property: q.propertyType,
        Billing: mbqfFormatBillingType(q.billingType),
        Date: q.dateTime,
        Address: q.address,
        Deposit: q.depositRequired ? (q.depositPaid ? 'Paid' : 'Pending') : 'Not Required',
        DepositAmount: q.depositAmount,
        EstimatedPrice: q.estimatedPrice,
        Status: q.status,
        Supervisor: q.supervisor,
        Contact: q.contact
    }));
    
    const headers = ['ID', 'Client', 'Service', 'Property', 'Billing', 'Date', 'Address', 'Deposit', 'Deposit Amount', 'Estimated Price', 'Status', 'Supervisor', 'Contact'];
    const csvContent = [
        headers.join(','),
        ...exportData.map(row => [
            `"${row.ID}"`,
            `"${row.Client}"`,
            `"${row.Service}"`,
            `"${row.Property}"`,
            `"${row.Billing}"`,
            `"${row.Date}"`,
            `"${row.Address}"`,
            `"${row.Deposit}"`,
            `"${row.DepositAmount}"`,
            `"${row.EstimatedPrice}"`,
            `"${row.Status}"`,
            `"${row.Supervisor}"`,
            `"${row.Contact}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quotations_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    mbqfShowToast(`Exported ${exportData.length} quotations to CSV file.`, 'success');
}

// Format billing type for display
function mbqfFormatBillingType(billingType) {
    switch(billingType) {
        case 'commercial': return 'Commercial';
        case 'residential_recurring': return 'Residential Recurring';
        case 'residential_onetime': return 'Residential One-Time';
        default: return billingType;
    }
}

// Show toast message - SHARED FUNCTION
function mbqfShowToast(message, type = 'success') {
    const messageToast = document.getElementById('mbqfMessageToast');
    const toastText = document.getElementById('mbqfToastText');
    
    if (!messageToast || !toastText) return;
    
    toastText.textContent = message;
    
    const colors = {
        success: '#10b981',
        danger: '#dc3545',
        info: '#2c5aa0',
        warning: '#f59e0b'
    };
    
    messageToast.style.background = colors[type] || colors.success;
    
    messageToast.style.display = 'flex';
    messageToast.style.opacity = '1';
    
    setTimeout(() => {
        messageToast.style.opacity = '0';
        setTimeout(() => {
            messageToast.style.display = 'none';
        }, 300);
    }, 3000);
}

// Utility function for debouncing
function mbqfDebounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions available globally
window.mbqfOpenQuotationModal = mbqfOpenQuotationModal;
window.mbqfEditQuotation = mbqfEditQuotation;
window.mbqfEditBillingSetting = mbqfEditBillingSetting;
window.mbqfFormatBillingType = mbqfFormatBillingType;
window.mbqfShowToast = mbqfShowToast;

console.log('MB-FinalQuotation.js (Table Management) loaded successfully');