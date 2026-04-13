const API_KEY = 'YOUR_API_KEY';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

// Selectors
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const switchBtn = document.getElementById('switch-btn');
const resultText = document.getElementById('exchange-rate');
const finalAmountText = document.getElementById('final-amount');

// Fetch Supported Currencies on load
async function init() {
    try {
        const response = await fetch(`${BASE_URL}/codes`);
        const data = await response.json();
        
        if (data.result === 'success') {
            populateSelects(data.supported_codes);
        }
    } catch (error) {
        console.error("Error loading currencies:", error);
    }
}

function populateSelects(codes) {
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

//  Perform Pair Conversion
async function convertCurrency() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) return;

    try {
        const response = await fetch(`${BASE_URL}/pair/${from}/${to}/${amount}`);
        const data = await response.json();

        if (data.result === 'success') {
            resultText.innerText = `1 ${from} = ${data.conversion_rate.toFixed(4)} ${to}`;
            finalAmountText.innerText = `${amount} ${from} = ${data.conversion_result.toFixed(2)} ${to}`;
        }
    } catch (error) {
        console.error("Conversion failed:", error);
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
