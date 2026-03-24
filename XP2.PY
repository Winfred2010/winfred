import random

# ==========================================
#Pets and Cats
# ==========================================

class Pets:
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat:
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Siamese(Cat):
    """Step 1: Siamese breed inheriting from Cat."""
    pass

# Create a list of cat instances
all_cats = [
    Bengal("Tiger", 3),
    Chartreux("Felix", 5),
    Siamese("Misty", 2)
]

#  Manage pets and walk
print("--- Exercise 1: Pets ---")
sara_pets = Pets(all_cats)
sara_pets.walk()


# ==========================================
# Dogs
# ==========================================

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        
        winner = self.name if my_power > other_power else other_dog.name
        return f"In a fight between {self.name} and {other_dog.name}, the winner is: {winner}"


# ==========================================
#  Dogs Domesticated
# ==========================================

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        # Extract names from Dog objects or strings passed in
        dog_names = [self.name] + [dog.name if isinstance(dog, Dog) else str(dog) for dog in args]
        print(f"{', '.join(dog_names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll", 
                "stands on his back legs", 
                "shakes your hand", 
                "plays dead"
            ]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} needs more training before doing tricks!")

# Testing Dogs
print("\n--- Exercise 2 & 3: Dog Tests ---")
dog1 = PetDog("Rex", 4, 30)
dog2 = PetDog("Buddy", 2, 15)
dog3 = Dog("Tank", 6, 45)

dog1.train()
dog1.play(dog2, dog3)
dog1.do_a_trick()
print(dog1.fight(dog3))


# ==========================================
# 🌟 Exercise 4: Family and Person
# ==========================================

class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18

class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        new_member = Person(first_name, age)
        new_member.last_name = self.last_name
        self.members.append(new_member)
        print(f"Welcome to the family, {first_name}!")

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(f"You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print(f"Sorry {first_name}, you are not allowed to go out with your friends.")
                return
        print(f"No family member found with the name {first_name}.")

    def family_presentation(self):
        print(f"\n--- {self.last_name} Family Presentation ---")
        for member in self.members:
            print(f"Name: {member.first_name}, Age: {member.age}")

# Testing Family
print("\n--- Exercise 4: Family Tests ---")
smiths = Family("Smith")
smiths.born("Michael", 20)
smiths.born("Sarah", 12)

smiths.family_presentation()
smiths.check_majority("Michael")
smiths.check_majority("Sarah")
