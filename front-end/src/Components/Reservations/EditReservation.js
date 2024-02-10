import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { readReservation, updateReservation } from "../../utils/api";
import formatReservationDate from "../../utils/format-reservation-date";
import formatReservationTime from "../../utils/format-reservation-time";

export default function EditReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState([]);
  const [reservationError, setReservationError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => abortController.abort();
  }, []);

  formatReservationDate(reservation);
  formatReservationTime(reservation);

  const history = useHistory();

  if (!reservation.reservation_id) return null;

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
    await updateReservation(reservation);
    console.log(reservation);
    history.goBack(-1);
  };

  return (
    <div className="container">
      <h2>Edit Reservation</h2>
      <ReservationForm
        reservation={reservation}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
