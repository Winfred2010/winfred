# Define a global variable
counter = 0

# Define the function
def increment_global_counter():
    global counter   # Tell Python we want to use the global variable
    counter += 1     # Increase it by 1

# Test the function
increment_global_counter()
print(counter)  # Output: 1

increment_global_counter()
print(counter)  # Output: 2