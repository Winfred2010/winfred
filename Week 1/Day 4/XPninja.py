#  Full Name Formatter
def get_full_name(first_name, last_name, middle_name=""):
    """Returns a formatted full name, handling optional middle names."""
    if middle_name:
        full_name = f"{first_name} {middle_name} {last_name}"
    else:
        full_name = f"{first_name} {last_name}"
    return full_name.title()

# English to Morse Translator
MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', ' ': '/'
}

def english_to_morse(text):
    """Converts English text to Morse code."""
    morse = []
    for char in text.upper():
        if char in MORSE_CODE_DICT:
            morse.append(MORSE_CODE_DICT[char])
    return " ".join(morse)

#  Box of Stars
def box_printer(*args):
    """Prints strings inside a rectangular frame of stars."""
    if not args:
        return
    
    longest = max(len(word) for word in args)
    width = longest + 4
    
    print("*" * width)
    for word in args:
        print(f"* {word.ljust(longest)} *")
    print("*" * width)

#  Insertion Sort Analysis
# PURPOSE: This algorithm sorts a list of numbers in ascending order.
# It works by taking one element at a time and "inserting" it into its 
# correct sorted position relative to the elements before it.
def insertion_sort(alist):
    for index in range(1, len(alist)):
        currentvalue = alist[index]
        position = index
        while position > 0 and alist[position-1] > currentvalue:
            alist[position] = alist[position-1]
            position = position - 1
        alist[position] = currentvalue

if __name__ == "__main__":
    # Test Exercise 1 with your name, Winfred!
    print("--- Exercise 1: Names ---")
    print(get_full_name(first_name="winfred", middle_name="munyiva", last_name="luvai"))
    print(get_full_name(first_name="bruce", last_name="lee"))


    print("\n--- Exercise 2: Morse ---")
    print(f"Morse: {english_to_morse('Hello World')}")

    
    print("\n--- Exercise 3: Box Printer ---")
    box_printer("Hello", "Winfred", "in", "a", "frame", "reallylongword")

    print("\n--- Exercise 4: Insertion Sort ---")
    numbers = [54, 26, 93, 17, 77, 31, 44, 55, 20]
    insertion_sort(numbers)
    print(f"Sorted List: {numbers}")
