// ManageCleaningPriceList.js
let currentData = null;

// Load data from localStorage
function loadData() {
  try {
    const saved = localStorage.getItem('cleaningPriceList');
    if (saved) {
      currentData = JSON.parse(saved);
    } else {
      // Default data structure
      currentData = {
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
        rules: [
          { id: 'r1', name: "Minimum Steam Clean", rule: "$114 + 5% tax = $120 minimum" },
          { id: 'r2', name: "First-time Deposit", rule: "$120 deposit required for first-time clients" },
          { id: 'r3', name: "Staff List", rule: "DORA, ESTHER F, HAWA, MANUEL, MARIE, OPHI, SHANIA, SHANTELLE, THERESA" },
          { id: 'r4', name: "Maintenance Minimum", rule: "3 hours minimum for 2 cleaners" },
          { id: 'r5', name: "Move Out Minimum", rule: "6 hours minimum for 2 cleaners" }
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
          lastUpdated: new Date().toISOString(),
          version: "1.0",
          minSteamCharge: 114,
          depositAmount: 120
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

// Switch tabs
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.mcpl-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.mcpl-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`tab-${tabName}`).classList.add('active');
  
  // Refresh data for the tab
  if (tabName === 'steam') renderSteamItems();
  if (tabName === 'camper') renderCamperItems();
  if (tabName === 'rules') renderRules();
  if (tabName === 'rates') loadRateValues();
}

// Render steam items with edit functionality
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
  
  // Load staff list
  const staffRule = currentData.rules.find(r => r.name === "Staff List");
  if (staffRule) {
    document.getElementById('staffList').value = staffRule.rule;
  }
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
  document.getElementById('deepMinHours').value = rates.deepMin || 6;
  document.getElementById('maintenanceCleaners').value = rates.cleaners || 2;
  document.getElementById('deepCleaners').value = rates.cleaners || 2;
  
  document.getElementById('minSteamCharge').value = meta.minSteamCharge || 114;
  document.getElementById('depositAmount').value = meta.depositAmount || 120;
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
    item: "New Item",
    size: "Standard",
    price: 0,
    notes: ""
  });
  
  renderSteamItems();
  saveData();
  
  // Auto-edit the new item
  setTimeout(() => editItem(newId), 100);
}

// Add camper item
function addCamperItem() {
  const newId = 'c' + Date.now().toString();
  currentData.campers.push({
    id: newId,
    size: "New Size",
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
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadData();
  renderSteamItems();
  renderCamperItems();
  renderRules();
  loadRateValues();
  
  // Add input listener for min charge
  document.getElementById('minSteamCharge').addEventListener('input', updateMinTotal);
});

// Make functions globally available
window.switchTab = switchTab;
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
window.updateStaffList = updateStaffList;
window.saveAllRates = saveAllRates;