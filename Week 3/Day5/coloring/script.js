const grid = document.getElementById('grid-container');
const palette = document.getElementById('palette');
const clearBtn = document.getElementById('clear-btn');

let currentColor = 'black';
let isDrawing = false;

// 1. Setup Palette Colors
const colors = [
    'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white', 'gray',
    'pink', 'brown', 'cyan', 'magenta', 'lime', 'olive', 'maroon', 'navy', 'teal',
    'silver', 'gold', 'indigo'
];
colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    swatch.style.backgroundColor = color;
    swatch.addEventListener('click', () => currentColor = color);
    palette.appendChild(swatch);
});

// 2. Generate Drawing Grid (2400 cells for 60x40)
for (let i = 0; i < 2400; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Drawing Logic
    cell.addEventListener('mousedown', () => {
        isDrawing = true;
        cell.style.backgroundColor = currentColor;
    });

    cell.addEventListener('mouseover', () => {
        if (isDrawing) cell.style.backgroundColor = currentColor;
    });

    grid.appendChild(cell);
}

// 3. Stop drawing when mouse is released anywhere
window.addEventListener('mouseup', () => isDrawing = false);

// 4. Clear Button Logic
clearBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.style.backgroundColor = 'white');
});