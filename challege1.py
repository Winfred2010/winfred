import math

class Circle:
    """
    A class representing a Circle. 
    Supports initialization by radius, dynamic diameter updates, 
    and geometric comparisons.
    """
    def __init__(self, radius=1.0):
        self.radius = float(radius)

    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    @property
    def area(self):
        return math.pi * (self.radius ** 2)

    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f})"

    def __repr__(self):
        return f"Circle({self.radius})"

    def __add__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only add another Circle instance.")
        return Circle(self.radius + other.radius)

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return False
        return self.radius == other.radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Comparison only supported between Circles.")
        return self.radius < other.radius

    def __gt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Comparison only supported between Circles.")
        return self.radius > other.radius

# ==========================================
# Testing & Sorting
# ==========================================

if __name__ == "__main__":
    c1 = Circle(3)
    c2 = Circle()
    c2.diameter = 10  # Setting via diameter setter
    
    print(f"--- Circle Details ---")
    print(f"C1: {c1} | Area: {c1.area:.2f}")
    print(f"C2: {c2} | Area: {c2.area:.2f}")

    # Testing Dunders
    c3 = c1 + c2
    print(f"\nSum (C1 + C2): {c3}")
    print(f"Is C2 > C1? {c2 > c1}")
    print(f"Are they equal? {c1 == c2}")

    # Testing Sorting
    circles = [Circle(10), Circle(2), Circle(5), Circle(7)]
    print(f"\nOriginal List: {circles}")
    circles.sort()
    print(f"Sorted List:   {circles}")
