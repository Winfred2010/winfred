import json
import random
import re

# ==========================================
# Valentine's Special Logic
# ==========================================

class ValentineManager:
    def __init__(self, filename="restaurant_menu.json"):
        self.filename = filename
        self.data = self._load_data()
        if "valentine_items" not in self.data:
            self.data["valentine_items"] = []

    def _load_data(self):
        try:
            with open(self.filename, "r") as f: return json.load(f)
        except: return {"items": []}

    def print_heart(self):
        heart = ["  ***   ***  ", " ***** ***** ", "*************", 
                 " *********** ", "  *********  ", "   *******   ", 
                 "    *****    ", "     ***     ", "      *      "]
        print("\n".join(heart))

    def validate_valentine_item(self, name, price):
        #  No numbers and at least two 'e'
        if any(char.isdigit() for char in name) or name.lower().count('e') < 2:
            return False
        
        # XX,14 pattern
        if not re.match(r"^\d{2},14$", price):
            return False

        #  Capitalization rules
        words = name.split()
        if not words[0].startswith('V'): return False
        
        connectors = ["of", "and", "with", "the", "in"]
        for word in words:
            if word.lower() in connectors:
                if word != word.lower(): return False
            elif not word[0].isupper(): return False
        
        return True

# ==========================================
#  D&D Character System
# ==========================================

class Character:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.stats = self.generate_stats()

    def generate_stats(self):
        attributes = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
        results = {}
        for attr in attributes:
            rolls = [random.randint(1, 6) for _ in range(4)]
            rolls.sort()
            results[attr] = sum(rolls[1:]) # Sum top 3
        return results

class Game:
    @staticmethod
    def run():
        num_players = int(input("How many players are joining? "))
        players = []
        for i in range(num_players):
            name = input(f"Player {i+1} Name: ")
            age = input(f"Player {i+1} Age: ")
            players.append(Character(name, age))
        
        # Export JSON
        with open("characters.json", "w") as f:
            json.dump([p.__dict__ for p in players], f, indent=4)
        
        # Export TXT
        with open("characters.txt", "w") as f:
            for p in players:
                f.write(f"NAME: {p.name} | AGE: {p.age}\nSTATS: {p.stats}\n---\n")

if __name__ == "__main__":
    # To run, simply call:
    # Game.run() 
    pass
