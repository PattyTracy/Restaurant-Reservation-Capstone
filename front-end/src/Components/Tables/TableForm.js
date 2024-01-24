import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({ table, handleSubmit, handleChange }) {
  const history = useHistory();
  table.capacity = Number(table.capacity);

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-3">
        <div className="row mb-3">
          <label htmlFor="table_name" className="form-label ml-3 mr-3">
            Table Name
          </label>
          <input
            id="table_name"
            name="table_name"
            type="text"
            required={true}
            onChange={handleChange}
            value={table.table_name}
          />
          <label htmlFor="capacity" className="form-label ml-3 mr-3">
            Capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            required={true}
            onChange={handleChange}
            value={table.capacity}
          />
        </div>
        <br></br>
        <div className="mt-2 ml-4">
        <button type="submit" className="btn btn-primary rounded mr-3">Submit</button>
        <button type="cancel" className="btn btn-danger rounded" onClick={() => history.goBack()}>
          Cancel
        </button>
        </div>
      </div>
    </form>
  );
}

export default TableForm;