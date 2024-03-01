import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

interface HotelDto {
  id: number;
  name: string;
}
export default function Home() {
  const [count, setCount] = useState(0);
  const [hotels, setHotels] = useState<HotelDto[]>([]);

  useEffect(() => {
    console.log("count changed");
    fetch("/api/hotels", {
      method: "get",
    })
      .then<HotelDto[]>((r) => r.json())
      .then((j) => {
        setHotels(j);
      });
  }, [count]);

  return (
    <>
      <h1>this Is our home page</h1>
      Go do help page:
      <Link to="/help">click me</Link>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.id}>
              <Link to={`/hotel-details/${hotel.id}`}>{hotel.name}</Link>
            </li>
          ))}
        </ul>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Outlet/>
    </>
  );
}