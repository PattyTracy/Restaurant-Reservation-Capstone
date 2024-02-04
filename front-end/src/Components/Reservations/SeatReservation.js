import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, listTables, updateTable } from "../../utils/api";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState([]);  
  
  const [selectedTableId, setSelectedTableId] = useState("");
  
  const history = useHistory();
  
  // use reservationId to find people in party
  // and save as var partySize
  useEffect(() => {
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);
 const { people } = reservation;

  // load all tables
  useEffect(() => {
    listTables().then(setTables);
  }, []);

  // select only tables with status: "Free"
  // and capacity >= people in the reservation
  const availableTables = tables.filter(
    (table) => table.reservation_id === null && table.capacity >= people
  );

  const handleChange = (e) => {
    setSelectedTableId(e.target.value);
  };

  const handleSeatSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();

    try {
    await updateTable(selectedTableId, reservation_id);
    history.push("/dashboard");
  } catch (error) {
    console.log(error);
    console.log(error.message)
  }
  return () => abortController.abort();
  };

  return (
    <form onSubmit={handleSeatSubmit}>
      <div className="col-md-4 align-ctr">
        <h3 className="mt-3 mb-3">Seat a Reservation</h3>
        <label htmlFor="selectOptions" className="lead">
          Select a Table for party of {people} :
        <select
          className="form-select"
          id="dropdown"
          onChange={handleChange}
        >
          <option value="" disabled selected>Select</option>
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
