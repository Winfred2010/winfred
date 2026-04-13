const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key from exchangerate-api.com
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

// Selectors
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const switchBtn = document.getElementById('switch-btn');
const resultText = document.getElementById('exchange-rate');
const finalAmountText = document.getElementById('final-amount');

// 1. Fetch Supported Currencies on load
async function init() {
    resultText.innerText = 'Loading currencies...';
    finalAmountText.innerText = ''; // Clear previous result
    try {
        const response = await fetch(`${BASE_URL}/codes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.result === 'success') {
            populateSelects(data.supported_codes);
            resultText.innerText = 'Select currencies to begin'; // Reset message after loading
        } else {
            resultText.innerText = 'Error: Could not load currencies.';
            console.error("API Error:", data['error-type']);
        }
    } catch (error) {
        resultText.innerText = 'Error loading currencies. Check your API key or network.';
        console.error("Error loading currencies:", error);
    }
}

function populateSelects(codes) {
    // Clear existing options before populating
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    codes.forEach(([code, name]) => {
        const option1 = new Option(`${code} - ${name}`, code);
        const option2 = new Option(`${code} - ${name}`, code);
        fromSelect.add(option1);
        toSelect.add(option2);
    });
    // Set defaults
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
}

// Perform Pair Conversion
async function convertCurrency() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = parseFloat(amountInput.value); // Parse amount to a float

    if (isNaN(amount) || amount <= 0) {
        resultText.innerText = 'Please enter a valid amount.';
        finalAmountText.innerText = '';
        return;
    }

    resultText.innerText = 'Converting...';
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<span class="spinner"></span> Converting...';
    finalAmountText.innerText = '';

    try {
        const response = await fetch(`${BASE_URL}/pair/${from}/${to}/${amount}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.result === 'success') {
            resultText.innerText = `1 ${from} = ${data.conversion_rate.toFixed(4)} ${to}`;
            finalAmountText.innerText = `${amount.toFixed(2)} ${from} = ${data.conversion_result.toFixed(2)} ${to}`;
        } else {
            resultText.innerText = `Error: ${data['error-type'].replace(/_/g, ' ')}`; // Display API error type
            finalAmountText.innerText = '';
            console.error("API Error:", data['error-type']);
        }
    } catch (error) {
        resultText.innerText = 'Conversion failed. Check your API key or network.';
        finalAmountText.innerText = '';
        console.error("Conversion failed:", error);
    } finally {
        convertBtn.disabled = false;
        convertBtn.innerText = 'Convert';
    }
}

// Switch Currencies (Bonus)
switchBtn.addEventListener('click', () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    convertCurrency(); // Re-run conversion immediately
});

convertBtn.addEventListener('click', convertCurrency);
window.addEventListener('load', init);