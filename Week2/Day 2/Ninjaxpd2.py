import os
import time
import random

class Cell:
    """Represents a single cell in the grid."""
    def __init__(self, alive=False):
        self.alive = alive

    def __str__(self):
        # '■' for alive, ' ' for dead for a clean visual look
        return "■" if self.alive else " "

class GameOfLife:
    """
    Manages the universe of the Game of Life.
    Handles fixed borders and rules of evolution.
    """
    def __init__(self, rows, cols, seed_type="random"):
        self.rows = rows
        self.cols = cols
        self.grid = [[Cell() for _ in range(cols)] for _ in range(rows)]
        self._seed_grid(seed_type)

    def _seed_grid(self, seed_type):
        """Initializes the grid based on the chosen pattern."""
        if seed_type == "random":
            for row in self.grid:
                for cell in row:
                    cell.alive = random.random() < 0.2
        elif seed_type == "glider":
            # Preset 'Glider' pattern
            coords = [(1, 2), (2, 3), (3, 1), (3, 2), (3, 3)]
            for r, c in coords:
                self.grid[r][c].alive = True

    def get_neighbors_count(self, r, c):
        """Counts alive neighbors using 8-way adjacency."""
        count = 0
        for i in range(-1, 2):
            for j in range(-1, 2):
                if i == 0 and j == 0: continue
                
                nr, nc = r + i, c + j
                # Fixed Borders logic: Ignore out-of-bounds coordinates
                if 0 <= nr < self.rows and 0 <= nc < self.cols:
                    if self.grid[nr][nc].alive:
                        count += 1
        return count

    def next_generation(self):
        """Applies Conway's rules to generate the next state."""
        new_grid_states = []

        for r in range(self.rows):
            row_states = []
            for c in range(self.cols):
                neighbors = self.get_neighbors_count(r, c)
                is_alive = self.grid[r][c].alive

                # Rules of Life
                if is_alive and (neighbors < 2 or neighbors > 3):
                    row_states.append(False) # Under/Overpopulation
                elif not is_alive and neighbors == 3:
                    row_states.append(True)  # Reproduction
                else:
                    row_states.append(is_alive) # Survival
            new_grid_states.append(row_states)

        # Apply new states to the actual objects
        for r in range(self.rows):
            for c in range(self.cols):
                self.grid[r][c].alive = new_grid_states[r][c]

    def display(self, gen_num):
        """Clears the console and prints the current generation."""
        os.system('cls' if os.name == 'nt' else 'clear')
        print(f"--- Generation {gen_num} ---")
        for row in self.grid:
            print(" ".join(str(cell) for cell in row))
        print("\nPress Ctrl+C to stop.")

def play_game(rows=20, cols=40, delay=0.2, pattern="random"):
    game = GameOfLife(rows, cols, pattern)
    gen = 0
    try:
        while True:
            game.display(gen)
            game.next_generation()
            gen += 1
            time.sleep(delay)
    except KeyboardInterrupt:
        print("\nSimulation ended.")

if __name__ == "__main__":
    # You can change pattern to "glider" or "random"
    play_game(rows=20, cols=50, pattern="random")
