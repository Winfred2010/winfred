

import random
from googletrans import Translator

# ==========================================
#  Configuration & Data
# ==========================================
# Our source list of French words
french_vocabulary = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

# ==========================================
# Translation Logic
# ==========================================
def create_translation_map(word_list):
    """
    Translates a list of French words into an English dictionary.
    Uses batch translation for better performance.
    """
    translator = Translator()
    
    try:
        #  Translate the entire list in one API call
        results = translator.translate(word_list, src='fr', dest='en')
        
        #  Build the dictionary using the origin and translated text
        # results is a list of translation objects
        translation_dict = {obj.origin: obj.text for obj in results}
        return translation_dict

    except Exception as error:
        return f"Error during translation: {error}"

# ==========================================
#  Main Execution
# ==========================================
if __name__ == "__main__":
    print("--- Starting Vocabulary Translation ---")
    
    # Run the translation
    final_dict = create_translation_map(french_vocabulary)
    
    # Print the full dictionary result
    print(f"Final Dictionary: {final_dict}")

    # Example of using 'import random' for a beginner touch
    if isinstance(final_dict, dict):
        random_fr = random.choice(list(final_dict.keys()))
        print(f"\nRandom Word of the Day: {random_fr} -> {final_dict[random_fr]}")

