import sys

# ==========================================
# Part I & III: Bank Account
# ==========================================
class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        """Sets authenticated to True if credentials match."""
        if username == self.username and password == self.password:
            self.authenticated = True
            return True
        return False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to deposit.")
        if amount <= 0:
            raise Exception("Deposit amount must be positive.")
        self.balance += amount
        print(f"Successfully deposited ${amount}. New balance: ${self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to withdraw.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be positive.")
        self.balance -= amount
        print(f"Successfully withdrew ${amount}. New balance: ${self.balance}")


# ==========================================
# Part II: Minimum Balance Account
# ==========================================
class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        """Overrides withdraw to enforce the minimum balance limit."""
        if not self.authenticated:
            raise Exception("Authentication required to withdraw.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be positive.")
        
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Withdrawal denied. Balance cannot drop below ${self.minimum_balance}.")
        
        super().withdraw(amount)


# ==========================================
# Part IV: BONUS - ATM Class
# ==========================================
class ATM:
    def __init__(self, account_list, try_limit):
        # Validate account list
        if not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("Invalid account list provided.")
        self.account_list = account_list
        
        # Validate try limit
        try:
            if try_limit <= 0:
                raise ValueError
            self.try_limit = try_limit
        except (ValueError, TypeError):
            print("Invalid try limit. Defaulting to 2.")
            self.try_limit = 2
            
        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n--- ATM MAIN MENU ---")
            print("1. Log in")
            print("2. Exit")
            choice = input("Select an option: ")
            
            if choice == "1":
                user = input("Username: ")
                pw = input("Password: ")
                self.log_in(user, pw)
            elif choice == "2":
                print("Goodbye!")
                break
            else:
                print("Invalid choice.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                self.current_tries = 0 # Reset tries on success
                self.show_account_menu(account)
                return
        
        self.current_tries += 1
        remaining = self.try_limit - self.current_tries
        if self.current_tries >= self.try_limit:
            print("Maximum tries reached. System shutting down.")
            sys.exit()
        else:
            print(f"Invalid credentials. {remaining} tries remaining.")

    def show_account_menu(self, account):
        while True:
            print(f"\n--- Account Menu ({account.username}) ---")
            print(f"Current Balance: ${account.balance}")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit to Main Menu")
            choice = input("Select an option: ")
            
            try:
                if choice == "1":
                    amt = int(input("Enter deposit amount: "))
                    account.deposit(amt)
                elif choice == "2":
                    amt = int(input("Enter withdrawal amount: "))
                    account.withdraw(amt)
                elif choice == "3":
                    account.authenticated = False # Log out for security
                    break
                else:
                    print("Invalid choice.")
            except Exception as e:
                print(f"Error: {e}")

# ==========================================
# Testing the System
# ==========================================
if __name__ == "__main__":
    acc1 = BankAccount("alice", "1234", 100)
    acc2 = MinimumBalanceAccount("bob", "password", 50, minimum_balance=10)
    
    # Start the ATM
    my_atm = ATM([acc1, acc2], try_limit=3)
