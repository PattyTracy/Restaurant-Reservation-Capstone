import React, { useState } from 'react';

const ReservationCreateForm = () => {
  const [reservationData, setReservationData] = useState({
    name: '',
    date: '',
    // other reservation fields
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-express-api.com/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        console.log('Reservation successful!');
        // Handle success, e.g., show a success message or redirect
      } else {
        console.error('Reservation failed.');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      // Handle network error or other issues
    }
  };

  return (
    <form onSubmit={handleReservationSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={reservationData.name} onChange={handleInputChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={reservationData.date} onChange={handleInputChange} />
      </label>
      {/* Other reservation fields */}
      <button type="submit">Make Reservation</button>
    </form>
  );
};
