import { useState } from "react";
import API from "../../api/axios";

export default function Register() {
  const [data, setData] = useState({});

  const handleSubmit = async () => {
    await API.post("/customer/register", data);
    alert("Registered!");
  };

  return (
    <div className="p-6">
      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}