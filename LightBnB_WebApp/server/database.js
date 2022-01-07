const { Pool } = require('pg');
const properties = require('./json/properties.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
      SELECT * FROM users
      WHERE email = $1;
    `, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => err.message);
  }
  exports.getUserWithEmail = getUserWithEmail;
  
  /**
   * Get a single user from the database given their id.
   * @param {string} id The id of the user.
   * @return {Promise<{}>} A promise to the user.
   */
  const getUserWithId = function(id) {
  return pool
    .query(`
      SELECT * FROM users
      WHERE id = $1;
    `, [id])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => err.message);
  }
  exports.getUserWithId = getUserWithId;
  
  
  /**
   * Add a new user to the database.
   * @param {{name: string, password: string, email: string}} user
   * @return {Promise<{}>} A promise to the user.
   */
  const addUser =  function(user) {
    return pool
      .query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [user.name, user.email, user.password])
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => err.message);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  console.log(guest_id, limit);
  return pool
    .query(`
      SELECT * FROM reservations
      JOIN properties ON properties.id = reservations.property_id
      WHERE reservations.guest_id = $1
      AND start_date <> NOW()::date
      AND end_date <> NOW()::date
      LIMIT $2;
    `, [guest_id, limit])
    .then((result) => result.rows)
    .catch((error) => error.message);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  console.log(options);
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  // ILIKE instead of LIKE for case insensitivity
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city ILIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && queryParams.length === 0) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `WHERE cost_per_night >= $${queryParams.length} `;
  } else if (options.minimum_price_per_night && queryParams.length > 0) {
    queryParams.push((options.minimum_price_per_night) * 100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night && queryParams.length === 0) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `WHERE cost_per_night <= $${queryParams.length} `;
  } else if (options.maximum_price_per_night && queryParams.length > 0) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  
  if (options.owner_id && queryParams.length === 0) {
    queryParams.push(`%${options.owner_id}%`);
    queryString += `WHERE options.owner_id ILIKE $${queryParams.length} `;
  } else if (options.owner_id && queryParams.length > 0) {
    queryParams.push(`%${options.owner_id}%`);
    queryString += `AND options.owner_id ILIKE $${queryParams.length} `;
  }
  
  // 3.5
  queryString += `
  GROUP BY properties.id
  `;
  
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating * 1);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
