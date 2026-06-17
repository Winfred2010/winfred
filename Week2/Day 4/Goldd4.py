import json
import os

# ==========================================
#  BACKEND LOGIC (menu_manager.py)
# ==========================================
class MenuManager:
    """Handles data processing, file I/O, and menu modifications."""
    
    def __init__(self, file_path="restaurant_menu.json"):
        self.file_path = file_path
        self.menu = self._load_data()

    def _load_data(self):
        """Loads menu from JSON or creates a default if missing."""
        if not os.path.exists(self.file_path):
            # Default menu provided in instructions
            default_menu = {
                "items": [
                    {"name": "Vegetable soup", "price": 30},
                    {"name": "Hamburger", "price": 44.9},
                    {"name": "Milkshake", "price": 22.5},
                    {"name": "Artichoke", "price": 18},
                    {"name": "Beef stew", "price": 52.5}
                ]
            }
            with open(self.file_path, "w") as f:
                json.dump(default_menu, f, indent=4)
        
        with open(self.file_path, "r") as file:
            return json.load(file)

    def add_item(self, name, price):
        """Adds a new item to the local menu dictionary."""
        self.menu["items"].append({"name": name, "price": float(price)})

    def remove_item(self, name):
        """Removes an item by name using 'del'. Returns True if found."""
        for i, item in enumerate(self.menu["items"]):
            if item["name"].lower() == name.lower():
                del self.menu["items"][i]
                return True
        return False

    def save_to_file(self):
        """Writes current menu state back to the JSON file."""
        with open(self.file_path, "w") as file:
            json.dump(self.menu, file, indent=4)


# ==========================================
# USER INTERFACE (menu_editor.py)
# ==========================================
def show_restaurant_menu(manager):
    print("\n--- Current Restaurant Menu ---")
    for item in manager.menu["items"]:
        print(f"- {item['name']:<18} | ${item['price']:>5.2f}")

def add_item_ui(manager):
    name = input("Enter item name: ").strip()
    try:
        price = float(input("Enter item price: "))
        manager.add_item(name, price)
        print("Success: Item was added successfully.")
    except ValueError:
        print("Error: Invalid price entered.")

def remove_item_ui(manager):
    name = input("Enter item name to delete: ").strip()
    if manager.remove_item(name):
        print(f"Success: '{name}' was deleted successfully.")
    else:
        print(f"Error: '{name}' was not found in the menu.")

def main():
    manager = MenuManager()
    print("Welcome to the Restaurant Manager UI")
    
    while True:
        print("\n[V] View Menu | [A] Add Item | [D] Delete Item | [S] Save & Exit")
        choice = input("Select an option: ").upper()

        if choice == 'V':
            show_restaurant_menu(manager)
        elif choice == 'A':
            add_item_ui(manager)
        elif choice == 'D':
            remove_item_ui(manager)
        elif choice == 'S':
            manager.save_to_file()
            print("Changes saved to JSON. Program closed.")
            break
        else:
            print("Invalid input. Please choose V, A, D, or S.")

if __name__ == "__main__":
    main()
