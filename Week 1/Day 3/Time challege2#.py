# Ask for user input
x = int(input('Enter the Number: '))

#  Find all divisors using a list comprehension
# We check every number from 1 up to (but not including) x
divisors = [i for i in range(1, x) if x % i == 0]

#  Check if the sum of divisors equals the original number
is_perfect = sum(divisors) == x

# 4. Print the result
print(is_perfect)
