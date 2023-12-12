import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, handleSubmit, handleChange }) {
  const history = useHistory();
  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-3">
        <div className="row mb-3">
          <label htmlFor="first_name" className="form-label ml-3 mr-3 mb-3">
            First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required={true}
              onChange={handleChange}
              value={reservation.first_name}
            />
            </div>
            <br></br>
          <div className="row mb-3">
          <label htmlFor="last_name" className="form-label ml-3 mr-3 mb-3">
            Last Name
            </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required={true}
            onChange={handleChange}
            value={reservation.last_name}
          />
          </div>
          <br></br>
          <div className="row mb-3">
          <label htmlFor="mobile_number" className="form-label ml-3 mr-3 mb-3">
          Mobile Number
          </label>
          <input
            id="mobile_number"
            name="mobile_number"
            type="text"
            required={true}
            onChange={handleChange}
            value={reservation.mobile_number}
          />
          </div>
          <br></br>
        <div className="row mb-3">
          <label htmlFor="reservation_date" className="form-label ml-3 mr-3 mb-3">
            Reservation Date
            </label>
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
        <div className="row mb-3">
          <label htmlFor="reservation_time" className="form-label ml-3 mr-3 mb-3">
            Reservation time
            </label>
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
        <div className="row mb-3">
          <label htmlFor="people" className="form-label ml-3 mr-3 mb-3">
            Number of Guests</label>
          <input
            id="people"
            name="people"
            type="number"
            required={true}
            onChange={handleChange}
            value={reservation.people}
          />
        </div>
        <br></br>
        <div className="mt-2 ml-4">
        <button type="submit" className="btn btn-primary rounded mr-3">Submit</button>
        <button type="cancel" className="btn btn-danger rounded" onClick={() => history.goBack()}>
          Cancel
        </button>
        </div>
        </div>
    </form>
  );
}

export default ReservationForm;
