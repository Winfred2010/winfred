 #Quiz
#Class: A blueprint or template for creating objects, defining their common attributes and behaviors.
#Instance: A specific object created from a class, representing a unique manifestation of that blueprint.
#Encapsulation: The practice of bundling data and methods within a single unit and restricting direct access to internal states (using private/protected members).
#Abstraction: Hiding complex implementation details and showing only the essential features of an object to the user.
#Inheritance: A mechanism where a "child" class derives attributes and methods from a "parent" class to promote code reuse.
#Multiple Inheritance: A feature where a class can inherit features from more than one parent class.
#Polymorphism: The ability of different classes to be treated as instances of the same interface, allowing a single method name to behave differently across types.
#Method Resolution Order (MRO): The specific order in which Python looks for a method in a hierarchy of classes, especially important in multiple inheritance.
import random
from typing import List, Optional

class Card:
    """Represents a single playing card."""
    def __init__(self, suit: str, value: str):
        self.suit = suit
        self.value = value

    def __repr__(self) -> str:
        return f"{self.value} of {self.suit}"

class Deck:
    """Represents a deck of 52 playing cards."""
    SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"]
    VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    def __init__(self):
        self.cards: List[Card] = []
        self.reset_deck()

    def reset_deck(self) -> None:
        """Populates the deck with a standard set of 52 cards."""
        self.cards = [Card(s, v) for s in self.SUITS for v in self.VALUES]

    def shuffle(self) -> None:
        """Ensures a full deck is present and rearranges them randomly."""
        if len(self.cards) != 52:
            self.reset_deck()
        random.shuffle(self.cards)

    def deal(self) -> Optional[Card]:
        """Removes and returns a single card from the deck."""
        if not self.cards:
            print("No cards left in the deck.")
            return None
        return self.cards.pop()

# --- Testing the implementation ---
if __name__ == "__main__":
    deck = Deck()
    deck.shuffle()
    
    # Deal 5 cards as a test
    print("Dealing 5 cards:")
    for _ in range(5):
        card = deck.deal()
        print(f"  Dealt: {card}")
    
    print(f"Cards remaining in deck: {len(deck.cards)}")
