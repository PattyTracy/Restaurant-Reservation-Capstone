import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";

function SeatReservation({ reservation_id, table_id }) {
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  useEffect(() => {
    listTables().then(setTables);
  }, []);

  //     useEffect(loadTables);

  //   function loadTables() {
  //     const abortController = new AbortController();
  //     setTablesError(null);
  //     listTables(tables, abortController.signal)
  //     .then(setTables)
  //     .catch(setTablesError);

  //     return () => abortController.abort();
  // }

  const handleChange = ({ target }) => {
    setTable({
      ...table,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const availableTables = tables.filter(
    (table) => table.reservation_id === null
  );

  return (
    <form onSubmit={handleSubmit}>
      {availableTables.map((table_name, table_id, capacity) => (
        <select
          id="table_id"
          name="table_id"
          onChange={handleChange}
          value={table_id}
        >
          <option value="{table.table_name} - {table.capacity}">
            {table_name} - {capacity}
          </option>
        </select>
      ))}
      
    </form>
  );
}

export default SeatReservation;
