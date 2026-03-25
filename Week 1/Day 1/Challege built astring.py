import random

def process_string_challenge():
    """
    Prompts for a 10-character string, validates length, 
    prints first/last characters, and performs progressive building.
    """
    #  Ask for User Input
    user_string = input("Please enter a string of exactly 10 characters: ")
    string_length = len(user_string)

    #  Check the Length of the String
    if string_length < 10:
        print("String not long enough.")
        return
    elif string_length > 10:
        print("String too long.")
        return
    else:
        print("Perfect string")

    #  Print the First and Last Characters
    # Using index 0 and index -1 (Pythonic way to get the last item)
    print(f"First character: {user_string[0]}")
    print(f"Last character: {user_string[-1]}")

    #  Build the String Character by Character (Progressive)
    print("\nProgressive Construction:")
    temp_string = ""
    for char in user_string:
        temp_string += char
        print(temp_string)

    # 5. Bonus: Jumble the String
    print("\n--- Bonus: Jumbled String ---")
    # Convert string to list because strings are immutable
    char_list = list(user_string)
    random.shuffle(char_list)
    jumbled_result = "".join(char_list)
    
    print(f"Original: {user_string}")
    print(f"Jumbled:  {jumbled_result}")

if __name__ == "__main__":
    process_string_challenge()
