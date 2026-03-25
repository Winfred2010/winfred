def exercise_1_to_3_birthdays():
    # Starting dictionary
    birthdays = {
        "Alice": "1990/05/12",
        "Bob": "1985/11/22",
        "Charlie": "1992/01/10",
        "Diana": "1998/07/04",
        "Ethan": "2001/03/30"
    }

    print("Welcome to the Birthday Tracker!")
    print("You can look up the birthdays of the people in the list!")

    # Adding your own birthday (Winfred)
    print("\n--- Add a New Birthday ---")
    # When the terminal asks, you would type 'Winfred' and '1989/02/15'
    name_to_add = input("Enter the person's name: ").strip().title()
    date_to_add = input("Enter their birthday (YYYY/MM/DD): ").strip()
    
    # Adding the input to our dictionary
    birthdays[name_to_add] = date_to_add
    print(f"Saved! {name_to_add} has been added to the system.")

    # Print all names before searching
    print("\nAvailable names:", ", ".join(birthdays.keys()))

    # Search logic
    search_name = input("\nWhose birthday are you looking for? ").strip().title()

    if search_name in birthdays:
        print(f"{search_name}'s birthday is {birthdays[search_name]}.")
    else:
        # Exercise 2: Error message for missing names
        print(f"Sorry, we don’t have the birthday information for {search_name}.")

if __name__ == "__main__":
    exercise_1_to_3_birthdays()
