/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import "./homepage.css";
import homebg from "../../assets/homebg.jpg"; // Import the image

export default function Home() {
  const [count, setCount] = useState(0);
  const [hotels, setHotels] = useState<HotelDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/hotels", {
      method: "get",
    })
      .then<HotelDto[]>((r) => r.json())
      .then((j) => {
        setHotels(j);
      });
  }, [count]);

  return (
    <div className="home-container" style={{ backgroundImage: `url(${homebg})` }}> {/* Apply the background image */}
      <header className="header">
        <h1>Find Your Perfect Stay</h1>
        <label htmlFor="search">Find a hotel</label>
        <input id="search" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value ?? "")}></input>
        <Link
          onClick={(e) => (!searchTerm ? e.preventDefault() : null)}
          to={`/find-hotel?searchTerm=${encodeURIComponent(searchTerm)}&start=now`}
          aria-disabled={!searchTerm}
        >
          Search
        </Link>
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <h2>{hotel.name}</h2>
              <p>{hotel.address}</p>
            </div>
          ))}
        </div>
      </header>
      <Outlet />
    </div>
  );
}
