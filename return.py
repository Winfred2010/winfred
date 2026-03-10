# 1. Finding the largest number
def find_largest(numbers):
    return max(numbers)

print(find_largest([12, 88, 34, 101])) 
print(find_largest([-5, -1, -20]))     

# 2. Checking if a letter is in a word
def check_letter(word, letter):
    return letter in word

print(check_letter("prune", "w"))
print(check_letter("kiwi", "m"))

# 3. Counting to a number
def count_to_number(n):
    for i in range(1, n + 1):
        print(i)

count_to_number(6)
