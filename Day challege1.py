def longest_word(sentence):
    """Returns the longest word from a sentence, including punctuation."""
    words = sentence.split()
    if not words:
        return ""
    
    winner = words[0]
    for word in words:
        # Only update if the current word is strictly longer (keeps the first encounter)
        if len(word) > len(winner):
            winner = word
    return winner

# --- Challenge 1: String Sorter ---
print("--- Challenge 1: Word Sorter ---")
user_input = input("Enter comma-separated words: ")
# Split, Sort, and Join
sorted_list = sorted(user_input.split(','))
sorted_string = ",".join(sorted_list)
print(f"Sorted Result: {sorted_string}\n")

# --- Challenge 2: Longest Word Tests ---
print("--- Challenge 2: Longest Word Results ---")
test_1 = "Margaret's toy is a pretty doll."
test_2 = "A thing of beauty is a joy forever."
test_3 = "Forgetfulness is by all means powerless!"

print(f"Test 1: {longest_word(test_1)}")
print(f"Test 2: {longest_word(test_2)}")
print(f"Test 3: {longest_word(test_3)}")
