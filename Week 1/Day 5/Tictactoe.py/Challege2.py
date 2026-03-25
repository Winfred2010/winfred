# ==========================================
# Exercise 1: Pattern Drawing
# ==========================================

def draw_patterns():
    """Generates geometric patterns using nested loops."""
    
    # Pattern A: Centered Pyramid
    print("Pattern A:")
    rows_a = 3
    for i in range(rows_a):
        spaces = " " * (rows_a - i - 1)
        stars = "*" * (2 * i + 1)
        print(f"{spaces}{stars}")

    print("\nPattern B: Right-Aligned Triangle")
    rows_b = 5
    for i in range(1, rows_b + 1):
        spaces = " " * (rows_b - i)
        stars = "*" * i
        print(f"{spaces}{stars}")

    print("\nPattern C: Mirrored Triangles")
    rows_c = 5
    # Top half (Left-aligned)
    for i in range(1, rows_c + 1):
        print("*" * i)
    # Bottom half (Right-aligned decreasing)
    for i in range(rows_c, 0, -1):
        spaces = " " * (rows_c - i)
        stars = "*" * i
        print(f"{spaces}{stars}")


# ==========================================
# Exercise 2: Code Analysis (Selection Sort)
# ==========================================

def analyzed_sort():
    """
    Purpose: This program implements a 'Selection Sort' algorithm.
    It iterates through the list, finds the smallest remaining 
    element, and swaps it into its correct sorted position.
    """
    
    my_list = [2, 24, 12, 354, 233] # Initial: [2, 24, 12, 354, 233]
    
    # Loop through the list indices except the last
    for i in range(len(my_list) - 1):
        minimum = i  # Assume current index i holds the smallest value
        
        # Inner loop: Check all elements to the right of 'i'
        for j in range(i + 1, len(my_list)):
            # If a smaller value is found at index j
            if my_list[j] < my_list[minimum]:
                minimum = j # Update the index of the smallest value found
                
                # If the new minimum is not the current starting index
                if minimum != i:
                    # Swap the values: Move smallest value to the current position 'i'
                    my_list[i], my_list[minimum] = my_list[minimum], my_list[i]
                    
    # Trace of changes:
    # i=0: [2, 24, 12, 354, 233] (2 is already smallest)
    # i=1: [2, 12, 24, 354, 233] (12 swapped with 24)
    # i=2: [2, 12, 24, 354, 233] (24 is smallest in remaining list)
    # i=3: [2, 12, 24, 233, 354] (233 swapped with 354)
    
    # Final Output: [2, 12, 24, 233, 354]
    print(f"\nSorted List Output: {my_list}")


if __name__ == "__main__":
    draw_patterns()
    analyzed_sort()
