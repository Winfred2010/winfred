import string
import random
import re
from datetime import datetime, date

# Try/Except block for Faker to prevent the script from crashing if not installed
try:
    from faker import Faker
except ImportError:
    Faker = None

# ==========================================
# Exercise 1: Currency Management (Dunders)
# ==========================================
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        # Professional pluralization: '1 dollar' vs '5 dollars'
        suffix = "s" if self.amount != 1 else ""
        return f"{self.amount} {self.currency}{suffix}"

    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return int(self.amount)

    def __add__(self, other):
        """Handles addition: Currency + Currency or Currency + Int."""
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        return self.amount + other

    def __iadd__(self, other):
        """Handles in-place addition: c1 += c2."""
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        else:
            self.amount += other
        return self

# ==========================================
# Exercise 2: Module Logic (Integrated)
# ==========================================
def calculate_sum_and_print(a, b):
    print(f"The sum of {a} and {b} is: {a + b}")

# ==========================================
# Exercise 3-6: Utility Functions (Strings & Dates)
# ==========================================

def get_random_id(length=5):
    """Generates a random string of fixed length."""
    letters = string.ascii_letters
    result = "".join(random.choice(letters) for _ in range(length))
    return result

def show_date_info():
    """Displays today's date and countdown to New Year."""
    now = datetime.now()
    print(f"Current Date: {date.today()}")
    
    new_year = datetime(now.year + 1, 1, 1)
    delta = new_year - now
    print(f"Time until Jan 1st: {delta.days} days and {delta.seconds // 3600} hours")

def minutes_lived(birthdate_str):
    """Calculates total minutes lived from a birthdate string."""
    try:
        birth_date = datetime.strptime(birthdate_str, "%Y-%m-%d")
        delta = datetime.now() - birth_date
        total_minutes = int(delta.total_seconds() / 60)
        print(f"You have lived for approximately {total_minutes:,} minutes.")
    except ValueError:
        print("Invalid date format. Use YYYY-MM-DD.")

# ==========================================
# Exercise 7: Faker Data Generation
# ==========================================

def generate_mock_users(count):
    """Generates a list of fake user profiles."""
    if Faker is None:
        return "Error: Faker library not installed. Run 'pip install faker'."
    
    fake = Faker()
    user_list = []
    for _ in range(count):
        user_list.append({
            "name": fake.name(),
            "address": fake.address().replace("\n", ", "),
            "lang": fake.language_code()
        })
    return user_list

# ==========================================
# Main Execution Block
# ==========================================
if __name__ == "__main__":
    # Test Currency (Ex 1)
    print("--- Currency Tests ---")
    c1 = Currency('dollar', 5)
    c2 = Currency('dollar', 10)
    print(f"c1: {c1}")
    print(f"c1 + 10: {c1 + 10}")
    c1 += c2
    print(f"After c1 += c2: {c1}")

    # Test Utils (Ex 2-6)
    print("\n--- Utilities ---")
    calculate_sum_and_print(12, 8)
    print(f"Random ID: {get_random_id(10)}")
    show_date_info()
    minutes_lived("1995-05-15")

    # Test Faker (Ex 7)
    print("\n--- Mock Data Generation ---")
    users = generate_mock_users(2)
    if isinstance(users, list):
        for user in users:
            print(user)
    else:
        print(users)