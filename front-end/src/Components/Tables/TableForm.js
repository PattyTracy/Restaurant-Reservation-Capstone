import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({ table, handleSubmit, handleChange }) {
  const history = useHistory();
  table.capacity = Number(table.capacity);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="border p-3">
        <div className="row ml-2">
          <div className="col-md-2">
            <label htmlFor="table_name">Table Name</label>
            <input
              id="table_name"
              name="table_name"
              type="text"
              className="form-control"
              required={true}
              onChange={handleChange}
              value={table.table_name}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="capacity" className="form-label mr-3">
              Capacity
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              className="form-control"
              required={true}
              onChange={handleChange}
              value={table.capacity}
            />
          </div>
          </div>
          <div className="row ml-2 mt-4">
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary rounded mr-3">
              Submit
            </button>
            <button
              type="cancel"
              className="btn btn-danger rounded"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            </div>
          </div>
        
      </fieldset>
    </form>
  );
}

export default TableForm;
