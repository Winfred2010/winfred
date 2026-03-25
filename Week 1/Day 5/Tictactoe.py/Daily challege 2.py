import random

# Initial setup provided
list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

def find_sum_pairs(nums, target):
    seen = set()
    pairs = set()
    
    for num in nums:
        complement = target - num
        # If the complement was already seen, we found a pair
        if complement in seen:
            # Sorting the tuple ensures (a, b) and (b, a) are stored as the same pair
            pairs.add(tuple(sorted((num, complement))))
        seen.add(num)
        
    return list(pairs)

# Find and display the pairs
all_pairs = find_sum_pairs(list_of_numbers, target_number)

print(f"Total unique pairs found: {len(all_pairs)}")
print("Sample pairs:", all_pairs[:10]) # Displaying first 10 for readability
