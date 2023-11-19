const today = new Date();
console.log("Today: ", today);

const options = { weekday: 'long' };

const todayLocal = today.toLocaleDateString('en-US', options);
console.log("Local date", todayLocal);

const reservationDate = new Date("2023-11-20");
console.log("Reservation Date: ", reservationDate)

const dateLocal = reservationDate.toLocaleDateString('en-US', options);
console.log("Reservation local date", dateLocal);

