class AnagramChecker:
    def __init__(self, file_path='sowpods.txt'):
        """Load the word list from a file into a set for fast searching."""
        try:
            with open(file_path, 'r') as f:
                # Store as a set of lowercase words for O(1) lookup speed
                self.word_list = set(word.strip().lower() for word in f)
        except FileNotFoundError:
            print(f"Error: The file {file_path} was not found.")
            self.word_list = set()

    def is_valid_word(self, word):
        """Check if the word exists in the dictionary."""
        return word.lower() in self.word_list

    def is_anagram(self, word1, word2):
        """Check if two words are anagrams (same letters, different order)."""
        w1 = word1.lower()
        w2 = word2.lower()
        # Anagrams must have the same sorted characters but not be the same word
        return sorted(w1) == sorted(w2) and w1 != w2

    def get_anagrams(self, word):
        """Find all anagrams for a given word from the word list."""
        target_word = word.lower()
        target_sorted = sorted(target_word)
        
        # Using a list comprehension for clean, 'Pythonic' filtering
        return [
            w for w in self.word_list 
            if sorted(w) == target_sorted and w != target_word
        ]