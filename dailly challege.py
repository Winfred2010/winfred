def char_index_map():
    """Challenge 1: Maps characters in a word to their index positions."""
    word = input("Enter a word: ")
    index_map = {}

    for index, char in enumerate(word):
        if char not in index_map:
            index_map[char] = [index]
        else:
            index_map[char].append(index)
            
    print(f"Index Map: {index_map}")

def affordable_items(items_purchase, wallet_str):
    """Challenge 2: Determines which items are affordable based on wallet balance."""
    
    # Data Cleaning: Remove '$' and ',' then convert to integer
    def clean_currency(value):
        return int(value.replace("$", "").replace(",", ""))

    wallet = clean_currency(wallet_str)
    basket = []

    # Process items in order of priority (dictionary order)
    for item, price_str in items_purchase.items():
        price = clean_currency(price_str)
        
        if wallet >= price:
            basket.append(item)
            wallet -= price

    # Output logic
    if not basket:
        print("Nothing")
    else:
        print(f"Purchased Items: {sorted(basket)}")

if __name__ == "__main__":
    # Test Challenge 1
    print("--- Challenge 1: Character Map ---")
    char_index_map()
    
    print("\n--- Challenge 2: Shopping Basket ---")
    # Test Case Example
    store_items = {
        "Water": "$1", 
        "Bread": "$3", 
        "TV": "$1,000", 
        "Fertilizer": "$20"
    }
    my_wallet = "$300"
    affordable_items(store_items, my_wallet)
