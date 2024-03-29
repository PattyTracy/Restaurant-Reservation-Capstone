import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../Components/Reservations/NewReservation";
import NewTable from "../Components/Tables/NewTable";
import SeatReservation from "../Components/Reservations/SeatReservation";
import NewSearch from "../Components/NewSearch";
import EditReservation from "../Components/Reservations/EditReservation";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
      <SeatReservation />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route exact path="/search">
        <NewSearch />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
