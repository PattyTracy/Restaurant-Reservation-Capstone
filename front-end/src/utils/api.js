/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  "https://restaurant-reservation-capstone-back-end-3mqt.onrender.com";

/**
 * Defines the default headers for these functions to work with `json-server`
 */

const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json()
  

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservations.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

//------------ END STARTER CODE --------------------------
/**
 * Helper functions to create, read, update and list
 * reservations and tables.
 */

// Retrieves a reservation from the reservation_id.
export async function readReservation(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  return await fetchJson(url, {signal }, {});
}

 // Saves a new reservation to the database.
 export async function createReservation(reservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
      method: "POST",
      headers,
      body: JSON.stringify({ data: reservation }),
      signal
  };
  return await fetchJson(url, options, []);
}

// Seat a reservation
// PUT request to /tables/:table_id/seat
export async function updateTable(table_id, reservation_id) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id } })
  }
  return await fetchJson(url, options)
}

// cancel a booked reservation
export async function cancelReservation(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/status`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status: "cancelled" } })
  }
    return await fetchJson(url, options, [])
}

// update a booked reservation
export async function updateReservation(reservation, signal) {
  const { reservation_id } = reservation;
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal
  };
  return await fetchJson(url, options)
}

// Finish a reservation: remove the table assignment
// DELETE request to /tables/:table_id/seat
export async function finishTable(table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}


// Saves a new table to the database.
export async function createTable(table, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal
  };
  return await fetchJson(url, options, [])
}

// List tables on Dashboard
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, [])
}

