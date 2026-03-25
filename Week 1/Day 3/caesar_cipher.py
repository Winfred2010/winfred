def caesar_cipher(text, shift, mode='encrypt'):
    """
    Encrypts or decrypts text using the Caesar Cipher technique.
    Handles both uppercase and lowercase letters while keeping symbols intact.
    """
    result = ""
    
    # If decrypting, we simply reverse the shift
    if mode == 'decrypt':
        shift = -shift

    for char in text:
        if char.isalpha():
            # Determine if the character is uppercase or lowercase
            start = ord('A') if char.isupper() else ord('a')
            
            # 1. Shift the character
            # 2. Use modulo 26 to wrap around the alphabet
            # 3. Convert back to a character
            new_char = chr((ord(char) - start + shift) % 26 + start)
            result += new_char
        else:
            # Keep spaces and punctuation as they are
            result += char
            
    return result

def main():
    print("--- Caesar Cipher Tool ---")
    
    choice = input("Do you want to (E)ncrypt or (D)ecrypt? ").strip().upper()
    if choice not in ['E', 'D']:
        print("Invalid choice. Please enter E or D.")
        return

    message = input("Enter your message: ")
    try:
        shift_value = int(input("Enter the shift number: "))
    except ValueError:
        print("Error: Shift must be a number.")
        return

    mode = 'encrypt' if choice == 'E' else 'decrypt'
    output = caesar_cipher(message, shift_value, mode)
    
    print(f"\nResult ({mode}ed): {output}")

if __name__ == "__main__":
    main()
