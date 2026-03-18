def generate_multiples(number, length):
    """
    Generates a list of multiples of a given number up to a specified length.
    """
    return [number * i for i in range(1, length + 1)]

def remove_consecutive_duplicates(text):
    """
    Processes a string to remove consecutive duplicate letters.
    """
    if not text:
        return ""
    
    result = [text[0]]
    for char in text[1:]:
        if char != result[-1]:
            result.append(char)
    
    return "".join(result)

def main():
    # Multiples Generator
    print("--- Multiples Generator ---")
    try:
        num = int(input("Enter the number: "))
        length = int(input("Enter the length: "))
        print(f"Output: {generate_multiples(num, length)}\n")
    except ValueError:
        print("Please enter valid integers.\n")

    # Consecutive Duplicate Remover
    print("--- Consecutive Duplicate Remover ---")
    user_word = input("Enter a word: ")
    print(f"Output: {remove_consecutive_duplicates(user_word)}")

if __name__ == "__main__":
    main()
