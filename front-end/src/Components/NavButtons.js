import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

export default function NavDateButtons() {
  const history = useHistory();
  const currentDate = today();
  const previousDate = previous(currentDate);
  const nextDate = next(currentDate);
  const handleBackClick = () => history.push(`/dashboard?date=${previousDate}`)
  const handleFwdClick = () =>  history.push(`/dashboard?date=${nextDate}`)

  return (
    <div className="mt-3 g d-grid gap-2 d-md-block">
      <button
        type="button"
        className="btn btn-lg btn-dark mr-4"
        onClick={handleBackClick}
      >
        <span className="color-#FFFF oi:media-step-backward" />
        &nbsp;Previous
      </button>
      <button type="button" className="btn btn-lg btn-dark mr-4" onClick={() => history.push(`/dashboard?date=${currentDate}`)}>
        Today
      </button>
      <button
        type="button"
        className="btn btn-lg btn-dark"
        onClick={handleFwdClick}
      >
        <span className="oi oi:media-skip-forward"></span>
        &nbsp;Next
      </button>
    </div>
  );
}
