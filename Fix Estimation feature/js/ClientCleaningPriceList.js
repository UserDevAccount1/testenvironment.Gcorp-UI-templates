// ClientCleaningPriceList.js - Enhanced Version
let priceData = null;
let currentService = 'maintenance';
let maintenanceRate = 'residential';
let moveoutSize = 'medium';
let deepSize = 'medium';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPriceData();
    initializeSteamItems();
    initializeCamperPackages();
    calculateMaintenance(); // Default calculation
    updatePreviewAmount();
});

// Load price data from localStorage
function loadPriceData() {
    try {
        const saved = localStorage.getItem('cleaningPriceList');
        if (saved) {
            priceData = JSON.parse(saved);
        } else {
            // Fallback default data
            priceData = {
                steamClean: [
                    { id: '1', item: "Large Carpet", size: "10x10", price: 75 },
                    { id: '2', item: "Regular Carpet", size: "8x8", price: 60 },
                    { id: '3', item: "Small Carpet", size: "5x5", price: 55 },
                    { id: '4', item: "Area Rug", size: "Standard", price: 30 },
                    { id: '5', item: "Small Rug", size: "Standard", price: 25 },
                    { id: '6', item: "Large Closet", size: "Walk-in", price: 50 },
                    { id: '7', item: "Small Closet", size: "Walk-in", price: 35 },
                    { id: '8', item: "Walls", size: "Standard", price: 100 },
                    { id: '9', item: "Chair/Stool", size: "Small", price: 20 },
                    { id: '10', item: "Couch", size: "Standard", price: 100 },
                    { id: '11', item: "Love Seat", size: "Standard", price: 75 },
                    { id: '12', item: "Mattress", size: "Standard", price: 100 },
                    { id: '13', item: "Hallway", size: "Standard", price: 35 },
                    { id: '14', item: "Landing", size: "Standard", price: 25 }
                ],
                campers: [
                    { id: 'c1', size: "Small Camper (up to 20ft)", price: 120, includes: "One couch, one bed, one living room carpet" },
                    { id: 'c2', size: "Medium Camper (up to 27ft)", price: 220, includes: "One couch, one seating couch, one bed, living room carpet" },
                    { id: 'c3', size: "Large Camper (27ft+)", price: 290, includes: "Two couches, kitchen couch, living area, one bed" }
                ],
                rates: {
                    residential: 38,
                    commercial: 44,
                    deepRate: 38,
                    moveoutRate: 38,
                    maintenanceMin: 3,
                    commercialMin: 6,
                    deepMin: 6,
                    moveoutMin: 6,
                    cleaners: 2,
                    roomBase: {
                        kitchen: 4,
                        kitchenLarge: 1.5,
                        bedroom: 1,
                        bedroomLarge: 0.5,
                        bathroom: 2.5,
                        bathroomLarge: 1,
                        entry: 0.5
                    },
                    sqftFactors: {
                        small: 300,
                        medium: 250,
                        large: 200
                    }
                },
                metadata: {
                    minSteamCharge: 114,
                    depositAmount: 120,
                    stairPrice: 5,
                    maxStairPrice: 75
                }
            };
        }
    } catch (e) {
        console.error('Error loading price data:', e);
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('show');
}

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('mobileMenu').classList.remove('show');
    }
}

// Toggle FAQ
function toggleFAQ(button) {
    button.classList.toggle('active');
    const answer = button.nextElementSibling;
    answer.classList.toggle('show');
}

// Update preview amount
function updatePreviewAmount() {
    const preview = document.getElementById('previewAmount');
    if (preview) {
        preview.innerHTML = `
            <span class="ccl-preview-label">Starting from</span>
            <span class="ccl-preview-value">$${priceData.metadata.minSteamCharge}</span>
        `;
    }
}

// Switch between services
function switchService(service) {
    currentService = service;
    
    // Update cards
    document.querySelectorAll('.ccl-service-card').forEach(card => {
        card.classList.remove('active');
    });
    document.getElementById(`card-${service}`).classList.add('active');
    
    // Update forms
    document.querySelectorAll('.ccl-estimator-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`form-${service}`).classList.add('active');
    
    // Calculate appropriate estimate
    if (service === 'maintenance') calculateMaintenance();
    if (service === 'moveout') calculateMoveout();
    if (service === 'deep') calculateDeep();
    if (service === 'steam') calculateSteam();
    if (service === 'camper') {
        setTimeout(() => {
            const firstCamper = document.querySelector('.ccl-camper-card');
            if (firstCamper) {
                selectCamper(firstCamper.dataset.id);
            }
        }, 100);
    }
}

// Set maintenance rate
function setMaintenanceRate(rate) {
    maintenanceRate = rate;
    document.querySelectorAll('.ccl-rate-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`rate-${rate === 'residential' ? 'res' : 'com'}`).classList.add('active');
    calculateMaintenance();
}

// Set moveout size
function setMoveoutSize(size) {
    moveoutSize = size;
    document.querySelectorAll('#form-moveout .ccl-segmented-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`size-${size}`).classList.add('active');
    calculateMoveout();
}

// Set deep clean size
function setDeepSize(size) {
    deepSize = size;
    document.querySelectorAll('#form-deep .ccl-segmented-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`deep-${size}`).classList.add('active');
    calculateDeep();
}

// Set square footage
function setSqft(value) {
    if (currentService === 'moveout') {
        document.getElementById('moveout-sqft').value = value;
        calculateMoveout();
    } else if (currentService === 'deep') {
        document.getElementById('deep-sqft').value = value;
        calculateDeep();
    }
}

// Adjust counter values
function adjustValue(id, delta) {
    const input = document.getElementById(id);
    let value = parseInt(input.value) + delta;
    value = Math.max(0, Math.min(5, value));
    input.value = value;
    
    if (id.includes('bedroom') || id.includes('bathroom')) {
        calculateMaintenance();
    }
}

// Update maintenance slider
function updateMaintenanceSlider(room) {
    const value = document.getElementById(`${room}-extra`).value;
    document.getElementById(`${room}-extra-value`).textContent = value + 'h';
    calculateMaintenance();
}

// Update steam stairs
function updateSteamStairs() {
    const value = document.getElementById('steam-stairs').value;
    document.getElementById('steam-stairs-count').textContent = value;
    const price = Math.min(value * (priceData?.metadata?.stairPrice || 5), priceData?.metadata?.maxStairPrice || 75);
    document.getElementById('steam-stairs-price').textContent = price;
    calculateSteam();
}

// Initialize Steam Clean Items
function initializeSteamItems() {
    const container = document.getElementById('steam-items');
    if (!container || !priceData) return;
    
    container.innerHTML = priceData.steamClean.map(item => `
        <div class="ccl-item-card" onclick="toggleSteamItem(this, '${item.id}')">
            <div class="ccl-item-name">${item.item}</div>
            <div class="ccl-item-size">${item.size}</div>
            <div class="ccl-item-controls">
                <input type="checkbox" class="steam-checkbox" data-id="${item.id}" data-price="${item.price}" style="display:none;" checked>
                <input type="number" class="steam-qty" data-id="${item.id}" value="1" min="1" onclick="event.stopPropagation()" onchange="calculateSteam()">
                <span class="ccl-item-price">$${item.price}</span>
            </div>
        </div>
    `).join('');
}

// Toggle steam item selection
function toggleSteamItem(card, id) {
    card.classList.toggle('selected');
    const checkbox = card.querySelector('.steam-checkbox');
    checkbox.checked = card.classList.contains('selected');
    calculateSteam();
}

// Initialize Camper Packages
function initializeCamperPackages() {
    const container = document.getElementById('camper-packages');
    if (!container || !priceData) return;
    
    container.innerHTML = priceData.campers.map(camper => `
        <div class="ccl-camper-card" data-id="${camper.id}" onclick="selectCamper('${camper.id}')">
            <div class="ccl-camper-size">${camper.size}</div>
            <div class="ccl-camper-price">$${camper.price}</div>
            <div class="ccl-camper-includes">${camper.includes}</div>
        </div>
    `).join('');
}

// Select Camper Package
function selectCamper(id) {
    document.querySelectorAll('.ccl-camper-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`.ccl-camper-card[data-id="${id}"]`).classList.add('selected');
    calculateCamper(id);
}

// MAINTENANCE CALCULATION
function calculateMaintenance() {
    const rate = maintenanceRate === 'residential' ? priceData.rates.residential : priceData.rates.commercial;
    const minHours = maintenanceRate === 'residential' ? priceData.rates.maintenanceMin : priceData.rates.commercialMin;
    
    // Calculate hours
    let totalHours = 0;
    
    // Kitchen
    const kitchenLarge = document.getElementById('kitchen-large').checked ? priceData.rates.roomBase.kitchenLarge : 0;
    const kitchenExtra = parseFloat(document.getElementById('kitchen-extra').value) || 0;
    totalHours += priceData.rates.roomBase.kitchen + kitchenLarge + kitchenExtra;
    
    // Bedrooms
    const bedrooms = parseInt(document.getElementById('bedrooms').value) || 0;
    const largeBedrooms = parseInt(document.getElementById('large-bedrooms').value) || 0;
    totalHours += (bedrooms * priceData.rates.roomBase.bedroom) + (largeBedrooms * priceData.rates.roomBase.bedroomLarge);
    
    // Bathrooms
    const bathrooms = parseInt(document.getElementById('bathrooms').value) || 0;
    const largeBathrooms = parseInt(document.getElementById('large-bathrooms').value) || 0;
    totalHours += (bathrooms * priceData.rates.roomBase.bathroom) + (largeBathrooms * priceData.rates.roomBase.bathroomLarge);
    
    // Entryway
    const entryExtra = parseFloat(document.getElementById('entry-extra').value) || 0;
    totalHours += priceData.rates.roomBase.entry + entryExtra;
    
    // Apply minimum
    const appliedHours = Math.max(totalHours, minHours);
    const cost = appliedHours * rate;
    const tax = cost * 0.05;
    const total = cost + tax;
    const perStaff = appliedHours / priceData.rates.cleaners;
    
    // Update summary
    document.getElementById('maintenance-summary').innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Total Hours:</span>
            <strong>${appliedHours.toFixed(2)}h</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Rate:</span>
            <strong>$${rate}/hr</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Subtotal:</span>
            <strong>$${cost.toFixed(2)}</strong>
        </div>
    `;
    
    // Update live results
    document.getElementById('results-content').innerHTML = `
        <div class="ccl-result-item">
            <span class="ccl-result-label">Service:</span>
            <span class="ccl-result-value">Maintenance Clean</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Type:</span>
            <span class="ccl-result-value">${maintenanceRate}</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Hours:</span>
            <span class="ccl-result-value">${appliedHours.toFixed(2)}</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Rate:</span>
            <span class="ccl-result-value">$${rate}/hr</span>
        </div>
        <div class="ccl-total">
            <div>Total Due</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            <i class="fas fa-users"></i> ${perStaff.toFixed(2)} hours per cleaner<br>
            <small>Tax: $${tax.toFixed(2)} • Travel time included</small>
        </div>
    `;
}

// MOVE OUT CALCULATION
function calculateMoveout() {
    const sqft = parseFloat(document.getElementById('moveout-sqft').value) || 0;
    const rate = priceData.rates.moveoutRate;
    
    const baseHours = moveoutSize === 'small' ? 7 : moveoutSize === 'medium' ? 10 : 15;
    const factor = priceData.rates.sqftFactors[moveoutSize];
    
    const sqftHours = sqft / factor;
    const estimatedHours = Math.max(baseHours, sqftHours);
    const minHours = priceData.rates.moveoutMin || 6;
    const appliedHours = Math.max(estimatedHours, minHours);
    
    const cost = appliedHours * rate;
    const tax = cost * 0.05;
    const total = cost + tax;
    const perStaff = appliedHours / priceData.rates.cleaners;
    
    document.getElementById('results-content').innerHTML = `
        <div class="ccl-result-item">
            <span class="ccl-result-label">Service:</span>
            <span class="ccl-result-value">Move Out/In Clean</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Size:</span>
            <span class="ccl-result-value">${moveoutSize}</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">SQFT:</span>
            <span class="ccl-result-value">${sqft}</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Hours:</span>
            <span class="ccl-result-value">${appliedHours.toFixed(2)}</span>
        </div>
        <div class="ccl-total">
            <div>Total Due</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            <i class="fas fa-users"></i> ${perStaff.toFixed(2)} hours per cleaner<br>
            <small>Base: ${baseHours}h + SQFT: ${sqftHours.toFixed(2)}h • Min: ${minHours}h</small>
        </div>
    `;
}

// DEEP CLEAN CALCULATION
function calculateDeep() {
    const sqft = parseFloat(document.getElementById('deep-sqft').value) || 0;
    const rate = priceData.rates.deepRate;
    
    const baseHours = deepSize === 'small' ? 7 : deepSize === 'medium' ? 10 : 15;
    const factor = priceData.rates.sqftFactors[deepSize];
    
    const sqftHours = sqft / factor;
    const estimatedHours = Math.max(baseHours, sqftHours);
    const minHours = priceData.rates.deepMin || 6;
    const appliedHours = Math.max(estimatedHours, minHours);
    
    const cost = appliedHours * rate;
    const tax = cost * 0.05;
    const total = cost + tax;
    const perStaff = appliedHours / priceData.rates.cleaners;
    
    document.getElementById('results-content').innerHTML = `
        <div class="ccl-result-item">
            <span class="ccl-result-label">Service:</span>
            <span class="ccl-result-value">Deep Clean</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Size:</span>
            <span class="ccl-result-value">${deepSize}</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">SQFT:</span>
            <span class="ccl-result-value">${sqft}</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Hours:</span>
            <span class="ccl-result-value">${appliedHours.toFixed(2)}</span>
        </div>
        <div class="ccl-total">
            <div>Total Due</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            <i class="fas fa-users"></i> ${perStaff.toFixed(2)} hours per cleaner<br>
            <small>⚠️ Automatic Deep Clean • Tax: $${tax.toFixed(2)}</small>
        </div>
    `;
}

// STEAM CLEAN CALCULATION
function calculateSteam() {
    let subtotal = 0;
    const items = [];
    
    // Get checked items
    document.querySelectorAll('.steam-checkbox:checked').forEach(cb => {
        const id = cb.dataset.id;
        const price = parseFloat(cb.dataset.price);
        const qty = parseInt(document.querySelector(`.steam-qty[data-id="${id}"]`).value) || 1;
        const itemTotal = price * qty;
        subtotal += itemTotal;
        
        const item = priceData.steamClean.find(i => i.id === id);
        items.push({ name: item.item, qty, total: itemTotal });
    });
    
    // Stairs
    const stairs = parseInt(document.getElementById('steam-stairs').value) || 0;
    const stairPrice = Math.min(stairs * (priceData.metadata.stairPrice || 5), priceData.metadata.maxStairPrice || 75);
    if (stairs > 0) {
        subtotal += stairPrice;
        items.push({ name: 'Stair Flight', qty: stairs, total: stairPrice });
    }
    
    // Apply minimum
    const minCharge = priceData.metadata.minSteamCharge || 114;
    let finalSubtotal = subtotal;
    
    if (items.length > 0 && subtotal < minCharge) {
        finalSubtotal = minCharge;
    }
    
    const tax = finalSubtotal * 0.05;
    let total = finalSubtotal + tax;
    
    // Deposit
    const depositPaid = document.getElementById('steam-deposit').checked;
    const depositAmount = priceData.metadata.depositAmount || 120;
    if (depositPaid) {
        total -= depositAmount;
    }
    
    // Build items list
    let itemsList = '';
    items.slice(0, 3).forEach(item => {
        itemsList += `<div class="ccl-result-item"><span>${item.name} ×${item.qty}</span><span>$${item.total.toFixed(2)}</span></div>`;
    });
    if (items.length > 3) {
        itemsList += `<div class="ccl-result-item"><span>+${items.length - 3} more items</span></div>`;
    }
    
    document.getElementById('results-content').innerHTML = `
        <div class="ccl-result-item">
            <span class="ccl-result-label">Service:</span>
            <span class="ccl-result-value">Steam Clean</span>
        </div>
        ${itemsList}
        <div class="ccl-result-item">
            <span class="ccl-result-label">Subtotal:</span>
            <span class="ccl-result-value">$${finalSubtotal.toFixed(2)}</span>
        </div>
        <div class="ccl-total">
            <div>Total Due</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            ${depositPaid ? `Deposit paid: -$${depositAmount}<br>` : ''}
            <small>Min: $${minCharge} • Tax: $${tax.toFixed(2)}</small>
        </div>
    `;
}

// CAMPER CALCULATION
function calculateCamper(id) {
    const camper = priceData.campers.find(c => c.id === id);
    if (!camper) return;
    
    const tax = camper.price * 0.05;
    const total = camper.price + tax;
    
    document.getElementById('results-content').innerHTML = `
        <div class="ccl-result-item">
            <span class="ccl-result-label">Service:</span>
            <span class="ccl-result-value">Camper Clean</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Package:</span>
            <span class="ccl-result-value">${camper.size}</span>
        </div>
        <div class="ccl-result-item">
            <span class="ccl-result-label">Price:</span>
            <span class="ccl-result-value">$${camper.price.toFixed(2)}</span>
        </div>
        <div class="ccl-total">
            <div>Total Due</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            <small>Includes: ${camper.includes}</small><br>
            <small>Tax: $${tax.toFixed(2)}</small>
        </div>
    `;
}

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToSection = scrollToSection;
window.toggleFAQ = toggleFAQ;
window.switchService = switchService;
window.setMaintenanceRate = setMaintenanceRate;
window.setMoveoutSize = setMoveoutSize;
window.setDeepSize = setDeepSize;
window.setSqft = setSqft;
window.adjustValue = adjustValue;
window.updateMaintenanceSlider = updateMaintenanceSlider;
window.updateSteamStairs = updateSteamStairs;
window.toggleSteamItem = toggleSteamItem;
window.selectCamper = selectCamper;
window.calculateMaintenance = calculateMaintenance;
window.calculateMoveout = calculateMoveout;
window.calculateDeep = calculateDeep;
window.calculateSteam = calculateSteam;
window.calculateCamper = calculateCamper;