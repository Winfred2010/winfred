# =================================================================
#  Sets
# =================================================================
def exercise_1_sets():
    my_fav_numbers = {7, 14, 21}
    # Add two new numbers
    my_fav_numbers.add(42)
    my_fav_numbers.add(56)
    
    # Remove a number (sets are unordered, so "last added" is arbitrary)
    if my_fav_numbers:
        removed_val = my_fav_numbers.pop()
    
    friend_fav_numbers = {3, 14, 99}
    # Concatenate (Union) to create our_fav_numbers
    our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
    print(f"Exercise 1 - Combined Sets: {our_fav_numbers}")

# =================================================================
# Exercise 2 & 3: Tuples and List Manipulation
# =================================================================
def exercise_2_3_collections():
    # Tuples are immutable and cannot be changed after creation.
    # Attempting to add to a tuple would result in an AttributeError.
    integer_tuple = (10, 20, 30)
    
    basket = ["Banana", "Apples", "Oranges", "Blueberries"]
    basket.remove("Banana")
    basket.remove("Blueberries")
    basket.append("Kiwi")
    basket.insert(0, "Apples")
    
    apple_count = basket.count("Apples")
    basket.clear()
    print(f"Exercise 3 - Apple count: {apple_count}, Final basket: {basket}")

# =================================================================
#  Floats and For Loops
# =================================================================
def exercise_4_5_loops():
    # A float is a number with a decimal point, while an integer is a whole number.
    # Generating sequence: 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
    sequence = [x * 0.5 for x in range(3, 11)]
    print(f"Exercise 4 - Generated sequence: {sequence}")

    print("Exercise 5 - Numbers 1-20:")
    for i in range(1, 21):
        print(i, end=" ")
    
    print("\nExercise 5 - Even indices (2, 4, 6...):")
    nums = list(range(1, 21))
    for index in range(len(nums)):
        if index % 2 == 0:
            print(nums[index], end=" ")
    print()

# =================================================================
#  Pizza Toppings
# =================================================================
def exercise_8_pizza():
    toppings = []
    base_price = 10.0
    price_per_topping = 2.50
    
    print("\nEnter pizza toppings (type 'quit' to finish):")
    while True:
        entry = input("Topping: ").strip().lower()
        if entry == 'quit':
            break
        toppings.append(entry)
        print(f"Adding {entry} to your pizza.")
    
    total_cost = base_price + (len(toppings) * price_per_topping)
    print(f"Final Toppings: {toppings}")
    print(f"Total Cost: ${total_cost:.2f}")

# =================================================================
#  Movie Tickets
# =================================================================
def exercise_9_tickets():
    total_cost = 0
    # Example logic for a family
    family_ages = [2, 8, 35] 
    for age in family_ages:
        if age < 3:
            total_cost += 0
        elif 3 <= age <= 12:
            total_cost += 10
        else:
            total_cost += 15
    print(f"\nExercise 9 - Total Ticket Cost: ${total_cost}")

    # Bonus: Filtering teenagers for restricted movie (16ndnd21)
    potential_attendees = {"Alex": 15, "Sam": 17, "Jordan": 20, "Casey": 25}
    final_list = [name for name, age in potential_attendees.items() if 16 <= age <= 21]
    print(f"Restricted Movie Attendees: {final_list}")

if __name__ == "__main__":
    exercise_1_sets()
    exercise_2_3_collections()
    exercise_4_5_loops()
    # exercise_8_pizza() # Uncomment to test interactive loop
    exercise_9_tickets()
