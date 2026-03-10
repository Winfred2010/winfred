def calculate_years(human_years):
    # First year
    if human_years == 1:
        cat_years = 15
        dog_years = 15
    
    # Second year
    elif human_years == 2:
        cat_years = 15 + 9
        dog_years = 15 + 9
    
    # More than 2 years
    else:
        cat_years = 15 + 9 + (human_years - 2) * 4
        dog_years = 15 + 9 + (human_years - 2) * 5
    
    return [human_years, cat_years, dog_years]


# Test cases
print(calculate_years(10))
print(calculate_years(1))
print(calculate_years(2))