import random

# ==========================================
# Concat without +
# ==========================================
def concat_lists(list1, list2):
    """Concatenates two lists using the extend method."""
    combined = list1.copy()
    combined.extend(list2)
    return combined

# ==========================================
# Range Multiples
# ==========================================
def find_multiples():
    """Prints multiples of 5 and 7 between 1500 and 2500."""
    print("Multiples of 5 and 7 (1500-2500):")
    results = [n for n in range(1500, 2501) if n % 5 == 0 and n % 7 == 0]
    print(results)

# ==========================================
# Index Check
# ==========================================
def check_name_index():
    names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
    user_name = input("\nEnter a name to find its first index: ")
    if user_name in names:
        print(f"The first occurrence of '{user_name}' is at index {names.index(user_name)}")
    else:
        print(f"'{user_name}' is not in the list.")

# ==========================================
# Greatest Number
# ==========================================
def find_greatest():
    nums = []
    for i in range(1, 4):
        nums.append(int(input(f"Input the {i}st/nd/rd number: ")))
    print(f"The greatest number is: {max(nums)}")

# ==========================================
# The Alphabet
# ==========================================
def analyze_alphabet():
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    vowels = "aeiou"
    print("\nAlphabet Analysis:")
    for char in alphabet:
        type_char = "vowel" if char in vowels else "consonant"
        print(f"{char} is a {type_char}")

# ==========================================
# Words and Letters
# ==========================================
def find_letter_in_words():
    words = [input(f"Enter word {i+1}/7: ") for i in range(7)]
    letter = input("Enter a single character to search for: ")
    
    for word in words:
        index = word.find(letter)
        if index != -1:
            print(f"In '{word}', '{letter}' first appears at index {index}")
        else:
            print(f"Friendly reminder: '{letter}' does not exist in '{word}'")

# ==========================================
#  Min, Max, Sum
# ==========================================
def million_stats():
    nums = list(range(1, 1000001))
    print(f"\nStats for 1 to 1,000,000:")
    print(f"Min: {min(nums)} | Max: {max(nums)} | Sum: {sum(nums)}")

# ==========================================
# List and Tuple
# ==========================================
def sequence_generator():
    raw_input = input("\nEnter comma-separated numbers: ")
    num_list = raw_input.split(",")
    num_tuple = tuple(num_list)
    print(num_list)
    print(num_tuple)

# ==========================================
#  Random Number Game (with Bonuses)
# ==========================================
def guessing_game():
    wins = 0
    losses = 0
    print("\n--- Guess the Number Game ---")
    
    while True:
        user_choice = input("Guess a number between 1-9 (or 'quit' to exit): ")
        if user_choice.lower() == 'quit':
            break
            
        if not user_choice.isdigit() or not (1 <= int(user_choice) <= 9):
            print("Please enter a valid number between 1 and 9.")
            continue
            
        random_num = random.randint(1, 9)
        if int(user_choice) == random_num:
            print(f"Winner! The number was {random_num}.")
            wins += 1
        else:
            print(f"Better luck next time. The number was {random_num}.")
            losses += 1
            
    print(f"\nFinal Tally - Games Won: {wins} | Games Lost: {losses}")

# ==========================================
# Main execution
# ==========================================
if __name__ == "__main__":
    # Test concatenation (Ex 1)
    print(f"Combined List: {concat_lists([1, 2], [3, 4])}\n")
    
    find_multiples()     # Ex 2
    check_name_index()   # Ex 3
    find_greatest()      # Ex 4
    analyze_alphabet()   # Ex 5
    find_letter_in_words() # Ex 6
    million_stats()      # Ex 7
    sequence_generator() # Ex 8
    guessing_game()      # Ex 9
