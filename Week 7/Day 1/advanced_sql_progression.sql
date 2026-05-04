-- WEEK 7: AGGREGATE FUNCTIONS & JOINS

-- 1. COUNT: How many students were born after 1990?
SELECT COUNT(*) 
FROM students 
WHERE birth_date > '1990-01-01';

-- 2. AVG/SUM: Work with the items table (assuming items table from Week 6)
SELECT AVG(price) AS average_price, SUM(price) AS total_inventory_value
FROM items;

-- 3. ALIASING & GROUP BY: Count occurrences of last names
SELECT last_name, COUNT(*) AS name_count
FROM students
GROUP BY last_name;

-- 4. INTRO TO JOINS (Conceptual)
-- Note: This requires a foreign key relationship.
-- If you had an 'orders' table linking customers to items:
/*
SELECT customers.first_name, customers.last_name, items.item_name
FROM customers
INNER JOIN orders ON customers.customer_id = orders.customer_id
INNER JOIN items ON orders.item_id = items.item_id;
*/