// MB-Cleaner.js - Cleaner Management Dashboard JavaScript (Fixed Version)
// Sample Data - 10 APPOINTMENTS
const appointments = [
    {
        id: "APT-CA-2025-010",
        client: "Sarah Johnson",
        date: "Nov 10, 2025",
        time: "10:00 AM",
        service: "Deep Cleaning",
        cleaner: "John Martinez",
        status: "Scheduled",
        address: "123 Main Street, Toronto, ON M5V 2T6",
        duration: "3.5 hours",
        cleanerCount: 2,
        instructions: "Please use eco-friendly products. Client has pet allergies. Key in lockbox with code 4521.",
        notes: [
            "Client has pet allergies - use hypoallergenic products",
            "Key available in lockbox - code: 4521",
            "Small friendly dog present - will be in crate during service"
        ],
        tasks: {
            completed: 8,
            total: 12,
            items: [
                { category: "Bedroom", name: "Change bed sheets", status: "completed", cleaner: "John" },
                { category: "Bedroom", name: "Wipe all surfaces", status: "completed", cleaner: "John" },
                { category: "Bedroom", name: "Vacuum carpet", status: "pending", cleaner: "John" },
                { category: "Kitchen", name: "Degrease stove", status: "completed", cleaner: "Emily" },
                { category: "Kitchen", name: "Clean countertops", status: "in-progress", cleaner: "Emily" },
                { category: "Kitchen", name: "Spot clean cabinets", status: "pending", cleaner: "Emily" }
            ]
        },
        equipment: [
            { id: "EQ-001", name: "Steam Cleaning Machine", type: "Steam Cleaner", status: "in-use", checkedBy: "John Martinez", checkTime: "10:15 AM", lastMaintenance: "Nov 1, 2025" },
            { id: "EQ-002", name: "Heavy-duty Vacuum", type: "Vacuum", status: "available", checkedBy: "Emily Rodriguez", checkTime: "10:20 AM", lastMaintenance: "Oct 25, 2025" },
            { id: "EQ-003", name: "Eco-friendly Solution Kit", type: "Chemical", status: "in-use", checkedBy: "John Martinez", checkTime: "10:10 AM", lastMaintenance: "Nov 5, 2025" },
            { id: "EQ-004", name: "Extension Ladder", type: "Tool", status: "maintenance", checkedBy: "Not checked", checkTime: "-", lastMaintenance: "Sep 15, 2025" }
        ]
    },
    {
        id: "APT-CA-2025-011",
        client: "Michael Chen",
        date: "Nov 11, 2025",
        time: "2:00 PM",
        service: "Move-Out Clean",
        cleaner: "Team A",
        status: "In Progress",
        address: "456 Oak Avenue, Vancouver, BC V6B 2T9",
        duration: "4 hours",
        cleanerCount: 3,
        instructions: "Empty apartment. Focus on kitchen degreasing and bathroom sanitization.",
        notes: [
            "Empty apartment - all furniture removed",
            "Extra focus on kitchen degreasing",
            "Building requires notice before entry"
        ],
        tasks: {
            completed: 5,
            total: 15,
            items: [
                { category: "General", name: "Dust all surfaces", status: "completed", cleaner: "Team" },
                { category: "General", name: "Vacuum floors", status: "in-progress", cleaner: "Team" },
                { category: "Kitchen", name: "Clean appliances", status: "pending", cleaner: "Team" },
                { category: "Bathroom", name: "Sanitize surfaces", status: "completed", cleaner: "Team" }
            ]
        },
        equipment: [
            { id: "EQ-005", name: "Commercial Vacuum", type: "Vacuum", status: "in-use", checkedBy: "Team Lead", checkTime: "1:45 PM", lastMaintenance: "Nov 3, 2025" },
            { id: "EQ-006", name: "Degreaser Kit", type: "Chemical", status: "in-use", checkedBy: "Team Lead", checkTime: "1:50 PM", lastMaintenance: "Oct 28, 2025" }
        ]
    },
    {
        id: "APT-CA-2025-012",
        client: "Emma Rodriguez",
        date: "Nov 12, 2025",
        time: "9:00 AM",
        service: "Steam Cleaning",
        cleaner: "",
        status: "Ready for Scheduling",
        address: "789 Pine Road, Montreal, QC H3B 2T6",
        duration: "2.5 hours",
        cleanerCount: 1,
        instructions: "Steam clean carpets in living room and bedrooms. Use pet-safe solutions.",
        notes: [
            "Steam clean carpets in living room and bedrooms",
            "Use pet-safe solutions (client has cats)",
            "Parking available in driveway"
        ],
        tasks: {
            completed: 0,
            total: 8,
            items: []
        },
        equipment: []
    },
    {
        id: "APT-CA-2025-013",
        client: "David Wilson",
        date: "Nov 12, 2025",
        time: "1:00 PM",
        service: "Standard Cleaning",
        cleaner: "Emily Rodriguez",
        status: "Scheduled",
        address: "101 Maple Boulevard, Calgary, AB T2P 2T6",
        duration: "2 hours",
        cleanerCount: 1,
        instructions: "Focus on kitchen and bathrooms. Client will be home during service.",
        notes: [
            "Focus on kitchen and bathrooms",
            "Client will be home during service",
            "Use fragrance-free products"
        ],
        tasks: {
            completed: 0,
            total: 10,
            items: []
        },
        equipment: [
            { id: "EQ-007", name: "Standard Cleaning Kit", type: "Chemical", status: "available", checkedBy: "Emily Rodriguez", checkTime: "12:30 PM", lastMaintenance: "Nov 8, 2025" }
        ]
    },
    {
        id: "APT-CA-2025-014",
        client: "Lisa Thompson",
        date: "Nov 11, 2025",
        time: "11:00 AM",
        service: "Deep Cleaning",
        cleaner: "David Kim",
        status: "Completed",
        address: "202 Birch Lane, Ottawa, ON K1P 2T6",
        duration: "3 hours",
        cleanerCount: 1,
        instructions: "Post-renovation cleanup. Dust control important.",
        notes: [
            "Post-renovation cleanup required",
            "Dust control important - client has asthma",
            "Special attention to windows"
        ],
        tasks: {
            completed: 12,
            total: 12,
            items: [
                { category: "Living Room", name: "Dust all surfaces", status: "completed", cleaner: "David" },
                { category: "Living Room", name: "Vacuum floors", status: "completed", cleaner: "David" },
                { category: "Kitchen", name: "Clean appliances", status: "completed", cleaner: "David" }
            ]
        },
        equipment: [
            { id: "EQ-008", name: "HEPA Vacuum", type: "Vacuum", status: "available", checkedBy: "David Kim", checkTime: "10:45 AM", lastMaintenance: "Nov 2, 2025" },
            { id: "EQ-009", name: "Dust Control System", type: "Tool", status: "available", checkedBy: "David Kim", checkTime: "10:50 AM", lastMaintenance: "Oct 30, 2025" }
        ]
    },
    {
        id: "APT-CA-2025-015",
        client: "Robert Garcia",
        date: "Nov 13, 2025",
        time: "8:00 AM",
        service: "Move-In Clean",
        cleaner: "Team B",
        status: "Scheduled",
        address: "303 Cedar Street, Edmonton, AB T5J 2T6",
        duration: "5 hours",
        cleanerCount: 4,
        instructions: "New construction cleaning. Windows and floors need special attention.",
        notes: [
            "New construction - construction dust present",
            "All windows need cleaning inside and out",
            "Hardwood floors need special care"
        ],
        tasks: {
            completed: 0,
            total: 20,
            items: []
        },
        equipment: [
            { id: "EQ-010", name: "Window Cleaning Kit", type: "Tool", status: "available", checkedBy: "Team Lead", checkTime: "7:30 AM", lastMaintenance: "Nov 7, 2025" },
            { id: "EQ-011", name: "Floor Polisher", type: "Tool", status: "maintenance", checkedBy: "Not checked", checkTime: "-", lastMaintenance: "Sep 20, 2025" }
        ]
    },
    {
        id: "APT-CA-2025-016",
        client: "Jennifer Lee",
        date: "Nov 13, 2025",
        time: "3:00 PM",
        service: "Standard Cleaning",
        cleaner: "Sarah Chen",
        status: "In Progress",
        address: "404 Elm Avenue, Winnipeg, MB R3B 2T6",
        duration: "2.5 hours",
        cleanerCount: 1,
        instructions: "Regular bi-weekly cleaning. Focus on high-touch surfaces.",
        notes: [
            "Bi-weekly regular service",
            "Client has young children - extra sanitization",
            "Parking in rear alley"
        ],
        tasks: {
            completed: 6,
            total: 12,
            items: [
                { category: "Living Room", name: "Dust furniture", status: "completed", cleaner: "Sarah" },
                { category: "Kitchen", name: "Clean countertops", status: "in-progress", cleaner: "Sarah" },
                { category: "Bathroom", name: "Sanitize surfaces", status: "pending", cleaner: "Sarah" }
            ]
        },
        equipment: [
            { id: "EQ-012", name: "Disinfectant Sprayer", type: "Chemical", status: "in-use", checkedBy: "Sarah Chen", checkTime: "2:45 PM", lastMaintenance: "Nov 6, 2025" }
        ]
    },
    {
        id: "APT-CA-2025-017",
        client: "Thomas Brown",
        date: "Nov 14, 2025",
        time: "10:30 AM",
        service: "Steam Cleaning",
        cleaner: "John Martinez",
        status: "Scheduled",
        address: "505 Spruce Lane, Halifax, NS B3J 2T6",
        duration: "3 hours",
        cleanerCount: 2,
        instructions: "Steam clean upholstery and carpets. Water damage remediation needed.",
        notes: [
            "Previous water damage - mold prevention needed",
            "Focus on basement carpet",
            "Use antimicrobial solutions"
        ],
        tasks: {
            completed: 0,
            total: 15,
            items: []
        },
        equipment: [
            { id: "EQ-013", name: "Industrial Steam Cleaner", type: "Steam Cleaner", status: "available", checkedBy: "John Martinez", checkTime: "10:00 AM", lastMaintenance: "Nov 4, 2025" },
            { id: "EQ-014", name: "Dehumidifier", type: "Tool", status: "available", checkedBy: "John Martinez", checkTime: "10:05 AM", lastMaintenance: "Oct 29, 2025" }
        ]
    },
    {
        id: "APT-CA-2025-018",
        client: "Amanda White",
        date: "Nov 14, 2025",
        time: "2:00 PM",
        service: "Deep Cleaning",
        cleaner: "",
        status: "Ready for Scheduling",
        address: "606 Fir Street, Victoria, BC V8W 2T6",
        duration: "4 hours",
        cleanerCount: 2,
        instructions: "Spring cleaning service. All rooms including garage.",
        notes: [
            "Annual spring cleaning",
            "Garage included in service",
            "Client will provide snacks and drinks"
        ],
        tasks: {
            completed: 0,
            total: 25,
            items: []
        },
        equipment: []
    },
    {
        id: "APT-CA-2025-019",
        client: "Christopher Taylor",
        date: "Nov 15, 2025",
        time: "9:00 AM",
        service: "Move-Out Clean",
        cleaner: "David Kim",
        status: "Completed",
        address: "707 Poplar Road, Saskatoon, SK S7K 2T6",
        duration: "4.5 hours",
        cleanerCount: 2,
        instructions: "Final inspection at 2 PM. Landlord will be present.",
        notes: [
            "Landlord inspection at 2 PM",
            "Security deposit return depends on quality",
            "All windows must be spotless"
        ],
        tasks: {
            completed: 18,
            total: 18,
            items: [
                { category: "All Rooms", name: "Final inspection passed", status: "completed", cleaner: "David" }
            ]
        },
        equipment: [
            { id: "EQ-015", name: "Inspection Light", type: "Tool", status: "available", checkedBy: "David Kim", checkTime: "8:45 AM", lastMaintenance: "Nov 9, 2025" },
            { id: "EQ-016", name: "Glass Cleaner Kit", type: "Chemical", status: "available", checkedBy: "David Kim", checkTime: "8:50 AM", lastMaintenance: "Nov 1, 2025" }
        ]
    }
];

const cleaners = [
    {
        id: "john",
        name: "John Martinez",
        rating: 4.8,
        onTimeRate: "98%",
        tasksCompleted: 142,
        contact: "john@cleanflow.com",
        phone: "(555) 123-4567",
        status: "On Site",
        location: "Montreal, QC"
    },
    {
        id: "emily",
        name: "Emily Rodriguez",
        rating: 4.7,
        onTimeRate: "95%",
        tasksCompleted: 118,
        contact: "emily@cleanflow.com",
        phone: "(555) 987-6543",
        status: "Traveling",
        location: "Calgary, AB"
    },
    {
        id: "david",
        name: "David Kim",
        rating: 4.9,
        onTimeRate: "100%",
        tasksCompleted: 167,
        contact: "david@cleanflow.com",
        phone: "(555) 456-7890",
        status: "Available",
        location: "Toronto, ON"
    },
    {
        id: "sarah",
        name: "Sarah Chen",
        rating: 4.6,
        onTimeRate: "92%",
        tasksCompleted: 89,
        contact: "sarah@cleanflow.com",
        phone: "(555) 234-5678",
        status: "On Break",
        location: "Vancouver, BC"
    },
    {
        id: "team-a",
        name: "Team A",
        rating: 4.8,
        onTimeRate: "96%",
        tasksCompleted: 215,
        contact: "teama@cleanflow.com",
        phone: "(555) 111-2222",
        status: "On Site",
        location: "Various"
    },
    {
        id: "team-b",
        name: "Team B",
        rating: 4.7,
        onTimeRate: "94%",
        tasksCompleted: 198,
        contact: "teamb@cleanflow.com",
        phone: "(555) 333-4444",
        status: "Available",
        location: "Various"
    }
];

// Current modal appointment reference
let currentModalAppointment = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize table
    populateAppointmentTable();
    
    // Initialize stats
    updateDashboardStats();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup responsive table
    setupResponsiveTable();
});

// Populate appointment table
function populateAppointmentTable(filteredAppointments = appointments) {
    const tableBody = document.querySelector('#appointment-table tbody');
    tableBody.innerHTML = '';
    
    filteredAppointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', appointment.id);
        
        // Status badge class
        let statusClass = '';
        let statusText = appointment.status;
        
        switch(appointment.status) {
            case 'Ready for Scheduling':
                statusClass = 'cleaner-status-ready';
                break;
            case 'Scheduled':
                statusClass = 'cleaner-status-scheduled';
                break;
            case 'In Progress':
                statusClass = 'cleaner-status-in-progress';
                break;
            case 'Completed':
                statusClass = 'cleaner-status-completed';
                break;
        }
        
        // Equipment count
        const equipmentCount = appointment.equipment ? appointment.equipment.length : 0;
        
        row.innerHTML = `
            <td><strong>${appointment.id}</strong></td>
            <td>
                <div class="cleaner-client-info">
                    <strong>${appointment.client}</strong><br>
                    <small>${appointment.address.split(',')[0]}</small>
                </div>
            </td>
            <td>
                <div>${appointment.date}</div>
                <div><small>${appointment.time}</small></div>
            </td>
            <td>${appointment.service}</td>
            <td>
                ${appointment.cleaner ? 
                    `<span class="cleaner-assigned">${appointment.cleaner}</span>` : 
                    '<span class="cleaner-not-assigned">Not Assigned</span>'
                }
            </td>
            <td><span class="cleaner-status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="cleaner-equipment-summary">
                    <span class="cleaner-equipment-count">${equipmentCount} items</span>
                    <button class="cleaner-btn-equipment cleaner-view-equipment-btn" data-id="${appointment.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </td>
            <td>
                <div class="cleaner-action-buttons">
                    <button class="cleaner-btn-view cleaner-view-details-btn" data-id="${appointment.id}">
                        <i class="fas fa-eye"></i> Details
                    </button>
                    <button class="cleaner-btn-edit cleaner-edit-details-btn" data-id="${appointment.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update table count
    document.getElementById('table-count').textContent = `Showing ${filteredAppointments.length} appointments`;
    
    // Add event listeners to buttons
    attachTableEventListeners();
}

// Attach event listeners to table buttons
function attachTableEventListeners() {
    document.querySelectorAll('.cleaner-view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const aptId = this.dataset.id;
            openDetailsModal(aptId);
        });
    });
    
    document.querySelectorAll('.cleaner-view-equipment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const aptId = this.dataset.id;
            openEquipmentModal(aptId);
        });
    });
    
    document.querySelectorAll('.cleaner-edit-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const aptId = this.dataset.id;
            editAppointment(aptId);
        });
    });
}

// Update dashboard statistics
function updateDashboardStats() {
    const pending = appointments.filter(apt => apt.status === 'Ready for Scheduling').length;
    const activeCleaners = cleaners.filter(c => c.status === 'On Site' || c.status === 'Traveling').length;
    const completedToday = appointments.filter(apt => apt.status === 'Completed').length;
    
    document.getElementById('pending-count').textContent = pending;
    document.getElementById('active-cleaners').textContent = activeCleaners;
    document.getElementById('completed-today').textContent = completedToday;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
    document.getElementById('refresh-table').addEventListener('click', refreshTable);
    document.getElementById('export-data').addEventListener('click', exportData);
    
    // Modal close buttons
    document.querySelector('.cleaner-close-modal').addEventListener('click', closeDetailsModal);
    document.querySelector('.cleaner-close-equipment-modal').addEventListener('click', closeEquipmentModal);
    document.getElementById('close-details').addEventListener('click', closeDetailsModal);
    
    // Equipment modal close button
    const equipmentCloseBtn = document.getElementById('equipment-close');
    if (equipmentCloseBtn) {
        equipmentCloseBtn.addEventListener('click', closeEquipmentModal);
    }
    
    // Tab switching - IMPORTANT FIX
    document.querySelectorAll('.cleaner-tab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            console.log('Switching to tab:', tabName); // Debug
            switchTab(tabName);
        });
    });
    
    // Appointment form actions
    document.getElementById('edit-appointment').addEventListener('click', enableEditMode);
    document.getElementById('save-appointment').addEventListener('click', saveAppointmentChanges);
    
    // Cleaner assignment
    document.getElementById('assign-cleaner-btn').addEventListener('click', assignCleaner);
    document.getElementById('send-notifications').addEventListener('click', sendNotifications);
    document.getElementById('change-cleaner').addEventListener('click', changeCleaner);
    document.getElementById('cleaner-select').addEventListener('change', updateCleanerDetails);
    
    // Notes management
    document.getElementById('add-note-btn').addEventListener('click', showAddNoteForm);
    document.getElementById('save-note').addEventListener('click', saveNewNote);
    document.getElementById('cancel-note').addEventListener('click', hideAddNoteForm);
    
    // Equipment management (in details modal)
    const addEquipmentBtn = document.getElementById('add-equipment-btn');
    if (addEquipmentBtn) {
        addEquipmentBtn.addEventListener('click', showAddEquipmentForm);
    }
    
    const saveEquipmentBtn = document.getElementById('save-equipment');
    if (saveEquipmentBtn) {
        saveEquipmentBtn.addEventListener('click', saveNewEquipment);
    }
    
    const cancelEquipmentBtn = document.getElementById('cancel-equipment');
    if (cancelEquipmentBtn) {
        cancelEquipmentBtn.addEventListener('click', hideAddEquipmentForm);
    }
    
    // Equipment modal buttons
    const equipmentQuickAddBtn = document.getElementById('equipment-quick-add');
    if (equipmentQuickAddBtn) {
        equipmentQuickAddBtn.addEventListener('click', quickAddEquipment);
    }
    
    const equipmentCheckAllBtn = document.getElementById('equipment-check-all');
    if (equipmentCheckAllBtn) {
        equipmentCheckAllBtn.addEventListener('click', checkAllEquipment);
    }
    
    const equipmentSaveChangesBtn = document.getElementById('equipment-save-changes');
    if (equipmentSaveChangesBtn) {
        equipmentSaveChangesBtn.addEventListener('click', saveEquipmentStatus);
    }
    
    // Save all changes
    document.getElementById('save-all-changes').addEventListener('click', saveAllChanges);
    
    // Close modal when clicking outside
    document.querySelectorAll('.cleaner-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.id === 'details-modal') closeDetailsModal();
                if (this.id === 'equipment-view-modal') closeEquipmentModal();
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetailsModal();
            closeEquipmentModal();
        }
    });
}

// Filter functions
function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    const serviceFilter = document.getElementById('service-filter').value;
    
    let filtered = appointments;
    
    // Filter by status
    if (statusFilter !== 'all') {
        const statusMap = {
            'ready': 'Ready for Scheduling',
            'scheduled': 'Scheduled',
            'in-progress': 'In Progress',
            'completed': 'Completed'
        };
        filtered = filtered.filter(apt => apt.status === statusMap[statusFilter]);
    }
    
    // Filter by date (simplified)
    if (dateFilter) {
        // In real app, you would compare dates properly
        console.log('Date filter:', dateFilter);
    }
    
    // Filter by service
    if (serviceFilter !== 'all') {
        const serviceMap = {
            'deep': 'Deep Cleaning',
            'standard': 'Standard Cleaning',
            'steam': 'Steam Cleaning',
            'move': 'Move In/Out'
        };
        filtered = filtered.filter(apt => apt.service.includes(serviceMap[serviceFilter]));
    }
    
    populateAppointmentTable(filtered);
}

function clearFilters() {
    document.getElementById('status-filter').value = 'all';
    document.getElementById('date-filter').value = '2025-11-10';
    document.getElementById('service-filter').value = 'all';
    populateAppointmentTable(appointments);
}

function refreshTable() {
    // Simulate API refresh
    const refreshBtn = document.getElementById('refresh-table');
    const originalHTML = refreshBtn.innerHTML;
    
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    refreshBtn.disabled = true;
    
    setTimeout(() => {
        populateAppointmentTable(appointments);
        updateDashboardStats();
        refreshBtn.innerHTML = originalHTML;
        refreshBtn.disabled = false;
        
        // Show success message
        showToast('Table refreshed successfully!', 'success');
    }, 1000);
}

function exportData() {
    const data = {
        appointments: appointments,
        cleaners: cleaners,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaner-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully!', 'success');
}

// Modal functions
function openDetailsModal(aptId) {
    const appointment = appointments.find(apt => apt.id === aptId);
    if (!appointment) {
        showToast('Appointment not found!', 'error');
        return;
    }
    
    currentModalAppointment = appointment;
    
    // Set modal title
    document.getElementById('modal-appointment-id').textContent = appointment.id;
    
    // Set status badge
    const statusBadge = document.getElementById('modal-status-badge');
    statusBadge.textContent = appointment.status;
    statusBadge.className = 'cleaner-status-badge ';
    
    switch(appointment.status) {
        case 'Ready for Scheduling':
            statusBadge.classList.add('cleaner-status-ready');
            break;
        case 'Scheduled':
            statusBadge.classList.add('cleaner-status-scheduled');
            break;
        case 'In Progress':
            statusBadge.classList.add('cleaner-status-in-progress');
            break;
        case 'Completed':
            statusBadge.classList.add('cleaner-status-completed');
            break;
    }
    
    // Populate appointment tab
    document.getElementById('modal-client-name').value = appointment.client;
    document.getElementById('modal-service-type').value = appointment.service;
    document.getElementById('modal-date').value = appointment.date;
    document.getElementById('modal-time').value = appointment.time;
    document.getElementById('modal-address').value = appointment.address;
    document.getElementById('modal-duration').value = appointment.duration;
    document.getElementById('modal-cleaner-count').value = appointment.cleanerCount;
    document.getElementById('modal-instructions').value = appointment.instructions;
    
    // Populate cleaner assignment tab
    const cleanerSelect = document.getElementById('cleaner-select');
    cleanerSelect.innerHTML = `
        <option value="">-- Select Cleaner --</option>
        <option value="john">John Martinez (Rating: 4.8/5)</option>
        <option value="emily">Emily Rodriguez (Rating: 4.7/5)</option>
        <option value="david">David Kim (Rating: 4.9/5)</option>
        <option value="sarah">Sarah Chen (Rating: 4.6/5)</option>
        <option value="team-a">Team A (2 Cleaners)</option>
        <option value="team-b">Team B (3 Cleaners)</option>
    `;
    
    if (appointment.cleaner) {
        // Find cleaner ID based on name
        let cleanerId = '';
        const cleaner = cleaners.find(c => appointment.cleaner.includes(c.name));
        if (cleaner) cleanerId = cleaner.id;
        else if (appointment.cleaner.includes('Team A')) cleanerId = 'team-a';
        else if (appointment.cleaner.includes('Team B')) cleanerId = 'team-b';
        
        cleanerSelect.value = cleanerId;
        updateCleanerDetails();
        
        // Update assignment status
        document.getElementById('assignment-status').textContent = 'Assigned';
        document.getElementById('assignment-status').className = 'cleaner-badge';
        document.getElementById('assignment-status').classList.add(appointment.status === 'Ready for Scheduling' ? 'cleaner-status-ready' : 'cleaner-status-scheduled');
        
        // Show change button
        document.getElementById('change-cleaner').style.display = 'inline-flex';
        document.getElementById('assign-cleaner-btn').style.display = 'none';
    } else {
        cleanerSelect.value = '';
        document.getElementById('assignment-status').textContent = 'Not Assigned';
        document.getElementById('assignment-status').className = 'cleaner-badge cleaner-status-ready';
        document.getElementById('change-cleaner').style.display = 'none';
        document.getElementById('assign-cleaner-btn').style.display = 'inline-flex';
    }
    
    // Populate notes tab
    populateNotesList(appointment.notes);
    
    // Populate cleaner status tab
    if (appointment.cleaner) {
        const cleaner = cleaners.find(c => appointment.cleaner.includes(c.name));
        if (cleaner) {
            document.getElementById('cleaner-name').textContent = cleaner.name;
            document.getElementById('cleaner-rating').textContent = cleaner.rating;
            document.getElementById('cleaner-on-time').textContent = cleaner.onTimeRate;
            document.getElementById('cleaner-tasks').textContent = cleaner.tasksCompleted;
        } else if (appointment.cleaner.includes('Team')) {
            const team = cleaners.find(c => c.id === 'team-a' || c.id === 'team-b');
            document.getElementById('cleaner-name').textContent = appointment.cleaner;
            document.getElementById('cleaner-rating').textContent = team ? team.rating : '4.7';
            document.getElementById('cleaner-on-time').textContent = team ? team.onTimeRate : '95%';
            document.getElementById('cleaner-tasks').textContent = team ? team.tasksCompleted : '200';
        } else {
            document.getElementById('cleaner-name').textContent = appointment.cleaner;
            document.getElementById('cleaner-rating').textContent = 'N/A';
            document.getElementById('cleaner-on-time').textContent = 'N/A';
            document.getElementById('cleaner-tasks').textContent = 'N/A';
        }
    } else {
        document.getElementById('cleaner-name').textContent = 'Not Assigned';
        document.getElementById('cleaner-rating').textContent = '-';
        document.getElementById('cleaner-on-time').textContent = '-';
        document.getElementById('cleaner-tasks').textContent = '-';
    }
    
    // Populate tasks tab
    updateTaskProgress(appointment);
    
    // Populate location tab (simulated data)
    updateLocationData(appointment);
    
    // Populate equipment tab (in details modal)
    populateEquipmentTable(appointment.equipment);
    
    // Show modal
    document.getElementById('details-modal').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('details-modal').classList.add('active');
    }, 10);
    
    // Reset to first tab
    setTimeout(() => {
        switchTab('appointment');
    }, 50);
}

function updateLocationData(appointment) {
    // Simulate location data based on appointment status
    let locationText = "At cleaning site";
    let distance = "0 km";
    let eta = "Arrived";
    let lastUpdated = "Just now";
    
    if (appointment.status === 'Scheduled') {
        locationText = "Traveling to appointment";
        distance = `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9)} km`;
        eta = `${Math.floor(Math.random() * 30) + 5} minutes`;
        lastUpdated = "2 minutes ago";
    } else if (appointment.status === 'In Progress') {
        locationText = "At cleaning site";
        distance = "0 km";
        eta = "Arrived";
        lastUpdated = "5 minutes ago";
    } else if (appointment.status === 'Ready for Scheduling') {
        locationText = "Not yet dispatched";
        distance = "N/A";
        eta = "N/A";
        lastUpdated = "N/A";
    } else if (appointment.status === 'Completed') {
        locationText = "Returning to base";
        distance = `${Math.floor(Math.random() * 8) + 2}.${Math.floor(Math.random() * 9)} km`;
        eta = `${Math.floor(Math.random() * 25) + 10} minutes`;
        lastUpdated = "10 minutes ago";
    }
    
    document.getElementById('current-location').textContent = locationText;
    document.getElementById('distance').textContent = distance;
    document.getElementById('eta').textContent = eta;
    document.getElementById('last-updated').textContent = lastUpdated;
}

function closeDetailsModal() {
    document.getElementById('details-modal').classList.remove('active');
    setTimeout(() => {
        document.getElementById('details-modal').style.display = 'none';
    }, 300);
    disableEditMode();
    currentModalAppointment = null;
}

function openEquipmentModal(aptId) {
    const appointment = appointments.find(apt => apt.id === aptId);
    if (!appointment) {
        showToast('Appointment not found!', 'error');
        return;
    }
    
    // Set modal title
    document.getElementById('equipment-modal-appointment-id').textContent = appointment.id;
    
    // Populate equipment summary
    const equipmentCount = appointment.equipment ? appointment.equipment.length : 0;
    const availableCount = appointment.equipment ? appointment.equipment.filter(e => e.status === 'available').length : 0;
    const inUseCount = appointment.equipment ? appointment.equipment.filter(e => e.status === 'in-use').length : 0;
    const maintenanceCount = appointment.equipment ? appointment.equipment.filter(e => e.status === 'maintenance').length : 0;
    
    document.getElementById('equipment-total').textContent = equipmentCount;
    document.getElementById('equipment-available').textContent = availableCount;
    document.getElementById('equipment-in-use').textContent = inUseCount;
    document.getElementById('equipment-maintenance').textContent = maintenanceCount;
    
    // Populate equipment table
    const equipmentList = document.getElementById('equipment-view-list');
    equipmentList.innerHTML = '';
    
    if (appointment.equipment && appointment.equipment.length > 0) {
        appointment.equipment.forEach(equip => {
            const row = document.createElement('tr');
            
            let statusClass = '';
            let statusText = equip.status;
            switch(equip.status) {
                case 'available': 
                    statusClass = 'cleaner-status-available';
                    statusText = 'Available';
                    break;
                case 'in-use': 
                    statusClass = 'cleaner-status-in-use';
                    statusText = 'In Use';
                    break;
                case 'maintenance': 
                    statusClass = 'cleaner-status-maintenance';
                    statusText = 'Maintenance';
                    break;
                case 'unavailable': 
                    statusClass = 'cleaner-status-unavailable';
                    statusText = 'Unavailable';
                    break;
            }
            
            row.innerHTML = `
                <td>${equip.id}</td>
                <td>${equip.name}</td>
                <td>${equip.type}</td>
                <td><span class="cleaner-equipment-status ${statusClass}">${statusText}</span></td>
                <td>${appointment.cleaner || 'Not assigned'}</td>
                <td>${equip.checkedBy}</td>
                <td>${equip.checkTime}</td>
                <td>${equip.lastMaintenance || 'Never'}</td>
                <td>
                    <button class="cleaner-btn cleaner-btn-sm cleaner-btn-secondary" data-equip-id="${equip.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            equipmentList.appendChild(row);
        });
    } else {
        equipmentList.innerHTML = `
            <tr>
                <td colspan="9" class="cleaner-text-center" style="text-align: center; padding: 2rem;">
                    No equipment assigned to this appointment.
                </td>
            </tr>
        `;
    }
    
    // Show modal
    document.getElementById('equipment-view-modal').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('equipment-view-modal').classList.add('active');
    }, 10);
}

function closeEquipmentModal() {
    document.getElementById('equipment-view-modal').classList.remove('active');
    setTimeout(() => {
        document.getElementById('equipment-view-modal').style.display = 'none';
    }, 300);
}

// Tab switching - FIXED VERSION
function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.cleaner-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Remove active class from all tab panes
    document.querySelectorAll('.cleaner-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected tab button
    const tabBtn = document.querySelector(`.cleaner-tab-btn[data-tab="${tabName}"]`);
    if (tabBtn) {
        tabBtn.classList.add('active');
        console.log('Tab button found and activated');
    } else {
        console.error('Tab button not found for:', tabName);
    }
    
    // Add active class to selected tab pane
    const tabPane = document.getElementById(`${tabName}-tab`);
    if (tabPane) {
        tabPane.classList.add('active');
        console.log('Tab pane found and activated');
    } else {
        console.error('Tab pane not found for:', tabName);
    }
}

// Appointment editing
function enableEditMode() {
    const inputs = document.querySelectorAll('#appointment-tab input, #appointment-tab textarea');
    inputs.forEach(input => {
        if (input.id !== 'modal-client-name' && input.id !== 'modal-service-type') {
            input.readOnly = false;
            input.style.backgroundColor = '#fff';
            input.style.borderColor = '#3498db';
        }
    });
    
    document.getElementById('edit-appointment').style.display = 'none';
    document.getElementById('save-appointment').style.display = 'inline-flex';
}

function disableEditMode() {
    const inputs = document.querySelectorAll('#appointment-tab input, #appointment-tab textarea');
    inputs.forEach(input => {
        input.readOnly = true;
        input.style.backgroundColor = '#f8f9fa';
        input.style.borderColor = '#ddd';
    });
    
    document.getElementById('edit-appointment').style.display = 'inline-flex';
    document.getElementById('save-appointment').style.display = 'none';
}

function saveAppointmentChanges() {
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const appointment = appointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        // Update appointment data
        appointment.instructions = document.getElementById('modal-instructions').value;
        appointment.duration = document.getElementById('modal-duration').value;
        appointment.cleanerCount = parseInt(document.getElementById('modal-cleaner-count').value) || appointment.cleanerCount;
        
        // Update table
        const row = document.querySelector(`tr[data-id="${aptId}"]`);
        if (row) {
            // Update relevant cells in table
            const cleanerCountCell = row.querySelector('.cleaner-client-info');
            if (cleanerCountCell) {
                // Update display if needed
            }
        }
        
        disableEditMode();
        showToast('Appointment details updated successfully!', 'success');
    }
}

// Cleaner assignment
function updateCleanerDetails() {
    const cleanerId = document.getElementById('cleaner-select').value;
    const detailsDiv = document.getElementById('selected-cleaner-details');
    
    if (cleanerId) {
        const cleaner = cleaners.find(c => c.id === cleanerId) || 
                       { name: cleanerId.includes('team') ? 'Team A' : 'John Martinez', rating: 4.5, onTimeRate: '96%', tasksCompleted: 120 };
        
        detailsDiv.innerHTML = `
            <h4>Cleaner Information</h4>
            <div class="cleaner-detail-item">
                <strong>Name:</strong> ${cleaner.name}
            </div>
            <div class="cleaner-detail-item">
                <strong>Rating:</strong> ${cleaner.rating}/5 <i class="fas fa-star"></i>
            </div>
            <div class="cleaner-detail-item">
                <strong>On-time Rate:</strong> ${cleaner.onTimeRate}
            </div>
            <div class="cleaner-detail-item">
                <strong>Tasks Completed:</strong> ${cleaner.tasksCompleted}
            </div>
            ${cleaner.contact ? `
            <div class="cleaner-detail-item">
                <strong>Contact:</strong> ${cleaner.contact}
            </div>
            ` : ''}
            ${cleaner.phone ? `
            <div class="cleaner-detail-item">
                <strong>Phone:</strong> ${cleaner.phone}
            </div>
            ` : ''}
        `;
        detailsDiv.style.display = 'block';
    } else {
        detailsDiv.style.display = 'none';
    }
}

function assignCleaner() {
    const cleanerSelect = document.getElementById('cleaner-select');
    const cleanerValue = cleanerSelect.value;
    
    if (!cleanerValue) {
        showToast('Please select a cleaner first!', 'warning');
        return;
    }
    
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const appointment = appointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        let cleanerName = '';
        if (cleanerValue.includes('team')) {
            cleanerName = cleanerValue === 'team-a' ? 'Team A' : 'Team B';
        } else {
            const cleaner = cleaners.find(c => c.id === cleanerValue);
            cleanerName = cleaner ? cleaner.name : 'Selected Cleaner';
        }
        
        appointment.cleaner = cleanerName;
        appointment.status = 'Scheduled';
        
        // Update UI
        document.getElementById('assignment-status').textContent = 'Assigned';
        document.getElementById('assignment-status').className = 'cleaner-badge cleaner-status-scheduled';
        
        document.getElementById('change-cleaner').style.display = 'inline-flex';
        document.getElementById('assign-cleaner-btn').style.display = 'none';
        
        // Update cleaner status tab
        const cleaner = cleaners.find(c => cleanerName.includes(c.name));
        if (cleaner) {
            document.getElementById('cleaner-name').textContent = cleaner.name;
            document.getElementById('cleaner-rating').textContent = cleaner.rating;
            document.getElementById('cleaner-on-time').textContent = cleaner.onTimeRate;
            document.getElementById('cleaner-tasks').textContent = cleaner.tasksCompleted;
        }
        
        // Update location data
        updateLocationData(appointment);
        
        // Update main table
        populateAppointmentTable();
        updateDashboardStats();
        
        showToast(`Successfully assigned ${cleanerName} to ${aptId}!`, 'success');
    }
}

function changeCleaner() {
    document.getElementById('cleaner-select').value = '';
    document.getElementById('selected-cleaner-details').style.display = 'none';
    document.getElementById('assignment-status').textContent = 'Not Assigned';
    document.getElementById('assignment-status').className = 'cleaner-badge cleaner-status-ready';
    document.getElementById('change-cleaner').style.display = 'none';
    document.getElementById('assign-cleaner-btn').style.display = 'inline-flex';
    
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const appointment = appointments.find(apt => apt.id === aptId);
    if (appointment) {
        appointment.cleaner = '';
        appointment.status = 'Ready for Scheduling';
        populateAppointmentTable();
        updateDashboardStats();
        updateLocationData(appointment);
    }
}

function sendNotifications() {
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const cleaner = document.getElementById('cleaner-select').value;
    
    if (!cleaner) {
        showToast('Please assign a cleaner first!', 'warning');
        return;
    }
    
    // Simulate sending notifications
    const btn = document.getElementById('send-notifications');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        showToast('Notifications sent to client and cleaner!', 'success');
    }, 1500);
}

// Notes management
function populateNotesList(notes) {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    
    if (notes && notes.length > 0) {
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.className = 'cleaner-note-item';
            noteItem.innerHTML = `
                <i class="fas fa-sticky-note"></i>
                <div class="cleaner-note-content">
                    ${note}
                </div>
                <div class="cleaner-note-actions">
                    <button class="cleaner-btn cleaner-btn-sm cleaner-btn-danger cleaner-delete-note-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            notesList.appendChild(noteItem);
        });
        
        // Add delete event listeners
        document.querySelectorAll('.cleaner-delete-note-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteNote(parseInt(this.dataset.index));
            });
        });
    } else {
        notesList.innerHTML = `
            <div class="cleaner-empty-state" style="text-align: center; padding: 2rem; color: #718096;">
                <i class="fas fa-sticky-note" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p>No notes added yet</p>
            </div>
        `;
    }
}

function showAddNoteForm() {
    document.getElementById('add-note-form').style.display = 'block';
    document.getElementById('add-note-btn').style.display = 'none';
}

function hideAddNoteForm() {
    document.getElementById('add-note-form').style.display = 'none';
    document.getElementById('add-note-btn').style.display = 'block';
    document.getElementById('new-note').value = '';
}

function saveNewNote() {
    const noteText = document.getElementById('new-note').value.trim();
    
    if (!noteText) {
        showToast('Please enter a note!', 'warning');
        return;
    }
    
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const appointment = appointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        if (!appointment.notes) appointment.notes = [];
        appointment.notes.push(noteText);
        populateNotesList(appointment.notes);
        hideAddNoteForm();
        showToast('Note added successfully!', 'success');
    }
}

function deleteNote(index) {
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const appointment = appointments.find(apt => apt.id === aptId);
    
    if (appointment && confirm('Are you sure you want to delete this note?')) {
        appointment.notes.splice(index, 1);
        populateNotesList(appointment.notes);
        showToast('Note deleted!', 'success');
    }
}

// Task management
function updateTaskProgress(appointment) {
    const progressFill = document.querySelector('#tasks-tab .cleaner-progress-fill');
    const progressText = document.querySelector('#tasks-tab .cleaner-progress-text');
    const taskCategories = document.querySelector('#tasks-tab .cleaner-task-categories');
    
    if (appointment.tasks && appointment.tasks.total > 0) {
        const percentage = (appointment.tasks.completed / appointment.tasks.total) * 100;
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${Math.round(percentage)}% Complete`;
        
        // Update task list
        if (taskCategories && appointment.tasks.items.length > 0) {
            // Group tasks by category
            const categories = {};
            appointment.tasks.items.forEach(task => {
                if (!categories[task.category]) {
                    categories[task.category] = [];
                }
                categories[task.category].push(task);
            });
            
            let html = '';
            Object.keys(categories).forEach(category => {
                html += `
                    <div class="cleaner-category">
                        <h4><i class="fas fa-${getCategoryIcon(category)}"></i> ${category} Tasks</h4>
                        <div class="cleaner-task-list">
                `;
                
                categories[category].forEach(task => {
                    const completed = task.status === 'completed';
                    const inProgress = task.status === 'in-progress';
                    let statusClass = '';
                    let statusText = task.status;
                    
                    if (completed) {
                        statusClass = 'cleaner-completed';
                        statusText = 'Completed';
                    } else if (inProgress) {
                        statusClass = 'cleaner-in-progress';
                        statusText = 'In Progress';
                    } else {
                        statusClass = 'cleaner-pending';
                        statusText = 'Pending';
                    }
                    
                    html += `
                        <div class="cleaner-task-item ${statusClass}">
                            <input type="checkbox" ${completed ? 'checked' : ''} disabled>
                            <label>${task.name}</label>
                            <span class="cleaner-task-status">${statusText}</span>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            });
            
            taskCategories.innerHTML = html;
        }
    } else {
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = '0% Complete';
        if (taskCategories) taskCategories.innerHTML = `
            <div class="cleaner-empty-state" style="text-align: center; padding: 2rem; color: #718096;">
                <i class="fas fa-tasks" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p>No tasks assigned yet</p>
            </div>
        `;
    }
}

function getCategoryIcon(category) {
    const icons = {
        'Bedroom': 'bed',
        'Kitchen': 'utensils',
        'Bathroom': 'bath',
        'Living Room': 'couch',
        'General': 'tasks'
    };
    return icons[category] || 'tasks';
}

// Equipment management
function populateEquipmentTable(equipment) {
    const tableBody = document.getElementById('equipment-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (equipment && equipment.length > 0) {
        equipment.forEach(item => {
            const row = document.createElement('tr');
            
            let statusClass = '';
            let statusText = item.status;
            switch(item.status) {
                case 'available': 
                    statusClass = 'cleaner-status-available';
                    statusText = 'Available';
                    break;
                case 'in-use': 
                    statusClass = 'cleaner-status-in-use';
                    statusText = 'In Use';
                    break;
                case 'maintenance': 
                    statusClass = 'cleaner-status-maintenance';
                    statusText = 'Maintenance';
                    break;
                case 'unavailable': 
                    statusClass = 'cleaner-status-unavailable';
                    statusText = 'Unavailable';
                    break;
            }
            
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td><span class="cleaner-equipment-status ${statusClass}">${statusText}</span></td>
                <td>${item.checkedBy}</td>
                <td>${item.checkTime}</td>
                <td>${item.lastMaintenance || 'Never'}</td>
                <td>
                    <button class="cleaner-btn cleaner-btn-sm cleaner-btn-secondary">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="cleaner-btn cleaner-btn-sm cleaner-btn-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="cleaner-text-center" style="text-align: center; padding: 2rem;">
                    No equipment assigned to this appointment.
                </td>
            </tr>
        `;
    }
}

function showAddEquipmentForm() {
    document.getElementById('add-equipment-form').style.display = 'block';
    document.getElementById('add-equipment-btn').style.display = 'none';
}

function hideAddEquipmentForm() {
    document.getElementById('add-equipment-form').style.display = 'none';
    document.getElementById('add-equipment-btn').style.display = 'block';
    document.getElementById('equipment-name').value = '';
    document.getElementById('equipment-type').value = 'steam';
    document.getElementById('equipment-status').value = 'available';
    document.getElementById('equipment-notes').value = '';
}

function saveNewEquipment() {
    const name = document.getElementById('equipment-name').value.trim();
    const type = document.getElementById('equipment-type').value;
    const status = document.getElementById('equipment-status').value;
    const notes = document.getElementById('equipment-notes').value.trim();
    
    if (!name) {
        showToast('Please enter equipment name!', 'warning');
        return;
    }
    
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const appointment = appointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        const newId = `EQ-${(appointment.equipment.length + 1).toString().padStart(3, '0')}`;
        const newEquipment = {
            id: newId,
            name: name,
            type: getEquipmentTypeName(type),
            status: status,
            checkedBy: 'Not checked',
            checkTime: '-',
            notes: notes,
            lastMaintenance: 'Never'
        };
        
        if (!appointment.equipment) appointment.equipment = [];
        appointment.equipment.push(newEquipment);
        
        populateEquipmentTable(appointment.equipment);
        hideAddEquipmentForm();
        
        // Update main table equipment count
        const row = document.querySelector(`tr[data-id="${aptId}"]`);
        if (row) {
            const countCell = row.querySelector('.cleaner-equipment-count');
            if (countCell) {
                countCell.textContent = `${appointment.equipment.length} items`;
            }
        }
        
        showToast('Equipment added successfully!', 'success');
    }
}

function getEquipmentTypeName(type) {
    const types = {
        'steam': 'Steam Cleaning',
        'vacuum': 'Vacuum',
        'chemical': 'Chemical/Supplies',
        'tool': 'Tool',
        'safety': 'Safety Equipment'
    };
    return types[type] || type;
}

function quickAddEquipment() {
    const commonEquipment = [
        { name: "Steam Cleaning Machine", type: "Steam Cleaning" },
        { name: "HEPA Vacuum Cleaner", type: "Vacuum" },
        { name: "Microfiber Cloths (20 pack)", type: "Chemical/Supplies" },
        { name: "Eco-friendly Cleaning Solution", type: "Chemical/Supplies" },
        { name: "Extension Ladder", type: "Tool" }
    ];
    
    const aptId = prompt("Enter appointment ID to add equipment to:", "APT-CA-2025-012");
    if (!aptId) return;
    
    const appointment = appointments.find(apt => apt.id === aptId);
    if (!appointment) {
        showToast('Appointment not found!', 'error');
        return;
    }
    
    if (!appointment.equipment) appointment.equipment = [];
    
    commonEquipment.forEach((equip, index) => {
        const newId = `EQ-${(appointment.equipment.length + index + 1).toString().padStart(3, '0')}`;
        appointment.equipment.push({
            id: newId,
            name: equip.name,
            type: equip.type,
            status: 'available',
            checkedBy: 'Not checked',
            checkTime: '-',
            lastMaintenance: 'Never'
        });
    });
    
    showToast(`Added 5 common equipment items to ${aptId}!`, 'success');
    
    // If this equipment modal is open for this appointment, refresh it
    if (document.getElementById('equipment-view-modal').classList.contains('active')) {
        openEquipmentModal(aptId);
    }
}

function checkAllEquipment() {
    const checkboxes = document.querySelectorAll('#equipment-view-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    showToast('All equipment marked as checked!', 'success');
}

function saveEquipmentStatus() {
    // In a real app, this would save equipment status changes
    showToast('Equipment status saved successfully!', 'success');
    closeEquipmentModal();
}

// Edit appointment from table
function editAppointment(aptId) {
    openDetailsModal(aptId);
    setTimeout(() => {
        enableEditMode();
    }, 100);
}

// Save all changes
function saveAllChanges() {
    // Save all pending changes from all tabs
    const aptId = document.getElementById('modal-appointment-id').textContent;
    const appointment = appointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        // Save appointment details if in edit mode
        if (document.getElementById('save-appointment').style.display !== 'none') {
            saveAppointmentChanges();
        }
        
        // Note: Other changes (notes, equipment) are saved immediately when made
        
        showToast('All changes saved successfully!', 'success');
        setTimeout(() => {
            closeDetailsModal();
        }, 1000);
    }
}

// Utility function to show toast messages
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.cleaner-toast');
    if (existingToast) existingToast.remove();
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `cleaner-toast cleaner-toast-${type}`;
    toast.innerHTML = `
        <div class="cleaner-toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="cleaner-toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
    
    // Close button
    toast.querySelector('.cleaner-toast-close').addEventListener('click', function() {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
}

// Add toast styles to head
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.cleaner-toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: white;
    color: #333;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    z-index: 10000;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 400px;
}

.cleaner-toast.show {
    transform: translateY(0);
    opacity: 1;
}

.cleaner-toast-success {
    border-left: 4px solid #48bb78;
}

.cleaner-toast-error {
    border-left: 4px solid #f56565;
}

.cleaner-toast-warning {
    border-left: 4px solid #ecc94b;
}

.cleaner-toast-info {
    border-left: 4px solid #4299e1;
}

.cleaner-toast-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.cleaner-toast-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #718096;
    line-height: 1;
}

.cleaner-toast-close:hover {
    color: #f56565;
}
`;
document.head.appendChild(toastStyles);

// Add responsive table behavior
function setupResponsiveTable() {
    const table = document.getElementById('appointment-table');
    const tableContainer = table ? table.closest('.cleaner-table-container') : null;
    
    if (!tableContainer) return;
    
    // Add scroll indicators for mobile
    tableContainer.style.position = 'relative';
    
    // Add left scroll indicator
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'cleaner-scroll-indicator left';
    leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
    tableContainer.appendChild(leftIndicator);
    
    // Add right scroll indicator
    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'cleaner-scroll-indicator right';
    rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
    tableContainer.appendChild(rightIndicator);
    
    // Update indicator visibility on scroll
    tableContainer.addEventListener('scroll', function() {
        const scrollLeft = this.scrollLeft;
        const scrollWidth = this.scrollWidth;
        const clientWidth = this.clientWidth;
        
        leftIndicator.style.opacity = scrollLeft > 0 ? '1' : '0.3';
        rightIndicator.style.opacity = scrollLeft < (scrollWidth - clientWidth - 10) ? '1' : '0.3';
    });
    
    // Initial check
    tableContainer.dispatchEvent(new Event('scroll'));
    
    // Add mobile view for table rows
    if (window.innerWidth < 768) {
        convertTableToCards();
    }
    
    // Listen for resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            convertTableToCards();
        } else {
            restoreTable();
        }
    });
}

function convertTableToCards() {
    const table = document.getElementById('appointment-table');
    if (!table) return;
    
    const tableBody = table.querySelector('tbody');
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
    
    // Check if already converted
    if (tableBody.classList.contains('converted')) return;
    
    tableBody.classList.add('converted');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        const card = document.createElement('div');
        card.className = 'cleaner-mobile-card';
        card.setAttribute('data-id', row.getAttribute('data-id'));
        
        let cardHTML = '';
        cells.forEach((cell, index) => {
            if (index < headers.length - 1) { // Exclude actions from initial display
                const label = headers[index];
                const value = cell.innerHTML;
                cardHTML += `
                    <div class="cleaner-mobile-row">
                        <span class="cleaner-mobile-label">${label}:</span>
                        <span class="cleaner-mobile-value">${value}</span>
                    </div>
                `;
            }
        });
        
        // Add actions as buttons at bottom
        const actionCell = cells[cells.length - 1];
        cardHTML += `
            <div class="cleaner-mobile-actions">
                ${actionCell.innerHTML}
            </div>
        `;
        
        card.innerHTML = cardHTML;
        row.replaceWith(card);
    });
    
    // Hide table headers
    const tableHead = table.querySelector('thead');
    if (tableHead) tableHead.style.display = 'none';
    
    // Re-attach event listeners for mobile cards
    setTimeout(() => {
        document.querySelectorAll('.cleaner-mobile-card .cleaner-view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.cleaner-mobile-card');
                const aptId = card.getAttribute('data-id');
                openDetailsModal(aptId);
            });
        });
        
        document.querySelectorAll('.cleaner-mobile-card .cleaner-view-equipment-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.cleaner-mobile-card');
                const aptId = card.getAttribute('data-id');
                openEquipmentModal(aptId);
            });
        });
        
        document.querySelectorAll('.cleaner-mobile-card .cleaner-edit-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.cleaner-mobile-card');
                const aptId = card.getAttribute('data-id');
                editAppointment(aptId);
            });
        });
    }, 100);
}

function restoreTable() {
    const table = document.getElementById('appointment-table');
    if (!table) return;
    
    const tableBody = table.querySelector('tbody');
    
    if (tableBody.classList.contains('converted')) {
        // Remove cards and restore rows
        const cards = tableBody.querySelectorAll('.cleaner-mobile-card');
        cards.forEach(card => card.remove());
        
        // Show headers
        const tableHead = table.querySelector('thead');
        if (tableHead) tableHead.style.display = '';
        tableBody.classList.remove('converted');
        
        // Repopulate table
        populateAppointmentTable();
    }
}

// Add mobile card styles dynamically
function addMobileCardStyles() {
    const styles = `
        .cleaner-mobile-card {
            background: #ffffff;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }
        
        .cleaner-mobile-row {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .cleaner-mobile-row:last-child {
            border-bottom: none;
        }
        
        .cleaner-mobile-label {
            font-weight: 500;
            color: #4a5568;
            font-size: 0.85rem;
        }
        
        .cleaner-mobile-value {
            text-align: right;
            color: #2d3748;
            max-width: 60%;
            word-break: break-word;
        }
        
        .cleaner-mobile-value .cleaner-status-badge {
            display: inline-block;
            padding: 2px 8px;
            font-size: 0.75rem;
        }
        
        .cleaner-mobile-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e2e8f0;
        }
        
        .cleaner-mobile-actions .cleaner-btn-view,
        .cleaner-mobile-actions .cleaner-btn-edit {
            flex: 1;
            justify-content: center;
        }
        
        .cleaner-mobile-actions .cleaner-btn-equipment {
            width: 100%;
            justify-content: center;
            margin-top: 0.5rem;
        }
        
        .cleaner-scroll-indicator {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: #ffffff;
            border: 1px solid #e2e8f0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            opacity: 0.3;
            transition: opacity 0.3s;
            pointer-events: none;
        }
        
        .cleaner-scroll-indicator.left {
            left: 10px;
        }
        
        .cleaner-scroll-indicator.right {
            right: 10px;
        }
        
        .cleaner-scroll-indicator i {
            font-size: 0.75rem;
            color: #2d3748;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize mobile styles
addMobileCardStyles();

// Initialize modals to hidden state on load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('details-modal').style.display = 'none';
    document.getElementById('equipment-view-modal').style.display = 'none';
});