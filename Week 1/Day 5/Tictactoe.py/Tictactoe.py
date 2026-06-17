import os

def display_board(board):
    """Prints the current state of the 3x3 grid."""
    print("\n")
    for i, row in enumerate(board):
        print(f" {row[0]} | {row[1]} | {row[2]} ")
        if i < 2:
            print("-----------")
    print("\n")

def player_input(player, board):
    """Gets and validates the player's move (row and column)."""
    while True:
        try:
            prompt = f"Player {player}, enter your move (row and column 1-3, e.g., '1 1'): "
            move = input(prompt).split()
            
            if len(move) != 2:
                print("Invalid input. Please enter two numbers separated by a space.")
                continue
            
            # Convert to 0-indexed values
            r, c = int(move[0]) - 1, int(move[1]) - 1
            
            if not (0 <= r <= 2 and 0 <= c <= 2):
                print("Position out of range. Choose numbers between 1 and 3.")
            elif board[r][c] != ' ':
                print("That square is already taken! Try another one.")
            else:
                return r, c
        except ValueError:
            print("Invalid input. Please enter numeric values.")

def check_win(board, player):
    """Checks all horizontal, vertical, and diagonal combinations for a win."""
    # Check rows and columns
    for i in range(3):
        if all(board[i][j] == player for j in range(3)) or \
           all(board[j][i] == player for j in range(3)):
            return True
    
    # Check diagonals
    if all(board[i][i] == player for i in range(3)) or \
       all(board[i][2-i] == player for i in range(3)):
        return True
        
    return False

def check_tie(board):
    """Checks if the board is full with no winner."""
    return all(cell != ' ' for row in board for cell in row)

def play():
    """Manages the main game flow."""
    # Step 1: Initialize empty 3x3 board
    board = [[' ' for _ in range(3)] for _ in range(3)]
    current_player = 'X'
    
    print("Welcome to Tic Tac Toe!")
    
    while True:
        display_board(board)
        
        # Step 3: Get move
        row, col = player_input(current_player, board)
        board[row][col] = current_player
        
        # Step 4: Check winner
        if check_win(board, current_player):
            display_board(board)
            print(f"Congratulations! Player {current_player} wins!")
            break
            
        # Step 5: Check tie
        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break
            
        # Switch player
        current_player = 'O' if current_player == 'X' else 'X'

if __name__ == "__main__":
    play()
