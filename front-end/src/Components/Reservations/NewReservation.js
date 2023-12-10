import React, { useState } from "react";
import { createReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../../layout/ErrorAlert";

function NewReservation() {
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: ""
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();
  
  const handleChange = ({ target }) => {
    if (target === "people") {
      console.log("This many people: ", { target })
      console.log("Make it a number: ", Number(target.value));
      setReservation({
        ...reservation,
        [target.name]: Number(target.value)
      });
    } else {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await createReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setErrorMessage([error.message]);
    }
    return () => abortController.abort();
  };

  return (
    <div>
          <h4>New Reservation</h4>
          <ErrorAlert error={errorMessage} />
          <ReservationForm
          reservation={reservation}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          />
          {errorMessage && <div className="alert-alert-danger">{errorMessage}</div>}
          </div>
  );
}

export default NewReservation;
