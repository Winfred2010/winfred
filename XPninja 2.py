import time
import os
import random

class Cell:
    """Represents a single cell in the grid."""
    def __init__(self, is_alive=False):
        self.is_alive = is_alive

    def __str__(self):
        return "■" if self.is_alive else " "

class GameOfLife:
    """Manages the grid and rules of the Game of Life."""
    def __init__(self, rows, cols, initial_state=None):
        self.rows = rows
        self.cols = cols
        # Initialize grid with Cell objects
        self.grid = [[Cell() for _ in range(cols)] for _ in range(rows)]
        
        if initial_state == "random":
            self._randomize()
        elif initial_state:
            self._apply_initial_state(initial_state)

    def _randomize(self):
        """Populates the grid with a random initial state."""
        for row in self.grid:
            for cell in row:
                cell.is_alive = random.choice([True, False, False])

    def _apply_initial_state(self, live_coords):
        """Sets specific coordinates to be alive (e.g., for 'Glider' or 'Blinker')."""
        for r, c in live_coords:
            if 0 <= r < self.rows and 0 <= c < self.cols:
                self.grid[r][c].is_alive = True

    def _count_live_neighbors(self, r, c):
        """Counts how many of the 8 surrounding cells are alive."""
        count = 0
        for i in range(-1, 2):
            for j in range(-1, 2):
                if i == 0 and j == 0: continue  # Skip the cell itself
                
                nr, nc = r + i, c + j
                # Fixed Borders: Cells outside the grid are considered dead
                if 0 <= nr < self.rows and 0 <= nc < self.cols:
                    if self.grid[nr][nc].is_alive:
                        count += 1
        return count

    def update_generation(self):
        """Applies rules to every cell to create the next generation."""
        new_states = [[False for _ in range(self.cols)] for _ in range(self.rows)]

        for r in range(self.rows):
            for c in range(self.cols):
                live_neighbors = self._count_live_neighbors(r, c)
                is_alive = self.grid[r][c].is_alive

                # Apply Conway's Rules
                if is_alive:
                    # Survival: 2 or 3 neighbors
                    new_states[r][c] = 2 <= live_neighbors <= 3
                else:
                    # Reproduction: Exactly 3 neighbors
                    new_states[r][c] = live_neighbors == 3

        # Update the actual grid
        for r in range(self.rows):
            for c in range(self.cols):
                self.grid[r][c].is_alive = new_states[r][c]

    def display(self, generation):
        """Prints the grid to the console."""
        os.system('cls' if os.name == 'nt' else 'clear')
        print(f"Generation: {generation}")
        print("-" * (self.cols * 2))
        for row in self.grid:
            print(" ".join(str(cell) for cell in row))
        print("-" * (self.cols * 2))

# --- Initial States ---
# A 'Glider' moves across the screen
glider = [(1, 2), (2, 3), (3, 1), (3, 2), (3, 3)]

def play_game(rows=20, cols=40, gens=50, mode="random"):
    game = GameOfLife(rows, cols, initial_state=mode)
    
    for g in range(1, gens + 1):
        game.display(g)
        game.update_generation()
        time.sleep(0.1)

if __name__ == "__main__":
    # To see a glider: play_game(mode=glider)
    # To see a random start: play_game(mode="random")
    play_game()
