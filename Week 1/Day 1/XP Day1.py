

# One line of code to print Hello world 4 times
print("Hello world\n" * 4)

# Some Math (99^3 * 8)
result = (99**3) * 8
print(f"Math Result: {result}")

# Predictions (Commented logic)
# 5 < 3          -> False
# 3 == 3         -> True
# 3 == "3"       -> False
# "Hello" == "hello" -> False
print(f"Logic Checks: {5 < 3}, {3 == 3}, {3 == '3'}, {'Hello' == 'hello'}")

#  Computer Brand
computer_brand = "Apple"
print(f"I have a {computer_brand} computer.")

# Your information
name = "Alex"
age = 25
shoe_size = 42
info = f"My name is {name}, I am {age} years old, my shoe size is {shoe_size}, and I love coding!"
print(info)

#  A & B
a = 10
b = 5
if a > b:
    print("Hello World (a is bigger than b)")

#  Odd or Even
user_num = int(input("\nEnter a number to check if it's odd or even: "))
if user_num % 2 == 0:
    print(f"{user_num} is even.")
else:
    print(f"{user_num} is odd.")

#  What’s your name?
my_name = "Alex"
user_name = input("\nWhat is your name? ")
if user_name.lower() == my_name.lower():
    print("No way! We have the same name. Are you my long-lost twin?")
else:
    print(f"Nice to meet you, {user_name}. My name is {my_name}, the original!")

# Roller Coaster Height
try:
    user_height = int(input("\nEnter your height in cm: "))
    if user_height > 145:
        print("You are tall enough to ride the roller coaster!")
    else:
        print("Sorry, you need to grow a bit more to ride.")
except ValueError:
    print("Please enter a valid number for height.")
