
import random
import sys
from typing import Dict, Optional
from enum import Enum


# =============================================================================
# GAME LOGIC
# =============================================================================

class Choice(Enum):
    """Enum for valid game choices."""
    ROCK = "rock"
    PAPER = "paper"
    SCISSORS = "scissors"


class Game:
    """
    Handles the core Rock-Paper-Scissors game logic.
    Manages single game rounds including user input, computer selection,
    and result determination.
    """
    
    # Winning combinations: (winner, loser)
    WINNING_COMBOS = {
        (Choice.ROCK, Choice.SCISSORS),
        (Choice.PAPER, Choice.ROCK),
        (Choice.SCISSORS, Choice.PAPER)
    }
    
    VALID_CHOICES = [c.value for c in Choice]
    
    def get_user_item(self) -> Choice:
        """
        Get and validate user's choice.
        
        Returns:
            Choice enum representing user's selection
        """
        print("\n" + "-" * 40)
        print("Choose your weapon:")
        
        for i, choice in enumerate(self.VALID_CHOICES, 1):
            print(f"  {i}. {choice.capitalize()}")
        
        print("-" * 40)
        
        while True:
            user_input = input("Enter choice (1-3 or name): ").strip().lower()
            
            # Check numeric input
            if user_input in ['1', '2', '3']:
                return Choice(self.VALID_CHOICES[int(user_input) - 1])
            
            # Check text input
            if user_input in self.VALID_CHOICES:
                return Choice(user_input)
            
            print("⚠ Invalid choice. Please enter 1, 2, 3 or rock/paper/scissors")
    
    def get_computer_item(self) -> Choice:
        """
        Generate random computer choice.
        
        Returns:
            Choice enum representing computer's selection
        """
        return Choice(random.choice(self.VALID_CHOICES))
    
    def get_game_result(self, user_item: Choice, computer_item: Choice) -> str:
        """
        Determine game result based on choices.
        
        Args:
            user_item: Player's choice
            computer_item: Computer's choice
            
        Returns:
            "win", "draw", or "loss"
        """
        if user_item == computer_item:
            return "draw"
        
        if (user_item, computer_item) in self.WINNING_COMBOS:
            return "win"
        
        return "loss"
    
    def play(self) -> str:
        """
        Execute a complete game round.
        
        Returns:
            Result string: "win", "draw", or "loss"
        """
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)
        
        # Display results
        print("\n" + "=" * 40)
        print("           BATTLE RESULT")
        print("=" * 40)
        print(f"  You:      {user_choice.value.upper()}")
        print(f"  Computer: {computer_choice.value.upper()}")
        print("-" * 40)
        
        if result == "win":
            print("  🎉 YOU WIN!")
        elif result == "draw":
            print("  🤝 IT'S A DRAW!")
        else:
            print("  💻 COMPUTER WINS!")
        
        print("=" * 40)
        
        return result


# =============================================================================
# MENU & UI
# =============================================================================

class GameMenu:
    """
    Handles all user interface, menu display, and score management.
    Manages the main game loop and results tracking.
    """
    
    MENU_WIDTH = 40
    
    def __init__(self):
        """Initialize menu with empty results tracker."""
        self.results: Dict[str, int] = {"win": 0, "loss": 0, "draw": 0}
        self.running = True
    
    def _print_header(self, title: str) -> None:
        """Print formatted header."""
        print("\n" + "=" * self.MENU_WIDTH)
        print(f"{title:^{self.MENU_WIDTH}}")
        print("=" * self.MENU_WIDTH)
    
    def _print_separator(self) -> None:
        """Print separator line."""
        print("-" * self.MENU_WIDTH)
    
    def get_user_menu_choice(self) -> str:
        """
        Display menu and get user selection.
        
        Returns:
            User's choice: "play", "results", or "quit"
        """
        self._print_header("ROCK PAPER SCISSORS")
        print("1. 🎮 Play a new game")
        print("2. 📊 Show scores")
        print("3. 🚪 Quit")
        self._print_separator()
        
        while True:
            choice = input("Enter choice (1-3): ").strip()
            
            if choice == '1':
                return "play"
            elif choice == '2':
                return "results"
            elif choice == '3':
                return "quit"
            else:
                print("⚠ Please enter 1, 2, or 3")
    
    def print_results(self, final: bool = False) -> None:
        """
        Display current game statistics.
        
        Args:
            final: If True, show thank you message
        """
        self._print_header("GAME STATISTICS")
        
        total = sum(self.results.values())
        
        if total == 0:
            print("  No games played yet")
        else:
            print(f"  🏆 Wins:   {self.results['win']}")
            print(f"  💔 Losses: {self.results['loss']}")
            print(f"  🤝 Draws:  {self.results['draw']}")
            self._print_separator()
            print(f"  📈 Total games: {total}")
            
            # Calculate win rate
            win_rate = (self.results['win'] / total * 100) if total > 0 else 0
            print(f"  🎯 Win rate: {win_rate:.1f}%")
        
        print("=" * self.MENU_WIDTH)
        
        if final:
            print("\n✨ Thank you for playing!")
            print("   Rock Paper Scissors - See you next time!")
    
    def play_game(self) -> None:
        """Execute a single game round and update scores."""
        game = Game()
        result = game.play()
        self.results[result] += 1
    
    def run(self) -> None:
        """Main application loop."""
        print("\n" + "🎮 Welcome to Rock Paper Scissors!")
        print("   The classic game of strategy and luck")
        
        while self.running:
            choice = self.get_user_menu_choice()
            
            if choice == "play":
                self.play_game()
                
            elif choice == "results":
                self.print_results()
                
            elif choice == "quit":
                self.print_results(final=True)
                self.running = False
        
        print()


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

def main():
    """Application entry point."""
    try:
        menu = GameMenu()
        menu.run()
    except KeyboardInterrupt:
        print("\n\n👋 Game interrupted. Goodbye!")
        sys.exit(0)


if __name__ == "__main__":
    main()