/* DAILY CHALLENGE: ACTORS
   1. Count actors
   2. Test blank fields 
*/

-- Query 1: Get total count
SELECT COUNT(*) AS total_actors 
FROM actors;

-- Query 2: Test insertion with blank/NULL fields
-- Note: This will fail if your table schema has NOT NULL constraints.
INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Tom', '', NULL, 3);

-- Verify the result (or the lack thereof)
SELECT * FROM actors;