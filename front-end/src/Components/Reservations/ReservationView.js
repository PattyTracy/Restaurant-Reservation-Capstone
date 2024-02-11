import React from "react";

export default function ReservationView({ reservation }) {
  const { status } = reservation;
  
  return (
    <>
      <td>{reservation.last_name}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.people}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.status}</td>
    </>

  );
}
