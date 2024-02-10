import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { finishTable, listTables } from "../../utils/api"

export default function FinishButton({ table }) {
  const history = useHistory();
  const [tables, setTables] = useState([]);

  // find which tables are occupied
  useEffect(() => {
    listTables().then(setTables);
  }, [tables]);

  const { reservation_id } = table;

  // find table with a specific reservation_id seated
  const handleFinish = async (event) => {
    event.preventDefault();
    const tableToFinish = tables.find(
      (table) => reservation_id === table.reservation_id
    );
    window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    ) && (await finishTable(tableToFinish.table_id));
    history.go(0);
  };

  return (
        <td>
                  <button
                    href="data-table-id-finish={table.table_id}"
                    type="button"
                    className="btn btn-success"
                    hidden={table.reservation_id === null}
                    onClick={handleFinish}
                  >
                    Finish
                  </button>        
        </td>
      );
    }
