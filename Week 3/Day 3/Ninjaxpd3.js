/**
 * 🧮 TIP CALCULATOR
 */
document.getElementById("totalTip").style.display = "none";

function calculateTip() {
    const billAmount = document.getElementById("billAmt").value;
    const serviceQuality = document.getElementById("serviceQual").value;
    let numberOfPeople = document.getElementById("numOfPeople").value;

    if (serviceQuality == 0 || billAmount === "") {
        alert("Please enter the bill amount and service quality!");
        return;
    }

    const eachTag = document.getElementById("each");
    if (numberOfPeople === "" || numberOfPeople < 1) {
        numberOfPeople = 1;
        eachTag.style.display = "none";
    } else {
        eachTag.style.display = "block";
    }

    let total = (billAmount * serviceQuality) / numberOfPeople;
    total = total.toFixed(2);

    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").textContent = total;
}

document.getElementById("calculate").onclick = calculateTip;


/**
 * 📧 EMAIL VALIDATION
 */
const emailForm = document.querySelector("#emailForm");

function validateEmail(email) {
    // Manual logic: checks for @ and . in correct positions
    const atPos = email.indexOf("@");
    const dotPos = email.lastIndexOf(".");
    return (atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1);
}

if (emailForm) {
    emailForm.onsubmit = function(e) {
        e.preventDefault();
        const emailValue = document.querySelector('input[type="email"]').value;
        
        if (validateEmail(emailValue)) {
            console.log("Valid Email");
        } else {
            alert("Invalid Email");
        }
    };
}


/**
 * 🌍 GEOLOCATION
 */
function getLocation() {
    const output = document.getElementById("locationOutput");

    if (!navigator.geolocation) {
        output.textContent = "Geolocation not supported";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            output.innerHTML = `Latitude: ${lat} <br> Longitude: ${lon}`;
        },
        (error) => {
            output.textContent = `Error: ${error.message}`;
        }
    );
}

const geoBtn = document.getElementById("geoBtn");
if (geoBtn) {
    geoBtn.onclick = getLocation;
}