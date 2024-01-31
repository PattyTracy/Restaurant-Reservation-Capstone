import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateTable } from "../../utils/api";
// import SeatReservationForm from "./SeatReservationForm";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const { reservation_id } = useParams();
  
  // use reservationId to find people in party
  // and save as var partySize

  const [selectedTableId, setSelectedTableId] = useState("");

  const history = useHistory();

  // load all tables
  useEffect(() => {
    listTables().then(setTables);
  }, []);

  // select only tables with status: "Free"
  const availableTables = tables.filter(
    (table) => table.reservation_id === null
  );

  const handleChange = (e) => {
    setSelectedTableId(e.target.value);
    console.log(selectedTableId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTable(selectedTableId, reservation_id);
    history.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-3 align-ctr">
        <h4 className="mt-3">Seat a Reservation</h4>
        <label htmlFor="selectOptions" className="mr-3">
          Select a Table:
        <select
          className="form-select"
          // value={selectedTable}
          id="dropdown"
          // name="table_id"
          onChange={handleChange}
        >
          {availableTables.map((table) => (
            <option key={table.table_id} value={table.table_id}>
              {table.table_name} - Capacity: {table.capacity}
            </option>
          ))}
        </select>
        </label>
        <div className="d-flex align-items-center mt-4 ml-1">
          <button type="submit" className="btn btn-primary mr-3">
            Submit
          </button>
          <button
            type="cancel"
            className="btn btn-danger"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default SeatReservation;
