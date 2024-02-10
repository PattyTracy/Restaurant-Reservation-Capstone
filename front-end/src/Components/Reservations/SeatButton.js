import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { finishTable, listTables } from "../../utils/api";

export default function SeatButton({ reservation }) {
  const { reservation_id } = reservation;
  // const [tables, setTables] = useState([]);

  // // find which tables are occupied
  // useEffect(() => {
  //   listTables().then(setTables);
  // }, [tables]);

  return (
        <td>
        <Link to={`/reservations/${reservation_id}/seat`}>
          <button
            href="/reservations/${reservation_id}/seat"
            type="button"
            className="btn btn-primary"
            hidden={reservation.status !== "booked"}
          >
            Seat
          </button>
        </Link>
        </td>
      );
    }