# rock_paper_scissors.py
from Game import Game


def get_user_menu_choice() -> str:
    """
    Display menu and get validated user choice.
    
    Returns:
        str: User's menu choice ('g', 's', or 'q')
    """
    print("\n" + "=" * 40)
    print("      ROCK PAPER SCISSORS")
    print("=" * 40)
    print("g - Play a new game")
    print("s - Show scores")
    print("q - Quit")
    print("-" * 40)
    
    while True:
        choice = input("Enter your choice (g/s/q): ").strip().lower()
        
        if choice in ['g', 's', 'q']:
            return choice
        
        print("Invalid choice. Please enter 'g', 's', or 'q'.")


def print_results(results: dict) -> None:
    """
    Display game results in user-friendly format.
    
    Args:
        results: Dictionary with 'win', 'loss', 'draw' counts
    """
    print("\n" + "=" * 40)
    print("         GAME SUMMARY")
    print("=" * 40)
    print(f"Wins:   {results.get('win', 0)}")
    print(f"Losses: {results.get('loss', 0)}")
    print(f"Draws:  {results.get('draw', 0)}")
    print("-" * 40)
    total = sum(results.values())
    print(f"Total games: {total}")
    print("=" * 40)
    print("Thanks for playing! 👋")


def main() -> None:
    """
    Main game loop with menu system.
    """
    results = {"win": 0, "loss": 0, "draw": 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == 'g':
            # Play new game
            game = Game()
            result = game.play()
            results[result] += 1
            print(f"\n[Score updated: {result}]")
            
        elif choice == 's':
            # Show current scores
            print("\n--- Current Scores ---")
            for key, value in results.items():
                print(f"{key.capitalize()}: {value}")
                
        elif choice == 'q':
            # Quit and show final results
            print_results(results)
            break


if __name__ == "__main__":
    main()