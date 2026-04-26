import { useEffect, useState } from "react";
import API from "../../api/axios";
import BookingCard from "../../components/BookingCard";
import Navbar from "../../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/customer").then(res => {
      setBookings(res.data.data);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        {bookings.map(b => (
          <BookingCard key={b._id} booking={b} />
        ))}
      </div>
    </div>
  );
}