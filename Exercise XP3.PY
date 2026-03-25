import string
import random
import math
from datetime import datetime, date
from faker import Faker

# ==========================================
# 1. Currency Management System
# ==========================================
class Currency:
    def __init__(self, label, value):
        self.label = label
        self.value = value

    def __str__(self):
        # Clean pluralization logic
        suffix = "s" if self.value != 1 else ""
        return f"{self.value} {self.label}{suffix}"

    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return self.value

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.label != other.label:
                raise TypeError(f"Mismatch: Cannot add {self.label} and {other.label}")
            return self.value + other.value
        return self.value + other

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.label != other.label:
                raise TypeError(f"Mismatch: Cannot add {self.label} and {other.label}")
            self.value += other.value
        else:
            self.value += other
        return self

# ==========================================
# 2. Utility Functions (Strings & Dates)
# ==========================================

def get_random_id(size=5):
    """Generates a random alphanumeric string."""
    chars = string.ascii_letters
    return "".join(random.choice(chars) for _ in range(size))

def print_todays_date():
    print(f"Current Date: {date.today()}")

def countdown_to_new_year():
    now = datetime.now()
    target = datetime(now.year + 1, 1, 1)
    remaining = target - now
    print(f"Countdown to New Year: {remaining.days} days, {remaining.seconds // 3600} hours remaining.")

def calculate_lifetime_minutes(birth_str):
    """Calculates minutes lived from a YYYY-MM-DD string."""
    birthday = datetime.strptime(birth_str, "%Y-%m-%d")
    diff = datetime.now() - birthday
    print(f"Minutes lived since {birth_str}: {int(diff.total_seconds() / 60):,}")

# ==========================================
# 3. Data Generation
# ==========================================

def create_mock_users(count):
    """Generates a list of fake user profiles."""
    generator = Faker()
    user_list = []
    for _ in range(count):
        user_list.append({
            "full_name": generator.name(),
            "location": generator.address().replace("\n", ", "),
            "lang": generator.language_code()
        })
    return user_list

# ==========================================
# MAIN EXECUTION BLOCK (Standard GitHub Style)
# ==========================================
if __name__ == "__main__":
    # Test Currency
    wallet_a = Currency('dollar', 10)
    wallet_b = Currency('dollar', 5)
    print(f"Wallet: {wallet_a}")
    print(f"Combined Value: {wallet_a + wallet_b}")

    # Test Utilities
    print(f"Generated ID: {get_random_id()}")
    print_todays_date()
    countdown_to_new_year()
    calculate_lifetime_minutes("2000-01-01")

    # Test Faker
    mock_data = create_mock_users(2)
    for profile in mock_data:
        print(f"User Found: {profile['full_name']} living in {profile['location']}")
