INSERT INTO users (name, email, password)
VALUES ('John Doe', 'johndoe@jmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password)
VALUES ('Frank White', 'fwhite@nymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password)
VALUES ('Nino Brown', 'nino@jack.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(2, 'Blank Corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 90000, 3, 3, 4, 'Canada', '123 Danforth Ave', 'Toronto', 'Ontario', 'A1A 1A1', true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(2, 'Green Hill', 'description', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 80000, 6, 5, 7, 'Canada', '169 Nuwug Circle', 'Vutgapha', 'Newfoundland And Labrador', 'N4A A3N', true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(3, 'Speed Lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 70000, 1, 2, 2, 'Canada', '333 Speedway Ln', 'Calgary', 'Alberta', 'A2N N2T', true);

INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES('2021-06-28', '2021-07-03', 1, 3);
INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES('2021-02-03', '2021-02-05', 2, 1);
INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES('2021-12-23', '2021-12-28', 1, 1);
INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES('2021-12-23', '2021-12-26', 3, 2);

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES(2, 3, 4, 4, 'messages');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES(1, 1, 3, 4, 'messages');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES(1, 2, 1, 5, 'messages');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES(3, 1, 2, 4, 'messages');

