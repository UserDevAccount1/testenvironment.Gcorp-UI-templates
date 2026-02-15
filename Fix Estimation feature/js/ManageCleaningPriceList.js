// ManageCleaningPriceList.js - Complete version with all original data and floating estimator
let currentData = null;
let activeFloatTab = 'maintenance';

// Load data from localStorage
function loadData() {
  try {
    const saved = localStorage.getItem('cleaningPriceList');
    if (saved) {
      currentData = JSON.parse(saved);
    } else {
      // Default data structure with all original information
      currentData = {
        steamClean: [
          { id: '1', item: "CARPETS - LARGE ROOM", size: "10x10", price: 75, notes: "1 bedroom = 1.5 hours" },
          { id: '2', item: "CARPETS - REGULAR ROOM", size: "8x8", price: 60, notes: "" },
          { id: '3', item: "CARPETS - SMALL ROOM", size: "5x5", price: 55, notes: "" },
          { id: '4', item: "RUG - AREA RUG", size: "Standard", price: 30, notes: "" },
          { id: '5', item: "RUG - SMALL RUG", size: "Standard", price: 25, notes: "" },
          { id: '6', item: "WALK IN CLOSET - LARGE", size: "Large", price: 50, notes: "" },
          { id: '7', item: "WALK IN CLOSET - SMALL", size: "Small", price: 35, notes: "" },
          { id: '8', item: "STAIRFLIGHT", size: "Per flight", price: 5, notes: "$75 maximum, depends on stairs (1,2,3,4,5)" },
          { id: '9', item: "WALLS", size: "Standard", price: 100, notes: "" },
          { id: '10', item: "SMALL CHAIR/BAR STOOL", size: "Standard", price: 20, notes: "" },
          { id: '11', item: "COUCH", size: "Standard", price: 100, notes: "" },
          { id: '12', item: "LOVE SEAT", size: "Standard", price: 75, notes: "" },
          { id: '13', item: "MATTRESS", size: "Standard", price: 100, notes: "" },
          { id: '14', item: "HALLWAY", size: "Standard", price: 35, notes: "" },
          { id: '15', item: "LANDING", size: "Standard", price: 25, notes: "" }
        ],
        campers: [
          { id: 'c1', size: "SMALL CAMPER (up to 20FT)", price: 120, includes: "ONE COUCH, ONE BED, ONE LIVING ROOM CARPET" },
          { id: 'c2', size: "MEDIUM CAMPER (up to 27FT)", price: 220, includes: "ONE COUCH, ONE SEATING COUCH, ONE BED, LIVING ROOM CARPET" },
          { id: 'c3', size: "LARGE CAMPER (27FT+)", price: 290, includes: "TWO COUCHES, KITCHEN COUCH, LIVING AREA, ONE BED" }
        ],
        rules: [
          { id: 'r1', name: "Minimum Steam Clean", rule: "$114 + 5% tax = $120 minimum" },
          { id: 'r2', name: "First-time Deposit", rule: "$120 deposit required for first-time clients" },
          { id: 'r3', name: "Staff List", rule: "DORA, ESTHER F, HAWA, MANUEL, MARIE, OPHI, SHANIA, SHANTELLE, THERESA" },
          { id: 'r4', name: "Maintenance Minimum", rule: "3 hours minimum for 2 cleaners" },
          { id: 'r5', name: "Move Out Minimum", rule: "6 hours minimum for 2 cleaners" },
          { id: 'r6', name: "Travel Time", rule: "Travel time included in total booking hours" },
          { id: 'r7', name: "Staff Allocation", rule: "Total hours divided equally between 2 staff members (e.g., 10 hours = 5 hours per staff)" },
          { id: 'r8', name: "Steam Clean Note", rule: "If client avails steam clean, mention total cost and break it down if needed" },
          { id: 'r9', name: "Assessment Note", rule: "Based on cleaner assessment - final pricing may be adjusted after on-site visit" },
          { id: 'r10', name: "Deep Clean Type", rule: "AUTOMATIC CLEANING TYPE IS DEEP CLEAN" },
          { id: 'r11', name: "Carpet Note", rule: "1 bedroom = 1½ hour for carpet cleaning" }
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
          lastUpdated: new Date().toISOString(),
          version: "1.0",
          minSteamCharge: 114,
          depositAmount: 120,
          stairPrice: 5,
          maxStairPrice: 75,
          staffList: "DORA, ESTHER F, HAWA, MANUEL, MARIE, OPHI, SHANIA, SHANTELLE, THERESA"
        },
        notes: {
          maintenance: "Our standard rate is $38/hour for residential cleaning, with a 3-hour minimum per booking. If client avails steam clean, mention total cost and break it down if needed. Based on cleaner assessment.",
          moveout: "Let the client know the total estimated hours and that this will be divided between two staff members (e.g., 10 hours = 5 hours per staff). Mention the total cost and break it down if needed.",
          deep: "AUTOMATIC CLEANING TYPE IS DEEP CLEAN. Minimum service 6 hours for two cleaners. Travel time included in total booking hours."
        }
      };
    }
  } catch (e) {
    console.error('Error loading data:', e);
    currentData = null;
  }
}

// Save data to localStorage
function saveData(showNotification = true) {
  if (!currentData) return;
  
  currentData.metadata.lastUpdated = new Date().toISOString();
  localStorage.setItem('cleaningPriceList', JSON.stringify(currentData));
  
  if (showNotification) {
    showSaveStatus('Changes saved successfully!');
  }
  
  // Trigger update in other tabs
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'cleaningPriceList',
    newValue: JSON.stringify(currentData)
  }));
}

// Show save notification
function showSaveStatus(message) {
  const status = document.getElementById('saveStatus');
  status.style.display = 'block';
  status.textContent = message;
  status.style.background = '#27ae60';
  
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}

// Toggle floating test estimator
function toggleTestEstimator() {
  const estimator = document.getElementById('floatingEstimator');
  if (estimator.style.display === 'none' || estimator.style.display === '') {
    estimator.style.display = 'block';
    loadFloatData();
  } else {
    estimator.style.display = 'none';
  }
}

// Load data into floating estimator
function loadFloatData() {
  updateFloatRates();
  renderFloatSteamItems();
  renderFloatCamperPackages();
  calculateFloatMaintenance();
}

// Update rate displays in float
function updateFloatRates() {
  const resRate = document.getElementById('floatResidentialRate');
  const comRate = document.getElementById('floatCommercialRate');
  if (resRate) resRate.textContent = currentData.rates.residential;
  if (comRate) comRate.textContent = currentData.rates.commercial;
}

// Render steam items in float
function renderFloatSteamItems() {
  const container = document.getElementById('floatSteamItems');
  if (!container) return;
  
  const items = currentData.steamClean.filter(item => item.item !== "STAIRFLIGHT");
  
  container.innerHTML = items.map(item => `
    <div class="mcpl-float-item">
      <label>
        <input type="checkbox" class="float-steam-checkbox" data-id="${item.id}" data-price="${item.price}" onchange="calculateFloatSteam()">
        <strong>${item.item}</strong> - ${item.size} - $${item.price}
      </label>
      <input type="number" class="float-steam-qty" data-id="${item.id}" value="1" min="1" style="width:60px;" onchange="calculateFloatSteam()">
    </div>
  `).join('');
}

// Render camper packages in float
function renderFloatCamperPackages() {
  const container = document.getElementById('floatCamperPackages');
  if (!container) return;
  
  container.innerHTML = currentData.campers.map(camper => `
    <div class="mcpl-camper-option" onclick="selectFloatCamper('${camper.id}')">
      <input type="radio" name="floatCamper" value="${camper.id}" onchange="calculateFloatCamper('${camper.id}')">
      <strong>${camper.size}</strong> - $${camper.price}
      <br><small>${camper.includes}</small>
    </div>
  `).join('');
}

// Switch floating tab
function switchFloatTab(tab) {
  activeFloatTab = tab;
  
  document.querySelectorAll('.mcpl-float-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mcpl-float-tab-content').forEach(c => c.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(`float-${tab}`).classList.add('active');
  
  // Calculate based on active tab
  if (tab === 'maintenance') calculateFloatMaintenance();
  if (tab === 'moveout') calculateFloatMoveout();
  if (tab === 'deep') calculateFloatDeep();
  if (tab === 'steam') calculateFloatSteam();
  if (tab === 'camper') calculateFloatCamper();
}

// Calculate maintenance in float
function calculateFloatMaintenance() {
  const type = document.getElementById('floatMaintenanceType').value;
  const rate = type === 'residential' ? currentData.rates.residential : currentData.rates.commercial;
  const minHours = type === 'residential' ? currentData.rates.maintenanceMin : currentData.rates.commercialMin;
  
  // Calculate hours
  let totalHours = 0;
  
  // Kitchen
  const kitchenBase = currentData.rates.roomBase.kitchen;
  const kitchenLarge = document.getElementById('floatKitchenLarge').checked ? currentData.rates.roomBase.kitchenLarge : 0;
  const kitchenExtra = parseFloat(document.getElementById('floatKitchenExtra').value) || 0;
  document.getElementById('floatKitchenExtraDisplay').textContent = kitchenExtra.toFixed(1);
  totalHours += kitchenBase + kitchenLarge + kitchenExtra;
  
  // Bedrooms
  const bedrooms = parseInt(document.getElementById('floatBedrooms').value) || 0;
  const largeBedrooms = parseInt(document.getElementById('floatLargeBedrooms').value) || 0;
  const bedroomBase = currentData.rates.roomBase.bedroom;
  const bedroomLarge = currentData.rates.roomBase.bedroomLarge;
  totalHours += (bedrooms * bedroomBase) + (largeBedrooms * bedroomLarge);
  
  // Bathrooms
  const bathrooms = parseInt(document.getElementById('floatBathrooms').value) || 0;
  const largeBathrooms = parseInt(document.getElementById('floatLargeBathrooms').value) || 0;
  const bathroomBase = currentData.rates.roomBase.bathroom;
  const bathroomLarge = currentData.rates.roomBase.bathroomLarge;
  totalHours += (bathrooms * bathroomBase) + (largeBathrooms * bathroomLarge);
  
  // Entryway
  const entryBase = currentData.rates.roomBase.entry;
  const entryExtra = parseFloat(document.getElementById('floatEntryExtra').value) || 0;
  document.getElementById('floatEntryExtraDisplay').textContent = entryExtra.toFixed(1);
  totalHours += entryBase + entryExtra;
  
  // Apply minimum
  const appliedHours = Math.max(totalHours, minHours);
  const cost = appliedHours * rate;
  const tax = cost * 0.05;
  const total = cost + tax;
  
  // Staff allocation
  const perStaff = appliedHours / currentData.rates.cleaners;
  
  const result = `
    <h4>🧼 Maintenance Clean Quotation</h4>
    <p><strong>Service Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
    <p><strong>Rate:</strong> $${rate}/hour</p>
    <p><strong>Calculated Hours:</strong> ${totalHours.toFixed(2)} hrs</p>
    <p><strong>Minimum Applied:</strong> ${minHours} hrs</p>
    <p><strong>Final Hours:</strong> ${appliedHours.toFixed(2)} hrs</p>
    <p><strong>Staff Allocation:</strong> ${perStaff.toFixed(2)} hrs per staff (${currentData.rates.cleaners} cleaners)</p>
    <p><strong>Example:</strong> ${appliedHours.toFixed(2)} hours = ${perStaff.toFixed(2)} hours per staff member</p>
    <hr>
    <p><strong>Subtotal:</strong> $${cost.toFixed(2)}</p>
    <p><strong>Tax (5%):</strong> $${tax.toFixed(2)}</p>
    <p><strong>TOTAL DUE:</strong> $${total.toFixed(2)}</p>
    <p class="mcpl-note">${currentData.notes.maintenance}</p>
  `;
  
  document.getElementById('floatMaintenanceResult').innerHTML = result;
  updateQuotationBreakdown('maintenance', { type, rate, totalHours, appliedHours, cost, tax, total, perStaff });
}

// Calculate move out in float
function calculateFloatMoveout() {
  const size = document.getElementById('floatMoveoutSize').value;
  const sqft = parseFloat(document.getElementById('floatMoveoutSqft').value) || 0;
  const rate = parseFloat(document.getElementById('floatMoveoutRate').value) || currentData.rates.moveoutRate;
  
  const baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
  const factor = size === 'small' ? currentData.rates.sqftFactors.small : 
                 size === 'medium' ? currentData.rates.sqftFactors.medium : 
                 currentData.rates.sqftFactors.large;
  
  const sqftHours = sqft / factor;
  const estimatedHours = Math.max(baseHours, sqftHours);
  const minHours = currentData.rates.moveoutMin || 6;
  const appliedHours = Math.max(estimatedHours, minHours);
  
  const cost = appliedHours * rate;
  const tax = cost * 0.05;
  const total = cost + tax;
  
  // Staff allocation
  const perStaff = appliedHours / currentData.rates.cleaners;
  
  const result = `
    <h4>📦 Move Out Clean Quotation</h4>
    <p><strong>Home Size:</strong> ${size.charAt(0).toUpperCase() + size.slice(1)}</p>
    <p><strong>Square Footage:</strong> ${sqft} sqft</p>
    <p><strong>Rate:</strong> $${rate}/hour</p>
    <p><strong>Base Hours:</strong> ${baseHours} hrs</p>
    <p><strong>SQFT Calculation:</strong> ${sqft} ÷ ${factor} = ${sqftHours.toFixed(2)} hrs</p>
    <p><strong>Estimated Hours:</strong> ${estimatedHours.toFixed(2)} hrs</p>
    <p><strong>Minimum Applied:</strong> ${minHours} hrs</p>
    <p><strong>Final Hours:</strong> ${appliedHours.toFixed(2)} hrs</p>
    <p><strong>Staff Allocation:</strong> ${perStaff.toFixed(2)} hrs per staff (${currentData.rates.cleaners} cleaners)</p>
    <p><strong>Example:</strong> ${appliedHours.toFixed(2)} hours = ${perStaff.toFixed(2)} hours per staff member</p>
    <hr>
    <p><strong>Subtotal:</strong> $${cost.toFixed(2)}</p>
    <p><strong>Tax (5%):</strong> $${tax.toFixed(2)}</p>
    <p><strong>TOTAL DUE:</strong> $${total.toFixed(2)}</p>
    <p class="mcpl-note">${currentData.notes.moveout}</p>
  `;
  
  document.getElementById('floatMoveoutResult').innerHTML = result;
  updateQuotationBreakdown('moveout', { size, sqft, rate, baseHours, sqftHours, estimatedHours, appliedHours, cost, tax, total, perStaff });
}

// Calculate deep clean in float
function calculateFloatDeep() {
  const size = document.getElementById('floatDeepSize').value;
  const sqft = parseFloat(document.getElementById('floatDeepSqft').value) || 0;
  const rate = parseFloat(document.getElementById('floatDeepRate').value) || currentData.rates.deepRate;
  
  const baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
  const factor = size === 'small' ? currentData.rates.sqftFactors.small : 
                 size === 'medium' ? currentData.rates.sqftFactors.medium : 
                 currentData.rates.sqftFactors.large;
  
  const sqftHours = sqft / factor;
  const estimatedHours = Math.max(baseHours, sqftHours);
  const minHours = currentData.rates.deepMin || 6;
  const appliedHours = Math.max(estimatedHours, minHours);
  
  const cost = appliedHours * rate;
  const tax = cost * 0.05;
  const total = cost + tax;
  
  // Staff allocation
  const perStaff = appliedHours / currentData.rates.cleaners;
  
  const result = `
    <h4>🔨 Deep Clean Quotation</h4>
    <p><strong>⚠️ AUTOMATIC CLEANING TYPE IS DEEP CLEAN</strong></p>
    <p><strong>Home Size:</strong> ${size.charAt(0).toUpperCase() + size.slice(1)}</p>
    <p><strong>Square Footage:</strong> ${sqft} sqft</p>
    <p><strong>Rate:</strong> $${rate}/hour</p>
    <p><strong>Base Hours:</strong> ${baseHours} hrs</p>
    <p><strong>SQFT Calculation:</strong> ${sqft} ÷ ${factor} = ${sqftHours.toFixed(2)} hrs</p>
    <p><strong>Estimated Hours:</strong> ${estimatedHours.toFixed(2)} hrs</p>
    <p><strong>Minimum Applied:</strong> ${minHours} hrs</p>
    <p><strong>Final Hours:</strong> ${appliedHours.toFixed(2)} hrs</p>
    <p><strong>Staff Allocation:</strong> ${perStaff.toFixed(2)} hrs per staff (${currentData.rates.cleaners} cleaners)</p>
    <p><strong>Example:</strong> ${appliedHours.toFixed(2)} hours = ${perStaff.toFixed(2)} hours per staff member</p>
    <hr>
    <p><strong>Subtotal:</strong> $${cost.toFixed(2)}</p>
    <p><strong>Tax (5%):</strong> $${tax.toFixed(2)}</p>
    <p><strong>TOTAL DUE:</strong> $${total.toFixed(2)}</p>
    <p class="mcpl-note">${currentData.notes.deep}</p>
  `;
  
  document.getElementById('floatDeepResult').innerHTML = result;
  updateQuotationBreakdown('deep', { size, sqft, rate, baseHours, sqftHours, estimatedHours, appliedHours, cost, tax, total, perStaff });
}

// Calculate steam in float
function calculateFloatSteam() {
  let subtotal = 0;
  const items = [];
  
  // Get checked items
  document.querySelectorAll('.float-steam-checkbox:checked').forEach(cb => {
    const id = cb.dataset.id;
    const price = parseFloat(cb.dataset.price);
    const qty = parseInt(document.querySelector(`.float-steam-qty[data-id="${id}"]`).value) || 1;
    const itemTotal = price * qty;
    subtotal += itemTotal;
    
    const item = currentData.steamClean.find(i => i.id === id);
    items.push({ name: item.item, size: item.size, qty, price, total: itemTotal });
  });
  
  // Stairs
  const stairs = parseInt(document.getElementById('floatStairs').value) || 0;
  const stairPrice = Math.min(stairs * (currentData.metadata.stairPrice || 5), currentData.metadata.maxStairPrice || 75);
  if (stairs > 0) {
    subtotal += stairPrice;
    items.push({ name: 'STAIRFLIGHT', qty: stairs, price: stairPrice / stairs, total: stairPrice });
  }
  
  // Apply minimum
  const minCharge = currentData.metadata.minSteamCharge || 114;
  let finalSubtotal = subtotal;
  let breakdownNote = '';
  
  if (items.length > 0 && subtotal < minCharge) {
    finalSubtotal = minCharge;
    breakdownNote = `Minimum charge applied: $${minCharge} (original subtotal was $${subtotal.toFixed(2)})`;
  }
  
  const tax = finalSubtotal * 0.05;
  let total = finalSubtotal + tax;
  
  // Deposit
  const depositPaid = document.getElementById('floatDeposit').checked;
  const depositAmount = currentData.metadata.depositAmount || 120;
  if (depositPaid) {
    total -= depositAmount;
  }
  
  // Build result
  let itemsList = '';
  items.forEach(item => {
    itemsList += `<p><strong>${item.name}</strong> ${item.size ? '(' + item.size + ')' : ''} ×${item.qty} = $${item.total.toFixed(2)}</p>`;
  });
  
  const result = `
    <h4>🔥 Steam Clean Quotation</h4>
    ${itemsList}
    ${breakdownNote ? `<p class="mcpl-note" style="background: #fff3cd; padding: 5px;">${breakdownNote}</p>` : ''}
    <hr>
    <p><strong>Subtotal:</strong> $${finalSubtotal.toFixed(2)}</p>
    <p><strong>Tax (5%):</strong> $${tax.toFixed(2)}</p>
    ${depositPaid ? `<p><strong>Deposit Paid (First-time client):</strong> -$${depositAmount.toFixed(2)}</p>` : ''}
    <p><strong>TOTAL DUE:</strong> $${total.toFixed(2)}</p>
    <p class="mcpl-note">Note: $114 minimum + 5% tax = $120. First-time clients pay $120 deposit.</p>
  `;
  
  document.getElementById('floatSteamResult').innerHTML = result;
  updateQuotationBreakdown('steam', { items, subtotal, finalSubtotal, tax, total, depositPaid, depositAmount });
}

// Calculate camper in float
function calculateFloatCamper(id) {
  const selected = document.querySelector('input[name="floatCamper"]:checked');
  if (!selected) return;
  
  const camperId = selected.value;
  const camper = currentData.campers.find(c => c.id === camperId);
  if (!camper) return;
  
  const tax = camper.price * 0.05;
  const total = camper.price + tax;
  
  const result = `
    <h4>🚐 Camper Clean Quotation</h4>
    <p><strong>Package:</strong> ${camper.size}</p>
    <p><strong>Includes:</strong> ${camper.includes}</p>
    <p><strong>Price:</strong> $${camper.price.toFixed(2)}</p>
    <hr>
    <p><strong>Tax (5%):</strong> $${tax.toFixed(2)}</p>
    <p><strong>TOTAL DUE:</strong> $${total.toFixed(2)}</p>
    <p class="mcpl-note">Minimum for any service: $120</p>
  `;
  
  document.getElementById('floatCamperResult').innerHTML = result;
  updateQuotationBreakdown('camper', { camper, tax, total });
}

// Update quotation breakdown
function updateQuotationBreakdown(type, data) {
  const breakdown = document.getElementById('breakdownContent');
  
  let html = `<p><strong>Service Type:</strong> ${type.toUpperCase()} Clean</p>`;
  html += `<p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>`;
  html += `<p><strong>Quotation Breakdown:</strong></p>`;
  
  if (type === 'maintenance') {
    html += `
      <p>Rate: $${data.rate}/hr (${data.type})</p>
      <p>Total Hours: ${data.appliedHours.toFixed(2)} hrs</p>
      <p>Staff Allocation: ${data.perStaff.toFixed(2)} hrs per staff</p>
      <p>Subtotal: $${data.cost.toFixed(2)}</p>
      <p>Tax: $${data.tax.toFixed(2)}</p>
      <p><strong>FINAL TOTAL: $${data.total.toFixed(2)}</strong></p>
    `;
  } else if (type === 'moveout' || type === 'deep') {
    html += `
      <p>Home Size: ${data.size}</p>
      <p>Square Footage: ${data.sqft} sqft</p>
      <p>Rate: $${data.rate}/hr</p>
      <p>Calculation: Base ${data.baseHours} hrs + SQFT adjustment</p>
      <p>Final Hours: ${data.appliedHours.toFixed(2)} hrs</p>
      <p>Staff Allocation: ${data.perStaff.toFixed(2)} hrs per staff</p>
      <p>Subtotal: $${data.cost.toFixed(2)}</p>
      <p>Tax: $${data.tax.toFixed(2)}</p>
      <p><strong>FINAL TOTAL: $${data.total.toFixed(2)}</strong></p>
    `;
  } else if (type === 'steam') {
    html += `<p>Items Selected: ${data.items.length}</p>`;
    data.items.forEach(item => {
      html += `<p>• ${item.name}: ${item.qty} × $${item.price} = $${item.total.toFixed(2)}</p>`;
    });
    html += `
      <p>Subtotal: $${data.finalSubtotal.toFixed(2)}</p>
      <p>Tax: $${data.tax.toFixed(2)}</p>
      ${data.depositPaid ? `<p>Deposit Paid: -$${data.depositAmount.toFixed(2)}</p>` : ''}
      <p><strong>FINAL TOTAL: $${data.total.toFixed(2)}</strong></p>
    `;
  } else if (type === 'camper') {
    html += `
      <p>Package: ${data.camper.size}</p>
      <p>Includes: ${data.camper.includes}</p>
      <p>Price: $${data.camper.price.toFixed(2)}</p>
      <p>Tax: $${data.tax.toFixed(2)}</p>
      <p><strong>FINAL TOTAL: $${data.total.toFixed(2)}</strong></p>
    `;
  }
  
  breakdown.innerHTML = html;
}

// Switch tabs function
function switchTab(tabName) {
  document.querySelectorAll('.mcpl-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  document.querySelectorAll('.mcpl-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`tab-${tabName}`).classList.add('active');
  
  if (tabName === 'steam') renderSteamItems();
  if (tabName === 'camper') renderCamperItems();
  if (tabName === 'rules') renderRules();
  if (tabName === 'rates') loadRateValues();
  if (tabName === 'testing') runAllTests();
}

// Render steam items
function renderSteamItems() {
  const tbody = document.getElementById('steamItemsBody');
  if (!tbody || !currentData) return;
  
  tbody.innerHTML = currentData.steamClean.map(item => `
    <tr data-id="${item.id}">
      <td><span class="view-mode">${item.item}</span>
        <input class="mcpl-edit-input edit-mode" style="display:none;" value="${item.item}"></td>
      <td><span class="view-mode">${item.size}</span>
        <input class="mcpl-edit-input edit-mode" style="display:none;" value="${item.size}"></td>
      <td><span class="view-mode">$${item.price}</span>
        <input class="mcpl-edit-input edit-mode" style="display:none;" type="number" step="0.01" value="${item.price}"></td>
      <td><span class="view-mode">${item.notes || ''}</span>
        <input class="mcpl-edit-input edit-mode" style="display:none;" value="${item.notes || ''}"></td>
      <td class="mcpl-actions">
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-primary view-mode" onclick="editItem('${item.id}')">✏️ Edit</button>
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-success edit-mode" style="display:none;" onclick="saveItem('${item.id}')">💾 Save</button>
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-danger" onclick="deleteItem('${item.id}', 'steam')">🗑️ Delete</button>
      </td>
    </tr>
  `).join('');
}

// Render camper items
function renderCamperItems() {
  const tbody = document.getElementById('camperItemsBody');
  if (!tbody || !currentData) return;
  
  tbody.innerHTML = currentData.campers.map(item => `
    <tr data-id="${item.id}">
      <td><span class="view-mode">${item.size}</span>
        <input class="mcpl-edit-input edit-mode" style="display:none;" value="${item.size}"></td>
      <td><span class="view-mode">$${item.price}</span>
        <input class="mcpl-edit-input edit-mode" style="display:none;" type="number" step="0.01" value="${item.price}"></td>
      <td><span class="view-mode">${item.includes}</span>
        <input class="mcpl-edit-input edit-mode" style="display:none;" value="${item.includes}"></td>
      <td class="mcpl-actions">
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-primary view-mode" onclick="editItem('${item.id}')">✏️ Edit</button>
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-success edit-mode" style="display:none;" onclick="saveItem('${item.id}')">💾 Save</button>
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-danger" onclick="deleteItem('${item.id}', 'camper')">🗑️ Delete</button>
      </td>
    </tr>
  `).join('');
}

// Render rules
function renderRules() {
  const list = document.getElementById('rulesList');
  if (!list || !currentData) return;
  
  list.innerHTML = currentData.rules.map(rule => `
    <div class="mcpl-rule-item" data-id="${rule.id}">
      <div class="mcpl-rule-content">
        <h4>${rule.name}</h4>
        <p>${rule.rule}</p>
      </div>
      <div>
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-primary" onclick="editRule('${rule.id}')">✏️ Edit</button>
        <button class="mcpl-btn mcpl-btn-small mcpl-btn-danger" onclick="deleteRule('${rule.id}')">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

// Load rate values
function loadRateValues() {
  if (!currentData || !currentData.rates) return;
  
  const rates = currentData.rates;
  const meta = currentData.metadata;
  
  document.getElementById('residentialRate').value = rates.residential || 38;
  document.getElementById('commercialRate').value = rates.commercial || 44;
  document.getElementById('deepRate').value = rates.deepRate || 38;
  document.getElementById('maintenanceMinHours').value = rates.maintenanceMin || 3;
  document.getElementById('commercialMinHours').value = rates.commercialMin || 6;
  document.getElementById('deepMinHours').value = rates.deepMin || 6;
  document.getElementById('maintenanceCleaners').value = rates.cleaners || 2;
  document.getElementById('deepCleaners').value = rates.cleaners || 2;
  
  document.getElementById('minSteamCharge').value = meta.minSteamCharge || 114;
  document.getElementById('depositAmount').value = meta.depositAmount || 120;
  document.getElementById('stairPrice').value = meta.stairPrice || 5;
  document.getElementById('maxStairPrice').value = meta.maxStairPrice || 75;
  updateMinTotal();
  
  // Room base hours
  if (rates.roomBase) {
    document.getElementById('kitchenBase').value = rates.roomBase.kitchen || 4;
    document.getElementById('kitchenLarge').value = rates.roomBase.kitchenLarge || 1.5;
    document.getElementById('bedroomBase').value = rates.roomBase.bedroom || 1;
    document.getElementById('bedroomLarge').value = rates.roomBase.bedroomLarge || 0.5;
    document.getElementById('bathroomBase').value = rates.roomBase.bathroom || 2.5;
    document.getElementById('bathroomLarge').value = rates.roomBase.bathroomLarge || 1;
    document.getElementById('entryBase').value = rates.roomBase.entry || 0.5;
  }
}

// Update minimum total display
function updateMinTotal() {
  const min = parseFloat(document.getElementById('minSteamCharge').value) || 114;
  const total = min * 1.05;
  document.getElementById('minTotalDisplay').textContent = total.toFixed(2);
}

// Edit item
function editItem(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (!row) return;
  
  row.querySelectorAll('.view-mode').forEach(el => el.style.display = 'none');
  row.querySelectorAll('.edit-mode').forEach(el => el.style.display = 'block');
}

// Save item
function saveItem(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (!row || !currentData) return;
  
  const inputs = row.querySelectorAll('.edit-mode');
  const isSteam = row.closest('#steamItemsBody') !== null;
  
  if (isSteam) {
    const item = currentData.steamClean.find(i => i.id === id);
    if (item) {
      item.item = inputs[0].value;
      item.size = inputs[1].value;
      item.price = parseFloat(inputs[2].value) || 0;
      item.notes = inputs[3].value;
    }
  } else {
    const item = currentData.campers.find(i => i.id === id);
    if (item) {
      item.size = inputs[0].value;
      item.price = parseFloat(inputs[1].value) || 0;
      item.includes = inputs[2].value;
    }
  }
  
  saveData();
  
  if (isSteam) {
    renderSteamItems();
  } else {
    renderCamperItems();
  }
}

// Delete item
function deleteItem(id, type) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  if (type === 'steam') {
    currentData.steamClean = currentData.steamClean.filter(i => i.id !== id);
    renderSteamItems();
  } else {
    currentData.campers = currentData.campers.filter(i => i.id !== id);
    renderCamperItems();
  }
  
  saveData();
}

// Add steam item
function addSteamItem() {
  const newId = Date.now().toString();
  currentData.steamClean.push({
    id: newId,
    item: "NEW ITEM",
    size: "Standard",
    price: 0,
    notes: ""
  });
  
  renderSteamItems();
  saveData();
  
  setTimeout(() => editItem(newId), 100);
}

// Add camper item
function addCamperItem() {
  const newId = 'c' + Date.now().toString();
  currentData.campers.push({
    id: newId,
    size: "NEW CAMPER SIZE",
    price: 0,
    includes: "Description"
  });
  
  renderCamperItems();
  saveData();
  
  setTimeout(() => editItem(newId), 100);
}

// Add rule
function addRule() {
  const name = prompt('Enter rule name:');
  if (!name) return;
  
  const rule = prompt('Enter rule description:');
  if (!rule) return;
  
  const newId = 'r' + Date.now().toString();
  currentData.rules.push({
    id: newId,
    name: name,
    rule: rule
  });
  
  renderRules();
  saveData();
}

// Edit rule
function editRule(id) {
  const rule = currentData.rules.find(r => r.id === id);
  if (!rule) return;
  
  const newName = prompt('Edit rule name:', rule.name);
  if (newName) rule.name = newName;
  
  const newRule = prompt('Edit rule description:', rule.rule);
  if (newRule) rule.rule = newRule;
  
  renderRules();
  saveData();
}

// Delete rule
function deleteRule(id) {
  if (!confirm('Delete this rule?')) return;
  
  currentData.rules = currentData.rules.filter(r => r.id !== id);
  renderRules();
  saveData();
}

// Update minimum charge
function updateMinCharge() {
  const min = parseFloat(document.getElementById('minSteamCharge').value);
  if (isNaN(min)) return;
  
  currentData.metadata.minSteamCharge = min;
  updateMinTotal();
  saveData();
}

// Update deposit
function updateDeposit() {
  const deposit = parseFloat(document.getElementById('depositAmount').value);
  if (isNaN(deposit)) return;
  
  currentData.metadata.depositAmount = deposit;
  saveData();
}

// Update stair price
function updateStairPrice() {
  const price = parseFloat(document.getElementById('stairPrice').value);
  if (isNaN(price)) return;
  
  currentData.metadata.stairPrice = price;
  saveData();
}

// Update max stair price
function updateMaxStairPrice() {
  const max = parseFloat(document.getElementById('maxStairPrice').value);
  if (isNaN(max)) return;
  
  currentData.metadata.maxStairPrice = max;
  saveData();
}

// Update staff list
function updateStaffList() {
  const staffText = document.getElementById('staffList').value;
  
  const staffRule = currentData.rules.find(r => r.name === "Staff List");
  if (staffRule) {
    staffRule.rule = staffText;
  } else {
    currentData.rules.push({
      id: 'r' + Date.now().toString(),
      name: "Staff List",
      rule: staffText
    });
  }
  
  currentData.metadata.staffList = staffText;
  saveData();
  alert('Staff list updated!');
}

// Save all rates
function saveAllRates() {
  if (!currentData.rates) currentData.rates = {};
  if (!currentData.rates.roomBase) currentData.rates.roomBase = {};
  
  currentData.rates.residential = parseFloat(document.getElementById('residentialRate').value) || 38;
  currentData.rates.commercial = parseFloat(document.getElementById('commercialRate').value) || 44;
  currentData.rates.deepRate = parseFloat(document.getElementById('deepRate').value) || 38;
  currentData.rates.maintenanceMin = parseFloat(document.getElementById('maintenanceMinHours').value) || 3;
  currentData.rates.commercialMin = parseFloat(document.getElementById('commercialMinHours').value) || 6;
  currentData.rates.deepMin = parseFloat(document.getElementById('deepMinHours').value) || 6;
  currentData.rates.cleaners = parseInt(document.getElementById('maintenanceCleaners').value) || 2;
  
  currentData.rates.roomBase.kitchen = parseFloat(document.getElementById('kitchenBase').value) || 4;
  currentData.rates.roomBase.kitchenLarge = parseFloat(document.getElementById('kitchenLarge').value) || 1.5;
  currentData.rates.roomBase.bedroom = parseFloat(document.getElementById('bedroomBase').value) || 1;
  currentData.rates.roomBase.bedroomLarge = parseFloat(document.getElementById('bedroomLarge').value) || 0.5;
  currentData.rates.roomBase.bathroom = parseFloat(document.getElementById('bathroomBase').value) || 2.5;
  currentData.rates.roomBase.bathroomLarge = parseFloat(document.getElementById('bathroomLarge').value) || 1;
  currentData.rates.roomBase.entry = parseFloat(document.getElementById('entryBase').value) || 0.5;
  
  saveData();
  alert('All rates saved successfully!');
}

// Run all tests
function runAllTests() {
  testMaintenanceCalculation();
  testMoveoutCalculation();
  testDeepCalculation();
  testSteamCalculation();
}

// Test maintenance calculation
function testMaintenanceCalculation() {
  const type = document.getElementById('testMaintenanceType').value;
  const rate = type === 'residential' ? currentData.rates.residential : currentData.rates.commercial;
  const minHours = type === 'residential' ? currentData.rates.maintenanceMin : currentData.rates.commercialMin;
  
  let totalHours = 0;
  
  totalHours += currentData.rates.roomBase.kitchen;
  if (document.getElementById('testKitchenLarge').checked) {
    totalHours += currentData.rates.roomBase.kitchenLarge;
  }
  
  const bedrooms = parseInt(document.getElementById('testBedrooms').value) || 0;
  const largeBedrooms = parseInt(document.getElementById('testLargeBedrooms').value) || 0;
  totalHours += (bedrooms * currentData.rates.roomBase.bedroom) + (largeBedrooms * currentData.rates.roomBase.bedroomLarge);
  
  const bathrooms = parseInt(document.getElementById('testBathrooms').value) || 0;
  const largeBathrooms = parseInt(document.getElementById('testLargeBathrooms').value) || 0;
  totalHours += (bathrooms * currentData.rates.roomBase.bathroom) + (largeBathrooms * currentData.rates.roomBase.bathroomLarge);
  
  totalHours += currentData.rates.roomBase.entry;
  
  const appliedHours = Math.max(totalHours, minHours);
  const cost = appliedHours * rate;
  const tax = cost * 0.05;
  const total = cost + tax;
  const perStaff = appliedHours / currentData.rates.cleaners;
  
  const result = `
    <h4>Test Result - Maintenance Clean</h4>
    <p><strong>Service Type:</strong> ${type}</p>
    <p><strong>Calculated Hours:</strong> ${totalHours.toFixed(2)} hrs</p>
    <p><strong>Minimum Applied:</strong> ${minHours} hrs</p>
    <p><strong>Final Hours:</strong> ${appliedHours.toFixed(2)} hrs</p>
    <p><strong>Staff Allocation:</strong> ${perStaff.toFixed(2)} hrs per staff</p>
    <p><strong>Cost:</strong> $${cost.toFixed(2)}</p>
    <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
    <p><strong>TOTAL:</strong> $${total.toFixed(2)}</p>
  `;
  
  document.getElementById('maintenanceTestResult').innerHTML = result;
}

// Test moveout calculation
function testMoveoutCalculation() {
  const size = document.getElementById('testMoveoutSize').value;
  const sqft = parseFloat(document.getElementById('testMoveoutSqft').value) || 0;
  const rate = parseFloat(document.getElementById('testMoveoutRate').value) || currentData.rates.moveoutRate;
  
  const baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
  const factor = size === 'small' ? currentData.rates.sqftFactors.small : 
                 size === 'medium' ? currentData.rates.sqftFactors.medium : 
                 currentData.rates.sqftFactors.large;
  
  const sqftHours = sqft / factor;
  const estimatedHours = Math.max(baseHours, sqftHours);
  const minHours = currentData.rates.moveoutMin || 6;
  const appliedHours = Math.max(estimatedHours, minHours);
  
  const cost = appliedHours * rate;
  const tax = cost * 0.05;
  const total = cost + tax;
  const perStaff = appliedHours / currentData.rates.cleaners;
  
  const result = `
    <h4>Test Result - Move Out Clean</h4>
    <p><strong>Home Size:</strong> ${size}</p>
    <p><strong>SQFT:</strong> ${sqft}</p>
    <p><strong>Estimated Hours:</strong> ${estimatedHours.toFixed(2)} hrs</p>
    <p><strong>Final Hours:</strong> ${appliedHours.toFixed(2)} hrs</p>
    <p><strong>Staff Allocation:</strong> ${perStaff.toFixed(2)} hrs per staff</p>
    <p><strong>Cost:</strong> $${cost.toFixed(2)}</p>
    <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
    <p><strong>TOTAL:</strong> $${total.toFixed(2)}</p>
  `;
  
  document.getElementById('moveoutTestResult').innerHTML = result;
}

// Test deep calculation
function testDeepCalculation() {
  const size = document.getElementById('testDeepSize').value;
  const sqft = parseFloat(document.getElementById('testDeepSqft').value) || 0;
  const rate = parseFloat(document.getElementById('testDeepRate').value) || currentData.rates.deepRate;
  
  const baseHours = size === 'small' ? 7 : size === 'medium' ? 10 : 15;
  const factor = size === 'small' ? currentData.rates.sqftFactors.small : 
                 size === 'medium' ? currentData.rates.sqftFactors.medium : 
                 currentData.rates.sqftFactors.large;
  
  const sqftHours = sqft / factor;
  const estimatedHours = Math.max(baseHours, sqftHours);
  const minHours = currentData.rates.deepMin || 6;
  const appliedHours = Math.max(estimatedHours, minHours);
  
  const cost = appliedHours * rate;
  const tax = cost * 0.05;
  const total = cost + tax;
  const perStaff = appliedHours / currentData.rates.cleaners;
  
  const result = `
    <h4>Test Result - Deep Clean</h4>
    <p><strong>AUTOMATIC CLEANING TYPE IS DEEP CLEAN</strong></p>
    <p><strong>Home Size:</strong> ${size}</p>
    <p><strong>SQFT:</strong> ${sqft}</p>
    <p><strong>Estimated Hours:</strong> ${estimatedHours.toFixed(2)} hrs</p>
    <p><strong>Final Hours:</strong> ${appliedHours.toFixed(2)} hrs</p>
    <p><strong>Staff Allocation:</strong> ${perStaff.toFixed(2)} hrs per staff</p>
    <p><strong>Cost:</strong> $${cost.toFixed(2)}</p>
    <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
    <p><strong>TOTAL:</strong> $${total.toFixed(2)}</p>
  `;
  
  document.getElementById('deepTestResult').innerHTML = result;
}

// Test steam calculation
function testSteamCalculation() {
  let subtotal = 0;
  let items = [];
  
  const largeCarpets = parseInt(document.getElementById('testLargeCarpets').value) || 0;
  const regularCarpets = parseInt(document.getElementById('testRegularCarpets').value) || 0;
  const smallCarpets = parseInt(document.getElementById('testSmallCarpets').value) || 0;
  const areaRugs = parseInt(document.getElementById('testAreaRugs').value) || 0;
  const smallRugs = parseInt(document.getElementById('testSmallRugs').value) || 0;
  const largeCloset = parseInt(document.getElementById('testLargeCloset').value) || 0;
  const smallCloset = parseInt(document.getElementById('testSmallCloset').value) || 0;
  const stairs = parseInt(document.getElementById('testStairs').value) || 0;
  const walls = parseInt(document.getElementById('testWalls').value) || 0;
  const chairs = parseInt(document.getElementById('testChairs').value) || 0;
  const couches = parseInt(document.getElementById('testCouches').value) || 0;
  const loveSeats = parseInt(document.getElementById('testLoveSeats').value) || 0;
  const mattresses = parseInt(document.getElementById('testMattresses').value) || 0;
  const hallways = parseInt(document.getElementById('testHallways').value) || 0;
  const landings = parseInt(document.getElementById('testLandings').value) || 0;
  
  subtotal += largeCarpets * 75;
  subtotal += regularCarpets * 60;
  subtotal += smallCarpets * 55;
  subtotal += areaRugs * 30;
  subtotal += smallRugs * 25;
  subtotal += largeCloset * 50;
  subtotal += smallCloset * 35;
  subtotal += walls * 100;
  subtotal += chairs * 20;
  subtotal += couches * 100;
  subtotal += loveSeats * 75;
  subtotal += mattresses * 100;
  subtotal += hallways * 35;
  subtotal += landings * 25;
  
  const stairPrice = Math.min(stairs * (currentData.metadata.stairPrice || 5), currentData.metadata.maxStairPrice || 75);
  subtotal += stairPrice;
  
  const minCharge = currentData.metadata.minSteamCharge || 114;
  let finalSubtotal = subtotal;
  
  if (subtotal > 0 && subtotal < minCharge) {
    finalSubtotal = minCharge;
  }
  
  const tax = finalSubtotal * 0.05;
  let total = finalSubtotal + tax;
  
  if (document.getElementById('testDeposit').checked) {
    total -= (currentData.metadata.depositAmount || 120);
  }
  
  const result = `
    <h4>Test Result - Steam Clean</h4>
    <p><strong>Items Selected:</strong></p>
    ${largeCarpets > 0 ? `<p>Large Carpets: ${largeCarpets} × $75 = $${(largeCarpets * 75).toFixed(2)}</p>` : ''}
    ${regularCarpets > 0 ? `<p>Regular Carpets: ${regularCarpets} × $60 = $${(regularCarpets * 60).toFixed(2)}</p>` : ''}
    ${smallCarpets > 0 ? `<p>Small Carpets: ${smallCarpets} × $55 = $${(smallCarpets * 55).toFixed(2)}</p>` : ''}
    ${areaRugs > 0 ? `<p>Area Rugs: ${areaRugs} × $30 = $${(areaRugs * 30).toFixed(2)}</p>` : ''}
    ${smallRugs > 0 ? `<p>Small Rugs: ${smallRugs} × $25 = $${(smallRugs * 25).toFixed(2)}</p>` : ''}
    ${largeCloset > 0 ? `<p>Large Closets: ${largeCloset} × $50 = $${(largeCloset * 50).toFixed(2)}</p>` : ''}
    ${smallCloset > 0 ? `<p>Small Closets: ${smallCloset} × $35 = $${(smallCloset * 35).toFixed(2)}</p>` : ''}
    ${stairs > 0 ? `<p>Stairs: ${stairs} flights = $${stairPrice.toFixed(2)}</p>` : ''}
    ${walls > 0 ? `<p>Walls: ${walls} × $100 = $${(walls * 100).toFixed(2)}</p>` : ''}
    ${chairs > 0 ? `<p>Chairs: ${chairs} × $20 = $${(chairs * 20).toFixed(2)}</p>` : ''}
    ${couches > 0 ? `<p>Couches: ${couches} × $100 = $${(couches * 100).toFixed(2)}</p>` : ''}
    ${loveSeats > 0 ? `<p>Love Seats: ${loveSeats} × $75 = $${(loveSeats * 75).toFixed(2)}</p>` : ''}
    ${mattresses > 0 ? `<p>Mattresses: ${mattresses} × $100 = $${(mattresses * 100).toFixed(2)}</p>` : ''}
    ${hallways > 0 ? `<p>Hallways: ${hallways} × $35 = $${(hallways * 35).toFixed(2)}</p>` : ''}
    ${landings > 0 ? `<p>Landings: ${landings} × $25 = $${(landings * 25).toFixed(2)}</p>` : ''}
    <hr>
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    ${subtotal !== finalSubtotal ? `<p><strong>Minimum Applied:</strong> $${minCharge}</p>` : ''}
    <p><strong>Final Subtotal:</strong> $${finalSubtotal.toFixed(2)}</p>
    <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
    ${document.getElementById('testDeposit').checked ? `<p><strong>Deposit:</strong> -$${currentData.metadata.depositAmount}</p>` : ''}
    <p><strong>TOTAL:</strong> $${total.toFixed(2)}</p>
  `;
  
  document.getElementById('steamTestResult').innerHTML = result;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadData();
  renderSteamItems();
  renderCamperItems();
  renderRules();
  loadRateValues();
  
  document.getElementById('minSteamCharge').addEventListener('input', updateMinTotal);
});

// Make functions globally available
window.switchTab = switchTab;
window.toggleTestEstimator = toggleTestEstimator;
window.switchFloatTab = switchFloatTab;
window.calculateFloatMaintenance = calculateFloatMaintenance;
window.calculateFloatMoveout = calculateFloatMoveout;
window.calculateFloatDeep = calculateFloatDeep;
window.calculateFloatSteam = calculateFloatSteam;
window.calculateFloatCamper = calculateFloatCamper;
window.selectFloatCamper = function(id) {
  document.querySelectorAll('input[name="floatCamper"]').forEach(r => r.checked = false);
  document.getElementById(`floatCamperPackages`).querySelector(`input[value="${id}"]`).checked = true;
  calculateFloatCamper(id);
};
window.testMaintenanceCalculation = testMaintenanceCalculation;
window.testMoveoutCalculation = testMoveoutCalculation;
window.testDeepCalculation = testDeepCalculation;
window.testSteamCalculation = testSteamCalculation;
window.addSteamItem = addSteamItem;
window.addCamperItem = addCamperItem;
window.addRule = addRule;
window.editItem = editItem;
window.saveItem = saveItem;
window.deleteItem = deleteItem;
window.editRule = editRule;
window.deleteRule = deleteRule;
window.updateMinCharge = updateMinCharge;
window.updateDeposit = updateDeposit;
window.updateStairPrice = updateStairPrice;
window.updateMaxStairPrice = updateMaxStairPrice;
window.updateStaffList = updateStaffList;
window.saveAllRates = saveAllRates;