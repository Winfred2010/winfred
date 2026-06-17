def analyze_manufacturers():
    # 1. Convert string to list
    raw_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
    manufacturers = [name.strip() for name in raw_string.split(",")]

    # 2. Count companies
    print(f"There are {len(manufacturers)} manufacturers in the list.")

    # 3. Print in descending order (Z-A)
    descending = sorted(manufacturers, reverse=True)
    print(f"Descending order: {descending}")

    # 4. Filter with 'o' and without 'i'
    with_o = [name for name in manufacturers if 'o' in name.lower()]
    without_i = [name for name in manufacturers if 'i' not in name.lower()]
    
    print(f"Manufacturers with 'o': {len(with_o)}")
    print(f"Manufacturers without 'i': {len(without_i)}")

    # Bonus 1: Remove duplicates and print comma-separated
    dup_list = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
    unique_list = sorted(list(set(dup_list))) # Set removes duplicates
    
    formatted_string = ", ".join(unique_list)
    print(f"\nUnique companies: {formatted_string}")
    print(f"Total unique companies: {len(unique_list)}")

    # Bonus 2: Ascending order (A-Z) + Reverse letters of each name
    # Logic: Sort first, then reverse the string [::-1]
    reversed_names = [name[::-1] for name in sorted(unique_list)]
    print(f"Reversed letters (A-Z): {reversed_names}")

if __name__ == "__main__":
    analyze_manufacturers()
