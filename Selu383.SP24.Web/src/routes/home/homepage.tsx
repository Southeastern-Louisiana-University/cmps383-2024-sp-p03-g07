import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import homebg from "../../assets/homebg.jpg"; // Import the image
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";


export default function Home() {
  const [hotels, setHotels] = useState<HotelDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/hotels")
     .then((response) => response.json())
     .then((data) => {
        setHotels(data);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts
  
  return (
    <div className="home-container" style={{ backgroundImage: `url(${homebg})` }}>
      <h1>Find Your Perfect Stay</h1>
      <Form className="hotel-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <Form.Control
          type="search"
          placeholder="Hotels"
          className="form-control"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value?? "")}
        />
        <Link
          onClick={(e) => (!searchTerm? e.preventDefault() : null)}
          to={`/hotels/search?searchTerm=${encodeURIComponent(searchTerm)}`}
          aria-disabled={!searchTerm}
        >
          <Button variant="success">Find my Hotel</Button>
        </Link>
      </Form>
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <h2>{hotel.name}</h2>
            <p>{hotel.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
