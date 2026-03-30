const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Switch to Sign Up mode
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

// Switch back to Sign In mode
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});