# ==========================================
# Comma-Separated Word Sorter
# ==========================================

def sort_words():
    """
    Asks the user for a comma-separated string of words,
    sorts them alphabetically, and prints the result.
    """
    # Get Input
    user_input = input("Enter words separated by commas: ")

    #  Split the String into a list
    word_list = user_input.split(',')

    # Sort the List
    word_list.sort()

    #  Join the Sorted List back into a string
    result = ",".join(word_list)

    #  Print the Result
    print(f"Sorted words: {result}\n")


# ==========================================
#  Longest Word Finder
# ==========================================

def longest_word(sentence):
    """
    Takes a sentence and returns the longest word found.
    If there is a tie, it returns the first one encountered.
    """
    #  Split the Sentence into Words
    words = sentence.split()

    #  Initialize Variables
    # We assume the first word is the longest to start
    winner = words[0] if words else ""

    # Iterate Through the Words
    for word in words:
        # Step 5: Compare Word Lengths
        # Using '>' ensures we keep the first one in case of a tie
        if len(word) > len(winner):
            winner = word

    # Return the Longest Word
    return winner


# ==========================================
# Main Execution Block
# ==========================================

if __name__ == "__main__":
    # Run Word Sorter
    sort_words()

    # Run Longest Word Tests
    print("--- Longest Word Tests ---")
    print(f"Test 1: {longest_word("Margaret's toy is a pretty doll.")}")
    print(f"Test 2: {longest_word("A thing of beauty is a joy forever.")}")
    print(f"Test 3: {longest_word("Forgetfulness is by all means powerless!")}")
