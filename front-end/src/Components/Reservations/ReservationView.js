import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";

export default function ReservationView({ reservation, index }) {

  const {table_id} = useParams();

  const history = useHistory();
  
  const handleClick = () => {
    history.push(`/tables/:reservation_id/seat`)
  };

  return (
    <div>
<tr>
    <td>{reservation.last_name}</td>
    <td>{reservation.first_name}</td>
    <td>{reservation.mobile_number}</td>
    <td>{reservation.people}</td>
    <td>{reservation.reservation_date}</td>
    <td>{reservation.reservation_time}</td>
 <div>
<button className="btn btn-primary" onClick={handleClick}>
  Seat</button>
</div>
</tr>
</div>
  );
}
