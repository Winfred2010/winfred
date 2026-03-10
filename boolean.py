# Declare a variable called first and assign it to "Hello World"
first = "hello world"
#This a comment

#  Log a message to the terminal
print("I AM A COMPUTER!")

#  If statement checking conditions
if 1 < 2 and 4 > 2:
    print("Math is fun.")

#  Assign a variable called nope to an absence of value
nope = None

#  Combine true and false using "and"
result = True and False
print(result)

#  Calculate the length of the string
length = len("What's my length?")
print(length)

#  Convert string to uppercase
shouting = "i am shouting".upper()
print(shouting)

#  Convert string "1000" to number 1000
number = int("1000")
print(number)

#  Combine number 4 with string "real"
combined = str(4) + "real"
print(combined)

#  Output of 3 * "cool"
print(3 * "cool")

#  Output of 1 / 0
# print(1 / 0)  # This will cause a ZeroDivisionError

#  Determine the type of []
print(type([]))

#  Ask the user for their name
name = input("What is your name? ")
print("Hello", name)

#  Ask the user for a number and check it
num = int(input("Enter a number: "))

if num < 0:
    print("That number is less than 0!")
elif num > 0:
    print("That number is greater than 0!")
else:
    print("You picked 0!")

# Find the index of "l" in "apple"
print("apple".index("l"))

#  Check whether "y" is in "xylophone"
print("y" in "xylophone")

#  Check whether my_string is all lowercase
my_string = "hello world"
print(my_string.islower())