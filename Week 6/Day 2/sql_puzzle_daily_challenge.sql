/* DAILY CHALLENGE: SQL PUZZLE
  Focus: Understanding NULL behavior with the NOT IN operator.
*/

-- ========================================================
-- 1. SCHEMA CREATION & DATA INSERTION
-- ========================================================

CREATE TABLE FirstTab (
     id INTEGER, 
     name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
(5, 'Pawan'),
(6, 'Sharlee'),
(7, 'Krish'),
(NULL, 'Avtaar');

CREATE TABLE SecondTab (
    id INTEGER 
);

INSERT INTO SecondTab (id) VALUES
(5),
(NULL);

-- ========================================================
-- 2. THE PUZZLE QUERIES
-- ========================================================

-- Q1: What is the count?
-- Subquery returns NULL. 
-- Logic: Any "NOT IN" comparison with NULL returns UNKNOWN.
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL );
-- EXPECTED OUTPUT: 0


-- Q2: What is the count?
-- Subquery returns 5.
-- Logic: Counts IDs in FirstTab that are NOT 5 (which are 6 and 7).
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 );
-- EXPECTED OUTPUT: 2


-- Q3: What is the count?
-- Subquery returns (5, NULL).
-- Logic: Because the list contains a NULL, the "NOT IN" logic fails for every row.
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab );
-- EXPECTED OUTPUT: 0


-- Q4: What is the count?
-- Subquery returns 5 (NULL is filtered out by the sub-query's WHERE clause).
-- Logic: Counts IDs in FirstTab that are NOT 5 (which are 6 and 7).
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL );
-- EXPECTED OUTPUT: 2