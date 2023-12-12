import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import ReservationView from "../Components/Reservations/ReservationView";
import NavDateButtons from "../Components/Buttons";
import ErrorAlert from "../layout/ErrorAlert";
import TableView from "../Components/Tables/TableView";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dateParam = queryParams.get('date');
  if (dateParam) {
    date = dateParam;
  }

  // useEffect(loadDashboard, [date]);
  useEffect(loadReservations, [date]);

  // function loadDashboard() {
    function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  useEffect(loadTables);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(tables, abortController.signal)
    .then(setTables)
    .catch(setTablesError);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3 border border-2">
        <h4 className="mb-0">Reservations for date </h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="mt-5 col-8">
        <thead>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Mobile Number</th>
          <th># in Party</th>
          <th>Reservation Date</th>
          <th>Reservation Time</th>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <ReservationView reservation={reservation} index={index} />
          ))}
        </tbody>
      </table>
      <div>
        <NavDateButtons />
      </div>
<div className="container-fluid mt-3 border border-success">
  Tables
  {tables.map((table, index) => (
    <TableView table={table} index={index} />
  ))}
</div>
    </main>
  );
}

export default Dashboard;
