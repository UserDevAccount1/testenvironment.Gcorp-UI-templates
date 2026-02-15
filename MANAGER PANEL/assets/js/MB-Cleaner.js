// MB-Cleaner.js - Cleaner Management Dashboard JavaScript (Updated Version)
// Sample Data - 10 APPOINTMENTS with Property Type and Media Files
const cleanerAppointments = [
    {
        id: "APT-CA-2025-010",
        client: "Sarah Johnson",
        date: "Nov 10, 2025",
        time: "10:00 AM",
        service: "Deep Cleaning",
        propertyType: "residential",
        cleaner: "John Martinez",
        status: "Scheduled",
        address: "123 Main Street, Toronto, ON M5V 2T6",
        duration: "3.5 hours",
        cleanerCount: 2,
        instructions: "Please use eco-friendly products. Client has pet allergies. Key in lockbox with code 4521.",
        notes: [
            { 
                id: 1, 
                content: "Client has pet allergies - use hypoallergenic products", 
                mediaType: "text", 
                addedBy: "client", 
                date: "Nov 9, 2025", 
                convertToTask: false 
            },
            { 
                id: 2, 
                content: "Key available in lockbox - code: 4521", 
                mediaType: "text", 
                addedBy: "manager", 
                date: "Nov 9, 2025", 
                convertToTask: true 
            },
            { 
                id: 3, 
                content: "Small friendly dog present - will be in crate during service", 
                mediaType: "image", 
                mediaFile: "sample-image.jpg",
                addedBy: "client", 
                date: "Nov 9, 2025", 
                convertToTask: false 
            },
            { 
                id: 4, 
                content: "Video instructions for delicate surfaces", 
                mediaType: "video", 
                mediaFile: "sample-video.mp4",
                addedBy: "manager", 
                date: "Nov 9, 2025", 
                convertToTask: true 
            },
            { 
                id: 5, 
                content: "Audio recording of special client requests", 
                mediaType: "audio", 
                mediaFile: "sample-audio.mp3",
                addedBy: "client", 
                date: "Nov 9, 2025", 
                convertToTask: false 
            }
        ],
        tasks: {
            completed: 8,
            total: 12,
            items: [
                { id: 1, category: "Bedroom", name: "Change bed sheets", status: "completed", cleaner: "John", proof: "photo", approved: true, comment: "Well done" },
                { id: 2, category: "Bedroom", name: "Wipe all surfaces", status: "completed", cleaner: "John", proof: "video", approved: true, comment: "" },
                { id: 3, category: "Bedroom", name: "Vacuum carpet", status: "pending", cleaner: "John", proof: null, approved: false, comment: "" }
            ]
        },
        equipment: [
            { 
                id: "EQ-001", 
                name: "Steam Cleaning Machine", 
                type: "Steam Cleaner", 
                status: "in-use", 
                photo: "sample-equipment.jpg", 
                checkedBy: "John Martinez", 
                checkTime: "10:15 AM", 
                lastMaintenance: "Nov 1, 2025", 
                photoApproved: "pending", 
                managerComment: "Check for any leaks" 
            }
        ],
        chatMessages: [
            { id: 1, sender: "manager", message: "Hi John, please remember to use eco-friendly products only", time: "9:30 AM" },
            { id: 2, sender: "cleaner", message: "Understood. I have all the required products ready", time: "9:32 AM" }
        ],
        cleanerStatus: {
            current: "On Site",
            timeline: [
                { time: "10:30 AM", event: "Appointment assigned", status: "completed" },
                { time: "11:00 AM", event: "Cleaner accepted appointment", status: "completed" }
            ]
        }
    },
    {
        id: "APT-CA-2025-011",
        client: "Michael Chen",
        date: "Nov 11, 2025",
        time: "2:00 PM",
        service: "Move-Out Clean",
        propertyType: "commercial",
        cleaner: "Team A",
        status: "In Progress",
        address: "456 Oak Avenue, Vancouver, BC V6B 2T9",
        duration: "4 hours",
        cleanerCount: 3,
        instructions: "Empty apartment. Focus on kitchen degreasing and bathroom sanitization.",
        notes: [
            { 
                id: 4, 
                content: "Empty apartment - all furniture removed", 
                mediaType: "text", 
                addedBy: "client", 
                date: "Nov 10, 2025", 
                convertToTask: true 
            }
        ],
        tasks: {
            completed: 5,
            total: 15,
            items: [
                { id: 7, category: "General", name: "Dust all surfaces", status: "completed", cleaner: "Team", proof: "photo", approved: true, comment: "" }
            ]
        },
        equipment: [
            { 
                id: "EQ-005", 
                name: "Commercial Vacuum", 
                type: "Vacuum", 
                status: "in-use", 
                photo: "commercial-vacuum.jpg", 
                checkedBy: "Team Lead", 
                checkTime: "1:45 PM", 
                lastMaintenance: "Nov 3, 2025", 
                photoApproved: "yes", 
                managerComment: "Working perfectly" 
            }
        ],
        chatMessages: [],
        cleanerStatus: {
            current: "Traveling",
            timeline: []
        }
    },
    {
        id: "APT-CA-2025-012",
        client: "Emma Rodriguez",
        date: "Nov 12, 2025",
        time: "9:00 AM",
        service: "Steam Cleaning",
        propertyType: "residential",
        cleaner: "",
        status: "Ready for Scheduling",
        address: "789 Pine Road, Montreal, QC H3B 2T6",
        duration: "2.5 hours",
        cleanerCount: 1,
        instructions: "Steam clean carpets in living room and bedrooms. Use pet-safe solutions.",
        notes: [],
        tasks: { completed: 0, total: 0, items: [] },
        equipment: [],
        chatMessages: [],
        cleanerStatus: { current: "", timeline: [] }
    },
    {
        id: "APT-CA-2025-013",
        client: "David Wilson",
        date: "Nov 12, 2025",
        time: "1:00 PM",
        service: "Standard Cleaning",
        propertyType: "residential",
        cleaner: "Emily Rodriguez",
        status: "Scheduled",
        address: "101 Maple Boulevard, Calgary, AB T2P 2T6",
        duration: "2 hours",
        cleanerCount: 1,
        instructions: "Focus on kitchen and bathrooms. Client will be home during service.",
        notes: [],
        tasks: { completed: 0, total: 0, items: [] },
        equipment: [],
        chatMessages: [],
        cleanerStatus: { current: "", timeline: [] }
    },
    {
        id: "APT-CA-2025-014",
        client: "Lisa Thompson",
        date: "Nov 11, 2025",
        time: "11:00 AM",
        service: "Deep Cleaning",
        propertyType: "commercial",
        cleaner: "David Kim",
        status: "Completed",
        address: "202 Birch Lane, Ottawa, ON K1P 2T6",
        duration: "3 hours",
        cleanerCount: 1,
        instructions: "Post-renovation cleanup. Dust control important.",
        notes: [],
        tasks: { completed: 0, total: 0, items: [] },
        equipment: [],
        chatMessages: [],
        cleanerStatus: { current: "", timeline: [] }
    }
];

const cleanerCleaners = [
    {
        id: "john",
        name: "John Martinez",
        rating: 4.8,
        onTimeRate: "98%",
        tasksCompleted: 142,
        contact: "john@cleanflow.com",
        phone: "(555) 123-4567",
        status: "On Site",
        location: "Montreal, QC",
        chatStatus: "online"
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
        location: "Calgary, AB",
        chatStatus: "away"
    }
];

// Sample media files
const cleanerSampleMedia = {
    images: ['sample-image.jpg', 'equipment-photo.jpg', 'cleaning-before.jpg', 'cleaning-after.jpg'],
    videos: ['sample-video.mp4', 'cleaning-process.mp4', 'tutorial.mp4'],
    audio: ['sample-audio.mp3', 'client-instructions.mp3', 'feedback.mp3']
};

// Current modal appointment reference
let cleanerCurrentModalAppointment = null;
let cleanerCurrentPage = 1;
const cleanerItemsPerPage = 5;
let cleanerFilteredAppointments = cleanerAppointments;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cleaner Management Dashboard Initializing...');
    
    // Initialize table
    cleanerSetupPagination();
    cleanerPopulateAppointmentTable();
    
    // Initialize stats
    cleanerUpdateDashboardStats();
    
    // Setup event listeners
    cleanerSetupEventListeners();
    
    // Setup responsive table
    cleanerSetupResponsiveTable();
});

// Setup pagination
function cleanerSetupPagination() {
    const totalPages = Math.ceil(cleanerAppointments.length / cleanerItemsPerPage);
    const pagesContainer = document.getElementById('cleaner-pagination-pages');
    if (!pagesContainer) {
        console.error('Pagination pages container not found!');
        return;
    }
    
    pagesContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `cleaner-page-btn ${i === cleanerCurrentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            cleanerCurrentPage = i;
            cleanerUpdatePagination();
            cleanerPopulateAppointmentTable();
        });
        pagesContainer.appendChild(pageBtn);
    }
    
    cleanerUpdatePagination();
}

function cleanerUpdatePagination() {
    const totalPages = Math.ceil(cleanerFilteredAppointments.length / cleanerItemsPerPage);
    const prevBtn = document.getElementById('cleaner-prev-page');
    const nextBtn = document.getElementById('cleaner-next-page');
    const pageBtns = document.querySelectorAll('.cleaner-page-btn');
    
    if (!prevBtn || !nextBtn) {
        console.error('Pagination buttons not found!');
        return;
    }
    
    // Update active page
    pageBtns.forEach(btn => {
        btn.classList.remove('active');
        const pageNum = parseInt(btn.textContent);
        btn.classList.toggle('active', pageNum === cleanerCurrentPage);
        btn.style.display = 'flex';
        
        // Show only relevant pages
        if (pageNum > cleanerCurrentPage + 2 || pageNum < cleanerCurrentPage - 2) {
            btn.style.display = 'none';
        }
    });
    
    // Update button states
    prevBtn.disabled = cleanerCurrentPage === 1;
    nextBtn.disabled = cleanerCurrentPage === totalPages;
    
    // Update page buttons
    prevBtn.addEventListener('click', () => {
        if (cleanerCurrentPage > 1) {
            cleanerCurrentPage--;
            cleanerUpdatePagination();
            cleanerPopulateAppointmentTable();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (cleanerCurrentPage < totalPages) {
            cleanerCurrentPage++;
            cleanerUpdatePagination();
            cleanerPopulateAppointmentTable();
        }
    });
}

// Populate appointment table
function cleanerPopulateAppointmentTable() {
    const tableBody = document.getElementById('cleaner-table-body');
    if (!tableBody) {
        console.error('Table body not found!');
        return;
    }
    
    tableBody.innerHTML = '';
    
    const startIndex = (cleanerCurrentPage - 1) * cleanerItemsPerPage;
    const endIndex = startIndex + cleanerItemsPerPage;
    const pageAppointments = cleanerFilteredAppointments.slice(startIndex, endIndex);
    
    if (pageAppointments.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 2rem;">
                    <div class="cleaner-empty-state">
                        <i class="fas fa-inbox"></i>
                        <h3>No appointments found</h3>
                        <p>Try adjusting your filters or check back later</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        pageAppointments.forEach(appointment => {
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
            
            // Property type badge
            const propertyClass = appointment.propertyType === 'residential' 
                ? 'cleaner-property-residential' 
                : 'cleaner-property-commercial';
            const propertyText = appointment.propertyType === 'residential' 
                ? 'Residential' 
                : 'Commercial';
            
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
                <td><span class="${propertyClass}">${propertyText}</span></td>
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
    }
    
    // Update table count
    const totalAppointments = cleanerFilteredAppointments.length;
    const showing = Math.min(cleanerItemsPerPage, totalAppointments - startIndex);
    document.getElementById('cleaner-table-count').textContent = 
        `Showing ${showing} of ${totalAppointments} appointments`;
    
    // Add event listeners to buttons
    cleanerAttachTableEventListeners();
}

// Attach event listeners to table buttons
function cleanerAttachTableEventListeners() {
    console.log('Attaching table event listeners...');
    
    // View Details buttons
    document.querySelectorAll('.cleaner-view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const aptId = this.getAttribute('data-id');
            console.log('View Details clicked for:', aptId);
            cleanerOpenDetailsModal(aptId);
        });
    });
    
    // View Equipment buttons
    document.querySelectorAll('.cleaner-view-equipment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const aptId = this.getAttribute('data-id');
            console.log('View Equipment clicked for:', aptId);
            cleanerOpenEquipmentModal(aptId);
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.cleaner-edit-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const aptId = this.getAttribute('data-id');
            console.log('Edit clicked for:', aptId);
            cleanerEditAppointment(aptId);
        });
    });
}

// Update dashboard statistics
function cleanerUpdateDashboardStats() {
    const pending = cleanerAppointments.filter(apt => apt.status === 'Ready for Scheduling').length;
    const activeCleaners = cleanerCleaners.filter(c => c.status === 'On Site' || c.status === 'Traveling').length;
    const completedToday = cleanerAppointments.filter(apt => apt.status === 'Completed').length;
    
    document.getElementById('cleaner-pending-count').textContent = pending;
    document.getElementById('cleaner-active-cleaners').textContent = activeCleaners;
    document.getElementById('cleaner-completed-today').textContent = completedToday;
}

// Setup event listeners
function cleanerSetupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Filter buttons
    const applyFiltersBtn = document.getElementById('cleaner-apply-filters');
    const clearFiltersBtn = document.getElementById('cleaner-clear-filters');
    const refreshTableBtn = document.getElementById('cleaner-refresh-table');
    const exportDataBtn = document.getElementById('cleaner-export-data');
    
    if (applyFiltersBtn) applyFiltersBtn.addEventListener('click', cleanerApplyFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', cleanerClearFilters);
    if (refreshTableBtn) refreshTableBtn.addEventListener('click', cleanerRefreshTable);
    if (exportDataBtn) exportDataBtn.addEventListener('click', cleanerExportData);
    
    // Modal close buttons
    const closeModalBtn = document.getElementById('cleaner-close-modal');
    const closeEquipmentModalBtn = document.getElementById('cleaner-close-equipment-modal');
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', cleanerCloseDetailsModal);
    if (closeEquipmentModalBtn) closeEquipmentModalBtn.addEventListener('click', cleanerCloseEquipmentModal);
    
    // Tab switching
    document.querySelectorAll('.cleaner-tab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            console.log('Switching to tab:', tabName);
            cleanerSwitchTab(tabName);
        });
    });
    
    // Appointment form actions
    const editAppointmentBtn = document.getElementById('cleaner-edit-appointment');
    const saveAppointmentBtn = document.getElementById('cleaner-save-appointment');
    
    if (editAppointmentBtn) editAppointmentBtn.addEventListener('click', cleanerEnableEditMode);
    if (saveAppointmentBtn) saveAppointmentBtn.addEventListener('click', cleanerSaveAppointmentChanges);
    
    // Cleaner assignment
    const assignCleanerBtn = document.getElementById('cleaner-assign-cleaner-btn');
    const sendNotificationsBtn = document.getElementById('cleaner-send-notifications');
    const changeCleanerBtn = document.getElementById('cleaner-change-cleaner');
    const cleanerSelect = document.getElementById('cleaner-cleaner-select');
    
    if (assignCleanerBtn) assignCleanerBtn.addEventListener('click', cleanerAssignCleaner);
    if (sendNotificationsBtn) sendNotificationsBtn.addEventListener('click', cleanerSendNotifications);
    if (changeCleanerBtn) changeCleanerBtn.addEventListener('click', cleanerChangeCleaner);
    if (cleanerSelect) cleanerSelect.addEventListener('change', cleanerUpdateCleanerDetails);
    
    // Notes management
    const addNoteBtn = document.getElementById('cleaner-add-note-btn');
    const saveNoteBtn = document.getElementById('cleaner-save-note');
    const cancelNoteBtn = document.getElementById('cleaner-cancel-note');
    
    if (addNoteBtn) addNoteBtn.addEventListener('click', cleanerShowAddNoteForm);
    if (saveNoteBtn) saveNoteBtn.addEventListener('click', function() {
        const noteId = this.getAttribute('data-note-id');
        if (noteId) {
            cleanerUpdateNote(parseInt(noteId));
        } else {
            cleanerSaveNewNote();
        }
    });
    if (cancelNoteBtn) cancelNoteBtn.addEventListener('click', cleanerHideAddNoteForm);
    
    // Equipment management
    const addEquipmentBtn = document.getElementById('cleaner-add-equipment-btn');
    const saveEquipmentBtn = document.getElementById('cleaner-save-equipment');
    const cancelEquipmentBtn = document.getElementById('cleaner-cancel-equipment');
    
    if (addEquipmentBtn) addEquipmentBtn.addEventListener('click', cleanerShowAddEquipmentForm);
    if (saveEquipmentBtn) saveEquipmentBtn.addEventListener('click', cleanerSaveNewEquipment);
    if (cancelEquipmentBtn) cancelEquipmentBtn.addEventListener('click', cleanerHideAddEquipmentForm);
    
    // Chat functionality
    const sendChatBtn = document.getElementById('cleaner-send-chat');
    const chatInput = document.getElementById('cleaner-chat-input');
    
    if (sendChatBtn) sendChatBtn.addEventListener('click', cleanerSendChatMessage);
    if (chatInput) chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            cleanerSendChatMessage();
        }
    });
    
    // Message cleaner button
    const messageCleanerBtn = document.getElementById('cleaner-message-cleaner');
    if (messageCleanerBtn) {
        messageCleanerBtn.addEventListener('click', function() {
            cleanerSwitchTab('cleaner-chat');
        });
    }
    
    // Save all changes
    const saveAllChangesBtn = document.getElementById('cleaner-save-all-changes');
    if (saveAllChangesBtn) saveAllChangesBtn.addEventListener('click', cleanerSaveAllChanges);
    
    // Close modal when clicking outside
    document.querySelectorAll('.cleaner-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.id === 'cleaner-details-modal') cleanerCloseDetailsModal();
                if (this.id === 'cleaner-equipment-view-modal') cleanerCloseEquipmentModal();
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cleanerCloseDetailsModal();
            cleanerCloseEquipmentModal();
        }
    });
    
    console.log('Event listeners setup complete');
}

// Filter functions
function cleanerApplyFilters() {
    const statusFilter = document.getElementById('cleaner-status-filter').value;
    const serviceFilter = document.getElementById('cleaner-service-filter').value;
    const propertyFilter = document.getElementById('cleaner-property-filter').value;
    
    cleanerFilteredAppointments = cleanerAppointments;
    
    // Filter by status
    if (statusFilter !== 'all') {
        const statusMap = {
            'ready': 'Ready for Scheduling',
            'scheduled': 'Scheduled',
            'in-progress': 'In Progress',
            'completed': 'Completed'
        };
        cleanerFilteredAppointments = cleanerFilteredAppointments.filter(apt => apt.status === statusMap[statusFilter]);
    }
    
    // Filter by service
    if (serviceFilter !== 'all') {
        const serviceMap = {
            'deep': 'Deep Cleaning',
            'standard': 'Standard Cleaning',
            'steam': 'Steam Cleaning',
            'move': 'Move In/Out'
        };
        cleanerFilteredAppointments = cleanerFilteredAppointments.filter(apt => apt.service.includes(serviceMap[serviceFilter]));
    }
    
    // Filter by property type
    if (propertyFilter !== 'all') {
        cleanerFilteredAppointments = cleanerFilteredAppointments.filter(apt => apt.propertyType === propertyFilter);
    }
    
    cleanerCurrentPage = 1;
    cleanerSetupPagination();
    cleanerPopulateAppointmentTable();
    
    cleanerShowToast('Filters applied!', 'success');
}

function cleanerClearFilters() {
    document.getElementById('cleaner-status-filter').value = 'all';
    document.getElementById('cleaner-date-filter').value = '2025-11-10';
    document.getElementById('cleaner-service-filter').value = 'all';
    document.getElementById('cleaner-property-filter').value = 'all';
    cleanerFilteredAppointments = cleanerAppointments;
    cleanerCurrentPage = 1;
    cleanerSetupPagination();
    cleanerPopulateAppointmentTable();
    
    cleanerShowToast('Filters cleared!', 'success');
}

function cleanerRefreshTable() {
    const refreshBtn = document.getElementById('cleaner-refresh-table');
    const originalHTML = refreshBtn.innerHTML;
    
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    refreshBtn.disabled = true;
    
    setTimeout(() => {
        cleanerCurrentPage = 1;
        cleanerFilteredAppointments = cleanerAppointments;
        cleanerSetupPagination();
        cleanerPopulateAppointmentTable();
        cleanerUpdateDashboardStats();
        refreshBtn.innerHTML = originalHTML;
        refreshBtn.disabled = false;
        
        cleanerShowToast('Table refreshed successfully!', 'success');
    }, 1000);
}

function cleanerExportData() {
    const data = {
        appointments: cleanerAppointments,
        cleaners: cleanerCleaners,
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
    
    cleanerShowToast('Data exported successfully!', 'success');
}

// Modal functions
function cleanerOpenDetailsModal(aptId) {
    console.log('Opening details modal for:', aptId);
    
    const appointment = cleanerAppointments.find(apt => apt.id === aptId);
    if (!appointment) {
        cleanerShowToast('Appointment not found!', 'error');
        return;
    }
    
    cleanerCurrentModalAppointment = appointment;
    
    // Set modal title
    document.getElementById('cleaner-modal-appointment-id').textContent = appointment.id;
    
    // Set status badge
    const statusBadge = document.getElementById('cleaner-modal-status-badge');
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
    document.getElementById('cleaner-modal-client-name').value = appointment.client;
    document.getElementById('cleaner-modal-service-type').value = appointment.service;
    document.getElementById('cleaner-modal-property-type').value = appointment.propertyType;
    document.getElementById('cleaner-modal-date').value = appointment.date;
    document.getElementById('cleaner-modal-time').value = appointment.time;
    document.getElementById('cleaner-modal-address').value = appointment.address;
    document.getElementById('cleaner-modal-duration').value = appointment.duration;
    document.getElementById('cleaner-modal-cleaner-count').value = appointment.cleanerCount;
    document.getElementById('cleaner-modal-instructions').value = appointment.instructions;
    
    // Populate cleaner assignment tab
    const cleanerSelect = document.getElementById('cleaner-cleaner-select');
    if (appointment.cleaner) {
        // Find cleaner ID based on name
        let cleanerId = '';
        const cleaner = cleanerCleaners.find(c => appointment.cleaner.includes(c.name));
        if (cleaner) cleanerId = cleaner.id;
        else if (appointment.cleaner.includes('Team A')) cleanerId = 'team-a';
        
        if (cleanerSelect) cleanerSelect.value = cleanerId;
        cleanerUpdateCleanerDetails();
        
        // Update assignment status
        const assignmentStatus = document.getElementById('cleaner-assignment-status');
        if (assignmentStatus) {
            assignmentStatus.textContent = 'Assigned';
            assignmentStatus.className = 'cleaner-badge';
            assignmentStatus.classList.add(appointment.status === 'Ready for Scheduling' ? 'cleaner-status-ready' : 'cleaner-status-scheduled');
        }
        
        // Show change button
        const changeCleanerBtn = document.getElementById('cleaner-change-cleaner');
        const assignCleanerBtn = document.getElementById('cleaner-assign-cleaner-btn');
        if (changeCleanerBtn) changeCleanerBtn.style.display = 'inline-flex';
        if (assignCleanerBtn) assignCleanerBtn.style.display = 'none';
    } else {
        if (cleanerSelect) cleanerSelect.value = '';
        const assignmentStatus = document.getElementById('cleaner-assignment-status');
        if (assignmentStatus) {
            assignmentStatus.textContent = 'Not Assigned';
            assignmentStatus.className = 'cleaner-badge cleaner-status-ready';
        }
        
        const changeCleanerBtn = document.getElementById('cleaner-change-cleaner');
        const assignCleanerBtn = document.getElementById('cleaner-assign-cleaner-btn');
        if (changeCleanerBtn) changeCleanerBtn.style.display = 'none';
        if (assignCleanerBtn) assignCleanerBtn.style.display = 'inline-flex';
    }
    
    // Populate notes tab
    cleanerPopulateNotesTable(appointment.notes);
    
    // Populate cleaner status tab
    cleanerPopulateCleanerStatus(appointment);
    
    // Populate tasks tab
    cleanerUpdateTaskProgress(appointment);
    
    // Populate chat tab
    cleanerPopulateChatMessages(appointment.chatMessages);
    
    // Populate location tab
    cleanerUpdateLocationData(appointment);
    
    // Populate equipment tab
    cleanerPopulateEquipmentTable(appointment.equipment);
    
    // Show modal
    const modal = document.getElementById('cleaner-details-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Reset to first tab
        setTimeout(() => {
            cleanerSwitchTab('cleaner-appointment');
        }, 50);
        
        console.log('Modal opened successfully');
    } else {
        console.error('Modal not found!');
    }
}

function cleanerUpdateLocationData(appointment) {
    // Simulate geofence data
    const distance = appointment.status === 'In Progress' ? '15m' : '45m';
    const status = appointment.status === 'In Progress' ? 'INSIDE' : 'OUTSIDE';
    const zoneStatus = appointment.status === 'In Progress' ? 'Inside 15m zone' : 'Outside geofence';
    
    document.getElementById('cleaner-floatingDistanceValue').textContent = distance;
    document.getElementById('cleaner-floatingZoneStatus').textContent = zoneStatus;
    document.getElementById('cleaner-floatingCurrentJob').textContent = appointment.client;
    document.getElementById('cleaner-floatingJobAddress').textContent = appointment.address.split(',')[0];
    document.getElementById('cleaner-floatingJobTime').textContent = `${appointment.time} (${appointment.duration})`;
    document.getElementById('cleaner-floatingPropertyType').textContent = appointment.propertyType === 'residential' ? 'Residential' : 'Commercial';
    
    // Update geofence status
    const geofenceStatus = document.getElementById('cleaner-floatingGeofenceStatus');
    const serviceLockStatus = document.getElementById('cleaner-floatingServiceLockStatus');
    const cleanerDot = document.getElementById('cleaner-floatingCleanerDot');
    
    if (appointment.status === 'In Progress') {
        geofenceStatus.innerHTML = '<i class="fas fa-circle" style="color: #10b981;"></i><span>Status: INSIDE geofence</span>';
        serviceLockStatus.textContent = 'UNLOCKED';
        serviceLockStatus.style.color = '#10b981';
        
        // Position cleaner dot inside 15m zone
        cleanerDot.style.top = '180px';
        cleanerDot.style.left = '180px';
        cleanerDot.style.background = '#10b981';
        cleanerDot.style.boxShadow = '0 0 0 2px #10b981';
    } else {
        geofenceStatus.innerHTML = '<i class="fas fa-circle" style="color: #ef4444;"></i><span>Status: OUTSIDE geofence</span>';
        serviceLockStatus.textContent = 'LOCKED';
        serviceLockStatus.style.color = '#ef4444';
        
        // Position cleaner dot outside 30m zone
        cleanerDot.style.top = '50px';
        cleanerDot.style.left = '50px';
        cleanerDot.style.background = '#ef4444';
        cleanerDot.style.boxShadow = '0 0 0 2px #ef4444';
    }
    
    // Update last update time
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('cleaner-floatingLastUpdate').textContent = timeStr;
    
    // Update auto arrival time if in progress
    if (appointment.status === 'In Progress') {
        document.getElementById('cleaner-floatingAutoArrivalTime').textContent = timeStr;
    }
}

function cleanerCloseDetailsModal() {
    const modal = document.getElementById('cleaner-details-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        cleanerDisableEditMode();
        cleanerCurrentModalAppointment = null;
    }
}

function cleanerOpenEquipmentModal(aptId) {
    const appointment = cleanerAppointments.find(apt => apt.id === aptId);
    if (!appointment) {
        cleanerShowToast('Appointment not found!', 'error');
        return;
    }
    
    // Set modal title
    document.getElementById('cleaner-equipment-modal-appointment-id').textContent = appointment.id;
    
    // Populate equipment summary
    const equipmentCount = appointment.equipment ? appointment.equipment.length : 0;
    const availableCount = appointment.equipment ? appointment.equipment.filter(e => e.status === 'available').length : 0;
    const inUseCount = appointment.equipment ? appointment.equipment.filter(e => e.status === 'in-use').length : 0;
    const maintenanceCount = appointment.equipment ? appointment.equipment.filter(e => e.status === 'maintenance').length : 0;
    
    document.getElementById('cleaner-equipment-total').textContent = equipmentCount;
    document.getElementById('cleaner-equipment-available').textContent = availableCount;
    document.getElementById('cleaner-equipment-in-use').textContent = inUseCount;
    document.getElementById('cleaner-equipment-maintenance').textContent = maintenanceCount;
    
    // Populate equipment table
    cleanerPopulateEquipmentViewTable(appointment);
    
    // Show modal
    const modal = document.getElementById('cleaner-equipment-view-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function cleanerCloseEquipmentModal() {
    const modal = document.getElementById('cleaner-equipment-view-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Tab switching
function cleanerSwitchTab(tabName) {
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
    }
    
    // Add active class to selected tab pane
    const tabPane = document.getElementById(`${tabName}-tab`);
    if (tabPane) {
        tabPane.classList.add('active');
    }
}

// Notes Management
function cleanerPopulateNotesTable(notes) {
    const tableBody = document.getElementById('cleaner-notes-table-body');
    const notesCount = document.getElementById('cleaner-notes-count');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (notes && notes.length > 0) {
        // Update notes count
        if (notesCount) notesCount.textContent = notes.length;
        
        notes.forEach((note) => {
            const row = document.createElement('tr');
            
            // Media type badge and preview
            let mediaContent = '';
            let mediaClass = '';
            let mediaText = note.mediaType;
            
            switch(note.mediaType) {
                case 'text':
                    mediaClass = 'cleaner-media-text';
                    mediaText = 'Text';
                    mediaContent = '<span>Text Only</span>';
                    break;
                case 'image':
                    mediaClass = 'cleaner-media-image';
                    mediaText = 'Image';
                    mediaContent = `
                        <img src="./assets/images/${note.mediaFile || 'sample-image.jpg'}" 
                             alt="Note Image" 
                             class="cleaner-media-image-preview"
                             onclick="cleanerViewMedia('image', '${note.mediaFile || 'sample-image.jpg'}', '${note.content}')">
                    `;
                    break;
                case 'audio':
                    mediaClass = 'cleaner-media-audio';
                    mediaText = 'Audio';
                    mediaContent = `
                        <div class="cleaner-media-audio-preview" 
                             onclick="cleanerViewMedia('audio', '${note.mediaFile || 'sample-audio.mp3'}', '${note.content}')">
                            <i class="fas fa-volume-up"></i>
                            <span>Play Audio</span>
                        </div>
                    `;
                    break;
                case 'video':
                    mediaClass = 'cleaner-media-video';
                    mediaText = 'Video';
                    mediaContent = `
                        <div class="cleaner-media-video-preview" 
                             onclick="cleanerViewMedia('video', '${note.mediaFile || 'sample-video.mp4'}', '${note.content}')">
                            <i class="fas fa-play"></i>
                            <span>Play Video</span>
                        </div>
                    `;
                    break;
            }
            
            // Added by badge
            let addedClass = '';
            let addedText = note.addedBy;
            switch(note.addedBy) {
                case 'manager':
                    addedClass = 'cleaner-added-manager';
                    addedText = 'Manager';
                    break;
                case 'client':
                    addedClass = 'cleaner-added-client';
                    addedText = 'Client';
                    break;
                case 'cleaner':
                    addedClass = 'cleaner-added-cleaner';
                    addedText = 'Cleaner';
                    break;
            }
            
            row.innerHTML = `
                <td>${note.id}</td>
                <td style="max-width: 300px; word-wrap: break-word;">${note.content}</td>
                <td>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <span class="cleaner-media-badge ${mediaClass}">${mediaText}</span>
                        ${mediaContent}
                    </div>
                </td>
                <td><span class="cleaner-added-by ${addedClass}">${addedText}</span></td>
                <td>${note.date}</td>
                <td>
                    <label class="cleaner-switch">
                        <input type="checkbox" ${note.convertToTask ? 'checked' : ''} disabled>
                        <span class="cleaner-slider"></span>
                    </label>
                </td>
                <td>
                    <div class="cleaner-note-actions" style="display: flex; gap: 0.25rem;">
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-secondary" onclick="cleanerEditNote(${note.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-danger" onclick="cleanerDeleteNote(${note.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                        ${note.mediaType !== 'text' ? 
                            `<button class="cleaner-btn cleaner-btn-sm cleaner-btn-primary" 
                                    onclick="cleanerViewMedia('${note.mediaType}', '${note.mediaFile || 'sample-image.jpg'}', '${note.content}')">
                                <i class="fas fa-eye"></i>
                            </button>` : ''
                        }
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        if (notesCount) notesCount.textContent = '0';
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="cleaner-text-center" style="text-align: center; padding: 2rem;">
                    <div class="cleaner-empty-state">
                        <i class="fas fa-sticky-note"></i>
                        <p>No notes added yet.</p>
                    </div>
                </td>
            </tr>
        `;
    }
}

function cleanerShowAddNoteForm() {
    const form = document.getElementById('cleaner-add-note-form');
    const btn = document.getElementById('cleaner-add-note-btn');
    if (form) form.style.display = 'block';
    if (btn) btn.style.display = 'none';
}

function cleanerHideAddNoteForm() {
    const form = document.getElementById('cleaner-add-note-form');
    const btn = document.getElementById('cleaner-add-note-btn');
    if (form) form.style.display = 'none';
    if (btn) btn.style.display = 'block';
    
    // Reset form
    document.getElementById('cleaner-new-note').value = '';
    document.getElementById('cleaner-note-media-type').value = 'text';
    document.getElementById('cleaner-media-file').value = 'sample-image.jpg';
    document.getElementById('cleaner-note-added-by').value = 'manager';
    document.getElementById('cleaner-convert-to-task').checked = false;
    
    // Reset save button
    const saveBtn = document.getElementById('cleaner-save-note');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Note';
    saveBtn.removeAttribute('data-note-id');
}

function cleanerSaveNewNote() {
    const content = document.getElementById('cleaner-new-note').value.trim();
    const mediaType = document.getElementById('cleaner-note-media-type').value;
    const mediaFile = document.getElementById('cleaner-media-file').value.trim();
    const addedBy = document.getElementById('cleaner-note-added-by').value;
    const convertToTask = document.getElementById('cleaner-convert-to-task').checked;
    
    if (!content) {
        cleanerShowToast('Please enter note content!', 'warning');
        return;
    }
    
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    const newId = appointment.notes.length > 0 
        ? Math.max(...appointment.notes.map(n => n.id)) + 1 
        : 1;
    
    const newNote = {
        id: newId,
        content: content,
        mediaType: mediaType,
        mediaFile: mediaFile || (mediaType !== 'text' ? `sample-${mediaType}.${mediaType === 'image' ? 'jpg' : mediaType === 'video' ? 'mp4' : 'mp3'}` : ''),
        addedBy: addedBy,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        convertToTask: convertToTask
    };
    
    appointment.notes.push(newNote);
    cleanerPopulateNotesTable(appointment.notes);
    cleanerHideAddNoteForm();
    
    cleanerShowToast('Note added successfully!', 'success');
}

// Add note edit and delete functions
function cleanerEditNote(noteId) {
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    const note = appointment.notes.find(n => n.id === noteId);
    if (!note) return;
    
    // Pre-fill the add note form for editing
    document.getElementById('cleaner-new-note').value = note.content;
    document.getElementById('cleaner-note-media-type').value = note.mediaType;
    document.getElementById('cleaner-media-file').value = note.mediaFile || '';
    document.getElementById('cleaner-note-added-by').value = note.addedBy;
    document.getElementById('cleaner-convert-to-task').checked = note.convertToTask;
    
    // Change button text
    document.getElementById('cleaner-save-note').innerHTML = '<i class="fas fa-save"></i> Update Note';
    document.getElementById('cleaner-save-note').setAttribute('data-note-id', noteId);
    
    cleanerShowAddNoteForm();
}

function cleanerDeleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    appointment.notes = appointment.notes.filter(n => n.id !== noteId);
    cleanerPopulateNotesTable(appointment.notes);
    
    cleanerShowToast('Note deleted successfully!', 'success');
}

// Update note function
function cleanerUpdateNote(noteId) {
    const content = document.getElementById('cleaner-new-note').value.trim();
    const mediaType = document.getElementById('cleaner-note-media-type').value;
    const mediaFile = document.getElementById('cleaner-media-file').value.trim();
    const addedBy = document.getElementById('cleaner-note-added-by').value;
    const convertToTask = document.getElementById('cleaner-convert-to-task').checked;
    
    if (!content) {
        cleanerShowToast('Please enter note content!', 'warning');
        return;
    }
    
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    const noteIndex = appointment.notes.findIndex(n => n.id === noteId);
    if (noteIndex === -1) return;
    
    appointment.notes[noteIndex] = {
        ...appointment.notes[noteIndex],
        content: content,
        mediaType: mediaType,
        mediaFile: mediaFile,
        addedBy: addedBy,
        convertToTask: convertToTask
    };
    
    cleanerPopulateNotesTable(appointment.notes);
    cleanerHideAddNoteForm();
    
    cleanerShowToast('Note updated successfully!', 'success');
}

// New function to view media
function cleanerViewMedia(type, filename, title) {
    // Create media modal
    let modalHtml = '';
    
    switch(type) {
        case 'image':
            modalHtml = `
                <div class="cleaner-modal-content" style="max-width: 800px;">
                    <div class="cleaner-modal-header">
                        <h2><i class="fas fa-image"></i> Image Preview: ${title}</h2>
                        <button class="cleaner-close-modal" onclick="cleanerCloseMediaModal()">&times;</button>
                    </div>
                    <div class="cleaner-photo-modal-content">
                        <img src="./assets/images/${filename}" 
                             alt="${title}" 
                             class="cleaner-photo-display"
                             id="cleaner-media-display">
                        <div class="cleaner-photo-actions">
                            <button class="cleaner-btn cleaner-btn-primary" onclick="cleanerDownloadMedia('${filename}')">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="cleaner-btn cleaner-btn-secondary" onclick="cleanerCloseMediaModal()">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'video':
            modalHtml = `
                <div class="cleaner-modal-content" style="max-width: 800px;">
                    <div class="cleaner-modal-header">
                        <h2><i class="fas fa-video"></i> Video Preview: ${title}</h2>
                        <button class="cleaner-close-modal" onclick="cleanerCloseMediaModal()">&times;</button>
                    </div>
                    <div class="cleaner-photo-modal-content">
                        <video controls class="cleaner-media-player" id="cleaner-media-display">
                            <source src="./assets/media/${filename}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="cleaner-photo-actions">
                            <button class="cleaner-btn cleaner-btn-primary" onclick="cleanerDownloadMedia('${filename}')">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="cleaner-btn cleaner-btn-secondary" onclick="cleanerCloseMediaModal()">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'audio':
            modalHtml = `
                <div class="cleaner-modal-content" style="max-width: 600px;">
                    <div class="cleaner-modal-header">
                        <h2><i class="fas fa-volume-up"></i> Audio Preview: ${title}</h2>
                        <button class="cleaner-close-modal" onclick="cleanerCloseMediaModal()">&times;</button>
                    </div>
                    <div class="cleaner-photo-modal-content">
                        <audio controls class="cleaner-media-player" id="cleaner-media-display">
                            <source src="./assets/media/${filename}" type="audio/mp3">
                            Your browser does not support the audio element.
                        </audio>
                        <div class="cleaner-photo-actions">
                            <button class="cleaner-btn cleaner-btn-primary" onclick="cleanerDownloadMedia('${filename}')">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="cleaner-btn cleaner-btn-secondary" onclick="cleanerCloseMediaModal()">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'cleaner-modal active';
    modalContainer.id = 'cleaner-media-modal';
    modalContainer.innerHTML = modalHtml;
    modalContainer.style.display = 'flex';
    
    // Add to body
    document.body.appendChild(modalContainer);
    
    // Add click outside to close
    modalContainer.addEventListener('click', function(e) {
        if (e.target === this) {
            cleanerCloseMediaModal();
        }
    });
}

// Close media modal
function cleanerCloseMediaModal() {
    const modal = document.getElementById('cleaner-media-modal');
    if (modal) {
        // Stop any playing media
        const mediaElement = document.getElementById('cleaner-media-display');
        if (mediaElement) {
            if (mediaElement.pause) mediaElement.pause();
            if (mediaElement.currentTime) mediaElement.currentTime = 0;
        }
        
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Download media file
function cleanerDownloadMedia(filename) {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    link.click();
    
    cleanerShowToast(`Downloading ${filename}...`, 'success');
}

// Cleaner Status
function cleanerPopulateCleanerStatus(appointment) {
    if (appointment.cleaner) {
        const cleaner = cleanerCleaners.find(c => appointment.cleaner.includes(c.name));
        
        // Update cleaner info card
        if (cleaner) {
            document.getElementById('cleaner-cleaner-name').textContent = cleaner.name;
            document.getElementById('cleaner-cleaner-rating').textContent = cleaner.rating;
            document.getElementById('cleaner-cleaner-on-time').textContent = cleaner.onTimeRate;
            document.getElementById('cleaner-cleaner-tasks').textContent = cleaner.tasksCompleted;
            
            // Update status dot
            const statusDot = document.getElementById('cleaner-cleaner-status-dot');
            const statusText = document.getElementById('cleaner-cleaner-current-status-text');
            
            if (statusDot && statusText) {
                statusDot.className = 'cleaner-status-dot active';
                statusText.textContent = cleaner.status;
            }
            
            // Update chat partner
            const chatPartner = document.getElementById('cleaner-chat-partner');
            if (chatPartner) chatPartner.textContent = cleaner.name;
        }
    }
    
    // Populate timeline
    const timeline = document.getElementById('cleaner-status-timeline');
    if (timeline) {
        timeline.innerHTML = '';
        
        if (appointment.cleanerStatus && appointment.cleanerStatus.timeline) {
            appointment.cleanerStatus.timeline.forEach(item => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'cleaner-timeline-item';
                
                const markerClass = item.status === 'completed' ? 'completed' : 'pending';
                
                timelineItem.innerHTML = `
                    <div class="cleaner-timeline-marker ${markerClass}"></div>
                    <div class="cleaner-timeline-content">
                        <span class="cleaner-timeline-time">${item.time}</span>
                        <span class="cleaner-timeline-event">${item.event}</span>
                    </div>
                `;
                timeline.appendChild(timelineItem);
            });
        }
    }
}

// Task Management
function cleanerUpdateTaskProgress(appointment) {
    const progressFill = document.querySelector('#cleaner-tasks-tab .cleaner-progress-fill');
    const progressText = document.querySelector('#cleaner-tasks-tab .cleaner-progress-text');
    const categoriesContainer = document.getElementById('cleaner-task-categories-container');
    
    if (appointment.tasks && appointment.tasks.items.length > 0) {
        const completedTasks = appointment.tasks.items.filter(task => task.status === 'completed').length;
        const totalTasks = appointment.tasks.items.length;
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${Math.round(percentage)}% Complete`;
        
        // Display tasks by category
        if (categoriesContainer) {
            categoriesContainer.innerHTML = '';
            
            // Group tasks by category
            const categories = {};
            appointment.tasks.items.forEach(task => {
                if (!categories[task.category]) {
                    categories[task.category] = [];
                }
                categories[task.category].push(task);
            });
            
            Object.keys(categories).forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'cleaner-category';
                
                let icon = 'tasks';
                switch(category) {
                    case 'Bedroom': icon = 'bed'; break;
                    case 'Kitchen': icon = 'utensils'; break;
                    case 'Bathroom': icon = 'bath'; break;
                    case 'Living Room': icon = 'couch'; break;
                }
                
                let categoryHTML = `
                    <h4><i class="fas fa-${icon}"></i> ${category} Tasks</h4>
                    <div class="cleaner-task-list">
                `;
                
                categories[category].forEach(task => {
                    const completed = task.status === 'completed';
                    const inProgress = task.status === 'in-progress';
                    let statusClass = '';
                    let statusText = task.status;
                    
                    if (completed) {
                        statusClass = 'cleaner-task-completed';
                        statusText = 'Completed';
                    } else if (inProgress) {
                        statusClass = 'cleaner-task-in-progress';
                        statusText = 'In Progress';
                    } else {
                        statusClass = 'cleaner-task-pending';
                        statusText = 'Pending';
                    }
                    
                    categoryHTML += `
                        <div class="cleaner-task-item ${completed ? 'completed' : inProgress ? 'in-progress' : 'pending'}">
                            <input type="checkbox" ${completed ? 'checked' : ''} disabled>
                            <label>${task.name}</label>
                            <span class="cleaner-task-status ${statusClass}">${statusText}</span>
                        </div>
                    `;
                });
                
                categoryHTML += '</div>';
                categoryDiv.innerHTML = categoryHTML;
                categoriesContainer.appendChild(categoryDiv);
            });
        }
    } else {
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = '0% Complete';
        if (categoriesContainer) {
            categoriesContainer.innerHTML = `
                <div class="cleaner-empty-state" style="text-align: center; padding: 2rem; color: #718096;">
                    <i class="fas fa-tasks" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                    <p>No tasks assigned yet</p>
                </div>
            `;
        }
    }
}

// Chat Management
function cleanerPopulateChatMessages(messages) {
    const chatMessages = document.getElementById('cleaner-chat-messages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = '';
    
    if (messages && messages.length > 0) {
        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `cleaner-chat-message ${message.sender}`;
            messageDiv.innerHTML = `
                <div>${message.message}</div>
                <div class="cleaner-chat-time">${message.time}</div>
            `;
            chatMessages.appendChild(messageDiv);
        });
    } else {
        chatMessages.innerHTML = `
            <div class="cleaner-empty-state" style="text-align: center; padding: 2rem; color: #718096;">
                <i class="fas fa-comments" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p>No messages yet. Start a conversation!</p>
            </div>
        `;
    }
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function cleanerSendChatMessage() {
    const input = document.getElementById('cleaner-chat-input');
    const message = input.value.trim();
    
    if (!message || !cleanerCurrentModalAppointment) return;
    
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    // Add message to chat
    const newMessage = {
        id: appointment.chatMessages.length + 1,
        sender: 'manager',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    if (!appointment.chatMessages) appointment.chatMessages = [];
    appointment.chatMessages.push(newMessage);
    
    // Update display
    cleanerPopulateChatMessages(appointment.chatMessages);
    
    // Clear input
    input.value = '';
    
    // Simulate cleaner response after delay
    setTimeout(() => {
        const cleanerResponse = {
            id: appointment.chatMessages.length + 1,
            sender: 'cleaner',
            message: 'Received. Thank you for the message.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        appointment.chatMessages.push(cleanerResponse);
        cleanerPopulateChatMessages(appointment.chatMessages);
    }, 2000);
}

// Equipment Management
function cleanerPopulateEquipmentTable(equipment) {
    const tableBody = document.getElementById('cleaner-equipment-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (equipment && equipment.length > 0) {
        equipment.forEach(equip => {
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
            
            // Photo preview
            let photoHtml = '<span class="cleaner-no-photo">No photo</span>';
            if (equip.photo) {
                photoHtml = `
                    <img src="./assets/images/${equip.photo}" 
                         alt="${equip.name}" 
                         class="cleaner-equipment-photo"
                         style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; cursor: pointer;"
                         onclick="cleanerViewEquipmentPhoto('${equip.id}', '${equip.name}')">
                `;
            }
            
            row.innerHTML = `
                <td>${equip.id}</td>
                <td>${equip.name}</td>
                <td>${equip.type}</td>
                <td><span class="cleaner-equipment-status ${statusClass}">${statusText}</span></td>
                <td>${photoHtml}</td>
                <td>${equip.checkedBy}</td>
                <td>${equip.checkTime}</td>
                <td>${equip.lastMaintenance || 'Never'}</td>
                <td>${equip.managerComment || ''}</td>
                <td>
                    <div class="cleaner-equipment-actions">
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-secondary" onclick="cleanerEditEquipment('${equip.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-success" onclick="cleanerCheckEquipment('${equip.id}')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-danger" onclick="cleanerDeleteEquipment('${equip.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" class="cleaner-text-center" style="text-align: center; padding: 2rem;">
                    No equipment assigned to this appointment.
                </td>
            </tr>
        `;
    }
}

function cleanerPopulateEquipmentViewTable(appointment) {
    const equipmentList = document.getElementById('cleaner-equipment-view-list');
    if (!equipmentList) return;
    
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
            
            // Photo preview
            let photoHtml = '<span class="cleaner-no-photo">No photo</span>';
            if (equip.photo) {
                photoHtml = `
                    <img src="./assets/images/${equip.photo}" 
                         alt="${equip.name}" 
                         class="cleaner-equipment-photo"
                         style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; cursor: pointer;"
                         onclick="cleanerViewEquipmentPhoto('${equip.id}', '${equip.name}')">
                `;
            }
            
            row.innerHTML = `
                <td>${equip.id}</td>
                <td>${equip.name}</td>
                <td>${equip.type}</td>
                <td><span class="cleaner-equipment-status ${statusClass}">${statusText}</span></td>
                <td>${photoHtml}</td>
                <td>${appointment.cleaner || 'Not assigned'}</td>
                <td>${equip.checkedBy}</td>
                <td>${equip.checkTime}</td>
                <td>${equip.photoApproved || 'No'}</td>
                <td>${equip.managerComment || ''}</td>
                <td>
                    <div class="cleaner-equipment-actions">
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-secondary" onclick="cleanerEditEquipment('${equip.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-success" onclick="cleanerCheckEquipment('${equip.id}')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="cleaner-btn cleaner-btn-sm cleaner-btn-danger" onclick="cleanerDeleteEquipment('${equip.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            equipmentList.appendChild(row);
        });
    } else {
        equipmentList.innerHTML = `
            <tr>
                <td colspan="11" class="cleaner-text-center" style="text-align: center; padding: 2rem;">
                    No equipment assigned to this appointment.
                </td>
            </tr>
        `;
    }
}

function cleanerShowAddEquipmentForm() {
    const form = document.getElementById('cleaner-add-equipment-form');
    const btn = document.getElementById('cleaner-add-equipment-btn');
    if (form) form.style.display = 'block';
    if (btn) btn.style.display = 'none';
}

function cleanerHideAddEquipmentForm() {
    const form = document.getElementById('cleaner-add-equipment-form');
    const btn = document.getElementById('cleaner-add-equipment-btn');
    if (form) form.style.display = 'none';
    if (btn) btn.style.display = 'block';
}

function cleanerSaveNewEquipment() {
    const name = document.getElementById('cleaner-equipment-name').value.trim();
    const type = document.getElementById('cleaner-equipment-type').value;
    const status = document.getElementById('cleaner-equipment-status').value;
    const notes = document.getElementById('cleaner-equipment-notes').value.trim();
    
    if (!name) {
        cleanerShowToast('Please enter equipment name!', 'warning');
        return;
    }
    
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    const newId = `EQ-${(appointment.equipment.length + 1).toString().padStart(3, '0')}`;
    
    const newEquipment = {
        id: newId,
        name: name,
        type: cleanerGetEquipmentTypeName(type),
        status: status,
        photo: '',
        checkedBy: 'Not checked',
        checkTime: '-',
        notes: notes,
        lastMaintenance: 'Never',
        photoApproved: 'no',
        managerComment: notes
    };
    
    if (!appointment.equipment) appointment.equipment = [];
    appointment.equipment.push(newEquipment);
    
    // Update both tables
    cleanerPopulateEquipmentTable(appointment.equipment);
    
    // Update equipment modal if open
    if (document.getElementById('cleaner-equipment-view-modal').classList.contains('active')) {
        cleanerPopulateEquipmentViewTable(appointment);
    }
    
    cleanerHideAddEquipmentForm();
    
    // Reset form
    document.getElementById('cleaner-equipment-name').value = '';
    document.getElementById('cleaner-equipment-type').value = 'steam';
    document.getElementById('cleaner-equipment-status').value = 'available';
    document.getElementById('cleaner-equipment-notes').value = '';
    
    cleanerShowToast('Equipment added successfully!', 'success');
}

function cleanerGetEquipmentTypeName(type) {
    const types = {
        'steam': 'Steam Cleaning',
        'vacuum': 'Vacuum',
        'chemical': 'Chemical/Supplies',
        'tool': 'Tool',
        'safety': 'Safety Equipment'
    };
    return types[type] || type;
}

// Equipment Actions
function cleanerViewEquipmentPhoto(equipId, equipName) {
    document.getElementById('cleaner-photo-equipment-name').textContent = equipName;
    
    // Show photo modal
    const modal = document.getElementById('cleaner-photo-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function cleanerEditEquipment(equipId) {
    // Find the equipment in current appointment
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    const equipment = appointment.equipment.find(e => e.id === equipId);
    if (!equipment) return;
    
    // Show edit form (simplified for this example)
    cleanerShowToast(`Editing equipment: ${equipment.name}`, 'info');
}

function cleanerCheckEquipment(equipId) {
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    const equipment = appointment.equipment.find(e => e.id === equipId);
    if (!equipment) return;
    
    equipment.checkedBy = 'Manager';
    equipment.checkTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    equipment.photoApproved = 'yes';
    equipment.managerComment = 'Checked and approved';
    
    // Update tables
    cleanerPopulateEquipmentTable(appointment.equipment);
    if (document.getElementById('cleaner-equipment-view-modal').classList.contains('active')) {
        cleanerPopulateEquipmentViewTable(appointment);
    }
    
    cleanerShowToast(`Equipment ${equipment.name} checked!`, 'success');
}

function cleanerDeleteEquipment(equipId) {
    if (!confirm('Are you sure you want to delete this equipment?')) return;
    
    const appointment = cleanerAppointments.find(apt => apt.id === cleanerCurrentModalAppointment.id);
    if (!appointment) return;
    
    appointment.equipment = appointment.equipment.filter(e => e.id !== equipId);
    
    // Update tables
    cleanerPopulateEquipmentTable(appointment.equipment);
    if (document.getElementById('cleaner-equipment-view-modal').classList.contains('active')) {
        cleanerPopulateEquipmentViewTable(appointment);
    }
    
    cleanerShowToast('Equipment deleted successfully!', 'success');
}

// Appointment editing
function cleanerEnableEditMode() {
    const inputs = document.querySelectorAll('#cleaner-appointment-tab input, #cleaner-appointment-tab textarea, #cleaner-appointment-tab select');
    inputs.forEach(input => {
        if (input.id !== 'cleaner-modal-client-name' && input.id !== 'cleaner-modal-service-type') {
            input.readOnly = false;
            input.disabled = false;
            input.style.backgroundColor = '#fff';
            input.style.borderColor = '#4e1313';
        }
    });
    
    document.getElementById('cleaner-edit-appointment').style.display = 'none';
    document.getElementById('cleaner-save-appointment').style.display = 'inline-flex';
}

function cleanerDisableEditMode() {
    const inputs = document.querySelectorAll('#cleaner-appointment-tab input, #cleaner-appointment-tab textarea, #cleaner-appointment-tab select');
    inputs.forEach(input => {
        if (input.id !== 'cleaner-modal-client-name' && input.id !== 'cleaner-modal-service-type') {
            input.readOnly = true;
            input.disabled = true;
            input.style.backgroundColor = '#f8f9fa';
            input.style.borderColor = '#ddd';
        }
    });
    
    document.getElementById('cleaner-edit-appointment').style.display = 'inline-flex';
    document.getElementById('cleaner-save-appointment').style.display = 'none';
}

function cleanerSaveAppointmentChanges() {
    const aptId = document.getElementById('cleaner-modal-appointment-id').textContent;
    const appointment = cleanerAppointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        // Update appointment data
        appointment.instructions = document.getElementById('cleaner-modal-instructions').value;
        appointment.duration = document.getElementById('cleaner-modal-duration').value;
        appointment.cleanerCount = parseInt(document.getElementById('cleaner-modal-cleaner-count').value) || appointment.cleanerCount;
        appointment.propertyType = document.getElementById('cleaner-modal-property-type').value;
        
        cleanerDisableEditMode();
        cleanerShowToast('Appointment details updated successfully!', 'success');
    }
}

// Cleaner assignment
function cleanerUpdateCleanerDetails() {
    const cleanerId = document.getElementById('cleaner-cleaner-select').value;
    const detailsDiv = document.getElementById('cleaner-selected-cleaner-details');
    
    if (cleanerId && detailsDiv) {
        const cleaner = cleanerCleaners.find(c => c.id === cleanerId) || 
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
        `;
        detailsDiv.style.display = 'block';
    } else if (detailsDiv) {
        detailsDiv.style.display = 'none';
    }
}

function cleanerAssignCleaner() {
    const cleanerSelect = document.getElementById('cleaner-cleaner-select');
    const cleanerValue = cleanerSelect.value;
    
    if (!cleanerValue) {
        cleanerShowToast('Please select a cleaner first!', 'warning');
        return;
    }
    
    const aptId = document.getElementById('cleaner-modal-appointment-id').textContent;
    const appointment = cleanerAppointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        let cleanerName = '';
        if (cleanerValue.includes('team')) {
            cleanerName = cleanerValue === 'team-a' ? 'Team A' : 'Team B';
        } else {
            const cleaner = cleanerCleaners.find(c => c.id === cleanerValue);
            cleanerName = cleaner ? cleaner.name : 'Selected Cleaner';
        }
        
        appointment.cleaner = cleanerName;
        appointment.status = 'Scheduled';
        
        // Update UI
        const assignmentStatus = document.getElementById('cleaner-assignment-status');
        if (assignmentStatus) {
            assignmentStatus.textContent = 'Assigned';
            assignmentStatus.className = 'cleaner-badge cleaner-status-scheduled';
        }
        
        const changeCleanerBtn = document.getElementById('cleaner-change-cleaner');
        const assignCleanerBtn = document.getElementById('cleaner-assign-cleaner-btn');
        if (changeCleanerBtn) changeCleanerBtn.style.display = 'inline-flex';
        if (assignCleanerBtn) assignCleanerBtn.style.display = 'none';
        
        // Update main table
        cleanerPopulateAppointmentTable();
        cleanerUpdateDashboardStats();
        
        cleanerShowToast(`Successfully assigned ${cleanerName} to ${aptId}!`, 'success');
    }
}

function cleanerChangeCleaner() {
    const cleanerSelect = document.getElementById('cleaner-cleaner-select');
    const detailsDiv = document.getElementById('cleaner-selected-cleaner-details');
    const assignmentStatus = document.getElementById('cleaner-assignment-status');
    const changeCleanerBtn = document.getElementById('cleaner-change-cleaner');
    const assignCleanerBtn = document.getElementById('cleaner-assign-cleaner-btn');
    
    if (cleanerSelect) cleanerSelect.value = '';
    if (detailsDiv) detailsDiv.style.display = 'none';
    if (assignmentStatus) {
        assignmentStatus.textContent = 'Not Assigned';
        assignmentStatus.className = 'cleaner-badge cleaner-status-ready';
    }
    if (changeCleanerBtn) changeCleanerBtn.style.display = 'none';
    if (assignCleanerBtn) assignCleanerBtn.style.display = 'inline-flex';
    
    const aptId = document.getElementById('cleaner-modal-appointment-id').textContent;
    const appointment = cleanerAppointments.find(apt => apt.id === aptId);
    if (appointment) {
        appointment.cleaner = '';
        appointment.status = 'Ready for Scheduling';
        cleanerPopulateAppointmentTable();
        cleanerUpdateDashboardStats();
    }
}

function cleanerSendNotifications() {
    const aptId = document.getElementById('cleaner-modal-appointment-id').textContent;
    const cleaner = document.getElementById('cleaner-cleaner-select').value;
    
    if (!cleaner) {
        cleanerShowToast('Please assign a cleaner first!', 'warning');
        return;
    }
    
    // Simulate sending notifications
    const btn = document.getElementById('cleaner-send-notifications');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        cleanerShowToast('Notifications sent to client and cleaner!', 'success');
    }, 1500);
}

// Edit appointment from table
function cleanerEditAppointment(aptId) {
    cleanerOpenDetailsModal(aptId);
    setTimeout(() => {
        cleanerEnableEditMode();
    }, 100);
}

// Save all changes
function cleanerSaveAllChanges() {
    // Save all pending changes from all tabs
    const aptId = document.getElementById('cleaner-modal-appointment-id').textContent;
    const appointment = cleanerAppointments.find(apt => apt.id === aptId);
    
    if (appointment) {
        // Save appointment details if in edit mode
        if (document.getElementById('cleaner-save-appointment').style.display !== 'none') {
            cleanerSaveAppointmentChanges();
        }
        
        cleanerShowToast('All changes saved successfully!', 'success');
        setTimeout(() => {
            cleanerCloseDetailsModal();
        }, 1000);
    }
}

// Utility function to show toast messages
function cleanerShowToast(message, type = 'info') {
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
const cleanerToastStyles = document.createElement('style');
cleanerToastStyles.textContent = `
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
document.head.appendChild(cleanerToastStyles);

// Responsive table
function cleanerSetupResponsiveTable() {
    // Add responsive behavior for mobile
    const tableContainer = document.querySelector('.cleaner-table-container');
    if (tableContainer) {
        tableContainer.style.position = 'relative';
    }
}

// Initialize modals to hidden state on load
document.addEventListener('DOMContentLoaded', function() {
    const detailsModal = document.getElementById('cleaner-details-modal');
    const equipmentModal = document.getElementById('cleaner-equipment-view-modal');
    const photoModal = document.getElementById('cleaner-photo-modal');
    
    if (detailsModal) detailsModal.style.display = 'none';
    if (equipmentModal) equipmentModal.style.display = 'none';
    if (photoModal) photoModal.style.display = 'none';
    
    console.log('Cleaner Management Dashboard Initialized Successfully!');
});