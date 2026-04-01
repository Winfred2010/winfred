# game.py

import random


class Game:
    """
    Handles the core Rock-Paper-Scissors game logic.
    Manages single game rounds including user input, computer selection,
    and result determination.
    """
    
    VALID_CHOICES = ['rock', 'paper', 'scissors']
    
    def get_user_item(self) -> str:
        """
        Get and validate user's choice (rock/paper/scissors).
        
        Returns:
            str: User's validated choice
        """
        while True:
            user_input = input("Select (rock/paper/scissors): ").strip().lower()
            
            if user_input in self.VALID_CHOICES:
                return user_input
            
            print("Invalid choice. Please enter 'rock', 'paper', or 'scissors'.")
    
    def get_computer_item(self) -> str:
        """
        Generate random computer choice.
        
        Returns:
            str: Computer's random choice
        """
        return random.choice(self.VALID_CHOICES)
    
    def get_game_result(self, user_item: str, computer_item: str) -> str:
        """
        Determine game result based on choices.
        
        Args:
            user_item: Player's choice
            computer_item: Computer's choice
            
        Returns:
            str: "win", "draw", or "loss"
        """
        if user_item == computer_item:
            return "draw"
        
        # Winning combinations: (user, computer)
        wins = {
            ('rock', 'scissors'),
            ('paper', 'rock'),
            ('scissors', 'paper')
        }
        
        if (user_item, computer_item) in wins:
            return "win"
        
        return "loss"
    
    def play(self) -> str:
        """
        Execute a complete game round.
        
        Returns:
            str: Result of the game ("win", "draw", or "loss")
        """
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)
        
        # Display results
        print(f"\nYou chose: {user_choice}")
        print(f"Computer chose: {computer_choice}")
        
        if result == "win":
            print("🎉 You win!")
        elif result == "draw":
            print("🤝 It's a draw!")
        else:
            print("💻 Computer wins!")
        
        return result