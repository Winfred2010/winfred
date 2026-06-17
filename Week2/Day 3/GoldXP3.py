import re
import string
import random
from datetime import datetime

# ==========================================
#  Holiday Tracker
# ==========================================
def track_next_holiday():
    """Displays today's date and time until the next fixed holiday."""
    now = datetime.now()
    print(f"Today's Date: {now.strftime('%Y-%m-%d %H:%M:%S')}")

    # Example: Tracking New Year's Day
    next_holiday_name = "New Year's Day"
    holiday_date = datetime(now.year + 1, 1, 1)
    
    time_remaining = holiday_date - now
    days = time_remaining.days
    hours = time_remaining.seconds // 3600
    
    print(f"The next holiday is {next_holiday_name} in {days} days and {hours} hours.")

# ==========================================
#  Space Age Calculator
# ==========================================
def calculate_space_age(seconds):
    """Calculates age across the solar system based on orbital periods."""
    earth_year_seconds = 31557600
    planets = {
        "Earth": 1.0,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132
    }
    
    print(f"\n--- Age for {seconds:,} seconds ---")
    for name, period in planets.items():
        age = seconds / (earth_year_seconds * period)
        print(f"{name:10}: {age:,.2f} years old")

# ==========================================
#  RegEx Number Extractor
# ==========================================
def extract_digits(text):
    """Uses RegEx to find all digits in a string."""
    numbers = "".join(re.findall(r'\d', text))
    return numbers

# ==========================================
#  Name Validator
# ==========================================
def validate_full_name():
    """Validates a 'First Last' name format using RegEx."""
    name = input("\nEnter your full name (Example: John Doe): ")
    
    # Pattern: Starts with Upper, letters only, one space, starts with Upper, letters only
    pattern = r'^[A-Z][a-z]+\s[A-Z][a-z]+$'
    
    if re.match(pattern, name):
        print("Name is valid!")
    else:
        print("Invalid format. Ensure letters only, one space, and Title Case.")

# ==========================================
# Password Generator
# ==========================================
def generate_secure_password(length):
    """Generates a password meeting all complexity requirements."""
    # Define character sets
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    digits = string.digits
    special = "!@#$%^&*()_+-="
    all_chars = lower + upper + digits + special

    # Ensure at least one of each type
    password = [
        random.choice(lower),
        random.choice(upper),
        random.choice(digits),
        random.choice(special)
    ]

    # Fill the remaining length
    password += [random.choice(all_chars) for _ in range(length - 4)]
    
    # Shuffle to hide the fact that the first 4 were forced
    random.shuffle(password)
    return "".join(password)

def password_manager_app():
    """User interface for the password generator."""
    while True:
        try:
            length = int(input("\nEnter desired password length (6-30): "))
            if 6 <= length <= 30:
                break
            print("Please stay within the 6-30 range.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    new_pass = generate_secure_password(length)
    print(f"\nYour generated password: {new_pass}")
    print("WARNING: Keep this password in a safe place (like a password manager)!")

def test_password_generator():
    """Runs 100 tests to verify the generator's integrity."""
    print("\nRunning 100-test battery on Password Generator...")
    for _ in range(100):
        length = random.randint(6, 30)
        p = generate_secure_password(length)
        
        # Validation checks
        has_lower = any(c in string.ascii_lowercase for c in p)
        has_upper = any(c in string.ascii_uppercase for c in p)
        has_digit = any(c in string.digits for c in p)
        has_special = any(c in "!@#$%^&*()_+-=" for c in p)
        
        assert len(p) == length and has_lower and has_upper and has_digit and has_special
    print("Test passed: 100/100 passwords meet all criteria.")

# ==========================================
# Main Execution
# ==========================================
if __name__ == "__main__":
    # Ex 1
    track_next_holiday()
    
    # Ex 2
    calculate_space_age(1000000000)
    
    # Ex 3
    print(f"\nExtracted Numbers: {extract_digits('k5k3q2g5z6x9bn')}")
    
    # Ex 4
    validate_full_name()
    
    # Ex 5
    test_password_generator()
    password_manager_app()
