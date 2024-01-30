import React, { useState } from "react";
import { createTable } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
import TableForm from "./TableForm";

function NewTable() {
  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
  });

  const [errors, setErrors] = useState(null);

  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target === "capacity") {
      setTable({
        ...table,
        [target.name]: Number(target.value),
      });
    } else {
      setTable({
        ...table,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await createTable(table, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      setErrors([error]);
    }
    return () => abortController.abort();
  };

  return (
      <div>
        {errors? <ErrorAlert error={errors} /> 
        : null}
      <h4 className="mt-2">New Table</h4>
      <TableForm
        table={table}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      </div>
  )
}

export default NewTable;