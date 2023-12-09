import React from "react";

export default function ReservationView({ reservation, index }) {
  return (
<tr key={reservation.index}>
    <td>{reservation.last_name}</td>
    <td>{reservation.first_name}</td>
    <td>{reservation.mobile_number}</td>
    <td>{reservation.people}</td>
    <td>{reservation.reservation_date}</td>
    <td>{reservation.reservation_time}</td>
</tr>
  );
}
