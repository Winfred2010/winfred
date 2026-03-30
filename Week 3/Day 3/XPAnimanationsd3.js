
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    //Timer Logic (Part I, II, III)
    // ==========================================
    const container = document.getElementById("container");
    const clearBtn = document.getElementById("clear");

    // Part I: Delayed Alert (2 seconds)
    setTimeout(() => {
        alert("Hello World");
    }, 2000);

    // Part II: Delayed Paragraph (2 seconds)
    setTimeout(() => {
        const p = document.createElement("p");
        p.textContent = "Hello World - Part II";
        container.appendChild(p);
    }, 2000);

    // Part III: Interval Addition (Every 2 seconds)
    const addParagraph = () => {
        const p = document.createElement("p");
        p.textContent = "Hello World - Repeated";
        container.appendChild(p);

        // Auto-stop if there are 5 paragraphs
        const pCount = container.querySelectorAll("p").length;
        if (pCount >= 5) {
            console.log("Reached 5 paragraphs. Interval cleared.");
            clearInterval(myInterval);
        }
    };

    let myInterval = setInterval(addParagraph, 2000);

    // Manual clear on button click
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            clearInterval(myInterval);
            console.log("Interval cleared by user.");
        });
    }

    // ==========================================
    // Move the Box Logic
    // ==========================================
    const animateBtn = document.querySelector("button[onclick='myMove()']");
    
    //  We remove the 'onclick' from HTML and use an Event Listener
    if (animateBtn) {
        // We remove the attribute to prevent double-triggering
        animateBtn.removeAttribute("onclick");
        animateBtn.addEventListener("click", myMove);
    }

    function myMove() {
        const box = document.getElementById("animate");
        const area = document.getElementById("container");
        
        let pos = 0;
        
        // Calculate the maximum distance the box can travel
        const limit = area.offsetWidth - box.offsetWidth;

        const moveInterval = setInterval(() => {
            if (pos >= limit) {
                clearInterval(moveInterval);
            } else {
                pos++;
                box.style.left = pos + "px";
            }
        }, 1); // 1ms for high-speed, smooth movement
    }
});