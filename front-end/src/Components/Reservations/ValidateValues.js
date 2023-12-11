export function ValidateValues(reservation) {
  const errors = [];
  // Reservations cannot be made on Tuesdays
  const formattedReservationDate = new Date(reservation.reservation_date);
  const reservationDay = formattedReservationDate.getUTCDay();
  if (reservationDay === 2) {
    errors.push("Periodic Tables is closed on Tuesdays.");
  }
  // Reservations cannot be made before 10:30 am or after 9:30 pm
  const userTime = new Date(`2023-01-01 ${reservation.reservation_time}`);
  const minTime = new Date("2023-01-01 10:30");
  const maxTime = new Date("2023-01-01 21:30");
  if (userTime < minTime || userTime > maxTime) {
    errors.push("Reservation time must be between 10:30 am and 9:30 pm.");
  }
  return errors;
}
