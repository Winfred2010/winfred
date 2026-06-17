# --- Exercise 1: Cats ---
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

def find_oldest_cat(cat1, cat2, cat3):
    """Compares ages and returns the oldest cat object."""
    cats = [cat1, cat2, cat3]
    oldest = cats[0]
    for cat in cats:
        if cat.age > oldest.age:
            oldest = cat
    return oldest

# Step 1: Create cat objects
cat1 = Cat("Luna", 3)
cat2 = Cat("Milo", 7)
cat3 = Cat("Oliver", 5)

# Step 3: Print details
oldest = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.\n")


# --- Exercise 2: Dogs ---
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")

# Step 2 & 3: Instantiate and call methods
davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

print(f"David's dog: {davids_dog.name}, Height: {davids_dog.height}cm")
davids_dog.bark()
davids_dog.jump()

print(f"Sarah's dog: {sarahs_dog.name}, Height: {sarahs_dog.height}cm")
sarahs_dog.bark()
sarahs_dog.jump()

# Step 4: Compare sizes
if davids_dog.height > sarahs_dog.height:
    print(f"The bigger dog is {davids_dog.name}.\n")
else:
    print(f"The bigger dog is {sarahs_dog.name}.\n")


# --- Exercise 3: Songs ---
class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway = Song([
    "There’s a lady who's sure", 
    "all that glitters is gold", 
    "and she’s buying a stairway to heaven"
])
stairway.sing_me_a_song()
print()


# --- Exercise 4: Zoo ---
class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
        self.grouped_animals = {}

    def add_animal(self, *new_animals):
        """Bonus: Added *args to handle multiple animals at once."""
        for animal in new_animals:
            if animal not in self.animals:
                self.animals.append(animal)

    def get_animals(self):
        print(f"Current animals in {self.name}: {', '.join(self.animals)}")

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold.")

    def sort_animals(self):
        """Sorts animals and groups them into a dictionary by first letter."""
        self.animals.sort()
        self.grouped_animals = {}
        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in self.grouped_animals:
                self.grouped_animals[first_letter] = [animal]
            else:
                self.grouped_animals[first_letter].append(animal)

    def get_groups(self):
        print(f"Groups in {self.name}:")
        for letter, names in self.grouped_animals.items():
            print(f"{letter}: {names}")

# Step 2 & 3: Testing the Zoo
brooklyn_safari = Zoo("Brooklyn Safari")
brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cat", "Cougar", "Zebra", "Lion")
brooklyn_safari.get_animals()
brooklyn_safari.sell_animal("Bear")
brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()
