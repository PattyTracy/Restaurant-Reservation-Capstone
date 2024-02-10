import React from "react";

export default function TableView({ table }) {
  return (
        <>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td>{table.reservation_id === null ? "Free" : "Occupied"}</td>
        </>
  );
}
