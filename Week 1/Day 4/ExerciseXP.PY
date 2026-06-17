def display_message():
    """
    Prints a message describing the current topic of study.
    """
    message = "I am learning about functions in Python."
    print(message)

if __name__ == "__main__":
    # Calling the function to execute the code
    display_message()
def favorite_book(title):
    """
    Prints a message about a favorite book using a title parameter.
    """
    # Using an f-string for clean string formatting
    print(f"One of my favorite books is {title}")

if __name__ == "__main__":
    # Calling the function with an argument
    favorite_book("Alice in Wonderland")
def describe_city(city, country="Unknown"):
    """
    Prints a sentence describing a city and its country.
    Uses a default parameter for the country.
    """
    # Using an f-string for clean string formatting
    print(f"{city} is in {country}.")

if __name__ == "__main__":
    # Case 1: Providing both city and country
    describe_city("Reykjavik", "Iceland")
    
    # Case 2: Providing only city (uses the default 'Unknown' for country)
    describe_city("Paris")
    
    # Case 3: Another example with a specific country
    describe_city("Nairobi", "Kenya")
import random

# Random Number Comparison ---
def compare_random(user_num):
    """Generates a random number and compares it to user input."""
    random_num = random.randint(1, 100)
    if user_num == random_num:
        print("Success! The numbers match.")
    else:
        print(f"Fail! Your number: {user_num}, Random number: {random_num}")

# Personalized Shirts ---
def make_shirt(size="large", text="I love Python"):
    """Summarizes shirt size and printed message."""
    print(f"The size of the shirt is {size} and the text is {text}.")

#  Magicians ---
def show_magicians(magicians):
    """Prints each magician's name from a list."""
    for name in magicians:
        print(name)

def make_great(magicians):
    """Modifies the magician list by adding 'the Great' to each name."""
    for i in range(len(magicians)):
        magicians[i] = f"{magicians[i]} the Great"

#  Temperature Advice ---
def get_random_temp(month):
    """Returns a random float based on the season of the provided month."""
    if month in [12, 1, 2]:    # Winter
        return round(random.uniform(-10, 5), 1)
    elif month in [3, 4, 5]:   # Spring
        return round(random.uniform(6, 15), 1)
    elif month in [6, 7, 8]:   # Summer
        return round(random.uniform(24, 40), 1)
    else:                      # Autumn
        return round(random.uniform(16, 23), 1)

def main_weather():
    """Execution logic for the temperature advice exercise."""
    try:
        user_month = int(input("Enter the month (1-12): "))
        temp = get_random_temp(user_month)
        print(f"The temperature right now is {temp} degrees Celsius.")

        if temp < 0:
            print("Brrr, that’s freezing! Wear some extra layers today.")
        elif 0 <= temp <= 16:
            print("Quite chilly! Don’t forget your coat.")
        elif 16 < temp <= 23:
            print("Nice weather.")
        elif 23 < temp <= 32:
            print("A bit warm, stay hydrated.")
        else:
            print("It’s really hot! Stay cool.")
    except ValueError:
        print("Please enter a valid number for the month.")

# --- Execution ---
if __name__ == "__main__":
    
    print("--- Ex 4 ---")
    compare_random(50)


    print("\n--- Ex 5 ---")
    make_shirt() # Default
    make_shirt("medium") # Default text
    make_shirt(size="small", text="Custom message") # Keyword args


    print("\n--- Ex 6 ---")
    magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']
    make_great(magician_names)
    show_magicians(magician_names)

    
    print("\n--- Ex 7 ---")
    main_weather()
