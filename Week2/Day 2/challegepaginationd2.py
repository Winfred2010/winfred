import math

class Pagination:
    """
    A class to simulate paginated content, supporting navigation, 
    method chaining, and custom string representation.
    """
    def __init__(self, items=None, page_size=10):
        #  Initialize attributes
        self.items = items if items is not None else []
        self.page_size = int(page_size)
        self.current_idx = 0  # Internal 0-based indexing
        
        # Calculate total pages using math.ceil
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1

    def get_visible_items(self):
        """Step 3: Returns the list of items visible on the current page."""
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        """Step 4: Navigates to a specific 1-based page number."""
        page_num = int(page_num)
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page {page_num} is out of range (1-{self.total_pages}).")
        
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        """Navigates to the first page."""
        self.current_idx = 0
        return self

    def last_page(self):
        """Navigates to the last page."""
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        """Moves one page forward if not on the last page."""
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        """Moves one page backward if not on the first page."""
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        """Step 5 Bonus: Returns current page items, each on a new line."""
        return "\n".join(map(str, self.get_visible_items()))

# ==========================================
#  Testing the Code
# ==========================================
if __name__ == "__main__":
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabetList, 4)

    print("Initial items:", p.get_visible_items()) 
    # ['a', 'b', 'c', 'd']

    p.next_page()
    print("Page 2 items:", p.get_visible_items()) 
    # ['e', 'f', 'g', 'h']

    p.last_page()
    print("Last page items:", p.get_visible_items()) 
    # ['y', 'z']

    # Testing Method Chaining Bonus:
    chained_result = p.first_page().next_page().next_page().next_page().get_visible_items()
    print("Chained result (Page 4):", chained_result) 
    # ['m', 'n', 'o', 'p']

    # Testing __str__ representation:
    print("\nCustom string view:")
    p.first_page()
    print(str(p))

    # Error handling tests
    try:
        p.go_to_page(10)
    except ValueError as e:
        print(f"\nCaught Expected Error: {e}")

    try:
        p.go_to_page(0)
    except ValueError as e:
        print(f"Caught Expected Error: {e}")
