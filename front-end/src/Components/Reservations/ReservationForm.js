import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, handleSubmit, handleChange }) {
  const history = useHistory();
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="row ml-2 mb-2">
          <div className="col-md-4">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className="form-control"
              required={true}
              onChange={handleChange}
              value={reservation.first_name}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="form-control"
              required={true}
              onChange={handleChange}
              value={reservation.last_name}
            />
          </div>
        </div>
        <div className="row ml-2 mb-2">
          <div className="col-md-4">
          <label htmlFor="mobile_number" className="mr-2">Mobile Number</label>
          <input
            id="mobile_number"
            name="mobile_number"
            type="text"
            className="form-control"
            required={true}
            onChange={handleChange}
            value={reservation.mobile_number}
          />
          </div>
        </div>
        <div className="row ml-2 mb-2">
          <div className="col-md-3">
          <label htmlFor="reservation_date" className="mr-2">Reservation Date</label>  
          <input
            id="reservation_date"
            name="reservation_date"
            type="date"
            className="form-control"
            required={true}
            onChange={handleChange}
            value={reservation.reservation_date}
          />
          </div>
       
        <div className="col-md-3">
          <label htmlFor="reservation_time">Reservation time</label>
          <input
            id="reservation_time"
            name="reservation_time"
            type="time"
            className="form-control"
            required={true}
            onChange={handleChange}
            value={reservation.reservation_time}
          />
        </div>
        </div>
        <div className="row ml-2">
          <div className="col-md-2">
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
        </div>
        <div className="mt-4 ml-4">
          <button type="submit" className="mr-3">
            Submit
          </button>
          <button type="cancel" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default ReservationForm;