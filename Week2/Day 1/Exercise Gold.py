import math
import random

# ==========================================
# Exercise 1: Circle
# ==========================================
class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * (self.radius ** 2)

    def definition(self):
        print("A circle is the set of all points in a plane that are at a given distance from a given point, the centre.")

# ==========================================
# Exercise 2: Custom List Class
# ==========================================
class MyList:
    def __init__(self, letters):
        self.letters = letters

    def get_reversed(self):
        return self.letters[::-1]

    def get_sorted(self):
        return sorted(self.letters)

    # Bonus: Random number list of same length
    def generate_random_list(self):
        return [random.randint(1, 100) for _ in range(len(self.letters))]

# ==========================================
# Exercise 3: Restaurant Menu Manager
# ==========================================
class MenuManager:
    def __init__(self):
        # Initial menu data
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]

    def add_item(self, name, price, spice, gluten):
        new_dish = {"name": name, "price": price, "spice": spice, "gluten": gluten}
        self.menu.append(new_dish)
        print(f"Added {name} to the menu.")

    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"] == name:
                dish.update({"price": price, "spice": spice, "gluten": gluten})
                print(f"Updated {name} details.")
                return
        print(f"Error: {name} is not in the menu.")

    def remove_item(self, name):
        for i, dish in enumerate(self.menu):
            if dish["name"] == name:
                del self.menu[i]
                print(f"Deleted {name}. Updated Menu: {self.menu}")
                return
        print(f"Error: {name} is not in the menu.")

# --- Testing the code ---

# Circle Test
print("--- Circle Test ---")
c = Circle(5)
print(f"Area: {c.area():.2f}")
c.definition()

# MyList Test
print("\n--- MyList Test ---")
my_list = MyList(['a', 'z', 'b', 'c'])
print(f"Reversed: {my_list.get_reversed()}")
print(f"Random List: {my_list.generate_random_list()}")

# MenuManager Test
print("\n--- Menu Manager Test ---")
manager = MenuManager()
manager.add_item("Taco", 12, "C", False)
manager.update_item("Salad", 20, "A", False)
manager.remove_item("Soup")
manager.remove_item("Pizza") # Test missing item
