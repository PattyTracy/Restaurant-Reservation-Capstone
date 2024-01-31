import React from "react";
import { useHistory } from "react-router-dom";

function SeatReservationForm({
  availableTables,
  selectedTable,
  handleChange,
  handleSubmit,
}) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="selectOptions" className="mr-3">Select a Table:</label>
      <select
        className="form-select"
        id="selectOptions"
        name="table_id"
        value={selectedTable}
        onChange={handleChange}
      >
        {availableTables.map((table, index) => (
          <option key={index} value={table}>
            {table.table_name} - Capacity: {table.capacity}
          </option>
        ))}
      </select>
      <div className="d-flex align-items-center mt-4 ml-1">
        <button type="submit" className="btn btn-primary mr-3">
          Submit
        </button>
        <button type="cancel" className="btn btn-danger" onClick={() => history.goBack()}>
          Cancel
        </button>
      </div>
    </form>
  );
}

// export default SeatReservationForm;
