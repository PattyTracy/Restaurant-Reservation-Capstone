import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ReservationView from "../Components/Reservations/ReservationView";
import TableView from "../Components/Tables/TableView";
import NavDateButtons from "../Components/Buttons";
import ErrorAlert from "../layout/ErrorAlert";

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
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dateParam = queryParams.get("date");
  if (dateParam) {
    date = dateParam;
  }

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  useEffect(() => {
    listTables().then(setTables);
}, []);

  return (
    <main>
      <h1 className="mb-3">Dashboard</h1>
      <div className="d-md-flex mb-1">
        <h4 className="mb-0">Reservations for date </h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
      <table className="table col-8">
        <thead>
          <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Mobile Number</th>
          <th># in Party</th>
          <th>Reservation Date</th>
          <th>Reservation Time</th>
          <th>Seat Reservation</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <ReservationView reservation={reservation} index={index} key={index}/>
          ))}
        </tbody>
      </table>
      </div>
      <div>
        <NavDateButtons />
      </div>
<h4 className="mt-5">Tables</h4>
<div>
  <table className="table col-6">
    <thead>
      <tr>
        <th>Table Name</th>
        <th>Capacity</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
    {tables.map((table, index) => (
            <TableView table={table} index={index} key={index}/>
          ))}
    </tbody>
  </table>
</div>
    </main>
  );
}

export default Dashboard;
