import random

# ==========================================
# Challenge 1: Multiples Generator
# ==========================================
def generate_multiples():
    """Generates a list of multiples of a given number up to a specified length."""
    number = int(input("16: "))
    length = int(input("12: "))
    
    # Generate list using a loop
    multiples = []
    for i in range(1, length + 1):
        multiples.append(number * i)
    
    print(multiples)

# ==========================================
#  Remove Consecutive Duplicates
# ==========================================
def remove_consecutive_duplicates():
    """Processes a string to remove consecutive duplicate letters."""
    word = input("tiiiiiny: ")
    
    if not word:
        print("")
        return

    # Initialize with the first character
    new_string = word[0]

    # Loop to check each character against the previous one
    for i in range(1, len(word)):
        if word[i] != word[i-1]:
            new_string += word[i]
            
    print(new_string)

# ==========================================
# Main Execution
# ==========================================
if __name__ == "__main__":
    # Challenge 1 Execution
    generate_multiples()
    
    # Challenge 2 Execution
    remove_consecutive_duplicates()
