# ==========================================
# Daily Challenge: Multi-Priority Data Sorting
# ==========================================

def collect_user_data(entries=5):
    """
    Collects Name, Age, and Score from the user 5 times.
    Returns a list of tuples.
    """
    data_list = []
    print(f"Please enter details for {entries} users (Format: Name, Age, Score):")
    
    for i in range(entries):
        # We split the input by commas and strip whitespace for clean data
        user_input = input(f"Entry {i+1}: ").split(',')
        
        # Ensure we have exactly 3 items per entry
        if len(user_input) == 3:
            name, age, score = [item.strip() for item in user_input]
            data_list.append((name, age, score))
        else:
            print("Invalid format. Please use 'Name, Age, Score'.")
            
    return data_list

# ==========================================
# Logic: Sorting via Lambda
# ==========================================
def sort_user_data(data):
    """
    Sorts the data list with the priority: Name > Age > Score.
    The lambda function returns a tuple of the keys to sort by.
    """
    # item[0] is Name, item[1] is Age, item[2] is Score
    data.sort(key=lambda item: (item[0], int(item[1]), int(item[2])))
    return data

# ==========================================
# Main Execution
# ==========================================
if __name__ == "__main__":
    # Step 1: Collect Input
    raw_data = collect_user_data(5)
    
    # Step 2: Process Sorting
    sorted_results = sort_user_data(raw_data)
    
    # Step 3: Output Result
    print("\nSorted Result:")
    print(sorted_results)
