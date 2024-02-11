import React from "react";
import { Link } from "react-router-dom";

export default function SeatButton({ reservation }) {
  const { reservation_id } = reservation;

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