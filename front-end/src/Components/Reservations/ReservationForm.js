import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, handleSubmit, handleChange }) {
  const history = useHistory();
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="row ml-2 mb-2">
          <label htmlFor="first_name" className="mr-2"></label>
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
          
          <span className="ml-4"></span>
          <label htmlFor="last_name" className="mr-2">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required={true}
            onChange={handleChange}
            value={reservation.last_name}
          />
        </div>
        <div className="row ml-2">
          <br></br>
          <label htmlFor="mobile_number" className="mr-2"></label>
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
          <label htmlFor="reservation_date" className="mr-2">Reservation Date</label>
          <input
            id="reservation_date"
            name="reservation_date"
            type="date"
            required={true}
            onChange={handleChange}
            value={reservation.reservation_date}
          />
        </div>
        <br></br>
        <div className="row ml-2">
          <label htmlFor="reservation_time">Reservation time</label>
          <input
            id="reservation_time"
            name="reservation_time"
            type="time"
            required={true}
            onChange={handleChange}
            value={reservation.reservation_time}
          />
        </div>
        <br></br>
        <div className="row ml-2">
          <label htmlFor="people" className="mr=3">Number of Guests</label>
          <input
            id="people"
            name="people"
            type="number"
            required={true}
            onChange={handleChange}
            value={reservation.people}
          />
        </div>
        <div className="mt-4 ml-4">
        <button type="submit" className="mr-3">Submit</button>
        <button type="cancel" onClick={() => history.goBack()}>
          Cancel
        </button>
        </div>
      </fieldset>
    </form>
  );
}

export default ReservationForm;
