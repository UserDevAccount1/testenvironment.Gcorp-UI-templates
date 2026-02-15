// MainGeofencingPage.js - Enhanced with Photo/Video Verification

class GCorpStaffDashboard {
    constructor() {
        this.sampleStaffData = [];
        this.sampleMediaData = []; // Changed from samplePhotoData to sampleMediaData
        this.currentStaffId = null;
        this.floatingWindow = null;
        this.isDragging = false;
        this.offset = { x: 0, y: 0 };
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.geofenceSystems = {};
        this.geofenceUpdateInterval = null;
        this.appointmentData = [];
        this.currentAppointmentId = null;
        this.vehicleInfoMap = null;
        this.floatingMap = null;
        this.vehicleMap = null;
        this.geofenceMap = null;
        this.currentMediaId = null; // Track currently viewed media
        this.init();
    }

    init() {
        this.generateSampleData();
        this.initializeDashboard();
        this.initializeEventListeners();
        this.initializeFloatingWindow();
        this.loadDashboardData();
        this.initializeMaps();
        this.generateAppointmentData();
    }

    generateSampleData() {
        const staffNames = [
            "John Smith", "Sarah Johnson", "Mike Williams", "Emma Davis", 
            "Robert Brown", "Lisa Wilson", "David Miller", "Maria Garcia",
            "James Taylor", "Jennifer Anderson"
        ];
        
        const vehicles = ["VAN-001", "VAN-002", "CAR-003", "VAN-001", "CAR-005", 
                         "VAN-002", "CAR-003", "VAN-001", "CAR-005", "VAN-002"];
        
        const locations = [
            "123 Main St, NYC", "456 Park Ave, NYC", "789 Broadway, NYC",
            "101 Liberty St, NYC", "202 Wall St, NYC", "303 Hudson St, NYC",
            "404 Greenwich St, NYC", "505 West St, NYC", "606 East St, NYC",
            "707 South St, NYC"
        ];
        
        const propertyTypes = ["residential", "commercial", "residential", "commercial", 
                              "residential", "commercial", "residential", "commercial", 
                              "residential", "commercial"];
        
        const statuses = ["available", "busy", "traveling", "offline", "anomaly"];
        
        this.sampleStaffData = staffNames.map((name, index) => {
            const id = `C${(index + 1).toString().padStart(3, '0')}`;
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const distance = Math.floor(Math.random() * 1000);
            const geofenceStatus = distance <= 15 ? 'inside-service' : 
                                  distance <= 30 ? 'inside-detection' : 'outside';
            const propertyType = propertyTypes[index];
            const estimation = propertyType === 'residential' 
                ? (Math.floor(Math.random() * 500) + 500) 
                : (Math.floor(Math.random() * 1000) + 1000);
            
            return {
                id: id,
                name: name,
                vehicleId: vehicles[index],
                status: status,
                location: locations[index],
                propertyType: propertyType,
                estimation: estimation,
                geofenceStatus: geofenceStatus,
                distance: distance,
                clockStatus: status === 'offline' ? 'clocked_out' : 'clocked_in',
                lastUpdate: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                battery: Math.floor(Math.random() * 30) + 70,
                speed: status === 'traveling' ? Math.floor(Math.random() * 40) + 20 : 0,
                phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
                email: `${name.toLowerCase().replace(' ', '.')}@gcorp.com`,
                appointmentId: `APP-${1000 + index}`
            };
        });

        this.generateSampleMediaData(); // Updated method name
    }

    generateSampleMediaData() {
        const mediaTypes = ['Clock-In', 'Start Service', 'End Service', 'Pre-Clockout', 'Arrival', 'Quality Check', 'Damage Report'];
        const mediaCategories = ['Photo', 'Video'];
        const staffIds = this.sampleStaffData.map(staff => staff.id);
        
        this.sampleMediaData = [];
        
        // Sample image URLs for demo
        const sampleImages = [
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop'
        ];
        
        for (let i = 0; i < 15; i++) {
            const staffId = staffIds[Math.floor(Math.random() * staffIds.length)];
            const staff = this.sampleStaffData.find(s => s.id === staffId);
            const mediaType = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];
            const mediaCategory = mediaCategories[Math.floor(Math.random() * mediaCategories.length)];
            
            this.sampleMediaData.push({
                id: `MEDIA-${1000 + i}`,
                staffId: staffId,
                staffName: staff?.name || 'Unknown',
                type: mediaType,
                category: mediaCategory, // Photo or Video
                timestamp: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
                location: staff?.location || 'Unknown',
                gpsMatch: Math.random() > 0.2,
                status: Math.random() > 0.5 ? 'pending' : (Math.random() > 0.5 ? 'approved' : 'rejected'),
                fileUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)],
                fileName: `${mediaType.toLowerCase().replace(' ', '_')}_${Date.now()}.${mediaCategory === 'Photo' ? 'jpg' : 'mp4'}`,
                description: `${mediaType} ${mediaCategory.toLowerCase()} submitted by staff`,
                fileSize: `${Math.floor(Math.random() * 5) + 1} MB`
            });
        }
    }

    generateAppointmentData() {
        const cleaningTypes = ['Steam Clean', 'Deep Clean', 'Move-Out Clean', 'Maintenance Clean'];
        const clientNames = ['Maria Santos', 'John Johnson', 'Sarah Williams', 'Robert Brown', 'Lisa Wilson'];
        const propertyTypes = ['Residential', 'Commercial'];
        
        this.appointmentData = this.sampleStaffData.map((staff, index) => {
            const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
            const cleaningType = cleaningTypes[Math.floor(Math.random() * cleaningTypes.length)];
            const squareFootage = propertyType === 'Residential' 
                ? Math.floor(Math.random() * 2000) + 800 
                : Math.floor(Math.random() * 5000) + 2000;
            
            let estimation = 0;
            if (cleaningType === 'Maintenance Clean') {
                estimation = propertyType === 'Residential' 
                    ? 38 * 3
                    : 44 * 6;
            } else if (cleaningType === 'Move-Out Clean' || cleaningType === 'Deep Clean') {
                estimation = 50 * 7;
            } else if (cleaningType === 'Steam Clean') {
                estimation = Math.floor(Math.random() * 500) + 120;
            }
            
            const tax = estimation * 0.05;
            const total = estimation + tax;
            
            return {
                id: staff.appointmentId,
                staffId: staff.id,
                clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
                clientPhone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
                clientAddress: staff.location,
                clientEmail: `${staff.name.toLowerCase().replace(' ', '.')}@client.com`,
                propertyType: propertyType,
                cleaningTypes: [cleaningType, Math.random() > 0.5 ? 'Steam Clean' : null].filter(Boolean),
                squareFootage: squareFootage,
                estimation: estimation,
                tax: tax,
                total: total,
                appointmentDate: new Date(Date.now() + Math.random() * 86400000 * 7).toISOString().split('T')[0],
                timeSlot: `${Math.floor(Math.random() * 3) + 9}:00 AM - ${Math.floor(Math.random() * 3) + 12}:00 PM`,
                duration: '3 hours',
                bookedDate: new Date(Date.now() - Math.random() * 86400000 * 3).toLocaleString(),
                onSiteVisit: propertyType === 'Commercial' ? 'Required' : 'Not Required',
                status: Math.random() > 0.3 ? 'Confirmed' : (Math.random() > 0.5 ? 'Pending' : 'Completed'),
                deposit: propertyType === 'Residential' ? 120 : 0,
                balance: propertyType === 'Residential' ? total - 120 : total,
                paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Bank Transfer',
                specialInstructions: [
                    'Pet-friendly cleaning products preferred',
                    'Focus on kitchen and bathrooms',
                    'Please use back entrance',
                    'Client has allergies to strong scents'
                ],
                serviceItems: this.generateServiceItems(cleaningType)
            };
        });
    }

    generateServiceItems(cleaningType) {
        const baseItems = [
            { name: 'Living Room Cleaning', price: 75, quantity: 1 },
            { name: 'Kitchen Deep Clean', price: 100, quantity: 1 },
            { name: 'Bathroom Sanitization', price: 85, quantity: 2 }
        ];
        
        if (cleaningType === 'Steam Clean') {
            return [
                { name: 'Large Room Steam Clean', price: 75, quantity: 2 },
                { name: 'Regular Room Steam Clean', price: 60, quantity: 3 },
                { name: 'Area Rug Steam Clean', price: 30, quantity: 2 },
                { name: 'Couch Steam Clean', price: 100, quantity: 1 }
            ];
        }
        
        return baseItems;
    }

    initializeDashboard() {
        const currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const subtitle = document.querySelector('.gcorp-subtitle');
        if (subtitle) {
            subtitle.innerHTML += ` <span class="text-muted">| ${currentDate}</span>`;
        }

        this.updateCurrentTime();
        setInterval(() => this.updateCurrentTime(), 60000);
    }

    updateCurrentTime() {
        const currentTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const timeElements = document.querySelectorAll('.gcorp-current-time');
        timeElements.forEach(el => {
            el.textContent = currentTime;
        });
    }

    initializeEventListeners() {
        // Main tab switching
        document.querySelectorAll('.gcorp-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const target = e.target.closest('.gcorp-tab');
                if (target) this.switchTab(target);
            });
        });

        // Floating window tab switching - FIXED
        document.querySelectorAll('.gcorp-floating-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const target = e.target.closest('.gcorp-floating-tab');
                if (target) this.switchFloatingTab(target);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('staffSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchStaff(e.target.value);
            });
        }

        // Filter functionality
        document.getElementById('statusFilter')?.addEventListener('change', (e) => {
            this.filterStaff();
        });

        document.getElementById('vehicleFilter')?.addEventListener('change', (e) => {
            this.filterStaff();
        });

        document.getElementById('geofenceFilter')?.addEventListener('change', (e) => {
            this.filterStaff();
        });

        document.getElementById('propertyTypeFilter')?.addEventListener('change', (e) => {
            this.filterStaff();
        });

        // Floating window controls
        document.getElementById('minimizeWindow')?.addEventListener('click', () => {
            this.toggleMinimize();
        });

        document.getElementById('maximizeWindow')?.addEventListener('click', () => {
            this.toggleMaximize();
        });

        document.getElementById('closeWindow')?.addEventListener('click', () => {
            this.closeFloatingWindow();
        });

        // View buttons in staff table
        document.addEventListener('click', (e) => {
            if (e.target.closest('.gcorp-view-details')) {
                const btn = e.target.closest('.gcorp-view-details');
                const staffId = btn.getAttribute('data-staff-id');
                if (staffId) {
                    this.showFloatingWindow(staffId);
                }
            }
        });

        // Force arrival button
        document.getElementById('forceArrivalBtn')?.addEventListener('click', () => {
            if (this.currentStaffId) {
                const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
                if (staff && this.geofenceSystems[staff.id]) {
                    this.geofenceSystems[staff.id].distance = 10;
                    this.geofenceSystems[staff.id].arrivalDetected = true;
                    this.updateGeofenceDisplay(staff);
                    this.showNotification(`Manually marked ${staff.name} as arrived`, 'success');
                }
            }
        });

        // Upload new media button
        document.getElementById('uploadNewMediaBtn')?.addEventListener('click', () => {
            this.showMediaUploadModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.floatingWindow?.classList.contains('active')) {
                this.closeFloatingWindow();
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Floating footer buttons
        document.getElementById('sendMessageBtn')?.addEventListener('click', () => {
            if (this.currentStaffId) {
                this.sendMessage(this.currentStaffId);
            }
        });

        document.getElementById('forceClockOutBtn')?.addEventListener('click', () => {
            if (this.currentStaffId) {
                this.forceClockOut(this.currentStaffId);
            }
        });

        document.getElementById('reportIssueBtn')?.addEventListener('click', () => {
            if (this.currentStaffId) {
                this.reportIssue(this.currentStaffId);
            }
        });

        // Notification clear button
        document.getElementById('clearNotifications')?.addEventListener('click', () => {
            this.clearNotifications();
        });

        // Media viewer button event listeners (added)
        document.addEventListener('click', (e) => {
            if (e.target.closest('#approveMediaBtn')) {
                if (this.currentMediaId) {
                    this.approveMedia(this.currentMediaId);
                }
            }
            
            if (e.target.closest('#rejectMediaBtn')) {
                if (this.currentMediaId) {
                    this.rejectMedia(this.currentMediaId);
                }
            }
            
            if (e.target.closest('#downloadMediaBtn')) {
                if (this.currentMediaId) {
                    this.downloadMedia(this.currentMediaId);
                }
            }
        });
    }

    initializeFloatingWindow() {
        this.floatingWindow = document.getElementById('staffDetailsWindow');
        if (!this.floatingWindow) return;

        // Make window draggable
        const header = this.floatingWindow.querySelector('.gcorp-floating-header');
        if (header) {
            header.addEventListener('mousedown', (e) => this.startDrag(e));
        }
    }

    startDrag(e) {
        e.preventDefault();
        this.isDragging = true;
        const rect = this.floatingWindow.getBoundingClientRect();
        this.offset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        const onMouseMove = (e) => this.drag(e);
        const onMouseUp = () => this.stopDrag(onMouseMove, onMouseUp);
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        this.floatingWindow.classList.add('dragging');
    }

    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        const x = e.clientX - this.offset.x;
        const y = e.clientY - this.offset.y;
        
        const maxX = window.innerWidth - this.floatingWindow.offsetWidth;
        const maxY = window.innerHeight - this.floatingWindow.offsetHeight;
        
        this.floatingWindow.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        this.floatingWindow.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
        this.floatingWindow.style.right = 'auto';
    }

    stopDrag(moveHandler, upHandler) {
        this.isDragging = false;
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
        this.floatingWindow.classList.remove('dragging');
    }

    toggleMinimize() {
        this.floatingWindow.classList.toggle('minimized');
        const minimizeBtn = document.getElementById('minimizeWindow');
        if (minimizeBtn) {
            const icon = minimizeBtn.querySelector('i');
            if (icon) {
                icon.className = this.floatingWindow.classList.contains('minimized') ? 
                    'fas fa-window-restore' : 'fas fa-window-minimize';
            }
        }
    }

    toggleMaximize() {
        this.floatingWindow.classList.toggle('maximized');
        const maximizeBtn = document.getElementById('maximizeWindow');
        if (maximizeBtn) {
            const icon = maximizeBtn.querySelector('i');
            if (icon) {
                icon.className = this.floatingWindow.classList.contains('maximized') ? 
                    'fas fa-window-restore' : 'fas fa-window-maximize';
            }
        }
    }

    closeFloatingWindow() {
        if (this.floatingWindow) {
            this.floatingWindow.classList.remove('active');
        }
        this.currentStaffId = null;
        this.currentMediaId = null;
        
        if (this.geofenceUpdateInterval) {
            clearInterval(this.geofenceUpdateInterval);
            this.geofenceUpdateInterval = null;
        }
    }

    showFloatingWindow(staffId) {
        this.currentStaffId = staffId;
        const staff = this.sampleStaffData.find(s => s.id === staffId);
        
        if (!staff) return;
        
        // Update window title
        document.getElementById('detailStaffName').textContent = staff.name;
        document.getElementById('detailStaffId').textContent = staff.id;
        
        // Show window
        this.floatingWindow.classList.add('active');
        this.floatingWindow.classList.remove('minimized', 'maximized');
        
        // Position the window
        this.positionFloatingWindow();
        
        // Activate first tab
        const firstTab = this.floatingWindow.querySelector('.gcorp-floating-tab');
        if (firstTab) {
            this.switchFloatingTab(firstTab);
        }
    }

    positionFloatingWindow() {
        if (!this.floatingWindow) return;
        
        // Center the window
        this.floatingWindow.style.left = '50%';
        this.floatingWindow.style.top = '50%';
        this.floatingWindow.style.transform = 'translate(-50%, -50%)';
    }

    // FIXED: Tab switching method
    switchFloatingTab(tabElement) {
        // Remove active class from all floating tabs
        document.querySelectorAll('.gcorp-floating-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Add active class to clicked tab
        tabElement.classList.add('active');

        // Hide all floating panes
        document.querySelectorAll('.gcorp-floating-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Show selected pane
        const tabId = tabElement.getAttribute('data-tab');
        let paneId;
        
        switch(tabId) {
            case 'geofence':
                paneId = 'geofencePane';
                break;
            case 'appointment':
                paneId = 'appointmentPane';
                break;
            case 'photo-verification':
                paneId = 'photoVerificationPane';
                break;
            case 'vehicle':
                paneId = 'vehiclePane';
                break;
            case 'schedule':
                paneId = 'schedulePane';
                break;
            case 'location':
                paneId = 'locationPane';
                break;
            case 'photos':
                paneId = 'photosPane';
                break;
            default:
                paneId = 'geofencePane';
        }
        
        const pane = document.getElementById(paneId);
        if (pane) {
            pane.classList.add('active');
            
            // Load data for the selected tab
            this.loadFloatingTabData(tabId);
        }
    }

    loadFloatingTabData(tabId) {
        if (!this.currentStaffId) return;
        
        const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
        if (!staff) return;

        console.log(`Loading tab data for: ${tabId}`);

        switch(tabId) {
            case 'geofence':
                this.loadGeofenceData();
                break;
            case 'appointment':
                this.loadAppointmentData();
                break;
            case 'photo-verification':
                this.loadPhotoVerificationData(staff);
                break;
            case 'vehicle':
                this.loadVehicleData(staff);
                break;
            case 'schedule':
                this.loadScheduleData(staff);
                break;
            case 'location':
                this.loadLocationData(staff);
                break;
            case 'photos':
                this.loadMediaUploadData(staff);
                break;
            default:
                console.log(`Tab ${tabId} not implemented`);
        }
    }

    loadGeofenceData() {
        const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
        if (!staff) return;

        this.initializeGeofenceSystem(staff);
        this.updateGeofenceDisplay(staff);
        this.startGeofenceUpdates();
    }

    initializeGeofenceSystem(staff) {
        if (!this.geofenceSystems[staff.id]) {
            this.geofenceSystems[staff.id] = {
                distance: staff.distance,
                geofenceStatus: staff.geofenceStatus,
                arrivalDetected: false,
                lastUpdate: new Date(),
                updateInterval: null,
                jobLocation: { lat: 40.7228, lng: -73.9960 },
                staffLocation: { lat: 40.7128, lng: -74.0060 }
            };
        }
    }

    updateGeofenceDisplay(staff) {
        const system = this.geofenceSystems[staff.id];
        if (!system) return;

        const distance = system.distance;
        const geofenceStatus = system.geofenceStatus;
        
        // Update distance display
        const distanceElement = document.getElementById('floatingDistanceValue');
        const lastUpdateElement = document.getElementById('floatingLastUpdate');
        
        if (distanceElement) distanceElement.textContent = `${Math.round(distance)}m`;
        if (lastUpdateElement) lastUpdateElement.textContent = 
            system.lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Update geofence status
        let statusClass, iconColor, statusText, serviceLockStatus;
        
        if (distance <= 15) {
            statusClass = 'geofence-inside';
            iconColor = '#10b981';
            statusText = 'INSIDE SERVICE ZONE (≤15m)';
            serviceLockStatus = 'UNLOCKED';
            
            if (!system.arrivalDetected) {
                this.detectGeofenceArrival(staff.id, distance);
            }
        } else if (distance <= 30) {
            statusClass = 'geofence-arrived';
            iconColor = '#3b82f6';
            statusText = 'INSIDE DETECTION ZONE (≤30m)';
            serviceLockStatus = 'LOCKED';
            
            if (!system.arrivalDetected) {
                this.detectGeofenceArrival(staff.id, distance);
            }
        } else {
            statusClass = 'geofence-outside';
            iconColor = '#ef4444';
            statusText = 'OUTSIDE GEOFENCE';
            serviceLockStatus = 'LOCKED';
            system.arrivalDetected = false;
        }
        
        // Update UI elements
        const geofenceStatusElement = document.getElementById('floatingGeofenceStatus');
        if (geofenceStatusElement) {
            geofenceStatusElement.className = `geofence-status ${statusClass}`;
            geofenceStatusElement.innerHTML = `<i class="fas fa-circle" style="color: ${iconColor};"></i> Status: ${statusText}`;
        }
        
        const serviceLockElement = document.getElementById('floatingServiceLockStatus');
        if (serviceLockElement) {
            serviceLockElement.textContent = serviceLockStatus;
            serviceLockElement.style.color = serviceLockStatus === 'UNLOCKED' ? '#10b981' : '#ef4444';
        }
        
        // Update zone status
        const zoneStatusElement = document.getElementById('floatingZoneStatus');
        if (zoneStatusElement) {
            zoneStatusElement.textContent = distance <= 15 ? 'Service Zone' : 
                distance <= 30 ? 'Detection Zone' : 'Outside';
        }
        
        // Update visual position
        this.updateGeofenceVisualPosition(distance);
        
        // Update job details
        const jobElements = [
            { id: 'floatingCurrentJob', text: 'Johnson Residence' },
            { id: 'floatingJobAddress', text: '123 Main St, NYC' },
            { id: 'floatingJobTime', text: '9:00 AM - 12:00 PM' }
        ];
        
        jobElements.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) element.textContent = item.text;
        });
        
        // Update auto arrival time if detected
        if (system.arrivalDetected) {
            const arrivalTimeElement = document.getElementById('floatingAutoArrivalTime');
            if (arrivalTimeElement) {
                arrivalTimeElement.textContent = 
                    system.lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }
        }
    }

    updateGeofenceVisualPosition(distance) {
        const maxDistance = 100;
        const scale = 180 / maxDistance;
        
        let dotPosition;
        if (distance > maxDistance) {
            dotPosition = { x: 180, y: 180 };
        } else {
            const angle = Math.random() * 2 * Math.PI;
            const visualDistance = distance * scale;
            dotPosition = {
                x: 90 + visualDistance * Math.cos(angle),
                y: 90 + visualDistance * Math.sin(angle)
            };
        }
        
        const cleanerDot = document.getElementById('floatingCleanerDot');
        if (cleanerDot) {
            cleanerDot.style.left = `${dotPosition.x}px`;
            cleanerDot.style.top = `${dotPosition.y}px`;
            
            let dotColor;
            if (distance <= 15) {
                dotColor = '#10b981';
            } else if (distance <= 30) {
                dotColor = '#06b6d4';
            } else {
                dotColor = '#0b5cff';
            }
            cleanerDot.style.backgroundColor = dotColor;
        }
    }

    detectGeofenceArrival(staffId, distance) {
        const system = this.geofenceSystems[staffId];
        if (!system || system.arrivalDetected) return;
        
        system.arrivalDetected = true;
        system.lastUpdate = new Date();
        
        const arrivalTimeElement = document.getElementById('floatingAutoArrivalTime');
        if (arrivalTimeElement) {
            arrivalTimeElement.textContent = 
                system.lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        
        this.addGeofenceAlert(staffId, distance);
        this.showNotification(`📍 Arrival auto-detected for staff ${staffId} at ${Math.round(distance)}m`, 'success');
    }

    addGeofenceAlert(staffId, distance) {
        const alertsContainer = document.getElementById('floatingGeofenceAlerts');
        if (!alertsContainer) return;
        
        const alert = document.createElement('div');
        alert.style.padding = '0.5rem';
        alert.style.borderRadius = '0.5rem';
        alert.style.marginBottom = '0.5rem';
        alert.style.fontSize = '0.875rem';
        
        if (distance <= 15) {
            alert.style.background = '#dcfce7';
            alert.innerHTML = `<strong>✅ Service Unlocked</strong><br>Within service zone (${Math.round(distance)}m)`;
        } else if (distance <= 30) {
            alert.style.background = '#dbeafe';
            alert.innerHTML = `<strong>📍 Arrival Detected</strong><br>Within detection zone (${Math.round(distance)}m)`;
        }
        
        alertsContainer.prepend(alert);
        
        while (alertsContainer.children.length > 5) {
            alertsContainer.removeChild(alertsContainer.lastChild);
        }
    }

    startGeofenceUpdates() {
        if (this.geofenceUpdateInterval) {
            clearInterval(this.geofenceUpdateInterval);
        }
        
        this.geofenceUpdateInterval = setInterval(() => {
            if (this.currentStaffId) {
                const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
                if (staff && this.geofenceSystems[staff.id]) {
                    this.geofenceSystems[staff.id].distance = Math.max(
                        0, 
                        this.geofenceSystems[staff.id].distance - Math.random() * 50
                    );
                    this.geofenceSystems[staff.id].lastUpdate = new Date();
                    
                    this.updateGeofenceDisplay(staff);
                }
            }
        }, 30000);
    }

    loadAppointmentData() {
        const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
        if (!staff) return;

        const appointment = this.appointmentData.find(a => a.staffId === staff.id);
        if (!appointment) return;

        // Update appointment details
        const appointmentElements = [
            { id: 'clientName', text: appointment.clientName },
            { id: 'clientPhone', text: appointment.clientPhone },
            { id: 'clientAddress', text: appointment.clientAddress },
            { id: 'clientEmail', text: appointment.clientEmail },
            { id: 'servicePropertyType', text: appointment.propertyType },
            { id: 'serviceTypes', text: appointment.cleaningTypes.join(', ') },
            { id: 'serviceSqft', text: `${appointment.squareFootage.toLocaleString()} sqft` },
            { id: 'onSiteVisit', text: appointment.onSiteVisit },
            { id: 'appointmentDate', text: appointment.appointmentDate },
            { id: 'appointmentTime', text: appointment.timeSlot },
            { id: 'appointmentDuration', text: appointment.duration },
            { id: 'bookedDate', text: appointment.bookedDate },
            { id: 'appointmentTotal', text: `$${appointment.total.toFixed(2)}` },
            { id: 'appointmentStatus', text: appointment.status },
            { id: 'depositStatus', text: appointment.deposit > 0 ? `$${appointment.deposit.toFixed(2)} ✓` : 'Waived' },
            { id: 'balanceDue', text: `$${appointment.balance.toFixed(2)}` },
            { id: 'paymentMethod', text: appointment.paymentMethod },
            { id: 'floatingPropertyType', text: appointment.propertyType },
            { id: 'floatingEstimation', text: `$${appointment.total.toFixed(2)}` }
        ];
        
        appointmentElements.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) element.textContent = item.text;
        });

        // Load service items
        const serviceItemsList = document.getElementById('serviceItemsList');
        if (serviceItemsList) {
            serviceItemsList.innerHTML = appointment.serviceItems.map(item => `
                <div class="service-item-card">
                    <div class="service-item-header">
                        <span class="service-item-name">${item.name}</span>
                        <span class="service-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="service-item-details">
                        <span>Quantity: ${item.quantity}</span>
                        <span>Price: $${item.price.toFixed(2)} each</span>
                    </div>
                </div>
            `).join('');
        }
    }

    loadPhotoVerificationData(staff) {
        const staffMedia = this.sampleMediaData.filter(media => 
            media.staffId === staff.id
        );
        
        // Update table
        const tableBody = document.getElementById('photoVerificationTable');
        if (tableBody) {
            tableBody.innerHTML = staffMedia.map(media => `
                <tr data-media-id="${media.id}">
                    <td>${media.timestamp}</td>
                    <td>
                        <span class="badge ${media.type === 'Clock-In' ? 'bg-primary' : 
                                           media.type === 'Start Service' ? 'bg-success' :
                                           media.type === 'End Service' ? 'bg-warning' :
                                           media.type === 'Arrival' ? 'bg-info' : 'bg-secondary'}">
                            ${media.type}
                        </span>
                    </td>
                    <td>${media.gpsMatch ? 
                        '<i class="fas fa-check-circle text-success"></i> Match' : 
                        '<i class="fas fa-times-circle text-danger"></i> No Match'}</td>
                    <td>
                        <span class="badge ${media.category === 'Photo' ? 'bg-info' : 'bg-purple'}">
                            <i class="fas ${media.category === 'Photo' ? 'fa-image' : 'fa-video'}"></i> ${media.category}
                        </span>
                    </td>
                    <td>
                        <span class="badge ${media.status === 'approved' ? 'bg-success' : 
                            media.status === 'pending' ? 'bg-warning' : 'bg-danger'}">
                            ${media.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary view-media-btn" data-media-id="${media.id}">
                            <i class="fas fa-eye"></i> View
                        </button>
                        ${media.status === 'pending' ? `
                            <button class="btn btn-sm btn-success approve-media-btn" data-media-id="${media.id}">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn btn-sm btn-danger reject-media-btn" data-media-id="${media.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `).join('');
            
            // Add event listeners to view buttons
            tableBody.querySelectorAll('.view-media-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mediaId = e.currentTarget.getAttribute('data-media-id');
                    this.viewMedia(mediaId);
                });
            });
            
            // Add event listeners to approve buttons
            tableBody.querySelectorAll('.approve-media-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mediaId = e.currentTarget.getAttribute('data-media-id');
                    this.approveMedia(mediaId);
                });
            });
            
            // Add event listeners to reject buttons
            tableBody.querySelectorAll('.reject-media-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mediaId = e.currentTarget.getAttribute('data-media-id');
                    this.rejectMedia(mediaId);
                });
            });
        }
        
        // Update statistics
        const statElements = [
            { id: 'totalPhotos', value: staffMedia.length },
            { id: 'approvedPhotos', value: staffMedia.filter(m => m.status === 'approved').length },
            { id: 'pendingPhotos', value: staffMedia.filter(m => m.status === 'pending').length },
            { id: 'rejectedPhotos', value: staffMedia.filter(m => m.status === 'rejected').length }
        ];
        
        statElements.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (element) element.textContent = stat.value;
        });
        
        // Setup event listeners for viewer buttons
        this.setupMediaViewerEvents(staff);
    }

    setupMediaViewerEvents(staff) {
        const requestBtn = document.getElementById('requestNewPhoto');
        const verifyAllBtn = document.getElementById('verifyAllPending');
        
        if (requestBtn) {
            requestBtn.addEventListener('click', () => {
                this.requestNewMedia(staff.id);
            });
        }
        
        if (verifyAllBtn) {
            verifyAllBtn.addEventListener('click', () => {
                this.verifyAllPendingMedia(staff.id);
            });
        }
    }

    viewMedia(mediaId) {
        const media = this.sampleMediaData.find(m => m.id === mediaId);
        if (!media) return;
        
        this.currentMediaId = mediaId;
        
        const viewerContainer = document.getElementById('mediaViewerContainer');
        const placeholder = viewerContainer.querySelector('.gcorp-media-placeholder');
        const content = viewerContainer.querySelector('.gcorp-media-content');
        const imageElement = document.getElementById('mediaPreviewImage');
        const videoElement = document.getElementById('mediaPreviewVideo');
        const titleElement = document.getElementById('mediaTitle');
        const detailsElement = document.getElementById('mediaDetails');
        const timestampElement = document.getElementById('mediaTimestamp');
        const actionsElement = document.querySelector('.gcorp-media-actions');
        
        // Show content, hide placeholder
        placeholder.style.display = 'none';
        content.style.display = 'block';
        actionsElement.style.display = 'flex';
        
        // Show appropriate media type
        if (media.category === 'Photo') {
            imageElement.src = media.fileUrl;
            imageElement.style.display = 'block';
            videoElement.style.display = 'none';
            videoElement.pause();
        } else {
            videoElement.src = media.fileUrl;
            videoElement.style.display = 'block';
            imageElement.style.display = 'none';
        }
        
        // Update media info
        titleElement.textContent = `${media.type} ${media.category}`;
        detailsElement.innerHTML = `
            <strong>Staff:</strong> ${media.staffName}<br>
            <strong>Location:</strong> ${media.location}<br>
            <strong>GPS Match:</strong> ${media.gpsMatch ? '✓ Yes' : '✗ No'}<br>
            <strong>File:</strong> ${media.fileName} (${media.fileSize})
        `;
        timestampElement.textContent = `Uploaded: ${media.timestamp}`;
        
        // Highlight the selected row
        document.querySelectorAll('#photoVerificationTable tr').forEach(row => {
            row.classList.remove('selected');
        });
        const selectedRow = document.querySelector(`tr[data-media-id="${mediaId}"]`);
        if (selectedRow) {
            selectedRow.classList.add('selected');
        }
    }

    approveMedia(mediaId) {
        const media = this.sampleMediaData.find(m => m.id === mediaId);
        if (media) {
            media.status = 'approved';
            this.showNotification(`${media.category} ${mediaId} approved for ${media.staffName}`, 'success');
            
            // Update the UI
            const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
            if (staff) {
                this.loadPhotoVerificationData(staff);
                // If this was the currently viewed media, update viewer
                if (this.currentMediaId === mediaId) {
                    this.viewMedia(mediaId);
                }
            }
        }
    }

    rejectMedia(mediaId) {
        const media = this.sampleMediaData.find(m => m.id === mediaId);
        if (media) {
            media.status = 'rejected';
            this.showNotification(`${media.category} ${mediaId} rejected for ${media.staffName}`, 'warning');
            
            // Update the UI
            const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
            if (staff) {
                this.loadPhotoVerificationData(staff);
                // If this was the currently viewed media, update viewer
                if (this.currentMediaId === mediaId) {
                    this.viewMedia(mediaId);
                }
            }
        }
    }

    downloadMedia(mediaId) {
        const media = this.sampleMediaData.find(m => m.id === mediaId);
        if (media) {
            // Create a temporary link for download
            const link = document.createElement('a');
            link.href = media.fileUrl;
            link.download = media.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification(`Downloading ${media.category.toLowerCase()}: ${media.fileName}`, 'success');
        }
    }

    requestNewMedia(staffId) {
        this.showNotification(`Media request sent to staff ${staffId}`, 'info');
    }

    verifyAllPendingMedia(staffId) {
        const pendingMedia = this.sampleMediaData.filter(media => 
            media.staffId === staffId && media.status === 'pending'
        );
        
        pendingMedia.forEach(media => {
            media.status = 'approved';
        });
        
        this.showNotification(`${pendingMedia.length} pending media items approved for staff ${staffId}`, 'success');
        
        const staff = this.sampleStaffData.find(s => s.id === staffId);
        if (staff) {
            this.loadPhotoVerificationData(staff);
        }
    }

    loadVehicleData(staff) {
        // Update vehicle information
        const vehicleElements = [
            { id: 'vehicleId', text: staff.vehicleId },
            { id: 'vehicleReg', text: `GC-${staff.vehicleId}` },
            { id: 'vehicleType', text: staff.vehicleId.startsWith('VAN') ? 'Cleaning Van' : 'Car' },
            { id: 'vehicleModel', text: staff.vehicleId.startsWith('VAN') ? 'Ford Transit 2022' : 'Toyota Camry 2021' },
            { id: 'vehicleSpeed', text: `${staff.speed} km/h` },
            { id: 'vehicleFuel', text: `${Math.floor(Math.random() * 30) + 70}%` },
            { id: 'vehicleOdometer', text: `${Math.floor(Math.random() * 50000) + 10000} km` },
            { id: 'lastService', text: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0] },
            { id: 'nextService', text: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] },
            { id: 'insuranceExpiry', text: '2024-12-31' },
            { id: 'inspectionDue', text: '2024-06-30' }
        ];
        
        vehicleElements.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) element.textContent = item.text;
        });
        
        // Initialize vehicle map if element exists
        const mapElement = document.getElementById('vehicleInfoMap');
        if (mapElement) {
            this.initializeVehicleInfoMap();
        }
        
        // Load tracking history
        this.loadVehicleTrackingHistory();
    }

    initializeVehicleInfoMap() {
        const mapElement = document.getElementById('vehicleInfoMap');
        if (!mapElement || typeof L === 'undefined') return;

        // Clear existing map
        if (this.vehicleInfoMap) {
            this.vehicleInfoMap.remove();
        }

        // Create map
        this.vehicleInfoMap = L.map('vehicleInfoMap').setView([40.7128, -74.0060], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.vehicleInfoMap);

        // Add vehicle marker
        L.marker([40.7128, -74.0060])
            .addTo(this.vehicleInfoMap)
            .bindPopup('<b>Vehicle Location</b><br>Currently at job site')
            .openPopup();
    }

    loadVehicleTrackingHistory() {
        const historyContainer = document.getElementById('vehicleTrackingHistory');
        if (!historyContainer) return;

        const history = [
            { time: '08:15 AM', location: 'Left Office', status: 'Departure' },
            { time: '08:40 AM', location: 'Main Street', status: 'En Route' },
            { time: '09:00 AM', location: 'Arrived at Job', status: 'Arrival' },
            { time: '11:30 AM', location: 'Completed Service', status: 'Completed' }
        ];

        historyContainer.innerHTML = history.map(item => `
            <div style="padding: 0.5rem; border-bottom: 1px solid #e5e7eb; font-size: 0.875rem;">
                <strong>${item.time}</strong> - ${item.location}<br>
                <span style="color: #6b7280;">${item.status}</span>
            </div>
        `).join('');
    }

    loadScheduleData(staff) {
        this.initializeScheduleCalendar();
        this.loadTodaysSchedule();
        
        // Update schedule overview
        const scheduleElements = [
            { id: 'totalHours', text: '40 hours' },
            { id: 'completedJobs', text: '12' },
            { id: 'upcomingJobs', text: '8' },
            { id: 'averageRating', text: '4.8/5.0' }
        ];
        
        scheduleElements.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) element.textContent = item.text;
        });
    }

    initializeScheduleCalendar() {
        const calendarContainer = document.getElementById('scheduleCalendar');
        if (!calendarContainer) return;

        const today = new Date();
        const month = today.toLocaleString('default', { month: 'long' });
        const year = today.getFullYear();
        
        calendarContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <h6>${month} ${year}</h6>
            </div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem;">
                ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
                    `<div style="text-align: center; font-weight: 600; padding: 0.5rem;">${day}</div>`
                ).join('')}
                ${this.generateCalendarDays()}
            </div>
        `;
    }

    generateCalendarDays() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let daysHTML = '';
        
        for (let i = 0; i < firstDay; i++) {
            daysHTML += '<div style="padding: 0.5rem;"></div>';
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate();
            const hasJobs = day % 3 === 0;
            
            daysHTML += `
                <div style="
                    padding: 0.5rem;
                    text-align: center;
                    border-radius: 0.25rem;
                    background: ${isToday ? '#0b5cff' : 'transparent'};
                    color: ${isToday ? 'white' : 'inherit'};
                    position: relative;
                ">
                    ${day}
                    ${hasJobs ? '<div style="width: 4px; height: 4px; background: #10b981; border-radius: 50%; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);"></div>' : ''}
                </div>
            `;
        }
        
        return daysHTML;
    }

    loadTodaysSchedule() {
        const scheduleContainer = document.getElementById('todaysSchedule');
        if (!scheduleContainer) return;

        const schedule = [
            { time: '9:00 AM - 12:00 PM', job: 'Johnson Residence', status: 'In Progress' },
            { time: '2:00 PM - 4:00 PM', job: 'Smith Apartment', status: 'Scheduled' },
            { time: '5:00 PM - 7:00 PM', job: 'Davis Office', status: 'Scheduled' }
        ];

        scheduleContainer.innerHTML = schedule.map(item => `
            <div style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">
                <div style="font-weight: 600;">${item.time}</div>
                <div style="color: #6b7280; font-size: 0.875rem;">${item.job}</div>
                <div style="margin-top: 0.25rem;">
                    <span class="badge ${item.status === 'In Progress' ? 'bg-warning' : 'bg-info'}">
                        ${item.status}
                    </span>
                </div>
            </div>
        `).join('');
    }

    loadLocationData(staff) {
        // Update location info
        const locationElements = [
            { id: 'floatingCurrentLocation', text: staff.location },
            { id: 'floatingGPSAccuracy', text: '10m' },
            { id: 'floatingSpeed', text: `${staff.speed} km/h` },
            { id: 'floatingBattery', text: `${staff.battery}%` },
            { id: 'floatingLocationUpdate', text: staff.lastUpdate },
            { id: 'currentLocation', text: staff.location },
            { id: 'gpsAccuracy', text: '±10 meters' },
            { id: 'currentSpeed', text: `${staff.speed} km/h` },
            { id: 'deviceBattery', text: `${staff.battery}%` },
            { id: 'lastLocationUpdate', text: staff.lastUpdate }
        ];
        
        locationElements.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) element.textContent = item.text;
        });
        
        // Initialize map if element exists
        const mapElement = document.getElementById('floatingMap');
        if (mapElement) {
            this.initializeFloatingMap(staff);
        }
        
        // Load travel timeline
        this.loadTravelTimeline();
    }

    initializeFloatingMap(staff) {
        const mapElement = document.getElementById('floatingMap');
        if (!mapElement || typeof L === 'undefined') return;

        if (this.floatingMap) {
            this.floatingMap.remove();
        }

        this.floatingMap = L.map('floatingMap').setView([40.7128, -74.0060], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.floatingMap);

        const staffMarker = L.marker([40.7128, -74.0060])
            .addTo(this.floatingMap)
            .bindPopup(`<b>${staff.name}</b><br>${staff.location}<br>Distance: ${staff.distance}m`)
            .openPopup();

        L.circle([40.7128, -74.0060], {
            color: '#06b6d4',
            fillColor: '#06b6d4',
            fillOpacity: 0.1,
            radius: 30
        }).addTo(this.floatingMap).bindPopup('30m Detection Zone');

        L.circle([40.7128, -74.0060], {
            color: '#10b981',
            fillColor: '#10b981',
            fillOpacity: 0.1,
            radius: 15
        }).addTo(this.floatingMap).bindPopup('15m Service Zone');
    }

    loadTravelTimeline() {
        const timeline = document.getElementById('floatingTravelTimeline');
        if (!timeline) return;

        const events = [
            { time: '08:00', event: 'Clock In', location: 'Office - GPS Verified' },
            { time: '08:15', event: 'Start Travel', location: 'To Johnson Residence' },
            { time: '08:40', event: 'Arrival Auto-Detected', location: '123 Main St (25m)' },
            { time: '08:45', event: 'Entered Service Zone', location: '123 Main St (12m)' },
            { time: '09:00', event: 'Start Service', location: 'Johnson Residence' },
            { time: '11:30', event: 'End Service', location: 'Johnson Residence' }
        ];

        timeline.innerHTML = events.map(event => `
            <div class="gcorp-timeline-item">
                <div class="gcorp-timeline-time">${event.time}</div>
                <div class="gcorp-timeline-event">${event.event}</div>
                <div class="gcorp-timeline-location">${event.location}</div>
            </div>
        `).join('');
    }

    loadMediaUploadData(staff) {
        const table = document.getElementById('mediaUploadTable');
        if (!table) return;

        const mediaData = [
            { date: '2024-01-15', type: 'Photo', description: 'Before cleaning - Living room', file: 'living_room.jpg', status: 'Verified' },
            { date: '2024-01-15', type: 'Photo', description: 'After cleaning - Kitchen', file: 'kitchen.jpg', status: 'Verified' },
            { date: '2024-01-14', type: 'Video', description: 'Cleaning process', file: 'process.mp4', status: 'Verified' },
            { date: '2024-01-14', type: 'Photo', description: 'Equipment setup', file: 'equipment.jpg', status: 'Pending' },
            { date: '2024-01-13', type: 'Photo', description: 'Client satisfaction', file: 'client.jpg', status: 'Verified' }
        ];

        table.innerHTML = mediaData.map(item => `
            <tr>
                <td>${item.date}</td>
                <td>${item.type}</td>
                <td>${item.description}</td>
                <td>${item.file}</td>
                <td>
                    <span class="badge ${item.status === 'Verified' ? 'bg-success' : 'bg-warning'}">
                        ${item.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="dashboard.viewMediaFile('${item.file}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="dashboard.downloadMediaFile('${item.file}')">
                        <i class="fas fa-download"></i>
                    </button>
                </td>
            </tr>
        `).join('');
        
        // Update media statistics
        const statElements = [
            { id: 'totalMediaFiles', value: '15' },
            { id: 'totalPhotosCount', value: '12' },
            { id: 'totalVideos', value: '3' },
            { id: 'storageUsed', value: '245 MB' }
        ];
        
        statElements.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (element) element.textContent = stat.value;
        });
    }

    viewMediaFile(filename) {
        this.showNotification(`Viewing media: ${filename}`, 'info');
    }

    downloadMediaFile(filename) {
        this.showNotification(`Downloading: ${filename}`, 'success');
    }

    showMediaUploadModal() {
        const modalHTML = `
            <div class="gcorp-modal active" id="mediaUploadModal">
                <div class="gcorp-modal-content">
                    <div class="gcorp-modal-header">
                        <h3 class="gcorp-modal-title"><i class="fas fa-cloud-upload-alt"></i> Upload New Media</h3>
                        <button class="gcorp-modal-close" id="closeMediaUploadModal">&times;</button>
                    </div>
                    <div class="gcorp-modal-body">
                        <form id="mediaUploadForm">
                            <div class="mb-3">
                                <label class="form-label">Select File</label>
                                <input type="file" class="form-control" id="mediaFile" accept="image/*,video/*" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" id="mediaDescription" rows="3" placeholder="Enter description..." required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Media Type</label>
                                <select class="form-control" id="mediaType">
                                    <option value="photo">Photo</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="gcorp-modal-footer">
                        <button class="gcorp-btn gcorp-btn-outline" id="cancelUpload">Cancel</button>
                        <button class="gcorp-btn gcorp-btn-primary" id="submitUpload">Upload</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('closeMediaUploadModal')?.addEventListener('click', () => {
            document.getElementById('mediaUploadModal')?.remove();
        });
        
        document.getElementById('cancelUpload')?.addEventListener('click', () => {
            document.getElementById('mediaUploadModal')?.remove();
        });
        
        document.getElementById('submitUpload')?.addEventListener('click', () => {
            const fileInput = document.getElementById('mediaFile');
            const description = document.getElementById('mediaDescription').value;
            const type = document.getElementById('mediaType').value;
            
            if (!fileInput.files[0] || !description) {
                this.showNotification('Please select a file and enter description', 'warning');
                return;
            }
            
            this.showNotification(`${type === 'photo' ? 'Photo' : 'Video'} uploaded successfully: ${description}`, 'success');
            document.getElementById('mediaUploadModal')?.remove();
            
            const staff = this.sampleStaffData.find(s => s.id === this.currentStaffId);
            if (staff) {
                this.loadMediaUploadData(staff);
            }
        });
    }

    loadDashboardData() {
        this.populateStaffTable();
        this.populatePhotoTable();
        this.updateDashboardStats();
        this.initializePagination();
    }

    populateStaffTable() {
        const tableBody = document.getElementById('staffTableBody');
        if (!tableBody) return;

        const filteredData = this.filterStaffData();
        const paginatedData = this.paginateData(filteredData, this.currentPage, this.itemsPerPage);

        tableBody.innerHTML = '';

        paginatedData.forEach(staff => {
            let statusBadge = '';
            switch(staff.status) {
                case 'available':
                    statusBadge = '<span class="badge bg-success">Available</span>';
                    break;
                case 'busy':
                    statusBadge = '<span class="badge bg-warning">Busy</span>';
                    break;
                case 'traveling':
                    statusBadge = '<span class="badge bg-primary">Traveling</span>';
                    break;
                case 'offline':
                    statusBadge = '<span class="badge bg-secondary">Offline</span>';
                    break;
                case 'anomaly':
                    statusBadge = '<span class="badge bg-danger">Anomaly</span>';
                    break;
            }

            const propertyBadge = staff.propertyType === 'residential'
                ? '<span class="badge bg-success">Residential</span>'
                : '<span class="badge bg-primary">Commercial</span>';

            let geofenceBadge = '';
            switch(staff.geofenceStatus) {
                case 'inside-service':
                    geofenceBadge = '<span class="badge bg-success">Service Zone</span>';
                    break;
                case 'inside-detection':
                    geofenceBadge = '<span class="badge bg-info">Detection Zone</span>';
                    break;
                case 'outside':
                    geofenceBadge = '<span class="badge bg-danger">Outside</span>';
                    break;
            }

            let clockBadge = staff.clockStatus === 'clocked_in' ? 
                '<span class="badge bg-success">Clocked In</span>' :
                '<span class="badge bg-secondary">Clocked Out</span>';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${staff.id}</strong></td>
                <td>${staff.name}</td>
                <td><span class="badge bg-dark">${staff.vehicleId}</span></td>
                <td>${statusBadge}</td>
                <td>${staff.location}</td>
                <td>${propertyBadge}</td>
                <td><strong>$${staff.estimation.toFixed(2)}</strong></td>
                <td>${geofenceBadge}</td>
                <td>${staff.distance}m</td>
                <td>${clockBadge}</td>
                <td>${staff.lastUpdate}</td>
                <td>
                    <button class="btn btn-sm btn-primary gcorp-view-details" data-staff-id="${staff.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="dashboard.sendMessage('${staff.id}')">
                        <i class="fas fa-comment"></i>
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        this.updatePaginationInfo(filteredData.length);
    }

    filterStaffData() {
        const statusFilter = document.getElementById('statusFilter')?.value || '';
        const vehicleFilter = document.getElementById('vehicleFilter')?.value || '';
        const geofenceFilter = document.getElementById('geofenceFilter')?.value || '';
        const propertyTypeFilter = document.getElementById('propertyTypeFilter')?.value || '';
        const searchTerm = document.getElementById('staffSearch')?.value.toLowerCase() || '';

        return this.sampleStaffData.filter(staff => {
            if (statusFilter && staff.status !== statusFilter) return false;
            if (vehicleFilter && staff.vehicleId !== vehicleFilter) return false;
            if (geofenceFilter === 'inside' && staff.geofenceStatus === 'outside') return false;
            if (geofenceFilter === 'outside' && staff.geofenceStatus !== 'outside') return false;
            if (propertyTypeFilter && staff.propertyType !== propertyTypeFilter) return false;
            
            if (searchTerm) {
                const searchable = `${staff.id} ${staff.name} ${staff.vehicleId} ${staff.location} ${staff.propertyType}`.toLowerCase();
                if (!searchable.includes(searchTerm)) return false;
            }
            
            return true;
        });
    }

    filterStaff() {
        this.currentPage = 1;
        this.populateStaffTable();
        this.initializePagination();
    }

    searchStaff(query) {
        this.currentPage = 1;
        this.populateStaffTable();
        this.initializePagination();
    }

    paginateData(data, page, perPage) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return data.slice(start, end);
    }

    updatePaginationInfo(totalItems) {
        const infoElement = document.getElementById('paginationInfo');
        if (!infoElement) return;

        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(start + this.itemsPerPage - 1, totalItems);
        infoElement.textContent = `Showing ${start}-${end} of ${totalItems} staff members`;
    }

    initializePagination() {
        const pagination = document.getElementById('staffPagination');
        if (!pagination) return;

        const filteredData = this.filterStaffData();
        const totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
        
        pagination.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `gcorp-pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.populateStaffTable();
                this.initializePagination();
            }
        });
        pagination.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `gcorp-pagination-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.populateStaffTable();
                this.initializePagination();
            });
            pagination.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `gcorp-pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.populateStaffTable();
                this.initializePagination();
            }
        });
        pagination.appendChild(nextBtn);
    }

    populatePhotoTable() {
        const tableBody = document.getElementById('photoTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        this.sampleMediaData.forEach(media => {
            const statusBadge = media.status === 'pending' ? 
                '<span class="badge bg-warning">Pending</span>' :
                media.status === 'approved' ?
                    '<span class="badge bg-success">Approved</span>' :
                    '<span class="badge bg-danger">Rejected</span>';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${media.staffName} (${media.staffId})</td>
                <td>${media.type}</td>
                <td>${media.timestamp}</td>
                <td>
                    <span class="badge ${media.category === 'Photo' ? 'bg-info' : 'bg-purple'}">
                        <i class="fas ${media.category === 'Photo' ? 'fa-image' : 'fa-video'}"></i> ${media.category}
                    </span>
                </td>
                <td>${media.gpsMatch ? '<i class="fas fa-check text-success"></i>' : '<i class="fas fa-times text-danger"></i>'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="dashboard.viewMedia('${media.id}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </td>
                <td>${statusBadge}</td>
                <td>
                    ${media.status === 'pending' ? `
                        <button class="btn btn-sm btn-success" onclick="dashboard.approveMedia('${media.id}')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="dashboard.rejectMedia('${media.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    filterPhotos(filterType) {
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filterType);
        });
    }

    updateDashboardStats() {
        const totalStaff = this.sampleStaffData.length;
        const onDuty = this.sampleStaffData.filter(staff => 
            staff.status !== 'offline' && staff.status !== 'anomaly'
        ).length;
        const anomalies = this.sampleStaffData.filter(staff => 
            staff.status === 'anomaly'
        ).length;

        document.getElementById('totalStaff').textContent = totalStaff;
        document.getElementById('onDutyStaff').textContent = onDuty;
        document.getElementById('anomalyCount').textContent = anomalies;

        const pendingMedia = this.sampleMediaData.filter(media => 
            media.status === 'pending'
        ).length;
        const pendingPhotosElement = document.getElementById('pendingPhotos');
        if (pendingPhotosElement) {
            pendingPhotosElement.textContent = pendingMedia;
        }
    }

    switchTab(tabElement) {
        document.querySelectorAll('.gcorp-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        tabElement.classList.add('active');

        document.querySelectorAll('.gcorp-tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const tabId = tabElement.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }

    refreshDashboard() {
        this.showNotification('Refreshing dashboard data...', 'info');
        setTimeout(() => {
            this.generateSampleData();
            this.generateAppointmentData();
            this.loadDashboardData();
            this.showNotification('Dashboard data refreshed successfully', 'success');
        }, 1000);
    }

    viewPhoto(photoId) {
        const media = this.sampleMediaData.find(m => m.id === photoId);
        if (media) {
            this.viewMedia(photoId);
        }
    }

    approvePhoto(photoId) {
        this.approveMedia(photoId);
    }

    rejectPhoto(photoId) {
        this.rejectMedia(photoId);
    }

    sendMessage(staffId) {
        const staff = this.sampleStaffData.find(s => s.id === staffId);
        if (staff) {
            this.showNotification(`Message sent to ${staff.name} (${staff.phone})`, 'info');
        }
    }

    forceClockOut(staffId) {
        const staff = this.sampleStaffData.find(s => s.id === staffId);
        if (staff) {
            staff.clockStatus = 'clocked_out';
            staff.status = 'offline';
            this.showNotification(`Force clocked out ${staff.name}`, 'warning');
            this.populateStaffTable();
            this.updateDashboardStats();
        }
    }

    reportIssue(staffId) {
        const staff = this.sampleStaffData.find(s => s.id === staffId);
        if (staff) {
            this.showNotification(`Issue reported for ${staff.name}. Supervisor notified.`, 'danger');
        }
    }

    clearNotifications() {
        const notificationList = document.getElementById('notificationList');
        if (notificationList) {
            notificationList.innerHTML = '';
            const panel = document.getElementById('notificationPanel');
            panel.classList.remove('active');
        }
    }

    initializeMaps() {
        if (typeof L !== 'undefined') {
            this.initializeVehicleMap();
            this.initializeGeofenceMap();
        }
    }

    initializeVehicleMap() {
        const mapElement = document.getElementById('vehicleMap');
        if (!mapElement) return;

        this.vehicleMap = L.map('vehicleMap').setView([40.7128, -74.0060], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.vehicleMap);
    }

    initializeGeofenceMap() {
        const mapElement = document.getElementById('geofenceMap');
        if (!mapElement) return;

        this.geofenceMap = L.map('geofenceMap').setView([40.7128, -74.0060], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.geofenceMap);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `gcorp-notification-item ${type}`;
        notification.innerHTML = `
            <div><strong>${type.toUpperCase()}:</strong> ${message}</div>
            <div class="gcorp-notification-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;

        const notificationList = document.getElementById('notificationList');
        if (notificationList) {
            notificationList.prepend(notification);
            
            const panel = document.getElementById('notificationPanel');
            panel.classList.add('active');
            
            setTimeout(() => {
                notification.remove();
                if (notificationList.children.length === 0) {
                    panel.classList.remove('active');
                }
            }, 5000);
        }
    }

    handleResize() {
        if (this.floatingWindow && this.floatingWindow.classList.contains('active')) {
            const rect = this.floatingWindow.getBoundingClientRect();
            if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                this.positionFloatingWindow();
            }
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new GCorpStaffDashboard();
});