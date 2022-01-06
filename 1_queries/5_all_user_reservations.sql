-- Show all reservations for a user.
SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON reservations.property_id = properties.id
WHERE reservations.guest_id = 1 AND reservations.end_date < NOW()::date
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;