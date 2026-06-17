import sys

# ==========================================
#  Bank Account Logic
# ==========================================
class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        """Validates credentials and sets authentication state."""
        if username == self.username and password == self.password:
            self.authenticated = True
            return True
        return False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required. Please log in.")
        if amount <= 0:
            raise Exception("Deposit amount must be a positive integer.")
        
        self.balance += amount
        print(f"Successfully deposited ${amount}. New balance: ${self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required. Please log in.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")
        
        self.balance -= amount
        print(f"Successfully withdrew ${amount}. New balance: ${self.balance}")


# ==========================================
# Minimum Balance Account (Inheritance)
# ==========================================
class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        # Use super() to initialize base BankAccount attributes
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        """Overrides withdraw to ensure balance stays above minimum."""
        if not self.authenticated:
            raise Exception("Authentication required. Please log in.")
        
        if (self.balance - amount) < self.minimum_balance:
            raise Exception(f"Withdrawal denied. Must maintain a minimum balance of ${self.minimum_balance}.")
        
        super().withdraw(amount)


# ==========================================
# Part IV: BONUS - ATM Interface
# ==========================================
class ATM:
    def __init__(self, account_list, try_limit):
        # Validate that all items are account instances
        if not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("Account list must contain BankAccount instances.")
        
        self.account_list = account_list
        self.current_tries = 0

        # Validate try_limit
        try:
            if not isinstance(try_limit, int) or try_limit <= 0:
                raise ValueError("Try limit must be a positive number.")
            self.try_limit = try_limit
        except (ValueError, Exception) as e:
            print(f"Warning: {e} Defaulting try_limit to 2.")
            self.try_limit = 2

        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n--- WELCOME TO THE ATM ---")
            print("1. Log In")
            print("2. Exit")
            choice = input("Select an option: ")

            if choice == "1":
                user = input("Username: ")
                pw = input("Password: ")
                self.log_in(user, pw)
            elif choice == "2":
                print("Thank you for using our ATM. Goodbye!")
                break
            else:
                print("Invalid choice, please try again.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                print(f"\nWelcome back, {username}!")
                self.current_tries = 0  # Reset tries on success
                self.show_account_menu(account)
                return

        # If no match found
        self.current_tries += 1
        remaining = self.try_limit - self.current_tries
        
        if self.current_tries >= self.try_limit:
            print("Maximum tries reached. System shutting down for security.")
            sys.exit()
        else:
            print(f"Login failed. {remaining} tries remaining.")

    def show_account_menu(self, account):
        while True:
            print("\n--- ACCOUNT MENU ---")
            print(f"Balance: ${account.balance}")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Log Out")
            choice = input("Action: ")

            try:
                if choice == "1":
                    amount = int(input("Amount to deposit: "))
                    account.deposit(amount)
                elif choice == "2":
                    amount = int(input("Amount to withdraw: "))
                    account.withdraw(amount)
                elif choice == "3":
                    account.authenticated = False  # Securely log out
                    print("Logged out successfully.")
                    break
                else:
                    print("Invalid option.")
            except Exception as e:
                print(f"Error: {e}")

# ==========================================
# Main Entry Point
# ==========================================
if __name__ == "__main__":
    # Create test accounts
    acc1 = BankAccount("Alice", "secret123", 500)
    acc2 = MinimumBalanceAccount("Bob", "password99", 100, minimum_balance=20)
    
    # Start ATM
    my_atm = ATM([acc1, acc2], try_limit=3)
