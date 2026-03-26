import random
import json
import os

# ==========================================
# Random Sentence Generator
# ==========================================

def get_words_from_file(file_path):
    """Reads a text file and returns a list of words."""
    # Safety check: Create file if it doesn't exist so the code doesn't crash
    if not os.path.exists(file_path):
        with open(file_path, "w") as f:
            f.write("apple banana cherry developer python coding logic simple")
            
    with open(file_path, "r") as file:
        content = file.read()
        return content.split()

def get_random_sentence(length):
    """Constructs a random sentence of a specified length."""
    words_list = get_words_from_file("words.txt")
    if not words_list:
        return "Error: words.txt is empty."

    selected_words = [random.choice(words_list) for _ in range(length)]
    return " ".join(selected_words).lower().capitalize() + "."

def run_generator_ui():
    """Handles user interaction for the generator."""
    print("\n--- Welcome to the Random Sentence Generator ---")
    print("This tool creates unique sentences from a local word list.")
    
    raw_input = input("How many words should the sentence contain? (2-20): ")
    
    if not raw_input.isdigit():
        print("Error: Input must be a valid integer.")
        return
    
    length = int(raw_input)
    if 2 <= length <= 20:
        result = get_random_sentence(length)
        print(f"\nYour generated sentence:\n{result}")
    else:
        print("Error: The length must be between 2 and 20.")

# ==========================================
# 2. JSON Manipulation
# ==========================================

def process_employee_data():
    """Parses, modifies, and exports nested JSON data."""
    sample_json = """{ 
       "company":{ 
          "employee":{ 
             "name":"emma",
             "payable":{ 
                "salary":7000,
                "bonus":800
             }
          }
       }
    }"""

    data = json.loads(sample_json)
    
    # Access nested salary
    salary = data["company"]["employee"]["payable"]["salary"]
    print(f"\nAccessing Salary Data... Current Salary: {salary}")

    # Add new key
    data["company"]["employee"]["birth_date"] = "1994-03-26"

    # Save to file
    with open("updated_employee.json", "w") as out_file:
        json.dump(data, out_file, indent=4)
    print("Modified JSON saved successfully to 'updated_employee.json'.")

# ==========================================
# EXECUTION
# ==========================================
# This block tells Python to actually RUN the functions above
if __name__ == "__main__":
    run_generator_ui()
    process_employee_data()
