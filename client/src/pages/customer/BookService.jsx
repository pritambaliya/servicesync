import { useState } from "react";
import API from "../../api/axios";

export default function BookService() {
  const [data, setData] = useState({});

  const handleSubmit = async () => {
    await API.post("/bookings/create", data);
    alert("Booked!");
  };

  return (
    <div className="p-6">
      <input placeholder="Provider ID" onChange={e => setData({...data, providerId: e.target.value})} />
      <button onClick={handleSubmit}>Book</button>
    </div>
  );
}