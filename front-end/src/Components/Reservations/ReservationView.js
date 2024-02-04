import React from "react";
import StatusButtons from  "./StatusButtons";

export default function ReservationView({ reservation }) {

  return (
      <tr>
        <td>{reservation.last_name}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.people}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.status}</td>
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
