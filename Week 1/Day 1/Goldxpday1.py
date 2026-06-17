

# Exercise 1: One-liner to print multiple phrases 4 times each
print(("Hello world\n" * 4) + ("I love python\n" * 4).strip())

# Exercise 2: Season Finder Logic
try:
    # Get user input for the month
    month = int(input("\nEnter a month number (1-12) to see its season: "))

    # Determine the season based on specific ranges
    if 3 <= month <= 5:
        season = "Spring"
    elif 6 <= month <= 8:
        season = "Summer"
    elif 9 <= month <= 11:
        season = "Autumn"
    elif month == 12 or 1 <= month <= 2:
        season = "Winter"
    else:
        season = None

    # Output the result
    if season:
        print(f"The season for month {month} is {season}.")
    else:
        print("Invalid input! Please enter a number between 1 and 12.")

except ValueError:
    # Handles cases where the user types something that isn't a number
    print("Error: Please enter a valid integer.")
