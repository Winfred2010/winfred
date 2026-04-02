// =============================================================================
//  Pass By Value & Pass By Reference Challenge
// =============================================================================

// Initial data
let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
};

// =============================================================================
// Display Groceries (Arrow Function + forEach)
// =============================================================================

const displayGroceries = () => {
    console.group("Current Inventory");
    for (const [category, items] of Object.entries(groceries)) {
        if (Array.isArray(items)) {
            console.log(`--- ${category.toUpperCase()} ---`);
            items.forEach((item, index) => console.log(`${index + 1}. ${item}`));
        }
    }
    console.groupEnd();
};

// =============================================================================
// Clone Groceries (Pass by Value vs Pass by Reference)
// =============================================================================

const cloneGroceries = () => {
    console.group("Pass by Value vs. Pass by Reference Analysis");
    
    // -------------------------------------------------------------------------
    //  Copy client to user (PRIMITIVE - Pass by Value)
    // -------------------------------------------------------------------------
    let user = client;
    console.log(`\n📋 STEP 1: Primitive Copy (Pass by Value)`);
    console.log(`   Initial: client = "${client}", user = "${user}"`);
    
    // Change client
    client = "Betty";
    
    console.log(`   After client = "Betty":`);
    console.log(`   client = "${client}"`);
    console.log(`   user = "${user}"`);
    
    console.log(`\n   💡 QUESTION: Will user also change to "Betty"?`);
    console.log(`   ANSWER: NO! user is still "${user}"`);
    console.log(`   WHY: Strings are PRIMITIVES → Pass by VALUE`);
    console.log(`   When we did 'let user = client', we COPIED the value "John"`);
    console.log(`   user and client now point to SEPARATE memory locations`);
    console.log(`   Visual: client → "Betty" (new memory), user → "John" (original memory)`);
    
    // -------------------------------------------------------------------------
    // Copy groceries to shopping (OBJECT - Pass by Reference)
    // -------------------------------------------------------------------------
    let shopping = groceries;
    
    console.log(`\n${"─".repeat(60)}`);
    console.log(`📋 STEP 2: Object Copy (Pass by Reference)`);
    console.log(`   Initial: groceries.totalPrice = "${groceries.totalPrice}"`);
    console.log(`           shopping.totalPrice = "${shopping.totalPrice}"`);
    
    // Change totalPrice through shopping
    shopping.totalPrice = "35$";
    
    console.log(`   After shopping.totalPrice = "35$":`);
    console.log(`   shopping.totalPrice = "${shopping.totalPrice}"`);
    console.log(`   groceries.totalPrice = "${groceries.totalPrice}"`);
    
    console.log(`\n   💡 QUESTION: Will groceries.totalPrice also change?`);
    console.log(`   ANSWER: YES! groceries.totalPrice is also "${groceries.totalPrice}"`);
    console.log(`   WHY: Objects are pass by REFERENCE`);
    console.log(`   shopping and groceries point to the SAME memory location`);
    console.log(`   They are two names (references) for the SAME object!`);
    
    // -------------------------------------------------------------------------
    //  Change nested property (Pass by Reference continues)
    // -------------------------------------------------------------------------
    console.log(`\n${"─".repeat(60)}`);
    console.log(`📋 STEP 3: Nested Object Property`);
    console.log(`   Initial: groceries.other.paid = ${groceries.other.paid}`);
    console.log(`           shopping.other.paid = ${shopping.other.paid}`);
    
    // Change paid through shopping
    shopping.other.paid = false;
    
    console.log(`   After shopping.other.paid = false:`);
    console.log(`   shopping.other.paid = ${shopping.other.paid}`);
    console.log(`   groceries.other.paid = ${groceries.other.paid}`);
    
    console.log(`\n   💡 QUESTION: Will groceries.other.paid also change?`);
    console.log(`   ANSWER: YES! It's also ${groceries.other.paid}`);
    console.log(`   WHY: The nested 'other' object is ALSO shared`);
    console.log(`   (shallow reference - same object chain)`);
    
    // -------------------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------------------
    console.log(`\n${"=".repeat(60)}`);
    console.log("SUMMARY");
    console.log("=".repeat(60));
    console.log(`client: "${client}" (changed - reassigned)`);
    console.log(`user: "${user}" (unchanged - pass by value copy)`);
    console.log(`groceries.totalPrice: "${groceries.totalPrice}" (changed via reference!)`);
    console.log(`shopping.totalPrice: "${shopping.totalPrice}" (same object)`);
    console.log(`groceries.other.paid: ${groceries.other.paid} (changed via reference!)`);
    console.log(`shopping.other.paid: ${shopping.other.paid} (same object)`);
    console.log("=".repeat(60));
};

// =============================================================================
// EXECUTE FUNCTIONS
// =============================================================================

console.log("🚀 Starting JavaScript Challenge\n");

// Invoke displayGroceries
displayGroceries();

// Invoke cloneGroceries
cloneGroceries();

// Final verification
console.log("\n" + "=".repeat(60));
console.log("FINAL VERIFICATION (Global Scope)");
console.log("=".repeat(60));
console.log(`client: "${client}" (modified globally)`);
console.log(`groceries.totalPrice: "${groceries.totalPrice}" (was modified via reference)`);
console.log(`groceries.other.paid: ${groceries.other.paid} (was modified via reference)`);
console.log("=".repeat(60));