
# Production Data
coffee_inventory = {
    "espresso_roast": 18.50,
    "flat_white": 22.0,
    "cold_brew_nitro": 25.50,
    "colombian_pour_over": 28.0,
    "matcha_latte": 24.0
}

def display_inventory(inventory):
    """Render the current product list with currency formatting."""
    if not inventory:
        print("\n[System] The product inventory is currently empty.")
        return

    print("\n--- Current Menu Inventory ---")
    for product, rate in inventory.items():
        # Replace underscores with spaces and capitalize for display
        display_name = product.replace("_", " ").title()
        print(f"{display_name:<20} | {rate:>6.2f}₪")

def register_product(inventory):
    """Add a new product profile to the system."""
    product_name = input("Enter product identifier: ").strip().lower().replace(" ", "_")
    
    if product_name in inventory:
        print("[Error] This product identifier already exists in the system.")
        return

    try:
        rate = float(input(f"Assign rate for {product_name}: "))
        if rate < 0:
            print("[Error] Operational rates cannot be negative.")
            return
            
        inventory[product_name] = rate
        print(f"[Success] '{product_name}' has been registered.")
    except ValueError:
        print("[Error] Input rejected. Rate must be a numerical value.")

def modify_rate(inventory):
    """Update the pricing for an existing product."""
    product_name = input("Enter product to modify: ").strip().lower().replace(" ", "_")
    
    if product_name in inventory:
        try:
            new_rate = float(input(f"Enter updated rate for {product_name}: "))
            if new_rate < 0:
                print("[Error] Operational rates cannot be negative.")
                return
                
            inventory[product_name] = new_rate
            print("[System] Pricing record updated successfully.")
        except ValueError:
            print("[Error] Input rejected. Rate must be a numerical value.")
    else:
        print("[Error] Product record not found.")

def remove_product(inventory):
    """Permanently delete a product from the inventory."""
    product_name = input("Enter product to decommission: ").strip().lower().replace(" ", "_")
    
    if product_name in inventory:
        del inventory[product_name]
        print("[System] Product successfully decommissioned.")
    else:
        print("[Error] Product record not found.")

def render_interface():
    """Display the system command menu."""
    print("\nSystem Operations:")
    print("1. View Inventory")
    print("2. Register New Product")
    print("3. Modify Product Rate")
    print("4. Decommission Product")
    print("5. Terminate Session")

def execute_management_system():
    """Main execution loop for the management interface."""
    while True:
        render_interface()
        command = input("Selection > ").strip()

        if command == '1':
            display_inventory(coffee_inventory)
        elif command == '2':
            register_product(coffee_inventory)
        elif command == '3':
            modify_rate(coffee_inventory)
        elif command == '4':
            remove_product(coffee_inventory)
        elif command == '5':
            print("[System] Session terminated. Goodbye.")
            break
        else:
            print("[Error] Invalid selection. Please try again.")

if __name__ == "__main__":
    execute_management_system()
