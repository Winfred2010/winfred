import random

wordslist = ['correction', 'childish', 'beach', 'python', 'assertive', 'interference', 'complete', 'share', 'credit card', 'rush', 'south']
word = random.choice(wordslist)

# Game variables
guessed_letters = []  # Track letters that have been guessed
wrong_guesses = 0   # Count wrong guesses (max 6)
max_wrong = 6       # Maximum wrong guesses allowed

# Create display with stars (handle spaces for multi-word phrases)
display = []
for char in word:
    if char == ' ':
        display.append(' ')  # Show spaces as spaces
    else:
        display.append('*')  # Hide letters with stars

print("=" * 50)
print("           WELCOME TO HANGMAN!")
print("=" * 50)
print(f"\nThe word/phrase has {len([c for c in word if c != ' '])} letters.")
print("You have 6 chances to guess wrong.")
print("Type 'quit' to exit the game.\n")

# Main game loop
while wrong_guesses < max_wrong and '*' in display:
    # Show current state
    print(f"\nWord: {' '.join(display)}")
    print(f"Guessed letters: {', '.join(guessed_letters) if guessed_letters else 'None'}")
    print(f"Wrong guesses: {wrong_guesses}/{max_wrong}")
    
    # Draw hangman
    print("\n  +---+")
    print("  |   |")
    
    # Head
    if wrong_guesses >= 1:
        print("  O   |")
    else:
        print("      |")
    
    # Body and arms
    if wrong_guesses >= 4:
        print(" /|\\  |")  # Both arms + body
    elif wrong_guesses >= 3:
        print(" /|   |")  # Left arm + body
    elif wrong_guesses >= 2:
        print("  |   |")  # Just body
    else:
        print("      |")
    
    # Legs
    if wrong_guesses >= 6:
        print(" / \\  |")  # Both legs
    elif wrong_guesses >= 5:
        print(" /    |")  # Left leg
    else:
        print("      |")
    
    print("      |")
    print("=========")
    
    # Get player input
    guess = input("\nGuess a letter: ").lower().strip()
    
    # Check for quit
    if guess == 'quit':
        print(f"\nThe word was: '{word}'")
        print("Thanks for playing!")
        break
    
    # Validate input
    if len(guess) != 1 or not guess.isalpha():
        print("❌ Please enter a single letter!")
        continue
    
    # Check if already guessed
    if guess in guessed_letters:
        print(f"⚠️  You already guessed '{guess}'! Try a different letter.")
        continue
    
    # Add to guessed letters
    guessed_letters.append(guess)
    
    # Check if letter is in word
    if guess in word.lower():
        print(f"✅ '{guess}' is in the word!")
        # Reveal all occurrences (case insensitive)
        for i, char in enumerate(word):
            if char.lower() == guess:
                display[i] = char  # Keep original case
    else:
        wrong_guesses += 1
        print(f"❌ '{guess}' is not in the word!")
        remaining = max_wrong - wrong_guesses
        print(f"You have {remaining} wrong guess(es) remaining.")

else:
    # Game ended (won or lost)
    print(f"\n{'=' * 50}")
    
    if '*' not in display:
        # Player won
        print("           🎉 CONGRATULATIONS! 🎉")
        print(f"      You guessed the word: '{word}'")
        print(f"      Wrong guesses: {wrong_guesses}/{max_wrong}")
    else:
        # Player lost
        print("           💀 GAME OVER 💀")
        print(f"      The word was: '{word}'")
        # Show final hangman
        print("\n  +---+")
        print("  |   |")
        print("  O   |")
        print(" /|\\  |")
        print(" / \\  |")
        print("      |")
        print("=========")
    
    print("=" * 50)