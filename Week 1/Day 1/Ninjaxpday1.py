import sys

# =================================================================
#  PRINTING & STRING MANIPULATION
# =================================================================

def run_string_exercises():
    """
    Demonstrates one-line multi-line printing and character counting.
    """
    print("--- 1. Multi-line Output in One Line ---")
    # Using \n (newline character) and string multiplication
    print("Hello world\n" * 4 + "I love python\n" * 4)

    print("\n--- 2. Character Counting ---")
    my_text = (
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, "
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco "
        "laboris nisi ut aliquip ex ea commodo consequat. "
        "Duis aute irure dolor in reprehenderit in voluptate velit "
        "esse cillum dolore eu fugiat nulla pariatur."
    )
    # Single line of code to find the character count
    print(f"Total characters in text: {len(my_text)}")

# =================================================================
#  LOGIC & PREDICTIVE OUTPUTS
# =================================================================

def run_logic_predictions():
    """
    Demonstrates Python's truthy/falsy values and type arithmetic.
    """
    print("\n--- 3. Logic & Boolean Predictions ---")
    
    # Mathematical and Boolean operations
    x = (1 == True)    # Result: True
    y = (1 == False)   # Result: False
    a = True + 4       # Result: 5 (True = 1)
    b = False + 10     # Result: 10 (False = 0)

    print(f"Logic Checks: {3 <= 3 < 9}, {3 == 3 == 3}, {bool(0)}")
    print(f"Boolean Math: x={x}, y={y}, a={a}, b={b}")

# =================================================================
#  INTERACTIVE CHALLENGE
# =================================================================

def longest_sentence_challenge():
    """
    Interactive loop: Tracks the longest sentence without the letter 'A'.
    """
    print("\n--- 4. Longest Word Challenge (Avoid the letter 'A') ---")
    print("Rules: Enter sentences without 'A'. Type 'exit' to quit.")
    
    record_length = 0

    while True:
        entry = input("\nEnter your sentence: ")
        
        if entry.lower() == 'exit':
            print(f"Final High Score: {record_length}. Goodbye!")
            break
            
        if 'a' in entry.lower():
            print("FAILED: That contained the letter 'A'.")
            continue
        
        if len(entry) > record_length:
            record_length = len(entry)
            print(f"CONGRATULATIONS! New record: {record_length} characters.")
        else:
            print(f"Current record is still {record_length} characters.")

# =================================================================
# MAIN EXECUTION
# =================================================================

if __name__ == "__main__":
    # Run the exercises in order
    run_string_exercises()
    run_logic_predictions()
    
    # Start the interactive part
    longest_sentence_challenge()
