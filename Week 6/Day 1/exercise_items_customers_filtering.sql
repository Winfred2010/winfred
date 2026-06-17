/* SECTION 1: TABLE CREATION */

-- Create the items table
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create the customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);


/* SECTION 2: DATA INSERTION */

-- Insert items
INSERT INTO items (item_name, price) VALUES 
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

-- Insert customers
INSERT INTO customers (first_name, last_name) VALUES 
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');


/* SECTION 3: DATA RETRIEVAL */

-- 1. All items
SELECT * FROM items;

-- 2. Items with price greater than 80
SELECT * FROM items WHERE price > 80;

-- 3. Items with price less than or equal to 300
SELECT * FROM items WHERE price <= 300;

-- 4. Customers with last name 'Smith'
SELECT * FROM customers WHERE last_name = 'Smith';

-- 5. Customers with last name 'Jones'
SELECT * FROM customers WHERE last_name = 'Jones';

-- 6. Customers whose first name is not 'Scott'
SELECT * FROM customers WHERE first_name != 'Scott';