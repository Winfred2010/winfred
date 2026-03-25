def count_character_occurrences():
    """
    Prompts the user for a string and a character, 
    then returns the total count of that character in the string.
    """
    try:
        # Capture User Input
        input_string = input("Enter the string: ")
        target_input = input("Enter the character to count: ")

        # Validate that we have a character to look for
        if len(target_input) > 0:
            # We specifically target the first character entered
            target_char = target_input[0]
            occurrence_count = input_string.count(target_char)
            print(f"Occurrences of '{target_char}': {occurrence_count}")
        else:
            print("No character entered. Count is 0.")
            
    except EOFError:
        # Prevents crashing if the user cancels the input (Ctrl+D/Ctrl+Z)
        print("\nInput cancelled by user.")

if __name__ == "__main__":
    count_character_occurrences()

