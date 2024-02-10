import React, { useState } from "react";
import ReservationView from "./Reservations/ReservationView";
import EditButtons from "./Reservations/EditButtons";
import { listReservations } from "../utils/api";

export default function NewSearch() {
  // onSubmit will send a GET request to the server
  // create an array from the resulting reservations
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    let filteredReservations = await listReservations(
      { mobile_number: mobileNumber },
      abortController.signal
    );
    setReservations(filteredReservations);
    setSubmitted(true);

    return () => abortController.abort();
  };

  return (
    <container>
      <form onSubmit={handleSubmit}>
        <div className="input-group mt-2 mb-3">
          <input
            type="text"
            required={true}
            className="form-control col-4 ml-2 mr-2"
            placeholder="Enter a customer's phone number"
            value={mobileNumber}
            maxLength={12}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Find
          </button>
        </div>
      </form>
      <>
        {submitted && !reservations.length ? (
          <h4 className="ml-2">No reservations found.</h4>
        ) : (
          submitted &&
          reservations.length && (
            <div>
              <table className="table col-8">
                <thead>
                  <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Mobile Number</th>
                    <th># in Party</th>
                    <th>Reservation Date</th>
                    <th>Reservation Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation, index) => (
                    <tr>
                      <ReservationView
                        reservation={reservation}
                        index={index}
                        key={index}
                      />
                        <EditButtons reservation={reservation} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </>
    </container>
  );
}
