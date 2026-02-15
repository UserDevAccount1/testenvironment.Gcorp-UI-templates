// SmartEstimator.js
let priceData = null;
let currentSteamSelection = [];
let currentCamperSelection = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPriceData();
    setupEventListeners();
});

// Load price data from localStorage
function loadPriceData() {
    try {
        const saved = localStorage.getItem('cleaningPriceList');
        if (saved) {
            priceData = JSON.parse(saved);
        } else {
            // Fallback to default data
            priceData = {
                steamClean: [
                    { id: '1', item: "Carpets", size: "Large Room 10x10", price: 75, notes: "1 bedroom = 1.5 hours" },
                    { id: '2', item: "Carpets", size: "Regular Room 8x8", price: 60, notes: "" },
                    { id: '3', item: "Carpets", size: "Small Room 5x5", price: 55, notes: "" },
                    { id: '4', item: "Rug", size: "Area Rug", price: 30, notes: "" },
                    { id: '5', item: "Rug", size: "Small Rug", price: 25, notes: "" },
                    { id: '6', item: "Walk-in Closet", size: "Large", price: 50, notes: "" },
                    { id: '7', item: "Walk-in Closet", size: "Small", price: 35, notes: "" },
                    { id: '8', item: "Stair Flight", size: "Per flight (max $75)", price: 5, notes: "$5 per flight, maximum $75" },
                    { id: '9', item: "Walls", size: "Standard", price: 100, notes: "" },
                    { id: '10', item: "Small Chair/Bar Stool", size: "Standard", price: 20, notes: "" },
                    { id: '11', item: "Couch", size: "Standard", price: 100, notes: "" },
                    { id: '12', item: "Love Seat", size: "Standard", price: 75, notes: "" },
                    { id: '13', item: "Mattress", size: "Standard", price: 100, notes: "" },
                    { id: '14', item: "Hallway", size: "Standard", price: 35, notes: "" },
                    { id: '15', item: "Landing", size: "Standard", price: 25, notes: "" }
                ],
                campers: [
                    { id: 'c1', size: "Small (up to 20ft)", price: 120, includes: "One couch, one bed, one living room carpet" },
                    { id: 'c2', size: "Medium (up to 27ft)", price: 220, includes: "One couch, one seating couch, one bed, living room carpet" },
                    { id: 'c3', size: "Large (27ft+)", price: 290, includes: "Two couches, kitchen couch, living area, one bed" }
                ],
                rates: {
                    residential: 38,
                    commercial: 44,
                    deepRate: 38,
                    maintenanceMin: 3,
                    deepMin: 6,
                    cleaners: 2,
                    roomBase: {
                        kitchen: 4,
                        kitchenLarge: 1.5,
                        bedroom: 1,
                        bedroomLarge: 0.5,
                        bathroom: 2.5,
                        bathroomLarge: 1,
                        entry: 0.5
                    }
                },
                metadata: {
                    minSteamCharge: 114,
                    depositAmount: 120
                }
            };
        }
    } catch (e) {
        console.error('Error loading price data:', e);
    }
    
    // Render all sections
    renderSteamItems();
    renderStairFlight();
    renderCamperPackages();
    updateRateDisplays();
    updateMaintenanceBaseHours();
}

// Setup event listeners
function setupEventListeners() {
    // Listen for storage events (updates from management page)
    window.addEventListener('storage', function(e) {
        if (e.key === 'cleaningPriceList') {
            loadPriceData();
        }
    });
}

// Switch between service tabs
function switchService(service) {
    // Update tab buttons
    document.querySelectorAll('.se-service-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update service content
    document.querySelectorAll('.se-service-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`service-${service}`).classList.add('active');
    
    // Trigger calculation for the active service
    if (service === 'steam') calculateSteamEstimate();
    if (service === 'maintenance') calculateMaintenanceEstimate();
    if (service === 'moveout') calculateMoveoutEstimate();
    if (service === 'deep') calculateDeepEstimate();
    
    // Update global invoice
    updateGlobalInvoice();
}

// ============= STEAM CLEAN FUNCTIONS =============

function renderSteamItems() {
    const tbody = document.getElementById('steamItemsBody');
    if (!tbody || !priceData) return;
    
    // Filter out stair flight (handled separately)
    const items = priceData.steamClean.filter(item => item.item !== "Stair Flight");
    
    tbody.innerHTML = items.map(item => `
        <tr>
            <td><input type="checkbox" class="steam-item-checkbox" data-id="${item.id}" data-price="${item.price}" onchange="calculateSteamEstimate()"></td>
            <td>${item.item}</td>
            <td>${item.size}</td>
            <td>$${item.price}</td>
            <td><input type="number" min="1" value="1" class="steam-item-qty" data-id="${item.id}" onchange="calculateSteamEstimate()" style="width:60px;"></td>
        </tr>
    `).join('');
    
    // Update staff list
    const staffRule = priceData.rules?.find(r => r.name === "Staff List");
    if (staffRule) {
        document.getElementById('steamStaffList').textContent = staffRule.rule;
    }
    
    // Update deposit amount
    const deposit = priceData.metadata?.depositAmount || 120;
    document.getElementById('depositLabel').textContent = `$${deposit} Deposit Paid`;
}

function renderStairFlight() {
    const section = document.getElementById('stairFlightSection');
    if (!section || !priceData) return;
    
    const stairItem = priceData.steamClean.find(item => item.item === "Stair Flight");
    if (!stairItem) return;
    
    section.innerHTML = `
        <h4>Stair Flight</h4>
        <div style="display: flex; align-items: center; gap: 20px;">
            <label>
                <input type="checkbox" id="stairsCheck" onchange="calculateSteamEstimate()"> Include Stairs
            </label>
            <div>
                <label>Flights (0-15):</label>
                <input type="range" id="stairs" min="0" max="15" value="0" step="1" oninput="updateStairs(this.value)" ${!document.getElementById('stairsCheck')?.checked ? 'disabled' : ''}>
                <span id="stairsCountDisplay">0</span> flights
            </div>
            <div>
                <strong>Price: $<span id="stairsPrice">0.00</span></strong>
                <small>(max $75)</small>
            </div>
        </div>
    `;
}

function updateStairs(flights) {
    flights = Math.min(15, Math.max(0, parseInt(flights) || 0));
    
    // Each flight = $5, max $75
    let totalPrice = Math.min(flights * 5, 75);
    
    document.getElementById("stairsCountDisplay").innerText = flights;
    document.getElementById("stairsPrice").innerText = totalPrice.toFixed(2);
    document.getElementById("stairs").value = flights;
    
    calculateSteamEstimate();
}

function calculateSteamEstimate() {
    let subtotal = 0;
    let breakdownItems = [];
    let selectedServices = [];
    
    // Get all checked items
    const checkboxes = document.querySelectorAll('.steam-item-checkbox:checked');
    checkboxes.forEach(cb => {
        const id = cb.dataset.id;
        const price = parseFloat(cb.dataset.price);
        const qtyInput = document.querySelector(`.steam-item-qty[data-id="${id}"]`);
        const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
        const itemTotal = price * qty;
        
        // Get item details
        const row = cb.closest('tr');
        const itemName = row.cells[1].innerText;
        const itemSize = row.cells[2].innerText;
        
        subtotal += itemTotal;
        breakdownItems.push(`${itemName} (${itemSize}) ×${qty} ........ $${itemTotal.toFixed(2)}`);
        selectedServices.push(itemTotal);
    });
    
    // Handle stairs
    const stairsCheck = document.getElementById('stairsCheck');
    if (stairsCheck && stairsCheck.checked) {
        const flights = parseInt(document.getElementById('stairsCountDisplay').innerText) || 0;
        const price = parseFloat(document.getElementById('stairsPrice').innerText) || 0;
        
        if (price > 0) {
            subtotal += price;
            breakdownItems.push(`Stair Flights (${flights}) ........ $${price.toFixed(2)}`);
            selectedServices.push(price);
        }
    }
    
    // Get rules from price data
    const minSteamCharge = priceData.metadata?.minSteamCharge || 114;
    const depositAmount = priceData.metadata?.depositAmount || 120;
    const discounts = [];
    
    // Minimum rule
    if (selectedServices.length === 1 && subtotal < (minSteamCharge + minSteamCharge * 0.05)) {
        subtotal = minSteamCharge;
        breakdownItems = [`Minimum Steam Clean Service ........ $${minSteamCharge.toFixed(2)}`];
    }
    
    let tax = subtotal * 0.05;
    let total = subtotal + tax;
    
    // Deposit
    const depositPaid = document.getElementById('steamDepositPaid');
    if (depositPaid && depositPaid.checked) {
        total -= depositAmount;
        discounts.push(`Deposit Paid: -$${depositAmount}`);
    }
    
    // Build invoice
    let invoice = `STEAM CLEAN ESTIMATE
--------------------------------
ITEMS SELECTED:
${breakdownItems.length > 0 ? breakdownItems.join("\n") : "No items selected"}

${discounts.length > 0 ? `DISCOUNTS:\n${discounts.join("\n")}\n` : ''}
--------------------------------
Subtotal: $${subtotal.toFixed(2)}
Tax (5%): $${tax.toFixed(2)}
TOTAL DUE: $${total.toFixed(2)}`;

    document.getElementById('steamInvoice').innerText = invoice;
    
    // Save to localStorage for combined services
    localStorage.setItem('steamInvoice', invoice);
    localStorage.setItem('steamTotal', total.toFixed(2));
    
    // Update global invoice
    updateGlobalInvoice();
}

function showSteamInfo() {
    const modal = document.getElementById('steamInfoModal');
    const minCharge = priceData.metadata?.minSteamCharge || 114;
    const total = minCharge * 1.05;
    document.getElementById('steamPolicyText').innerHTML = 
        `All Steam Clean services priced below $${minCharge} will be adjusted to $${minCharge} plus 5% tax, making the final minimum charge $${total.toFixed(2)}.`;
    modal.style.display = 'block';
}

function closeSteamInfo() {
    document.getElementById('steamInfoModal').style.display = 'none';
}

// ============= MAINTENANCE FUNCTIONS =============

function updateRateDisplays() {
    if (!priceData?.rates) return;
    
    document.getElementById('residentialRateDisplay').textContent = priceData.rates.residential || 38;
    document.getElementById('commercialRateDisplay').textContent = priceData.rates.commercial || 44;
    document.getElementById('combinedResidentialRate').textContent = priceData.rates.residential || 38;
    document.getElementById('combinedCommercialRate').textContent = priceData.rates.commercial || 44;
}

function updateMaintenanceBaseHours() {
    if (!priceData?.rates?.roomBase) return;
    
    const base = priceData.rates.roomBase;
    document.getElementById('kitchenBaseDisplay').textContent = (base.kitchen || 4).toFixed(2);
    document.getElementById('kitchenLargeAdd').textContent = (base.kitchenLarge || 1.5).toFixed(1);
    document.getElementById('bedroomBaseDisplay').textContent = (base.bedroom || 1).toFixed(2);
    document.getElementById('bedroomLargeAdd').textContent = (base.bedroomLarge || 0.5).toFixed(1);
    document.getElementById('bathroomBaseDisplay').textContent = (base.bathroom || 2.5).toFixed(2);
    document.getElementById('bathroomLargeAdd').textContent = (base.bathroomLarge || 1).toFixed(1);
    document.getElementById('entryBaseDisplay').textContent = (base.entry || 0.5).toFixed(2);
}

function updateMaintenanceHours() {
    // Update displays
    document.getElementById('kitchenExtraDisplay').innerText = parseFloat(document.getElementById('kitchenExtra').value || 0).toFixed(2);
    document.getElementById('bedroomExtraDisplay').innerText = parseFloat(document.getElementById('bedroomExtra').value || 0).toFixed(2);
    document.getElementById('bathroomExtraDisplay').innerText = parseFloat(document.getElementById('bathroomExtra').value || 0).toFixed(2);
    document.getElementById('entryExtraDisplay').innerText = parseFloat(document.getElementById('entryExtra').value || 0).toFixed(2);
    
    calculateMaintenanceEstimate();
}

function toggleMaintenanceVisit() {
    const isVisit = document.getElementById('maintenanceVisitEstimation').checked;
    const alertBox = document.getElementById('maintenanceVisitAlert');
    const successBox = document.getElementById('maintenanceVisitSuccess');
    const finalizeBtn = document.getElementById('maintenanceFinalizeBtn');
    
    if (isVisit) {
        alertBox.style.display = 'block';
        successBox.style.display = 'none';
        finalizeBtn.style.display = 'inline-block';
    } else {
        alertBox.style.display = 'none';
        successBox.style.display = 'none';
        finalizeBtn.style.display = 'none';
    }
    
    calculateMaintenanceEstimate();
}

function finalizeMaintenanceVisit() {
    document.getElementById('maintenanceVisitAlert').style.display = 'none';
    document.getElementById('maintenanceVisitSuccess').style.display = 'block';
    document.getElementById('maintenanceFinalizeBtn').style.display = 'none';
    alert('Visit estimation finalized. You can now proceed.');
}

function calculateMaintenanceEstimate() {
    if (!priceData?.rates) return;
    
    const rates = priceData.rates;
    const rateType = document.querySelector('input[name="maintenanceRate"]:checked')?.value || 'residential';
    const rate = rateType === 'residential' ? rates.residential : rates.commercial;
    
    // Show/hide visit option for commercial
    const visitOption = document.getElementById('maintenanceVisitOption');
    if (rateType === 'commercial') {
        visitOption.style.display = 'block';
    } else {
        visitOption.style.display = 'none';
        document.getElementById('maintenanceVisitEstimation').checked = false;
        toggleMaintenanceVisit();
    }
    
    // Calculate room hours
    const kitchen = calculateRoomHours('kitchen');
    const bedroom = calculateRoomHours('bedroom');
    const bathroom = calculateRoomHours('bathroom');
    const entryway = calculateEntryHours();
    
    document.getElementById('kitchenHours').innerText = kitchen.toFixed(2);
    document.getElementById('bedroomHours').innerText = bedroom.toFixed(2);
    document.getElementById('bathroomHours').innerText = bathroom.toFixed(2);
    document.getElementById('entryHours').innerText = entryway.toFixed(2);
    
    let totalHours = kitchen + bedroom + bathroom + entryway;
    const minHours = rateType === 'residential' ? (rates.maintenanceMin || 3) : (rates.maintenanceMin * 2 || 6);
    const cleaners = rates.cleaners || 2;
    
    const totalHoursApplied = Math.max(totalHours, minHours);
    const cost = totalHoursApplied * rate;
    
    // Update note
    document.getElementById('maintenanceNote').innerHTML = 
        `Minimum ${minHours} hours for ${rateType} cleaning (${cleaners} cleaners). Travel time included.`;
    
    // Save for combined services
    localStorage.setItem('maintenanceCost', cost.toFixed(2));
    localStorage.setItem('maintenanceHours', totalHoursApplied.toFixed(2));
    
    // Update global invoice
    updateGlobalInvoice();
}

function calculateRoomHours(room) {
    const base = priceData.rates.roomBase[room] || 0;
    const largeAdd = priceData.rates.roomBase[`${room}Large`] || 0;
    const largeChecked = document.getElementById(`${room}Large`)?.checked || false;
    const extra = parseFloat(document.getElementById(`${room}Extra`)?.value || 0);
    
    return base + (largeChecked ? largeAdd : 0) + extra;
}

function calculateEntryHours() {
    const base = priceData.rates.roomBase.entry || 0.5;
    const extra = parseFloat(document.getElementById('entryExtra')?.value || 0);
    return base + extra;
}

// ============= MOVE OUT FUNCTIONS =============

function calculateMoveoutEstimate() {
    const size = document.getElementById('moveoutSize').value;
    const sqft = parseFloat(document.getElementById('moveoutSqft').value) || 0;
    const rate = parseFloat(document.getElementById('moveoutRate').value) || 38;
    
    let baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
    let sqftFactor = size === 'small' ? sqft / 300 : size === 'medium' ? sqft / 250 : sqft / 200;
    
    let estimatedHours = Math.max(baseHours, sqftFactor);
    const totalCost = round2(estimatedHours * rate);
    
    document.getElementById('moveoutHoursDisplay').innerText = estimatedHours.toFixed(2);
    document.getElementById('moveoutCostDisplay').innerText = totalCost.toFixed(2);
    
    // Save for combined services
    localStorage.setItem('moveoutCost', totalCost.toFixed(2));
}

// ============= DEEP CLEAN FUNCTIONS =============

function calculateDeepEstimate() {
    const size = document.getElementById('deepSize').value;
    const sqft = parseFloat(document.getElementById('deepSqft').value) || 0;
    const rate = parseFloat(document.getElementById('deepRate').value) || 38;
    
    let baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
    let sqftFactor = size === 'small' ? sqft / 300 : size === 'medium' ? sqft / 250 : sqft / 200;
    
    let estimatedHours = Math.max(baseHours, sqftFactor);
    const totalCost = round2(estimatedHours * rate);
    
    document.getElementById('deepHoursDisplay').innerText = estimatedHours.toFixed(2);
    document.getElementById('deepCostDisplay').innerText = totalCost.toFixed(2);
    
    // Save for combined services
    localStorage.setItem('deepCost', totalCost.toFixed(2));
}

// ============= CAMPER FUNCTIONS =============

function renderCamperPackages() {
    const container = document.getElementById('camperPackages');
    if (!container || !priceData?.campers) return;
    
    container.innerHTML = priceData.campers.map(camper => `
        <div class="se-camper-card" onclick="selectCamper('${camper.id}')" id="camper-${camper.id}">
            <h3>${camper.size}</h3>
            <div class="se-camper-price">$${camper.price}</div>
            <div class="se-camper-includes">${camper.includes}</div>
            <button class="se-btn se-btn-primary" style="width:100%; margin-top:10px;" onclick="event.stopPropagation(); calculateCamperEstimate('${camper.id}')">Select</button>
        </div>
    `).join('');
}

function selectCamper(id) {
    // Remove selected class from all cards
    document.querySelectorAll('.se-camper-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    document.getElementById(`camper-${id}`).classList.add('selected');
    currentCamperSelection = id;
    calculateCamperEstimate(id);
}

function calculateCamperEstimate(id) {
    const camper = priceData.campers.find(c => c.id === id);
    if (!camper) return;
    
    const tax = camper.price * 0.05;
    const total = camper.price + tax;
    
    let invoice = `CAMPER CLEAN ESTIMATE
--------------------------------
Package: ${camper.size}
Includes: ${camper.includes}
Price: $${camper.price.toFixed(2)}
Tax (5%): $${tax.toFixed(2)}
--------------------------------
TOTAL DUE: $${total.toFixed(2)}`;
    
    // Save for combined services
    localStorage.setItem('camperInvoice', invoice);
    localStorage.setItem('camperTotal', total.toFixed(2));
    
    // Update global invoice
    updateGlobalInvoice();
}

// ============= COMBINED SERVICES FUNCTIONS =============

function calculateCombinedEstimate() {
    const includeSteam = document.getElementById('combinedSteam').checked;
    const includeMaintenance = document.getElementById('combinedMaintenance').checked;
    const includeMoveout = document.getElementById('combinedMoveout').checked;
    const includeDeep = document.getElementById('combinedDeep').checked;
    
    const travelType = document.getElementById('combinedTravelType').value;
    const travelMinutes = parseFloat(document.getElementById('combinedTravelMinutes').value) || 0;
    
    let subtotal = 0;
    let breakdown = [];
    
    // Steam Clean
    if (includeSteam) {
        const steamTotal = parseFloat(localStorage.getItem('steamTotal') || '0');
        if (steamTotal > 0) {
            subtotal += steamTotal;
            breakdown.push('Steam Clean - See detailed invoice above');
        }
    }
    
    // Maintenance
    if (includeMaintenance) {
        const maintenanceCost = parseFloat(localStorage.getItem('maintenanceCost') || '0');
        if (maintenanceCost > 0) {
            subtotal += maintenanceCost;
            const hours = localStorage.getItem('maintenanceHours') || '0';
            breakdown.push(`Maintenance Clean (${hours} hrs) ........ $${maintenanceCost.toFixed(2)}`);
        }
    }
    
    // Move Out
    if (includeMoveout) {
        const moveoutCost = parseFloat(document.getElementById('moveoutCostDisplay').innerText || '0');
        if (moveoutCost > 0) {
            subtotal += moveoutCost;
            breakdown.push(`Move Out Clean ........ $${moveoutCost.toFixed(2)}`);
        }
    }
    
    // Deep Clean
    if (includeDeep) {
        const deepCost = parseFloat(document.getElementById('deepCostDisplay').innerText || '0');
        if (deepCost > 0) {
            subtotal += deepCost;
            breakdown.push(`Deep Clean ........ $${deepCost.toFixed(2)}`);
        }
    }
    
    // Travel Time
    let travelCost = 0;
    if (travelMinutes > 0) {
        const rate = travelType === 'residential' ? (priceData.rates?.residential || 38) : (priceData.rates?.commercial || 44);
        travelCost = round2((travelMinutes / 60) * rate);
        subtotal += travelCost;
        breakdown.push(`Travel Time (${travelMinutes} mins) ........ $${travelCost.toFixed(2)}`);
    }
    
    document.getElementById('combinedTravelCost').innerText = travelCost.toFixed(2);
    
    // Tax and total
    const tax = round2(subtotal * 0.05);
    const total = round2(subtotal + tax);
    
    // Store in localStorage for global invoice
    localStorage.setItem('combinedSubtotal', subtotal.toFixed(2));
    localStorage.setItem('combinedTotal', total.toFixed(2));
    
    updateGlobalInvoice();
}

// ============= GLOBAL INVOICE FUNCTIONS =============

function updateGlobalInvoice() {
    const activeService = document.querySelector('.se-service-tab.active')?.innerText.toLowerCase() || '';
    let invoiceText = '';
    
    if (activeService.includes('combined')) {
        // Build combined invoice
        const subtotal = parseFloat(localStorage.getItem('combinedSubtotal') || '0');
        const total = parseFloat(localStorage.getItem('combinedTotal') || '0');
        const tax = round2(total - subtotal);
        
        invoiceText = `FINAL COMBINED SERVICES ESTIMATE
--------------------------------
${document.getElementById('combinedSteam').checked ? '✓ Steam Clean included\n' : ''}
${document.getElementById('combinedMaintenance').checked ? '✓ Maintenance Clean included\n' : ''}
${document.getElementById('combinedMoveout').checked ? '✓ Move Out Clean included\n' : ''}
${document.getElementById('combinedDeep').checked ? '✓ Deep Clean included\n' : ''}
--------------------------------
Subtotal: $${subtotal.toFixed(2)}
Tax (5%): $${tax.toFixed(2)}
TOTAL DUE: $${total.toFixed(2)}`;
    } 
    else if (activeService.includes('steam')) {
        invoiceText = document.getElementById('steamInvoice')?.innerText || 'No estimate available';
    }
    else if (activeService.includes('maintenance')) {
        const rateType = document.querySelector('input[name="maintenanceRate"]:checked')?.value || 'residential';
        const rate = rateType === 'residential' ? (priceData.rates?.residential || 38) : (priceData.rates?.commercial || 44);
        const totalHours = parseFloat(document.getElementById('kitchenHours').innerText) + 
                          parseFloat(document.getElementById('bedroomHours').innerText) +
                          parseFloat(document.getElementById('bathroomHours').innerText) +
                          parseFloat(document.getElementById('entryHours').innerText);
        const minHours = rateType === 'residential' ? (priceData.rates?.maintenanceMin || 3) : (priceData.rates?.maintenanceMin * 2 || 6);
        const appliedHours = Math.max(totalHours, minHours);
        const cost = appliedHours * rate;
        const tax = cost * 0.05;
        
        invoiceText = `MAINTENANCE CLEAN ESTIMATE
--------------------------------
Rate: $${rate}/hr (${rateType})
Total Hours: ${appliedHours.toFixed(2)} hrs
${appliedHours > totalHours ? `(Minimum ${minHours} hrs applied)` : ''}
Base Cost: $${cost.toFixed(2)}
Tax (5%): $${tax.toFixed(2)}
--------------------------------
TOTAL DUE: $${(cost + tax).toFixed(2)}`;
    }
    else if (activeService.includes('moveout')) {
        const cost = parseFloat(document.getElementById('moveoutCostDisplay').innerText) || 0;
        const hours = parseFloat(document.getElementById('moveoutHoursDisplay').innerText) || 0;
        const tax = cost * 0.05;
        
        invoiceText = `MOVE OUT CLEAN ESTIMATE
--------------------------------
Size: ${document.getElementById('moveoutSize').options[document.getElementById('moveoutSize').selectedIndex].text}
Square Footage: ${document.getElementById('moveoutSqft').value || 'Not specified'}
Estimated Hours: ${hours.toFixed(2)} hrs
Rate: $${document.getElementById('moveoutRate').value}/hr
Base Cost: $${cost.toFixed(2)}
Tax (5%): $${tax.toFixed(2)}
--------------------------------
TOTAL DUE: $${(cost + tax).toFixed(2)}

Note: Minimum 6 hours for 2 cleaners
Travel time included in total hours
Hours will be divided between 2 staff members`;
    }
    else if (activeService.includes('deep')) {
        const cost = parseFloat(document.getElementById('deepCostDisplay').innerText) || 0;
        const hours = parseFloat(document.getElementById('deepHoursDisplay').innerText) || 0;
        const tax = cost * 0.05;
        
        invoiceText = `DEEP CLEAN ESTIMATE
--------------------------------
Size: ${document.getElementById('deepSize').options[document.getElementById('deepSize').selectedIndex].text}
Square Footage: ${document.getElementById('deepSqft').value || 'Not specified'}
Estimated Hours: ${hours.toFixed(2)} hrs
Rate: $${document.getElementById('deepRate').value}/hr
Base Cost: $${cost.toFixed(2)}
Tax (5%): $${tax.toFixed(2)}
--------------------------------
TOTAL DUE: $${(cost + tax).toFixed(2)}

Note: Minimum 6 hours for 2 cleaners
Travel time included in total hours
Hours will be divided between 2 staff members`;
    }
    else if (activeService.includes('camper')) {
        invoiceText = localStorage.getItem('camperInvoice') || 'Select a camper package';
    }
    
    document.getElementById('globalInvoice').innerText = invoiceText;
}

function copyInvoice() {
    const invoice = document.getElementById('globalInvoice').innerText;
    navigator.clipboard.writeText(invoice).then(() => {
        alert('Invoice copied to clipboard!');
    });
}

function bookService() {
    // Check if visit estimation is required and not finalized
    if (document.getElementById('maintenanceVisitEstimation')?.checked) {
        alert('Please finalize visit estimation before booking.');
        return;
    }
    
    alert('Booking functionality will be implemented here!');
}

// Helper function
function round2(n) {
    return Math.round(n * 100) / 100;
}

// Make functions globally available
window.switchService = switchService;
window.calculateSteamEstimate = calculateSteamEstimate;
window.updateStairs = updateStairs;
window.showSteamInfo = showSteamInfo;
window.closeSteamInfo = closeSteamInfo;
window.updateMaintenanceHours = updateMaintenanceHours;
window.toggleMaintenanceVisit = toggleMaintenanceVisit;
window.finalizeMaintenanceVisit = finalizeMaintenanceVisit;
window.calculateMoveoutEstimate = calculateMoveoutEstimate;
window.calculateDeepEstimate = calculateDeepEstimate;
window.selectCamper = selectCamper;
window.calculateCamperEstimate = calculateCamperEstimate;
window.calculateCombinedEstimate = calculateCombinedEstimate;
window.copyInvoice = copyInvoice;
window.bookService = bookService;