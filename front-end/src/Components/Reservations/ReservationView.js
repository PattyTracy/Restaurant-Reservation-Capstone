import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";

export default function ReservationView({ reservation, index }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/reservations/${reservation.reservation_id}/seat`);
  };

  return (
      <tr>
        <td>{reservation.last_name}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.people}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
          <button
            href="/reservations/${reservation_id}/seat"
            className="btn btn-primary mt-3"
            onClick={handleClick}
          >
            Seat
          </button>
      </tr>
  );
}
