import random

# Exercise 1: Quiz Answers (Saved as comments for your reference)
"""
1. Class: A blueprint or template for creating objects.
2. Instance: A specific object created from a class.
3. Encapsulation: Bundling data and methods together and restricting access.
4. Abstraction: Hiding complex details and showing only essentials.
5. Inheritance: A class acquiring properties/methods from another class.
6. Multiple Inheritance: Inheriting from more than one parent class.
7. Polymorphism: Different classes being treated as the same parent type.
8. MRO: The order Python uses to search for methods in class hierarchies.
"""

# Exercise 2: Code Implementation
class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.cards = []
        self.generate_deck()

    def generate_deck(self):
        """Creates a full 52-card deck."""
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        self.cards = [Card(suit, value) for suit in suits for value in values]

    def __len__(self):
        """Allows the use of len(deck_instance)."""
        return len(self.cards)

    def shuffle(self):
        """Ensures 52 cards and rearranges them randomly."""
        if len(self) != 52:
            print("Deck incomplete. Refilling to 52 cards before shuffling...")
            self.generate_deck()
        random.shuffle(self.cards)
        print("Deck shuffled.")

    def deal(self):
        """Deals a single card. Returns None if empty."""
        if not self.cards:
            return None
        return self.cards.pop()

# --- Execution Test ---
if __name__ == "__main__":
    my_deck = Deck()
    my_deck.shuffle()
    
    card_dealt = my_deck.deal()
    if card_dealt:
        print(f"Dealt: {card_dealt}")
    else:
        print("No cards were dealt.")
    print(f"Remaining cards: {len(my_deck)}")
