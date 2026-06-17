import re
import string
from collections import Counter

class Text:
    """
    Base class for text analysis. 
    Supports word frequency, common word detection, and unique word extraction.
    """
    def __init__(self, text: str):
        self.text = text

    def _get_words(self):
        """Helper to get a clean list of words (lowercase)."""
        return self.text.lower().split()

    def word_frequency(self, word: str):
        """Returns the count of a specific word."""
        words = self._get_words()
        count = words.count(word.lower())
        return count if count > 0 else f"'{word}' not found in text."

    def most_common_word(self):
        """Returns the word that appears most frequently."""
        words = self._get_words()
        if not words:
            return None
        # Counter is the professional way to handle frequencies
        counts = Counter(words)
        return counts.most_common(1)[0][0]

    def unique_words(self):
        """Returns a list of unique words found in the text."""
        return list(set(self._get_words()))

    @classmethod
    def from_file(cls, file_path: str):
        """Factory method to create a Text instance from a file."""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return cls(content)


class TextModification(Text):
    """
    Extends Text class to provide cleaning and preprocessing capabilities.
    """
    
    # Common English stop words
    STOP_WORDS = {
        "a", "an", "the", "and", "or", "but", "if", "because", "as", "what",
        "which", "this", "that", "these", "those", "then", "just", "so", "than",
        "only", "very", "it", "its", "with", "is", "was", "were", "be", "been", "am"
    }

    def remove_punctuation(self):
        """Removes all standard punctuation from the text."""
        translator = str.maketrans('', '', string.punctuation)
        self.text = self.text.translate(translator)
        return self.text

    def remove_stop_words(self):
        """Filters out common English stop words."""
        words = self.text.split()
        filtered = [w for w in words if w.lower() not in self.STOP_WORDS]
        self.text = " ".join(filtered)
        return self.text

    def remove_special_characters(self):
        """Removes non-alphanumeric characters using RegEx."""
        self.text = re.sub(r'[^a-zA-Z0-9\s]', '', self.text)
        return self.text


# ==========================================
# Testing Block
# ==========================================
if __name__ == "__main__":
    sample_raw = "Hello world! This is a simple, simple world. Is it not?"
    
    #  Analysis
    analyzer = Text(sample_raw)
    print(f"Most Common: {analyzer.most_common_word()}")
    print(f"Frequency of 'simple': {analyzer.word_frequency('simple')}")
    print(f"Unique Words: {len(analyzer.unique_words())}")

    #  Modification
    cleaner = TextModification(sample_raw)
    cleaner.remove_punctuation()
    cleaner.remove_stop_words()
    print(f"\nModified Text: {cleaner.text}")
