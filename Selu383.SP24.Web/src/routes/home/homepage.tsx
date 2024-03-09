import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import "./homepage.css"; 

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    
    <div className="home-container">
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
      </header>
    
      <Outlet />
    </div>
  );
}