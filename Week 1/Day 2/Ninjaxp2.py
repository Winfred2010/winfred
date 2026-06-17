import math
import random
import re

# ==========================================
# Formula Calculation
# ==========================================
def calculate_formula():
    print("--- Exercise 1: Formula Calculation ---")
    C, H = 50, 30
    user_input = input("Enter comma-separated numbers for D: ")
    d_values = user_input.split(',')
    
    results = []
    for d in d_values:
        # Q = Square root of [(2 * C * D)/H]
        q = math.sqrt((2 * C * int(d.strip())) / H)
        results.append(str(round(q)))
    
    print(f"Output: {','.join(results)}\n")

# ==========================================
# List Analysis (with Bonus)
# ==========================================
def analyze_integers():
    print("--- Exercise 2: List Analysis ---")
    # Bonus 14: Random amount of integers (at least 50)
    list_size = random.randint(50, 100)
    # Bonus 13: Generate random integers between -100 and 100
    nums = [random.randint(-100, 100) for _ in range(list_size)]

    # 2a. Original list
    print(f"Original List: {nums}")
    # 2b. Sorted descending
    print(f"Sorted (Desc): {sorted(nums, reverse=True)}")
    # 3. First and Last
    print(f"First and Last: {[nums[0], nums[-1]]}")
    # 4. Greater than 50
    print(f"Greater than 50: {[x for x in nums if x > 50]}")
    # 5. Smaller than 10
    print(f"Smaller than 10: {[x for x in nums if x < 10]}")
    # 6. Squared
    print(f"Squared: {' '.join([str(x**2) for x in nums])}")
    # 7. Duplicates
    no_dupes = list(set(nums))
    print(f"Without duplicates: {no_dupes} (Count: {len(no_dupes)})")

    # Bonus 11: Sum, Avg, Max, Min without built-in functions
    total_sum = 0
    largest = nums[0]
    smallest = nums[0]
    for n in nums:
        total_sum += n
        if n > largest: largest = n
        if n < smallest: smallest = n
    
    avg = total_sum / len(nums)
    
    print(f"Sum: {total_sum}")
    print(f"Average: {avg:.2f}")
    print(f"Largest: {largest}")
    print(f"Smallest: {smallest}")
    # Bonus 15: Yes, the code works regardless of list size!
    print(f"Calculated for {len(nums)} items.\n")

# ==========================================
#  Paragraph Analysis
# ==========================================
def analyze_paragraph():
    print("--- Exercise 3: Paragraph Analysis ---")
    text = """Python is high-level and interpreted. It was created by Guido van Rossum. 
    The language is designed for readability and simplicity! Python's large standard 
    library is one of its greatest strengths. Do you like Python? I do."""

    # Stats
    chars = len(text)
    sentences = len(re.split(r'[.!?]+', text.strip())) - 1
    words = text.split()
    unique_words = set([w.lower().strip('.,!?') for w in words])
    non_whitespace = len(text.replace(" ", "").replace("\n", ""))
    
    avg_words_per_sen = len(words) / sentences if sentences > 0 else 0
    non_unique_count = len(words) - len(unique_words)

    print(f"Characters: {chars}")
    print(f"Sentences: {sentences}")
    print(f"Words: {len(words)}")
    print(f"Unique Words: {len(unique_words)}")
    print(f"Non-whitespace Chars: {non_whitespace}")
    print(f"Avg words per sentence: {avg_words_per_sen:.2f}")
    print(f"Amount of non-unique words: {non_unique_count}\n")

# ==========================================
#  Word Frequency
# ==========================================
def word_frequency():
    print("--- Exercise 4: Word Frequency ---")
    user_input = input("Enter a sentence: ")
    words = user_input.split()
    
    # Use a dictionary to count occurrences
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    
    # Sort keys alphabetically
    for word in sorted(freq.keys()):
        print(f"{word}:{freq[word]}")

# ==========================================
# Main Execution
# ==========================================
if __name__ == "__main__":
    calculate_formula()
    analyze_integers()
    analyze_paragraph()
    word_frequency()
