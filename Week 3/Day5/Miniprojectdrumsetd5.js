// 1. Core function to play sound
function playSound(e) {
    // Get keyCode from either keydown event or clicked element's data-key
    const keyCode = e.keyCode || e.currentTarget.getAttribute('data-key');
    
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return; // Exit if key pressed isn't mapped

    // Rewind to start (allows rapid fire clicking)
    audio.currentTime = 0;
    audio.play();

    // Visual feedback
    key.classList.add('playing');
}

// 2. Remove animation after it finishes
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

// 3. Event Listeners
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', playSound);
    key.addEventListener('transitionend', removeTransition);
});

window.addEventListener('keydown', playSound);
