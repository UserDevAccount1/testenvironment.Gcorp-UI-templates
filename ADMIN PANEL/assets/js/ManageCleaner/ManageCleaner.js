// ==================== ManageCleaner.js ====================
// All code is scoped to the unique element "mgcCleanerWrap" and uses its own IDs/functions
// No global interference.

(function() {
    "use strict";

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {

        // Reference to our unique wrapper
        const wrap = document.getElementById('mgcCleanerWrap');
        if (!wrap) return; // exit if not found (safety)

        // ========== SAMPLE DATA OBJECT (complete profile data) ==========
        const sampleCleaners = {
            'CL-1024': {
                id: 'CL-1024',
                firstName: 'Sophia',
                lastName: 'Martinez',
                displayName: 'Sophia Martinez',
                username: 'sophia.m',
                initials: 'SM',
                photoColor: '#1e4f8a',
                phone: '+1 415 555 0199',
                altPhone: '+1 415 555 0123',
                email: 's.martinez@clean.co',
                personalEmail: 'sophia.m@email.com',
                status: 'Online',
                currentJob: '#J-332 · 2h Downtown',
                location: '0.3 mi · 1min',
                rating: 4.9,
                stars: '★★★★★',
                onTimeRate: 98,
                jobsCompleted: 1224,
                skills: ['Deep', 'Steam', 'Window'],
                equipment: ['Steam Machine (Expert)', 'HEPA Vacuum (Expert)'],
                employmentType: 'Full-time',
                workZones: 'Downtown, SOMA',
                lastActive: 'just now',
                hireDate: '2022-03-15',
                position: 'Senior Cleaner',
                manager: 'John Smith',
                languages: ['English', 'Spanish'],
                certifications: ['OSHA Safety', 'Biohazard Cleaning'],
                address: '123 Main St, San Francisco, CA 94105',
                emergencyContact: 'Maria Martinez (Mother) - +1 415 555 9876',
                performance: {
                    totalRatings: 245,
                    fiveStar: 210,
                    fourStar: 25,
                    threeStar: 8,
                    twoStar: 2,
                    oneStar: 0,
                    complaints: 1,
                    compliments: 32
                }
            },
            'CL-2087': {
                id: 'CL-2087',
                firstName: 'James',
                lastName: 'Chen',
                displayName: 'James Chen',
                username: 'james.c',
                initials: 'JC',
                photoColor: '#b45309',
                phone: '+1 628 555 0234',
                altPhone: '+1 628 555 5678',
                email: 'j.chen@clean.co',
                personalEmail: 'james.c@email.com',
                status: 'On Site',
                currentJob: '#J-428 · 230 Main St',
                location: 'at job · 0min',
                rating: 4.2,
                stars: '★★★★☆',
                onTimeRate: 95,
                jobsCompleted: 978,
                skills: ['Deep', 'Window', 'Post-Reno'],
                equipment: ['Ladder (Expert)', 'Pressure Washer (Intermediate)'],
                employmentType: 'Full-time',
                workZones: 'North Beach, FiDi',
                lastActive: '5 min ago',
                hireDate: '2021-11-01',
                position: 'Cleaner',
                manager: 'Sarah Johnson',
                languages: ['English', 'Mandarin'],
                certifications: ['High-Rise Window Cleaning'],
                address: '456 Washington St, San Francisco, CA 94108',
                emergencyContact: 'Linda Chen (Wife) - +1 628 555 8765',
                performance: {
                    totalRatings: 156,
                    fiveStar: 98,
                    fourStar: 42,
                    threeStar: 12,
                    twoStar: 3,
                    oneStar: 1,
                    complaints: 2,
                    compliments: 18
                }
            },
            'CL-3051': {
                id: 'CL-3051',
                firstName: 'Maria',
                lastName: 'Garcia',
                displayName: 'Maria Garcia',
                username: 'maria.g',
                initials: 'MG',
                photoColor: '#0f5c4b',
                phone: '+1 415 555 8873',
                altPhone: '+1 415 555 4321',
                email: 'm.garcia@clean.co',
                personalEmail: 'maria.g@email.com',
                status: 'Traveling',
                currentJob: 'en route to #J-512',
                location: '1.2 mi · 4min',
                rating: 5.0,
                stars: '★★★★★',
                onTimeRate: 100,
                jobsCompleted: 1502,
                skills: ['Move-Out', 'Carpet', 'Deep'],
                equipment: ['Carpet Steamer (Expert)', 'HEPA Vacuum (Expert)'],
                employmentType: 'Contract',
                workZones: 'Mission, Bernal',
                lastActive: '2 min ago',
                hireDate: '2023-01-10',
                position: 'Specialist Cleaner',
                manager: 'Mike Wilson',
                languages: ['English', 'Spanish'],
                certifications: ['Carpet Cleaning Specialist', 'Mold Remediation'],
                address: '789 Valencia St, San Francisco, CA 94110',
                emergencyContact: 'Carlos Garcia (Brother) - +1 415 555 2468',
                performance: {
                    totalRatings: 278,
                    fiveStar: 250,
                    fourStar: 22,
                    threeStar: 5,
                    twoStar: 1,
                    oneStar: 0,
                    complaints: 0,
                    compliments: 45
                }
            },
            'CL-1129': {
                id: 'CL-1129',
                firstName: 'David',
                lastName: 'Kim',
                displayName: 'David Kim',
                username: 'david.k',
                initials: 'DK',
                photoColor: '#7b4c9d',
                phone: '+1 650 555 3421',
                altPhone: '+1 650 555 7890',
                email: 'd.kim@clean.co',
                personalEmail: 'david.k@email.com',
                status: 'Break',
                currentJob: '— (lunch)',
                location: '0.0 mi · 12min',
                rating: 3.8,
                stars: '★★★☆☆',
                onTimeRate: 82,
                jobsCompleted: 643,
                skills: ['Maintenance', 'HEPA', 'Steam'],
                equipment: ['HEPA Vacuum (Intermediate)', 'Steam Machine (Beginner)'],
                employmentType: 'Part-time',
                workZones: 'Richmond, Sunset',
                lastActive: '12 min ago',
                hireDate: '2023-06-20',
                position: 'Junior Cleaner',
                manager: 'Emily Davis',
                languages: ['English', 'Korean'],
                certifications: ['Basic Cleaning Certification'],
                address: '321 Clement St, San Francisco, CA 94118',
                emergencyContact: 'Jenny Kim (Sister) - +1 650 555 1357',
                performance: {
                    totalRatings: 89,
                    fiveStar: 32,
                    fourStar: 28,
                    threeStar: 20,
                    twoStar: 6,
                    oneStar: 3,
                    complaints: 4,
                    compliments: 8
                }
            },
            'CL-4013': {
                id: 'CL-4013',
                firstName: 'Elena',
                lastName: 'Rossi',
                displayName: 'Elena Rossi',
                username: 'elena.r',
                initials: 'ER',
                photoColor: '#b02e4c',
                phone: '+1 415 555 7782',
                altPhone: '+1 415 555 9900',
                email: 'e.rossi@clean.co',
                personalEmail: 'elena.r@email.com',
                status: 'Offline',
                currentJob: '—',
                location: 'last: 2hr ago',
                rating: 4.5,
                stars: '★★★★☆',
                onTimeRate: 97,
                jobsCompleted: 2101,
                skills: ['Steam', 'Post-Reno', 'Move-In'],
                equipment: ['Steam Machine (Trainer)', 'Pressure Washer (Expert)'],
                employmentType: 'Full-time',
                workZones: 'Marina, Cow Hollow',
                lastActive: '2 hours ago',
                hireDate: '2021-05-03',
                position: 'Lead Cleaner',
                manager: 'John Smith',
                languages: ['English', 'Italian'],
                certifications: ['Train the Trainer', 'Biohazard Specialist'],
                address: '555 Chestnut St, San Francisco, CA 94123',
                emergencyContact: 'Marco Rossi (Father) - +1 415 555 1122',
                performance: {
                    totalRatings: 389,
                    fiveStar: 298,
                    fourStar: 65,
                    threeStar: 20,
                    twoStar: 4,
                    oneStar: 2,
                    complaints: 3,
                    compliments: 67
                }
            }
        };

        // ========== ELEMENTS ==========
        const filterTabs = wrap.querySelectorAll('#mgcFilterTabs span');
        const tableRows = wrap.querySelectorAll('#mgcTableBody tr');
        const searchInput = wrap.querySelector('#mgcSearchInput');
        const exportBtn = wrap.querySelector('#mgcExportBtn');
        const filterBtn = wrap.querySelector('#mgcFilterBtn');
        const bulkEmailBtn = wrap.querySelector('#mgcBulkEmail');
        const bulkZoneBtn = wrap.querySelector('#mgcBulkZone');
        const bulkStatusBtn = wrap.querySelector('#mgcBulkStatus');
        const floatingWindow = wrap.querySelector('#mgcFloatingWindow');
        const floatingContent = wrap.querySelector('#mgcFloatingContent');
        const floatingTabs = wrap.querySelectorAll('#mgcFloatingTabs span');
        const floatingMinimize = wrap.querySelector('#mgcFloatingMinimize');
        const floatingClose = wrap.querySelector('#mgcFloatingClose');
        const filtersPanel = wrap.querySelector('#mgcFiltersPanel');
        const filtersClose = wrap.querySelector('#mgcFiltersClose');
        const applyFiltersBtn = wrap.querySelector('#mgcApplyFilters');
        const resetFiltersBtn = wrap.querySelector('#mgcResetFilters');
        
        // Status mapping for badge classes
        const statusClassMap = {
            'Online': 'mgc-status-online',
            'On Site': 'mgc-status-onsite',
            'Traveling': 'mgc-status-traveling',
            'Break': 'mgc-status-break',
            'Offline': 'mgc-status-offline',
            'On Leave': 'mgc-status-leave'
        };

        // Floating window drag functionality
        let isDragging = false;
        let dragOffsetX, dragOffsetY;

        const floatingHeader = wrap.querySelector('.mgc-floating-header');
        
        floatingHeader.addEventListener('mousedown', function(e) {
            isDragging = true;
            const rect = floatingWindow.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            floatingWindow.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const x = e.clientX - dragOffsetX;
            const y = e.clientY - dragOffsetY;
            
            // Keep within viewport bounds
            const maxX = window.innerWidth - floatingWindow.offsetWidth;
            const maxY = window.innerHeight - floatingWindow.offsetHeight;
            
            floatingWindow.style.left = Math.min(Math.max(0, x), maxX) + 'px';
            floatingWindow.style.top = Math.min(Math.max(0, y), maxY) + 'px';
            floatingWindow.style.right = 'auto';
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            floatingWindow.style.cursor = 'default';
        });

        // ========== FLOATING WINDOW CONTROLS ==========
        floatingClose.addEventListener('click', function() {
            floatingWindow.style.display = 'none';
        });

        floatingMinimize.addEventListener('click', function() {
            floatingWindow.classList.toggle('mgc-minimized');
            const icon = floatingMinimize.querySelector('i');
            if (floatingWindow.classList.contains('mgc-minimized')) {
                icon.className = 'fas fa-plus';
            } else {
                icon.className = 'fas fa-minus';
            }
        });

        // ========== TABLE ACTION HANDLERS ==========
        const actionIcons = wrap.querySelectorAll('#mgcTableBody .mgc-actions-cell i');

        actionIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                const row = this.closest('tr');
                const cleanerId = row.getAttribute('data-cleaner-id');
                const cleaner = sampleCleaners[cleanerId];
                const action = this.getAttribute('data-action') || '';

                if (action === 'view' || action === 'performance' || action === 'documents') {
                    // Show floating window with profile
                    showFloatingProfile(cleaner, action);
                } else {
                    // Simple demo messages for other actions
                    switch(action) {
                        case 'edit':
                            alert(`✏️ Edit cleaner: ${cleaner.displayName}\n\nThis would open an edit form with all fields.`);
                            break;
                        case 'assign':
                            alert(`📋 Assign new job to ${cleaner.displayName}\n\nThis would open a job assignment modal.`);
                            break;
                        case 'message':
                            alert(`💬 Send message to ${cleaner.displayName}\n\nThis would open a chat window.`);
                            break;
                    }
                }
            });
        });

        // ========== SHOW FLOATING PROFILE ==========
        function showFloatingProfile(cleaner, activeTab = 'personal') {
            if (!cleaner) return;
            
            floatingWindow.style.display = 'block';
            floatingWindow.classList.remove('mgc-minimized');
            floatingMinimize.querySelector('i').className = 'fas fa-minus';
            
            // Position floating window in center if not already positioned
            if (!floatingWindow.style.left || floatingWindow.style.left === 'auto') {
                floatingWindow.style.left = (window.innerWidth - 450) / 2 + 'px';
                floatingWindow.style.top = '100px';
                floatingWindow.style.right = 'auto';
            }
            
            // Update tabs
            floatingTabs.forEach(tab => {
                tab.classList.remove('mgc-tab-active');
                if (tab.getAttribute('data-tab') === activeTab) {
                    tab.classList.add('mgc-tab-active');
                }
            });
            
            // Load profile content based on active tab
            loadProfileTab(cleaner, activeTab);
        }

        // ========== LOAD PROFILE TAB ==========
        function loadProfileTab(cleaner, tab) {
            let content = '';
            
            switch(tab) {
                case 'personal':
                    content = `
                        <div class="mgc-profile-header">
                            <div class="mgc-profile-photo" style="background-color: ${cleaner.photoColor};">${cleaner.initials}</div>
                            <div class="mgc-profile-header-info">
                                <h3>${cleaner.displayName}</h3>
                                <p>@${cleaner.username} · ${cleaner.position}</p>
                                <p><span class="mgc-status-badge mgc-status-${cleaner.status.toLowerCase().replace(' ', '')}">${cleaner.status}</span></p>
                            </div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-user"></i> Personal Information</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Full Name:</span><span class="mgc-profile-value">${cleaner.firstName} ${cleaner.lastName}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Date of Birth:</span><span class="mgc-profile-value">1985-06-15</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Gender:</span><span class="mgc-profile-value">Female</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Nationality:</span><span class="mgc-profile-value">American</span></div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-phone"></i> Contact Information</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Phone:</span><span class="mgc-profile-value">${cleaner.phone}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Alt Phone:</span><span class="mgc-profile-value">${cleaner.altPhone || 'N/A'}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Work Email:</span><span class="mgc-profile-value">${cleaner.email}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Personal Email:</span><span class="mgc-profile-value">${cleaner.personalEmail}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Address:</span><span class="mgc-profile-value">${cleaner.address}</span></div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-briefcase"></i> Employment Details</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Employee ID:</span><span class="mgc-profile-value">${cleaner.id}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Hire Date:</span><span class="mgc-profile-value">${cleaner.hireDate}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Type:</span><span class="mgc-profile-value">${cleaner.employmentType}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Position:</span><span class="mgc-profile-value">${cleaner.position}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Manager:</span><span class="mgc-profile-value">${cleaner.manager}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Work Zones:</span><span class="mgc-profile-value">${cleaner.workZones}</span></div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-ambulance"></i> Emergency Contact</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Emergency:</span><span class="mgc-profile-value">${cleaner.emergencyContact}</span></div>
                        </div>
                    `;
                    break;
                    
                case 'skills':
                    content = `
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-broom"></i> Cleaning Types</h4>
                            <div>${cleaner.skills.map(skill => `<span class="mgc-profile-badge">${skill}</span>`).join('')}</div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-tools"></i> Equipment Proficiency</h4>
                            <div>${cleaner.equipment.map(eq => `<span class="mgc-profile-badge">${eq}</span>`).join('')}</div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-language"></i> Languages</h4>
                            <div>${cleaner.languages.map(lang => `<span class="mgc-profile-badge">${lang}</span>`).join('')}</div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-certificate"></i> Certifications</h4>
                            <table style="width:100%; border-collapse:collapse;">
                                <tr style="border-bottom:1px solid #e2e8f0;">
                                    <th style="text-align:left; padding:8px 0;">Name</th>
                                    <th style="text-align:left; padding:8px 0;">Issue Date</th>
                                    <th style="text-align:left; padding:8px 0;">Expiry</th>
                                </tr>
                                ${cleaner.certifications.map(cert => `
                                    <tr>
                                        <td style="padding:8px 0;">${cert}</td>
                                        <td>2023-01-15</td>
                                        <td>2025-01-15</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    `;
                    break;
                    
                case 'performance':
                    const perf = cleaner.performance;
                    content = `
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-star"></i> Ratings</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Average:</span><span class="mgc-profile-value"><span class="mgc-stars">${cleaner.stars}</span> ${cleaner.rating}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Total Ratings:</span><span class="mgc-profile-value">${perf.totalRatings}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">5★:</span><span class="mgc-profile-value">${perf.fiveStar}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">4★:</span><span class="mgc-profile-value">${perf.fourStar}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">3★:</span><span class="mgc-profile-value">${perf.threeStar}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">2★:</span><span class="mgc-profile-value">${perf.twoStar}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">1★:</span><span class="mgc-profile-value">${perf.oneStar}</span></div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-clock"></i> Reliability</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">On-Time Rate:</span><span class="mgc-profile-value">${cleaner.onTimeRate}%</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">No-Shows:</span><span class="mgc-profile-value">0</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Cancellations:</span><span class="mgc-profile-value">2</span></div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-chart-line"></i> Productivity</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Jobs Completed:</span><span class="mgc-profile-value">${cleaner.jobsCompleted}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Hours Worked:</span><span class="mgc-profile-value">${(cleaner.jobsCompleted * 2.5).toFixed(0)} hrs</span></div>
                        </div>
                        
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-heart"></i> Quality</h4>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Complaints:</span><span class="mgc-profile-value">${perf.complaints}</span></div>
                            <div class="mgc-profile-row"><span class="mgc-profile-label">Compliments:</span><span class="mgc-profile-value">${perf.compliments}</span></div>
                        </div>
                    `;
                    break;
                    
                case 'equipment':
                    content = `
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-tools"></i> Assigned Equipment</h4>
                            <table style="width:100%; border-collapse:collapse;">
                                <tr style="border-bottom:1px solid #e2e8f0;">
                                    <th style="text-align:left; padding:8px 0;">Equipment</th>
                                    <th style="text-align:left; padding:8px 0;">Serial #</th>
                                    <th style="text-align:left; padding:8px 0;">Status</th>
                                    <th style="text-align:left; padding:8px 0;">Last Checked</th>
                                </tr>
                                <tr>
                                    <td>Steam Machine Pro</td>
                                    <td>SM-78923</td>
                                    <td><span class="mgc-status-badge mgc-status-online" style="background:#22c55e;">In Use</span></td>
                                    <td>Today</td>
                                </tr>
                                <tr>
                                    <td>HEPA Vacuum</td>
                                    <td>HV-45612</td>
                                    <td><span class="mgc-status-badge mgc-status-online" style="background:#22c55e;">In Use</span></td>
                                    <td>Yesterday</td>
                                </tr>
                                <tr>
                                    <td>Carpet Steamer</td>
                                    <td>CS-34178</td>
                                    <td><span class="mgc-status-badge mgc-status-break">Maintenance</span></td>
                                    <td>3 days ago</td>
                                </tr>
                            </table>
                        </div>
                    `;
                    break;
                    
                case 'documents':
                    content = `
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-file-alt"></i> Documents</h4>
                            <table style="width:100%; border-collapse:collapse;">
                                <tr style="border-bottom:1px solid #e2e8f0;">
                                    <th style="text-align:left; padding:8px 0;">Type</th>
                                    <th style="text-align:left; padding:8px 0;">Uploaded</th>
                                    <th style="text-align:left; padding:8px 0;">Expiry</th>
                                    <th style="text-align:left; padding:8px 0;">Status</th>
                                    <th style="text-align:left; padding:8px 0;">Action</th>
                                </tr>
                                <tr>
                                    <td>Government ID</td>
                                    <td>2023-01-10</td>
                                    <td>2028-01-10</td>
                                    <td><span class="mgc-status-badge mgc-status-online" style="background:#22c55e;">Valid</span></td>
                                    <td><i class="fas fa-download" style="cursor:pointer;"></i></td>
                                </tr>
                                <tr>
                                    <td>Work Permit</td>
                                    <td>2023-01-10</td>
                                    <td>2025-01-10</td>
                                    <td><span class="mgc-status-badge mgc-status-online" style="background:#22c55e;">Valid</span></td>
                                    <td><i class="fas fa-download" style="cursor:pointer;"></i></td>
                                </tr>
                                <tr>
                                    <td>Employment Contract</td>
                                    <td>2023-01-10</td>
                                    <td>—</td>
                                    <td><span class="mgc-status-badge mgc-status-online" style="background:#22c55e;">Active</span></td>
                                    <td><i class="fas fa-download" style="cursor:pointer;"></i></td>
                                </tr>
                                <tr>
                                    <td>Background Check</td>
                                    <td>2023-01-05</td>
                                    <td>2024-01-05</td>
                                    <td><span class="mgc-status-badge mgc-status-online" style="background:#22c55e;">Valid</span></td>
                                    <td><i class="fas fa-download" style="cursor:pointer;"></i></td>
                                </tr>
                            </table>
                        </div>
                    `;
                    break;
                    
                case 'history':
                    content = `
                        <div class="mgc-profile-section">
                            <h4><i class="fas fa-history"></i> Recent Job History</h4>
                            <table style="width:100%; border-collapse:collapse;">
                                <tr style="border-bottom:1px solid #e2e8f0;">
                                    <th style="text-align:left; padding:8px 0;">Date</th>
                                    <th style="text-align:left; padding:8px 0;">Client</th>
                                    <th style="text-align:left; padding:8px 0;">Service</th>
                                    <th style="text-align:left; padding:8px 0;">Duration</th>
                                    <th style="text-align:left; padding:8px 0;">Rating</th>
                                </tr>
                                <tr>
                                    <td>Today</td>
                                    <td>John Smith</td>
                                    <td>Deep Cleaning</td>
                                    <td>3h</td>
                                    <td>★★★★★</td>
                                </tr>
                                <tr>
                                    <td>Yesterday</td>
                                    <td>Sarah Johnson</td>
                                    <td>Move-Out</td>
                                    <td>5h</td>
                                    <td>★★★★☆</td>
                                </tr>
                                <tr>
                                    <td>2 days ago</td>
                                    <td>Mike Wilson</td>
                                    <td>Window Cleaning</td>
                                    <td>2h</td>
                                    <td>★★★★★</td>
                                </tr>
                                <tr>
                                    <td>3 days ago</td>
                                    <td>Emily Davis</td>
                                    <td>Carpet Cleaning</td>
                                    <td>2.5h</td>
                                    <td>★★★★☆</td>
                                </tr>
                            </table>
                        </div>
                    `;
                    break;
            }
            
            floatingContent.innerHTML = content;
        }

        // ========== TAB CLICK HANDLERS ==========
        floatingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const cleanerId = floatingContent.getAttribute('data-current-cleaner');
                const cleaner = cleanerId ? sampleCleaners[cleanerId] : sampleCleaners['CL-1024'];
                const tabName = this.getAttribute('data-tab');
                
                floatingTabs.forEach(t => t.classList.remove('mgc-tab-active'));
                this.classList.add('mgc-tab-active');
                
                loadProfileTab(cleaner, tabName);
            });
        });

        // ========== PHONE, EMAIL, LOCATION ICON HANDLERS ==========
        wrap.querySelectorAll('.mgc-table td .mgc-phone-icon, .mgc-table td .mgc-email-icon, .mgc-table td .mgc-location-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                const row = this.closest('tr');
                const cleanerName = row ? row.querySelector('.mgc-name')?.innerText : 'Cleaner';
                
                if (this.classList.contains('mgc-phone-icon')) {
                    const phone = this.getAttribute('data-phone') || '';
                    alert(`📞 Call ${cleanerName}\nPhone: ${phone}\n\nThis would initiate a phone call.`);
                } else if (this.classList.contains('mgc-email-icon')) {
                    const email = this.getAttribute('data-email') || '';
                    alert(`✉️ Email ${cleanerName}\nEmail: ${email}\n\nThis would open email client.`);
                } else if (this.classList.contains('mgc-location-icon')) {
                    alert(`🗺️ Location for ${cleanerName}\n\nThis would open an interactive map.`);
                }
            });
        });

        // ========== UPDATE STATUS COUNTS ==========
        function updateStatusCounts() {
            const visibleRows = wrap.querySelectorAll('#mgcTableBody tr:not([style*="display: none"])');
            const counts = {
                online: 0,
                onsite: 0,
                traveling: 0,
                break: 0,
                offline: 0
            };

            visibleRows.forEach(row => {
                const statusBadge = row.querySelector('.mgc-status-badge');
                if (statusBadge) {
                    if (statusBadge.classList.contains('mgc-status-online')) counts.online++;
                    else if (statusBadge.classList.contains('mgc-status-onsite')) counts.onsite++;
                    else if (statusBadge.classList.contains('mgc-status-traveling')) counts.traveling++;
                    else if (statusBadge.classList.contains('mgc-status-break')) counts.break++;
                    else if (statusBadge.classList.contains('mgc-status-offline')) counts.offline++;
                }
            });

            wrap.querySelector('#mgcTotalCount').innerText = visibleRows.length;
            wrap.querySelector('#mgcOnlineCount').innerText = counts.online;
            wrap.querySelector('#mgcOnSiteCount').innerText = counts.onsite;
            wrap.querySelector('#mgcTravelingCount').innerText = counts.traveling;
            wrap.querySelector('#mgcBreakCount').innerText = counts.break;
            wrap.querySelector('#mgcOfflineCount').innerText = counts.offline;
        }

        // ========== FILTER FUNCTIONALITY ==========
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                // Remove active class from all tabs
                filterTabs.forEach(sp => sp.classList.remove('mgc-filter-active'));
                this.classList.add('mgc-filter-active');

                const selectedStatus = this.getAttribute('data-status') || 'all';

                tableRows.forEach(row => {
                    if (selectedStatus === 'all') {
                        row.style.display = '';
                    } else {
                        const statusBadge = row.querySelector('.mgc-status-badge');
                        if (statusBadge && statusBadge.classList.contains(statusClassMap[selectedStatus] || '')) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    }
                });

                // Update the footer counts
                updateStatusCounts();
            });
        });

        // ========== SEARCH FUNCTIONALITY ==========
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                tableRows.forEach(row => {
                    if (searchTerm === '') {
                        // Reset to current filter state
                        const activeFilter = wrap.querySelector('#mgcFilterTabs .mgc-filter-active');
                        if (activeFilter) {
                            const filterStatus = activeFilter.getAttribute('data-status');
                            if (filterStatus === 'all') {
                                row.style.display = '';
                            } else {
                                const statusBadge = row.querySelector('.mgc-status-badge');
                                row.style.display = statusBadge && statusBadge.classList.contains(statusClassMap[filterStatus]) ? '' : 'none';
                            }
                        }
                    } else {
                        const rowText = row.innerText.toLowerCase();
                        if (rowText.includes(searchTerm)) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    }
                });

                updateStatusCounts();
            });
        }

        // ========== BULK OPERATIONS ==========
        if (bulkEmailBtn) {
            bulkEmailBtn.addEventListener('click', function() {
                const visibleRows = wrap.querySelectorAll('#mgcTableBody tr:not([style*="display: none"])');
                const cleanerList = Array.from(visibleRows).map(row => 
                    row.querySelector('.mgc-name')?.innerText
                ).filter(name => name).join('\n• ');
                
                alert(`📧 Bulk Email to ${visibleRows.length} cleaners\n\nSelected cleaners:\n• ${cleanerList}\n\nThis would open a bulk email composer.`);
            });
        }

        if (bulkZoneBtn) {
            bulkZoneBtn.addEventListener('click', function() {
                const visibleRows = wrap.querySelectorAll('#mgcTableBody tr:not([style*="display: none"])');
                alert(`🗺️ Bulk Zone Assignment for ${visibleRows.length} cleaners\n\nThis would open a zone assignment interface.`);
            });
        }

        if (bulkStatusBtn) {
            bulkStatusBtn.addEventListener('click', function() {
                const visibleRows = wrap.querySelectorAll('#mgcTableBody tr:not([style*="display: none"])');
                alert(`🔄 Bulk Status Update for ${visibleRows.length} cleaners\n\nThis would open a status update interface.`);
            });
        }

        // ========== EXPORT FUNCTIONALITY ==========
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                const visibleRows = wrap.querySelectorAll('#mgcTableBody tr:not([style*="display: none"])');
                alert(`📥 Export Cleaner List (${visibleRows.length} cleaners)\n\nCSV file would be downloaded.`);
            });
        }

        // ========== FILTERS PANEL ==========
        if (filterBtn) {
            filterBtn.addEventListener('click', function() {
                filtersPanel.style.display = 'block';
            });
        }

        if (filtersClose) {
            filtersClose.addEventListener('click', function() {
                filtersPanel.style.display = 'none';
            });
        }

        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', function() {
                const employment = wrap.querySelector('#mgcFilterEmployment').value;
                const skills = wrap.querySelector('#mgcFilterSkills').value;
                const zone = wrap.querySelector('#mgcFilterZone').value;
                const rating = wrap.querySelector('#mgcFilterRating').value;
                
                alert(`Applied filters:\nEmployment: ${employment}\nSkills: ${skills}\nZone: ${zone}\nRating: ${rating}`);
                filtersPanel.style.display = 'none';
            });
        }

        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
                wrap.querySelector('#mgcFilterEmployment').value = 'all';
                wrap.querySelector('#mgcFilterSkills').value = 'all';
                wrap.querySelector('#mgcFilterZone').value = 'all';
                wrap.querySelector('#mgcFilterRating').value = 'all';
            });
        }

        // ========== SORT FUNCTIONALITY ==========
        const sortableHeaders = wrap.querySelectorAll('.mgc-sortable');
        let currentSort = { column: -1, ascending: true };

        sortableHeaders.forEach((header, index) => {
            header.addEventListener('click', function() {
                const columnIndex = getColumnIndex(this);
                
                // Reset icons
                sortableHeaders.forEach(h => {
                    h.querySelector('i').className = 'fas fa-sort';
                });
                
                if (currentSort.column === columnIndex) {
                    currentSort.ascending = !currentSort.ascending;
                } else {
                    currentSort.column = columnIndex;
                    currentSort.ascending = true;
                }
                
                this.querySelector('i').className = currentSort.ascending ? 'fas fa-sort-up' : 'fas fa-sort-down';
                
                sortTable(columnIndex, currentSort.ascending);
            });
        });

        function getColumnIndex(header) {
            const headers = Array.from(wrap.querySelectorAll('.mgc-table th'));
            return headers.indexOf(header);
        }

        function sortTable(columnIndex, ascending) {
            const tbody = wrap.querySelector('#mgcTableBody');
            const rows = Array.from(tbody.querySelectorAll('tr:not([style*="display: none"])'));
            
            rows.sort((a, b) => {
                let aVal = getCellValue(a, columnIndex);
                let bVal = getCellValue(b, columnIndex);
                
                if (columnIndex === 8) { // Rating
                    aVal = parseFloat(aVal.split(' ')[1] || '0');
                    bVal = parseFloat(bVal.split(' ')[1] || '0');
                } else if (columnIndex === 9) { // On-Time
                    aVal = parseInt(aVal) || 0;
                    bVal = parseInt(bVal) || 0;
                } else if (columnIndex === 10) { // Jobs
                    aVal = parseInt(aVal.replace(/,/g, '')) || 0;
                    bVal = parseInt(bVal.replace(/,/g, '')) || 0;
                } else {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }
                
                if (typeof aVal === 'number') {
                    return ascending ? aVal - bVal : bVal - aVal;
                } else {
                    return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                }
            });
            
            rows.forEach(row => tbody.appendChild(row));
        }

        function getCellValue(row, index) {
            const cell = row.querySelector(`td:nth-child(${index + 1})`);
            return cell ? cell.innerText.trim() : '';
        }

        // ========== DOUBLE CLICK FOR QUICK VIEW ==========
        tableRows.forEach(row => {
            row.addEventListener('dblclick', function() {
                const cleanerId = this.getAttribute('data-cleaner-id');
                const cleaner = sampleCleaners[cleanerId];
                if (cleaner) {
                    showFloatingProfile(cleaner, 'personal');
                }
            });
        });

        // ========== INITIALIZE ==========
        updateStatusCounts();

        console.log('ManageCleaner.js fully loaded - UI with floating window active');
    });
})();