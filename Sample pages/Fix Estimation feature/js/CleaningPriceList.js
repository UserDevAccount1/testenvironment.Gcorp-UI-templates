// CleaningPriceList.js - Unique namespace
const CleaningPriceList = (function() {
  // Private variables
  let priceData = null;
  let rulesData = null;

  // Default data structure
  const defaultData = {
    steamClean: [
      { item: "Carpets", size: "Large Room 10x10", price: 75, notes: "1 bedroom = 1.5 hours" },
      { item: "Carpets", size: "Regular Room 8x8", price: 60, notes: "" },
      { item: "Carpets", size: "Small Room 5x5", price: 55, notes: "" },
      { item: "Rug", size: "Area Rug", price: 30, notes: "" },
      { item: "Rug", size: "Small Rug", price: 25, notes: "" },
      { item: "Walk-in Closet", size: "Large", price: 50, notes: "" },
      { item: "Walk-in Closet", size: "Small", price: 35, notes: "" },
      { item: "Stair Flight", size: "Per flight (max $75)", price: 5, notes: "$5 per flight, maximum $75" },
      { item: "Walls", size: "Standard", price: 100, notes: "" },
      { item: "Small Chair/Bar Stool", size: "Standard", price: 20, notes: "" },
      { item: "Couch", size: "Standard", price: 100, notes: "" },
      { item: "Love Seat", size: "Standard", price: 75, notes: "" },
      { item: "Mattress", size: "Standard", price: 100, notes: "" },
      { item: "Hallway", size: "Standard", price: 35, notes: "" },
      { item: "Landing", size: "Standard", price: 25, notes: "" }
    ],
    campers: [
      { size: "Small (up to 20ft)", price: 120, includes: "One couch, one bed, one living room carpet" },
      { size: "Medium (up to 27ft)", price: 220, includes: "One couch, one seating couch, one bed, living room carpet" },
      { size: "Large (27ft+)", price: 290, includes: "Two couches, kitchen couch, living area, one bed" }
    ],
    rules: [
      { name: "Minimum Steam Clean", rule: "$114 + 5% tax = $120 minimum" },
      { name: "First-time Deposit", rule: "$120 deposit required for first-time clients" },
      { name: "Staff List", rule: "DORA, ESTHER F, HAWA, MANUEL, MARIE, OPHI, SHANIA, SHANTELLE, THERESA" },
      { name: "Maintenance Minimum", rule: "3 hours minimum for 2 cleaners" },
      { name: "Move Out Minimum", rule: "6 hours minimum for 2 cleaners" },
      { name: "Travel Time", rule: "Travel time included in total hours" }
    ],
    metadata: {
      lastUpdated: new Date().toISOString(),
      version: "1.0"
    }
  };

  // Load data from localStorage or use default
  function loadData() {
    try {
      const saved = localStorage.getItem('cleaningPriceList');
      if (saved) {
        priceData = JSON.parse(saved);
      } else {
        priceData = defaultData;
        saveData();
      }
    } catch (e) {
      console.error('Error loading data:', e);
      priceData = defaultData;
    }
  }

  // Save data to localStorage
  function saveData() {
    try {
      priceData.metadata.lastUpdated = new Date().toISOString();
      localStorage.setItem('cleaningPriceList', JSON.stringify(priceData));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }

  // Render steam clean table
  function renderSteamClean() {
    const tbody = document.getElementById('steamCleanBody');
    if (!tbody) return;

    tbody.innerHTML = priceData.steamClean.map(item => `
      <tr>
        <td>${item.item}</td>
        <td>${item.size}</td>
        <td><strong>$${item.price}</strong></td>
        <td><small>${item.notes || ''}</small></td>
      </tr>
    `).join('');
  }

  // Render camper table
  function renderCampers() {
    const tbody = document.getElementById('camperBody');
    if (!tbody) return;

    tbody.innerHTML = priceData.campers.map(camper => `
      <tr>
        <td>${camper.size}</td>
        <td><strong>$${camper.price}</strong></td>
        <td><small>${camper.includes}</small></td>
      </tr>
    `).join('');
  }

  // Render rules
  function renderRules() {
    const container = document.getElementById('rulesContainer');
    if (!container) return;

    container.innerHTML = priceData.rules.map(rule => `
      <div class="cpl-rule-item">
        <h4>${rule.name}</h4>
        <p>${rule.rule}</p>
      </div>
    `).join('');
  }

  // Update last updated timestamp
  function updateLastUpdated() {
    const element = document.getElementById('lastUpdated');
    if (element && priceData.metadata.lastUpdated) {
      const date = new Date(priceData.metadata.lastUpdated);
      element.textContent = `Last updated: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
  }

  // Public methods
  return {
    init: function() {
      loadData();
      renderSteamClean();
      renderCampers();
      renderRules();
      updateLastUpdated();
    },

    getPriceData: function() {
      return priceData;
    },

    refresh: function() {
      loadData();
      renderSteamClean();
      renderCampers();
      renderRules();
      updateLastUpdated();
    },

    // Method for management page to update data
    updateData: function(newData) {
      priceData = newData;
      saveData();
      this.refresh();
    }
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  CleaningPriceList.init();
});

// Listen for storage events (updates from management page)
window.addEventListener('storage', function(e) {
  if (e.key === 'cleaningPriceList') {
    CleaningPriceList.refresh();
  }
});