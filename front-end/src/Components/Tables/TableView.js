import React from "react";

export default function TableView({ table, index }) {
  return (
    <div>
    <div>
<tr key={table.index}>
    <td>{table.table_name}</td>
    <td>{table.capacity}</td>
    <td>
        <a href="data-table-id-status=${table.table_id}">
        {table.reservation_id? "Free" : "Occupied"}
        </a>
        </td>
</tr>
</div>
</div>
  );
}