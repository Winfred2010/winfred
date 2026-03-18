def exercise_1_convert_lists():
    """Converts two lists into a dictionary."""
    keys = ['Ten', 'Twenty', 'Thirty']
    values = [10, 20, 30]
    
    # Using zip() is the most professional way to pair lists
    result = dict(zip(keys, values))
    print(f"List Conversion: {result}")

def exercise_2_cinemax():
    """Calculates movie ticket costs for a family dictionary."""
    family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}
    total_cost = 0

    print("--- Ticket Prices ---")
    for name, age in family.items():
        price = 0
        if 3 <= age <= 12:
            price = 10
        elif age > 12:
            price = 15
        
        print(f"{name.capitalize()}: ${price}")
        total_cost += price
        
    print(f"Total Family Cost: ${total_cost}")

def exercise_3_zara():
    """Manipulates a brand dictionary with various methods."""
    brand = {
        "name": "Zara",
        "creation_date": 1975,
        "creator_name": "Amancio Ortega Gaona",
        "type_of_clothes": ["men", "women", "children", "home"],
        "international_competitors": ["Gap", "H&M", "Benetton"],
        "number_stores": 7000,
        "major_color": {"France": "blue", "Spain": "red", "US": ["pink", "green"]}
    }

    # Modifications
    brand["number_stores"] = 2
    
    clients = ", ".join(brand["type_of_clothes"][:-1])
    print(f"Zara's clients include: {clients}.")
    
    brand["country_creation"] = "Spain"
    
    if "international_competitors" in brand:
        brand["international_competitors"].append("Desigual")
        
    brand.pop("creation_date")
    
    print(f"Last Competitor: {brand['international_competitors'][-1]}")
    print(f"US Colors: {brand['major_color']['US']}")
    print(f"Dictionary Size: {len(brand)} keys")
    print(f"Keys: {list(brand.keys())}")

    # Bonus: Merging
    more_on_zara = {"creation_date": 1975, "number_stores": 10000}
    brand.update(more_on_zara)
    print(f"Merged Dictionary Stores: {brand['number_stores']}")

def exercise_4_disney():
    """Generates specific dictionary patterns from a list."""
    users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

    # 1. Map characters to indices
    res1 = {user: i for i, user in enumerate(users)}
    
    # 2. Map indices to characters
    res2 = {i: user for i, user in enumerate(users)}
    
    # 3. Sorted alphabetically then mapped
    res3 = {user: i for i, user in enumerate(sorted(users))}

    print(f"Pattern 1: {res1}")
    print(f"Pattern 2: {res2}")
    print(f"Pattern 3: {res3}")

if __name__ == "__main__":
    exercise_1_convert_lists()
    print()
    exercise_2_cinemax()
    print()
    exercise_3_zara()
    print()
    exercise_4_disney()
