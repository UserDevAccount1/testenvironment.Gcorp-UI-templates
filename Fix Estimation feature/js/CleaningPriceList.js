// ClientCleaningPriceList.js
let priceData = null;
let currentService = 'maintenance';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPriceData();
    initializeSteamItems();
    initializeCamperPackages();
    calculateMaintenance(); // Default calculation
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

// Switch between services
function switchClientService(service) {
    currentService = service;
    
    // Update tabs
    document.querySelectorAll('.ccl-service-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`tab-${service}`).classList.add('active');
    
    // Update forms
    document.querySelectorAll('.ccl-estimator-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`estimator-${service}`).classList.add('active');
    
    // Calculate appropriate estimate
    if (service === 'maintenance') calculateMaintenance();
    if (service === 'moveout') calculateMoveout();
    if (service === 'deep') calculateDeep();
    if (service === 'steam') calculateSteam();
    if (service === 'camper') {
        // Select first camper by default
        setTimeout(() => {
            const firstCamper = document.querySelector('.ccl-camper-card');
            if (firstCamper) {
                selectCamper(firstCamper.dataset.id);
            }
        }, 100);
    }
}

// Initialize Steam Clean Items
function initializeSteamItems() {
    const container = document.getElementById('steam-items-container');
    if (!container || !priceData) return;
    
    container.innerHTML = priceData.steamClean.map(item => `
        <div class="ccl-item-card">
            <div class="ccl-item-name">${item.item}</div>
            <div class="ccl-item-size">${item.size}</div>
            <div class="ccl-item-controls">
                <input type="checkbox" class="steam-checkbox" data-id="${item.id}" data-price="${item.price}" onchange="calculateSteam()">
                <input type="number" class="steam-qty" data-id="${item.id}" value="1" min="1" style="width:60px;" onchange="calculateSteam()">
                <span class="ccl-item-price">$${item.price}</span>
            </div>
        </div>
    `).join('');
}

// Initialize Camper Packages
function initializeCamperPackages() {
    const container = document.getElementById('camper-packages-container');
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

// Update slider displays
function updateMaintenanceSlider(value, type) {
    document.getElementById(`client-${type}-display`).textContent = value;
    calculateMaintenance();
}

// Update stairs
function updateStairs(value) {
    document.getElementById('client-stairs-display').textContent = value;
    const price = Math.min(value * (priceData?.metadata?.stairPrice || 5), priceData?.metadata?.maxStairPrice || 75);
    document.getElementById('client-stairs-price').textContent = price;
    calculateSteam();
}

// MAINTENANCE CALCULATION
function calculateMaintenance() {
    const type = document.querySelector('input[name="maintenance-type"]:checked').value;
    const rate = type === 'residential' ? priceData.rates.residential : priceData.rates.commercial;
    const minHours = type === 'residential' ? priceData.rates.maintenanceMin : priceData.rates.commercialMin;
    
    // Calculate hours
    let totalHours = 0;
    
    // Kitchen
    const kitchenLarge = document.getElementById('client-kitchen-large').checked ? priceData.rates.roomBase.kitchenLarge : 0;
    const kitchenExtra = parseFloat(document.getElementById('client-kitchen-extra').value) || 0;
    totalHours += priceData.rates.roomBase.kitchen + kitchenLarge + kitchenExtra;
    
    // Bedrooms
    const bedrooms = parseInt(document.getElementById('client-bedrooms').value) || 0;
    const largeBedrooms = parseInt(document.getElementById('client-large-bedrooms').value) || 0;
    totalHours += (bedrooms * priceData.rates.roomBase.bedroom) + (largeBedrooms * priceData.rates.roomBase.bedroomLarge);
    
    // Bathrooms
    const bathrooms = parseInt(document.getElementById('client-bathrooms').value) || 0;
    const largeBathrooms = parseInt(document.getElementById('client-large-bathrooms').value) || 0;
    totalHours += (bathrooms * priceData.rates.roomBase.bathroom) + (largeBathrooms * priceData.rates.roomBase.bathroomLarge);
    
    // Entryway
    const entryExtra = parseFloat(document.getElementById('client-entry-extra').value) || 0;
    totalHours += priceData.rates.roomBase.entry + entryExtra;
    
    // Apply minimum
    const appliedHours = Math.max(totalHours, minHours);
    const cost = appliedHours * rate;
    const tax = cost * 0.05;
    const total = cost + tax;
    
    // Staff allocation
    const perStaff = appliedHours / priceData.rates.cleaners;
    
    // Build results HTML
    const results = `
        <div class="ccl-results-card">
            <h3>🧼 Maintenance Clean Estimate</h3>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Service Type:</span>
                <span class="ccl-result-value">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Rate:</span>
                <span class="ccl-result-value">$${rate}/hour</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Calculated Hours:</span>
                <span class="ccl-result-value">${totalHours.toFixed(2)} hrs</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Minimum Applied:</span>
                <span class="ccl-result-value">${minHours} hrs</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Final Hours:</span>
                <span class="ccl-result-value">${appliedHours.toFixed(2)} hrs</span>
            </div>
        </div>
        <div class="ccl-total">
            <div>Total Estimate</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            <strong>👥 Staff Allocation:</strong> ${perStaff.toFixed(2)} hours per cleaner (${priceData.rates.cleaners} cleaners)
        </div>
        <div class="ccl-staff-note" style="margin-top:10px;">
            ⏱️ Travel time included in total hours<br>
            💰 Tax (5%): $${tax.toFixed(2)}
        </div>
    `;
    
    document.getElementById('maintenance-results').innerHTML = results;
}

// MOVE OUT CALCULATION
function calculateMoveout() {
    const size = document.getElementById('client-moveout-size').value;
    const sqft = parseFloat(document.getElementById('client-moveout-sqft').value) || 0;
    const rate = priceData.rates.moveoutRate;
    
    const baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
    const factor = priceData.rates.sqftFactors[size];
    
    const sqftHours = sqft / factor;
    const estimatedHours = Math.max(baseHours, sqftHours);
    const minHours = priceData.rates.moveoutMin || 6;
    const appliedHours = Math.max(estimatedHours, minHours);
    
    const cost = appliedHours * rate;
    const tax = cost * 0.05;
    const total = cost + tax;
    const perStaff = appliedHours / priceData.rates.cleaners;
    
    const results = `
        <div class="ccl-results-card">
            <h3>📦 Move Out Clean Estimate</h3>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Home Size:</span>
                <span class="ccl-result-value">${size.charAt(0).toUpperCase() + size.slice(1)}</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Square Footage:</span>
                <span class="ccl-result-value">${sqft} sqft</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Rate:</span>
                <span class="ccl-result-value">$${rate}/hour</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Base Hours:</span>
                <span class="ccl-result-value">${baseHours} hrs</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">SQFT Calculation:</span>
                <span class="ccl-result-value">${sqft} ÷ ${factor} = ${sqftHours.toFixed(2)} hrs</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Final Hours:</span>
                <span class="ccl-result-value">${appliedHours.toFixed(2)} hrs</span>
            </div>
        </div>
        <div class="ccl-total">
            <div>Total Estimate</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            <strong>👥 Staff Allocation:</strong> ${perStaff.toFixed(2)} hours per cleaner
        </div>
        <div class="ccl-staff-note" style="margin-top:10px;">
            ⏱️ Travel time included<br>
            💰 Tax (5%): $${tax.toFixed(2)}
        </div>
    `;
    
    document.getElementById('moveout-results').innerHTML = results;
}

// DEEP CLEAN CALCULATION
function calculateDeep() {
    const size = document.getElementById('client-deep-size').value;
    const sqft = parseFloat(document.getElementById('client-deep-sqft').value) || 0;
    const rate = priceData.rates.deepRate;
    
    const baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
    const factor = priceData.rates.sqftFactors[size];
    
    const sqftHours = sqft / factor;
    const estimatedHours = Math.max(baseHours, sqftHours);
    const minHours = priceData.rates.deepMin || 6;
    const appliedHours = Math.max(estimatedHours, minHours);
    
    const cost = appliedHours * rate;
    const tax = cost * 0.05;
    const total = cost + tax;
    const perStaff = appliedHours / priceData.rates.cleaners;
    
    const results = `
        <div class="ccl-results-card">
            <h3>🔨 Deep Clean Estimate</h3>
            <div class="ccl-badge" style="margin-bottom:15px;">AUTOMATIC DEEP CLEAN SERVICE</div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Home Size:</span>
                <span class="ccl-result-value">${size.charAt(0).toUpperCase() + size.slice(1)}</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Square Footage:</span>
                <span class="ccl-result-value">${sqft} sqft</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Rate:</span>
                <span class="ccl-result-value">$${rate}/hour</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Final Hours:</span>
                <span class="ccl-result-value">${appliedHours.toFixed(2)} hrs</span>
            </div>
        </div>
        <div class="ccl-total">
            <div>Total Estimate</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            <strong>👥 Staff Allocation:</strong> ${perStaff.toFixed(2)} hours per cleaner
        </div>
        <div class="ccl-staff-note" style="margin-top:10px;">
            ⏱️ Travel time included<br>
            💰 Tax (5%): $${tax.toFixed(2)}
        </div>
    `;
    
    document.getElementById('deep-results').innerHTML = results;
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
        items.push({ name: item.item, qty, price, total: itemTotal });
    });
    
    // Stairs
    const stairs = parseInt(document.getElementById('client-stairs').value) || 0;
    const stairPrice = Math.min(stairs * (priceData.metadata.stairPrice || 5), priceData.metadata.maxStairPrice || 75);
    if (stairs > 0) {
        subtotal += stairPrice;
        items.push({ name: 'Stair Flight', qty: stairs, price: stairPrice / stairs, total: stairPrice });
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
    const depositPaid = document.getElementById('client-deposit').checked;
    const depositAmount = priceData.metadata.depositAmount || 120;
    if (depositPaid) {
        total -= depositAmount;
    }
    
    // Build items list HTML
    let itemsList = '';
    items.forEach(item => {
        itemsList += `
            <div class="ccl-result-item">
                <span class="ccl-result-label">${item.name} ×${item.qty}:</span>
                <span class="ccl-result-value">$${item.total.toFixed(2)}</span>
            </div>
        `;
    });
    
    const results = `
        <div class="ccl-results-card">
            <h3>🔥 Steam Clean Estimate</h3>
            ${itemsList}
            ${subtotal < minCharge && items.length > 0 ? `
                <div class="ccl-result-item">
                    <span class="ccl-result-label">Minimum Applied:</span>
                    <span class="ccl-result-value">$${minCharge}</span>
                </div>
            ` : ''}
        </div>
        <div class="ccl-total">
            <div>Total Estimate</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            ${depositPaid ? `💰 Deposit paid: -$${depositAmount}<br>` : ''}
            💵 Subtotal: $${finalSubtotal.toFixed(2)}<br>
            💰 Tax (5%): $${tax.toFixed(2)}
        </div>
    `;
    
    document.getElementById('steam-results').innerHTML = results;
}

// CAMPER CALCULATION
function calculateCamper(id) {
    const camper = priceData.campers.find(c => c.id === id);
    if (!camper) return;
    
    const tax = camper.price * 0.05;
    const total = camper.price + tax;
    
    const results = `
        <div class="ccl-results-card">
            <h3>🚐 Camper Clean Estimate</h3>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Package:</span>
                <span class="ccl-result-value">${camper.size}</span>
            </div>
            <div class="ccl-result-item">
                <span class="ccl-result-label">Includes:</span>
                <span class="ccl-result-value">${camper.includes}</span>
            </div>
        </div>
        <div class="ccl-total">
            <div>Total Estimate</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="ccl-staff-note">
            💰 Price: $${camper.price.toFixed(2)}<br>
            💰 Tax (5%): $${tax.toFixed(2)}
        </div>
    `;
    
    document.getElementById('camper-results').innerHTML = results;
}

// Make functions globally available
window.switchClientService = switchClientService;
window.calculateMaintenance = calculateMaintenance;
window.calculateMoveout = calculateMoveout;
window.calculateDeep = calculateDeep;
window.calculateSteam = calculateSteam;
window.calculateCamper = calculateCamper;
window.selectCamper = selectCamper;
window.updateMaintenanceSlider = updateMaintenanceSlider;
window.updateStairs = updateStairs;