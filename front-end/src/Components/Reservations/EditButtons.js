import React from "react";
import { Link, useHistory } from "react-router-dom";
import { cancelReservation } from "../../utils/api";

export default function EditButtons({ reservation }) {
  const history = useHistory();
  const { reservation_id } = reservation;

  return (
    <div>
      <td>
      <Link to={`/reservations/${reservation_id}/edit`}>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={reservation.status !== "booked"}
        >
          Edit
        </button>
      </Link>
      </td>
      <td>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          window.confirm(
            "Do you want to cancel this reservation? This cannot be undone."
          ) && cancelReservation(reservation_id);
          history.go(0);
        }}
        disabled={reservation.status !== "booked"}
      >
        Cancel
      </button>
      </td>
    </div>
  );
}
