// ==========================================
// 🍫 Exercise 1 : Article Manipulation
// ==========================================

// 1. Retrieve the h1 and console.log it
const h1 = document.querySelector('article h1');
console.log("The H1 element:", h1);

// 2. Remove the last paragraph in the <article>
const article = document.querySelector('article');
const lastP = article.lastElementChild;
if (lastP && lastP.tagName === 'P') {
    lastP.remove();
}

// 3. Change H2 background to red on click
const h2 = document.querySelector('h2');
h2.addEventListener('click', () => {
    h2.style.backgroundColor = 'red';
});

// 4. Hide H3 on click
const h3 = document.querySelector('h3');
h3.addEventListener('click', () => {
    h3.style.display = 'none';
});

// 5. Add button to make paragraphs bold
const boldBtn = document.createElement('button');
boldBtn.textContent = "Make Text Bold";
article.appendChild(boldBtn);

boldBtn.addEventListener('click', () => {
    const allPs = document.querySelectorAll('p');
    allPs.forEach(p => p.style.fontWeight = 'bold');
});

// BONUS: H1 random font size on hover
h1.addEventListener('mouseover', () => {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = `${randomSize}px`;
});

// BONUS: 2nd paragraph fade out on hover
const secondP = document.querySelectorAll('p')[1];
if (secondP) {
    secondP.addEventListener('mouseover', () => {
        secondP.style.transition = "opacity 1s";
        secondP.style.opacity = "0";
    });
}


// ==========================================
// 📝 Exercise 2 : Work with Forms
// ==========================================

// 1. Retrieve the form
const userForm = document.querySelector('form');
console.log("The Form:", userForm);

// 2. Retrieve inputs by ID
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
console.log("Inputs by ID:", fnameInput, lnameInput);

// 3. Retrieve inputs by Name attribute
const fnameByName = document.getElementsByName('firstname')[0];
const lnameByName = document.getElementsByName('lastname')[0];
console.log("Inputs by Name:", fnameByName, lnameByName);

// 4. Handle Submit
userForm.addEventListener('submit', (event) => {
    // Why preventDefault? To stop the page from refreshing/reloading,
    // which allows us to process the data with JavaScript.
    event.preventDefault();

    const fValue = fnameInput.value.trim();
    const lValue = lnameInput.value.trim();
    const ul = document.querySelector('.usersAnswer');

    if (fValue !== "" && lValue !== "") {
        ul.innerHTML = ""; // Clear previous answers
        const liFirst = document.createElement('li');
        const liLast = document.createElement('li');
        
        liFirst.textContent = fValue;
        liLast.textContent = lValue;
        
        ul.append(liFirst, liLast);
    } else {
        alert("Please fill in both fields.");
    }
});


// ==========================================
// ✨ Exercise 3 : Transform the Sentence
// ==========================================

let allBoldItems;

function getBoldItems() {
    // Selects all <strong> elements within the paragraph
    allBoldItems = document.querySelectorAll('p strong');
}

function highlight() {
    allBoldItems.forEach(item => item.style.color = 'blue');
}

function returnItemsToDefault() {
    allBoldItems.forEach(item => item.style.color = 'black');
}

// Select the paragraph to attach listeners
const sentencesPara = document.querySelector('p');
getBoldItems(); // Initialize the list

sentencesPara.addEventListener('mouseover', highlight);
sentencesPara.addEventListener('mouseout', returnItemsToDefault);


// ==========================================
// 🧪 Exercise 4 : Volume of a Sphere
// ==========================================

const sphereForm = document.getElementById('MyForm');

sphereForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const radiusValue = document.getElementById('radius').value;
    const volumeInput = document.getElementById('volume');
    
    const r = parseFloat(radiusValue);

    if (!isNaN(r)) {
        // Formula: V = 4/3 * π * r³
        const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
        volumeInput.value = volume.toFixed(2); // Rounded to 2 decimals
    } else {
        alert("Please enter a valid numeric radius.");
    }
});