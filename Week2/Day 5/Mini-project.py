import re

def clean_text(text: str) -> str:
    """Removes all non-alphanumeric characters and converts to lowercase."""
    return re.sub(r'[^a-zA-Z0-9]', '', text).lower()

def is_anagram(word1: str, word2: str) -> bool:
    """Pure logic: returns True if words/phrases are anagrams."""
    w1, w2 = clean_text(word1), clean_text(word2)
    
    # Same word or empty strings are generally not considered anagrams
    if w1 == w2 or not w1:
        return False
        
    return sorted(w1) == sorted(w2)

def run_checker():
    """UI Layer: Handles user interaction and display."""
    print("=" * 40 + "\n🔤 ANAGRAM CHECKER\n" + "=" * 40)

    while True:
        term1 = input("Enter first word/phrase: ").strip()
        term2 = input("Enter second word/phrase: ").strip()

        if not term1 or not term2:
            print("⚠️  Error: Both inputs must contain text.")
            continue

        # Check logic and display result
        if is_anagram(term1, term2):
            print(f"\n✅ '{term1}' & '{term2}' are ANAGRAMS.\n")
        else:
            print(f"\n❌ '{term1}' & '{term2}' are NOT anagrams.\n")

        if input("Check another? (y/n): ").lower() != 'y':
            print("\n👋 Goodbye!")
            break

if __name__ == "__main__":
    run_checker()
