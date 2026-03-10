
text = "Python is Fun!"

# Convert the entire string to uppercase
print(text.upper())

# Make the first letter upper case
print(text.capitalize())

# Make the first letter of each word upper case
print(text.title())

# Find the index of "F". What happens if you use lower case in the method?
print(text.find("F"))   # Finds uppercase F
print(text.find("f"))   # Returns -1 because strings are case-sensitive

# Find a substring
print(text.find("Fun"))     # Finds substring
print(text[10:13])          # Extracts substring using slicing