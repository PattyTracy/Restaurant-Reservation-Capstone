import React, { useState } from "react";
import { createReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState(null);

  const history = useHistory();
  
  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await createReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setError([error]);
    }
    return () => abortController.abort();
  };

  return (
    <div>
          <h4>New Reservation</h4>
          <ReservationForm
          reservation={reservation}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          />
          {error && <div className="error-message">{error}</div>}
          </div>
  );
}

export default NewReservation;
