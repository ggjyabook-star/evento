// State management
let selectedConnectivity = 'A'; // 'A' or 'B'
const basePrice = 16000;
const connectivityPrices = {
    'A': 0,
    'B': 1500
};

// Selection logic
function selectOption(option) {
    if (selectedConnectivity === option) return;
    
    selectedConnectivity = option;
    
    // UI Elements
    const cardA = document.getElementById('option-a-card');
    const cardB = document.getElementById('option-b-card');
    
    // Toggle active class with a subtle micro-animation transition
    if (option === 'A') {
        cardA.classList.add('active');
        cardB.classList.remove('active');
    } else {
        cardB.classList.add('active');
        cardA.classList.remove('active');
    }
    
    // Update price breakdown and totals
    updateSummary();
}

// Update UI text and totals based on state
function updateSummary() {
    const connectivityText = document.getElementById('selected-connectivity-text');
    const connectivityCostText = document.getElementById('connectivity-cost-text');
    const totalPriceText = document.getElementById('total-price');
    const mobileTotalPriceText = document.getElementById('mobile-total-price');
    
    const cost = connectivityPrices[selectedConnectivity];
    const total = basePrice + cost;
    
    // Format currency
    const formattedCost = cost === 0 ? '$0 MXN' : `+ $${cost.toLocaleString('es-MX')} MXN`;
    const formattedTotal = `$${total.toLocaleString('es-MX')} MXN`;
    
    // Set values
    if (selectedConnectivity === 'A') {
        connectivityText.textContent = 'Opción A: Red Hotel';
        connectivityCostText.textContent = formattedCost;
    } else {
        connectivityText.textContent = 'Opción B: Red Autónoma';
        connectivityCostText.textContent = formattedCost;
    }
    
    totalPriceText.textContent = formattedTotal;
    if (mobileTotalPriceText) {
        mobileTotalPriceText.textContent = formattedTotal;
    }
}

// PDF Export Functionality
function exportProposal() {
    // Dynamically change page title so the default saved filename is clean
    const originalTitle = document.title;
    const optionName = selectedConnectivity === 'A' ? 'Red_Hotel' : 'Red_Autonoma';
    document.title = `Cotizacion_MAW_Soluciones_Streaming_${optionName}`;
    
    // Trigger native printing (which scales to PDF automatically in modern browsers)
    window.print();
    
    // Restore original tab title
    document.title = originalTitle;
}

// Initialize summary on page load
document.addEventListener('DOMContentLoaded', () => {
    updateSummary();
});
