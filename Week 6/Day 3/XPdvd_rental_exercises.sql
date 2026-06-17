SELECT * FROM language;

SELECT f.title, f.description, l.name AS language_name
FROM film f
JOIN language l ON f.language_id = l.language_id;

SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON l.language_id = f.language_id;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES 
    ('Inception'), ('The Dark Knight'), ('Pulp Fiction'), ('The Matrix'), ('Parasite');

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES language(language_id) ON UPDATE CASCADE,
    title VARCHAR(255) NOT NULL,
    score INT CHECK (score >= 1 AND score <= 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(1, 1, 'Mind-Bending Masterpiece', 10, 'An incredible journey through dreams within dreams.'),
(4, 1, 'Revolutionary Sci-Fi', 9, 'Groundbreaking special effects.');

DELETE FROM new_film WHERE id = 1;

SELECT * FROM customer_review WHERE film_id = 1;

UPDATE film SET language_id = 2 WHERE film_id IN (1, 2, 3);
UPDATE film SET language_id = 4 WHERE film_id IN (10, 11, 12);

DROP TABLE IF EXISTS customer_review;

SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

SELECT f.title, f.rental_rate, f.replacement_cost, r.rental_date, r.customer_id
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

SELECT DISTINCT f.title, f.description
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
AND (f.description ILIKE '%sumo%' OR f.title ILIKE '%sumo%');

SELECT f.title, f.description, f.length, f.rating, c.name AS category
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE f.length < 60 AND f.rating = 'R' AND c.name = 'Documentary';

SELECT DISTINCT f.title, f.description, p.amount, r.return_date
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN payment p ON r.rental_id = p.rental_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
AND p.amount > 4.00 AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

SELECT DISTINCT f.title, f.description, f.replacement_cost
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC;
