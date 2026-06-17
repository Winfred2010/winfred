-- =========================
-- Exercise 1: Items & Customers
-- =========================

SELECT * FROM items
ORDER BY price ASC;

SELECT * FROM items
WHERE price >= 80
ORDER BY price DESC;

SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

SELECT last_name
FROM customers
ORDER BY last_name DESC;


-- =========================
-- Exercise 2: dvdrental
-- =========================

-- All customers
SELECT * FROM customer;

-- Full name alias
SELECT first_name || ' ' || last_name AS full_name
FROM customer;

-- Unique create dates
SELECT DISTINCT create_date
FROM customer;

-- Customers ordered by first name DESC
SELECT * FROM customer
ORDER BY first_name DESC;

-- Film details ordered by rental rate
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;

-- Address and phone in Texas
SELECT address, phone
FROM address
WHERE district = 'Texas';

-- Movies with id 15 or 150
SELECT *
FROM film
WHERE film_id IN (15, 150);

-- Search specific movie (example: 'Titanic')
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Titanic';

-- Movies starting with first 2 letters (example: 'Ti')
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'Ti%';

-- 10 cheapest movies
SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10;

-- Next 10 cheapest movies
SELECT *
FROM film
ORDER BY rental_rate ASC
OFFSET 10
LIMIT 10;

-- Customer payments
SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

-- Movies not in inventory
SELECT *
FROM film
WHERE film_id NOT IN (
    SELECT film_id FROM inventory
);

-- City and country
SELECT city.city, country.country
FROM city
JOIN country ON city.country_id = country.country_id;

-- Bonus: sales by staff
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id;