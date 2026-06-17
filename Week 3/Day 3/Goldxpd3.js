// ==========================================
// GENRES & OPTIONS
// ==========================================
const genreSelect = document.getElementById("genres");

//  Log initial value
console.log("Selected:", genreSelect.value);

//  Add and select 'Classic'
const classic = new Option("Classic", "classic");
classic.selected = true;
genreSelect.add(classic);


// ==========================================
//  COLOR REMOVER
// ==========================================
function removecolor() {
    const select = document.getElementById("colorSelect");
    if (select.selectedIndex !== -1) {
        select.remove(select.selectedIndex);
    }
}

const colorBtn = document.querySelector("input[type='button']");
if (colorBtn) colorBtn.onclick = removecolor;


// ==========================================
//  SHOPPING LIST
// ==========================================
const root = document.getElementById("root");
let shoppingList = [];

//  Create UI
const form = document.createElement("form");
const input = document.createElement("input");
const addBtn = document.createElement("button");
const clearBtn = document.createElement("button");
const listDisplay = document.createElement("ul");

addBtn.textContent = "AddItem";
clearBtn.textContent = "ClearAll";

//  Logic
const addItem = (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) {
        shoppingList.push(val);
        const li = document.createElement("li");
        li.textContent = val;
        listDisplay.appendChild(li);
        input.value = "";
    }
};

const clearAll = () => {
    shoppingList = [];
    listDisplay.innerHTML = "";
};

//  Assemble
addBtn.onclick = addItem;
clearBtn.onclick = clearAll;

form.append(input, addBtn);
if (root) root.append(form, clearBtn, listDisplay);
