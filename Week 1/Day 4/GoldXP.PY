import random

#  Retirement Logic ---
def get_age(birth_year, birth_month, birth_day):
    """Calculates age based on a fixed current date (March 2026)."""
    current_year = 2026
    current_month = 3
    current_day = 19
    
    age = current_year - birth_year
    # Adjust if birthday hasn't happened yet this year
    if (current_month, current_day) < (birth_month, birth_day):
        age -= 1
    return age

def check_retirement():
    """Interactively checks retirement eligibility."""
    print("\n--- Retirement Checker ---")
    gender = input("Enter gender (m/f): ").strip().lower()
    dob = input("Enter DOB (yyyy/mm/dd): ").strip()
    
    try:
        year, month, day = map(int, dob.split("/"))
        age = get_age(year, month, day)
        
        # Logic: Men 67+, Women 62+
        is_eligible = (gender == 'm' and age >= 67) or (gender == 'f' and age >= 62)
        
        if is_eligible:
            print(f"Age: {age}. Congratulations! You can retire.")
        else:
            print(f"Age: {age}. You still have work ahead of you.")
    except (ValueError, IndexError):
        print("Error: Use format yyyy/mm/dd (e.g., 1980/05/20)")

#  Special String Sum (X + XX + XXX...) ---
def calculate_special_sum(x):
    """Calculates the sum of X, XX, XXX, and XXXX."""
    # Example: if x is 3, calculates 3 + 33 + 333 + 3333
    terms = [int(str(x) * i) for i in range(1, 5)]
    return sum(terms)

#  Dice Simulation ---
def throw_until_doubles():
    """Throws two dice until they match and returns the attempt count."""
    attempts = 0
    while True:
        attempts += 1
        if random.randint(1, 6) == random.randint(1, 6):
            return attempts

def run_dice_stats():
    """Runs simulation 100 times and prints statistics."""
    print("\n--- Dice Simulation (100 Doubles) ---")
    results = [throw_until_doubles() for _ in range(100)]
    
    total = sum(results)
    avg = total / 100
    print(f"Total throws: {total}")
    print(f"Average throws to get doubles: {avg:.2f}")

# --- Entry Point ---
if __name__ == "__main__":
    #  Special Sum
    print(f"Special Sum (3 + 33 + 333 + 3333): {calculate_special_sum(3)}")
    
    #  Dice Stats
    run_dice_stats()
    
    # Retirement (Input required)
    check_retirement()
