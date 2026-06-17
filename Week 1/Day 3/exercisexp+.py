def student_grade_report():
    """Exercise 1: Student Grading System"""
    student_grades = {
        "Alice": [88, 92, 100],
        "Bob": [75, 78, 80],
        "Charlie": [92, 90, 85],
        "Dana": [83, 88, 92],
        "Eli": [78, 80, 72]
    }

    student_averages = {}
    student_letter_grades = {}

    for name, grades in student_grades.items():
        # Calculate Average
        avg = sum(grades) / len(grades)
        student_averages[name] = avg
        
        # Assign Letter Grade
        if avg >= 90: letter = 'A'
        elif avg >= 80: letter = 'B'
        elif avg >= 70: letter = 'C'
        elif avg >= 60: letter = 'D'
        else: letter = 'F'
        student_letter_grades[name] = letter

    # Class Average
    class_avg = sum(student_averages.values()) / len(student_averages)

    print(f"--- Student Report (Class Avg: {class_avg:.2f}) ---")
    for name in student_grades:
        print(f"{name}: Avg {student_averages[name]:.1f} | Grade: {student_letter_grades[name]}")


def retail_sales_analysis():
    """Exercise 2: Advanced Sales Data Analysis"""
    sales_data = [
        {"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
        {"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
        {"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
        {"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
        {"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
        {"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
        {"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
    ]

    product_revenue = {}
    customer_spending = {}
    purchase_counts = {}

    # 1, 2, & 3: Data Enhancement and Aggregation
    for sale in sales_data:
        total_price = sale["price"] * sale["quantity"]
        sale["total_price"] = total_price  # Field added
        
        # Product Revenue
        prod = sale["product"]
        product_revenue[prod] = product_revenue.get(prod, 0) + total_price
        
        # Customer Profile
        cid = sale["customer_id"]
        customer_spending[cid] = customer_spending.get(cid, 0) + total_price
        purchase_counts[cid] = purchase_counts.get(cid, 0) + 1

    # 4. High-Value Transactions (> $500)
    high_value = [s for s in sales_data if s["total_price"] > 500]
    high_value.sort(key=lambda x: x["total_price"], reverse=True)

    # 5. Loyal Customers (> 1 purchase)
    loyal_customers = [cid for cid, count in purchase_counts.items() if count > 1]

    print("\n--- Retail Analysis Results ---")
    print(f"Revenue per Product: {product_revenue}")
    print(f"Spending per Customer: {customer_spending}")
    print(f"Loyal Customer IDs: {loyal_customers}")
    print(f"Top High-Value Transaction: {high_value[0]['product']} (${high_value[0]['total_price']})")

if __name__ == "__main__":
    student_grade_report()
    retail_sales_analysis()
