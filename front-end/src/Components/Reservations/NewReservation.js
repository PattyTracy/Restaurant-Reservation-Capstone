import React, { useState } from "react";
import { createReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../../layout/ErrorAlert";
import { ValidateValues } from "./ValidateValues";

function NewReservation() {
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  
  const [errors, setErrors] = useState(null);

  const history = useHistory();

      
      const handleChange = ({ target }) => {
        if (target === "people") {
          setReservation({
            ...reservation,
        [target.name]: Number(target.value),
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
    const errors = ValidateValues(reservation);
    if (errors.length) {
      return setErrors(errors);
    }

    try {
      await createReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setErrors([error]);
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <h4>New Reservation</h4>
      {errors? <ErrorAlert error={errors} /> 
      : null}
      <ReservationForm
        reservation={reservation}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
}

export default NewReservation;
