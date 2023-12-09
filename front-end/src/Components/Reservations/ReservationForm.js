import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, handleSubmit, handleChange }) {
  const history = useHistory();
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="row ml-2">
          <label htmlFor="first_name">
            First Name
            <input
              id="first_name"
              name="first_name"
              type="text"
              required={true}
              onChange={handleChange}
              value={reservation.first_name}
            />
            <br></br>
          </label>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required={true}
            onChange={handleChange}
            value={reservation.last_name}
          />
          <br></br>
          <label htmlFor="mobile_number"> </label>
          Mobile Number
          <input
            id="mobile_number"
            name="mobile_number"
            type="text"
            required={true}
            onChange={handleChange}
            value={reservation.mobile_number}
          />
          <br></br>
        </div>
        <br></br>
        <div className="row ml-2">
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            id="reservation_date"
            name="reservation_date"
            type="date"
            required={true}
            onChange={handleChange}
            value={reservation.reservation_date}
          />

          <label htmlFor="reservation_time">Reservation time</label>
          <input
            id="reservation_time"
            name="reservation_time"
            type="time"
            required={true}
            onChange={handleChange}
            value={reservation.reservation_time}
          />

          <label htmlFor="people">Number of Guests</label>
          <input
            id="people"
            name="people"
            type="number"
            required={true}
            onChange={handleChange}
            value={reservation.people}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="cancel" onClick={() => history.goBack()}>
          Cancel
        </button>
      </fieldset>
    </form>
  );
}

export default ReservationForm;
