import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationView({ reservation, index }) {

  const history = useHistory();
  
  const handleClick = () => {
    history.go(`/reservations/${reservation.reservation_id}/seat`)
  };

  return (
    <div>
<tr key={reservation.index}>
    <td>{reservation.last_name}</td>
    <td>{reservation.first_name}</td>
    <td>{reservation.mobile_number}</td>
    <td>{reservation.people}</td>
    <td>{reservation.reservation_date}</td>
    <td>{reservation.reservation_time}</td>
</tr>
<div>
<button href="/reservations/${reservation_id}/seat" className="btn btn-warning" onClick={handleClick}>
  Seat</button>
</div>
</div>
  );
}
