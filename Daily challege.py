class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        """
        Step 3 & 8: Adds animals to the dictionary. 
        Supports both single positional arguments and multiple keyword arguments.
        """
        # Handle the keyword arguments (Bonus Step 8)
        if kwargs:
            for a_type, a_count in kwargs.items():
                self.animals[a_type] = self.animals.get(a_type, 0) + a_count
        
        # Handle the original single positional argument (Step 3)
        if animal_type:
            self.animals[animal_type] = self.animals.get(animal_type, 0) + count

    def get_info(self):
        """Step 4: Returns a formatted string of the farm info."""
        info = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            info += f"{animal} : {count}\n"
        info += "\n    E-I-E-I-O!"
        return info

    def get_animal_types(self):
        """Step 6: Returns a sorted list of animal types."""
        return sorted(list(self.animals.keys()))

    def get_short_info(self):
        """Step 7: Returns a short summary with pluralization."""
        types = self.get_animal_types()
        plural_animals = []
        
        for a_type in types:
            # Add 's' if count > 1
            if self.animals[a_type] > 1:
                plural_animals.append(a_type + "s")
            else:
                plural_animals.append(a_type)
        
        # Formatting the list into "a, b and c"
        if len(plural_animals) > 1:
            animals_str = ", ".join(plural_animals[:-1]) + f" and {plural_animals[-1]}"
        else:
            animals_str = plural_animals[0]
            
        return f"{self.name}'s farm has {animals_str}."

# --- Testing the Code ---
macdonald = Farm("McDonald")

# Testing Step 3 & 8 (Bonus)
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
# Using kwargs bonus
macdonald.add_animal(goat=12)

print("--- Full Info ---")
print(macdonald.get_info())

print("\n--- Short Info ---")
print(macdonald.get_short_info())
