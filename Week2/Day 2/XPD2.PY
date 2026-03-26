import random

# ==========================================
# Pets & Cats (Inheritance)
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

# ==========================================
#  Dog & PetDog
# ==========================================

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        
        winner = self.name if my_power > other_power else other_dog.name
        return f"The winner of the fight is: {winner}"

class PetDog(Dog):
    def __init__(self, name, age, weight):
        #  Use super() to inherit attributes
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        # *args allows multiple dog names or instances
        dog_names = [self.name] + list(args)
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
            print(f"{self.name} is not trained yet!")

# ==========================================
# 🌟  Family & Person
# ==========================================

class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = "" # Set by the Family class

    def is_18(self):
        return self.age >= 18

class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        new_person = Person(first_name, age)
        new_person.last_name = self.last_name
        self.members.append(new_person)
        print(f"Congratulations to the {self.last_name} family on the birth of {first_name}!")

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(f"You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print(f"Sorry {first_name}, you are not allowed to go out with your friends.")
                return

    def family_presentation(self):
        print(f"\n--- The {self.last_name} Family ---")
        for member in self.members:
            print(f"Name: {member.first_name}, Age: {member.age}")

# ==========================================
# 🚀 TESTING THE CODE
# ==========================================

if __name__ == "__main__":
    
    print("--- Exercise 1: Cats Walking ---")
    all_cats = [Bengal("Tiger", 3), Chartreux("Felix", 5), Siamese("Luna", 2)]
    sara_pets = Pets(all_cats)
    sara_pets.walk()

    print("\n--- Exercise 2 & 3: Dog Action ---")
    dog1 = PetDog("Rex", 5, 30)
    dog2 = PetDog("Buddy", 3, 20)
    dog1.train()
    dog1.play("Fido", "Bolt")
    dog1.do_a_trick()
    print(dog1.fight(dog2))

    print("\n--- Exercise 4: Family Details ---")
    smith_family = Family("Smith")
    smith_family.born("Michael", 25)
    smith_family.born("Sarah", 10)
    smith_family.family_presentation()
    smith_family.check_majority("Michael")
    smith_family.check_majority("Sarah")
