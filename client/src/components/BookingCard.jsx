export default function BookingCard({ booking }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold">{booking.service}</h3>
      <p className="text-gray-500">{booking.location?.address}</p>
      <span className="text-sm text-blue-500">{booking.status}</span>
    </div>
  );
}