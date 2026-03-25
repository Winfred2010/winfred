# Modern Python uses input() instead of raw_input()
REverseinp = input("Enter your sentence: ")

#  Split the string into a list of words based on spaces
words = REverseinp.split()

#  Reverse the list using slicing [::-1] 
# (This is the fastest and most professional way in Python)
reversed_list = words[::-1]

#  Join the list back into a string with spaces in between
reversed_sentence = " ".join(reversed_list)

# Output the result
print(reversed_sentence)
