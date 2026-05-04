-- Last 2 customers (A-Z), no id
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 2 OFFSET (
    SELECT COUNT(*) - 2 FROM customers
);

-- Delete all purchases made by Scott
DELETE FROM purchases
WHERE customer_id = (
    SELECT customer_id 
    FROM customers 
    WHERE first_name = 'Scott' AND last_name = 'Scott'
);

-- Check if Scott still exists
SELECT *
FROM customers
WHERE first_name = 'Scott' AND last_name = 'Scott';

-- All purchases with customers (including Scott even if deleted from purchases)
SELECT p.*, c.first_name, c.last_name
FROM purchases p
LEFT JOIN customers c
ON p.customer_id = c.customer_id;

-- All purchases with customers (excluding missing customers)
SELECT p.*, c.first_name, c.last_name
FROM purchases p
INNER JOIN customers c
ON p.customer_id = c.customer_id;