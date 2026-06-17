-- =========================
-- Exercise 1: DVD Rental
-- =========================

-- Films per rating
SELECT rating, COUNT(*) 
FROM film
GROUP BY rating;

-- Movies rated G or PG-13
SELECT *
FROM film
WHERE rating IN ('G', 'PG-13');

-- Filtered movies
SELECT *
FROM film
WHERE rating IN ('G', 'PG-13')
AND length < 120
AND rental_rate < 3.00
ORDER BY title ASC;

-- Update customer details (example id = 1)
UPDATE customer
SET first_name = 'YourName',
    last_name = 'YourLastName'
WHERE customer_id = 1;

-- Update customer address
UPDATE address
SET address = 'Your Address'
WHERE address_id = (
    SELECT address_id FROM customer WHERE customer_id = 1
);


-- =========================
-- Exercise 2: Students Table
-- =========================

-- Update twins birthdate
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea', 'Marc') AND last_name = 'Benichou';

-- Update last name
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David' AND last_name = 'Grez';

-- Delete student
DELETE FROM students
WHERE first_name = 'Lea' AND last_name = 'Benichou';

-- Count students
SELECT COUNT(*) FROM students;

-- Count students born after 2000
SELECT COUNT(*) 
FROM students
WHERE birth_date > '2000-01-01';

-- Add column
ALTER TABLE students
ADD COLUMN math_grade INT;

-- Update grades
UPDATE students SET math_grade = 80 WHERE id = 1;
UPDATE students SET math_grade = 90 WHERE id IN (2, 4);
UPDATE students SET math_grade = 40 WHERE id = 6;

-- Count grades above 83
SELECT COUNT(*) 
FROM students
WHERE math_grade > 83;

-- Insert duplicate student
INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer', 'Simpson', '1980-10-03', 70);

-- Count grades per student
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;

-- Sum of grades
SELECT SUM(math_grade) FROM students;


-- =========================
-- Exercise 3: Items & Customers
-- =========================

-- Create purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    item_id INT REFERENCES items(item_id),
    quantity_purchased INT
);

-- Insert purchases
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES 
(
 (SELECT customer_id FROM customers WHERE first_name='Scott' AND last_name='Scott'),
 (SELECT item_id FROM items WHERE item_name='Fan'),
 1
),
(
 (SELECT customer_id FROM customers WHERE first_name='Melanie' AND last_name='Johnson'),
 (SELECT item_id FROM items WHERE item_name='Large Desk'),
 10
),
(
 (SELECT customer_id FROM customers WHERE first_name='Greg' AND last_name='Jones'),
 (SELECT item_id FROM items WHERE item_name='Small Desk'),
 2
);

-- All purchases
SELECT * FROM purchases;

-- Purchases with customers
SELECT *
FROM purchases p
JOIN customers c ON p.customer_id = c.customer_id;

-- Purchases for customer id 5
SELECT *
FROM purchases
WHERE customer_id = 5;

-- Purchases for large and small desk
SELECT *
FROM purchases p
JOIN items i ON p.item_id = i.item_id
WHERE i.item_name IN ('Large Desk', 'Small Desk');

-- Customers who made purchases
SELECT c.first_name, c.last_name, i.item_name
FROM purchases p
JOIN customers c ON p.customer_id = c.customer_id
JOIN items i ON p.item_id = i.item_id;

-- Insert row with missing item_id
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 1);s