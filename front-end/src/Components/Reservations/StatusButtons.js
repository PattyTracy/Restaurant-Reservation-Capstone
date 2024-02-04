import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { finishTable, listTables } from "../../utils/api";

export default function StatusButtons({ reservation }) {
  const history = useHistory();
  const { reservation_id } = reservation;
  const [tables, setTables] = useState([]);

// find which tables are occupied
  useEffect(() => { 
  listTables().then(setTables);
  }, [])

// find table with a specific reservation_id seated
const handleFinish = async (event) => {
  event.preventDefault();
  const tableToFinish = tables.find((table) => reservation_id === table.reservation_id)  
  window.confirm(
    "Is this table ready to seat new guests? This cannot be undone."
  ) && await finishTable(tableToFinish.table_id);
history.go(0);
} 

  return (
    <div className="d-grid gap-2 d-md-flex">
      {reservation.status === "booked" && 
      <button
        href="/reservations/${reservation_id}/seat"
        type="button"
        className="btn btn-primary mt-1 btn-block"
        onClick={() => {
          history.push(`/reservations/${reservation_id}/seat`);
        }}
      >
        Seat
      </button>
      }
      {reservation.status === "seated" && 
      <button
        href="data-table-id-finish={table.table_id}"
        type="button"

        className="btn btn-success mt-1 btn-block"
        onClick={handleFinish}      >
        Finish
      </button>
      }
    </div>
  );
}

