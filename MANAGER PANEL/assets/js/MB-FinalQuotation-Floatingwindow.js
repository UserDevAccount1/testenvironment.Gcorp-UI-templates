// MB-FinalQuotation-Floatingwindow.js
// JavaScript for Quotation Detail Modal/Floating Window
// Contains all functionality for modal tabs and interactions

// Create namespace for floating window functions
window.mbqfFloatingWindow = (function() {
    // Private variables
    let currentQuotationId = null;
    let modalInstance = null;
    let galleryViewMode = 'grid';
    let currentSlideIndex = 0;
    let editingMediaIndex = -1;
    
    // Check if main data is available
    if (!window.mbqfSampleQuotations) {
        console.error('Main quotation data not found! Make sure MB-FinalQuotation.js is loaded first.');
        window.mbqfSampleQuotations = [];
    }
    
    // Initialize floating window functionality
    function initialize() {
        console.log('Initializing Floating Window functionality...');
        setupModalEventListeners();
        console.log('Floating Window initialized.');
    }
    
    // Setup event listeners for modal
    function setupModalEventListeners() {
        // Modal tabs
        const modalTabs = document.getElementById('mbqfModalTabs');
        if (modalTabs) {
            modalTabs.addEventListener('click', function(e) {
                if (e.target.classList.contains('mbqf-tab-btn')) {
                    // Remove active class from all tabs
                    document.querySelectorAll('#MBFinalQuotationContainer .mbqf-tab-btn').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    
                    // Add active class to clicked tab
                    e.target.classList.add('active');
                    
                    // Hide all tab content
                    document.querySelectorAll('#MBFinalQuotationContainer .mbqf-tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    // Show selected tab content
                    const tabId = e.target.getAttribute('data-tab');
                    const tabContent = document.getElementById(`mbqf${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Tab`);
                    if (tabContent) {
                        tabContent.classList.add('active');
                        
                        // Initialize specific tab features
                        if (tabId === 'gallery') {
                            initializeEnhancedGallery();
                        }
                    }
                }
            });
        }
        
        // Modal action buttons
        const generateBtn = document.getElementById('mbqfGenerateQuotationBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', generateQuotation);
        }
        
        const reviseBtn = document.getElementById('mbqfRequestRevisionBtn');
        if (reviseBtn) {
            reviseBtn.addEventListener('click', requestRevision);
        }
        
        const rejectBtn = document.getElementById('mbqfRejectBookingBtn');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', rejectBooking);
        }
        
        const saveBtn = document.getElementById('mbqfSaveChangesBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveChanges);
        }
        
        // Estimation tab controls
        const toggleDeposit = document.getElementById('mbqfToggleDeposit');
        const toggleSquareFootage = document.getElementById('mbqfToggleSquareFootage');
        const toggleHourlyRate = document.getElementById('mbqfToggleHourlyRate');
        const travelTimeInput = document.getElementById('mbqfTravelTimeInput');
        const addTravelTimeBtn = document.getElementById('mbqfAddTravelTime');
        const squareFootageInput = document.getElementById('mbqfSquareFootageInput');
        
        if (toggleDeposit) {
            toggleDeposit.addEventListener('change', function() {
                const depositSection = document.getElementById('mbqfDepositSection');
                if (depositSection) {
                    depositSection.style.display = this.checked ? 'block' : 'none';
                }
            });
        }
        
        if (toggleSquareFootage) {
            toggleSquareFootage.addEventListener('change', function() {
                const squareFootageSection = document.getElementById('mbqfSquareFootageSection');
                if (squareFootageSection) {
                    squareFootageSection.style.display = this.checked ? 'block' : 'none';
                }
            });
        }
        
        if (addTravelTimeBtn && travelTimeInput) {
            addTravelTimeBtn.addEventListener('click', function() {
                const travelTime = parseInt(travelTimeInput.value) || 0;
                const travelCost = (travelTime / 60) * 38; // $38 per hour
                showToast(`Travel time (${travelTime} minutes) added to calculation: $${travelCost.toFixed(2)}`, 'info');
            });
        }
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            const detailModal = document.getElementById('mbqfDetailModal');
            if (e.key === 'Escape' && detailModal && detailModal.classList.contains('show')) {
                closeModal();
            }
        });
    }
    
    // View quotation details
    function viewQuotation(quotationId) {
        const quotation = window.mbqfSampleQuotations.find(q => q.id === quotationId);
        if (!quotation) {
            showToast('Quotation not found!', 'danger');
            return;
        }
        
        currentQuotationId = quotationId;
        
        // Populate modal with quotation data
        populateModalData(quotation);
        
        // Open modal using Bootstrap
        const detailModal = document.getElementById('mbqfDetailModal');
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
        document.querySelectorAll('#MBFinalQuotationContainer .mbqf-tab-btn').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('#MBFinalQuotationContainer .mbqf-tab-content').forEach(content => content.classList.remove('active'));
        
        const overviewTabBtn = document.querySelector('[data-tab="overview"]');
        const overviewTab = document.getElementById('mbqfOverviewTab');
        
        if (overviewTabBtn) overviewTabBtn.classList.add('active');
        if (overviewTab) overviewTab.classList.add('active');
    }
    
    // Populate modal data
    function populateModalData(quotation) {
        const setElementValue = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value || '-';
        };
        
        const setInputValue = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.value = value || '';
        };
        
        // Client Information
        setElementValue('mbqfModalClientName', quotation.clientName);
        setElementValue('mbqfModalClientContact', quotation.contact);
        setElementValue('mbqfModalClientEmail', quotation.email);
        setElementValue('mbqfModalClientAddress', quotation.address);
        setElementValue('mbqfModalPropertyType', quotation.propertyType);
        setElementValue('mbqfModalBillingType', formatBillingType(quotation.billingType));
        setElementValue('mbqfModalServiceType', quotation.serviceType);
        setElementValue('mbqfModalRecurrence', quotation.recurrence);
        setElementValue('mbqfModalBookingDate', quotation.dateTime);
        setElementValue('mbqfModalSupervisor', quotation.supervisor);
        setElementValue('mbqfModalTravelTime', `${quotation.travelTime} minutes`);
        
        // Deposit status
        const depositStatusElement = document.getElementById('mbqfModalDepositStatus');
        if (depositStatusElement) {
            if (!quotation.depositRequired) {
                depositStatusElement.innerHTML = '<i class="fas fa-times text-muted"></i> Not Required';
            } else if (quotation.depositPaid) {
                depositStatusElement.innerHTML = `<i class="fas fa-check-circle text-success"></i> Paid ($${quotation.depositAmount})`;
            } else {
                depositStatusElement.innerHTML = `<i class="fas fa-clock text-warning"></i> Pending ($${quotation.depositAmount})`;
            }
        }
        
        // Status badge
        const statusElement = document.getElementById('mbqfModalStatus');
        if (statusElement) {
            statusElement.className = `mbqf-status-badge ${quotation.status}`;
            statusElement.textContent = quotation.status.replace('_', ' ');
        }
        
        // Task list and notes
        setInputValue('mbqfModalTaskList', quotation.taskList || '');
        setElementValue('mbqfModalSubtotal', `$${quotation.subtotal.toFixed(2)}`);
        setElementValue('mbqfModalTravelCost', `$${quotation.travelCost?.toFixed(2) || '0.00'}`);
        setElementValue('mbqfModalTax', `$${quotation.tax.toFixed(2)}`);
        setElementValue('mbqfModalUpsells', `$${quotation.upsells.toFixed(2)}`);
        setElementValue('mbqfModalDepositAmount', `$${quotation.depositAmount.toFixed(2)}`);
        setElementValue('mbqfModalFinalTotal', `$${quotation.finalTotal.toFixed(2)}`);
        setInputValue('mbqfModalSiteNotes', quotation.siteNotes || '');
        setInputValue('mbqfModalSpecialInstructions', quotation.specialInstructions || '');
        setInputValue('mbqfModalInternalNotes', quotation.internalNotes || '');
        
        // Estimation controls
        const toggleDeposit = document.getElementById('mbqfToggleDeposit');
        const toggleSquareFootage = document.getElementById('mbqfToggleSquareFootage');
        const toggleHourlyRate = document.getElementById('mbqfToggleHourlyRate');
        const travelTimeInput = document.getElementById('mbqfTravelTimeInput');
        const squareFootageInput = document.getElementById('mbqfSquareFootageInput');
        
        if (toggleDeposit) toggleDeposit.checked = quotation.depositRequired;
        if (toggleSquareFootage) toggleSquareFootage.checked = quotation.squareFootage > 0;
        if (toggleHourlyRate) toggleHourlyRate.checked = quotation.hourlyRate;
        if (travelTimeInput) travelTimeInput.value = quotation.travelTime || 0;
        if (squareFootageInput) squareFootageInput.value = quotation.squareFootage || 0;
        
        // Show/hide sections based on toggles
        const depositSection = document.getElementById('mbqfDepositSection');
        const squareFootageSection = document.getElementById('mbqfSquareFootageSection');
        if (depositSection) depositSection.style.display = quotation.depositRequired ? 'block' : 'none';
        if (squareFootageSection) squareFootageSection.style.display = quotation.squareFootage > 0 ? 'block' : 'none';
        
        // Updated estimate
        const estimateInput = document.getElementById('mbqfModalUpdatedEstimate');
        if (estimateInput) {
            const estimateRange = quotation.finalTotal * 0.85;
            estimateInput.value = `$${estimateRange.toFixed(2)} - $${quotation.finalTotal.toFixed(2)} (before tax)`;
        }
        
        // Set estimation items
        renderEstimationItems(quotation.estimationItems);
        
        // Set upselling options
        renderUpsellingOptions(quotation.upsellingOptions);
        
        // Set billing settings display
        updateBillingSettingsDisplay(quotation.billingType);
        
    }
    
    // Format billing type for display
    function formatBillingType(billingType) {
        switch(billingType) {
            case 'commercial': return 'Commercial';
            case 'residential_recurring': return 'Residential Recurring';
            case 'residential_onetime': return 'Residential One-Time';
            default: return billingType;
        }
    }
    
    // Update billing settings display based on billing type
    function updateBillingSettingsDisplay(billingType) {
        // Hide all billing cards first
        const billingCards = [
            'mbqfCommercialBillingCard',
            'mbqfResidentialRecurringCard',
            'mbqfResidentialOnetimeCard',
            'mbqfOnetimeGeneralCard'
        ];
        
        billingCards.forEach(cardId => {
            const card = document.getElementById(cardId);
            if (card) card.style.display = 'none';
        });
        
        // Show relevant billing card
        switch(billingType) {
            case 'commercial':
                document.getElementById('mbqfCommercialBillingCard').style.display = 'block';
                document.getElementById('mbqfOnetimeGeneralCard').style.display = 'block';
                break;
            case 'residential_recurring':
                document.getElementById('mbqfResidentialRecurringCard').style.display = 'block';
                break;
            case 'residential_onetime':
                document.getElementById('mbqfResidentialOnetimeCard').style.display = 'block';
                document.getElementById('mbqfOnetimeGeneralCard').style.display = 'block';
                break;
        }
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
            const modal = bootstrap.Modal.getInstance(document.getElementById('mbqfDetailModal'));
            if (modal) {
                modal.hide();
            }
        } else {
            const detailModal = document.getElementById('mbqfDetailModal');
            detailModal.style.display = 'none';
            detailModal.classList.remove('show');
        }
    }
    
    // Render estimation items in modal
    function renderEstimationItems(estimationItems) {
        const estimationTableBody = document.getElementById('mbqfEstimationTableBody');
        if (!estimationTableBody) return;
        
        estimationTableBody.innerHTML = '';
        
        if (!estimationItems || estimationItems.length === 0) {
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
    
    // Initialize enhanced gallery
    function initializeEnhancedGallery() {
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation) return;
        
        // Create gallery tabs if not exist
        const galleryTab = document.getElementById('mbqfGalleryTab');
        if (galleryTab && !galleryTab.querySelector('.gallery-tabs')) {
            galleryTab.innerHTML = `
                <div class="gallery-container">
                    <div class="gallery-header">
                        <h4><i class="fas fa-camera"></i> Site Photos & Media</h4>
                        <div class="gallery-actions">
                            <button class="add-media-btn" id="mbqfBtnAddMedia">
                                <i class="fas fa-plus"></i> Add Media
                            </button>
                            <input type="file" id="mbqfMediaUpload" accept="image/*,video/*,audio/*" multiple style="display: none;">
                        </div>
                    </div>
                    
                    <!-- Gallery Tabs -->
                    <div class="gallery-tabs">
                        <button class="gallery-tab active" data-tab="grid"><i class="fas fa-th"></i> Grid View</button>
                        <button class="gallery-tab" data-tab="table"><i class="fas fa-table"></i> Media Table</button>
                        <button class="gallery-tab" data-tab="horizontal"><i class="fas fa-sliders-h"></i> Horizontal View</button>
                    </div>
                    
                    <!-- Grid Gallery Tab -->
                    <div class="gallery-tab-content active" id="mbqfGalleryGridTab">
                        <div class="gallery-grid" id="mbqfMediaGrid">
                            <!-- Media items will be added here -->
                        </div>
                    </div>
                    
                    <!-- Media Table Tab -->
                    <div class="gallery-tab-content" id="mbqfGalleryTableTab">
                        <div class="media-table-container">
                            <h5><i class="fas fa-table"></i> Media Management Table</h5>
                            <div class="media-table-wrapper">
                                <table class="media-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Note/Caption</th>
                                            <th>Media Type</th>
                                            <th>Date Uploaded</th>
                                            <th>File Name</th>
                                            <th>File Size</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="mbqfMediaTableBody">
                                        <!-- Media rows will be loaded here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Horizontal Gallery Tab -->
                    <div class="gallery-tab-content" id="mbqfGalleryHorizontalTab">
                        <div class="horizontal-gallery-container" id="mbqfHorizontalGallery">
                            <div class="slider-nav">
                                <button class="slider-prev" id="mbqfSliderPrev">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="slider-next" id="mbqfSliderNext">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <div class="horizontal-slider" id="mbqfHorizontalSlider">
                                <!-- Horizontal slider items will be loaded here -->
                            </div>
                            <div class="slider-info">
                                <span id="mbqfCurrentSlide">1</span> / <span id="mbqfTotalSlides">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Media Preview Modal -->
                <div class="media-preview-modal" id="mbqfMediaPreviewModal">
                    <div class="media-preview-content">
                        <button class="close-preview" id="mbqfBtnClosePreview">
                            <i class="fas fa-times"></i>
                        </button>
                        <div id="mbqfPreviewContainer"></div>
                    </div>
                </div>
                
                <!-- Edit Media Modal -->
                <div class="edit-media-modal" id="mbqfEditMediaModal">
                    <div class="edit-media-content">
                        <div class="edit-media-header">
                            <h4><i class="fas fa-edit"></i> Edit Media Details</h4>
                            <button class="edit-media-close" id="mbqfBtnCloseEditModal">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <form class="edit-media-form" id="mbqfEditMediaForm">
                            <div class="edit-media-preview" id="mbqfEditMediaPreview"></div>
                            <div class="form-group">
                                <label for="mbqfEditMediaCaption">Caption/Note</label>
                                <input type="text" id="mbqfEditMediaCaption" placeholder="Enter caption or note..." required>
                            </div>
                            <div class="form-group">
                                <label for="mbqfEditMediaDate">Date</label>
                                <input type="date" id="mbqfEditMediaDate" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="submit-btn"><i class="fas fa-save"></i> Save Changes</button>
                                <button type="button" class="save-draft-btn" id="mbqfBtnCancelEdit">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            // Add event listeners for gallery
            setupGalleryEventListeners();
        }
        
        // Load all gallery views
        loadMediaGrid();
        loadMediaTable();
        loadHorizontalGallery();
    }
    
    // Setup gallery event listeners
    function setupGalleryEventListeners() {
        // Gallery tab switching
        document.querySelectorAll('#MBFinalQuotationContainer .gallery-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                switchGalleryTab(tabName);
            });
        });
        
        // Media upload
        const btnAddMedia = document.getElementById('mbqfBtnAddMedia');
        const mediaUpload = document.getElementById('mbqfMediaUpload');
        
        if (btnAddMedia) {
            btnAddMedia.addEventListener('click', function() {
                mediaUpload.click();
            });
        }
        
        if (mediaUpload) {
            mediaUpload.addEventListener('change', handleMediaUpload);
        }
        
        // Slider navigation
        const sliderPrev = document.getElementById('mbqfSliderPrev');
        const sliderNext = document.getElementById('mbqfSliderNext');
        
        if (sliderPrev) {
            sliderPrev.addEventListener('click', function() {
                navigateSlider(-1);
            });
        }
        
        if (sliderNext) {
            sliderNext.addEventListener('click', function() {
                navigateSlider(1);
            });
        }
        
        // Preview modal
        const btnClosePreview = document.getElementById('mbqfBtnClosePreview');
        if (btnClosePreview) {
            btnClosePreview.addEventListener('click', closePreviewModal);
        }
        
        // Edit modal
        const btnCloseEditModal = document.getElementById('mbqfBtnCloseEditModal');
        const btnCancelEdit = document.getElementById('mbqfBtnCancelEdit');
        const editMediaForm = document.getElementById('mbqfEditMediaForm');
        
        if (btnCloseEditModal) {
            btnCloseEditModal.addEventListener('click', closeEditModal);
        }
        
        if (btnCancelEdit) {
            btnCancelEdit.addEventListener('click', closeEditModal);
        }
        
        if (editMediaForm) {
            editMediaForm.addEventListener('submit', saveEditedMedia);
        }
        
        // Close modals on click outside
        const previewModal = document.getElementById('mbqfMediaPreviewModal');
        const editModal = document.getElementById('mbqfEditMediaModal');
        
        if (previewModal) {
            previewModal.addEventListener('click', function(e) {
                if (e.target === previewModal) {
                    closePreviewModal();
                }
            });
        }
        
        if (editModal) {
            editModal.addEventListener('click', function(e) {
                if (e.target === editModal) {
                    closeEditModal();
                }
            });
        }
    }
    
    // Switch gallery tab
    function switchGalleryTab(tabName) {
        // Update active tab
        document.querySelectorAll('#MBFinalQuotationContainer .gallery-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('#MBFinalQuotationContainer .gallery-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`#MBFinalQuotationContainer .gallery-tab[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`mbqfGallery${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Tab`);
        
        if (activeTab) activeTab.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }
    
    // Load media grid view
    function loadMediaGrid() {
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation) return;
        
        const mediaGrid = document.getElementById('mbqfMediaGrid');
        if (!mediaGrid) return;
        
        mediaGrid.innerHTML = '';
        
        if (!quotation.mediaGallery || quotation.mediaGallery.length === 0) {
            mediaGrid.innerHTML = `
                <div class="no-media">
                    <i class="fas fa-images fa-3x"></i>
                    <p>No photos, videos or audio files added yet</p>
                    <button class="btn-add-first" id="mbqfBtnAddFirstMedia">
                        <i class="fas fa-plus"></i> Add First Media
                    </button>
                </div>
            `;
            
            // Reattach event listener
            const btnAddFirstMedia = document.getElementById('mbqfBtnAddFirstMedia');
            if (btnAddFirstMedia) {
                btnAddFirstMedia.addEventListener('click', function() {
                    document.getElementById('mbqfMediaUpload').click();
                });
            }
            
            return;
        }
        
        // Render grid items
        quotation.mediaGallery.forEach((media, index) => {
            const mediaItem = createMediaGridItem(media, index);
            mediaGrid.appendChild(mediaItem);
        });
    }
    
    // Create media grid item
    function createMediaGridItem(media, index) {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        mediaItem.dataset.index = index;
        
        if (media.type === 'image') {
            mediaItem.innerHTML = `
                <img src="${media.url}" alt="${media.caption}" loading="lazy">
                <div class="media-overlay">
                    <div class="media-info">
                        <div class="media-caption">${media.caption}</div>
                        <div class="media-details">
                            <small><i class="fas fa-calendar"></i> ${media.date}</small>
                            <small><i class="fas fa-file"></i> ${media.fileName}</small>
                            ${media.fileSize ? `<small><i class="fas fa-hdd"></i> ${formatFileSize(media.fileSize)}</small>` : ''}
                        </div>
                    </div>
                </div>
            `;
        } else if (media.type === 'video') {
            mediaItem.innerHTML = `
                <video>
                    <source src="${media.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-play-icon">
                    <i class="fas fa-play"></i>
                </div>
                <div class="media-overlay">
                    <div class="media-info">
                        <div class="media-caption">${media.caption}</div>
                        <div class="media-details">
                            <small><i class="fas fa-calendar"></i> ${media.date}</small>
                            <small><i class="fas fa-file"></i> ${media.fileName}</small>
                            ${media.fileSize ? `<small><i class="fas fa-hdd"></i> ${formatFileSize(media.fileSize)}</small>` : ''}
                        </div>
                    </div>
                </div>
            `;
        } else if (media.type === 'audio') {
            mediaItem.className = 'media-item audio-item';
            mediaItem.innerHTML = `
                <div class="audio-icon">
                    <i class="fas fa-music"></i>
                </div>
                <div class="media-overlay">
                    <div class="media-info">
                        <div class="media-caption">${media.caption}</div>
                        <div class="media-details">
                            <small><i class="fas fa-calendar"></i> ${media.date}</small>
                            <small><i class="fas fa-file"></i> ${media.fileName}</small>
                            ${media.fileSize ? `<small><i class="fas fa-hdd"></i> ${formatFileSize(media.fileSize)}</small>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Add click event for preview
        mediaItem.addEventListener('click', function(e) {
            e.preventDefault();
            openMediaPreview(media, index);
        });
        
        return mediaItem;
    }
    
    // Load media table view
    function loadMediaTable() {
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation) return;
        
        const tableBody = document.getElementById('mbqfMediaTableBody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        if (!quotation.mediaGallery || quotation.mediaGallery.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4">
                        <div class="text-muted">
                            <i class="fas fa-images fa-2x mb-2"></i>
                            <p>No media files available</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        quotation.mediaGallery.forEach((media, index) => {
            const row = createMediaTableRow(media, index);
            tableBody.appendChild(row);
        });
    }
    
    // Create media table row
    function createMediaTableRow(media, index) {
        const row = document.createElement('tr');
        
        // Get icon for media type
        let typeIcon = 'fas fa-file';
        let typeClass = '';
        if (media.type === 'image') {
            typeIcon = 'fas fa-image';
            typeClass = 'image';
        } else if (media.type === 'video') {
            typeIcon = 'fas fa-video';
            typeClass = 'video';
        } else if (media.type === 'audio') {
            typeIcon = 'fas fa-music';
            typeClass = 'audio';
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${media.caption || 'No caption'}</td>
            <td>
                <span class="media-type-badge ${typeClass}">
                    <i class="${typeIcon}"></i> ${media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                </span>
            </td>
            <td>${media.date}</td>
            <td>${media.fileName}</td>
            <td>${media.fileSize ? formatFileSize(media.fileSize) : 'N/A'}</td>
            <td>
                <div class="media-table-actions">
                    <button class="media-table-action-btn view" data-index="${index}" title="Preview">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="media-table-action-btn edit" data-index="${index}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="media-table-action-btn delete" data-index="${index}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        // Add event listeners for action buttons
        const viewBtn = row.querySelector('.view');
        const editBtn = row.querySelector('.edit');
        const deleteBtn = row.querySelector('.delete');
        
        viewBtn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            const mediaItem = quotation.mediaGallery[idx];
            if (mediaItem) {
                openMediaPreview(mediaItem, idx);
            }
        });
        
        editBtn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            openEditModal(idx);
        });
        
        deleteBtn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            deleteMedia(idx);
        });
        
        return row;
    }
    
    // Load horizontal gallery
    function loadHorizontalGallery() {
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation) return;
        
        const horizontalSlider = document.getElementById('mbqfHorizontalSlider');
        if (!horizontalSlider) return;
        
        horizontalSlider.innerHTML = '';
        
        if (!quotation.mediaGallery || quotation.mediaGallery.length === 0) {
            document.getElementById('mbqfTotalSlides').textContent = '0';
            document.getElementById('mbqfCurrentSlide').textContent = '0';
            currentSlideIndex = 0;
            return;
        }
        
        // Create slider items
        quotation.mediaGallery.forEach((media, index) => {
            const sliderItem = createHorizontalSliderItem(media, index);
            horizontalSlider.appendChild(sliderItem);
        });
        
        // Update slide counts
        document.getElementById('mbqfTotalSlides').textContent = quotation.mediaGallery.length;
        document.getElementById('mbqfCurrentSlide').textContent = '1';
        currentSlideIndex = 0;
        updateSliderPosition();
    }
    
    // Create horizontal slider item
    function createHorizontalSliderItem(media, index) {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';
        sliderItem.dataset.index = index;
        
        if (media.type === 'image') {
            sliderItem.innerHTML = `
                <img src="${media.url}" alt="${media.caption}" loading="lazy">
                <div class="slider-caption">${media.caption}</div>
            `;
        } else if (media.type === 'video') {
            sliderItem.innerHTML = `
                <video>
                    <source src="${media.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-play-icon">
                    <i class="fas fa-play"></i>
                </div>
                <div class="slider-caption">${media.caption}</div>
            `;
        } else if (media.type === 'audio') {
            sliderItem.innerHTML = `
                <div class="audio-slider">
                    <div class="audio-icon-large">
                        <i class="fas fa-music fa-4x"></i>
                    </div>
                    <div class="audio-info">
                        <h5>${media.caption}</h5>
                        <p>${media.fileName}</p>
                        <audio>
                            <source src="${media.url}" type="audio/mp3">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            `;
        }
        
        // Add click event for preview
        sliderItem.addEventListener('click', function(e) {
            if (!e.target.closest('audio, video')) {
                openMediaPreview(media, index);
            }
        });
        
        return sliderItem;
    }
    
    // Open media preview
    function openMediaPreview(media, index) {
        const previewModal = document.getElementById('mbqfMediaPreviewModal');
        const previewContainer = document.getElementById('mbqfPreviewContainer');
        
        if (!previewModal || !previewContainer) return;
        
        previewContainer.innerHTML = '';
        
        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = media.caption;
            previewContainer.appendChild(img);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.innerHTML = `<source src="${media.url}" type="video/mp4">`;
            previewContainer.appendChild(video);
        } else if (media.type === 'audio') {
            const audioContainer = document.createElement('div');
            audioContainer.className = 'preview-audio';
            audioContainer.innerHTML = `
                <div class="audio-icon-large">
                    <i class="fas fa-music fa-5x"></i>
                </div>
                <div class="audio-details">
                    <h4>${media.caption}</h4>
                    <p>${media.fileName}</p>
                    <p><small>Uploaded: ${media.date}</small></p>
                </div>
                <audio controls autoplay>
                    <source src="${media.url}" type="audio/mp3">
                </audio>
            `;
            previewContainer.appendChild(audioContainer);
        }
        
        previewModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close preview modal
    function closePreviewModal() {
        const previewModal = document.getElementById('mbqfMediaPreviewModal');
        if (previewModal) {
            previewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Open edit modal
    function openEditModal(index) {
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation || !quotation.mediaGallery || !quotation.mediaGallery[index]) return;
        
        editingMediaIndex = index;
        const media = quotation.mediaGallery[index];
        
        const editModal = document.getElementById('mbqfEditMediaModal');
        const previewContainer = document.getElementById('mbqfEditMediaPreview');
        const captionInput = document.getElementById('mbqfEditMediaCaption');
        const dateInput = document.getElementById('mbqfEditMediaDate');
        
        if (!editModal || !previewContainer || !captionInput || !dateInput) return;
        
        // Set preview
        previewContainer.innerHTML = '';
        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = media.caption;
            previewContainer.appendChild(img);
        } else if (media.type === 'video') {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'text-center';
            videoContainer.innerHTML = `
                <i class="fas fa-video fa-4x" style="color: #8a2be2;"></i>
                <p class="mt-2">Video File</p>
            `;
            previewContainer.appendChild(videoContainer);
        } else if (media.type === 'audio') {
            const audioContainer = document.createElement('div');
            audioContainer.className = 'text-center';
            audioContainer.innerHTML = `
                <i class="fas fa-music fa-4x" style="color: #10b981;"></i>
                <p class="mt-2">Audio File</p>
            `;
            previewContainer.appendChild(audioContainer);
        }
        
        // Set form values
        captionInput.value = media.caption || '';
        dateInput.value = media.date || new Date().toISOString().split('T')[0];
        
        editModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close edit modal
    function closeEditModal() {
        const editModal = document.getElementById('mbqfEditMediaModal');
        if (editModal) {
            editModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            editingMediaIndex = -1;
        }
    }
    
    // Save edited media
    function saveEditedMedia(e) {
        e.preventDefault();
        
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation || editingMediaIndex === -1 || !quotation.mediaGallery[editingMediaIndex]) return;
        
        const captionInput = document.getElementById('mbqfEditMediaCaption');
        const dateInput = document.getElementById('mbqfEditMediaDate');
        
        if (!captionInput || !dateInput) return;
        
        // Update media data
        const media = quotation.mediaGallery[editingMediaIndex];
        media.caption = captionInput.value.trim();
        media.date = dateInput.value;
        
        // Update all views
        loadMediaGrid();
        loadMediaTable();
        loadHorizontalGallery();
        
        closeEditModal();
        showToast('Media details updated successfully!', 'success');
    }
    
    // Delete media
    function deleteMedia(index) {
        if (!confirm('Are you sure you want to delete this media item? This action cannot be undone.')) {
            return;
        }
        
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation || !quotation.mediaGallery || !quotation.mediaGallery[index]) return;
        
        quotation.mediaGallery.splice(index, 1);
        
        // Update all views
        loadMediaGrid();
        loadMediaTable();
        loadHorizontalGallery();
        
        showToast('Media item deleted successfully!', 'success');
    }
    
    // Navigate slider
    function navigateSlider(direction) {
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation || !quotation.mediaGallery || quotation.mediaGallery.length === 0) return;
        
        const totalSlides = quotation.mediaGallery.length;
        currentSlideIndex += direction;
        
        if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        } else if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
        }
        
        document.getElementById('mbqfCurrentSlide').textContent = currentSlideIndex + 1;
        updateSliderPosition();
    }
    
    // Update slider position
    function updateSliderPosition() {
        const horizontalSlider = document.getElementById('mbqfHorizontalSlider');
        if (!horizontalSlider) return;
        
        const sliderItems = horizontalSlider.querySelectorAll('.slider-item');
        if (sliderItems.length === 0) return;
        
        const sliderWidth = sliderItems[0].offsetWidth + 10; // 300px + 10px gap
        horizontalSlider.style.transform = `translateX(-${currentSlideIndex * sliderWidth}px)`;
    }
    
    // Handle media upload
    function handleMediaUpload(event) {
        const files = event.target.files;
        if (!files.length) return;
        
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation) return;
        
        // Create media gallery if it doesn't exist
        if (!quotation.mediaGallery) {
            quotation.mediaGallery = [];
        }
        
        // Process each file
        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Determine file type
                let fileType = 'file';
                if (file.type.startsWith('image/')) {
                    fileType = 'image';
                } else if (file.type.startsWith('video/')) {
                    fileType = 'video';
                } else if (file.type.startsWith('audio/')) {
                    fileType = 'audio';
                }
                
                const newMedia = {
                    id: quotation.mediaGallery.length + index + 1,
                    url: e.target.result,
                    type: fileType,
                    caption: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
                    date: new Date().toISOString().split('T')[0],
                    fileName: file.name,
                    fileSize: file.size
                };
                
                quotation.mediaGallery.push(newMedia);
                
                // If this is the last file, update views
                if (index === files.length - 1) {
                    loadMediaGrid();
                    loadMediaTable();
                    loadHorizontalGallery();
                    showToast(`${files.length} media file(s) added successfully!`, 'success');
                }
            };
            reader.readAsDataURL(file);
        });
        
        // Reset file input
        event.target.value = '';
    }
    
    // Format file size for display
    function formatFileSize(bytes) {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Render upselling options
    function renderUpsellingOptions(upsellingOptions) {
        const upsellingContainer = document.getElementById('mbqfUpsellingOptions');
        if (!upsellingContainer) return;
        
        upsellingContainer.innerHTML = '';
        
        if (!upsellingOptions || upsellingOptions.length === 0) {
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
                <input type="checkbox" id="mbqfUpsell_${option.id}" data-price="${option.price}" ${option.selected ? 'checked' : ''}>
                <div class="mbqf-upselling-content">
                    <div class="mbqf-upselling-title">${option.name}</div>
                    <div class="mbqf-upselling-description">${option.description}</div>
                </div>
                <div class="mbqf-upselling-price">+$${option.price.toFixed(2)}</div>
            `;
            
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
        
        updateUpsellsTotal(totalUpsells);
    }
    
    // Add custom upsell
    function addCustomUpsell() {
        const nameInput = document.getElementById('mbqfCustomUpsellName');
        const descInput = document.getElementById('mbqfCustomUpsellDescription');
        const priceInput = document.getElementById('mbqfCustomUpsellPrice');
        
        const name = nameInput.value.trim();
        const description = descInput.value.trim();
        const price = parseFloat(priceInput.value);
        
        if (!name || !price || isNaN(price)) {
            showToast('Please enter valid name and price for the upsell product.', 'warning');
            return;
        }
        
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation) return;
        
        const newUpsell = {
            id: `custom_${Date.now()}`,
            name: name,
            description: description || 'Custom upsell product',
            price: price,
            selected: false
        };
        
        if (!quotation.upsellingOptions) {
            quotation.upsellingOptions = [];
        }
        
        quotation.upsellingOptions.push(newUpsell);
        renderUpsellingOptions(quotation.upsellingOptions);
        
        // Clear inputs
        nameInput.value = '';
        descInput.value = '';
        priceInput.value = '';
        
        showToast('Custom upsell product added successfully!', 'success');
    }
    
    // Update upsells total
    function updateUpsellsTotal(initialTotal = null) {
        const checkboxes = document.querySelectorAll('#mbqfUpsellingOptions input[type="checkbox"]');
        let total = initialTotal || 0;
        
        if (!initialTotal) {
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    total += parseFloat(checkbox.getAttribute('data-price'));
                }
            });
        }
        
        const totalElement = document.getElementById('mbqfSelectedUpsellsTotal');
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
        
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (quotation) {
            quotation.upsells = total;
            const finalTotal = quotation.subtotal + (quotation.travelCost || 0) + quotation.tax + total;
            quotation.finalTotal = finalTotal;
            
            const upsellsElement = document.getElementById('mbqfModalUpsells');
            const finalTotalElement = document.getElementById('mbqfModalFinalTotal');
            
            if (upsellsElement) upsellsElement.textContent = `$${total.toFixed(2)}`;
            if (finalTotalElement) finalTotalElement.textContent = `$${finalTotal.toFixed(2)}`;
        }
    }
    
    // Generate quotation action
    function generateQuotation() {
        if (!currentQuotationId) return;
        
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (!quotation) return;
        
        if (confirm(`Generate official quotation for $${quotation.finalTotal.toFixed(2)}?\n\nThis will:\n• Send quotation to accounting\n• Update status to "quotation_sent"\n• Notify client`)) {
            quotation.status = 'quotation_sent';
            // Update table (if table management JS is loaded)
            if (typeof window.mbqfRenderTableRows === 'function') {
                window.mbqfRenderTableRows();
            }
            if (typeof window.mbqfUpdateStats === 'function') {
                window.mbqfUpdateStats();
            }
            closeModal();
            showToast(`✅ Quotation ${quotation.id} generated successfully! Sent to accounting and client notified.`, 'success');
        }
    }
    
    // Request revision action
    function requestRevision() {
        if (!currentQuotationId) return;
        
        const revisionReason = prompt("Please provide revision notes for the supervisor:", "Please review and update the pricing as discussed.");
        if (revisionReason && revisionReason.trim() !== '') {
            const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
            if (quotation) {
                quotation.status = 'revision_requested';
                // Update table (if table management JS is loaded)
                if (typeof window.mbqfRenderTableRows === 'function') {
                    window.mbqfRenderTableRows();
                }
                if (typeof window.mbqfUpdateStats === 'function') {
                    window.mbqfUpdateStats();
                }
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
                const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
                if (quotation) {
                    quotation.status = 'rejected';
                    // Update table (if table management JS is loaded)
                    if (typeof window.mbqfRenderTableRows === 'function') {
                        window.mbqfRenderTableRows();
                    }
                    if (typeof window.mbqfUpdateStats === 'function') {
                        window.mbqfUpdateStats();
                    }
                    closeModal();
                    showToast(`❌ Booking ${quotation.id} rejected. Client notified of cancellation.`, 'danger');
                }
            }
        }
    }
    
    // Save changes action
    function saveChanges() {
        if (!currentQuotationId) return;
        
        const quotation = window.mbqfSampleQuotations.find(q => q.id === currentQuotationId);
        if (quotation) {
            // Update basic info
            const taskListElement = document.getElementById('mbqfModalTaskList');
            const siteNotesElement = document.getElementById('mbqfModalSiteNotes');
            const specialInstructionsElement = document.getElementById('mbqfModalSpecialInstructions');
            const internalNotesElement = document.getElementById('mbqfModalInternalNotes');
            const travelTimeInput = document.getElementById('mbqfTravelTimeInput');
            const squareFootageInput = document.getElementById('mbqfSquareFootageInput');
            const toggleDeposit = document.getElementById('mbqfToggleDeposit');
            const toggleSquareFootage = document.getElementById('mbqfToggleSquareFootage');
            const toggleHourlyRate = document.getElementById('mbqfToggleHourlyRate');
            
            if (taskListElement) quotation.taskList = taskListElement.value;
            if (siteNotesElement) quotation.siteNotes = siteNotesElement.value;
            if (specialInstructionsElement) quotation.specialInstructions = specialInstructionsElement.value;
            if (internalNotesElement) quotation.internalNotes = internalNotesElement.value;
            if (travelTimeInput) quotation.travelTime = parseInt(travelTimeInput.value) || 0;
            if (squareFootageInput) quotation.squareFootage = parseInt(squareFootageInput.value) || 0;
            if (toggleDeposit) quotation.depositRequired = toggleDeposit.checked;
            if (toggleSquareFootage) {
                if (!toggleSquareFootage.checked) quotation.squareFootage = 0;
            }
            if (toggleHourlyRate) quotation.hourlyRate = toggleHourlyRate.checked;
            
            // Update travel cost
            quotation.travelCost = (quotation.travelTime / 60) * 38;
            
            // Recalculate totals
            const squareFootageCost = quotation.squareFootage * 0.50;
            quotation.subtotal = squareFootageCost + (quotation.travelCost || 0);
            quotation.tax = quotation.subtotal * 0.05;
            quotation.finalTotal = quotation.subtotal + quotation.tax + (quotation.upsells || 0);
            
            // Update estimated price display
            quotation.estimatedPrice = `$${quotation.finalTotal.toFixed(2)}`;
            
            // Update table (if table management JS is loaded)
            if (typeof window.mbqfRenderTableRows === 'function') {
                window.mbqfRenderTableRows();
            }
            showToast(`✅ Changes saved successfully for ${quotation.id}!`, 'success');
        }
    }
    
    // Show toast message
    function showToast(message, type = 'success') {
        // Use shared toast function if available, otherwise create own
        if (typeof window.mbqfShowToast === 'function') {
            window.mbqfShowToast(message, type);
        } else {
            // Fallback toast
            console.log(`Toast: ${message} (${type})`);
            alert(message);
        }
    }
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', initialize);
    
    // Return public methods
    return {
        viewQuotation: viewQuotation,
        editQuotation: editQuotation,
        closeModal: closeModal,
        initialize: initialize
    };
})();

// Add video play icon styles dynamically
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('mbqfVideoIconStyles')) {
        const style = document.createElement('style');
        style.id = 'mbqfVideoIconStyles';
        style.textContent = `
            .video-play-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                z-index: 2;
                opacity: 0.8;
                transition: all 0.3s ease;
            }
            
            .media-item:hover .video-play-icon,
            .slider-item:hover .video-play-icon {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }
            
            .audio-slider {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 20px;
                color: white;
                background: linear-gradient(135deg, #667eea, #764ba2);
            }
            
            .audio-slider .audio-icon-large {
                margin-bottom: 15px;
            }
            
            .audio-slider .audio-info {
                text-align: center;
            }
            
            .audio-slider .audio-info h5 {
                margin: 0 0 5px 0;
                font-size: 16px;
            }
            
            .audio-slider .audio-info p {
                margin: 0 0 10px 0;
                font-size: 12px;
                opacity: 0.8;
            }
            
            .audio-slider audio {
                width: 100%;
                max-width: 250px;
            }
            
            .slider-caption {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 8px;
                text-align: center;
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);
    }
});

console.log('MB-FinalQuotation-Floatingwindow.js loaded successfully');