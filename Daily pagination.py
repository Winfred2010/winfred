import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        #  Initialize attributes
        self.items = items if items is not None else []
        self.page_size = int(page_size)
        self.current_idx = 0 # Internal 0-based indexing
        
        # Calculate total pages
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1

    def get_visible_items(self):
        """Step 3: Returns items for the current page using slicing."""
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
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        """Step 5: Bonus - Custom string representation."""
        return "\n".join(map(str, self.get_visible_items()))

# --- Challenge Python: Testing & Output ---

if __name__ == "__main__":
    alphabet_list = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabet_list, 4)

    print("Initial Page (1):", p.get_visible_items())
    
    # Testing Method Chaining (Bonus Requirement)
    print("After 3 next_page() calls:", p.next_page().next_page().next_page().get_visible_items())

    # Testing specific navigation
    p.last_page()
    print("Last Page:", p.get_visible_items())

    # Testing __str__ bonus
    p.first_page()
    print("\nString Representation of Page 1:")
    print(str(p))

    # Testing ValueError
    try:
        print("\nAttempting to go to page 10...")
        p.go_to_page(10)
    except ValueError as e:
        print(f"Caught expected error: {e}")
