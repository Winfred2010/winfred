#  Ask the user to input a sentence
sentence = input("Enter a sentence: ")

#  Check if the sentence is made up of only alphabetic characters
if sentence.isalpha():
    print("The sentence contains only alphabetic characters.")
else:
 # Count non-alphabetic characters
    non_alpha_count = 0
    for char in sentence:
        if not char.isalpha():
            non_alpha_count += 1
    print("The sentence contains", non_alpha_count, "non-alphabetic character(s).")

#  Check if the sentence ends with an exclamation mark (!)
if sentence.endswith("!"):
    print("The sentence ends with an exclamation mark (!).")
else:
    print("The sentence does not end with an exclamation mark.")

# Check if the sentence contains any whitespace characters
if any(char.isspace() for char in sentence):
    print("The sentence contains whitespace characters.")
else:
    print("The sentence does not contain any whitespace characters.")