import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ReservationView from "../Components/Reservations/ReservationView";
import TableView from "../Components/Tables/TableView";
import NavDateButtons from "../Components/NavButtons";
import SeatButton from "../Components/Reservations/SeatButton";
import EditButtons from "../Components/Reservations/EditButtons";
import FinishButton from "../Components/Tables/FinishButton";
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
  const [tablesError, setTablesError] = useState(null);

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

  const activeReservations = reservations.filter(reservation => reservation.status !== "cancelled");

  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }, [tables]);

  return (
    <main>
      <h1 className="mb-3">Dashboard</h1>
      <div className="d-md-flex mb-1">
        <h4 className="mb-1">Reservations</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        <table className="table col-9">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Mobile Number</th>
              <th># in Party</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activeReservations.map((reservation, index) => (
              <tr>
                <ReservationView
                  reservation={reservation}
                  index={index}
                  key={index}
                />
                <SeatButton reservation={reservation} index={index}/>
                <EditButtons reservation={reservation} index={index} />
              </tr>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, index) => (
              <tr>
              <TableView table={table} index={index} key={index} />
              <FinishButton table={table} index={index} />
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
