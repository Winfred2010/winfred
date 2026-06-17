import math

# Exercise 1: Insert item at index
def insert_item(lst, index, item):
    lst.insert(index, item)
    return lst

# Exercise 2: Count spaces
def count_spaces(string):
    return string.count(' ')

# Exercise 3: Count Case
def count_case(string):
    upper = sum(1 for char in string if char.isupper())
    lower = sum(1 for char in string if char.islower())
    return {"Upper": upper, "Lower": lower}

# Exercise 4: Sum without built-in
def my_sum(numbers):
    total = 0
    for n in numbers:
        total += n
    return total

# Exercise 5: Max number
def find_max(numbers):
    if not numbers: return None
    maximum = numbers[0]
    for n in numbers:
        if n > maximum:
            maximum = n
    return maximum

# Exercise 6: Factorial
def factorial(n):
    return 1 if n == 0 else n * factorial(n - 1)

# Exercise 7: Count element without .count()
def list_count(lst, element):
    total = 0
    for item in lst:
        if item == element:
            total += 1
    return total

# Exercise 8: L2-Norm
def l2_norm(numbers):
    return math.sqrt(sum(x**2 for x in numbers))

# Exercise 9: Is Monotonic
def is_mono(arr):
    return (all(arr[i] <= arr[i+1] for i in range(len(arr)-1)) or 
            all(arr[i] >= arr[i+1] for i in range(len(arr)-1)))

# Exercise 10: Longest word in list
def longest_word_in_list(words):
    return max(words, key=len) if words else ""

# Exercise 11: Separate Ints and Strings
def separate_types(mixed_list):
    ints = [x for x in mixed_list if isinstance(x, int)]
    strs = [x for x in mixed_list if isinstance(x, str)]
    return ints, strs

# Exercise 12: Palindrome check
def is_palindrome(string):
    clean_str = string.lower()
    return clean_str == clean_str[::-1]

# Exercise 13: Words longer than k
def sum_over_k(sentence, k):
    words = sentence.split()
    return sum(1 for word in words if len(word) > k)

# Exercise 14: Dictionary average
def dict_avg(d):
    return sum(d.values()) / len(d) if d else 0

# Exercise 15: Common divisors
def common_div(a, b):
    limit = min(a, b)
    return [i for i in range(2, limit + 1) if a % i == 0 and b % i == 0]

# Exercise 16: Is Prime
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

# Exercise 17: Even index and even value
def weird_print(lst):
    return [val for idx, val in enumerate(lst) if idx % 2 == 0 and val % 2 == 0]

# Exercise 18: Type count
def type_count(**kwargs):
    counts = {}
    for val in kwargs.values():
        t_name = type(val).__name__
        counts[t_name] = counts.get(t_name, 0) + 1
    return ", ".join([f"{k}: {v}" for k, v in counts.items()])

# Exercise 19: Mimic .split()
def my_split(string, delimiter=" "):
    result = []
    temp = ""
    for char in string:
        if char == delimiter:
            result.append(temp)
            temp = ""
        else:
            temp += char
    result.append(temp)
    return result

# Exercise 20: Password format
def to_password(string):
    return "*" * len(string)

# --- Quick Test ---
if __name__ == "__main__":
    print(f"Ex 4 (Sum): {my_sum([1, 5, 4, 2])}")
    print(f"Ex 9 (Mono): {is_mono([7, 6, 5, 5, 2, 0])}")
    print(f"Ex 18 (Types): {type_count(a=1, b='string', c=1.0, d=True, e=False)}")
    print(f"Ex 20 (Password): {to_password('mypassword')}")
