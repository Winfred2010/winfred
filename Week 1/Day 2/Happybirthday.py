from datetime import date

def get_birthday_cake(day, month, year):
    # Calculate current age
    today = date.today()
    birth_date = date(year, month, day)
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    
    #  Determine number of candles (last digit of age)
    candle_count = age % 10
    candles = "i" * candle_count
    
    # Check for Leap Year
    is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
    
    #  Design the cake
    cake_template = f"""
       ___{candles:^5}___

      |:H:a:p:p:y:|
    __|___________|__

   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~
    """
    
    print(f"Name: Winfred | Age: {age} | Candles: {candle_count}")
    print(cake_template)
    
    if is_leap:
        print("\nBonus: Leap Year Cake!")
        print(cake_template)

# Run for Winfred
get_birthday_cake(15, 2, 1989)