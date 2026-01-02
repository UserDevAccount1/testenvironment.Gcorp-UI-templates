// -----------------------------
// Sample data + estimation fields
// -----------------------------
let bookingsData = [
  {
    bookingId: "BK-2025-00014",
    clientName: "James Wilson",
    contact: "+1 (416) 555-1234",
    address: "25 Queen Street West, Toronto, ON",
    serviceType: "Steam Clean + Maintenance",
    visitDate: "2025-01-25",
    visitTime: "10:00 AM",
    status: "scheduled",
    priority: "high",
    submittedDate: "2025-01-21",
    assignedTo: "John Supervisor",
    notes: "Client prefers morning visits",
    siteVisitReport: {
      reportDate: "",
      reportTime: "",
      siteCondition: "",
      visitNotes: "",
      recommendations: "",
      extraServices: [],
      draft: false
    },
    mediaGallery: [],
    
    // Estimation data
    estimation: {
      currencyBase: "USD",
      original: {
        steamTotal: 922.95,
        maintenanceTotal: 480.0,
        steamInvoice: `CLEANING ESTIMATE INVOICE
--------------------------------
ITEMS SELECTED:
Carpets ×2 .... $150
Rug ×1 .... $30
Couch ×1 .... $100
Love Seat ×1 .... $75
Stair Flights (3) .... $15

DISCOUNTS:
None

--------------------------------
Subtotal: $370.00
Tax (5%): $18.50
TOTAL DUE: $388.50
Minimum Charge Applied: $922.95`,
        maintenanceInvoice: `ENHANCED CLEANING ESTIMATE
========================================
Maintenance Clean (residential, 3.00 hrs @ $38/hr) .... $114.00
Kitchen (Large) .... $45.00
Bedroom .... $15.00
Bathroom .... $25.00
Entryway .... $10.00
Travel Time Fee (residential) — 45 mins @ $38/hr ... $28.50

========================================
Subtotal: $237.50
Tax (5%): $11.88
--------------------------------
TOTAL DUE (USD): $249.38
========================================`
      },
      adjusted: {
        steamTotal: 1015.25,
        maintenanceTotal: 520.0,
        steamInvoice: `CLEANING ESTIMATE INVOICE (ADJUSTED)
--------------------------------
ITEMS SELECTED:
Carpets ×2 .... $150
Rug ×1 .... $30
Couch ×1 .... $100
Love Seat ×1 .... $75
Stair Flights (3) .... $15
Pet stain treatment .... $92.30
Extra hallway .... $35.00

DISCOUNTS:
None

--------------------------------
Subtotal: $497.30
Tax (5%): $24.87
TOTAL DUE: $522.17
Minimum Charge Applied: $1015.25`,
        maintenanceInvoice: `ENHANCED CLEANING ESTIMATE (ADJUSTED)
========================================
Maintenance Clean (residential, 3.00 hrs @ $38/hr) .... $114.00
Kitchen (Large) .... $45.00
Bedroom .... $15.00
Bathroom .... $25.00
Entryway .... $10.00
Travel Time Fee (commercial) — 45 mins @ $44/hr ... $33.00
Extra cleaning required (site visit) .... $70.00

========================================
Subtotal: $312.00
Tax (5%): $15.60
--------------------------------
TOTAL DUE (USD): $327.60
========================================`
      }
    }
  },
  {
    bookingId: "BK-2025-00015",
    clientName: "Sarah Martinez",
    contact: "+1 (416) 555-5678",
    address: "142 Bay Street, Toronto, ON",
    serviceType: "Deep Clean",
    visitDate: "2025-01-26",
    visitTime: "2:00 PM",
    status: "pending",
    priority: "medium",
    submittedDate: "2025-01-22",
    assignedTo: "Mike Supervisor",
    notes: "Large commercial space",
    siteVisitReport: {
      reportDate: "",
      reportTime: "",
      siteCondition: "",
      visitNotes: "",
      recommendations: "",
      extraServices: [],
      draft: false
    },
    mediaGallery: [],
    estimation: {
      currencyBase: "USD",
      original: {
        steamTotal: 0,
        maintenanceTotal: 650.0,
        steamInvoice: "Select services to see estimate",
        maintenanceInvoice: `DEEP CLEAN ESTIMATE
========================================
Deep Clean (medium) — 10.00 hrs @ $50/hr .... $500.00
Additional sanitization .... $50.00
Travel Time Fee (commercial) — 30 mins @ $44/hr ... $22.00

========================================
Subtotal: $572.00
Tax (5%): $28.60
--------------------------------
TOTAL DUE (USD): $600.60
========================================`
      },
      adjusted: {
        steamTotal: 0,
        maintenanceTotal: 720.0,
        steamInvoice: "Select services to see estimate",
        maintenanceInvoice: `DEEP CLEAN ESTIMATE (ADJUSTED)
========================================
Deep Clean (medium) — 10.00 hrs @ $50/hr .... $500.00
Additional sanitization .... $50.00
Travel Time Fee (commercial) — 30 mins @ $44/hr ... $22.00
Extra hours (site visit) .... $70.00
Odor removal treatment .... $78.00

========================================
Subtotal: $720.00
Tax (5%): $36.00
--------------------------------
TOTAL DUE (USD): $756.00
========================================`
      }
    }
  }
];

// -----------------------------
// State variables
// -----------------------------
let currentPage = 1;
let itemsPerPage = 10;
let filteredData = [...bookingsData];
let sortColumn = "";
let sortDirection = "asc";
let selectedBooking = null;
let currentDetailTab = "details";

// Estimation modal state
let estCurrency = "USD";
let currentEstimationTab = "orig";
let galleryViewer = null;

// Horizontal gallery state
let horizontalSlider = null;
let isHorizontalView = false;
let shareableLinks = JSON.parse(localStorage.getItem('shareableLinks') || '{}');

// -----------------------------
// Initialize
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  wireUI();
  updateStats();
  renderTable();
  renderPagination();
  
  // Initialize media gallery viewer
  if (typeof Viewer !== 'undefined') {
    galleryViewer = new Viewer(document.getElementById('mediaGrid'), {
      inline: false,
      toolbar: {
        zoomIn: true,
        zoomOut: true,
        oneToOne: true,
        reset: true,
        prev: true,
        play: true,
        next: true,
        rotateLeft: true,
        rotateRight: true,
        flipHorizontal: true,
        flipVertical: true,
      },
    });
  }
});

// -----------------------------
// Wire up UI events
// -----------------------------
function wireUI() {
  // Filter buttons
  document.getElementById("btnApplyFilters").addEventListener("click", applyFilters);
  document.getElementById("btnResetFilters").addEventListener("click", resetFilters);
  document.getElementById("btnRefresh").addEventListener("click", refreshTable);
  document.getElementById("btnExport").addEventListener("click", exportData);
  
  // Estimation search
  document.getElementById("btnSearchEstimations").addEventListener("click", searchEstimations);
  document.getElementById("estimationSearch").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') searchEstimations();
  });
  
  // Sort handlers
  document.querySelectorAll("th.sortable[data-sort]").forEach(th => {
    th.addEventListener("click", () => sortTable(th.getAttribute("data-sort")));
  });
  
  // Close modals
  document.getElementById("btnCloseDetailModal").addEventListener("click", closeDetailModal);
  document.getElementById("btnCloseEstimationModal").addEventListener("click", closeEstimationModal);
  
  // Click backdrop to close
  document.getElementById("detailModal").addEventListener("click", (e) => {
    if (e.target.id === "detailModal") closeDetailModal();
  });
  document.getElementById("estimationModal").addEventListener("click", (e) => {
    if (e.target.id === "estimationModal") closeEstimationModal();
  });
  
  // Detail tabs
  document.querySelectorAll(".detail-tab").forEach(btn => {
    btn.addEventListener("click", () => switchDetailTab(btn.getAttribute("data-tab")));
  });
  
  // Site visit report form
  const siteVisitReportForm = document.getElementById("siteVisitReportForm");
  if (siteVisitReportForm) {
    siteVisitReportForm.addEventListener("submit", saveSiteVisitReport);
  }
  
  const saveDraftBtn = document.querySelector(".save-draft-btn");
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", saveReportAsDraft);
  }
  
  // Gallery actions
  const btnAddMedia = document.getElementById("btnAddMedia");
  if (btnAddMedia) {
    btnAddMedia.addEventListener("click", () => document.getElementById("mediaUpload").click());
  }
  
  const btnAddFirstMedia = document.getElementById("btnAddFirstMedia");
  if (btnAddFirstMedia) {
    btnAddFirstMedia.addEventListener("click", () => document.getElementById("mediaUpload").click());
  }
  
  const mediaUpload = document.getElementById("mediaUpload");
  if (mediaUpload) {
    mediaUpload.addEventListener("change", handleMediaUpload);
  }
  
  // Estimation tabs
  document.querySelectorAll(".sitevisit-estimation-tab-unique-9284").forEach(btn => {
    btn.addEventListener("click", () => setEstimationTab(btn.getAttribute("data-tab")));
  });
  
  // Currency toggle
  document.getElementById("currencyUSD").addEventListener("click", () => setCurrency("USD"));
  document.getElementById("currencyCAD").addEventListener("click", () => setCurrency("CAD"));
  
  // Rates
  document.getElementById("usdToCadRate").addEventListener("input", () => {
    const usdToCad = parseFloat(document.getElementById("usdToCadRate").value) || 1;
    document.getElementById("cadToUsdRate").value = (1 / usdToCad).toFixed(2);
    refreshEstimationModalIfOpen();
  });
  
  document.getElementById("cadToUsdRate").addEventListener("input", () => {
    const cadToUsd = parseFloat(document.getElementById("cadToUsdRate").value) || 1;
    document.getElementById("usdToCadRate").value = (1 / cadToUsd).toFixed(2);
    refreshEstimationModalIfOpen();
  });
  
  // Estimation edit actions
  document.getElementById("btnSaveDraft").addEventListener("click", saveEstimationDraft);
  document.getElementById("btnUpdateEstimation").addEventListener("click", updateEstimation);
  
  // Estimation search within modal
  const searchEstBtn = document.querySelector(".search-est-btn");
  if (searchEstBtn) {
    searchEstBtn.addEventListener("click", searchWithinEstimation);
  }
  
  const editSearch = document.getElementById("editSearch");
  if (editSearch) {
    editSearch.addEventListener("keypress", (e) => {
      if (e.key === 'Enter') searchWithinEstimation();
    });
  }
  
  // Gallery view toggle
  const btnToggleView = document.getElementById('btnToggleView');
  if (btnToggleView) {
    btnToggleView.addEventListener('click', toggleGalleryView);
  }
  
  // Share link functionality
  const btnGenerateLink = document.getElementById('btnGenerateLink');
  if (btnGenerateLink) {
    btnGenerateLink.addEventListener('click', generateShareableLink);
  }
  
  const btnCopyLink = document.getElementById('btnCopyLink');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', copyShareLink);
  }
  
  const btnDeactivateLink = document.getElementById('btnDeactivateLink');
  if (btnDeactivateLink) {
    btnDeactivateLink.addEventListener('click', deactivateShareLink);
  }
  
  // Modal footer buttons
  const btnEditFromModal = document.getElementById('btnEditFromModal');
  if (btnEditFromModal) {
    btnEditFromModal.addEventListener('click', () => {
      if (selectedBooking) {
        editBooking(selectedBooking.bookingId);
      }
    });
  }
  
  const btnViewReportFromModal = document.getElementById('btnViewReportFromModal');
  if (btnViewReportFromModal) {
    btnViewReportFromModal.addEventListener('click', () => {
      switchDetailTab('report');
    });
  }
  
  const btnDownloadReport = document.getElementById('btnDownloadReport');
  if (btnDownloadReport) {
    btnDownloadReport.addEventListener('click', () => {
      downloadReportAsPDF();
    });
  }
  
  // Check for share link on page load
  setTimeout(() => {
    checkForShareLink();
  }, 100);
}

// -----------------------------
// Search functionality
// -----------------------------
function searchEstimations() {
  const searchTerm = document.getElementById("estimationSearch").value.toLowerCase();
  const searchType = document.getElementById("searchType").value;
  
  filteredData = bookingsData.filter(booking => {
    // Always include if no search term
    if (!searchTerm) return true;
    
    // Search in relevant fields
    const inClient = booking.clientName.toLowerCase().includes(searchTerm);
    const inBookingId = booking.bookingId.toLowerCase().includes(searchTerm);
    const inService = booking.serviceType.toLowerCase().includes(searchTerm);
    const inAddress = booking.address.toLowerCase().includes(searchTerm);
    
    // Check service type filter
    let typeMatch = true;
    if (searchType !== "all") {
      typeMatch = booking.serviceType.toLowerCase().includes(searchType);
    }
    
    return (inClient || inBookingId || inService || inAddress) && typeMatch;
  });
  
  currentPage = 1;
  renderTable();
  renderPagination();
  
  // Show search results count
  const resultsCount = filteredData.length;
  if (searchTerm) {
    showNotification(`Found ${resultsCount} estimation${resultsCount !== 1 ? 's' : ''} matching "${searchTerm}"`, "info");
  }
}

function searchWithinEstimation() {
  const searchTerm = document.getElementById("editSearch").value.toLowerCase();
  if (!searchTerm || !selectedBooking) return;
  
  // Search in estimation content
  const est = selectedBooking.estimation;
  const searchContent = est.original.steamInvoice + " " + est.original.maintenanceInvoice +
                       est.adjusted.steamInvoice + " " + est.adjusted.maintenanceInvoice;
  
  if (searchContent.toLowerCase().includes(searchTerm)) {
    highlightSearchResults(searchTerm);
    showNotification(`Found "${searchTerm}" in estimation`, "success");
  } else {
    showNotification(`"${searchTerm}" not found in estimation`, "warning");
  }
}

function highlightSearchResults(term) {
  // Remove previous highlights
  document.querySelectorAll('.search-highlight').forEach(el => {
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  });
  
  // Add new highlights to all estimation content
  const elements = document.querySelectorAll('.sitevisit-estimation-invoice-unique-9284, .sitevisit-diff-unique-9284');
  elements.forEach(el => {
    const html = el.innerHTML;
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    const highlighted = html.replace(regex, '<span class="search-highlight">$1</span>');
    el.innerHTML = highlighted;
  });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// -----------------------------
// Table rendering with enhanced actions
// -----------------------------
function renderTable() {
  const tableBody = document.getElementById("tableBody");
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredData.slice(start, end);
  
  tableBody.innerHTML = "";
  
  pageData.forEach(booking => {
    const row = document.createElement("tr");
    
    // Check if has share link
    const hasShareLink = shareableLinks[booking.bookingId] && shareableLinks[booking.bookingId].active;
    const shareIndicator = hasShareLink ? 
      `<span class="share-indicator" title="Active share link"><i class="fas fa-link"></i></span>` : '';
    
    // Check if has site visit report
    const hasReport = booking.siteVisitReport && booking.siteVisitReport.reportDate;
    const reportIndicator = hasReport ? 
      `<span class="report-indicator" title="Site visit report completed"><i class="fas fa-file-check"></i></span>` : 
      `<span class="report-indicator missing" title="No site visit report"><i class="fas fa-file-exclamation"></i></span>`;
    
    // Check if has media
    const hasMedia = booking.mediaGallery && booking.mediaGallery.length > 0;
    const mediaIndicator = hasMedia ? 
      `<span class="media-indicator" title="${booking.mediaGallery.length} media items"><i class="fas fa-camera"></i> ${booking.mediaGallery.length}</span>` : "";
    
    row.innerHTML = `
      <td><strong>${booking.bookingId}</strong> ${reportIndicator} ${shareIndicator}</td>
      <td>${escapeHtml(booking.clientName)}</td>
      <td>${escapeHtml(booking.contact)}</td>
      <td>${escapeHtml(booking.address)}</td>
      <td>${escapeHtml(booking.serviceType)} ${mediaIndicator}</td>
      <td>${formatDate(booking.visitDate)}<br><small>${escapeHtml(booking.visitTime)}</small></td>
      <td><span class="sitevisit-status-badge-unique-9284 ${booking.status}">${booking.status}</span></td>
      <td>
        <span class="sitevisit-priority-badge-unique-9284 ${booking.priority}">
          <i class="fas fa-flag"></i> ${booking.priority}
        </span>
      </td>
      <td>
        <button class="sitevisit-estimation-btn-unique-9284" type="button" data-est="${booking.bookingId}">
          <i class="fas fa-eye"></i> View Estimation
        </button>
        <span class="sitevisit-estimation-chip-unique-9284">
          <i class="fas fa-arrows-left-right"></i> Original/Adjusted
        </span>
      </td>
      <td>
        <button class="sitevisit-table-btn-unique-9284 view" title="View Details & Report" type="button" data-view="${booking.bookingId}">
          <i class="fas fa-eye"></i>
        </button>
        <button class="sitevisit-table-btn-unique-9284 edit" title="Edit" type="button" data-edit="${booking.bookingId}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="sitevisit-table-btn-unique-9284 share" title="Share Link" type="button" data-share="${booking.bookingId}">
          <i class="fas fa-share-alt"></i>
        </button>
        ${booking.status !== "completed" ? `
          <button class="sitevisit-table-btn-unique-9284 complete" title="Mark Complete" type="button" data-complete="${booking.bookingId}">
            <i class="fas fa-check"></i>
          </button>
        ` : ``}
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Wire row buttons (update to include share button)
  tableBody.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => viewDetails(btn.getAttribute("data-view")));
  });
  
  tableBody.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => editBooking(btn.getAttribute("data-edit")));
  });
  
  tableBody.querySelectorAll("[data-share]").forEach(btn => {
    btn.addEventListener("click", () => {
      const bookingId = btn.getAttribute("data-share");
      selectedBooking = bookingsData.find(b => b.bookingId === bookingId);
      if (selectedBooking) {
        viewDetails(bookingId);
        switchDetailTab("share");
      }
    });
  });
  
  tableBody.querySelectorAll("[data-complete]").forEach(btn => {
    btn.addEventListener("click", () => completeBooking(btn.getAttribute("data-complete")));
  });
  
  tableBody.querySelectorAll("[data-est]").forEach(btn => {
    btn.addEventListener("click", () => openEstimationModal(btn.getAttribute("data-est")));
  });
  
  updatePaginationInfo();
}

// -----------------------------
// Detail View with Tabs
// -----------------------------
function viewDetails(bookingId) {
  selectedBooking = bookingsData.find(b => b.bookingId === bookingId);
  if (!selectedBooking) return;
  
  // Load booking details tab
  loadBookingDetails();
  
  // Load client info tab
  loadClientInfo();
  
  // Load site visit report tab (if exists)
  loadSiteVisitReport();
  
  // Load gallery tab
  loadMediaGallery();
  
  // Load share access tab
  loadShareAccessTab();
  
  // Show modal and activate first tab
  document.getElementById("detailModal").classList.add("active");
  switchDetailTab("details");
}

function switchDetailTab(tabName) {
  currentDetailTab = tabName;
  
  // Update tab buttons
  document.querySelectorAll(".detail-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-tab") === tabName);
  });
  
  // Show selected tab content
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.toggle("active", content.id === `tab-${tabName}`);
  });
  
  // Update gallery viewer if on gallery tab
  if (tabName === "gallery") {
    if (isHorizontalView) {
      loadHorizontalGallery();
    }
    if (galleryViewer) {
      setTimeout(() => {
        if (galleryViewer && galleryViewer.update) {
          galleryViewer.update();
        }
      }, 100);
    }
  }
}

function loadBookingDetails() {
  const tabContent = document.getElementById("tab-details");
  const est = selectedBooking.estimation;
  const origTotals = getConvertedTotals(est.original.steamTotal, est.original.maintenanceTotal);
  const adjTotals = getConvertedTotals(est.adjusted.steamTotal, est.adjusted.maintenanceTotal);
  
  tabContent.innerHTML = `
    ${detailRow("Booking ID:", `<strong>${selectedBooking.bookingId}</strong>`)}
    ${detailRow("Client Name:", escapeHtml(selectedBooking.clientName))}
    ${detailRow("Contact:", escapeHtml(selectedBooking.contact))}
    ${detailRow("Address:", escapeHtml(selectedBooking.address))}
    ${detailRow("Service Type:", escapeHtml(selectedBooking.serviceType))}
    ${detailRow("Visit Date:", `${formatDate(selectedBooking.visitDate)} at ${escapeHtml(selectedBooking.visitTime)}`)}
    ${detailRow("Status:", `<span class="sitevisit-status-badge-unique-9284 ${selectedBooking.status}">${selectedBooking.status}</span>`)}
    ${detailRow("Priority:", `<span class="sitevisit-priority-badge-unique-9284 ${selectedBooking.priority}"><i class="fas fa-flag"></i> ${selectedBooking.priority}</span>`)}
    ${detailRow("Submitted Date:", formatDate(selectedBooking.submittedDate))}
    ${detailRow("Assigned To:", escapeHtml(selectedBooking.assignedTo))}
    ${detailRow("Notes:", escapeHtml(selectedBooking.notes))}
    ${detailRow("Site Visit Report:", selectedBooking.siteVisitReport.reportDate ? 
      `<span class="report-status completed"><i class="fas fa-check-circle"></i> Completed on ${formatDate(selectedBooking.siteVisitReport.reportDate)}</span>` : 
      `<span class="report-status pending"><i class="fas fa-clock"></i> Pending</span>`)}
    ${detailRow("Media Attachments:", selectedBooking.mediaGallery.length > 0 ? 
      `<span class="media-count"><i class="fas fa-images"></i> ${selectedBooking.mediaGallery.length} items</span>` : 
      `<span class="media-count none"><i class="fas fa-images"></i> None</span>`)}

    <div style="margin-top:20px; padding-top:15px; border-top:2px solid var(--border-color);">
      <h4 style="margin:0 0 12px 0;"><i class="fas fa-calculator"></i> Estimation Summary</h4>
      <div class="estimation-summary">
        <div class="summary-row">
          <div class="summary-label">Original Totals:</div>
          <div class="summary-value">
            Steam: <strong>${formatMoney(origTotals.steam)}</strong>,
            Maintenance: <strong>${formatMoney(origTotals.maintenance)}</strong>
          </div>
        </div>
        <div class="summary-row">
          <div class="summary-label">Adjusted Totals:</div>
          <div class="summary-value">
            Steam: <strong>${formatMoney(adjTotals.steam)}</strong>,
            Maintenance: <strong>${formatMoney(adjTotals.maintenance)}</strong>
          </div>
        </div>
        <div class="summary-row total">
          <div class="summary-label">Combined Total (Adjusted):</div>
          <div class="summary-value">
            <strong>${formatMoney(adjTotals.total)}</strong>
          </div>
        </div>
      </div>
      <div style="margin-top:15px;">
        <button class="sitevisit-estimation-btn-unique-9284" type="button" id="openEstFromDetails">
          <i class="fas fa-calculator"></i> Open Estimation Floating Window
        </button>
      </div>
    </div>
  `;
  
  // Add event listener for estimation button
  const openEstBtn = document.getElementById("openEstFromDetails");
  if (openEstBtn) {
    openEstBtn.addEventListener("click", () => {
      openEstimationModal(selectedBooking.bookingId);
    });
  }
}

function loadClientInfo() {
  const tabContent = document.getElementById("tab-client");
  
  tabContent.innerHTML = `
    <div class="client-info-card">
      <h4><i class="fas fa-user-circle"></i> Client Information</h4>
      <div class="client-details">
        <div class="client-field">
          <label>Full Name:</label>
          <div class="client-value">${escapeHtml(selectedBooking.clientName)}</div>
        </div>
        <div class="client-field">
          <label>Contact Number:</label>
          <div class="client-value">${escapeHtml(selectedBooking.contact)}</div>
        </div>
        <div class="client-field">
          <label>Service Address:</label>
          <div class="client-value">${escapeHtml(selectedBooking.address)}</div>
        </div>
        <div class="client-field">
          <label>Preferred Service:</label>
          <div class="client-value">${escapeHtml(selectedBooking.serviceType)}</div>
        </div>
        <div class="client-field">
          <label>Visit Preference:</label>
          <div class="client-value">${escapeHtml(selectedBooking.visitTime)} on ${formatDate(selectedBooking.visitDate)}</div>
        </div>
        <div class="client-field">
          <label>Booking Notes:</label>
          <div class="client-value notes">${escapeHtml(selectedBooking.notes)}</div>
        </div>
      </div>
      
      <div class="client-actions">
        <button class="contact-client-btn">
          <i class="fas fa-phone"></i> Contact Client
        </button>
        <button class="send-email-btn">
          <i class="fas fa-envelope"></i> Send Email
        </button>
      </div>
    </div>
  `;
}

function loadSiteVisitReport() {
  const tabContent = document.getElementById("tab-report");
  const form = document.getElementById("siteVisitReportForm");
  const report = selectedBooking.siteVisitReport;
  
  if (!form) return;
  
  // Populate form with existing data
  document.getElementById("reportDate").value = report.reportDate || "";
  document.getElementById("reportTime").value = report.reportTime || "";
  document.getElementById("siteCondition").value = report.siteCondition || "good";
  document.getElementById("visitNotes").value = report.visitNotes || "";
  document.getElementById("recommendations").value = report.recommendations || "";
  
  // Clear and set checkboxes
  document.querySelectorAll('input[name="extraServices"]').forEach(cb => {
    cb.checked = report.extraServices ? report.extraServices.includes(cb.value) : false;
  });
}

function saveSiteVisitReport(e) {
  e.preventDefault();
  
  if (!selectedBooking) return;
  
  // Collect form data
  const reportData = {
    reportDate: document.getElementById("reportDate").value,
    reportTime: document.getElementById("reportTime").value,
    siteCondition: document.getElementById("siteCondition").value,
    visitNotes: document.getElementById("visitNotes").value,
    recommendations: document.getElementById("recommendations").value,
    extraServices: Array.from(document.querySelectorAll('input[name="extraServices"]:checked')).map(cb => cb.value),
    draft: false,
    savedAt: new Date().toISOString()
  };
  
  // Update booking
  selectedBooking.siteVisitReport = reportData;
  
  // Update in bookingsData
  const index = bookingsData.findIndex(b => b.bookingId === selectedBooking.bookingId);
  if (index !== -1) {
    bookingsData[index].siteVisitReport = reportData;
  }
  
  showNotification("Site visit report saved successfully!", "success");
  
  // Refresh details view
  loadBookingDetails();
}

function saveReportAsDraft() {
  if (!selectedBooking) return;
  
  // Collect form data
  const reportData = {
    reportDate: document.getElementById("reportDate").value,
    reportTime: document.getElementById("reportTime").value,
    siteCondition: document.getElementById("siteCondition").value,
    visitNotes: document.getElementById("visitNotes").value,
    recommendations: document.getElementById("recommendations").value,
    extraServices: Array.from(document.querySelectorAll('input[name="extraServices"]:checked')).map(cb => cb.value),
    draft: true,
    savedAt: new Date().toISOString()
  };
  
  // Update booking
  selectedBooking.siteVisitReport = reportData;
  
  // Update in bookingsData
  const index = bookingsData.findIndex(b => b.bookingId === selectedBooking.bookingId);
  if (index !== -1) {
    bookingsData[index].siteVisitReport = reportData;
  }
  
  showNotification("Site visit report saved as draft!", "info");
}

// -----------------------------
// Media Gallery Management
// -----------------------------
function loadMediaGallery() {
  const mediaGrid = document.getElementById("mediaGrid");
  const mediaItems = selectedBooking.mediaGallery;
  
  if (!mediaItems || mediaItems.length === 0) {
    mediaGrid.innerHTML = `
      <div class="no-media">
        <i class="fas fa-images fa-3x"></i>
        <p>No photos or videos added yet</p>
        <button class="btn-add-first" id="btnAddFirstMedia">
          <i class="fas fa-plus"></i> Add First Photo/Video
        </button>
      </div>
    `;
    
    // Reattach event listener
    const addFirstBtn = document.getElementById("btnAddFirstMedia");
    if (addFirstBtn) {
      addFirstBtn.addEventListener("click", () => 
        document.getElementById("mediaUpload").click()
      );
    }
    return;
  }
  
  mediaGrid.innerHTML = "";
  
  mediaItems.forEach((media, index) => {
    const mediaItem = document.createElement("div");
    mediaItem.className = `media-item ${media.type}`;
    
    if (media.type === "image") {
      mediaItem.innerHTML = `
        <img src="${media.url}" alt="${media.caption || 'Site photo'}">
        <div class="media-actions">
          <button class="delete-media" data-index="${index}" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="media-info">
          <div class="media-caption">${media.caption || 'Site photo'}</div>
          <div class="media-date">${formatDate(media.date)}</div>
        </div>
      `;
    } else if (media.type === "video") {
      mediaItem.innerHTML = `
        <video controls>
          <source src="${media.url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="media-actions">
          <button class="delete-media" data-index="${index}" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="media-info">
          <div class="media-caption">${media.caption || 'Site video'}</div>
          <div class="media-date">${formatDate(media.date)}</div>
        </div>
      `;
    }
    
    mediaGrid.appendChild(mediaItem);
  });
  
  // Attach delete handlers
  mediaGrid.querySelectorAll(".delete-media").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = parseInt(btn.getAttribute("data-index"));
      deleteMediaItem(index);
    });
  });
  
  // Update gallery viewer
  if (galleryViewer) {
    setTimeout(() => {
      if (galleryViewer && galleryViewer.update) {
        galleryViewer.update();
      }
    }, 100);
  }
}

function handleMediaUpload(e) {
  const files = e.target.files;
  if (!files.length || !selectedBooking) return;
  
  // Initialize mediaGallery if it doesn't exist
  if (!selectedBooking.mediaGallery) {
    selectedBooking.mediaGallery = [];
  }
  
  // Simulate file upload (in real app, you would upload to server)
  Array.from(files).forEach((file, i) => {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const mediaItem = {
        id: Date.now() + i,
        url: event.target.result,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        caption: file.name,
        date: new Date().toISOString().split('T')[0],
        fileName: file.name,
        fileSize: file.size
      };
      
      // Add to booking's media gallery
      selectedBooking.mediaGallery.push(mediaItem);
      
      // Update in bookingsData
      const index = bookingsData.findIndex(b => b.bookingId === selectedBooking.bookingId);
      if (index !== -1) {
        bookingsData[index].mediaGallery = selectedBooking.mediaGallery;
      }
      
      // If this is the last file, update the gallery display
      if (i === files.length - 1) {
        loadMediaGallery();
        showNotification(`Added ${files.length} media item${files.length > 1 ? 's' : ''}`, "success");
      }
    };
    
    reader.readAsDataURL(file);
  });
  
  // Reset file input
  e.target.value = '';
}

function deleteMediaItem(index) {
  if (!selectedBooking || !selectedBooking.mediaGallery[index]) return;
  
  if (confirm("Are you sure you want to delete this media item?")) {
    selectedBooking.mediaGallery.splice(index, 1);
    
    // Update in bookingsData
    const bookingIndex = bookingsData.findIndex(b => b.bookingId === selectedBooking.bookingId);
    if (bookingIndex !== -1) {
      bookingsData[bookingIndex].mediaGallery = selectedBooking.mediaGallery;
    }
    
    loadMediaGallery();
    showNotification("Media item deleted", "info");
  }
}

// -----------------------------
// Horizontal Gallery Functions
// -----------------------------
function toggleGalleryView() {
  isHorizontalView = !isHorizontalView;
  const btnToggle = document.getElementById('btnToggleView');
  
  if (isHorizontalView) {
    btnToggle.innerHTML = '<i class="fas fa-th-large"></i> Grid View';
    document.getElementById('horizontalGallery').style.display = 'block';
    document.getElementById('mediaGrid').style.display = 'none';
    loadHorizontalGallery();
  } else {
    btnToggle.innerHTML = '<i class="fas fa-th"></i> Horizontal View';
    document.getElementById('horizontalGallery').style.display = 'none';
    document.getElementById('mediaGrid').style.display = 'grid';
  }
}

function loadHorizontalGallery() {
  if (!selectedBooking) return;
  
  const slider = document.getElementById('horizontalSlider');
  const mediaItems = selectedBooking.mediaGallery;
  
  slider.innerHTML = '';
  
  if (!mediaItems || mediaItems.length === 0) {
    slider.innerHTML = `
      <div class="slide-item empty-slide">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666;">
          <i class="fas fa-images fa-3x"></i>
          <p style="margin-top: 10px; font-size: 14px;">No media to display</p>
        </div>
      </div>
    `;
    document.getElementById('currentSlide').textContent = '0';
    document.getElementById('totalSlides').textContent = '0';
    return;
  }
  
  mediaItems.forEach((media, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide-item';
    
    if (media.type === 'image') {
      slide.innerHTML = `
        <img src="${media.url}" alt="${media.caption || 'Site photo'}" class="gallery-image">
        <div class="slide-info">
          <div class="media-caption">${media.caption || 'Site photo'}</div>
          <div class="media-date">${formatDate(media.date)}</div>
        </div>
      `;
    } else if (media.type === 'video') {
      slide.className = 'slide-item video';
      slide.innerHTML = `
        <video controls class="gallery-video">
          <source src="${media.url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="slide-info">
          <div class="media-caption">${media.caption || 'Site video'}</div>
          <div class="media-date">${formatDate(media.date)}</div>
        </div>
      `;
    }
    
    slider.appendChild(slide);
  });
  
  // Initialize slick slider
  if (horizontalSlider) {
    horizontalSlider.slick('unslick');
  }
  
  if (typeof $ !== 'undefined' && typeof $.fn.slick !== 'undefined') {
    horizontalSlider = $(slider).slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: mediaItems.length > 2 ? 3 : mediaItems.length,
      slidesToScroll: 1,
      centerMode: mediaItems.length > 3,
      centerPadding: '40px',
      prevArrow: $('.slider-prev'),
      nextArrow: $('.slider-next'),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: mediaItems.length > 1 ? 2 : 1,
            slidesToScroll: 1,
            centerMode: mediaItems.length > 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '20px'
          }
        }
      ]
    });
    
    // Update slide counter
    document.getElementById('currentSlide').textContent = '1';
    document.getElementById('totalSlides').textContent = mediaItems.length;
    
    // Update counter on slide change
    horizontalSlider.on('afterChange', function(event, slick, currentSlide) {
      document.getElementById('currentSlide').textContent = currentSlide + 1;
    });
  }
}

// -----------------------------
// Estimation Modal with Edit Tab
// -----------------------------
function openEstimationModal(bookingId) {
  const booking = bookingsData.find(b => b.bookingId === bookingId);
  if (!booking) return;
  
  selectedBooking = booking;
  
  // Set default tab and currency
  setEstimationTab("orig", true);
  
  // Fill invoices
  renderEstimationInvoices();
  
  // Load edit fields
  loadEstimationEditFields();
  
  document.getElementById("estimationModal").classList.add("active");
}

function setEstimationTab(tab, silent) {
  currentEstimationTab = tab;
  
  // Update tab buttons
  document.querySelectorAll(".sitevisit-estimation-tab-unique-9284").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
  });
  
  // Show selected tab content
  document.getElementById("tab-orig").classList.toggle("active", tab === "orig");
  document.getElementById("tab-adj").classList.toggle("active", tab === "adj");
  document.getElementById("tab-diff").classList.toggle("active", tab === "diff");
  document.getElementById("tab-edit").classList.toggle("active", tab === "edit");
  
  if (!silent) {
    if (tab === "edit") {
      loadEstimationEditFields();
    } else {
      renderEstimationInvoices();
    }
  }
}

function loadEstimationEditFields() {
  if (!selectedBooking) return;
  
  const est = selectedBooking.estimation;
  
  // Generate Steam edit fields (simplified version)
  const steamFields = document.getElementById("steamEditFields");
  steamFields.innerHTML = `
    <div class="edit-field">
      <label>Steam Service Total (USD)</label>
      <input type="number" step="0.01" value="${est.adjusted.steamTotal}" id="editSteamTotal">
    </div>
    <div class="edit-field">
      <label>Service Description</label>
      <textarea id="editSteamDesc" rows="6" placeholder="Enter service description...">${est.adjusted.steamInvoice}</textarea>
    </div>
    <div class="edit-field">
      <label>Include Minimum Charge</label>
      <select id="editSteamMinCharge">
        <option value="yes" ${est.adjusted.steamTotal >= 120 ? 'selected' : ''}>Yes (Apply $120 minimum)</option>
        <option value="no" ${est.adjusted.steamTotal < 120 ? 'selected' : ''}>No (Use actual total)</option>
      </select>
    </div>
  `;
  
  // Generate Maintenance edit fields
  const maintFields = document.getElementById("maintenanceEditFields");
  maintFields.innerHTML = `
    <div class="edit-field">
      <label>Maintenance Service Total (USD)</label>
      <input type="number" step="0.01" value="${est.adjusted.maintenanceTotal}" id="editMaintTotal">
    </div>
    <div class="edit-field">
      <label>Service Description</label>
      <textarea id="editMaintDesc" rows="6" placeholder="Enter service description...">${est.adjusted.maintenanceInvoice}</textarea>
    </div>
    <div class="edit-field">
      <label>Tax Rate (%)</label>
      <input type="number" step="0.01" value="5" id="editTaxRate">
    </div>
    <div class="edit-field">
      <label>Include Travel Time</label>
      <select id="editTravelTime">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  `;
}

function saveEstimationDraft() {
  if (!selectedBooking) return;
  
  // Collect edited data
  const editedData = {
    steamTotal: parseFloat(document.getElementById("editSteamTotal").value) || 0,
    steamInvoice: document.getElementById("editSteamDesc").value,
    maintenanceTotal: parseFloat(document.getElementById("editMaintTotal").value) || 0,
    maintenanceInvoice: document.getElementById("editMaintDesc").value
  };
  
  // Save as draft (in a real app, you might have a separate draft property)
  selectedBooking.estimation.draft = editedData;
  
  showNotification("Estimation changes saved as draft", "info");
  
  // Switch to adjusted tab to see changes
  setEstimationTab("adj");
}

function updateEstimation() {
  if (!selectedBooking) return;
  
  // Collect edited data
  const editedData = {
    steamTotal: parseFloat(document.getElementById("editSteamTotal").value) || 0,
    steamInvoice: document.getElementById("editSteamDesc").value,
    maintenanceTotal: parseFloat(document.getElementById("editMaintTotal").value) || 0,
    maintenanceInvoice: document.getElementById("editMaintDesc").value
  };
  
  // Apply minimum charge if selected
  const applyMinCharge = document.getElementById("editSteamMinCharge").value === "yes";
  if (applyMinCharge && editedData.steamTotal < 120) {
    editedData.steamTotal = 114 * 1.05; // Apply minimum with tax
  }
  
  // Update adjusted estimation
  selectedBooking.estimation.adjusted.steamTotal = editedData.steamTotal;
  selectedBooking.estimation.adjusted.steamInvoice = editedData.steamInvoice;
  selectedBooking.estimation.adjusted.maintenanceTotal = editedData.maintenanceTotal;
  selectedBooking.estimation.adjusted.maintenanceInvoice = editedData.maintenanceInvoice;
  
  // Update in bookingsData
  const index = bookingsData.findIndex(b => b.bookingId === selectedBooking.bookingId);
  if (index !== -1) {
    bookingsData[index].estimation.adjusted = selectedBooking.estimation.adjusted;
  }
  
  showNotification("Estimation updated successfully!", "success");
  
  // Refresh all views
  renderEstimationInvoices();
  setEstimationTab("adj");
}

// -----------------------------
// Share Access Functions
// -----------------------------
function loadShareAccessTab() {
  if (!selectedBooking) return;
  
  const bookingId = selectedBooking.bookingId;
  const linkData = shareableLinks[bookingId] || null;
  
  // Update link status
  const linkStatus = document.getElementById('linkStatus');
  if (linkStatus) {
    const statusDot = linkStatus.querySelector('.status-dot');
    const statusText = linkStatus.querySelector('span:last-child');
    
    if (linkData && linkData.active) {
      statusDot.className = 'status-dot active';
      statusText.textContent = 'Active';
    } else {
      statusDot.className = 'status-dot';
      statusText.textContent = linkData ? 'Inactive' : 'Not Generated';
    }
  }
  
  // Display link if exists
  const linkDisplay = document.getElementById('shareLinkDisplay');
  
  if (linkData && linkData.url) {
    const qrCodeContainer = document.createElement('div');
    qrCodeContainer.className = 'qr-code-container';
    qrCodeContainer.id = 'qrCodeContainer';
    
    linkDisplay.innerHTML = `
      <div class="generated-link">
        <div style="margin-bottom: 10px; font-weight: 600; color: var(--text);">Shareable Link:</div>
        <div style="word-break: break-all; color: var(--primary-color);">${linkData.url}</div>
      </div>
    `;
    
    linkDisplay.appendChild(qrCodeContainer);
    
    // Actually generate QR code
    if (typeof QRCode !== 'undefined') {
      // Clear previous QR code
      document.getElementById('qrCodeContainer').innerHTML = '';
      
      new QRCode(document.getElementById("qrCodeContainer"), {
        text: linkData.url,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  } else {
    linkDisplay.innerHTML = `
      <div class="no-link-message">
        <i class="fas fa-link-slash"></i>
        <p>No shareable link generated yet</p>
      </div>
    `;
  }
  
  // Update controls
  const btnGenerate = document.getElementById('btnGenerateLink');
  const btnCopy = document.getElementById('btnCopyLink');
  const btnDeactivate = document.getElementById('btnDeactivateLink');
  
  if (btnGenerate) {
    if (linkData && linkData.active) {
      btnGenerate.disabled = true;
      btnGenerate.innerHTML = '<i class="fas fa-check"></i> Link Active';
      btnCopy.disabled = false;
      btnDeactivate.disabled = false;
    } else if (linkData && !linkData.active) {
      btnGenerate.disabled = false;
      btnGenerate.innerHTML = '<i class="fas fa-redo"></i> Regenerate Link';
      btnCopy.disabled = true;
      btnDeactivate.disabled = true;
    } else {
      btnGenerate.disabled = false;
      btnGenerate.innerHTML = '<i class="fas fa-bolt"></i> Generate Shareable Link';
      btnCopy.disabled = true;
      btnDeactivate.disabled = true;
    }
  }
  
  // Update stats
  document.getElementById('linkViews').textContent = linkData ? linkData.views || 0 : 0;
  document.getElementById('linkUploads').textContent = linkData ? linkData.uploads || 0 : 0;
  document.getElementById('linkExpires').textContent = linkData && linkData.expiresAt ? 
    formatDate(linkData.expiresAt) : 'Never';
  
  // Set toggle switches
  const settings = linkData ? linkData.settings : {
    allowEstimationView: true,
    allowReportView: true,
    allowGalleryView: true,
    allowUpload: true,
    allowComments: false
  };
  
  document.getElementById('allowEstimationView').checked = settings.allowEstimationView;
  document.getElementById('allowReportView').checked = settings.allowReportView;
  document.getElementById('allowGalleryView').checked = settings.allowGalleryView;
  document.getElementById('allowUpload').checked = settings.allowUpload;
  document.getElementById('allowComments').checked = settings.allowComments;
}

function generateShareableLink() {
  if (!selectedBooking) return;
  
  const bookingId = selectedBooking.bookingId;
  const baseUrl = window.location.origin + window.location.pathname;
  const shareId = generateShareId();
  const shareUrl = `${baseUrl}?share=${shareId}`;
  
  // Get settings from toggles
  const settings = {
    allowEstimationView: document.getElementById('allowEstimationView').checked,
    allowReportView: document.getElementById('allowReportView').checked,
    allowGalleryView: document.getElementById('allowGalleryView').checked,
    allowUpload: document.getElementById('allowUpload').checked,
    allowComments: document.getElementById('allowComments').checked
  };
  
  // Create link data
  const linkData = {
    bookingId: bookingId,
    url: shareUrl,
    shareId: shareId,
    active: true,
    createdAt: new Date().toISOString(),
    expiresAt: null, // Never expires
    settings: settings,
    views: 0,
    uploads: 0
  };
  
  // Save to storage
  shareableLinks[bookingId] = linkData;
  localStorage.setItem('shareableLinks', JSON.stringify(shareableLinks));
  
  // Update UI
  loadShareAccessTab();
  
  showNotification('Shareable link generated successfully!', 'success');
}

function copyShareLink() {
  if (!selectedBooking) return;
  
  const bookingId = selectedBooking.bookingId;
  const linkData = shareableLinks[bookingId];
  
  if (!linkData || !linkData.url) return;
  
  // Copy to clipboard
  navigator.clipboard.writeText(linkData.url).then(() => {
    const btnCopy = document.getElementById('btnCopyLink');
    const originalHtml = btnCopy.innerHTML;
    
    btnCopy.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btnCopy.classList.add('copied');
    
    setTimeout(() => {
      btnCopy.innerHTML = originalHtml;
      btnCopy.classList.remove('copied');
    }, 2000);
    
    showNotification('Link copied to clipboard!', 'success');
  });
}

function deactivateShareLink() {
  if (!selectedBooking) return;
  
  const bookingId = selectedBooking.bookingId;
  const linkData = shareableLinks[bookingId];
  
  if (!linkData) return;
  
  if (confirm('Are you sure you want to deactivate this shareable link? It will no longer be accessible.')) {
    linkData.active = false;
    shareableLinks[bookingId] = linkData;
    localStorage.setItem('shareableLinks', JSON.stringify(shareableLinks));
    
    loadShareAccessTab();
    showNotification('Shareable link deactivated', 'info');
  }
}

function generateShareId() {
  return 'share_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

// -----------------------------
// Share Page View Functionality
// -----------------------------
function checkForShareLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const shareId = urlParams.get('share');
  
  if (shareId) {
    // Find the booking that has this share ID
    const bookingEntry = Object.entries(shareableLinks).find(([bookingId, data]) => 
      data.shareId === shareId && data.active === true
    );
    
    if (bookingEntry) {
      const [bookingId, linkData] = bookingEntry;
      const booking = bookingsData.find(b => b.bookingId === bookingId);
      
      if (booking) {
        // Increment view count
        linkData.views = (linkData.views || 0) + 1;
        shareableLinks[bookingId] = linkData;
        localStorage.setItem('shareableLinks', JSON.stringify(shareableLinks));
        
        // Show share view
        showShareView(booking, linkData);
        return true;
      }
    }
  }
  
  return false;
}

function showShareView(booking, linkData) {
  // Hide the main dashboard
  document.querySelector('.sitevisit-container-unique-9284').style.display = 'none';
  document.querySelector('.sitevisit-header-unique-9284').style.display = 'none';
  
  // Create and show share view
  const shareView = document.createElement('div');
  shareView.className = 'share-view-container';
  shareView.innerHTML = `
    <div class="share-view-header">
      <div class="share-view-brand">
        <div class="logo">SC</div>
        <div>
          <h1>Site Visit Portal</h1>
          <p>View-only access for booking: ${booking.bookingId}</p>
        </div>
      </div>
      <button class="close-share-view" id="btnCloseShareView">
        <i class="fas fa-times"></i> Close
      </button>
    </div>
    
    <div class="share-view-content">
      <div class="share-view-tabs">
        <button class="share-tab active" data-tab="overview"><i class="fas fa-home"></i> Overview</button>
        ${linkData.settings.allowEstimationView ? 
          `<button class="share-tab" data-tab="estimation"><i class="fas fa-calculator"></i> Estimation</button>` : ''}
        ${linkData.settings.allowReportView ? 
          `<button class="share-tab" data-tab="report"><i class="fas fa-file-alt"></i> Site Report</button>` : ''}
        ${linkData.settings.allowGalleryView ? 
          `<button class="share-tab" data-tab="gallery"><i class="fas fa-images"></i> Gallery</button>` : ''}
        ${linkData.settings.allowUpload ? 
          `<button class="share-tab" data-tab="upload"><i class="fas fa-upload"></i> Upload</button>` : ''}
      </div>
      
      <div class="share-view-body">
        <!-- Overview Tab -->
        <div class="share-tab-content active" id="share-overview">
          <div class="overview-card">
            <h3><i class="fas fa-info-circle"></i> Booking Overview</h3>
            <div class="overview-details">
              <div class="overview-item">
                <strong>Client:</strong> ${escapeHtml(booking.clientName)}
              </div>
              <div class="overview-item">
                <strong>Service:</strong> ${escapeHtml(booking.serviceType)}
              </div>
              <div class="overview-item">
                <strong>Address:</strong> ${escapeHtml(booking.address)}
              </div>
              <div class="overview-item">
                <strong>Visit Date:</strong> ${formatDate(booking.visitDate)} at ${booking.visitTime}
              </div>
              <div class="overview-item">
                <strong>Status:</strong> <span class="status-badge">${booking.status}</span>
              </div>
            </div>
          </div>
          
          <div class="actions-card">
            <h4>Quick Actions</h4>
            <div class="quick-actions">
              ${linkData.settings.allowEstimationView ? 
                `<button class="quick-action-btn" data-action="view-estimation">
                  <i class="fas fa-calculator"></i> View Estimation
                </button>` : ''}
              ${linkData.settings.allowGalleryView ? 
                `<button class="quick-action-btn" data-action="view-gallery">
                  <i class="fas fa-images"></i> View Gallery
                </button>` : ''}
            </div>
          </div>
        </div>
        
        <!-- Estimation Tab (if allowed) -->
        ${linkData.settings.allowEstimationView ? `
          <div class="share-tab-content" id="share-estimation">
            <div class="estimation-preview">
              <h3><i class="fas fa-calculator"></i> Estimation Forms</h3>
              <div class="estimation-display">
                <pre>${booking.estimation.adjusted.steamInvoice}</pre>
              </div>
              <div class="estimation-display">
                <pre>${booking.estimation.adjusted.maintenanceInvoice}</pre>
              </div>
            </div>
          </div>
        ` : ''}
        
        <!-- Report Tab (if allowed) -->
        ${linkData.settings.allowReportView ? `
          <div class="share-tab-content" id="share-report">
            <div class="report-preview">
              <h3><i class="fas fa-file-alt"></i> Site Visit Report</h3>
              ${booking.siteVisitReport && booking.siteVisitReport.reportDate ? `
                <div class="report-content">
                  <div class="report-field">
                    <strong>Visit Date:</strong> ${formatDate(booking.siteVisitReport.reportDate)} ${booking.siteVisitReport.reportTime}
                  </div>
                  <div class="report-field">
                    <strong>Site Condition:</strong> ${booking.siteVisitReport.siteCondition}
                  </div>
                  <div class="report-field">
                    <strong>Notes:</strong> ${escapeHtml(booking.siteVisitReport.visitNotes)}
                  </div>
                  <div class="report-field">
                    <strong>Recommendations:</strong> ${escapeHtml(booking.siteVisitReport.recommendations)}
                  </div>
                </div>
              ` : `
                <div class="no-report">
                  <i class="fas fa-file-exclamation"></i>
                  <p>No site visit report available yet</p>
                </div>
              `}
            </div>
          </div>
        ` : ''}
        
        <!-- Gallery Tab (if allowed) -->
        ${linkData.settings.allowGalleryView ? `
          <div class="share-tab-content" id="share-gallery">
            <div class="gallery-preview">
              <h3><i class="fas fa-images"></i> Photo Gallery</h3>
              ${booking.mediaGallery && booking.mediaGallery.length > 0 ? `
                <div class="share-gallery-grid">
                  ${booking.mediaGallery.slice(0, 6).map((media, index) => `
                    <div class="share-media-item">
                      ${media.type === 'image' ? 
                        `<img src="${media.url}" alt="${media.caption}">` :
                        `<video controls><source src="${media.url}" type="video/mp4"></video>`
                      }
                      <div class="share-media-info">${media.caption}</div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="no-gallery">
                  <i class="fas fa-images"></i>
                  <p>No photos or videos available yet</p>
                </div>
              `}
            </div>
          </div>
        ` : ''}
        
        <!-- Upload Tab (if allowed) -->
        ${linkData.settings.allowUpload ? `
          <div class="share-tab-content" id="share-upload">
            <div class="upload-section">
              <h3><i class="fas fa-upload"></i> Upload Additional Media</h3>
              <p>You can upload additional photos or videos related to this site visit.</p>
              
              <div class="upload-area" id="shareUploadArea">
                <i class="fas fa-cloud-upload-alt fa-3x"></i>
                <p>Drag & drop files here or click to browse</p>
                <input type="file" id="shareFileUpload" accept="image/*,video/*" multiple style="display: none;">
                <button class="browse-btn" id="btnBrowseShare">Browse Files</button>
              </div>
              
              <div class="upload-queue" id="shareUploadQueue"></div>
              
              <button class="upload-submit-btn" id="btnSubmitShareUpload" disabled>
                <i class="fas fa-upload"></i> Upload Files
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
    
    <div class="share-view-footer">
      <p>Shared access for booking: <strong>${booking.bookingId}</strong></p>
      <p class="share-note"><i class="fas fa-info-circle"></i> This is a view-only shared access portal</p>
    </div>
  `;
  
  document.body.appendChild(shareView);
  
  // Add event listeners for share view
  setupShareViewEvents(booking, linkData);
}

function setupShareViewEvents(booking, linkData) {
  // Close button
  document.getElementById('btnCloseShareView').addEventListener('click', () => {
    const shareView = document.querySelector('.share-view-container');
    if (shareView) {
      shareView.remove();
    }
    document.querySelector('.sitevisit-container-unique-9284').style.display = 'block';
    document.querySelector('.sitevisit-header-unique-9284').style.display = 'block';
    window.history.replaceState({}, document.title, window.location.pathname);
  });
  
  // Tab switching
  document.querySelectorAll('.share-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Update active tab
      document.querySelectorAll('.share-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show active content
      document.querySelectorAll('.share-tab-content').forEach(content => {
        content.classList.remove('active');
      });
      const tabContent = document.getElementById(`share-${tabName}`);
      if (tabContent) {
        tabContent.classList.add('active');
      }
    });
  });
  
  // Quick actions
  document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (action === 'view-estimation') {
        const estimationTab = document.querySelector('[data-tab="estimation"]');
        if (estimationTab) estimationTab.click();
      } else if (action === 'view-gallery') {
        const galleryTab = document.querySelector('[data-tab="gallery"]');
        if (galleryTab) galleryTab.click();
      }
    });
  });
  
  // Upload functionality (if allowed)
  if (linkData.settings.allowUpload) {
    const uploadArea = document.getElementById('shareUploadArea');
    const fileInput = document.getElementById('shareFileUpload');
    const btnBrowse = document.getElementById('btnBrowseShare');
    const btnSubmit = document.getElementById('btnSubmitShareUpload');
    
    if (uploadArea && fileInput && btnBrowse && btnSubmit) {
      let filesToUpload = [];
      
      btnBrowse.addEventListener('click', () => fileInput.click());
      uploadArea.addEventListener('click', () => fileInput.click());
      
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });
      
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFileSelect(e.dataTransfer.files);
      });
      
      fileInput.addEventListener('change', (e) => {
        handleFileSelect(e.target.files);
      });
      
      function handleFileSelect(files) {
        filesToUpload = Array.from(files);
        updateUploadQueue();
        btnSubmit.disabled = filesToUpload.length === 0;
      }
      
      function updateUploadQueue() {
        const queue = document.getElementById('shareUploadQueue');
        if (!queue) return;
        
        queue.innerHTML = '';
        
        if (filesToUpload.length === 0) {
          queue.innerHTML = '<p class="no-files">No files selected</p>';
          return;
        }
        
        filesToUpload.forEach((file, index) => {
          const fileItem = document.createElement('div');
          fileItem.className = 'upload-file-item';
          fileItem.innerHTML = `
            <div class="file-info">
              <i class="fas fa-file-${file.type.startsWith('image/') ? 'image' : 'video'}"></i>
              <div>
                <strong>${file.name}</strong>
                <p>${formatFileSize(file.size)}</p>
              </div>
            </div>
            <button class="remove-file" data-index="${index}">
              <i class="fas fa-times"></i>
            </button>
          `;
          queue.appendChild(fileItem);
        });
        
        // Add remove handlers
        queue.querySelectorAll('.remove-file').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            filesToUpload.splice(index, 1);
            updateUploadQueue();
            btnSubmit.disabled = filesToUpload.length === 0;
          });
        });
      }
      
      btnSubmit.addEventListener('click', () => {
        if (filesToUpload.length === 0) return;
        
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        
        // Simulate upload
        setTimeout(() => {
          // In real app, upload to server here
          // For demo, we'll add to booking's media gallery
          filesToUpload.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
              const mediaItem = {
                id: Date.now(),
                url: e.target.result,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                caption: `Uploaded via share link: ${file.name}`,
                date: new Date().toISOString().split('T')[0],
                fileName: file.name,
                fileSize: file.size,
                uploadedViaShare: true
              };
              
              if (!booking.mediaGallery) {
                booking.mediaGallery = [];
              }
              
              booking.mediaGallery.push(mediaItem);
              
              // Update link upload count
              linkData.uploads = (linkData.uploads || 0) + 1;
              shareableLinks[booking.bookingId] = linkData;
              localStorage.setItem('shareableLinks', JSON.stringify(shareableLinks));
            };
            reader.readAsDataURL(file);
          });
          
          // Reset
          filesToUpload = [];
          updateUploadQueue();
          btnSubmit.disabled = true;
          btnSubmit.innerHTML = '<i class="fas fa-upload"></i> Upload Files';
          
          showNotification(`${filesToUpload.length} file(s) uploaded successfully via share link!`, 'success');
        }, 1500);
      });
    }
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// -----------------------------
// Helper Functions
// -----------------------------
function updateStats() {
  const pending = bookingsData.filter(b => b.status === "pending").length;
  const scheduled = bookingsData.filter(b => b.status === "scheduled").length;
  const inProgress = bookingsData.filter(b => b.status === "in-progress").length;
  const completed = bookingsData.filter(b => b.status === "completed").length;

  document.getElementById("statPending").textContent = pending;
  document.getElementById("statScheduled").textContent = scheduled;
  document.getElementById("statInProgress").textContent = inProgress;
  document.getElementById("statCompleted").textContent = completed;
}

function applyFilters() {
  const search = (document.getElementById("filterSearch").value || "").toLowerCase();
  const status = document.getElementById("filterStatus").value;
  const priority = document.getElementById("filterPriority").value;
  const dateFrom = document.getElementById("filterDateFrom").value;

  filteredData = bookingsData.filter(booking => {
    const matchSearch =
      !search ||
      booking.bookingId.toLowerCase().includes(search) ||
      booking.clientName.toLowerCase().includes(search) ||
      booking.address.toLowerCase().includes(search);

    const matchStatus = !status || booking.status === status;
    const matchPriority = !priority || booking.priority === priority;
    const matchDate = !dateFrom || booking.visitDate >= dateFrom;

    return matchSearch && matchStatus && matchPriority && matchDate;
  });

  currentPage = 1;
  renderTable();
  renderPagination();
}

function resetFilters() {
  document.getElementById("filterSearch").value = "";
  document.getElementById("filterStatus").value = "";
  document.getElementById("filterPriority").value = "";
  document.getElementById("filterDateFrom").value = "";

  filteredData = [...bookingsData];
  currentPage = 1;
  renderTable();
  renderPagination();
}

function sortTable(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortColumn = column;
    sortDirection = "asc";
  }

  filteredData.sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortDirection === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  renderTable();
}

function detailRow(label, valueHtml) {
  return `
    <div class="sitevisit-detail-row-unique-9284">
      <div class="sitevisit-detail-label-unique-9284">${label}</div>
      <div class="sitevisit-detail-value-unique-9284">${valueHtml}</div>
    </div>
  `;
}

function closeDetailModal() {
  document.getElementById("detailModal").classList.remove("active");
  selectedBooking = null;
  currentDetailTab = "details";
}

function closeEstimationModal() {
  document.getElementById("estimationModal").classList.remove("active");
  selectedBooking = null;
  currentEstimationTab = "orig";
}

function editBooking(bookingId) {
  const booking = bookingsData.find(b => b.bookingId === bookingId);
  if (!booking) return;
  
  // In a real application, you would open an edit form
  // For now, we'll just open the estimation modal in edit mode
  selectedBooking = booking;
  openEstimationModal(bookingId);
  setEstimationTab("edit");
}

function completeBooking(bookingId) {
  if (!confirm(`Mark booking ${bookingId} as completed?`)) return;
  const booking = bookingsData.find(b => b.bookingId === bookingId);
  if (!booking) return;

  booking.status = "completed";
  updateStats();
  renderTable();
  showNotification(`Booking ${bookingId} marked as completed!`, "success");
}

function refreshTable() {
  updateStats();
  renderTable();
  renderPagination();
  showNotification("Table refreshed", "info");
}

function exportData() {
  // Simple CSV export
  const headers = ["Booking ID", "Client Name", "Contact", "Address", "Service Type", "Visit Date", "Status", "Priority"];
  const csvContent = [
    headers.join(","),
    ...filteredData.map(b => [
      b.bookingId,
      b.clientName,
      b.contact,
      b.address,
      b.serviceType,
      b.visitDate,
      b.status,
      b.priority
    ].join(","))
  ].join("\n");
  
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `site-visits-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  
  showNotification("Data exported as CSV", "success");
}

function setCurrency(mode) {
  estCurrency = mode;

  document.getElementById("currencyUSD").classList.toggle("active", mode === "USD");
  document.getElementById("currencyCAD").classList.toggle("active", mode === "CAD");

  refreshEstimationModalIfOpen();
}

function refreshEstimationModalIfOpen() {
  const isOpen = document.getElementById("estimationModal").classList.contains("active");
  if (isOpen) renderEstimationInvoices();
}

function renderEstimationInvoices() {
  if (!selectedBooking || !selectedBooking.estimation) return;

  const est = selectedBooking.estimation;

  const usdToCad = parseFloat(document.getElementById("usdToCadRate").value) || 1.36;
  const cadToUsd = parseFloat(document.getElementById("cadToUsdRate").value) || 0.74;

  const orig = buildDisplayInvoices(est.original, usdToCad, cadToUsd);
  const adj = buildDisplayInvoices(est.adjusted, usdToCad, cadToUsd);

  document.getElementById("origSteamInvoice").textContent = orig.steam;
  document.getElementById("origMaintInvoice").textContent = orig.maint;

  document.getElementById("adjSteamInvoice").textContent = adj.steam;
  document.getElementById("adjMaintInvoice").textContent = adj.maint;

  // Diff view
  const diffView = document.getElementById("diffView");
  if (diffView) {
    diffView.innerHTML = buildDiffHtml(orig.steam + "\n\n" + orig.maint, adj.steam + "\n\n" + adj.maint);
  }
}

function buildDisplayInvoices(block, usdToCad, cadToUsd) {
  const steamTotal = convertFromUsd(block.steamTotal, usdToCad, cadToUsd);
  const maintTotal = convertFromUsd(block.maintenanceTotal, usdToCad, cadToUsd);

  const currencySymbol = estCurrency === "CAD" ? "C$" : "$";
  const headerCurrency = estCurrency === "CAD" ? "CAD" : "USD";

  const steamInvoice =
`CLEANING ESTIMATE INVOICE (${headerCurrency})
----
CLIENT: ${selectedBooking.clientName}
BOOKING: ${selectedBooking.bookingId}

${block.steamInvoice || "Select services to see estimate"}

----
TOTAL (Steam): ${currencySymbol}${steamTotal.toFixed(2)}`;

  const maintInvoice =
`ENHANCED CLEANING ESTIMATE (${headerCurrency})
====
CLIENT: ${selectedBooking.clientName}
BOOKING: ${selectedBooking.bookingId}

${block.maintenanceInvoice || "No maintenance estimate"}

====
TOTAL (Maintenance/Multi-Service): ${currencySymbol}${maintTotal.toFixed(2)}`;

  return { steam: steamInvoice, maint: maintInvoice };
}

function buildDiffHtml(beforeText, afterText) {
  const beforeLines = (beforeText || "").split("\n");
  const afterLines = (afterText || "").split("\n");

  const max = Math.max(beforeLines.length, afterLines.length);
  const out = [];

  for (let i = 0; i < max; i++) {
    const b = beforeLines[i] ?? "";
    const a = afterLines[i] ?? "";

    if (b === a) {
      out.push(`<span class="sitevisit-diff-line-unique-9284 sitevisit-diff-unchanged-unique-9284">${escapeHtml(a)}</span>`);
    } else {
      if (b) out.push(`<span class="sitevisit-diff-line-unique-9284 sitevisit-diff-removed-unique-9284">- ${escapeHtml(b)}</span>`);
      if (a) out.push(`<span class="sitevisit-diff-line-unique-9284 sitevisit-diff-added-unique-9284">+ ${escapeHtml(a)}</span>`);
    }
  }

  return out.join("");
}

function convertFromUsd(amountUsd, usdToCad, cadToUsd) {
  const n = Number(amountUsd || 0);
  if (estCurrency === "CAD") return n * usdToCad;
  return n;
}

function getConvertedTotals(steamUsd, maintUsd) {
  const usdToCad = parseFloat(document.getElementById("usdToCadRate")?.value || "1.36");
  const cadToUsd = parseFloat(document.getElementById("cadToUsdRate")?.value || "0.74");

  const steam = convertFromUsd(steamUsd, usdToCad, cadToUsd);
  const maintenance = convertFromUsd(maintUsd, usdToCad, cadToUsd);
  return { steam, maintenance, total: steam + maintenance };
}

function formatMoney(n) {
  const currencySymbol = estCurrency === "CAD" ? "C$" : "$";
  return `${currencySymbol}${Number(n || 0).toFixed(2)}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "Not set";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function downloadReportAsPDF() {
  showNotification("PDF download feature would be implemented here", "info");
}

// -----------------------------
// Notification System
// -----------------------------
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
    <span>${message}</span>
    <button class="close-notification"><i class="fas fa-times"></i></button>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Add styles if not already present
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 99999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        max-width: 400px;
      }
      .notification.success { background: #28a745; }
      .notification.info { background: #17a2b8; }
      .notification.warning { background: #ffc107; color: #212529; }
      .notification .close-notification {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification && notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
  
  // Close button
  const closeBtn = notification.querySelector('.close-notification');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.remove();
        }
      }, 300);
    });
  }
}

// -----------------------------
// Pagination functions
// -----------------------------
function renderPagination() {
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginationControls = document.getElementById("paginationControls");
  paginationControls.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.className = "sitevisit-page-btn-unique-9284";
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => changePage(currentPage - 1));
  paginationControls.appendChild(prevBtn);

  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = "sitevisit-page-btn-unique-9284";
    if (i === currentPage) pageBtn.classList.add("active");
    pageBtn.textContent = i;
    pageBtn.addEventListener("click", () => changePage(i));
    paginationControls.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "sitevisit-page-btn-unique-9284";
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => changePage(currentPage + 1));
  paginationControls.appendChild(nextBtn);
}

function changePage(page) {
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  currentPage = Math.min(Math.max(1, page), totalPages);
  renderTable();
  renderPagination();
}

function updatePaginationInfo() {
  const start = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, filteredData.length);

  document.getElementById("showingStart").textContent = start;
  document.getElementById("showingEnd").textContent = end;
  document.getElementById("totalRecords").textContent = filteredData.length;
}