from anagram_checker import AnagramChecker

def get_user_word():
    """Prompt user for a word and validate it based on requirements."""
    user_input = input("\nType a word (or 'exit' to quit): ").strip()
    
    if user_input.lower() == 'exit':
        return 'exit'

    # Validation: Only one word allowed
    if len(user_input.split()) > 1:
        print("Error: Please enter only a single word.")
        return None

    # Validation: Only alphabetic characters
    if not user_input.isalpha():
        print("Error: Only alphabetic characters are allowed (no numbers/symbols).")
        return None

    return user_input

def display_results(word, anagrams, is_valid):
    """Format and print the results to the user."""
    print(f'\nYOUR WORD: "{word.upper()}"')
    
    if is_valid:
        print("This is a valid English word.")
    else:
        print("Note: This word was not found in our dictionary.")

    if anagrams:
        # Join list into a comma-separated string
        readable_anagrams = ", ".join(anagrams)
        print(f"Anagrams for your word: {readable_anagrams}.")
    else:
        print("No anagrams were found for your word.")

def main():
    # Initialize the checker (ensure sowpods.txt is in the same folder)
    checker = AnagramChecker('sowpods.txt')
    
    print("--- WELCOME TO THE ANAGRAM CHECKER ---")

    while True:
        word = get_user_word()

        if word == 'exit':
            print("Goodbye!")
            break
        
        if word:
            # Logic processing
            is_valid = checker.is_valid_word(word)
            anagrams = checker.get_anagrams(word)
            
            # Output
            display_results(word, anagrams, is_valid)

if __name__ == "__main__":
    main()